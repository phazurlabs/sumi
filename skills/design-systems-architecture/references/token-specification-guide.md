# Design Token Specification and Implementation Guide

## W3C Design Tokens Community Group (DTCG) Specification

### Overview and Purpose

The W3C Design Tokens Community Group defines a standard file format and data structure for design tokens, enabling interoperability between design tools, code platforms, and transformation pipelines. Adopt this specification as the canonical source format for all design tokens to ensure maximum tool compatibility and future-proofing.

### File Format and Structure

Store tokens in files with the `.tokens.json` extension. Structure each file as a JSON object where keys represent token names or group names, and values contain either token definitions or nested groups.

A minimal token definition requires the `$value` field. Include `$type` at the token or group level to declare the token's data type. Add `$description` for documentation purposes.

```json
{
  "color": {
    "$type": "color",
    "primary": {
      "500": {
        "$value": "#6366f1",
        "$description": "Primary brand color used for interactive elements and key actions"
      }
    }
  }
}
```

#### Reserved Fields

- `$value` — The resolved value of the token. Required for every token definition.
- `$type` — The data type of the token. Declare at the group level to apply to all children, or at the individual token level.
- `$description` — Human-readable description explaining the token's purpose and usage context.
- `$extensions` — Object for tool-specific metadata that falls outside the specification.

#### Reference and Alias Syntax

Reference other tokens using curly brace syntax with dot-separated paths:

```json
{
  "color": {
    "$type": "color",
    "blue": {
      "500": { "$value": "#3b82f6" }
    }
  },
  "interactive": {
    "$type": "color",
    "primary": {
      "$value": "{color.blue.500}",
      "$description": "Alias to blue-500 for primary interactive surfaces"
    }
  }
}
```

References resolve at transformation time. Ensure all referenced paths exist in the token set. Circular references are invalid and must be caught during validation.

#### Token Groups and Nesting

Group tokens by nesting JSON objects. Groups inherit the `$type` declaration from their parent, eliminating repetition:

```json
{
  "spacing": {
    "$type": "dimension",
    "$description": "Spacing scale based on 4px grid",
    "0": { "$value": "0px" },
    "1": { "$value": "4px" },
    "2": { "$value": "8px" },
    "3": { "$value": "12px" },
    "4": { "$value": "16px" },
    "6": { "$value": "24px" },
    "8": { "$value": "32px" },
    "10": { "$value": "40px" },
    "12": { "$value": "48px" },
    "16": { "$value": "64px" }
  }
}
```

Groups may nest to arbitrary depth, but limit nesting to three or four levels to maintain readability and manageable output names.

### Composite Token Types

Composite tokens combine multiple sub-values into a single token definition.

**Typography:**
```json
{
  "typography": {
    "$type": "typography",
    "heading-lg": {
      "$value": {
        "fontFamily": "{font.family.display}",
        "fontSize": "{font.size.2xl}",
        "fontWeight": "{font.weight.bold}",
        "lineHeight": "{line-height.tight}",
        "letterSpacing": "{letter-spacing.tight}"
      }
    }
  }
}
```

**Shadow:**
```json
{
  "shadow": {
    "$type": "shadow",
    "md": {
      "$value": [
        {
          "color": "#0000001a",
          "offsetX": "0px",
          "offsetY": "4px",
          "blur": "6px",
          "spread": "-1px"
        },
        {
          "color": "#0000001a",
          "offsetX": "0px",
          "offsetY": "2px",
          "blur": "4px",
          "spread": "-2px"
        }
      ]
    }
  }
}
```

**Border:**
```json
{
  "border": {
    "$type": "border",
    "default": {
      "$value": {
        "color": "{color.neutral.200}",
        "width": "1px",
        "style": "solid"
      }
    }
  }
}
```

**Transition:**
```json
{
  "transition": {
    "$type": "transition",
    "default": {
      "$value": {
        "duration": "{duration.normal}",
        "delay": "0ms",
        "timingFunction": "{easing.ease-out}"
      }
    }
  }
}
```

---

## Complete Token Type Reference

