#!/usr/bin/env node
// Sumi reference capture — one puppeteer-core run over N live sites.
// For each URL: desktop + phone screenshots at scroll steps (real wheel events,
// so Lenis/Locomotive smooth-scroll sites actually move) and a measured design
// DNA (type, color, spacing, layout, radius, motion stack) written to dna.json.
//
// Usage:
//   node scripts/capture.mjs <url> [url…] [--out .sumi/refs] [--steps 4]
//   node scripts/capture.mjs --from .sumi/refs/awwwards.json [--pick slug1,slug2]
//
// puppeteer-core is NOT a Sumi dependency. It is resolved, in order, from
// $SUMI_PUPPETEER_DIR, the current project, then known sibling projects. Chrome
// is found the same way MOTIONSMITH finds it (set $SUMI_CHROME to override).

import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : args[i + 1];
};
const VALUED = ['out', 'steps', 'from', 'pick'];
const outRoot = resolve(flag('out', '.sumi/refs'));
const steps = Math.max(1, Math.min(Number(flag('steps', 4)) || 4, 8));

let targets = args
  .filter((a, i) => !a.startsWith('--') && !VALUED.includes(args[i - 1]?.slice(2)))
  .map((url) => ({ url }));
if (flag('from')) {
  const picked = flag('pick')?.split(',').map((s) => s.trim());
  const { sites } = JSON.parse(readFileSync(flag('from'), 'utf8'));
  targets.push(...sites.filter((s) => s.url && (!picked || picked.includes(s.slug))));
}
if (!targets.length) {
  console.error('usage: node scripts/capture.mjs <url> [url…] [--out .sumi/refs] | --from awwwards.json [--pick a,b]');
  process.exit(1);
}

async function loadPuppeteer() {
  const dirs = [
    process.env.SUMI_PUPPETEER_DIR,
    process.cwd(),
    join(homedir(), 'motionsmith/cli'),
    join(homedir(), 'vectorpax-landing'),
    join(homedir(), 'canvas-cuisine'),
    join(homedir(), 'cigar-studio'),
  ].filter(Boolean);
  for (const dir of dirs) {
    try {
      const path = createRequire(join(dir, 'package.json')).resolve('puppeteer-core');
      return (await import(pathToFileURL(path).href)).default;
    } catch {}
  }
  console.error('puppeteer-core not found. `npm i -D puppeteer-core` in this project, or set SUMI_PUPPETEER_DIR to a folder that has it.');
  process.exit(2);
}

function findChrome() {
  if (process.env.SUMI_CHROME && existsSync(process.env.SUMI_CHROME)) return process.env.SUMI_CHROME;
  for (const base of [join(homedir(), '.motionsmith/browsers'), join(homedir(), '.cache/puppeteer')]) {
    const dir = join(base, 'chrome');
    if (!existsSync(dir)) continue;
    for (const b of readdirSync(dir).sort().reverse()) {
      for (const arch of ['mac-arm64', 'mac-x64']) {
        const p = join(dir, b, `chrome-${arch}/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`);
        if (existsSync(p)) return p;
      }
      const linux = join(dir, b, 'chrome-linux64/chrome');
      if (existsSync(linux)) return linux;
    }
  }
  const known = process.platform === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser']
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  const hit = known.find(existsSync);
  if (!hit) {
    console.error('No Chrome found. Install Google Chrome or set SUMI_CHROME.');
    process.exit(2);
  }
  return hit;
}

const slugOf = (t) => t.slug || new URL(t.url).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Consent banners hide half the hero on EU-built award sites. Click the obvious
// accept button once; never anything else.
async function dismissConsent(page) {
  await page.evaluate(() => {
    const re = /^(accept( all)?|allow( all)?|agree|i agree|got it|ok(ay)?|continue|enter)$/i;
    const btn = [...document.querySelectorAll('button, a[role="button"], [class*="cookie"] a')]
      .find((b) => re.test((b.textContent || '').trim()));
    btn?.click();
  }).catch(() => {});
}

// Scroll with real wheel input: programmatic scrollTo is ignored by Lenis and
// Locomotive, which is how a capture ends up with N copies of the hero.
async function wheelTo(page, fraction) {
  const { height, vh, y } = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    vh: innerHeight,
    y: scrollY,
  }));
  const target = Math.max(0, (height - vh) * fraction);
  let delta = target - y;
  await page.mouse.move(200, 300);
  while (Math.abs(delta) > 40) {
    const step = Math.sign(delta) * Math.min(Math.abs(delta), 400);
    await page.mouse.wheel({ deltaY: step });
    await sleep(90);
    delta -= step;
  }
  await sleep(900);
}

