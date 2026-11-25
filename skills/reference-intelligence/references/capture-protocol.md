# Capture protocol — how a live site becomes DNA and screenshots

Capture runs in the real browser through Claude in Chrome. Never Puppeteer, never Playwright. The measuring is one script, `scripts/capture-page.js`, run inside the page, so every site is measured the same way. The recording of results and screenshots is `scripts/capture.mjs`, which has no dependencies.

Resolve the plugin root once:

```bash
SUMI="${CLAUDE_PLUGIN_ROOT}"
```

## Before the first site

- Claude in Chrome must be connected. If it is not, ask the user to connect it and stop. Do not fall back to another browser driver.
- Screenshots use macOS `screencapture` and AppleScript (`capture.mjs size` and `shot`). The first shot asks for Screen Recording permission for Terminal, and the first `size` for Automation permission. Tell the user before you start.
- On a system other than macOS, `size` and `shot` exit with code 3. Size the window with Claude in Chrome, view each scroll step there, and write "shots viewed, not saved" in the board.
- `SUMI_BROWSER_APP` names the browser app if it is not Google Chrome.

## For each site

Do desktop first, then phone.

1. **Open** the live URL in a new Claude in Chrome tab. Never awwwards.com itself; the listing only gives the live URL.
2. **Size** the window: `node "$SUMI/scripts/capture.mjs" size desktop` (1440 by 900). For phone, `size phone`. Chrome may not go narrower than about 500 px; the DNA records the real width in `layout.viewport`.
3. **Wait** about 3 seconds. Preloaders and intro animations on award sites run 1 to 3 seconds.
4. **Clear the gate.** Run `scripts/capture-page.js` once with Claude in Chrome's JavaScript tool (print it with `node "$SUMI/scripts/capture.mjs" page`). It clicks an obvious accept or age-gate button and hides discount popups.
5. **Scroll steps.** Take 4 steps on desktop and 3 on phone: the top, then evenly down to the bottom. Scroll with Claude in Chrome's scroll action, which sends real wheel input; smooth-scroll sites (Lenis, Locomotive) ignore scripted scrolling. Pause about a second after each scroll. Then, on macOS:
   `node "$SUMI/scripts/capture.mjs" shot <url> desktop <step> [--from .sumi/refs/awwwards-<tag>.json]`
   If a gate came back after a preloader, run step 4 again before the shot.
6. **Measure.** Scroll back to the top, so every scroll reveal has fired once. Run `capture-page.js` again and pass the string it returns to:
   `node "$SUMI/scripts/capture.mjs" save <url> desktop [--from .sumi/refs/awwwards-<tag>.json] <<'JSON'` … `JSON`
   `--from` copies the award, score and tags from the scout's listing.
7. **Look.** Read `desktop-0.jpg`, the most distinctive step and `phone-0.jpg`. Flag a bad capture: a preloader, a blank canvas, a gate still up, or every step the same. Redo only that site.

Check the set with `node "$SUMI/scripts/capture.mjs" list`.

## Rules

- One measuring script for every site. Never study a site by poking at its DOM step by step, and never hand-edit a DNA file.
- A canvas or WebGL site cannot be fully measured from the DOM. Say so in the board, and lean on the screenshots.
- Third-party screenshots stay local, under `.sumi/refs/`, and out of git.
- Close the tabs you opened when the capture is done.