### Color

Represent color values using any CSS-compatible format. Prefer hex for static colors and oklch for perceptually uniform color scale generation.

```json
{
  "color": {
    "$type": "color",
    "brand": {
      "hex-example": { "$value": "#6366f1" },
      "rgb-example": { "$value": "rgb(99, 102, 241)" },
      "hsl-example": { "$value": "hsl(239, 84%, 67%)" },
      "oklch-example": { "$value": "oklch(0.585 0.233 264.1)" },
      "with-alpha": { "$value": "#6366f180" }
    }
  }
}
```

Generate full color ramps (50 through 950) for each brand hue. Include both light and dark variants with sufficient contrast ratios (4.5:1 minimum for text, 3:1 for large text and UI elements).

### Dimension

Use dimension tokens for spacing, sizing, border-radius, and any length-based value. Specify values in `px` for the source; transform to `rem` at build time.

```json
{
  "spacing": {
    "$type": "dimension",
    "0": { "$value": "0px" },
    "px": { "$value": "1px" },
    "0.5": { "$value": "2px" },
    "1": { "$value": "4px" },
    "2": { "$value": "8px" },
    "3": { "$value": "12px" },
    "4": { "$value": "16px" },
    "5": { "$value": "20px" },
    "6": { "$value": "24px" },
    "8": { "$value": "32px" },
    "10": { "$value": "40px" },
    "12": { "$value": "48px" },
    "16": { "$value": "64px" },
    "20": { "$value": "80px" },
    "24": { "$value": "96px" }
  },
  "size": {
    "$type": "dimension",
    "icon-sm": { "$value": "16px" },
    "icon-md": { "$value": "20px" },
    "icon-lg": { "$value": "24px" },
    "icon-xl": { "$value": "32px" },
    "avatar-sm": { "$value": "32px" },
    "avatar-md": { "$value": "40px" },
    "avatar-lg": { "$value": "48px" }
  },
  "radius": {
    "$type": "dimension",
    "none": { "$value": "0px" },
    "sm": { "$value": "4px" },
    "md": { "$value": "8px" },
    "lg": { "$value": "12px" },
    "xl": { "$value": "16px" },
    "2xl": { "$value": "24px" },
    "full": { "$value": "9999px" }
  }
}
```

### Font Family

Define font stacks as arrays with fallback fonts. Include the full system font stack for graceful degradation.

```json
{
  "font": {
    "family": {
      "$type": "fontFamily",
      "display": {
        "$value": ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      "body": {
        "$value": ["Source Sans 3", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      "mono": {
        "$value": ["JetBrains Mono", "SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "monospace"]
      }
    }
  }
}
```

### Font Weight

Use numeric values (100-900) for maximum cross-platform compatibility. Map named weights for developer convenience.

```json
{
  "font": {
    "weight": {
      "$type": "fontWeight",
      "thin": { "$value": 100 },
      "light": { "$value": 300 },
      "regular": { "$value": 400 },
      "medium": { "$value": 500 },
      "semibold": { "$value": 600 },
      "bold": { "$value": 700 },
      "extrabold": { "$value": 800 },
      "black": { "$value": 900 }
    }
  }
}
```

### Duration

Define animation and transition timing values in milliseconds.

```json
{
  "duration": {
    "$type": "duration",
    "instant": { "$value": "0ms" },
    "fast": { "$value": "100ms" },
    "normal": { "$value": "200ms" },
    "slow": { "$value": "300ms" },
    "slower": { "$value": "500ms" },
    "slowest": { "$value": "800ms" }
  }
}
```

### Cubic Bezier

Express easing curves as arrays of four numbers representing the two control points of a cubic bezier curve.

```json
{
  "easing": {
    "$type": "cubicBezier",
    "linear": { "$value": [0, 0, 1, 1] },
    "ease-in": { "$value": [0.4, 0, 1, 1] },
    "ease-out": { "$value": [0, 0, 0.2, 1] },
    "ease-in-out": { "$value": [0.4, 0, 0.2, 1] },
    "spring": { "$value": [0.2, 1.4, 0.4, 1] },
    "bounce": { "$value": [0.34, 1.56, 0.64, 1] }
  }
}
```

