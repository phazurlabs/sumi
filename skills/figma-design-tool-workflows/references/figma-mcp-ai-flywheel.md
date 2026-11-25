# Figma MCP & AI Design-to-Code Flywheel

## 1. The Design-to-Code Gap

The handoff between design and engineering has been the most persistent source of friction in product development for over two decades. Designers create pixel-precise compositions in tools like Figma, Sketch, or Adobe XD. Developers then open those files, squint at measurements, and manually rebuild every layout, spacing value, color, and interaction from scratch in code. The result is a lossy, error-prone translation process that erodes design intent at every step.

### The Traditional Handoff

In the conventional workflow, designers export their work as static specifications: redline documents annotating spacing, font sizes, and colors; style guides listing hex values and typographic scales; and interaction specs describing hover states, transitions, and responsive breakpoints. Developers consume these artifacts like archaeologists interpreting ancient texts -- inferring intent from incomplete evidence, making judgment calls where specs are ambiguous, and frequently guessing wrong.

The phrase "pixel-perfect" became a loaded term in this era. It implied that developers should reproduce designs with zero deviation, but the tools and processes made this nearly impossible. CSS does not think in Figma frames. Auto Layout does not map directly to flexbox without interpretation. A designer's "8px spacing" might become a developer's `margin-bottom: 0.5rem` or `gap-2` or `padding: var(--space-xs)` depending on the codebase conventions -- and often the choice is made inconsistently.

### The Cost

Industry research consistently quantifies this gap:

- **40-60% of front-end development time** is spent translating visual designs into code, rather than solving engineering problems (Forrester Research, 2022; Figma State of Design, 2023).
- **Design drift** -- the gradual divergence between shipped product and approved designs -- affects 73% of product teams, with an average of 2.3 QA cycles required per component to achieve acceptable fidelity (Zeplin Industry Report, 2023).
- **Design system adoption** stalls at 40-50% in organizations where the design-to-code pipeline is manual, because the overhead of keeping Figma components and code components synchronized is unsustainable (Sparkbox Design Systems Survey, 2024).
- **Developer dissatisfaction**: In Stack Overflow surveys, "translating mockups to code" consistently ranks among the least satisfying tasks for front-end engineers.

The root cause is structural: design tools and code editors operate on fundamentally different models of reality. Figma represents UI as a spatial hierarchy of frames, groups, and layers with absolute or auto-layout positioning. Code represents UI as a semantic tree of components with style abstractions. Bridging these models has historically required a human interpreter -- the front-end developer -- who serves as a manual compiler between two incompatible systems.

The Figma MCP server and AI-assisted code generation eliminate this manual compilation step. They do not replace designers or developers; they remove the translation tax that makes both roles less effective.

---

## 2. Figma MCP Server

### What Is MCP (Model Context Protocol)

The Model Context Protocol (MCP) is an open standard introduced by Anthropic in late 2024 that enables AI models to interact with external tools and data sources through a unified interface. MCP defines a client-server architecture where:

- An **MCP client** (such as Claude Code, Claude Desktop, or any compatible AI agent) sends structured requests.
- An **MCP server** exposes tools, resources, and prompts that the client can invoke.
- Communication follows a JSON-RPC-based protocol over stdio or HTTP.

MCP servers act as bridges between AI models and specific domains -- file systems, databases, APIs, and in this case, design tools.

### What the Figma MCP Server Exposes

The Figma MCP server connects Claude to the Figma REST API and translates Figma's document model into structured data that Claude can reason about. It exposes:

- **File structure**: The complete node tree of a Figma file, including pages, frames, groups, components, instances, and their hierarchical relationships.
- **Component metadata**: Component names, descriptions, variant properties, and the mapping between component sets and their variants.
- **Styles**: Fill colors, stroke properties, text styles (font family, size, weight, line height, letter spacing), effect styles (shadows, blurs), and grid styles.
- **Variables**: Figma variable collections, variable names, values across modes (e.g., light/dark theme), and variable bindings on nodes.
- **Layout properties**: Auto Layout direction, spacing, padding, alignment, sizing mode (fixed, hug, fill), min/max constraints, and absolute positioning offsets.
- **Text content**: All text strings, their associated text styles, and text auto-resize behavior.
- **Export settings**: Configured export formats, scales, and suffixes.
- **Component properties**: Boolean, text, instance-swap, and variant properties exposed on component instances.

