# Reference Board — Kiln Coffee — 2026-09-28

Brief: landing page for Kiln, a small-batch coffee roaster in San Antonio. Primary action: **join the roast drop list.**
Route: Awwwards `food-drink --awarded` (8 candidates), 4 kept. Captured with `scripts/capture.mjs` on 2026-09-28.

## References

| # | Site | Source | Award · score | Trait we take | Evidence |
|---|------|--------|---------------|---------------|----------|
| 1 | ZEROZ (otsuka-air.jp) | Awwwards | SOTD · 7.41 | **Discipline.** One accent and one house curve. | Its main easing `cubic-bezier(0.3, 0.26, 0.38, 1)` is used 79 times; the only other curve appears 6 times. Green `rgb(0,168,82)` is its only saturated color. |
| 2 | Santioni Spirits | Awwwards | Honorable Mention | **Lettering as the hero.** One custom display word, centered, carries the whole first screen. | desktop-3: "The Nootturno Experience", hand-lettered with ligature play on a brushed dark field. DOM metrics are empty because the site is WebGL/canvas, so this comes from the screenshots. |
| 3 | Best Bean Best Cup | Awwwards | Honorable Mention | **Paper and roast bands.** Warm off-white surfaces alternate with full-bleed near-black bands. | Backgrounds by area: white 43%, `#F8F8EF` 20%, black 15%, `#F5F0E8` 13%. |
| 4 | Partake Foods | Awwwards | Honorable Mention | **Stickers.** Tilted callouts with hard offset shadows, slapped over the page. | desktop-0: "Better for you" and "Dang delicious" stickers at ±12°, with block-shadow controls. |

## Category norm (meet it, don't celebrate it)
- Big hero type
- Smooth scroll (Lenis/GSAP on 3 of 4)
- Mostly single-column flow
- Round or pill controls
- A product photo up top

## Direction
- **Type**
  - Display: Fraunces 900 (opsz 144, SOFT 100, WONK 1), `clamp(72px, 12vw, 184px)`, tracking -0.03em, leading 0.86. The soft, wonky axes play the part of Santioni's lettering.
  - Body: Hanken Grotesk 400, 18px / 1.6.
  - Two weights total (400 and 900). Type contrast ratio about 10.
- **Color**
  - Page is paper `#F3ECE1` and ink is roast `#1C1612`. Never #000 on #FFF.
  - Muted `#6F6358`.
  - **One accent:** ember `#E4572E`. Taken from ZEROZ's one-accent discipline, not its green.
  - Blocking: one full-bleed roast band (this month's drop) and one ember band (the drop list).
- **Rhythm:** section padding 144px desktop / 88px phone, 12-column grid, 1200px container.
- **Shape:** radius 0 everywhere. Controls get a hard 4px offset shadow in ink, Partake's sticker shadow squared off.
- **Motion**
  - One house curve: `cubic-bezier(0.3, 0.26, 0.38, 1)`, sampled from ZEROZ.
  - Tempo: 300ms for UI, 900ms for reveals.
  - Signature moment: the batch sticker slaps onto the hero (rotate and scale in, once).
  - Reduced motion turns every animation off.
- **One action:** the drop-list form, shown twice, in the hero and in the ember band. The nav holds only the wordmark and an anchor to the form.

## Avoid
- A purple/blue gradient anywhere
- Inter
- Three icon cards
- Stat counters with invented numbers ("10K+ happy customers")
- Testimonials from nobody
- An eyebrow badge above the headline
- A modal or popup of any kind
- A second CTA ("Learn more")
- Emoji as icons

## Rejected (and why)
- **ZEROZ's WebGL product scene and 5,000px pinned chapters.** Spectacle that competes with a one-field form.
- **Partake's six loaded font faces and four easings.** The opposite of the discipline we took from ZEROZ.
- **Best Bean's full-width brand lockup.** Two display moments would fight Santioni's single lettered hero.
- **Santioni's age gate and audio.** The brief has no reason for either.

Median jury score of the kept references: **7.41** (only ZEROZ carries a score; Honorable Mentions publish none).