### Gradient

Define gradient tokens with type, angle, and color stop arrays.

```json
{
  "gradient": {
    "$type": "gradient",
    "brand-diagonal": {
      "$value": [
        { "color": "{color.brand.500}", "position": 0 },
        { "color": "{color.accent.500}", "position": 1 }
      ],
      "$description": "Brand gradient from primary to accent at default 180deg angle"
    },
    "surface-fade": {
      "$value": [
        { "color": "{color.neutral.50}", "position": 0 },
        { "color": "#ffffff00", "position": 1 }
      ]
    }
  }
}
```

---

## Token Naming Conventions

### Category-Type-Item (CTI) Methodology

Structure token names with three segments: the broad category, the specific type within that category, and the individual item or variant.

```
color-primary-500
spacing-inline-md
font-size-lg
border-radius-md
shadow-elevation-high
```

CTI provides predictable, sortable names that group related tokens naturally in generated output files.

### Flat Naming

Separate all segments with hyphens in a single flat string. This produces clean CSS custom property names:

```css
--color-primary-500: #6366f1;
--color-primary-600: #4f46e5;
--spacing-2: 8px;
--spacing-4: 16px;
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--border-radius-md: 8px;
```

### Nested/Grouped Naming

Use dot separation for the JSON source structure while generating platform-appropriate output:

```json
{
  "color.primary.500": "#6366f1",
  "color.primary.600": "#4f46e5"
}
```

In the DTCG format, nesting is implicit through the JSON structure rather than dots in key names.

### Component-Scoped Naming

For Tier 3 (component) tokens, prefix with the component name and property:

```json
{
  "button": {
    "primary": {
      "background": { "$value": "{color.interactive.primary}" },
      "background-hover": { "$value": "{color.interactive.primary-hover}" },
      "text": { "$value": "{color.text.on-primary}" },
      "border-radius": { "$value": "{radius.md}" },
      "padding-x": { "$value": "{spacing.4}" },
      "padding-y": { "$value": "{spacing.2}" }
    },
    "secondary": {
      "background": { "$value": "{color.surface.secondary}" },
      "background-hover": { "$value": "{color.surface.secondary-hover}" },
      "text": { "$value": "{color.interactive.primary}" },
      "border": { "$value": "{border.default}" }
    }
  }
}
```

### Size Naming Conventions

Choose one convention and apply it consistently across the system:

**T-shirt sizes** — best for a small, bounded set (typically 5-7 stops):
```
xs, sm, md, lg, xl, 2xl, 3xl
```

**Numeric scales** — best for fine-grained, extensible scales:
```
100, 200, 300, 400, 500, 600, 700, 800, 900
```

**Sequential integers** — best for spacing and grid-aligned values:
```
0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24
```

Avoid mixing conventions within the same token category. Use t-shirt sizes for component sizing (button-sm, button-md, button-lg) and numeric scales for color palettes and spacing grids.

---

## Multi-Tier Token Architecture

### Tier 1: Global/Primitive Tokens

Primitive tokens define the raw, context-free values in the system. Generate them directly from brand guidelines: color palettes, type scales, spacing grids, and timing curves.

```json
{
  "blue": {
    "$type": "color",
    "50": { "$value": "#eff6ff" },
    "100": { "$value": "#dbeafe" },
    "200": { "$value": "#bfdbfe" },
    "300": { "$value": "#93c5fd" },
    "400": { "$value": "#60a5fa" },
    "500": { "$value": "#3b82f6" },
    "600": { "$value": "#2563eb" },
    "700": { "$value": "#1d4ed8" },
    "800": { "$value": "#1e40af" },
    "900": { "$value": "#1e3a8a" },
    "950": { "$value": "#172554" }
  }
}
```

Primitive tokens should be exhaustive. Generate full ramps for every hue, a complete spacing scale, and all type scale steps. These tokens are rarely consumed directly by components.

### Tier 2: Semantic/Alias Tokens

