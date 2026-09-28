# Reference Board Synthesis

A board is not a moodboard. A moodboard says "vibes like these." A board says **which trait
comes from which reference, why it fits this brief, and what we refuse to take**. It is the
Art Director's brief to the builders and the Critic's answer key.

## The one-trait rule (anti-clone)

- Take **at most one signature trait per reference**: its type contrast, OR its color blocking,
  OR its pinned chapter, OR its grid. Never two from the same site.
- The combined direction must be something **none of the references is on its own**.
- Ask yourself: if someone put the build next to reference X, would they say "that's a copy of
  X"? If so, drop a trait from X.

## Steps

1. **Lay out the evidence.** For each kept reference: 2 screenshots (desktop-0 plus the most
   distinctive step) and its key DNA numbers (see `dna-schema.md`, "How to read it").
2. **Find the consensus.** What do 3+ references share? Shared traits are the *category norm*.
   Meet the norm, don't celebrate it.
3. **Find the spikes.** For each reference, what is the one thing that made the jury score it?
   That spike is the only candidate trait from that reference.
4. **Fit to the brief.** Keep a spike only if it serves the audience and the ONE primary
   action. A WebGL hero on a B2B procurement page is a spike that fails the fit.
5. **Resolve conflicts.** Two spikes that fight (brutal 0px editorial with pill-soft UI) → keep
   the one closer to the brief's mood and log the other under `rejected`.
6. **Write the direction as tokens, not adjectives.** Every line ends in a value the builders
   can type.
7. **Write the avoid list.** Category clichés the references share that would make the build
   look like the category's average.

## `board.md` layout

```
# Reference Board — <project> — <date>
Brief: <one sentence> · Primary action: <one action>

## References
| # | Site | Source | Award/score | Trait we take | Evidence |
|---|------|--------|-------------|---------------|----------|

## Category norm (meet it)
- …

## Direction
Type: display <family/size/tracking/leading>, body <family/size/leading>, contrast ratio N
Color: page <value>, ink <value>, accent <value> (1 accent), blocking <yes/no + where>
Rhythm: section padding <desktop>/<phone>, grid <cols>, container <max>
Shape: radius <value(s)>
Motion: <smooth scroll?> <house easing> <tempo> <signature moment + which section>

## Avoid
- …

## Rejected (and why)
- <trait> from <site>: <reason>
```

## `board.json` schema (the contract commands consume)

```json
{
  "version": 1,
  "createdAt": "2026-09-27T00:00:00Z",
  "brief": "fintech landing, dark, editorial",
  "primaryAction": "join the waitlist",
  "references": [
    { "slug": "realevate", "source": "awwwards", "url": "https://realevate.agency/", "award": "SOTD", "score": 7.22, "trait": "oversized display type split by a centered image", "dimension": "typography" }
  ],
  "norm": ["pill CTAs", "12-col grid", "one accent"],
  "direction": {
    "type":   { "display": { "family": "…", "sizeDesktop": "clamp(64px, 10vw, 144px)", "tracking": "-0.035em", "leading": 0.9, "weight": 700 }, "body": { "family": "…", "size": "17px", "leading": 1.6 }, "contrastRatio": 8 },
    "color":  { "page": "#0B0D10", "ink": "#EDEDE8", "muted": "#8A8F98", "accent": "#C9F26A", "blocking": "one full-bleed accent band at the proof section" },
    "rhythm": { "sectionPaddingY": { "desktop": 144, "phone": 88 }, "grid": 12, "container": 1200 },
    "shape":  { "radius": { "control": "999px", "card": "16px" } },
    "motion": { "smoothScroll": true, "easing": "cubic-bezier(0.33, 0, 0.2, 1)", "tempo": { "ui": "220ms", "reveal": "1.1s" }, "signature": "pinned product chapter, 3 steps" }
  },
  "avoid": ["gradient mesh hero", "three feature cards with icons"],
  "rejected": [{ "trait": "WebGL fluid hero", "from": "…", "why": "competes with the one action" }],
  "medianScore": 7.25
}
```

`medianScore` is the median Awwwards jury score of the kept references (ignore nulls). The
Critic uses it as the bar. Mobbin picks carry no score, so for app-UI boards the bar is
"matches or beats the reference pattern on step count, hierarchy and states."

`/inspo` writes only `.sumi/refs/`. It does NOT write `.sumi/style.json`, because the
`design-memory` contract makes `/style` its only creator. `/style` reads the board, turns
`direction` into DTCG tokens, and maps each reference to the `references` array
(`{app, platform, stealThis, takeaway}` ← `{name, source, trait, why}`). Append one
`decisions.log` line (NDJSON):
`{"ts": "...", "command": "/inspo", "decision": "board from N refs (sources)", "reason": "<direction in one line>", "overrides": []}`.
