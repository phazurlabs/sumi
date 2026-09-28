#!/usr/bin/env node
// Renders the README art in assets/src/*.html to PNG with the same puppeteer-core
// and Chrome resolution as scripts/capture.mjs. Run from the repo root:
//   node assets/src/render.mjs
// Outputs: assets/hero-dark.png, assets/hero-light.png, assets/before-after.png
// The README ships the heroes as JPEG (sips -s format jpeg -s formatOptions 82) to keep them light.

import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(new URL('../..', import.meta.url).pathname);

async function loadPuppeteer() {
  for (const dir of [process.env.SUMI_PUPPETEER_DIR, process.cwd(), join(homedir(), 'motionsmith/cli'), join(homedir(), 'vectorpax-landing')].filter(Boolean)) {
    try {
      return (await import(pathToFileURL(createRequire(join(dir, 'package.json')).resolve('puppeteer-core')).href)).default;
    } catch {}
  }
  throw new Error('puppeteer-core not found; set SUMI_PUPPETEER_DIR');
}

const chrome = [process.env.SUMI_CHROME, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome']
  .find((p) => p && existsSync(p));

const jobs = [
  { src: 'assets/src/hero.html?theme=dark', out: 'assets/hero-dark.png', w: 1600, h: 640 },
  { src: 'assets/src/hero.html?theme=light', out: 'assets/hero-light.png', w: 1600, h: 640 },
  { src: 'assets/src/before-after.html', out: 'assets/before-after.png', w: 1600, h: 0 },
].filter((j) => existsSync(join(root, j.src.split('?')[0])));

const puppeteer = await loadPuppeteer();
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--allow-file-access-from-files'] });
for (const j of jobs) {
  const page = await browser.newPage();
  await page.setViewport({ width: j.w, height: j.h || 900, deviceScaleFactor: 2 });
  const [file, query] = j.src.split('?');
  await page.goto(pathToFileURL(join(root, file)).href + (query ? `?${query}` : ''), { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const clip = j.h ? { x: 0, y: 0, width: j.w, height: j.h }
    : await page.evaluate(() => ({ x: 0, y: 0, width: innerWidth, height: document.documentElement.scrollHeight }));
  await page.screenshot({ path: join(root, j.out), clip });
  console.log(`✓ ${j.out}`);
  await page.close();
}
await browser.close();
