# Design-to-Code Pipeline — Tokens, CI/CD, and Multi-Platform Output

## 1. Pipeline Architecture Overview

The design-to-code pipeline is the automated infrastructure that transforms design decisions made in Figma into production-ready code artifacts across every target platform. Without this pipeline, teams rely on manual handoff — developers eyeball hex values, approximate spacing, and inevitably introduce drift between what designers intended and what ships.

A well-built pipeline enforces a single source of truth. The designer changes a color in Figma, that change propagates through token extraction, transformation, testing, and deployment without a human copying a value from one tool to another. The result is automated consistency across web, iOS, Android, and any other platform the product targets.

### Full Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DESIGN-TO-CODE PIPELINE                         │
└─────────────────────────────────────────────────────────────────────────┘

  ┌──────────┐     ┌──────────────────┐     ┌──────────────────┐
  │          │     │   Tokens Studio   │     │   Token JSON     │
  │  Figma   │────▶│   Plugin          │────▶│   Repository     │
  │          │     │   (Extraction)    │     │   (Git)          │
  └──────────┘     └──────────────────┘     └────────┬─────────┘
                                                     │
                                                     ▼
                                            ┌──────────────────┐
                                            │  Style Dictionary │
                                            │  (Transform +    │
                                            │   Build)         │
                                            └────────┬─────────┘
                                                     │
                         ┌───────────────────────────┼───────────────────┐
                         │                           │                   │
                         ▼                           ▼                   ▼
                ┌──────────────┐           ┌──────────────┐    ┌──────────────┐
                │  CSS Custom  │           │  iOS Swift   │    │  Android     │
                │  Properties  │           │  Constants   │    │  XML/Kotlin  │
                │  + SCSS      │           │              │    │  Resources   │
                │  + Tailwind  │           │              │    │              │
                └──────┬───────┘           └──────┬───────┘    └──────┬───────┘
                       │                          │                   │
                       ▼                          ▼                   ▼
              ┌──────────────────┐      ┌──────────────┐    ┌──────────────┐
              │  Visual          │      │  SwiftUI     │    │  Jetpack     │
              │  Regression      │      │  Component   │    │  Compose     │
              │  Testing         │      │  Library     │    │  Library     │
              └──────┬───────────┘      └──────┬───────┘    └──────┬───────┘
                     │                         │                   │
                     ▼                         ▼                   ▼
              ┌──────────────────────────────────────────────────────────┐
              │                CI/CD (GitHub Actions)                    │
              │   Build → Test → Publish (npm / CocoaPods / Maven)      │
              └──────────────────────────┬──────────────────────────────┘
                                         │
                                         ▼
              ┌──────────────────────────────────────────────────────────┐
              │              Production Applications                     │
              │         Web App  ·  iOS App  ·  Android App             │
              └──────────────────────────────────────────────────────────┘
```

### Why a Pipeline Matters

**Single source of truth.** Every color, spacing value, font size, and shadow originates from one canonical set of tokens in Figma. No developer guesses. No designer wonders if the code matches.

**Automated consistency.** When the primary brand color changes from `#0066FF` to `#0052CC`, one token update triggers rebuilds across every platform. The web app, the iOS app, and the Android app all reflect the change simultaneously after their next deployment.

**Reduced handoff friction.** Designers stop writing spec documents. Developers stop asking "what's the padding here?" The pipeline is the spec.

**Auditability.** Every token change is a Git commit. You can trace any visual change in production back to its origin in design.

---

## 2. Style Dictionary Configuration

Style Dictionary is the transformation engine at the center of the pipeline. It reads raw token JSON and produces platform-specific output files.

### Project File Organization

```
tokens/
├── color/
│   ├── base.json
│   ├── semantic.json
│   └── component.json
├── spacing/
│   └── spacing.json
├── typography/
│   ├── font-family.json
│   ├── font-size.json
│   ├── font-weight.json
│   └── line-height.json
├── border/
│   ├── radius.json
│   └── width.json
├── shadow/
│   └── elevation.json
└── motion/
    ├── duration.json
    └── easing.json
```

### Complete Configuration File