### Configuration in Claude Code

To configure the Figma MCP server for use with Claude Code, add it to your project's `.mcp.json` or your user-level MCP configuration:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

Alternatively, if using the community Figma MCP server or a self-hosted variant:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-mcp-server", "--file-key", "YOUR_FILE_KEY"],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### Authentication

The Figma MCP server authenticates via a **Figma Personal Access Token (PAT)**. To generate one:

1. Open Figma and navigate to Account Settings.
2. Scroll to "Personal access tokens."
3. Create a new token with a descriptive name (e.g., "Claude MCP Integration").
4. Copy the token immediately -- it will not be shown again.
5. Store the token securely. Never commit it to version control. Use environment variables or a secrets manager.

Token scopes required: `file:read` at minimum. For write operations (if supported by the MCP server variant), `file:write` is also needed.

### Available Tools and Resources

Typical tools exposed by the Figma MCP server include:

| Tool Name | Description |
|-----------|-------------|
| `get_file` | Retrieve the full document tree for a Figma file |
| `get_file_nodes` | Retrieve specific nodes by their IDs |
| `get_file_styles` | List all published styles in a file |
| `get_file_components` | List all components and component sets |
| `get_file_variables` | Retrieve variable collections and their values |
| `get_node_image` | Export a specific node as an image (PNG, SVG, PDF) |
| `get_comments` | Retrieve comments on a file |
| `search_nodes` | Search for nodes by name or type |

### Rate Limits and Caching Strategies

The Figma REST API enforces rate limits (typically 30 requests per minute for reads). The MCP server should implement:

- **Response caching**: Cache file structure responses for 5-15 minutes. Figma files change infrequently during active generation sessions.
- **Node-level fetching**: Use `get_file_nodes` with specific node IDs rather than fetching the entire file tree repeatedly.
- **Pagination awareness**: Large files may require paginated responses; the MCP server should handle this transparently.
- **Exponential backoff**: On 429 (rate limit) responses, back off with increasing delays.
- **Selective depth**: Request only the depth of the node tree needed. A component's immediate children are usually sufficient; deep recursive fetches waste quota.

---

## 3. The Flywheel Architecture

The design-to-code flywheel is a five-step cycle where each iteration improves the fidelity, speed, and reliability of the next. Unlike a linear handoff, a flywheel compounds value over time: better-named Figma components produce cleaner MCP reads, which generate more accurate code, which validates faster, which ships sooner, which frees designers to refine the system further.

### The Five Steps

**Step 1 -- Design in Figma.** Designers create components using a structured component library with consistent naming conventions (`Button/Primary/Large`), proper use of Auto Layout, Figma Variables for all tokenized values (colors, spacing, radii, typography), and descriptive component properties. The quality of this step determines the quality of everything downstream.

**Step 2 -- Read via MCP.** Claude queries the Figma file through the MCP server, extracting the component tree, style bindings, variable references, layout properties, and text content. The result is a structured representation of the design that Claude can reason about programmatically.

**Step 3 -- Generate Code via Claude.** Claude maps Figma components to their code equivalents, applying design tokens from the extracted variables, translating Auto Layout to CSS Flexbox or Grid, and generating typed component interfaces. The output is production-quality code that references the design system's token layer rather than hardcoded values.

**Step 4 -- Validate.** Automated checks run against the generated code: visual regression tests compare rendered output to Figma exports, accessibility audits verify WCAG compliance, token compliance checks ensure no hardcoded style values, and type checks verify the component API surface.

**Step 5 -- Ship.** The validated code is submitted as a pull request, reviewed by a developer for architectural correctness and edge cases, merged, and deployed. Feedback from this step (naming inconsistencies discovered, missing variants, edge cases) flows back to Step 1.

### Flywheel Diagram

```
                    +---------------------+
                    |  1. DESIGN IN FIGMA |
                    |  Component library  |
                    |  Variables + tokens  |
                    +----------+----------+
                               |
                    Feedback    |    Structured
                    from ship  |    components
                               v
    +----------------+    +----+----------------+
    | 5. SHIP        |    | 2. READ VIA MCP     |
    | PR + review    |    | Extract tree, styles |
    | Merge + deploy |    | Variables, layout    |
    +-------+--------+    +---------+-----------+
            ^                       |
            |                       | Structured
     Validated                      | design data
     code                           v
            |              +--------+-----------+
    +-------+--------+    | 3. GENERATE CODE    |
    | 4. VALIDATE     |<--| Map to components   |
    | Visual diff     |   | Apply tokens        |
    | a11y + tokens   |   | Type interfaces     |
    +-----------------+   +---------------------+
```