Semantic tokens map primitives to design intent. They encode decisions about how the system should look and behave without referencing specific components.

```json
{
  "color": {
    "$type": "color",
    "text": {
      "primary": { "$value": "{neutral.900}", "$description": "Default body text color" },
      "secondary": { "$value": "{neutral.600}", "$description": "Secondary/supporting text" },
      "disabled": { "$value": "{neutral.400}", "$description": "Disabled state text" },
      "inverse": { "$value": "{neutral.50}", "$description": "Text on dark backgrounds" },
      "on-primary": { "$value": "#ffffff", "$description": "Text on primary-colored backgrounds" },
      "link": { "$value": "{blue.600}", "$description": "Hyperlink text" },
      "error": { "$value": "{red.600}", "$description": "Error message text" },
      "success": { "$value": "{green.700}", "$description": "Success message text" },
      "warning": { "$value": "{amber.700}", "$description": "Warning message text" }
    },
    "surface": {
      "default": { "$value": "#ffffff" },
      "subtle": { "$value": "{neutral.50}" },
      "muted": { "$value": "{neutral.100}" },
      "raised": { "$value": "#ffffff" },
      "overlay": { "$value": "rgba(0, 0, 0, 0.5)" }
    },
    "interactive": {
      "primary": { "$value": "{blue.600}" },
      "primary-hover": { "$value": "{blue.700}" },
      "primary-active": { "$value": "{blue.800}" },
      "secondary": { "$value": "{neutral.100}" },
      "secondary-hover": { "$value": "{neutral.200}" }
    },
    "border": {
      "default": { "$value": "{neutral.200}" },
      "strong": { "$value": "{neutral.400}" },
      "focus": { "$value": "{blue.500}" }
    }
  }
}
```

Semantic tokens enable theming. Swap semantic token values (not primitives) when switching between light and dark modes or brand themes.

### Tier 3: Component Tokens

Component tokens map semantic tokens to specific component properties. Use them when a component needs a value that diverges from the semantic default, or when multiple semantic tokens combine into a component-specific decision.

```json
{
  "input": {
    "background": { "$value": "{color.surface.default}" },
    "background-disabled": { "$value": "{color.surface.muted}" },
    "border": { "$value": "{color.border.default}" },
    "border-hover": { "$value": "{color.border.strong}" },
    "border-focus": { "$value": "{color.border.focus}" },
    "border-error": { "$value": "{color.text.error}" },
    "text": { "$value": "{color.text.primary}" },
    "placeholder": { "$value": "{color.text.secondary}" },
    "radius": { "$value": "{radius.md}" },
    "padding-x": { "$value": "{spacing.3}" },
    "padding-y": { "$value": "{spacing.2}" },
    "font-size": { "$value": "{font.size.md}" }
  }
}
```

### When to Use Each Tier and Avoiding Over-Indirection

- **Always define Tier 1.** Every system needs raw values.
- **Always define Tier 2.** Semantic tokens are essential for theming, dark mode, and design coherence.
- **Define Tier 3 selectively.** Only create component tokens when a component genuinely needs to deviate from semantic defaults, or when the mapping from semantic to component is non-obvious.

Over-indirection occurs when every component has its own token layer that simply passes through semantic values without modification. This creates maintenance overhead with no design benefit. If `button.primary.background` always equals `color.interactive.primary` and will never diverge, consume the semantic token directly in the component code rather than creating a component token alias.

Reserve Tier 3 for components with complex state mappings, components that genuinely diverge from semantic defaults, or design systems serving multiple products where component-level theming is required.

---

## Style Dictionary Configuration

### Core Concepts

Style Dictionary transforms token source files into platform-specific output through a pipeline of transforms, formats, and filters. Configure it via `config.json` or `config.js` at the project root.

### Transforms

Transforms modify individual token attributes during the build process. Apply them as an ordered array.

**Common built-in transforms:**