```javascript
// style-dictionary.config.js
const StyleDictionary = require("style-dictionary");

// ── Custom Transforms ──────────────────────────────────────────────

StyleDictionary.registerTransform({
  name: "name/cti/kebab",
  type: "name",
  transformer: (token) => {
    return [token.path.join("-")].join("-");
  },
});

StyleDictionary.registerTransform({
  name: "size/rem",
  type: "value",
  matcher: (token) => token.$type === "dimension" || token.$type === "fontSize",
  transformer: (token) => {
    const px = parseFloat(token.value);
    return `${px / 16}rem`;
  },
});

StyleDictionary.registerTransform({
  name: "color/css",
  type: "value",
  matcher: (token) => token.$type === "color",
  transformer: (token) => token.value,
});

StyleDictionary.registerTransform({
  name: "color/swift-ui",
  type: "value",
  matcher: (token) => token.$type === "color",
  transformer: (token) => {
    const hex = token.value.replace("#", "");
    return `Color(hex: "${hex}")`;
  },
});

StyleDictionary.registerTransform({
  name: "color/compose",
  type: "value",
  matcher: (token) => token.$type === "color",
  transformer: (token) => {
    const hex = token.value.replace("#", "");
    return `Color(0xFF${hex})`;
  },
});

// ── Custom Formats ─────────────────────────────────────────────────

StyleDictionary.registerFormat({
  name: "css/custom-properties",
  formatter: ({ dictionary }) => {
    const vars = dictionary.allTokens
      .map((token) => `  --${token.name}: ${token.value};`)
      .join("\n");
    return `:root {\n${vars}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: "scss/variables",
  formatter: ({ dictionary }) => {
    return dictionary.allTokens
      .map((token) => `$${token.name}: ${token.value};`)
      .join("\n") + "\n";
  },
});

StyleDictionary.registerFormat({
  name: "tailwind/config",
  formatter: ({ dictionary }) => {
    const grouped = {};
    dictionary.allTokens.forEach((token) => {
      const category = token.path[0];
      if (!grouped[category]) grouped[category] = {};
      const key = token.path.slice(1).join("-");
      grouped[category][key] = token.value;
    });
    return `module.exports = ${JSON.stringify(grouped, null, 2)};\n`;
  },
});

StyleDictionary.registerFormat({
  name: "ios/swift-ui",
  formatter: ({ dictionary }) => {
    const lines = dictionary.allTokens.map((token) => {
      const name = token.path
        .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
        .join("");
      return `  static let ${name} = ${token.value}`;
    });
    return `import SwiftUI\n\nstruct DesignTokens {\n${lines.join("\n")}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: "android/xml-resources",
  formatter: ({ dictionary }) => {
    const lines = dictionary.allTokens.map((token) => {
      const name = token.name.replace(/-/g, "_");
      return `  <item name="${name}" type="dimen">${token.value}</item>`;
    });
    return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${lines.join("\n")}\n</resources>\n`;
  },
});

// ── Platform Configuration ─────────────────────────────────────────

module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      transforms: ["name/cti/kebab", "size/rem", "color/css"],
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/custom-properties",
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      transforms: ["name/cti/kebab", "size/rem", "color/css"],
      buildPath: "build/scss/",
      files: [
        {
          destination: "_tokens.scss",
          format: "scss/variables",
        },
      ],
    },
    tailwind: {
      transforms: ["name/cti/kebab", "color/css"],
      buildPath: "build/tailwind/",
      files: [
        {
          destination: "tokens.config.js",
          format: "tailwind/config",
        },
      ],
    },
    ios: {
      transforms: ["color/swift-ui", "size/rem"],
      buildPath: "build/ios/",
      files: [
        {
          destination: "DesignTokens.swift",
          format: "ios/swift-ui",
        },
      ],
    },
    android: {
      transforms: ["name/cti/kebab", "color/compose"],
      buildPath: "build/android/",
      files: [
        {
          destination: "design_tokens.xml",
          format: "android/xml-resources",
        },
      ],
    },
  },
};
```

### Build Script

```json
{
  "scripts": {
    "tokens:build": "style-dictionary build --config style-dictionary.config.js",
    "tokens:clean": "rm -rf build/",
    "tokens:watch": "chokidar 'tokens/**/*.json' -c 'npm run tokens:build'"
  }
}
```

---

## 3. Token Transformation Examples

The power of the pipeline becomes clear when you see one token input produce five different platform outputs. Below are complete examples for each major token type.

### Color Token

**Input** (`tokens/color/base.json`):
```json
{
  "color": {
    "primary": {
      "$value": "#0066FF",
      "$type": "color"
    }
  }
}
```

| Platform   | Output |
|------------|--------|
| CSS        | `--color-primary: #0066FF;` |
| SCSS       | `$color-primary: #0066FF;` |
| Tailwind   | `primary: '#0066FF'` in theme extend |
| Swift      | `static let colorPrimary = Color(hex: "0066FF")` |
| Kotlin     | `val ColorPrimary = Color(0xFF0066FF)` |