The flywheel effect emerges because improvements at any step amplify all subsequent steps. When designers adopt stricter naming conventions (Step 1), MCP reads become more reliable (Step 2), code generation accuracy increases (Step 3), fewer validation failures occur (Step 4), and shipping accelerates (Step 5). The compounding nature of these improvements is what distinguishes this approach from one-time code generation tools.

---

## 4. Practical Walkthrough: Card Component

### Figma Specification

Consider a Card component in Figma with the following structure:

```
Card (Auto Layout: Vertical, padding: 0, gap: 0, corner-radius: $radius-lg)
  +-- CardImage (Frame, fill: Image, aspect-ratio: 16:9)
  +-- CardContent (Auto Layout: Vertical, padding: $space-md, gap: $space-sm)
      +-- TagGroup (Auto Layout: Horizontal, gap: $space-xs)
      |   +-- Tag (instance of Tag component, text: "Design")
      |   +-- Tag (instance of Tag component, text: "Tutorial")
      +-- Title (Text, style: $heading-sm, "Getting Started with Design Systems")
      +-- Description (Text, style: $body-md, truncate: 3 lines)
      +-- CTAButton (instance of Button/Secondary/Medium, text: "Read More")
```

All color, spacing, typography, and radius values are bound to Figma Variables rather than hardcoded.

### MCP Query

To extract this card's properties programmatically, Claude would invoke the MCP server:

```
Tool: get_file_nodes
Input: { "file_key": "abc123XYZ", "node_ids": ["42:1337"] }
```

The response returns a JSON structure representing the Card node and all its children, including layout properties, style references, variable bindings, and text content. Claude parses this to understand:

- The component hierarchy and slot structure.
- Which design tokens are in use (via variable bindings).
- Auto Layout properties (direction, gap, padding, alignment).
- Text content and overflow behavior.
- Component instances and their property overrides.

### Code Generation

Based on the MCP data, Claude generates:

```tsx
import { type ReactNode } from "react";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";
import styles from "./Card.module.css";

interface CardProps {
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  title: string;
  description: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export function Card({
  imageUrl,
  imageAlt,
  tags,
  title,
  description,
  ctaLabel = "Read More",
  onCtaClick,
}: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <Button
          variant="secondary"
          size="medium"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
```

```css
/* Card.module.css */
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface-primary);
  box-shadow: var(--shadow-sm);
}

.imageContainer {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  gap: var(--space-sm);
}

.tagGroup {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.title {
  font: var(--heading-sm);
  color: var(--color-text-primary);
  margin: 0;
}

.description {
  font: var(--body-md);
  color: var(--color-text-secondary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

Note that every style value references a design token (CSS custom property) rather than a hardcoded value. This is a direct consequence of the Figma file using Variables correctly.

### Prompt Templates for Figma-to-Code

When using Claude to read Figma specs and generate code, use structured prompt templates:

**Component generation prompt:**
```
Read the Figma component at node [NODE_ID] in file [FILE_KEY] using the
Figma MCP server. Extract all layout properties, style bindings, variable
references, text content, and component instances.

Generate a React TypeScript component that:
1. Maps Figma Auto Layout to CSS Flexbox/Grid
2. Uses CSS custom properties for ALL visual values (from Figma variables)
3. Creates a typed props interface matching the component's configurable properties
4. Includes proper semantic HTML elements
5. Follows [project naming convention] for files and exports

Output the component file and its CSS module. Do not hardcode any color,
spacing, typography, or radius values.
```

**Layout extraction prompt:**
```
Analyze the Figma frame at node [NODE_ID]. Extract the complete layout
structure including:
- Auto Layout direction, gap, padding, and alignment for each level
- Child sizing modes (fixed, hug, fill) and constraints
- Responsive behavior hints from min/max width settings
- Nested Auto Layout configurations