| Transform | Purpose |
|-----------|---------|
| `attribute/cti` | Parses token path into category, type, item attributes |
| `name/cti/kebab` | Generates kebab-case name: `color-primary-500` |
| `name/cti/camel` | Generates camelCase name: `colorPrimary500` |
| `name/cti/pascal` | Generates PascalCase name: `ColorPrimary500` |
| `color/css` | Converts color values to CSS-compatible format |
| `color/UIColor` | Converts to iOS UIColor format |
| `color/composeColor` | Converts to Jetpack Compose Color format |
| `size/rem` | Converts pixel values to rem (base 16) |
| `size/px` | Ensures pixel values have px unit |

### Formats

Formats determine the output file structure.

**Common formats:**

| Format | Output |
|--------|--------|
| `css/variables` | CSS custom properties in `:root` block |
| `scss/variables` | Sass `$variable` declarations |
| `less/variables` | Less `@variable` declarations |
| `json/flat` | Flat JSON object with dot-notation keys |
| `json/nested` | Nested JSON preserving token hierarchy |
| `javascript/es6` | ES6 `export const` declarations |
| `javascript/module-flat` | CommonJS flat module export |
| `ios-swift/class.swift` | Swift struct with static properties |
| `android/resources` | Android XML resource file |
| `compose/object` | Kotlin Compose object with token values |

### Build Configuration

```javascript
// config.js
module.exports = {
  source: ['tokens/**/*.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        },
        {
          destination: 'tokens.json',
          format: 'json/flat'
        }
      ]
    },
    ios: {
      transformGroup: 'ios-swift',
      buildPath: 'dist/ios/',
      files: [
        {
          destination: 'DesignTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'DesignTokens'
        }
      ]
    },
    android: {
      transformGroup: 'android',
      buildPath: 'dist/android/',
      files: [
        {
          destination: 'design_tokens.xml',
          format: 'android/resources'
        }
      ]
    }
  }
};
```

### Custom Transforms

Create custom transforms when built-in options are insufficient.

```javascript
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: (token) => token.$type === 'dimension',
  transformer: (token) => {
    const value = parseFloat(token.$value);
    if (isNaN(value)) return token.$value;
    if (value === 0) return '0';
    return `${value / 16}rem`;
  }
});

StyleDictionary.registerTransform({
  name: 'shadow/css',
  type: 'value',
  matcher: (token) => token.$type === 'shadow',
  transformer: (token) => {
    const shadows = Array.isArray(token.$value) ? token.$value : [token.$value];
    return shadows
      .map(s => `${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} ${s.color}`)
      .join(', ');
  }
});

StyleDictionary.registerTransform({
  name: 'typography/css',
  type: 'value',
  matcher: (token) => token.$type === 'typography',
  transformer: (token) => {
    const v = token.$value;
    return `${v.fontWeight} ${v.fontSize}/${v.lineHeight} ${v.fontFamily}`;
  }
});
```

### Filters for Platform-Specific Subsets

Use filters to generate targeted output files. For example, separate color tokens from spacing tokens, or exclude component tokens from a primitive-only build:

```javascript
{
  destination: 'colors.css',
  format: 'css/variables',
  filter: (token) => token.attributes.category === 'color'
}
```

```javascript
{
  destination: 'spacing.css',
  format: 'css/variables',
  filter: (token) => token.path[0] === 'spacing'
}
```

---

## Token Studio (Figma Plugin) Workflow

### Setup and Configuration

1. Install the Token Studio plugin from the Figma Community.
2. Open the plugin within the target Figma file.
3. Choose the token storage mode: local document, URL (read-only), or version control (GitHub, GitLab, Azure DevOps, Bitbucket).
4. For version-controlled workflows, authenticate with a personal access token scoped to repository read/write.

### Token Creation and Management

Create tokens directly in Token Studio's interface, organized by type (color, spacing, sizing, typography, border-radius, opacity, shadow, font family, font weight, line height, letter spacing, paragraph spacing, composition).

**Key practices:**

