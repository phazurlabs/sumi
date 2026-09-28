# Before / After: Kiln Coffee

**One brief, two builds:** "A landing page for Kiln, a small-batch coffee roaster in San Antonio. One action: join the roast drop list."

- `before/`: the representative output of a coding agent with no design system. Every value is a default.
- `after/`: the same brief, run through Sumi.
  - `/sumi:inspo` scouted Awwwards `food-drink --awarded` and kept 4 of 8 (ZEROZ SOTD 7.41, plus three Honorable Mentions).
  - The Reference Board is `after/.sumi/refs/board.md`.
  - The page was built against that board.

Measured 2026-09-28 with `scripts/capture.mjs` (1440×900 and 390×844) and axe-core 4 (WCAG 2.2 AA). The DQS categories were scored by Claude against the `/sumi:grade` rubric in `commands/grade.md`.

A grade is a critique, not a verdict. The measurements are reproducible. The category scores are judgment, and the reasoning for each is written below.

## Measured (capture.mjs → dna.json)

| Signal | Before | After |
|---|---|---|
| Font faces loaded | Inter ×5 weights (400–800) | Fraunces 900 + Hanken Grotesk 400 |
| Display vs body size | 56px / 20px = **2.8×** | 173px / 22px = **7.9×** |
| Display tracking, leading | 0, 1.1 | -0.03em, 0.86 |
| Page / main text | `#FFFFFF` / `#000000` | `#F3ECE1` / `#1C1612` |
| Saturated solid colors | 2 purples, plus a purple→blue gradient (seen in the screenshots) | 1 (ember `#E4572E`) |
| Distinct easing curves | 4 | **1** |
| Largest section padding | 80px | 144px |
| Calls to action in the first viewport | 3 (Get Started, Join the Drop List, Learn More) | 1 (Join the drop) |
| Phone at 390px | cards and stats overflow sideways | reflows to one column |
| axe-core violations (desktop / phone) | 0 / 0 | 0 / 0 (after fixing one: see below) |

axe caught a real failure in the Sumi build on the first pass: paper text on the ember sticker at about 3.3:1. It was fixed to ink on ember at about 5.3:1. axe doesn't evaluate gradient-clipped text, so the before page's clean result doesn't cover its gradient headline.

## DQS (rubric: `commands/grade.md`)

| Category | Weight | Before | Why | After | Why |
|---|---|---|---|---|---|
| Visual Hierarchy | 20% | 55 | 3 competing CTAs, centered everything, eyebrow badge | 88 | One lettered hero, one action, the nav is just an anchor to it |
| Typography System | 15% | 50 | Generic face, 5 weights, no fluid sizing, 2.8× contrast | 86 | Two weights, `clamp()` display, tuned tracking and leading, 7.9× contrast |
| Color System | 15% | 25 | The rubric's floor case: "default purple/indigo on white" | 78 | A custom palette with one accent, in tokens. No dark theme and no full scales |
| Spacing & Layout | 15% | 35 | No breakpoints, so it overflows sideways at 390px | 84 | 12-column grid, 144/88 rhythm, clean collapse. The drop band's bottom runs long |
| Component Quality | 15% | 45 | Hover only. No labels, no custom focus, no form states | 68 | Hover, focus-visible and active states. The form has no loading, success or error state |
| Accessibility | 10% | 60 | axe passes, but inputs are named only by placeholder, and there's no reduced-motion support | 86 | Labels, focus rings, reduced motion, landmarks named. No skip link |
| Design System Coherence | 10% | 30 | Every value hardcoded | 80 | Color, type and motion tokens. Some sizes are still literal |
| **DQS** | | **43 (F)** | | **82 (A)** | |

## Reproduce

```bash
cd examples/before-after && python3 -m http.server 8931 &
node ../../scripts/capture.mjs http://localhost:8931/before/ http://localhost:8931/after/ --out /tmp/kiln
```

The reference captures of other people's sites aren't committed. Re-run `/sumi:inspo` or `scripts/capture.mjs --from after/.sumi/refs/awwwards-food-drink.json` to regenerate them.