### Spacing Token

**Input** (`tokens/spacing/spacing.json`):
```json
{
  "spacing": {
    "md": {
      "$value": "16px",
      "$type": "dimension"
    }
  }
}
```

| Platform   | Output |
|------------|--------|
| CSS        | `--spacing-md: 1rem;` |
| SCSS       | `$spacing-md: 1rem;` |
| Tailwind   | `md: '1rem'` in spacing config |
| Swift      | `static let spacingMd: CGFloat = 16` |
| Kotlin     | `val SpacingMd = 16.dp` |

### Typography Token

**Input** (`tokens/typography/font-size.json`):
```json
{
  "fontSize": {
    "heading": {
      "lg": {
        "$value": "32px",
        "$type": "fontSize"
      }
    }
  }
}
```

| Platform   | Output |
|------------|--------|
| CSS        | `--font-size-heading-lg: 2rem;` |
| SCSS       | `$font-size-heading-lg: 2rem;` |
| Tailwind   | `'heading-lg': '2rem'` in fontSize config |
| Swift      | `static let fontSizeHeadingLg: CGFloat = 32` |
| Kotlin     | `val FontSizeHeadingLg = 32.sp` |

### Border Radius Token

**Input** (`tokens/border/radius.json`):
```json
{
  "borderRadius": {
    "lg": {
      "$value": "12px",
      "$type": "dimension"
    }
  }
}
```

| Platform   | Output |
|------------|--------|
| CSS        | `--border-radius-lg: 0.75rem;` |
| SCSS       | `$border-radius-lg: 0.75rem;` |
| Tailwind   | `lg: '0.75rem'` in borderRadius config |
| Swift      | `static let borderRadiusLg: CGFloat = 12` |
| Kotlin     | `val BorderRadiusLg = 12.dp` |

### Shadow Token

**Input** (`tokens/shadow/elevation.json`):
```json
{
  "shadow": {
    "md": {
      "$value": {
        "offsetX": "0px",
        "offsetY": "4px",
        "blur": "8px",
        "spread": "0px",
        "color": "rgba(0, 0, 0, 0.12)"
      },
      "$type": "shadow"
    }
  }
}
```

| Platform   | Output |
|------------|--------|
| CSS        | `--shadow-md: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);` |
| SCSS       | `$shadow-md: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);` |
| Tailwind   | `md: '0px 4px 8px 0px rgba(0, 0, 0, 0.12)'` in boxShadow config |
| Swift      | `static let shadowMd = Shadow(color: .black.opacity(0.12), radius: 8, x: 0, y: 4)` |
| Kotlin     | `val ShadowMd = Shadow(color = Color.Black.copy(alpha = 0.12f), blurRadius = 8.dp, offsetY = 4.dp)` |

---

## 4. CI/CD Pipeline Integration

The pipeline is only as reliable as its automation. A manual build step is a broken step. The following GitHub Actions workflow automates the entire flow from token change to published artifacts.

### GitHub Actions Workflow

