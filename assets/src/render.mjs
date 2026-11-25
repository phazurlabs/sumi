#!/usr/bin/env node
// Renders the README art in assets/src/*.html to PNG with Chrome's own headless screenshot, at 2x.
// No Puppeteer, no Playwright, no dependencies. Run from the repo root:
//   node assets/src/render.mjs
// Outputs: assets/hero-dark.png, assets/hero-light.png, assets/before-after.png
// The README ships the heroes as JPEG (sips -s format jpeg -s formatOptions 82) to keep them light.
// Set SUMI_CHROME to the Chrome binary if it is not in a usual place.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(new URL('../..', import.meta.url).pathname);
const chrome = [process.env.SUMI_CHROME, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium']
  .find((p) => p && existsSync(p));
if (!chrome) {
  console.error('No Chrome found. Install Google Chrome or set SUMI_CHROME.');
  process.exit(2);
}

// Heights are fixed: Chrome's command-line screenshot does not measure the page. before-after.html is 1000 tall.
const jobs = [
  { src: 'assets/src/hero.html?theme=dark', out: 'assets/hero-dark.png', w: 1600, h: 640 },
  { src: 'assets/src/hero.html?theme=light', out: 'assets/hero-light.png', w: 1600, h: 640 },
  { src: 'assets/src/before-after.html', out: 'assets/before-after.png', w: 1600, h: 1000 },
].filter((j) => existsSync(join(root, j.src.split('?')[0])));

const profile = mkdtempSync(join(tmpdir(), 'sumi-render-'));
try {
  for (const j of jobs) {
    const [file, query] = j.src.split('?');
    const url = pathToFileURL(join(root, file)).href + (query ? `?${query}` : '');
    execFileSync(chrome, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--user-data-dir=${profile}`,
      '--force-device-scale-factor=2', `--window-size=${j.w},${j.h}`, '--virtual-time-budget=4000', `--screenshot=${join(root, j.out)}`, url,
    ], { stdio: 'ignore' });
    if (!existsSync(join(root, j.out))) throw new Error(`Chrome wrote no image for ${j.src}`);
    console.log(`✓ ${j.out}`);
  }
} finally {
  rmSync(profile, { recursive: true, force: true });
}
