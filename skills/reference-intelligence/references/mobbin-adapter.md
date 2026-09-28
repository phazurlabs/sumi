# Mobbin Adapter

Mobbin is the reference for **app UI and flows**: real shipped screens from real apps, tagged by
screen type, UI element and flow. It is reached through Mobbin's official MCP server
(`https://api.mobbin.com/mcp`), which requires a Mobbin account.

## Auth (one time)

1. Load the tools: `ToolSearch` with `+mobbin` (the query matches every `mcp__mobbin__*` tool).
2. If only `mcp__mobbin__authenticate` / `complete_authentication` come back, the server is not
   signed in. Call `authenticate`; it returns a sign-in URL. Give the user the URL, and after they
   finish, call `complete_authentication` if they paste back a code or callback URL. The user can
   also run `/mcp`, pick `mobbin`, and authenticate there.
3. Re-run `ToolSearch` `+mobbin`. The search and browse tools now appear. Use their
   schemas as the source of truth for parameter names. Don't guess them from this doc.

If the server isn't configured at all, tell the user to add it:
`claude mcp add --transport http mobbin https://api.mobbin.com/mcp`

## Query shapes

Phrase queries with the `screen-flow-patterns` taxonomy so they match how Mobbin tags content.

| Need | Query | Filter toward |
|------|-------|---------------|
| A screen type | "onboarding", "paywall", "settings", "empty state", "checkout" | platform: iOS / Android / Web |
| A flow | "sign up flow", "subscription cancellation", "add payment method" | flows over single screens |
| A UI element | "bottom sheet", "segmented control", "date picker", "toast" | elements |
| A benchmark app | the app name ("Revolut", "Linear", "Airbnb") | the app's full screen set |
| A sector | Seed from `sector-style-intelligence/references/<sector>-style.md` → "Inspiration Links" | platform |

Pull 8-12 candidates across at least 4 different apps. One app's full set is a benchmark, not a
board.

## What to record (`.sumi/refs/mobbin.json`)

```json
{
  "fetchedAt": "2026-09-27T00:00:00Z",
  "query": "wellness onboarding iOS",
  "picks": [
    {
      "source": "mobbin",
      "app": "Headspace",
      "platform": "iOS",
      "kind": "flow",
      "name": "Onboarding",
      "url": "https://mobbin.com/…",
      "screens": 7,
      "steal": "Asks one question per screen, answer chips are full-width, progress is a thin top bar",
      "avoid": "Paywall before first value"
    }
  ]
}
```

## Licensing

Mobbin screenshots are Mobbin's licensed content. **Study them in-session and record links plus
notes. Don't copy Mobbin images into `.sumi/refs/` or into the project.** DNA for app UI comes
from your analysis of the screens (layout, hierarchy, step count, element choices), not from
`capture.mjs`. If a pick also has a public marketing site, capture that site directly.

## When Mobbin is unavailable

Say so plainly. Fall back to the `screen-flow-patterns` taxonomy and the Awwwards `app-style` /
`ui-design` tags, and label the board "patterns from memory, not sourced." Never present
remembered screens as Mobbin results.