// Everything measured here is computed style from the live DOM, so the DNA
// describes what the site actually renders, not what its CSS happens to declare.
function measureDNA() {
  const px = (v) => Math.round(parseFloat(v) || 0);
  const tally = (arr) => Object.entries(arr.reduce((m, k) => ((m[k] = (m[k] || 0) + 1), m), {}))
    .sort((a, b) => b[1] - a[1]);
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.01;
  };
  const family = (f) => f.split(',')[0].replace(/["']/g, '').trim();
  const textStyle = (sel) => {
    const els = [...document.querySelectorAll(sel)].filter(visible).slice(0, 40);
    if (!els.length) return null;
    // Representative = the style that carries the most text overall, preferring
    // readable running text: a long uppercase 12px footnote is not the body face.
    const groups = new Map();
    for (const e of els) {
      const c = getComputedStyle(e);
      const key = `${c.fontFamily}|${c.fontSize}|${c.fontWeight}|${c.textTransform}`;
      const readable = c.textTransform !== 'uppercase' && parseFloat(c.fontSize) >= 14;
      const g = groups.get(key) || { el: e, chars: 0, readable };
      g.chars += (e.textContent || '').trim().length;
      groups.set(key, g);
    }
    const ranked = [...groups.values()].sort((a, b) => (b.readable - a.readable) || (b.chars - a.chars));
    const cs = getComputedStyle(ranked[0].el);
    return {
      family: family(cs.fontFamily),
      sizes: [...new Set(els.map((e) => px(getComputedStyle(e).fontSize)))].sort((a, b) => b - a).slice(0, 6),
      weight: cs.fontWeight,
      lineHeight: cs.lineHeight === 'normal' ? 'normal' : +(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2),
      tracking: cs.letterSpacing === 'normal' ? '0' : `${(parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize)).toFixed(3)}em`,
      transform: cs.textTransform,
      count: els.length,
    };
  };

  const all = [...document.querySelectorAll('body *')].filter(visible).slice(0, 4000);
  const area = (el) => { const r = el.getBoundingClientRect(); return r.width * r.height; };

  // Colors weighted by painted area (backgrounds) and by count (text).
  const bg = {};
  for (const el of all) {
    const c = getComputedStyle(el).backgroundColor;
    if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') continue;
    bg[c] = (bg[c] || 0) + area(el);
  }
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  const htmlBg = getComputedStyle(document.documentElement).backgroundColor;
  const pageBg = [bodyBg, htmlBg].find((c) => c && c !== 'rgba(0, 0, 0, 0)') || 'rgb(255, 255, 255)';
  const text = tally(all.filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
    .map((e) => getComputedStyle(e).color));

  const sections = [...document.querySelectorAll('main > *, body > section, main section, body > div > section, footer')]
    .filter(visible).slice(0, 30);
  const radii = tally(all.map((e) => getComputedStyle(e).borderTopLeftRadius).filter((r) => r !== '0px'));
  // Multi-property transitions repeat the same value per property; keep the first.
  const first = (v) => v.split(/,(?![^(]*\))/)[0].trim();
  const animated = all.filter((e) => getComputedStyle(e).transitionDuration !== '0s');
  const easings = tally(animated.map((e) => first(getComputedStyle(e).transitionTimingFunction)));
  const durations = tally(animated.map((e) => first(getComputedStyle(e).transitionDuration)));
  const widths = all.map((e) => getComputedStyle(e).maxWidth).filter((w) => w.endsWith('px'));

  const html = document.documentElement;
  const has = (cond) => { try { return !!cond(); } catch { return false; } };
  const scriptSrc = [...document.scripts].map((s) => s.src).join(' ');

  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || null,
    pageHeight: html.scrollHeight,
    sectionCount: sections.length,
    theme: (() => {
      const [r, g, b] = pageBg.match(/\d+/g).map(Number);
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.45 ? 'dark' : 'light';
    })(),
    type: {
      display: textStyle('h1'),
      heading: textStyle('h2, h3'),
      body: textStyle('p'),
      ui: textStyle('button, nav a, a[class*="btn"], a[class*="button"]'),
      loadedFaces: [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/["']/g, '')} ${f.weight}`))].slice(0, 16),
    },
    color: {
      pageBackground: pageBg,
      backgrounds: Object.entries(bg).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([c, a]) => ({ color: c, share: +(a / (innerWidth * html.scrollHeight)).toFixed(3) })),
      text: text.slice(0, 6).map(([c, n]) => ({ color: c, count: n })),
    },
    spacing: {
      sectionPaddingY: [...new Set(sections.map((s) => px(getComputedStyle(s).paddingTop)).filter(Boolean))].sort((a, b) => a - b),
      sectionHeights: sections.map((s) => Math.round(s.getBoundingClientRect().height)),
      gaps: tally(all.map((e) => getComputedStyle(e).rowGap).filter((g) => g !== 'normal' && g !== '0px')).slice(0, 6),
    },
    layout: {
      viewport: innerWidth,
      containerMaxWidths: tally(widths).slice(0, 4),
      gridCount: all.filter((e) => getComputedStyle(e).display.includes('grid')).length,
      flexCount: all.filter((e) => getComputedStyle(e).display.includes('flex')).length,
      gridTemplates: tally(all.filter((e) => getComputedStyle(e).display.includes('grid'))
        .map((e) => getComputedStyle(e).gridTemplateColumns.split(' ').length + ' cols')).slice(0, 4),
    },
    shape: { radii: radii.slice(0, 5) },
    motion: {
      // Best-effort: libraries bundled as ES modules leave no global, so a false
      // here means "not detected", not "not used". Read the shots too.
      stack: {
        gsap: has(() => window.gsap) || /gsap/.test(scriptSrc),
        scrollTrigger: has(() => window.ScrollTrigger || window.gsap?.plugins?.scrollTrigger),
        lenis: has(() => window.lenis || window.Lenis) || html.classList.contains('lenis'),
        locomotive: html.classList.contains('has-scroll-smooth') || !!document.querySelector('[data-scroll-container]'),
        three: has(() => window.THREE || window.__THREE__),
        webgl: [...document.querySelectorAll('canvas')].some((c) => has(() => c.getContext('webgl2') || c.getContext('webgl'))),
        framer: !!document.querySelector('[data-framer-name], [data-framer-component-type]'),
        webflow: !!html.dataset.wfPage,
        barba: !!document.querySelector('[data-barba]'),
        swiper: !!document.querySelector('.swiper'),
        lottie: !!document.querySelector('lottie-player, dotlottie-player') || has(() => window.lottie),
      },
      canvases: document.querySelectorAll('canvas').length,
      videos: document.querySelectorAll('video').length,
      easings: easings.slice(0, 4),
      durations: durations.slice(0, 4),
    },
    counts: {
      images: document.images.length,
      links: document.links.length,
      buttons: document.querySelectorAll('button').length,
      forms: document.forms.length,
    },
  };
}

const puppeteer = await loadPuppeteer();
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--hide-scrollbars'],
});

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  phone: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const summary = [];
for (const t of targets) {
  const slug = slugOf(t);
  const dir = join(outRoot, slug);
  mkdirSync(dir, { recursive: true });
  const record = { slug, url: t.url, source: t.source || 'url', award: t.award || null, score: t.score ?? null, awwwards: t.awwwards || null, tags: t.tags || [], capturedAt: new Date().toISOString(), shots: [], dna: {} };
  try {
    for (const [name, vp] of Object.entries(VIEWPORTS)) {
      const page = await browser.newPage();
      await page.setViewport(vp);
      if (name === 'phone') {
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1');
      }
      await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
      await sleep(2500); // preloaders and intro animations on award sites run 1-3s
      await dismissConsent(page);
      await sleep(400);

      const n = name === 'desktop' ? steps : Math.min(steps, 3);
      for (let i = 0; i < n; i++) {
        const frac = n === 1 ? 0 : i / (n - 1);
        if (i > 0) await wheelTo(page, frac);
        const file = `${name}-${i}.jpg`;
        await page.screenshot({ path: join(dir, file), type: 'jpeg', quality: 72 });
        record.shots.push(file);
      }
      // Measure at the end: by now every scroll-reveal has fired once.
      await wheelTo(page, 0);
      record.dna[name] = await page.evaluate(measureDNA);
      await page.close();
    }
    record.ok = true;
  } catch (err) {
    record.ok = false;
    record.error = String(err.message || err);
  }
  writeFileSync(join(dir, 'dna.json'), JSON.stringify(record, null, 2));
  summary.push({ slug, url: t.url, ok: record.ok, shots: record.shots.length, error: record.error });
  console.error(`${record.ok ? '✓' : '✗'} ${slug} (${record.shots.length} shots)${record.error ? ' — ' + record.error : ''}`);
}

await browser.close();
console.log(JSON.stringify({ outRoot, summary }, null, 2));