```yaml
# .github/workflows/design-tokens.yml
name: Design Token Pipeline

on:
  push:
    branches: [main, design-tokens]
    paths:
      - "tokens/**"
  workflow_dispatch:
  repository_dispatch:
    types: [figma-tokens-updated]

env:
  NODE_VERSION: "20"

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      tokens_changed: ${{ steps.filter.outputs.tokens }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            tokens:
              - "tokens/**/*.json"

  build-tokens:
    needs: detect-changes
    if: needs.detect-changes.outputs.tokens_changed == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - run: npm ci
      - run: npm run tokens:build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: token-build
          path: build/

  visual-regression:
    needs: build-tokens
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - run: npm ci

      - name: Download token build
        uses: actions/download-artifact@v4
        with:
          name: token-build
          path: build/

      - name: Build Storybook
        run: npm run build-storybook

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitOnceUploaded: true

  accessibility-audit:
    needs: build-tokens
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - run: npm ci

      - name: Download token build
        uses: actions/download-artifact@v4
        with:
          name: token-build
          path: build/

      - name: Run accessibility tests
        run: npm run test:a11y

  publish:
    needs: [visual-regression, accessibility-audit]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"
          registry-url: "https://registry.npmjs.org"

      - run: npm ci

      - name: Download token build
        uses: actions/download-artifact@v4
        with:
          name: token-build
          path: build/

      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Deploy CSS to CDN
        run: |
          aws s3 sync build/css/ s3://${{ secrets.CDN_BUCKET }}/tokens/css/ \
            --cache-control "public, max-age=31536000, immutable"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Branch Strategy

The `design-tokens` branch serves as a staging area for token updates. Tokens Studio pushes changes to this branch via its GitHub sync feature. The workflow runs on push to `design-tokens`, builds and tests the tokens, then creates an automated PR to `main` if all checks pass.

```yaml
# Additional job for auto-PR creation
  create-pr:
    needs: [visual-regression, accessibility-audit]
    if: github.ref == 'refs/heads/design-tokens'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v6
        with:
          branch: design-tokens
          base: main
          title: "chore(tokens): update design tokens"
          body: |
            Automated token update from Figma via Tokens Studio.
            - Visual regression tests: passed
            - Accessibility audit: passed
          labels: design-tokens, automated
```

### Webhook Trigger from Figma

Configure Tokens Studio to push to the `design-tokens` branch on save. Alternatively, use a Figma webhook with a serverless function to dispatch the `figma-tokens-updated` repository event:

```javascript
// Serverless function (e.g., Vercel/Netlify)
export default async function handler(req) {
  if (req.body.event_type === "FILE_UPDATE") {
    await fetch(
      "https://api.github.com/repos/OWNER/REPO/dispatches",
      {
        method: "POST",
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          event_type: "figma-tokens-updated",
          client_payload: {
            file_key: req.body.file.key,
            timestamp: req.body.timestamp,
          },
        }),
      }
    );
  }
  return new Response("OK", { status: 200 });
}
```

---

## 5. Visual Regression Testing

Visual regression testing is the safety net that catches unintended visual changes before they reach production. When a token changes, you need to know exactly what looks different and whether that difference is intentional.

### Chromatic

Chromatic is purpose-built for Storybook-based visual testing. It captures a screenshot of every story on every push and diffs it against the accepted baseline.

**Setup:**

```bash
npm install --save-dev chromatic
```

**Configuration** (`.chromaticrc`):

```json
{
  "projectId": "Project:abc123",
  "autoAcceptChanges": "main",
  "exitZeroOnChanges": false,
  "onlyChanged": true,
  "externals": ["build/css/tokens.css"]
}
```

**Baseline management.** Chromatic stores baselines per branch. When a token update changes a component's appearance, the Chromatic UI shows the diff. A reviewer accepts or rejects the visual change. Accepted changes become the new baseline.

**Review workflow.** The CI job posts a Chromatic link to the PR. Designers and developers review visual diffs together. This closes the feedback loop: the designer sees exactly how their token change manifests in rendered components.

### Percy (Alternative)

Percy works independently of Storybook and can snapshot any URL or rendered page.

```yaml
# percy.yml
version: 2
snapshot:
  widths: [375, 768, 1280]
  min-height: 1024
  percy-css: |
    * { animation-duration: 0s !important; }