Generate the equivalent CSS Grid or Flexbox layout. Use container queries
for responsive breakpoints where the Figma file shows multiple layout
variants.
```

---

## 5. Code Connect

### Overview

Code Connect is a Figma feature that lets teams link their Figma components directly to their actual code components. When a developer inspects a component in Figma's Dev Mode, instead of seeing auto-generated CSS snippets (which are often useless in a component-based architecture), they see the real import statement and usage code for the corresponding code component.

### Setup Process

1. **Install the Code Connect CLI**:
   ```bash
   npm install -D @figma/code-connect
   ```

2. **Create a configuration file** (`figma.config.json`) at the project root:
   ```json
   {
     "codeConnect": {
       "parser": "react",
       "include": ["src/components/**/*.figma.tsx"],
       "importPaths": {
         "src/components/*": "@/components/*"
       }
     }
   }
   ```

3. **Write Code Connect files** for each component. These files describe how Figma component properties map to code props:

   ```tsx
   // src/components/Button/Button.figma.tsx
   import figma from "@figma/code-connect";
   import { Button } from "./Button";

   figma.connect(Button, "https://figma.com/file/abc123/Design-System?node-id=42:100", {
     props: {
       label: figma.string("Label"),
       variant: figma.enum("Variant", {
         Primary: "primary",
         Secondary: "secondary",
         Ghost: "ghost",
       }),
       size: figma.enum("Size", {
         Small: "sm",
         Medium: "md",
         Large: "lg",
       }),
       disabled: figma.boolean("Disabled"),
       icon: figma.instance("Icon Slot"),
     },
     example: ({ label, variant, size, disabled, icon }) => (
       <Button variant={variant} size={size} disabled={disabled} icon={icon}>
         {label}
       </Button>
     ),
   });
   ```

4. **Publish** the Code Connect mappings:
   ```bash
   npx figma connect publish
   ```

### Benefits for the Flywheel

Code Connect complements the MCP-driven flywheel by:

- **Closing the loop**: Once Claude generates a component and it ships, Code Connect links it back to Figma, so future developers see real code, not generated CSS.
- **Reducing MCP dependency for known components**: If a component already has a Code Connect mapping, Claude can reference the existing code implementation directly rather than re-deriving it from the Figma spec.
- **Enforcing naming alignment**: The process of writing Code Connect files forces teams to explicitly map Figma property names to code prop names, which surfaces naming inconsistencies early.
- **Dev Mode enrichment**: Developers inspecting any instance of a connected component in Dev Mode see the exact import and usage code, including the correct prop values for that specific instance.

---

## 6. Design Token Extraction

### From Figma Variables to Design Tokens

Figma Variables provide a native mechanism for defining design tokens within Figma. The MCP server can extract these variables and their values across all defined modes (themes, breakpoints, brands).

The standard token architecture follows a three-tier model:

- **Primitive tokens** (Tier 1): Raw values. `blue-500: #3B82F6`, `space-4: 16px`, `font-size-md: 1rem`.
- **Semantic tokens** (Tier 2): Purpose-assigned aliases. `color-primary: {blue-500}`, `spacing-component-gap: {space-4}`.
- **Component tokens** (Tier 3): Component-scoped aliases. `button-bg-primary: {color-primary}`, `card-padding: {spacing-component-gap}`.

In Figma, these tiers map to Variable Collections:

| Figma Collection | Token Tier | Example |
|-----------------|------------|---------|
| Primitives | Tier 1 | `blue/500 = #3B82F6` |
| Semantic | Tier 2 | `color/primary = {Primitives.blue/500}` |
| Components | Tier 3 | `button/bg-primary = {Semantic.color/primary}` |

### Generating Style Dictionary Input

Claude can extract Figma variables via MCP and transform them into Style Dictionary-compatible JSON:

```json
{
  "color": {
    "primary": {
      "$value": "{color.blue.500}",
      "$type": "color",
      "$description": "Primary brand color"
    },
    "blue": {
      "500": {
        "$value": "#3B82F6",
        "$type": "color"
      }
    }
  },
  "space": {
    "xs": { "$value": "4px", "$type": "dimension" },
    "sm": { "$value": "8px", "$type": "dimension" },
    "md": { "$value": "16px", "$type": "dimension" },
    "lg": { "$value": "24px", "$type": "dimension" },
    "xl": { "$value": "32px", "$type": "dimension" }
  }
}
```

This format follows the W3C Design Tokens Community Group specification (DTCG), which uses `$value` and `$type` prefixes.

### Multi-Platform Output

From the Style Dictionary input, the build pipeline generates platform-specific outputs:

**CSS Custom Properties:**
```css
:root {
  --color-primary: #3B82F6;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
}
```

**Tailwind Configuration:**
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
      },
    },
  },
};
```

**Swift (iOS):**
```swift
public enum DesignTokens {
    public enum Color {
        public static let primary = UIColor(hex: "#3B82F6")
    }
    public enum Space {
        public static let xs: CGFloat = 4
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 16
    }
}
```

**Kotlin (Android):**
```kotlin
object DesignTokens {
    object Color {
        val primary = Color(0xFF3B82F6)
    }
    object Space {
        val xs = 4.dp
        val sm = 8.dp
        val md = 16.dp
    }
}
```

The MCP-to-token pipeline ensures that Figma remains the single source of truth for design decisions, while code across all platforms stays synchronized.

---

## 7. Prompt Engineering for Design-to-Code

Effective prompts for design-to-code translation share a common structure: context (what the design system expects), specification (what the Figma data describes), constraints (what rules the output must follow), and format (what the output should look like).

### Template: React/TypeScript Component from Figma

```
Context:
- Design system: [system name], React 18+, TypeScript strict mode
- Token layer: CSS custom properties following --category-property-variant naming
- Component library: [library name] with existing primitives: Button, Tag, Icon, Avatar
- Styling approach: CSS Modules with BEM-like class naming

Specification (from Figma MCP):
[Paste or reference the MCP node data here]

Constraints:
1. All visual values must reference design tokens (CSS custom properties). Zero hardcoded colors, spacing, radii, or font values.
2. Component must accept a typed props interface. Infer prop types from Figma component properties.
3. Use semantic HTML elements (article, nav, section, heading levels) appropriate to the component's role.
4. Include aria attributes where needed for accessibility.
5. Support both controlled and uncontrolled patterns where applicable.
6. Handle edge cases: empty states, truncation, loading states.

Output:
- ComponentName.tsx (component file)
- ComponentName.module.css (styles)
- ComponentName.test.tsx (basic render + accessibility tests)
- ComponentName.stories.tsx (Storybook stories matching Figma variants)
```

### Template: Responsive Layout Conversion

```
Convert the following Figma layout data to responsive CSS.

Figma frame structure:
[MCP node tree data]

Requirements:
- Mobile-first approach: base styles target 320px viewport
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Use CSS Grid for the overall page layout
- Use Flexbox for component-internal layouts
- Container queries for components that need responsive behavior independent of viewport
- All spacing via design tokens
- Prefer logical properties (inline/block) over physical (left/right/top/bottom)
```

### Template: SwiftUI View from Figma

```
Generate a SwiftUI view matching this Figma component specification.

Component data (from MCP):
[MCP node data]

Requirements:
- Use the project's DesignTokens enum for all style values
- Follow MVVM pattern: View + ViewModel protocol
- Support Dynamic Type for all text
- Support Dark Mode via token layer
- Include preview providers showing all variants
- Handle VoiceOver accessibility labels and traits
```

### Template: Design Token Audit

```
Analyze the following Figma file's variable usage via MCP and identify:

1. Variables that are defined but unused
2. Nodes using hardcoded values instead of variables
3. Inconsistent variable naming (deviation from the naming convention)
4. Missing semantic tokens (primitives used directly on components)
5. Mode coverage gaps (variables defined in Light but missing in Dark)

