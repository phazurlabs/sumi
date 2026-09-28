# Awwwards Adapter

Awwwards has no public API. `scripts/awwwards.mjs` reads the public listing and detail pages
the same way a browser does, one listing at a time, with a 600ms delay between detail pages
and a hard cap of 24 sites per run.

## What one site record looks like

```json
{
  "source": "awwwards",
  "slug": "realevate",
  "name": "Realevate",
  "award": "SOTD",
  "score": 7.22,
  "url": "https://realevate.agency/",
  "awwwards": "https://www.awwwards.com/sites/realevate",
  "tags": ["business-corporate", "real-estate", "animation", "fullscreen", "gsap"]
}
```

- `award`: `SOTD`, `SOTM`, `Honorable Mention`, `Developer Award`, or `Nominee`.
- `score`: jury average (0-10). `null` for nominees. SOTD usually lands at 7.0-7.8.
- `url`: the LIVE site. This is what gets captured.
- `tags`: category, style and tech tags. Tech tags (gsap, three-js, webflow, framer) tell you
  the build stack before you capture anything.

## Listings

| Arg | Page |
|-----|------|
| `sotd` (default) | Sites of the Day, newest first |
| `sotm` | Sites of the Month |
| `honorable` | Honorable Mentions |
| `nominees` | Everything submitted (unjuried; avoid unless the pool is thin) |
| `<tag>` | `/websites/<tag>/`, a category or tag page. Mixes nominees in; add `--awarded` |
| full URL | Any `https://www.awwwards.com/websites/...` listing |

**Always pass `--awarded` with a tag.** Tag pages list nominees first and have no server-side
award filter; `--awarded` scans up to 3x the limit and keeps only jury-awarded sites.

## Sector → tag map

Pick one sector tag plus, when the brief calls for it, one style or tech tag. Run them as
separate listings and merge; do not invent tags. The full list is below.

| Brief | Sector tag | Useful style/tech tags |
|-------|-----------|------------------------|
| SaaS, dev tools, AI, fintech, crypto-free finance | `technology`, `startups` | `ui-design`, `app-style`, `data-visualization`, `clean`, `minimal` |
| Agency, studio, freelancer | `design-agencies`, `portfolio` | `typography`, `experimental`, `transitions` |
| E-commerce, DTC, product | `e-commerce`, `fashion` | `photography`, `luxury`, `shopify` |
| Real estate, architecture, hospitality | `real-estate`, `architecture`, `hotel-restaurant` | `luxury`, `fullscreen`, `big-background-images` |
| Food & drink, CPG | `food-drink` | `colorful`, `illustration` |
| Media, editorial, publishing | `magazine-newspaper-blog` | `typography`, `storytelling` |
| Culture, museum, nonprofit, education | `culture-education`, `institutions`, `social-responsibility` | `storytelling`, `illustration` |
| Music, film, entertainment, games | `music-sound`, `film-tv`, `games-entertainment` | `video`, `webgl`, `sound-audio` |
| Sports | `sports` | `video`, `motion` |
| Events, launches | `events`, `promotional` | `single-page`, `motion` |
| Mobile app marketing | `mobile-apps` | `app-style` |
| Corporate / enterprise | `business-corporate` | `clean`, `minimal` |

**Mood / technique tags:** `minimal`, `clean`, `colorful`, `retro`, `flat-design`, `typography`,
`experimental`, `unusual-navigation`, `horizontal-layout`, `storytelling`, `parallax`,
`scrolling`, `transitions`, `microinteractions`, `animation`, `motion`, `3d`, `webgl`,
`three-js`, `gsap`, `locomotive-scroll`, `glsl`, `data-visualization`, `illustration`,
`photography`, `video`, `fullscreen`, `single-page`, `header-design`, `footer-design`,
`menu-vertical`, `menu-horizontal`, `navigation`, `about-page`, `contact-page`, `404-pages`,
`forms-and-input`, `gallery`, `infinite-scroll`, `gestures-interaction`.

**Stack tags** (useful when the build target is fixed): `next-js`, `nuxt-js`, `astro`,
`svelte`, `vue-js`, `react`, `webflow`, `framer`, `shopify`, `tailwind`, `vite`, `vercel`,
`netlify`, `sanity`, `wordpress`.

## Etiquette and caching

- One listing plus ≤ 24 detail pages per run. Cache with `--out .sumi/refs/awwwards-<tag>.json`.
- Reuse a cache file under 7 days old instead of refetching.
- Never capture awwwards.com itself. The index is only used to find the live URL.
- If a detail page 403s or rate-limits, stop the run and use what was collected.

## Fallback

If `awwwards.mjs` errors (markup change, block), fall back to WebFetch on the listing URL and
ask for "each site's name and /sites/<slug> link", then WebFetch `/sites/<slug>` for the
"Visit site" URL. Report that the script needs a parser fix.