discovery:
  network-idle-timeout: 500
```

Percy is stronger when you need full-page snapshots or when components are not in Storybook. Its snapshot strategies include per-component, per-page, and per-viewport.

### BackstopJS (Open Source)

BackstopJS is a self-hosted alternative using headless Chrome and Docker for consistent reference images. Its engines are Puppeteer and Playwright, so Sumi itself never runs it; use it only if your team already does.

```json
{
  "id": "design-system",
  "viewports": [
    { "label": "phone", "width": 375, "height": 812 },
    { "label": "tablet", "width": 768, "height": 1024 },
    { "label": "desktop", "width": 1280, "height": 900 }
  ],
  "scenarios": [
    {
      "label": "Button Primary",
      "url": "http://localhost:6006/iframe.html?id=components-button--primary",
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true
    }
  ],
  "engine": "puppeteer",
  "dockerCommandTemplate": "docker run --rm -i --mount type=bind,source=\"{cwd}\",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}"
}
```

### When to Use Which Tool

| Criteria | Chromatic | Percy | BackstopJS |
|----------|-----------|-------|------------|
| Storybook integration | Native | Plugin | Manual |
| Self-hosted | No | No | Yes |
| Cost for large systems | Per-snapshot pricing | Per-snapshot pricing | Free (infra costs only) |
| Baseline management | Built-in UI | Built-in UI | Git-based |
| Best for | Component libraries | Full-page testing | Budget-constrained teams |

### Threshold Configuration

Set pixel diff tolerance at 0.1% to catch meaningful changes while ignoring sub-pixel rendering differences across environments:

```javascript
// In Chromatic, configure per-story
MyStory.parameters = {
  chromatic: {
    diffThreshold: 0.063, // ~0.1% of viewport pixels
    delay: 300,           // Wait for animations
  },
};
```

---

## 6. Component Naming Conventions

Naming misalignment between design and code is one of the most common sources of confusion. A component called "Card/Elevated" in Figma should map predictably to code.

### Figma-to-Code Naming Alignment

| Figma Name | CSS (BEM) | React | SwiftUI | Compose |
|------------|-----------|-------|---------|---------|
| Button/Primary | `.button--primary` | `<Button variant="primary">` | `ButtonPrimary()` | `PrimaryButton()` |
| Card/Elevated | `.card--elevated` | `<Card elevation="raised">` | `ElevatedCard()` | `ElevatedCard()` |
| Input/Text/Default | `.input-text` | `<TextInput state="default">` | `TextInputField()` | `TextInputField()` |
| Nav/Top Bar | `.nav-top-bar` | `<TopBar>` | `TopBar()` | `TopBar()` |

### BEM vs. Atomic Naming for CSS

**BEM** (Block Element Modifier) maps well to Figma's component structure:

```css
/* Block = Figma component, Element = sub-layer, Modifier = variant */
.card { }
.card__header { }
.card__body { }
.card--elevated { box-shadow: var(--shadow-md); }
.card--outlined { border: 1px solid var(--color-border-default); }
```

**Atomic/utility naming** (Tailwind-aligned) maps to token values directly:

```html
<div class="p-4 rounded-lg shadow-md bg-surface-primary">
  <h3 class="text-heading-lg font-bold text-content-primary">Title</h3>
</div>
```

Both approaches work. The key is choosing one and maintaining a naming dictionary that maps Figma component names to code identifiers.

### React Component Naming

```typescript
// PascalCase for components, camelCase for props
// Variant prop mirrors Figma variant property name

interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";  // Maps to Figma "Variant" property
  size: "sm" | "md" | "lg";                     // Maps to Figma "Size" property
  isDisabled?: boolean;                          // Maps to Figma "State=Disabled"
  children: React.ReactNode;
}

