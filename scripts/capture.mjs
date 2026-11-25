#!/usr/bin/env node
// Sumi reference capture, without Puppeteer or Playwright.
// Claude in Chrome opens each live site and runs scripts/capture-page.js in the page. Its result is
// saved here as the site's design DNA (type, color, spacing, layout, radius, motion stack) in
// dna.json. On macOS, `shot` saves the browser window at each scroll step with the built-in
// screencapture. Zero dependencies.
//
//   node scripts/capture.mjs page                          print the in-page script for Claude in Chrome's JavaScript tool
//   node scripts/capture.mjs size <desktop|phone>          macOS: size the browser's front window (1440x900, or as narrow as Chrome allows)
//   node scripts/capture.mjs save <url> <desktop|phone> [--out .sumi/refs] [--from awwwards.json] < result.json
//                                                          save the in-page result as <out>/<slug>/dna.json
//   node scripts/capture.mjs shot <url> <desktop|phone> <step> [--out .sumi/refs]
//                                                          macOS: save the browser window as <slug>/<viewport>-<step>.jpg
//   node scripts/capture.mjs list [--out .sumi/refs]       what has been captured
//
// $SUMI_BROWSER_APP names the browser app on macOS (default "Google Chrome").

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return dflt;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const outRoot = resolve(flag('out', '.sumi/refs'));
const fromFile = flag('from');
const [cmd, ...rest] = args;
const APP = process.env.SUMI_BROWSER_APP || 'Google Chrome';
const VIEWPORTS = { desktop: [1440, 900], phone: [390, 844] };
const die = (msg, code = 1) => { console.error(`capture: ${msg}`); process.exit(code); };

// Host plus path, so two pages on one host (localhost/before, localhost/after) never collide.
const slugOf = (url) => {
  const u = new URL(url);
  return `${u.hostname.replace(/^www\./, '')}${u.port ? '-' + u.port : ''}${u.pathname}`
    .replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
};
const viewportOf = (v) => (VIEWPORTS[v] ? v : die(`viewport must be desktop or phone, not "${v}"`));
const recordPath = (slug) => join(outRoot, slug, 'dna.json');

function loadRecord(url) {
  const slug = slugOf(url);
  const p = recordPath(slug);
  if (existsSync(p)) return JSON.parse(readFileSync(p, 'utf8'));
  let meta = {};
  if (fromFile) {
    const { sites = [] } = JSON.parse(readFileSync(fromFile, 'utf8'));
    meta = sites.find((s) => s.url && slugOf(s.url) === slug) || {};
  }
  return {
    slug, url, source: meta.source || (fromFile ? 'awwwards' : 'url'), award: meta.award || null, score: meta.score ?? null,
    awwwards: meta.awwwards || null, tags: meta.tags || [], capturedAt: new Date().toISOString(), capturedWith: 'claude-in-chrome',
    shots: [], dna: {},
  };
}
function writeRecord(r) {
  mkdirSync(join(outRoot, r.slug), { recursive: true });
  r.ok = Object.keys(r.dna).length > 0;
  writeFileSync(recordPath(r.slug), JSON.stringify(r, null, 2));
}
function mac() {
  if (process.platform !== 'darwin') die('this step uses macOS screencapture and AppleScript. On another system, view each scroll step in Claude in Chrome and note in the board that shots were viewed, not saved.', 3);
}
const osa = (script) => execFileSync('osascript', ['-e', script], { encoding: 'utf8' }).trim();

if (cmd === 'page') {
  process.stdout.write(readFileSync(new URL('./capture-page.js', import.meta.url), 'utf8'));
} else if (cmd === 'size') {
  mac();
  const [w, h] = VIEWPORTS[viewportOf(rest[0])];
  osa(`tell application "${APP}" to set bounds of front window to {0, 0, ${w}, ${h + 88}}`);
  console.log(`sized ${APP} for ${rest[0]}: ${w} wide. Chrome may stop at about 500 wide; the DNA records the real width.`);
} else if (cmd === 'save') {
  const [url, vp] = rest;
  if (!url || !vp) die('usage: save <url> <desktop|phone> < result.json');
  viewportOf(vp);
  // Accept the tool's output as-is: the JSON string, or that string printed quoted.
  let dna;
  try { dna = JSON.parse(readFileSync(0, 'utf8').trim()); if (typeof dna === 'string') dna = JSON.parse(dna); } catch (e) { die(`the result is not JSON: ${e.message}`); }
  if (!dna || typeof dna !== 'object' || !dna.type || !dna.color) die('that is not the in-page result. Run `capture.mjs page` in the page and pass its output.');
  const r = loadRecord(url);
  r.dna[vp] = dna;
  r.capturedAt = new Date().toISOString();
  writeRecord(r);
  console.log(`saved ${recordPath(r.slug)} (${vp}, ${dna.layout?.viewport}px wide)`);
} else if (cmd === 'shot') {
  mac();
  const [url, vp, step] = rest;
  if (!url || !vp || !/^\d+$/.test(step || '')) die('usage: shot <url> <desktop|phone> <step>');
  viewportOf(vp);
  const b = osa(`tell application "${APP}" to get bounds of front window`).split(/,\s*/).map(Number);
  const [x1, y1, x2, y2] = b;
  if (!(x2 > x1 && y2 > y1)) die(`bad window bounds: ${b.join(',')}`);
  const r = loadRecord(url);
  mkdirSync(join(outRoot, r.slug), { recursive: true });
  const file = `${vp}-${step}.jpg`;
  execFileSync('screencapture', ['-x', '-t', 'jpg', '-R', `${x1},${y1},${x2 - x1},${y2 - y1}`, join(outRoot, r.slug, file)]);
  if (!existsSync(join(outRoot, r.slug, file))) die('no image was written. Give Terminal Screen Recording permission in System Settings, Privacy and Security.');
  if (!r.shots.includes(file)) r.shots.push(file);
  writeRecord(r);
  console.log(`shot ${join(outRoot, r.slug, file)}`);
} else if (cmd === 'list') {
  const rows = existsSync(outRoot) ? readdirSync(outRoot).filter((d) => existsSync(recordPath(d))) : [];
  const summary = rows.map((d) => {
    const r = JSON.parse(readFileSync(recordPath(d), 'utf8'));
    return { slug: d, url: r.url, ok: r.ok, viewports: Object.keys(r.dna), shots: r.shots.length };
  });
  console.log(JSON.stringify({ outRoot, summary }, null, 2));
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 17).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
  if (cmd) process.exit(2);
}
