---
name: inspo
description: "Source REAL references — live Awwwards winners, Mobbin screens and flows, MotionSites motion recipes — capture the sites, measure their design DNA, and build a Reference Board in .sumi/refs/ that later commands design and grade against."
argument-hint: "[brief, flow, or URLs — e.g. \"fintech landing, dark, editorial\"]"
---

# Inspo — Look Before You Design

Put real, current, award-winning work on the wall, pull it apart, and agree on a direction
**before** anything is built. Load the `reference-intelligence` skill and follow its
non-negotiables. The most important one: every reference must be fetched, never recalled.

**Input**: `$ARGUMENTS` can be a brief ("fintech landing, dark, editorial"), a flow ("wellness
onboarding iOS"), URLs to study ("like linear.app and stripe.com"), or nothing (read `.sumi/`).

Resolve the plugin scripts once:
```bash
SUMI="${CLAUDE_PLUGIN_ROOT:-$(dirname "$(dirname "$(find ~/.claude/plugins -path '*sumi*/scripts/capture.mjs' -print -quit)")")}"
```

---

## Step 0 — Context

Read, if present: `.sumi/brief.json`, `.sumi/style.json`, and an existing
`.sumi/refs/board.json`. If a board exists and is under 30 days old, ask: **refresh**,
**extend**, or **keep**.

If nothing says what is being built, ask exactly two questions:
1. What is it, and what is the ONE action a visitor should take?
2. What sector and mood? Use the user's own words.

## Step 1 — Route

Use the routing table in `reference-intelligence`:
- **Site, landing page or brand** → Awwwards. Pick 1-2 tags from the sector → tag map in
  `reference-intelligence/references/awwwards-adapter.md` (always `--awarded` on tags), plus `sotd` for recency.
- **App screen or flow** → Mobbin MCP (`reference-intelligence/references/mobbin-adapter.md`). Authenticate first if needed.
- **Motion-led** → also search MotionSites (`reference-intelligence/references/motionsites-adapter.md`).
- **URLs given** → capture those directly, and still pull 3-5 Awwwards peers from their category.

State the route in one line before running it.

## Step 2 — Scout

```bash
node "$SUMI/scripts/awwwards.mjs" <tag> --awarded --limit 10 --out .sumi/refs/awwwards-<tag>.json
```
Reuse any cache under 7 days old. For Mobbin, collect 8-12 picks across at least 4 apps and
write them to `.sumi/refs/mobbin.json`.

## Step 3 — Shortlist (the art-direction moment)

Present 8-12 candidates in one table:

```
| # | Site / App | Source | Award · score | Tags / platform | Why it's here (one line) |
```

Ask the user to keep **3-5**. Put your recommended picks first and recommend a *spread*:
different strengths, not five versions of the same site.

## Step 4 — Capture

Capture all kept web references in one call, in the background if there are more than 3:
```bash
node "$SUMI/scripts/capture.mjs" --from .sumi/refs/awwwards-<tag>.json --pick a,b,c [extra URLs…]
```
While it runs, analyse the Mobbin picks. Then **look at the screenshots** for each reference:
desktop-0, its most distinctive step, and phone-0. Re-run any single URL whose capture shows
a preloader or a consent wall.

## Step 5 — Board

Follow `reference-intelligence/references/board-synthesis.md`: one trait per reference, the category norm, direction
written as tokens, an avoid list and a rejected list. Write `.sumi/refs/board.md` and
`.sumi/refs/board.json`, and append one line to `.sumi/decisions.log`. Don't write
`.sumi/style.json`; `/style` owns it and reads the board. Suggest adding `.sumi/refs/**/*.jpg`
to `.gitignore`.

---

## Quality Gates

The output MUST include:
- [ ] The route (sources and tags) stated before scouting
- [ ] A shortlist in which every row has a live URL fetched this session or read from `.sumi/refs/`
- [ ] The user's own selection of 3-5 references, not an automatic pick
- [ ] Captured DNA for every kept web reference, and screenshots actually viewed
- [ ] A board with exactly one trait per reference, direction as values (not adjectives),
      an avoid list, and a rejected list
- [ ] `medianScore` computed from the kept Awwwards references (nulls ignored)
- [ ] A plain statement of any source that was unavailable

The output MUST NOT include:
- A site presented as an Awwwards winner, or a screen presented as a Mobbin result, from memory
- Two or more traits taken from the same reference
- Step-by-step browser MCP navigation to study a site. Capture is one script call
- Captured third-party screenshots published, deployed or committed

---

## Cross-References

- `reference-intelligence` — sources, adapters, DNA schema, board synthesis
- `visual-design-mastery` — the 10 dimensions each reference is read against
- `screen-flow-patterns` — taxonomy for phrasing Mobbin queries
- `sector-style-intelligence` — category norms, and seed queries in each sector's inspiration links
- `design-memory` — the `.sumi/` contract `/inspo` writes into

---

## Next Steps

```
Board saved → .sumi/refs/board.json (N refs · median jury score X.XX)
```
- `/style` — turn the board's direction into a full token system in `.sumi/style.json`
- `/page` or `/screen` — build against the board
- `/grade` — score the build side by side with the references