- Define primitive tokens first, then build semantic tokens using alias references.
- Use the `$` prefix in Token Studio to reference other tokens (equivalent to DTCG `{}` syntax).
- Apply tokens to Figma layers by selecting the layer and clicking the token value. Map tokens to fill, stroke, spacing, sizing, border-radius, opacity, and typography properties.
- Use the "Inspect" panel to verify which tokens are applied to selected elements.

### GitHub/GitLab Sync

Configure version control sync to maintain a single source of truth:

1. Set the repository, branch, and file path in Token Studio settings.
2. Choose single-file or multi-file storage mode.
3. Pull tokens from the repository to load them into Figma.
4. Push changes from Figma back to the repository as commits.
5. Use branching to manage token changes through the same review process as code.

### Multi-File Token Organization

Organize tokens across multiple files for maintainability:

```
tokens/
  core/
    color.tokens.json
    spacing.tokens.json
    typography.tokens.json
    elevation.tokens.json
    motion.tokens.json
  semantic/
    light.tokens.json
    dark.tokens.json
    layout.tokens.json
  component/
    button.tokens.json
    input.tokens.json
    card.tokens.json
```

In Token Studio, each file maps to a token set. Enable or disable sets to compose different themes or configurations.

### Theme Switching

Define themes as combinations of token sets. For a light/dark mode system:

- **Light theme:** core + semantic/light
- **Dark theme:** core + semantic/dark

Token Studio resolves references across all active sets, applying the last-loaded value when conflicts arise. Use set ordering to control override priority. Export themes as separate output files for runtime theme switching.

---

## Token CI/CD Pipeline

### Automated Token Transformation

Configure a CI pipeline (GitHub Actions, GitLab CI, or equivalent) that runs Style Dictionary on every push to the token repository or on pull request merge.

```yaml
# .github/workflows/tokens.yml
name: Build Design Tokens
on:
  push:
    branches: [main]
    paths: ['tokens/**']
  pull_request:
    paths: ['tokens/**']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build:tokens
      - uses: actions/upload-artifact@v4
        with:
          name: token-artifacts
          path: dist/
```

### Token Validation and Linting

Validate tokens before transformation to catch errors early:

- **Schema validation:** Verify every token file conforms to the DTCG JSON schema. Use a JSON schema validator in the CI pipeline.
- **Reference validation:** Ensure all alias references resolve to existing tokens. Detect circular references.
- **Naming convention enforcement:** Lint token names against the project's chosen convention (CTI, kebab-case, no uppercase).
- **Value validation:** Check that color values produce valid CSS, that dimension values include units, and that numeric values fall within expected ranges.
- **Contrast checking:** Validate that semantic color pairings (text on surface, interactive on surface) meet WCAG 2.1 AA contrast requirements.

```javascript
// scripts/validate-tokens.js
const tokens = require('./merged-tokens.json');

function validateReferences(obj, allTokens, path = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof value === 'object' && value.$value) {
      if (typeof value.$value === 'string' && value.$value.match(/\{.+\}/)) {
        const refPath = value.$value.replace(/[{}]/g, '');
        if (!resolveToken(allTokens, refPath)) {
          console.error(`Broken reference: ${currentPath} -> ${refPath}`);
          process.exitCode = 1;
        }
      }
    } else if (typeof value === 'object') {
      validateReferences(value, allTokens, currentPath);
    }
  }
}
```

### Visual Regression Testing

Run visual regression tests when token values change to catch unintended visual side effects:

1. Build a reference Storybook or component preview page using the current production tokens.
2. Build the same page with the proposed token changes.
3. Compare screenshots using a tool such as Chromatic or Percy.
4. Flag any visual differences for human review before merging.

This is especially critical for changes to Tier 1 (primitive) tokens, which cascade through the entire system.

### Publishing Token Packages

Automate package publishing on merge to the main branch:

```yaml
  publish:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build:tokens
      - run: npm version patch --no-git-tag-version
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Publish tokens as:
- **npm package:** For JavaScript/TypeScript consumers (`@org/design-tokens`).
- **CDN-hosted CSS:** For applications that load tokens as a stylesheet.
- **Platform-specific packages:** CocoaPods for iOS, Maven/Gradle for Android.

### Changelog Generation

Use conventional commits to automate changelogs:

- `feat(tokens): add new elevation scale` triggers a minor version bump.
- `fix(tokens): correct primary-600 hex value` triggers a patch bump.
- `feat(tokens)!: rename spacing scale to use numeric keys` triggers a major bump (breaking).

Integrate tools such as `standard-version`, `changesets`, or `semantic-release` to automate version bumping and changelog file generation from commit history.

Generate a human-readable changelog that lists:
- New tokens added
- Token values changed (with before/after)
- Tokens deprecated
- Tokens removed
- Breaking changes with migration instructions

Distribute the changelog alongside the published package and post it to the design system's communication channels (Slack, email digest) so both designers and engineers stay informed of changes.

---

---

## W3C Design Tokens Stable Release (October 2025)

The W3C Design Tokens Community Group published the stable release of the Design Tokens specification on October 28, 2025. This represents a significant milestone — the specification is now considered stable for production adoption. The following updates reflect changes from earlier draft versions.

### Key Changes from Draft to Stable

**`$extensions` Property**
The stable spec formalizes the `$extensions` property as the mechanism for tool-specific metadata, theming extensions, and custom data. This replaces the informal `$extends` property some tools used during the draft period. Use `$extensions` for:

- Tool-specific configuration (Token Studio settings, Style Dictionary hints).
- Theme-level metadata (theme name, color scheme, target platform).
- Custom organizational metadata (owner, last modified, change ticket).

```json
{
  "color": {
    "$type": "color",
    "$extensions": {
      "com.tokens-studio": {
        "modify": {
          "type": "lighten",
          "value": "0.1",
          "space": "oklch"
        }
      }
    },
    "primary": {
      "500": { "$value": "#6366f1" }
    }
  }
}
```

**Group Inheritance Improvements**
The stable spec clarifies `$type` inheritance: a `$type` declared on a group applies to all descendant tokens unless explicitly overridden at a lower level. This was ambiguous in earlier drafts. The inheritance chain is now formally defined and consistently implemented across tools.

**Full Color Space Support**
The stable spec formally supports Display P3, Oklch, Lab, LCH, and all CSS Color Module Level 4 color spaces. Token values can use any valid CSS color function:

```json
{
  "color": {
    "$type": "color",
    "brand": {
      "primary": { "$value": "oklch(0.585 0.233 264.1)" },
      "secondary": { "$value": "color(display-p3 0.4 0.2 0.9)" },
      "accent": { "$value": "lab(50% 40 -20)" }
    }
  }
}
```

This enables perceptually uniform color scales and wide-gamut color support.

### Updated JSON Schema

The stable spec provides a formal JSON schema for validation. Use it in CI pipelines to validate token files:

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/dtcg.schema.json"
}
```

### Tool Support

As of the stable release, 10+ tools support the DTCG format natively:

| Tool | Support Level |
|------|--------------|
| Style Dictionary 4.x | Full stable spec support |
| Token Studio for Figma | Full with $extensions |
| Specify | Full import/export |
| Supernova | Full import/export |
| Cobalt UI | Full generation |
| Diez | Partial |
| Theo (Salesforce) | Partial via transform |
| Figma Variables API | Import/export via plugins |
| Universal Design Tokens | Full validation |
| Design Tokens Validator | Full schema validation |

### Migration from Draft to Stable

If your token files used draft conventions, migrate with these steps:

1. Replace any `$extends` usage with `$extensions`.
2. Validate all token files against the stable JSON schema.
3. Verify `$type` inheritance behaves as expected across nested groups.
4. Update color values to use modern CSS color syntax if targeting wide-gamut displays.
5. Update Style Dictionary to version 4.x for full stable spec support.
6. Run visual regression tests after migration to catch any rendering differences.

---

## W3C Stable Specification Updates

### Formal `$type` Values

The W3C DTCG stable specification (October 2025) defines a closed set of formal `$type` values. Only these types are recognized by conforming tools and validators:

