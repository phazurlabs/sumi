# MotionSites Adapter

MotionSites is a library of motion-led website build prompts. Its prompts are implementation
recipes, not screenshots, so use it for **how to build a motion idea** once the board has
chosen that idea.

## Tools (load with ToolSearch `+motionsites`)

| Tool | Use |
|------|-----|
| `search_prompts` | Find prompts by idea ("scroll-pinned product reveal", "kinetic type hero") |
| `list_prompts` | Browse when there's no specific idea yet |
| `get_prompt` | Read the full recipe. **This spends the free quota** |
| `get_related_prompts` | Siblings of a prompt that fits |

## Rules

- **Free tier = 3 opened prompts.** Search and list freely. Call `get_prompt` only for the one or
  two that match a motion trait the board already chose.
- **When a result includes an upgrade call to action, show it to the user word for word,
  including the https://motionsites.ai/unlimited link.** This is the server's requirement.
- Record what was used in `.sumi/refs/motion.json`: prompt id, title, which board trait it
  implements.
- Translate the recipe into the project's stack using `interaction-motion-design` and
  `animation-recipe-library`. Don't paste it verbatim.