Output a structured report with node IDs for each finding.
```

---

## 8. Quality Gates

Generated code must pass through automated quality gates before merging. These gates catch the inevitable imperfections in AI-generated output and maintain production standards.

### Visual Regression Testing

- **Chromatic** (by the Storybook team): Captures screenshots of every Storybook story and compares against a baseline. Integrates directly into CI. Catches unintended visual changes down to the sub-pixel level.
- **Percy** (by BrowserStack): Similar screenshot comparison with cross-browser testing. Useful when generated components must render identically across Chrome, Firefox, Safari, and Edge.
- **BackstopJS**: Open-source alternative for teams that need self-hosted visual regression. Configurable viewport sizes and selectors.

For the flywheel, the baseline is a rendered screenshot from Figma (exported via the MCP server's `get_node_image` tool). The generated component is rendered in Storybook and compared against this baseline. Acceptable threshold: less than 0.1% pixel difference for static components, less than 1% for components with font rendering variations.

### Accessibility Automated Checks

- **axe-core** integration via `jest-axe` or `cypress-axe` catches WCAG 2.1 AA violations in generated markup.
- **Storybook a11y addon** runs axe checks on every story during development.
- **Lighthouse CI** provides accessibility scores as part of the CI pipeline.

Minimum gate requirements for generated components:
- Zero critical or serious axe violations.
- All interactive elements must be keyboard accessible.
- Color contrast ratios must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
- All images must have alt text or be marked decorative (`alt=""`).

### Token Compliance Validation

A custom linter (or ESLint/Stylelint rule) scans generated CSS for hardcoded values:

- No hex colors outside the token definition files.
- No pixel values for spacing outside the token definition files.
- No font-family, font-size, or font-weight declarations that do not reference a token.
- No border-radius values that do not reference a token.

Tools like `stylelint-declaration-strict-value` enforce this automatically.

### Performance Budgets

Generated components must meet performance thresholds:

- **Bundle size**: Individual component JS must not exceed a defined budget (e.g., 15KB gzipped for a complex component).
- **Render performance**: Components must render within 16ms (one frame at 60fps) as measured by React Profiler or equivalent.
- **CSS specificity**: Generated CSS must not use `!important` or ID selectors. Maximum specificity score per rule should not exceed 0,2,0.
- **DOM depth**: Generated markup should not exceed 10 levels of nesting.

---

## 9. Team Workflow Integration

### PR Templates for Design-to-Code

Pull requests that originate from the flywheel should use a standardized template:

```markdown
## Design-to-Code PR

### Figma Source
- File: [Figma file link]
- Node: [Node ID or direct Figma node link]
- Last modified: [Date the Figma component was last updated]

### What was generated
- [ ] Component file(s)
- [ ] Style file(s)
- [ ] Test file(s)
- [ ] Storybook stories
- [ ] Design token updates

### Generation method
- MCP server version: [version]
- Claude model: [model ID]
- Prompt template: [template name or link]

### Manual modifications
[List any hand-edits made after generation, and why]

### Validation results
- [ ] Visual regression: [pass/fail, link to Chromatic/Percy build]
- [ ] Accessibility audit: [pass/fail, violation count]
- [ ] Token compliance: [pass/fail]
- [ ] Type check: [pass/fail]
- [ ] Unit tests: [pass/fail]

### Design review
- [ ] Designer has approved the rendered output
```

### Design Review Checkpoints

The flywheel does not eliminate design review -- it makes it more focused. Designers review:

1. **Rendered output vs. Figma intent**: Does the component look and behave as designed? Viewed in Storybook, not just in code.
2. **Responsive behavior**: Does the component adapt correctly at all breakpoints? Figma designs often only show 2-3 breakpoints; code must interpolate.
3. **Interaction states**: Hover, focus, active, disabled, loading, error, empty. Figma may specify some; code must handle all.
4. **Motion and transitions**: Often underspecified in Figma. Designer validates that implemented transitions match intent.

### Figma Branch to Git Branch Alignment

For teams using Figma branching:

- Figma branch names should mirror Git branch naming conventions: `feature/card-redesign`, `fix/button-contrast`.
- The MCP server should be pointed at the Figma branch (not main) during development, so Claude reads the in-progress design.
- Figma branch merge and Git branch merge happen in coordination, ideally in the same sprint.

### Storybook as Shared Source of Truth

Storybook serves as the neutral ground where design and engineering can verify alignment:

- Every generated component has stories matching each Figma variant.
- Storybook is deployed automatically on every PR (via Chromatic or a custom deployment).
- Designers bookmark the deployed Storybook URL and review there, not in code.
- Design tokens are visualized in Storybook via a token documentation page.

### CI/CD Pipeline Integration

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ PR Created   │--->│ Build + Test │--->│ Visual Diff  │
│              │    │ Lint, Types  │    │ Chromatic/   │
│              │    │ Unit Tests   │    │ Percy        │
└──────────────┘    └──────┬───────┘    └──────┬───────┘
                           │                    │
                    ┌──────v───────┐    ┌──────v───────┐
                    │ a11y Audit   │    │ Token Lint   │
                    │ axe-core     │    │ No hardcoded │
                    │              │    │ values       │
                    └──────┬───────┘    └──────┬───────┘
                           │                    │
                    ┌──────v────────────────────v──┐
                    │ All gates pass?               │
                    │ Yes -> Ready for review       │
                    │ No  -> Block merge            │
                    └──────────────────────────────┘
```