| `$type` Value | Description | Value Format |
|---|---|---|
| `color` | Any CSS-compatible color value | String: `"#6366f1"`, `"oklch(0.585 0.233 264.1)"` |
| `dimension` | Length values with units | String: `"16px"`, `"1.5rem"` |
| `fontFamily` | Font stack | Array of strings: `["Inter", "sans-serif"]` |
| `fontWeight` | Numeric or named weight | Number (100-900) or string: `"bold"` |
| `duration` | Time values | String: `"200ms"`, `"0.3s"` |
| `cubicBezier` | Easing curve control points | Array of 4 numbers: `[0.4, 0, 0.2, 1]` |
| `number` | Unitless numeric value | Number: `1.5`, `0.7` |
| `strokeStyle` | Border/stroke line style | String: `"solid"`, `"dashed"` or object with dashArray |
| `border` | Composite border definition | Object: `{ color, width, style }` |
| `transition` | Composite transition | Object: `{ duration, delay, timingFunction }` |
| `shadow` | Composite shadow (single or layered) | Object or array: `{ color, offsetX, offsetY, blur, spread }` |
| `gradient` | Color gradient definition | Array of `{ color, position }` stops |
| `typography` | Composite typography definition | Object: `{ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }` |

Tokens with unrecognized `$type` values will fail validation against the stable JSON schema. Tools may extend the type system through the `$extensions` namespace, but the core spec types above are the authoritative set.

### The `$description` Field

Every token and every group may include a `$description` field containing a human-readable string. This field serves as inline documentation and should describe the token's purpose, usage context, and any constraints. Conforming tools should preserve `$description` through transformation pipelines and may surface it in generated documentation, code comments, or IDE tooltips.

```json
{
  "spacing": {
    "$type": "dimension",
    "$description": "Spacing scale based on a 4px grid. Use for padding, margin, and gap values throughout the system.",
    "4": {
      "$value": "16px",
      "$description": "Standard component internal padding and default gap between elements."
    }
  }
}
```

### File Format Options

The specification recognizes two valid file extensions:

- **`.tokens.json`** — The recommended extension. Enables JSON tooling (syntax highlighting, validation, formatting) while identifying the file as a design tokens file.
- **`.tokens`** — An alternative extension for environments where the `.json` suffix creates conflicts or where tooling requires a distinct extension.

Both formats contain identical JSON content and are processed identically by conforming tools. Choose one convention per project and apply it consistently.

### Validation Tooling Landscape

The stable specification has catalyzed a validation tooling ecosystem. Use these tools in CI pipelines to catch errors before they propagate:

- **design-tokens-validator** — Open-source CLI and library that validates token files against the DTCG JSON schema. Reports broken references, invalid `$type` values, and structural errors. Integrate directly into CI with `npx design-tokens-validator tokens/**/*.tokens.json`.
- **Specify** — Design data platform with built-in DTCG validation on import and export. Supports automated sync between design tools and code repositories with schema enforcement.
- **Tokens Studio format alignment** — Tokens Studio for Figma aligns its export format with the stable DTCG spec as of version 2.x. The plugin validates tokens on push and flags incompatibilities. When using Tokens Studio with GitHub sync, the exported files conform to the stable schema, enabling downstream tools to consume them without transformation.

Adopt at least one validation tool and run it on every pull request that modifies token files. Schema validation catches the majority of integration errors before they reach production.

---

## Summary of Recommendations

1. Adopt the DTCG `.tokens.json` format (stable spec, October 2025) as the single source of truth.
2. Implement a three-tier architecture: primitive, semantic, component.
3. Apply component tokens selectively — avoid blanket indirection.
4. Use Style Dictionary 4.x for multi-platform transformation with custom transforms for composite types.
5. Integrate Token Studio with version control for designer-developer synchronization.
6. Validate, test, and publish tokens through automated CI/CD.
7. Enforce naming conventions and contrast ratios at the linting stage.
8. Generate changelogs and version packages using semantic versioning.
9. Leverage `$extensions` for tool-specific metadata and theming.
10. Use modern CSS color spaces (Oklch, Display P3) for perceptually uniform, wide-gamut color scales.
