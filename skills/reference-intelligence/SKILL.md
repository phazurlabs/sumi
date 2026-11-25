---
name: reference-intelligence
description: "Sources REAL design references instead of recalling them — award-winning live sites from Awwwards, app screens and flows from Mobbin (MCP), motion recipes from MotionSites (MCP) — captures them, measures their design DNA (type, color, spacing, grid, radius, motion stack), and synthesizes a Reference Board in .sumi/refs/ that every MAKE and REVIEW command builds and grades against. Use when the user mentions: inspiration, inspo, references, reference sites, moodboard, Awwwards, SOTD, site of the day, Mobbin, MotionSites, 'make it look like', 'sites like', 'award-winning', 'best in class', examples of, what are the best sites for, reference board, steal like an artist, benchmark against real sites."
---

# Reference Intelligence — look before you design

Every other Sumi skill encodes taste from memory. This one goes and **looks**. A
senior studio doesn't design a fintech landing page from recollection; it pulls
ten current winners onto a wall, pulls them apart, agrees what to steal, builds,
then pins the build next to the wall and asks whether it belongs there.

That loop has four steps and Sumi owns all of them:

| Step | What happens | Where it lives |
|------|--------------|----------------|
| **Scout** | Find 8-12 candidates from real sources | `scripts/awwwards.mjs`, Mobbin MCP, MotionSites MCP |
| **Capture** | Screenshot the LIVE sites and measure their DNA, in Claude in Chrome | `capture-protocol.md`, `scripts/capture-page.js`, `scripts/capture.mjs` → `.sumi/refs/<slug>/` |
| **Board** | Synthesize what to steal / avoid into one direction | `.sumi/refs/board.md` + `board.json` |
| **Compare** | Grade a build side by side with the board | `critic` agent, `/grade`, `/roast` |

## Source routing

| The ask is… | Primary source | Secondary |
|-------------|----------------|-----------|
| Marketing site, landing page, portfolio, brand, campaign | **Awwwards** | MotionSites for motion recipes |
| App screen, dashboard, settings, product UI | **Mobbin** | Awwwards `app-style` / `ui-design` tags |
| A flow (onboarding, checkout, signup, paywall, search) | **Mobbin** (flows) | — |
| Motion, scroll storytelling, WebGL, transitions | **Awwwards** (`gsap`, `three-js`, `webgl`, `transitions`, `scrolling`) | **MotionSites** |
| "Make it look like <url>" | That URL, captured straight away | Awwwards category of that site |

Adapters, one per source:
- `references/awwwards-adapter.md` — listings, the 192 category tags, sector → tag map, etiquette
- `references/mobbin-adapter.md` — MCP auth, query shapes, what may be stored
- `references/motionsites-adapter.md` — prompt library, free-tier limit, upgrade message rule
- `references/capture-protocol.md` — how to capture a site in Claude in Chrome, step by step
- `references/dna-schema.md` — what `capture-page.js` measures and how to read it
- `references/board-synthesis.md` — combining references without cloning one; `board.json` schema
- `references/comparison-protocol.md` — how the critic grades a build against the board

## Non-negotiables

1. **Real, not recalled.** A reference must be a URL that was fetched this session (or a cached
   fetch under `.sumi/refs/`), a Mobbin result from the MCP, or a MotionSites prompt. Never
   present a site as an Awwwards winner from memory.
2. **Capture the live site, not the thumbnail.** Awwwards and Mobbin are indexes. The DNA comes
   from the site itself.
3. **One measuring script, run in the real browser.** Every site is measured by the same
   `scripts/capture-page.js`, run in the page through Claude in Chrome. Never study a site by
   poking at its DOM step by step. Never Puppeteer, never Playwright.
4. **Small and on-demand.** 8-12 candidates per run, 3-5 kept. No bulk crawling of Awwwards;
   reuse a cached listing under `.sumi/refs/` if it is under 7 days old.
5. **Steal traits, never layouts.** The board takes at most ONE signature trait from each
   reference (see `board-synthesis.md`). A build that is recognisably one reference is a fail.
6. **Screenshots stay local.** Third-party captures are study material. Suggest adding
   `.sumi/refs/**/*.jpg` to `.gitignore`; never publish or deploy them.
7. **The user curates.** Present the shortlist and let them keep 3-5. Art direction is a choice,
   not a computation.

## Running the scripts

Scripts live in the plugin, not the project. Resolve the plugin root once:

```bash
SUMI="${CLAUDE_PLUGIN_ROOT}"
node "$SUMI/scripts/awwwards.mjs" technology --awarded --limit 10 --out .sumi/refs/awwwards-technology.json
node "$SUMI/scripts/capture.mjs" page                     # the in-page measuring script, for Claude in Chrome
node "$SUMI/scripts/capture.mjs" save <url> desktop --from .sumi/refs/awwwards-technology.json < result.json
node "$SUMI/scripts/capture.mjs" shot <url> desktop 0     # macOS: save the browser window
node "$SUMI/scripts/capture.mjs" list
```

Capture follows `references/capture-protocol.md`. It needs Claude in Chrome. Screenshots need
macOS (`screencapture`); elsewhere they are viewed, not saved. Allow a minute or two per site
for desktop and phone.

## Output: `.sumi/refs/`

```
.sumi/refs/
├── awwwards-<listing>.json   # scout results (cache)
├── mobbin.json               # Mobbin picks: app, screen/flow, url, why
├── motion.json               # MotionSites prompts used
├── <slug>/dna.json           # measured DNA, desktop + phone
├── <slug>/desktop-0..3.jpg   # scroll-step captures
├── <slug>/phone-0..2.jpg
├── board.md                  # human-readable Reference Board
└── board.json                # machine-readable direction every command consumes
```

`board.json` is the contract. `/style` turns its `direction` into tokens and its references
into the `references` array of `.sumi/style.json` (per `design-memory`, only `/style` writes
that file). `/page`, `/screen` and `/component` build against it; `/grade` and `/roast`
compare against it.

## Related skills
- `visual-design-mastery` — the 10-dimension scoring the comparison uses
- `screen-flow-patterns` — the screen/flow taxonomy used to phrase Mobbin queries
- `sector-style-intelligence` — sector norms; its "Inspiration Links" seed Mobbin queries
- `interaction-motion-design`, `animation-recipe-library` — translating captured motion stacks into code
