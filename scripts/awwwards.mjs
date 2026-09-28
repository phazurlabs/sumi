#!/usr/bin/env node
// Sumi reference scout — Awwwards adapter.
// Lists award-winning sites from one public Awwwards listing page and resolves
// each to its live URL, jury score and tags. On-demand and small by design:
// one listing page, a capped number of detail pages, a polite delay between them.
//
// Usage:
//   node scripts/awwwards.mjs [listing] [--limit 10] [--awarded] [--out .sumi/refs/awwwards.json]
//   listing: sotd (default) | sotm | nominees | honorable | <category-slug> | full awwwards URL
//   e.g.     node scripts/awwwards.mjs technology --limit 8
//            node scripts/awwwards.mjs three-js --awarded   (skip Nominees: SOTD/SOTM/HM only)
//            node scripts/awwwards.mjs "https://www.awwwards.com/websites/e-commerce/"

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const BASE = 'https://www.awwwards.com';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36';
const SHORTCUTS = {
  sotd: '/websites/sites_of_the_day/',
  sotm: '/websites/sites_of_the_month/',
  nominees: '/websites/nominees/',
  honorable: '/websites/honorable/',
};

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : args[i + 1];
};
const VALUED = ['limit', 'out'];
const positional = args.filter((a, i) => !a.startsWith('--') && !VALUED.includes(args[i - 1]?.slice(2)));
const listing = positional[0] || 'sotd';
const limit = Math.min(Number(flag('limit', 10)) || 10, 24);
const out = flag('out', null);
const awarded = args.includes('--awarded');

const listingUrl = listing.startsWith('http')
  ? listing
  : BASE + (SHORTCUTS[listing] || `/websites/${listing.replace(/^\/|\/$/g, '')}/`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#039;|&apos;/g, "'").replace(/&quot;/g, '"').trim();

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html' }, redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function parseListing(html) {
  const slugs = [...html.matchAll(/href="\/sites\/([a-z0-9-]+)\/?"/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

function parseDetail(slug, html) {
  const title = decode((html.match(/<title>([^<]*)/) || [])[1] || slug);
  const [name, award = ''] = title.split(' - Awwwards');
  const live = (html.match(/class="toolbar-bts__item" href="(https?:\/\/[^"]+)"/) || [])[1]
    || (html.match(/<a href="(https?:\/\/(?!www\.awwwards)[^"]+)" target="_blank" rel="noopener">/) || [])[1]
    || null;
  const score = Number((html.match(/c-heading-score__note">→\s*([\d.]+)/) || [])[1]) || null;
  const tags = [...new Set([...html.matchAll(/<a[^>]*href="\/websites\/([a-z0-9-]+)\/"[^>]*>[^<]{1,40}<\/a>/g)].map((m) => m[1]))]
    .filter((t) => !['sites_of_the_day', 'sites_of_the_month', 'nominees', 'honorable'].includes(t));
  return {
    source: 'awwwards',
    slug,
    name: name.trim(),
    award: award.replace(/^\s*/, '').trim() || null,
    score,
    url: live,
    awwwards: `${BASE}/sites/${slug}`,
    tags,
  };
}

const listHtml = await get(listingUrl);
// Category pages mix nominees with winners and expose no award filter, so
// --awarded scans up to 3x the limit and keeps only jury-awarded sites.
const slugs = parseListing(listHtml).slice(0, awarded ? limit * 3 : limit);
if (!slugs.length) {
  console.error(`No sites found at ${listingUrl}. Check the category slug (see skills/reference-intelligence/references/awwwards-adapter.md).`);
  process.exit(1);
}

const sites = [];
for (const slug of slugs) {
  if (sites.length >= limit) break;
  try {
    const site = parseDetail(slug, await get(`${BASE}/sites/${slug}`));
    if (awarded && (!site.award || /nominee/i.test(site.award))) continue;
    sites.push(site);
  } catch (err) {
    sites.push({ source: 'awwwards', slug, error: String(err.message || err) });
  }
  await sleep(600);
}

const result = { listing: listingUrl, fetchedAt: new Date().toISOString(), sites };
if (out) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(result, null, 2));
  console.error(`wrote ${sites.length} sites → ${out}`);
}
console.log(JSON.stringify(result, null, 2));