export function Button({ variant, size, isDisabled, children }: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
```

### SwiftUI Naming

```swift
// Swift conventions: method-style naming, enum-based variants
struct DSButton: View {
    enum Variant { case primary, secondary, ghost }
    enum Size { case sm, md, lg }

    let variant: Variant
    let size: Size
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(fontSize(for: size))
                .foregroundColor(foregroundColor(for: variant))
                .padding(padding(for: size))
                .background(backgroundColor(for: variant))
                .cornerRadius(DesignTokens.borderRadiusMd)
        }
    }
}
```

### Maintaining a Naming Dictionary

Keep a `naming-dictionary.json` at the root of the token repository. This file maps Figma names to code identifiers and is consumed by documentation generators:

```json
{
  "components": {
    "Button/Primary": {
      "css": ".button--primary",
      "react": "Button variant='primary'",
      "swiftui": "DSButton(variant: .primary)",
      "compose": "PrimaryButton()"
    }
  }
}
```

---

## 7. Storybook Integration

Storybook serves as the living documentation of the component library. It bridges design and engineering by providing an interactive playground where every component can be viewed, configured, and tested in isolation.

### Args and Controls

Map Storybook controls directly to component props. These controls should mirror the variant properties defined in Figma:

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",  // Mirrors Figma page/section structure
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "Visual style variant (maps to Figma 'Variant' property)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant (maps to Figma 'Size' property)",
    },
    isDisabled: {
      control: "boolean",
      description: "Disabled state (maps to Figma 'State=Disabled')",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button Label",
  },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "Button Label" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="primary" size="md">Primary</Button>
      <Button variant="secondary" size="md">Secondary</Button>
      <Button variant="ghost" size="md">Ghost</Button>
    </div>
  ),
};
```

### Design Token Addon

The `storybook-design-token` addon renders token documentation directly inside Storybook:

```javascript
// .storybook/main.js
module.exports = {
  addons: [
    "storybook-design-token",
  ],
};
```

This addon parses CSS custom property files and displays color swatches, spacing scales, and typography specimens alongside your component stories.

### Chromatic Integration

Chromatic connects directly to Storybook builds. Every story becomes a visual test:

```javascript
// .storybook/main.js
module.exports = {
  features: {
    interactionDebugger: true,
  },
};
```

### Interaction Testing with Play Functions

Test interactive behaviors directly in Storybook stories:

```typescript
import { within, userEvent, expect } from "@storybook/test";

export const ClickInteraction: Story = {
  args: { variant: "primary", size: "md", children: "Click Me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};
```

---

## 8. Multi-Brand / White-Label Architecture

When one design system serves multiple brands, tokens become the brand-switching mechanism. The component code stays identical; only the tokens change.

### Token-Level Brand Switching

```
tokens/
├── global/              # Shared structural tokens (spacing, radius, etc.)
│   ├── spacing.json
│   └── radius.json
├── brand-a/             # Brand A color, typography overrides
│   ├── color.json
│   └── typography.json
├── brand-b/             # Brand B color, typography overrides
│   ├── color.json
│   └── typography.json
└── semantic/            # Semantic aliases (reference global + brand)
    ├── color.json
    └── typography.json
```

### Style Dictionary Multi-Brand Configuration

```javascript
// style-dictionary.config.js
const brands = ["brand-a", "brand-b"];

module.exports = brands.map((brand) => ({
  source: [
    "tokens/global/**/*.json",
    `tokens/${brand}/**/*.json`,
    "tokens/semantic/**/*.json",
  ],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: `build/${brand}/css/`,
      files: [
        {
          destination: "tokens.css",
          format: "css/custom-properties",
        },
      ],
    },
    // ... other platforms
  },
}));
```

### Theme Provider Pattern in React

```typescript
// ThemeProvider.tsx
import { createContext, useContext } from "react";

type Brand = "brand-a" | "brand-b";

const ThemeContext = createContext<Brand>("brand-a");

export function ThemeProvider({
  brand,
  children,
}: {
  brand: Brand;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={brand}>
      <div data-brand={brand}>{children}</div>
    </ThemeContext.Provider>
  );
}

// In CSS, scope tokens to data-brand attribute
// [data-brand="brand-a"] { --color-primary: #0066FF; }
// [data-brand="brand-b"] { --color-primary: #FF6600; }
```

### SwiftUI Environment-Based Theming

