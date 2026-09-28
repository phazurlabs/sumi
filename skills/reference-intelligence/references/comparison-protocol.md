# Comparison Protocol — grading a build against the board

A grade in the abstract drifts toward flattery. A grade next to the wall doesn't. This protocol
turns `/grade`, `/roast` and the `critic` agent into a side-by-side comparison whenever
`.sumi/refs/board.json` exists.

## 1. Capture the build the same way

Serve the build (dev server, `npx serve dist`, or the preview URL) and run the SAME script, so
the numbers are comparable:

```bash
node "$SUMI/scripts/capture.mjs" http://localhost:4321 --out .sumi/refs/_build
```

The build lands in `.sumi/refs/_build/<host>/` with the same DNA shape and the same scroll steps.

## 2. Diff DNA against the direction

| Check | Pass when |
|-------|-----------|
| Display family / tracking / leading | Matches `direction.type.display` (family exact; tracking ±0.01em; leading ±0.05) |
| Type contrast ratio | Within 20% of `direction.type.contrastRatio` |
| Accent discipline | Saturated colors in `color.text` + `color.backgrounds` ≤ the board's accent count + 1 |
| Section rhythm | `sectionPaddingY` max within 15% of `direction.rhythm.sectionPaddingY.desktop` |
| Grid | A grid with `direction.rhythm.grid` columns exists |
| Radius | Top radii match `direction.shape.radius` |
| House easing | `motion.easings[0]` is the board easing; no more than 2 distinct easings |
| Signature moment | Visible in the build's scroll-step screenshots |
| Avoid list | None of `avoid[]` visible in the screenshots |
| Phone | Phone display size ≤ 0.45 × desktop and nothing overflows 390px |

## 3. Score side by side

Look at the build's desktop-0..3 next to each reference's matching step. Score the build on the
10 dimensions from `visual-design-mastery/references/visual-scoring-framework.md`, **then score
the best reference on the same dimensions in the same pass**. The deltas matter more than the
absolute numbers.

```
| Dimension | Build | Best ref (slug) | Δ | Why (cite the screenshot step) |
```

## 4. Verdict

- **Clears the wall**: build ≥ reference on 7+ dimensions and no dimension more than 1.0 below.
  Report DQS and "clears the board (median jury score 7.25)".
- **Below the wall**: any dimension more than 1.0 below the best reference. Return a fix list
  keyed to that dimension, citing the reference trait that shows what good looks like. This
  list goes back to the `art-director` (direction problem) or the builder (execution problem),
  never to "overall polish."
- **Clone risk**: a build step that could be mistaken for one reference's matching step. Flag it
  even if it scores well.

Never score the build higher than the references because it "matches the board." Matching the
direction is the entry fee, not the grade.