---

## 10. ROI and Metrics

### Development Time Reduction

The primary ROI of the design-to-code flywheel is time savings in front-end implementation:

- **50-70% reduction in initial component development time** is consistently reported by teams using AI-assisted design-to-code workflows (Vercel Ship 2024 keynote; Figma Config 2024 case studies; Builder.io internal benchmarks).
- **Component scaffolding** (the most mechanical part of front-end work) drops from hours to minutes. A complex card component that previously took 4-6 hours to implement from a Figma spec can be generated, validated, and refined in 30-60 minutes.
- **Design system buildout** (creating the initial component library) is accelerated by 3-5x. A system with 50 components that previously took 3-4 months to build can be completed in 3-6 weeks.

### Design Fidelity Improvement

- **Design drift** decreases measurably. Teams using the flywheel report 90-95% fidelity on first generation (compared to 60-70% fidelity in the first development pass of manual implementation).
- **QA cycles per component** drop from an average of 2.3 to 0.5, because the AI-generated code starts closer to the design intent.
- **Pixel-level accuracy** becomes achievable because the generation process reads exact values from Figma rather than relying on human interpretation of redlines.

### Reduced QA Burden

- Visual regression testing catches deviations automatically, replacing manual screenshot comparison.
- Accessibility issues are caught at generation time rather than in QA or production.
- Token compliance is enforced by linters, eliminating an entire class of "wrong shade of blue" bugs.

### Design System Adoption Acceleration

- When code components are generated from Figma components, they are inherently aligned. This eliminates the "design says X, code does Y" friction that discourages adoption.
- **Design system adoption rates** increase from the typical 40-50% to 80-90% when the flywheel is operational (Sparkbox Design Systems Survey, 2024).
- The cost of adding a new component to the system drops dramatically, making it economically viable to have comprehensive coverage rather than a minimal viable system.

### How to Measure Flywheel Effectiveness

Track these metrics over time to quantify the flywheel's impact:

| Metric | What to Measure | Target |
|--------|----------------|--------|
| Time to first render | Hours from Figma design approval to working component in Storybook | < 2 hours |
| Design fidelity score | Pixel difference between Figma export and rendered component (via visual regression) | < 0.5% deviation |
| Token compliance rate | Percentage of style values that reference tokens vs. hardcoded | > 99% |
| QA rejection rate | Percentage of components returned from QA for visual issues | < 5% |
| Design system coverage | Percentage of Figma components with corresponding code components | > 90% |
| Accessibility pass rate | Percentage of components passing automated a11y checks on first generation | > 95% |
| Developer satisfaction | Survey score for design-to-code workflow satisfaction | > 4.0/5.0 |
| Cycle time | Time from design complete to production deploy for a new component | < 1 sprint |

### The Compounding Effect

The true ROI of the flywheel is not in any single metric but in the compounding effect across all of them. Faster generation means more components in the design system. More components mean higher adoption. Higher adoption means fewer one-off implementations. Fewer one-offs mean less maintenance. Less maintenance means more time for new features. More features mean more Figma designs feeding the flywheel.

This compounding effect is why the flywheel metaphor is accurate: initial investment in proper Figma structure, MCP configuration, prompt templates, and quality gates creates ongoing returns that accelerate over time. Teams that have been running the flywheel for 6+ months report that the effort to add a new component to their system has decreased to roughly 15-20% of what it was before adoption -- a 5-7x productivity multiplier on design system maintenance and expansion.

---

## References and Further Reading

- Anthropic. "Model Context Protocol Specification." 2024. https://modelcontextprotocol.io
- Figma. "Variables and Design Tokens." Figma Help Center. 2024.
- Figma. "Code Connect Documentation." Figma Developer Documentation. 2024.
- W3C Design Tokens Community Group. "Design Tokens Format Module." 2024.
- Amazon Style Dictionary. "Configuration and Transforms." https://amzn.github.io/style-dictionary
- Sparkbox. "Design Systems Survey." 2024.
- Forrester Research. "The State of Front-End Development Efficiency." 2022.
- Chromatic. "Visual Regression Testing for Component Libraries." https://www.chromatic.com
- Deque Systems. "axe-core Accessibility Testing Engine." https://github.com/dequelabs/axe-core