```swift
struct BrandTheme {
    let primary: Color
    let secondary: Color
    let fontFamily: String
}

struct BrandThemeKey: EnvironmentKey {
    static let defaultValue = BrandTheme(
        primary: DesignTokens.colorPrimary,
        secondary: DesignTokens.colorSecondary,
        fontFamily: "Inter"
    )
}

extension EnvironmentValues {
    var brandTheme: BrandTheme {
        get { self[BrandThemeKey.self] }
        set { self[BrandThemeKey.self] = newValue }
    }
}

// Usage
struct ContentView: View {
    @Environment(\.brandTheme) var theme

    var body: some View {
        Text("Hello")
            .foregroundColor(theme.primary)
    }
}
```

### Runtime vs. Build-Time Brand Switching

| Approach | Pros | Cons |
|----------|------|------|
| **Build-time** (separate bundles per brand) | Smaller bundles, tree-shaking removes unused tokens | Separate deployments per brand, slower iteration |
| **Runtime** (CSS custom property swapping) | Single deployment, instant switching, A/B testing friendly | Slightly larger bundle, all brand tokens loaded |

Use build-time for native apps (iOS/Android) where app store distribution demands separate builds. Use runtime for web apps where a single deployment serves multiple brands via subdomain or configuration.

---

## 9. Accessibility in the Pipeline

Accessibility is not a phase. It is a continuous check integrated at every stage of the pipeline.

### axe-core Integration in Storybook

```javascript
// .storybook/main.js
module.exports = {
  addons: ["@storybook/addon-a11y"],
};
```

Every story is automatically audited by axe-core. Violations appear in the Storybook accessibility panel. Configure rules globally:

```javascript
// .storybook/preview.js
export const parameters = {
  a11y: {
    config: {
      rules: [
        { id: "color-contrast", enabled: true },
        { id: "aria-allowed-attr", enabled: true },
        { id: "button-name", enabled: true },
      ],
    },
  },
};
```

### Automated Color Contrast Checking

Write a custom script that validates every color token pair against WCAG contrast ratios:

```javascript
// scripts/check-contrast.js
const tokens = require("../build/css/tokens.json");
const { getContrastRatio } = require("color2k");

const pairs = [
  ["color-content-primary", "color-surface-primary"],       // Body text on background
  ["color-content-on-primary", "color-primary"],             // Text on primary button
  ["color-content-secondary", "color-surface-primary"],      // Secondary text on background
];

let failures = 0;

pairs.forEach(([fg, bg]) => {
  const ratio = getContrastRatio(tokens[fg], tokens[bg]);
  const aaPass = ratio >= 4.5;
  const aaaPass = ratio >= 7;

  if (!aaPass) {
    console.error(`FAIL: ${fg} on ${bg} — ratio ${ratio.toFixed(2)}:1 (needs 4.5:1 for AA)`);
    failures++;
  } else {
    console.log(`PASS: ${fg} on ${bg} — ratio ${ratio.toFixed(2)}:1 ${aaaPass ? "(AAA)" : "(AA)"}`);
  }
});

process.exit(failures > 0 ? 1 : 0);
```

### Accessibility Linting in CI

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"],
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "jsx-a11y/label-has-associated-control": "error"
  }
}
```

### WCAG Compliance Gate

Add a dedicated CI job that blocks merging if accessibility violations are found:

```yaml
  accessibility-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build-storybook
      - name: axe accessibility audit
        run: |
          npx @axe-core/cli http://localhost:6006 \
            --exit \
            --tags wcag2a,wcag2aa \
            --disable color-contrast-enhanced
      - name: Token contrast check
        run: node scripts/check-contrast.js
      - name: ESLint a11y rules
        run: npx eslint --ext .tsx,.jsx src/ --rule 'jsx-a11y/alt-text: error'
