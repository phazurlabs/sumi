# Reference DNA — what `capture.mjs` measures

Every value is **computed style from the live, rendered DOM** after the page has been scrolled
through once, so scroll-reveals have fired. It describes what the site actually paints, not
what its CSS declares. `dna.json` holds one block per viewport (`desktop` 1440×900, `phone`
390×844).

## Shape

```jsonc
{
  "slug": "realevate", "url": "https://realevate.agency/",
  "source": "awwwards", "award": "SOTD", "score": 7.22, "tags": ["real-estate", "gsap"],
  "shots": ["desktop-0.jpg", "…", "phone-2.jpg"],
  "dna": {
    "desktop": {
      "theme": "light",                       // page background luminance < 0.45 → dark
      "pageHeight": 9800, "sectionCount": 9,
      "type": {
        "display": { "family": "…", "sizes": [144], "weight": "800", "lineHeight": 0.9, "tracking": "-0.035em", "transform": "none" },
        "heading": { … },                      // h2/h3
        "body":    { … },                      // the <p> with the most text
        "ui":      { … },                      // buttons, nav links
        "loadedFaces": ["Instrument Serif 400", "Bricolage Grotesque 200 800"]
      },
      "color": {
        "pageBackground": "rgb(248, 248, 246)",
        "backgrounds": [{ "color": "rgb(0, 34, 109)", "share": 0.18 }],   // share of page area
        "text": [{ "color": "rgb(85, 93, 107)", "count": 74 }]
      },
      "spacing": { "sectionPaddingY": [86, 152], "sectionHeights": [...], "gaps": [["16px", 11]] },
      "layout":  { "containerMaxWidths": [["1200px", 12]], "gridCount": 23, "flexCount": 45, "gridTemplates": [["12 cols", 11]] },
      "shape":   { "radii": [["999px", 28], ["16px", 9]] },
      "motion":  {
        "stack": { "gsap": false, "scrollTrigger": false, "lenis": true, "three": false, "webgl": false, "framer": false, "webflow": false, "barba": false, "swiper": false, "lottie": false, "locomotive": false },
        "canvases": 0, "videos": 4,
        "easings": [["cubic-bezier(0.33, 0, 0.2, 1)", 41]], "durations": [["0.22s", 19], ["1.1s", 10]]
      },
      "counts": { "images": 31, "links": 40, "buttons": 6, "forms": 1 }
    },
    "phone": { … }
  }
}
```

## How to read it (turning numbers into direction)

| Signal | Read it as |
|--------|-----------|
| `display.sizes[0] / body.sizes[0]` | **Type contrast ratio.** ≥ 6 is editorial/award territory; 3-4 is product-UI calm |
| `display.tracking` | Tight (≤ -0.03em) = confident display; positive tracking on display = luxury/fashion |
| `display.lineHeight` | < 1.0 = stacked, poster-like headlines |
| Number of families in `loadedFaces` | 1 = system discipline; 2 = pairing; 3+ = only if one is a mono/accent face |
| `color.backgrounds[0].share` | A large non-page background share = color-blocked sections (bands) |
| Distinct saturated colors | 1 accent = disciplined; 2+ = brand system; count what appears, not what is declared |
| `sectionPaddingY` max | ≥ 120px desktop = generous award rhythm; ≤ 64px = dense product page |
| `sectionHeights` with one outlier ≫ viewport | A **pinned / scroll-jacked** chapter |
| `gridTemplates` "12 cols" | A real column grid under the layout |
| `radii` | 0px = editorial/brutal; 999px pills + 12-16px cards = friendly product |
| `motion.stack` | `lenis` → smooth scroll. `gsap`/`scrollTrigger` → choreographed scroll. `webgl`/`three` → 3D. Bundled libs may read `false`, so check the shots too |
| `easings[0]` + `durations` | The house curve and tempo. Award sites almost always have ONE house easing |
| phone `display.sizes[0]` vs desktop | How aggressively type scales down (fluid `clamp()` range to copy) |

## Limits (say these when they matter)

- Library detection is best-effort. ES-module bundles leave no globals, so read the screenshots.
- Canvas/WebGL content is invisible to the DOM metrics. Screenshots are the only evidence.
- Sites behind a preloader longer than ~3s may capture the loader. Re-run that single URL.
- The captures are one moment in time. Hover, cursor and sound design aren't measured.