```

---

## 10. Measuring Pipeline Health

A pipeline that is not measured will degrade. Track these metrics to ensure the system continues to deliver value.

### Core Metrics

**Design-to-code time.** Measure the elapsed time from when a designer updates a token in Figma to when that change is live in production. Target: under 24 hours for non-breaking changes, under 1 week for breaking changes requiring component updates.

**Token adoption rate.** Percentage of styling in the codebase that references design tokens rather than hardcoded values. Measure by scanning for raw hex codes, pixel values, and font stacks that do not come from tokens. Target: above 95%.

```bash
# Quick audit: count hardcoded colors vs. token references
# Hardcoded hex values (potential violations)
grep -rn '#[0-9a-fA-F]\{6\}' src/ --include='*.css' --include='*.scss' | wc -l

# Token references (compliant usage)
grep -rn 'var(--color' src/ --include='*.css' --include='*.scss' | wc -l
```

**Visual regression catch rate.** Number of unintended visual changes caught by automated testing versus those discovered in production. Target: above 99% catch rate (fewer than 1 in 100 visual bugs reach production).

**Manual override frequency.** How often developers bypass tokens with inline styles, `!important`, or hardcoded values. Each override is a signal that either the token system has a gap or a developer is circumventing the process. Target: fewer than 5 overrides per sprint.

**Cross-platform consistency score.** Side-by-side comparison of the same component across platforms. Automated screenshot comparison between web, iOS, and Android renders of the same component with the same token values. Target: less than 2% visual deviation.

### Dashboard Template

```
┌─────────────────────────────────────────────────────────────────┐
│              DESIGN SYSTEM PIPELINE HEALTH                      │
│              Week of YYYY-MM-DD                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Design-to-Code Time          ██████████████░░░  18 hrs avg    │
│  Target: < 24 hrs                                  [ON TRACK]   │
│                                                                 │
│  Token Adoption Rate          █████████████████░  96.2%        │
│  Target: > 95%                                     [ON TRACK]   │
│                                                                 │
│  Visual Regression Catch      █████████████████░  99.4%        │
│  Target: > 99%                                     [ON TRACK]   │
│                                                                 │
│  Manual Overrides (Sprint)    ███░░░░░░░░░░░░░░  3 overrides  │
│  Target: < 5 per sprint                            [ON TRACK]   │
│                                                                 │
│  Cross-Platform Consistency   ████████████████░░  97.8%        │
│  Target: > 98%                                     [AT RISK]    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Token Changes This Week: 12                                    │
│  Visual Regression Tests Run: 3,847                             │
│  Accessibility Violations Caught: 2                             │
│  Pipeline Build Failures: 1 (resolved: missing font token)      │
└─────────────────────────────────────────────────────────────────┘
```

### Collecting Metrics Automatically

Integrate metric collection into the CI pipeline itself:

```javascript
// scripts/pipeline-metrics.js
const fs = require("fs");
const glob = require("fast-glob");

async function collectMetrics() {
  // Token adoption: count token refs vs. hardcoded values
  const cssFiles = await glob("src/**/*.{css,scss,tsx}");
  let tokenRefs = 0;
  let hardcoded = 0;

  for (const file of cssFiles) {
    const content = fs.readFileSync(file, "utf-8");
    tokenRefs += (content.match(/var\(--/g) || []).length;
    hardcoded += (content.match(/#[0-9a-fA-F]{6}\b/g) || []).length;
  }

  const adoptionRate = tokenRefs / (tokenRefs + hardcoded);

  // Manual overrides: count !important and inline styles
  let overrides = 0;
  for (const file of cssFiles) {
    const content = fs.readFileSync(file, "utf-8");
    overrides += (content.match(/!important/g) || []).length;
  }

  return {
    timestamp: new Date().toISOString(),
    tokenAdoptionRate: (adoptionRate * 100).toFixed(1),
    totalTokenReferences: tokenRefs,
    totalHardcodedValues: hardcoded,
    manualOverrides: overrides,
  };
}

collectMetrics().then((metrics) => {
  console.log(JSON.stringify(metrics, null, 2));
  fs.writeFileSync(
    "metrics/pipeline-health.json",
    JSON.stringify(metrics, null, 2)
  );
});
```

Post these metrics to your team dashboard (Datadog, Grafana, or even a simple GitHub Pages site) after every pipeline run. Trend over time matters more than any single snapshot. A declining token adoption rate is an early warning that the design system is losing relevance — address it before it becomes a rewrite.
