---
name: style
description: "Generate a complete visual identity — colors, typography, spacing, motion, tone, tokens, and reference apps for any sector or mood."
argument-hint: "[product, sector, or mood]"
---

# Style — Complete Visual Identity Generator

## Before running

This command needs a product, sector, or mood to build a visual identity for.

If the user invoked it with nothing and no target is evident from the conversation or open files, ask for it in one plain-language question and stop. Do not invent a target and do not produce generic output in place of the real work — output about something imaginary reads as authoritative and is worthless.

If a target is evident from context, use it and say which one you picked.


The flagship command. Given a sector, mood, or set of constraints, generate a **complete, opinionated, copy-paste-ready visual identity** that captures the taste and conventions of the best products in your category. Every value ships — no placeholders, no "choose your own adventure." You get a system.

This command absorbs and replaces the former `/style` and `/style` commands, unifying style direction with actionable reference sourcing in a single pass.

---

## Supported Sectors (22)

| # | Sector | Key Characteristics | Default Mood |
|---|--------|-------------------|-------------|
| 1 | Fintech / Banking | Trust, precision, security, clean data display | Professional |
| 2 | Healthcare / Medical | Clinical trust, calm, HIPAA-aware hierarchy | Clinical |
| 3 | Wellness / Fitness | Energy, motivation, progress visualization | Energetic |
| 4 | Social Media | Expression, engagement, content-first, identity | Expressive |
| 5 | Creator Tools | Creative expression, canvas-centric, pro-grade | Creative |
| 6 | Messaging | Speed, intimacy, presence, conversation-first | Warm |
| 7 | SaaS / Productivity | Efficiency, density, keyboard-first, professional | Balanced |
| 8 | Enterprise / B2B | Data density, role-based, workflow-oriented | Serious |
| 9 | Developer Tools | Monospace, dark-native, information-dense | Technical |
| 10 | E-commerce | Product-first, conversion-optimized, trust signals | Commercial |
| 11 | Marketplace | Two-sided trust, discovery, comparison, social proof | Trustworthy |
| 12 | Food & Delivery | Appetite appeal, urgency, real-time tracking | Warm |
| 13 | Travel & Hospitality | Aspiration, immersive imagery, booking confidence | Aspirational |
| 14 | Education / EdTech | Progression, encouragement, clarity, engagement | Friendly |
| 15 | Gaming | Immersion, achievement, community, spectacle | Bold |
| 16 | Media / Entertainment | Content immersion, discovery, binge-friendly | Immersive |
| 17 | Music / Audio | Mood, waveform aesthetics, playback-centric | Atmospheric |
| 18 | Sports | Energy, real-time data, team identity, competition | Dynamic |
| 19 | Real Estate | Aspiration, space visualization, trust, locality | Premium |
| 20 | Automotive | Premium, configurator patterns, performance | Luxurious |
| 21 | Legal / Compliance | Authority, document-centric, precision, gravity | Authoritative |
| 22 | Non-Profit | Impact storytelling, donation conversion, transparency | Humanistic |

---

## Starter Recipes — Zero-Config Presets

When the user provides ONLY a sector name with no additional parameters, apply the corresponding starter recipe immediately. No questions. No prompts for more info. Just generate.

Each recipe defines the complete set of design decisions: color palette, typography, spacing, motion, and mood — optimized for the sector's conventions and audience expectations.

### Recipe 1: SaaS Dashboard
**Trigger**: `/style saas` or `/style saas-dashboard` or `/style productivity`
- **Palette**: Cool slate neutrals, blue primary (#2563EB → oklch), green success, amber warning
- **Typography**: Inter (headings 600-700) + Inter (body 400-500). Tabular nums for metrics.
- **Spacing**: 4px base, dense (16px default padding), compact data tables
- **Motion**: Subtle — 150ms ease-out transitions, no bouncy animations
- **Mood**: Professional, efficient, data-forward
- **Radius**: sm=4px, md=6px, lg=8px (tight, professional)
- **Shadows**: Minimal — sm only for cards, elevation for dropdowns/modals
- **Reference DNA**: Linear, Notion, Vercel Dashboard

### Recipe 2: Fintech / Banking
**Trigger**: `/style fintech` or `/style banking` or `/style finance`
- **Palette**: Deep navy primary (#1E3A5F → oklch), teal accents, warm neutrals
- **Typography**: DM Sans (headings 600-700) + Inter (body 400). Tabular nums mandatory for amounts.
- **Spacing**: 4px base, generous (24px default padding), breathing room for trust
- **Motion**: Conservative — 200ms ease transitions, no playful animations
- **Mood**: Trust-first, precise, secure
- **Radius**: sm=4px, md=8px, lg=12px (slightly rounded, approachable but serious)
- **Shadows**: Soft, layered — trust through depth without heaviness
- **Reference DNA**: Stripe, Mercury, Wise

### Recipe 3: E-Commerce
**Trigger**: `/style ecommerce` or `/style shop` or `/style store`
- **Palette**: Warm neutrals, coral/orange CTA (#FF6B35 → oklch), green for savings/success
- **Typography**: Plus Jakarta Sans (headings 700-800) + Inter (body 400). Display for prices.
- **Spacing**: 4px base, product card grid with 16-24px gaps
- **Motion**: Engaging — 200ms spring for cart, 300ms for page transitions
- **Mood**: Inviting, conversion-optimized, product-first
- **Radius**: sm=8px, md=12px, lg=16px (friendly, approachable)
- **Shadows**: Medium — product cards elevated, hover lift effect
- **Reference DNA**: Shopify Polaris, Gumroad, Apple Store

### Recipe 4: Healthcare / Medical
**Trigger**: `/style healthcare` or `/style medical` or `/style health`
- **Palette**: Calm teal primary (#0D9488 → oklch), light blue accents, warm white surfaces
- **Typography**: Source Sans 3 (headings 600) + Source Sans 3 (body 400). Clear, clinical.
- **Spacing**: 4px base, generous (24-32px padding), breathing room reduces anxiety
- **Motion**: Gentle — 250ms ease, calming transitions, no jarring movements
- **Mood**: Clinical trust, calm, reassuring
- **Radius**: sm=8px, md=12px, lg=16px (soft, non-threatening)
- **Shadows**: Very soft, low contrast — calm elevation
- **Reference DNA**: One Medical, Calm, Headspace

### Recipe 5: Creative / Portfolio
**Trigger**: `/style creative` or `/style portfolio` or `/style agency`
- **Palette**: Near-black (#0A0A0A) + warm white (#FAFAF5), bold accent (your choice — vermillion, electric blue, or acid green)
- **Typography**: Instrument Serif or Playfair Display (headings 400-700) + Inter (body 400). Dramatic contrast.
- **Spacing**: 4px base, dramatic (48-80px section gaps), generous white space
- **Motion**: Expressive — 400ms spring, scroll-driven, parallax, stagger reveals
- **Mood**: Bold, editorial, gallery-like
- **Radius**: sm=0px, md=0px, lg=0px (sharp edges, editorial feel) OR all round (playful)
- **Shadows**: None or dramatic — no middle ground
- **Reference DNA**: current Awwwards winners via `/inspo`, Linear website, Vercel website

### Recipe 6: Education / EdTech
**Trigger**: `/style education` or `/style edtech` or `/style learning`
- **Palette**: Friendly blue primary (#3B82F6 → oklch), warm yellow accents, soft green progress
- **Typography**: Nunito (headings 700-800) + Inter (body 400). Rounded, friendly, readable.
- **Spacing**: 4px base, generous (20-24px padding), comfortable reading
- **Motion**: Playful — 250ms spring, progress animations, celebration confetti
- **Mood**: Encouraging, friendly, clear
- **Radius**: sm=8px, md=12px, lg=20px (very rounded, approachable)
- **Shadows**: Soft, warm — friendly elevation
- **Reference DNA**: Duolingo, Khan Academy, Notion

### Recipe 7: Social / Community
**Trigger**: `/style social` or `/style community` or `/style social-media`
- **Palette**: Vibrant blue primary (#1DA1F2 → oklch), gradient accents, dark mode native
- **Typography**: SF Pro Display / Inter (headings 700) + Inter (body 400). Dense, scannable.
- **Spacing**: 4px base, compact (12-16px padding), content-dense feeds
- **Motion**: Snappy — 120ms ease, pull-to-refresh, swipe gestures, heart burst
- **Mood**: Expressive, fast, content-first
- **Radius**: sm=8px, md=16px, lg=9999px (pill shapes for badges/tags)
- **Shadows**: Minimal — flat design, borders over shadows
- **Reference DNA**: Twitter/X, Discord, Reddit

### Recipe 8: Developer Tools
**Trigger**: `/style devtools` or `/style developer` or `/style cli`
- **Palette**: Dark-first (#0D1117 surface), green/cyan accents (#22D3EE → oklch), syntax-highlight inspired
- **Typography**: JetBrains Mono (code/headings 500-700) + Inter (body 400). Monospace-forward.
- **Spacing**: 4px base, dense (12-16px padding), information-rich
- **Motion**: Minimal — 100ms ease, instant feedback, no decorative animation
- **Mood**: Technical, precise, dark-native
- **Radius**: sm=4px, md=6px, lg=8px (tight, technical)
- **Shadows**: Subtle glow on dark backgrounds, no traditional shadows
- **Reference DNA**: GitHub, Vercel, Linear, Raycast

### Recipe 9: Landing Page / Marketing
**Trigger**: `/style landing` or `/style marketing` or `/style startup`
- **Palette**: Bold primary (brand color), high contrast CTAs, gradient accents
- **Typography**: Cabinet Grotesk or Satoshi (hero 800-900) + Inter (body 400). Large, confident headlines.
- **Spacing**: 4px base, dramatic (64-120px section gaps), hero sections with massive padding
- **Motion**: Show-stopping — 500ms spring, scroll-triggered, stagger reveals, counter animations
- **Mood**: Confident, conversion-focused, impressive
- **Radius**: sm=8px, md=12px, lg=24px (modern, friendly)
- **Shadows**: Hero shadows, frosted glass effects, layered depth
- **Reference DNA**: Stripe, Vercel, Linear, Framer

### Recipe 10: Mobile App
**Trigger**: `/style mobile` or `/style ios` or `/style android`
- **Palette**: Platform-adaptive — iOS: system blues/vibrant. Android: M3 tonal palettes. Both: semantic colors.
- **Typography**: SF Pro (iOS) / Google Sans (Android) / Inter (cross-platform). System-native feel.
- **Spacing**: 4px base, touch-optimized (44px min tap targets, 16px edge padding)
- **Motion**: Platform-native — iOS: spring(response: 0.3). Android: M3 emphasized easing.
- **Mood**: Native, fluid, thumb-friendly
- **Radius**: iOS: 10-16px (continuous corners). Android: 12-28px (M3 shapes).
- **Shadows**: iOS: subtle drop shadows. Android: M3 elevation (tonal, not shadow).
- **Reference DNA**: Apple HIG, Material 3 Expressive, system apps

---

## Input Protocol

Accept the following parameters. Infer sensible defaults for anything not provided.

| Parameter | Required | Default | Examples |
|-----------|----------|---------|----------|
| **Sector** | Yes (or mood) | — | "fintech", "SaaS", "wellness" |
| **Sub-niche** | No | General | "neobank", "habit tracker", "legal CRM" |
| **Mood** | No | Sector default | premium, playful, minimal, bold, warm, clinical, dark, editorial |
| **Platform** | No | responsive | mobile-first, desktop-first, responsive |
| **Brand color** | No | Generated | "#2563eb", "blue", "oklch(0.55 0.15 250)" |
| **Audience** | No | universal | Gen Z, Millennial, Gen X, Boomer, universal |
| **Density** | No | Sector default | tight, balanced, airy |
| **Accessibility** | No | AA | AA, AAA |

If only a mood or vibe phrase is given (e.g., "dark minimal Japanese"), derive the sector or skip sector and generate purely from mood.

---

## Design Memory v2 — Project Intelligence

Before generating any style decisions, scan the project context to detect existing design decisions and technology stack.

### Auto-Detection Protocol

**Step 1: Technology Stack Detection**

Scan the working directory for project signals:

| File/Pattern | Detection | Action |
|-------------|-----------|--------|
| `tailwind.config.js/ts` | Tailwind CSS project | Extract existing theme customizations (colors, fonts, spacing, screens). Use as baseline instead of generating from scratch |
| `tailwind.config` → `theme.extend.colors` | Custom color tokens exist | Inherit these colors. Do not override unless explicitly asked |
| `tailwind.config` → `theme.extend.fontFamily` | Custom fonts defined | Use these fonts. Suggest pairing improvements if appropriate |
| `globals.css` / `app.css` | CSS custom properties | Extract `:root {}` variables. Map to Sumi token structure |
| `package.json` → dependencies | Framework detection | Detect React, Vue, Svelte, Next.js, Nuxt, SvelteKit. Adjust output format |
| `tsconfig.json` | TypeScript project | Output TypeScript types for tokens |
| `.css` files with `--` custom properties | Existing token system | Map to Sumi format. Identify gaps |
| `theme.json` / `tokens.json` | Design token file | Parse existing tokens. Use as baseline |
| `*.swift` / `Package.swift` | SwiftUI project | Output SwiftUI color/font extensions |
| `styles/` or `tokens/` directory | Organized design system | Scan for existing design decisions |

**Step 2: Existing Design Analysis**

If design tokens or theme customizations are found:
1. Map existing values to Sumi's token structure
2. Identify GAPS — what the project defines vs. what a complete system needs
3. Generate ONLY the missing pieces, not the whole system
4. Flag any inconsistencies found (e.g., 5 different border-radius values, spacing that doesn't follow a scale)
5. Ask: "I found existing design tokens. Should I (a) extend them, (b) rebuild from scratch, or (c) audit what you have?"

**Step 3: Design Memory Check**

Check for existing Sumi design memory:
- `.sumi/style.json` — previous style generation
- `.sumi/context.json` — project context
- If found: "I found your previous Sumi style. Should I update it or start fresh?"
- If found and user runs a sector-specific generation: merge with existing decisions, flagging any conflicts

---

## Generation Protocol

### Step 1 — Direction Summary

Write 2-3 sentences capturing the overall visual personality — the "why" behind every choice. Reference the sector conventions being embraced or deliberately subverted. This frames every decision that follows.

### Step 2 — Color Palette

Generate a complete color system in **OKLCH** (with hex fallbacks).

**2a. Neutral Scale (10 steps)**

| Step | Name | OKLCH | Hex | Usage |
|------|------|-------|-----|-------|
| 50 | neutral-50 | oklch(0.985 0 0) | #fafafa | Page background |
| 100 | neutral-100 | oklch(0.965 0 0) | #f5f5f5 | Raised surface |
| 200 | neutral-200 | oklch(0.925 0 0) | #e5e5e5 | Border, divider |
| 300 | neutral-300 | oklch(0.87 0 0) | #d4d4d4 | Disabled, placeholder |
| 400 | neutral-400 | oklch(0.71 0 0) | #a3a3a3 | Secondary text (light bg) |
| 500 | neutral-500 | oklch(0.55 0 0) | #737373 | Tertiary text |
| 600 | neutral-600 | oklch(0.445 0 0) | #525252 | Body text |
| 700 | neutral-700 | oklch(0.37 0 0) | #404040 | Strong text |
| 800 | neutral-800 | oklch(0.27 0 0) | #262626 | Heading text |
| 900 | neutral-900 | oklch(0.205 0 0) | #171717 | Maximum contrast |

Adjust chroma/hue to add sector warmth or coolness (e.g., fintech neutrals carry slight blue chroma; wellness neutrals carry slight warm chroma).

**2b. Brand/Primary Scale (10 steps)**

Generate a full 50-900 scale from the brand hue. Each step:
- Lightness moves in perceptually even increments (OKLCH guarantees this)
- Chroma peaks at 500-600 and tapers at extremes
- 500 is the "hero" value used for primary buttons and links

**2c. Secondary Scale (10 steps)**

Choose complementary, analogous, or split-complementary based on sector:
- Fintech: analogous (blue-to-teal) for trust continuity
- Wellness: complementary (green-to-coral) for energy contrast
- SaaS: analogous (indigo-to-violet) for professional polish

**2d. Semantic Colors**

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| success | oklch(0.55 0.15 145) | oklch(0.70 0.15 145) | Positive outcomes, confirmations |
| warning | oklch(0.70 0.15 85) | oklch(0.75 0.12 85) | Caution states, pending actions |
| error | oklch(0.55 0.20 27) | oklch(0.70 0.18 27) | Errors, destructive actions |
| info | oklch(0.55 0.12 250) | oklch(0.70 0.12 250) | Informational, neutral alerts |

**2e. Dark Mode Palette**

Do NOT simply invert lightness. Apply proper dark-mode transformation:
- Backgrounds: Use 800-900 range neutrals with slight brand chroma
- Surfaces: Lighter than background by 1-2 steps (not white)
- Text: Use 100-300 range (not pure white — use oklch L=0.93 max)
- Primary colors: Shift to higher lightness (L+0.15) and reduce chroma slightly
- Semantic colors: Increase lightness, reduce saturation to prevent glare
- Borders: Use low-alpha white overlays (oklch with 10-15% opacity) rather than gray values
- Shadows: Effectively invisible in dark mode — use border or surface elevation instead

**2f. Accessible Pairings**

Verify every functional text/background combination. Output a table:

| Foreground | Background | Contrast (APCA) | WCAG 2.2 Ratio | Pass AA | Pass AAA |
|-----------|-----------|-----------------|----------------|---------|----------|
| text-primary | bg-primary | Lc 90 | 15.3:1 | Yes | Yes |
| text-secondary | bg-primary | Lc 60 | 7.1:1 | Yes | Yes |
| text-on-primary | brand-500 | Lc 75 | 4.8:1 | Yes | No |
| ... | ... | ... | ... | ... | ... |

Include APCA Lc values alongside WCAG 2.2 ratios. Flag any pairs below AA threshold.

### Step 3 — Typography

**3a. Font Pairing**

| Role | Font | Weight(s) | Google Fonts URL | CSS `font-family` Stack |
|------|------|-----------|-----------------|------------------------|
| Headings | [Specific font] | 600, 700 | `https://fonts.google.com/...` | `'[Font]', [fallback stack]` |
| Body | [Specific font] | 400, 500 | `https://fonts.google.com/...` | `'[Font]', [fallback stack]` |
| Mono | [Specific font] | 400 | `https://fonts.google.com/...` | `'[Font]', [fallback stack]` |

**Framework-Aware Font Loading:**

Detect the project framework and output the correct font loading strategy. Never output a generic `<link>` tag when a framework-native solution exists.

**Next.js (App Router):**
```typescript
// app/layout.tsx
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const heading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
```

**Next.js + Tailwind v4 (`@theme` integration):**
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --font-heading: var(--font-heading), system-ui, sans-serif;
  --font-body: var(--font-body), system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}
```

**Remix / Vite / Astro (no `next/font`):**
```html
<!-- In root layout head -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=[Heading+Font]:wght@600;700&family=[Body+Font]:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**Fallback (static HTML, any framework):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=[Heading+Font]:wght@600;700&family=[Body+Font]:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**Font Loading Performance Rules:**
- Always use `font-display: swap` (FOUT > FOIT — visible text with fallback is better than invisible text)
- Preconnect to `fonts.googleapis.com` AND `fonts.gstatic.com` (separate domains)
- In Next.js, `next/font` is ALWAYS preferred — it self-hosts, eliminates layout shift via `size-adjust`, and has zero external requests
- Subset to `latin` unless the project serves CJK, Cyrillic, or other scripts
- Load only the weights you actually use (e.g., `400,500,600,700` not `100..900`)

**Detection Logic:**
1. If `next.config.js` or `next.config.ts` exists → use `next/font/google`
2. If `remix.config.js` or `vite.config.ts` with Remix → use `<link>` with preconnect
3. If `astro.config.mjs` → use `<link>` with preconnect
4. If `package.json` has `@fontsource/*` → use `@fontsource` imports
5. Fallback → `<link>` with preconnect and `font-display: swap`

Explain WHY this pairing works for the sector (personality, x-height compatibility, character set coverage).

**3b. Type Scale**

Choose a modular ratio appropriate for the sector:
- 1.200 (Minor Third) — Dense UI, data-heavy (SaaS, enterprise, dev tools)
- 1.250 (Major Third) — Balanced (most apps)
- 1.333 (Perfect Fourth) — Editorial, content-first (media, travel, real estate)
- 1.414 (Augmented Fourth) — Bold, expressive (gaming, music, creative)
- 1.500 (Perfect Fifth) — High-impact, luxury (automotive, premium)

| Token | Step | Px | Rem | Clamp (fluid) | Line Height | Letter Spacing |
|-------|------|----|-----|---------------|-------------|---------------|
| text-xs | -2 | 11 | 0.6875 | clamp(0.625rem, 0.6rem + 0.1vw, 0.75rem) | 1.5 | 0.02em |
| text-sm | -1 | 13 | 0.8125 | clamp(0.75rem, 0.72rem + 0.15vw, 0.875rem) | 1.5 | 0.01em |
| text-base | 0 | 16 | 1 | clamp(0.875rem, 0.85rem + 0.2vw, 1rem) | 1.5 | 0 |
| text-lg | 1 | 20 | 1.25 | clamp(1rem, 0.95rem + 0.3vw, 1.25rem) | 1.4 | -0.01em |
| text-xl | 2 | 25 | 1.5625 | clamp(1.25rem, 1.15rem + 0.45vw, 1.5625rem) | 1.3 | -0.015em |
| text-2xl | 3 | 31 | 1.9375 | clamp(1.5rem, 1.35rem + 0.6vw, 1.9375rem) | 1.25 | -0.02em |
| text-3xl | 4 | 39 | 2.4375 | clamp(1.875rem, 1.65rem + 0.8vw, 2.4375rem) | 1.2 | -0.025em |
| text-4xl | 5 | 49 | 3.0625 | clamp(2.25rem, 1.95rem + 1vw, 3.0625rem) | 1.15 | -0.03em |
| text-5xl | 6 | 61 | 3.8125 | clamp(2.75rem, 2.3rem + 1.3vw, 3.8125rem) | 1.1 | -0.03em |

Actual values computed from the chosen ratio and base size. Include paragraph `max-width` recommendation in `ch` units (usually 55-75ch).

### Step 4 — Spacing System

**4a. Base Grid**

Select base unit with reasoning:
- **4px base**: Fine-grained control needed (data-dense, enterprise, dev tools)
- **8px base**: Standard for most consumer and SaaS products

| Token | Value | Usage |
|-------|-------|-------|
| space-0 | 0 | Reset |
| space-px | 1px | Hairline borders |
| space-0.5 | 2px (or 4px) | Tight inline gaps |
| space-1 | 4px (or 8px) | Icon-to-label gap, inline spacing |
| space-1.5 | 6px (or 12px) | Compact component padding |
| space-2 | 8px (or 16px) | Default component padding |
| space-3 | 12px (or 24px) | Card padding, section gaps |
| space-4 | 16px (or 32px) | Section padding |
| space-5 | 20px (or 40px) | Large gaps |
| space-6 | 24px (or 48px) | Section separators |
| space-8 | 32px (or 64px) | Page section spacing |
| space-10 | 40px (or 80px) | Hero section padding |
| space-12 | 48px (or 96px) | Major layout gaps |
| space-16 | 64px (or 128px) | Page-level vertical rhythm |

**4b. Component Spacing Conventions**

| Component | Padding X | Padding Y | Gap (children) | Margin Bottom |
|-----------|----------|----------|---------------|--------------|
| Button (sm) | space-3 | space-1.5 | space-1.5 | — |
| Button (md) | space-4 | space-2 | space-2 | — |
| Button (lg) | space-6 | space-3 | space-2 | — |
| Input | space-3 | space-2 | — | space-2 |
| Card | space-4 | space-4 | space-3 | space-4 |
| Modal | space-6 | space-6 | space-4 | — |
| Section | space-6 | space-8 | space-4 | space-8 |

### Step 5 — Motion Language

| Property | Value | Usage |
|----------|-------|-------|
| **Personality** | [Clinical / Smooth / Bouncy / Dramatic] | Overall animation character |
| **Easing — Enter** | cubic-bezier(0.0, 0.0, 0.2, 1.0) | Elements appearing |
| **Easing — Exit** | cubic-bezier(0.4, 0.0, 1.0, 1.0) | Elements disappearing |
| **Easing — Move** | cubic-bezier(0.4, 0.0, 0.2, 1.0) | Position/size changes |
| **Easing — Bounce** | cubic-bezier(0.34, 1.56, 0.64, 1.0) | Playful emphasis (if personality warrants) |
| **Duration — Micro** | 100ms | Hover, focus, toggle |
| **Duration — Short** | 200ms | Fade, color change, small move |
| **Duration — Medium** | 350ms | Slide, expand, modal enter |
| **Duration — Long** | 500ms | Page transition, complex choreography |
| **Spring — Tension** | 170 | For spring-based animations |
| **Spring — Friction** | 26 | Damping factor |
| **Spring — Mass** | 1 | Default mass |
| **Signature Interaction** | [Describe the one motion that gives the product character] | e.g., "Cards lift 4px with shadow expansion on hover" |
| **Reduced Motion** | Instant state change, no motion, opacity-only fades allowed | `prefers-reduced-motion: reduce` fallback |

### Step 6 — Border Radius System

| Token | Value | Usage | Sector Reasoning |
|-------|-------|-------|-----------------|
| radius-none | 0 | Intentional sharp edges | — |
| radius-sm | 4px | Inputs, badges, chips | Subtle, professional |
| radius-md | 8px | Cards, buttons, dialogs | Balanced, modern |
| radius-lg | 12px | Panels, large cards, sheets | Friendly, consumer |
| radius-xl | 16px | Modals, hero cards | Soft, approachable |
| radius-2xl | 24px | Floating elements, pills | Playful, modern |
| radius-full | 9999px | Avatars, round buttons, tags | Circular |

Select the DEFAULT component radius for the sector (e.g., fintech = radius-sm to radius-md; wellness = radius-lg to radius-xl).

### Step 7 — Shadow / Elevation Scale

| Token | CSS Value | Usage |
|-------|-----------|-------|
| shadow-xs | 0 1px 2px 0 oklch(0 0 0 / 0.05) | Subtle lift, inputs |
| shadow-sm | 0 1px 3px 0 oklch(0 0 0 / 0.10), 0 1px 2px -1px oklch(0 0 0 / 0.10) | Cards, dropdowns |
| shadow-md | 0 4px 6px -1px oklch(0 0 0 / 0.10), 0 2px 4px -2px oklch(0 0 0 / 0.10) | Floating elements |
| shadow-lg | 0 10px 15px -3px oklch(0 0 0 / 0.10), 0 4px 6px -4px oklch(0 0 0 / 0.10) | Modals, sheets |
| shadow-xl | 0 20px 25px -5px oklch(0 0 0 / 0.10), 0 8px 10px -6px oklch(0 0 0 / 0.10) | Maximum elevation |

For dark mode: replace shadow with border-based elevation or subtle white overlay.

### Step 8 — Tone of Voice

| Aspect | Direction |
|--------|-----------|
| **Formality** | [Formal / Professional-casual / Casual / Playful] |
| **Personality Traits** | [3-4 adjectives, e.g., "Confident, Clear, Warm, Never condescending"] |
| **Words to Use** | [5-10 sector-specific encouraged words] |
| **Words to Avoid** | [5-10 words that undermine the brand] |

**Microcopy Examples:**

| Context | Example |
|---------|---------|
| Primary CTA | [e.g., "Start building" not "Submit"] |
| Secondary CTA | [e.g., "Learn more" not "Click here"] |
| Error — Validation | [e.g., "Enter a valid email to continue" not "Invalid input"] |
| Error — Server | [e.g., "Something went wrong. We're on it." not "Error 500"] |
| Error — Permission | [e.g., "You'll need admin access for this" not "Access denied"] |
| Empty State — First Use | [e.g., "Your dashboard is ready. Add your first project." not "No data"] |
| Empty State — No Results | [e.g., "No matches yet. Try adjusting your filters." not "0 results found"] |
| Success | [e.g., "Saved! Your changes are live." not "Operation successful"] |
| Loading | [e.g., "Pulling your latest data..." not "Loading..."] |
| Tooltip | [Helpful, concise, action-oriented] |

### Step 9 — Reference Apps

Identify **5 best-in-class apps** in the sector with actionable design intelligence.

**If `.sumi/refs/board.json` exists** (from `/inspo`), the rows come from its sourced references and their captured DNA. The board's `direction` seeds Steps 1-8, and each reference maps into `references` in `.sumi/style.json`. **If not**, offer `/inspo` first. If you continue without it, label this table "from memory, not sourced."

| # | App | Platform | Steal This | Key Takeaway | Where They Could Improve |
|---|-----|----------|------------|--------------|-------------------------|
| 1 | [Name] | [iOS/Android/Web] | [Specific pattern] | [One sentence] | [One honest critique] |
| 2 | [Name] | [iOS/Android/Web] | [Specific pattern] | [One sentence] | [One honest critique] |
| 3 | [Name] | [iOS/Android/Web] | [Specific pattern] | [One sentence] | [One honest critique] |
| 4 | [Name] | [iOS/Android/Web] | [Specific pattern] | [One sentence] | [One honest critique] |
| 5 | [Name] | [iOS/Android/Web] | [Specific pattern] | [One sentence] | [One honest critique] |

**Inspiration Sources** (`/inspo` pulls the first two live):
- **Awwwards**: sector tag + style tag (`reference-intelligence/references/awwwards-adapter.md`)
- **Mobbin**: Specific search terms and filter combinations
- **Screenlane**: Relevant flow categories
- **Refero**: Search terms and collections
- **Nicelydone**: Applicable categories
- **Dribbble/Behance**: Search terms that yield quality, not noise
- **Newsletters/Channels**: Sector-specific teardown sources

### Step 10 — Sector Do's and Don'ts

**Must-Have Patterns (5):**
1. [Pattern] — [Why users expect it] — [Example of it done well]
2. ...
3. ...
4. ...
5. ...

**Pitfalls to Avoid (5):**
1. [Anti-pattern] — [User impact] — [What to do instead]
2. ...
3. ...
4. ...
5. ...

### Step 11 — W3C Design Tokens JSON

Output a **complete** W3C DTCG-format JSON file. This is the machine-readable source of truth.

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "neutral": {
      "50":  { "$value": "oklch(0.985 0 0)", "$type": "color", "$description": "Page background" },
      "100": { "$value": "oklch(0.965 0 0)", "$type": "color", "$description": "Raised surface" },
      "...": "full 50-900 scale"
    },
    "brand": {
      "50":  { "$value": "oklch(...)", "$type": "color", "$description": "Brand tint" },
      "...": "full 50-900 scale"
    },
    "secondary": {
      "...": "full 50-900 scale"
    },
    "semantic": {
      "success": { "$value": "{color.green.500}", "$type": "color" },
      "warning": { "$value": "{color.amber.500}", "$type": "color" },
      "error":   { "$value": "{color.red.500}", "$type": "color" },
      "info":    { "$value": "{color.blue.500}", "$type": "color" }
    }
  },
  "font": {
    "family": {
      "heading": { "$value": "'Inter', system-ui, sans-serif", "$type": "fontFamily" },
      "body":    { "$value": "'Inter', system-ui, sans-serif", "$type": "fontFamily" },
      "mono":    { "$value": "'JetBrains Mono', monospace", "$type": "fontFamily" }
    },
    "size": {
      "xs":   { "$value": "0.6875rem", "$type": "dimension" },
      "sm":   { "$value": "0.8125rem", "$type": "dimension" },
      "base": { "$value": "1rem", "$type": "dimension" },
      "lg":   { "$value": "1.25rem", "$type": "dimension" },
      "xl":   { "$value": "1.5625rem", "$type": "dimension" },
      "2xl":  { "$value": "1.9375rem", "$type": "dimension" },
      "3xl":  { "$value": "2.4375rem", "$type": "dimension" },
      "4xl":  { "$value": "3.0625rem", "$type": "dimension" },
      "5xl":  { "$value": "3.8125rem", "$type": "dimension" }
    },
    "weight": {
      "regular": { "$value": 400, "$type": "fontWeight" },
      "medium":  { "$value": 500, "$type": "fontWeight" },
      "semibold": { "$value": 600, "$type": "fontWeight" },
      "bold":    { "$value": 700, "$type": "fontWeight" }
    },
    "lineHeight": {
      "tight":  { "$value": 1.15, "$type": "number" },
      "snug":   { "$value": 1.25, "$type": "number" },
      "normal": { "$value": 1.5, "$type": "number" },
      "relaxed": { "$value": 1.625, "$type": "number" }
    },
    "letterSpacing": {
      "tight":  { "$value": "-0.025em", "$type": "dimension" },
      "normal": { "$value": "0", "$type": "dimension" },
      "wide":   { "$value": "0.025em", "$type": "dimension" }
    }
  },
  "spacing": {
    "0":  { "$value": "0", "$type": "dimension" },
    "px": { "$value": "1px", "$type": "dimension" },
    "0.5": { "$value": "0.125rem", "$type": "dimension" },
    "1":  { "$value": "0.25rem", "$type": "dimension" },
    "1.5": { "$value": "0.375rem", "$type": "dimension" },
    "2":  { "$value": "0.5rem", "$type": "dimension" },
    "3":  { "$value": "0.75rem", "$type": "dimension" },
    "4":  { "$value": "1rem", "$type": "dimension" },
    "5":  { "$value": "1.25rem", "$type": "dimension" },
    "6":  { "$value": "1.5rem", "$type": "dimension" },
    "8":  { "$value": "2rem", "$type": "dimension" },
    "10": { "$value": "2.5rem", "$type": "dimension" },
    "12": { "$value": "3rem", "$type": "dimension" },
    "16": { "$value": "4rem", "$type": "dimension" }
  },
  "borderRadius": {
    "none": { "$value": "0", "$type": "dimension" },
    "sm":   { "$value": "0.25rem", "$type": "dimension" },
    "md":   { "$value": "0.5rem", "$type": "dimension" },
    "lg":   { "$value": "0.75rem", "$type": "dimension" },
    "xl":   { "$value": "1rem", "$type": "dimension" },
    "2xl":  { "$value": "1.5rem", "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  },
  "shadow": {
    "xs":  { "$value": "0 1px 2px 0 oklch(0 0 0 / 0.05)", "$type": "shadow" },
    "sm":  { "$value": "0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)", "$type": "shadow" },
    "md":  { "$value": "0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)", "$type": "shadow" },
    "lg":  { "$value": "0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)", "$type": "shadow" },
    "xl":  { "$value": "0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1)", "$type": "shadow" }
  },
  "motion": {
    "duration": {
      "micro":  { "$value": "100ms", "$type": "duration" },
      "short":  { "$value": "200ms", "$type": "duration" },
      "medium": { "$value": "350ms", "$type": "duration" },
      "long":   { "$value": "500ms", "$type": "duration" }
    },
    "easing": {
      "enter": { "$value": "cubic-bezier(0.0, 0.0, 0.2, 1.0)", "$type": "cubicBezier" },
      "exit":  { "$value": "cubic-bezier(0.4, 0.0, 1.0, 1.0)", "$type": "cubicBezier" },
      "move":  { "$value": "cubic-bezier(0.4, 0.0, 0.2, 1.0)", "$type": "cubicBezier" }
    }
  }
}
```

All values above are **templates** — replace with actual computed values for the sector/mood.

### Step 12 — CSS Custom Properties (Copy-Paste Ready)

Output a **complete** CSS block. Light and dark themes via `[data-theme]` or `prefers-color-scheme`.

```css
/* ============================================================
   Style System — [Sector] / [Mood]
   Generated by Sumi /style
   ============================================================ */

:root {
  /* --- Color: Neutral --- */
  --color-neutral-50: oklch(0.985 0 0);
  --color-neutral-100: oklch(0.965 0 0);
  --color-neutral-200: oklch(0.925 0 0);
  --color-neutral-300: oklch(0.87 0 0);
  --color-neutral-400: oklch(0.71 0 0);
  --color-neutral-500: oklch(0.55 0 0);
  --color-neutral-600: oklch(0.445 0 0);
  --color-neutral-700: oklch(0.37 0 0);
  --color-neutral-800: oklch(0.27 0 0);
  --color-neutral-900: oklch(0.205 0 0);

  /* --- Color: Brand --- */
  --color-brand-50: oklch(...);
  --color-brand-100: oklch(...);
  /* ... full scale ... */
  --color-brand-900: oklch(...);

  /* --- Color: Secondary --- */
  --color-secondary-50: oklch(...);
  /* ... full scale ... */
  --color-secondary-900: oklch(...);

  /* --- Color: Semantic --- */
  --color-success: oklch(...);
  --color-success-light: oklch(...);
  --color-warning: oklch(...);
  --color-warning-light: oklch(...);
  --color-error: oklch(...);
  --color-error-light: oklch(...);
  --color-info: oklch(...);
  --color-info-light: oklch(...);

  /* --- Color: Semantic Aliases (Light Theme) --- */
  --color-bg-primary: var(--color-neutral-50);
  --color-bg-secondary: var(--color-neutral-100);
  --color-bg-tertiary: var(--color-neutral-200);
  --color-bg-brand: var(--color-brand-500);
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-tertiary: var(--color-neutral-500);
  --color-text-on-brand: var(--color-neutral-50);
  --color-border-default: var(--color-neutral-200);
  --color-border-strong: var(--color-neutral-300);
  --color-border-brand: var(--color-brand-500);

  /* --- Typography --- */
  --font-family-heading: '[Font]', [fallback];
  --font-family-body: '[Font]', [fallback];
  --font-family-mono: '[Font]', monospace;

  --font-size-xs: clamp(...);
  --font-size-sm: clamp(...);
  --font-size-base: clamp(...);
  --font-size-lg: clamp(...);
  --font-size-xl: clamp(...);
  --font-size-2xl: clamp(...);
  --font-size-3xl: clamp(...);
  --font-size-4xl: clamp(...);
  --font-size-5xl: clamp(...);

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.15;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;

  --prose-max-width: 65ch;

  /* --- Spacing --- */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem;
  --space-1: 0.25rem;
  --space-1-5: 0.375rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* --- Border Radius --- */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  --radius-default: var(--radius-md);  /* sector-tuned default */

  /* --- Shadows --- */
  --shadow-xs: 0 1px 2px 0 oklch(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1);

  /* --- Motion --- */
  --duration-micro: 100ms;
  --duration-short: 200ms;
  --duration-medium: 350ms;
  --duration-long: 500ms;
  --easing-enter: cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --easing-exit: cubic-bezier(0.4, 0.0, 1.0, 1.0);
  --easing-move: cubic-bezier(0.4, 0.0, 0.2, 1.0);
}

/* --- Dark Theme --- */
[data-theme="dark"],
.dark {
  --color-bg-primary: var(--color-neutral-900);
  --color-bg-secondary: var(--color-neutral-800);
  --color-bg-tertiary: var(--color-neutral-700);
  --color-text-primary: oklch(0.93 0 0);
  --color-text-secondary: var(--color-neutral-400);
  --color-text-tertiary: var(--color-neutral-500);
  --color-border-default: oklch(1 0 0 / 0.12);
  --color-border-strong: oklch(1 0 0 / 0.2);
  /* Brand colors shifted for dark mode */
  --color-bg-brand: var(--color-brand-400);
  --color-text-on-brand: var(--color-neutral-900);
  /* Shadows become borders in dark mode */
  --shadow-xs: 0 0 0 1px oklch(1 0 0 / 0.06);
  --shadow-sm: 0 0 0 1px oklch(1 0 0 / 0.08);
  --shadow-md: 0 0 0 1px oklch(1 0 0 / 0.1);
  --shadow-lg: 0 0 0 1px oklch(1 0 0 / 0.12);
  --shadow-xl: 0 0 0 1px oklch(1 0 0 / 0.14);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Same dark overrides as above */
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-micro: 0ms;
    --duration-short: 0ms;
    --duration-medium: 0ms;
    --duration-long: 0ms;
  }
}
```

All `(...)` placeholders are replaced with real computed values at generation time.

### Step 13 — Tailwind CSS Config Extension

```js
// tailwind.config.js — extend block
// Generated by Sumi /style
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  'oklch(... / <alpha-value>)',
          100: 'oklch(... / <alpha-value>)',
          // ... full scale
          900: 'oklch(... / <alpha-value>)',
        },
        secondary: {
          // ... full scale
        },
        neutral: {
          // ... full scale (override defaults)
        },
        success: 'oklch(...)',
        warning: 'oklch(...)',
        error:   'oklch(...)',
        info:    'oklch(...)',
      },
      fontFamily: {
        heading: ['[Font]', ...defaultTheme.fontFamily.sans],
        body:    ['[Font]', ...defaultTheme.fontFamily.sans],
        mono:    ['[Font]', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xs:   ['clamp(...)', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        sm:   ['clamp(...)', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        base: ['clamp(...)', { lineHeight: '1.5', letterSpacing: '0' }],
        lg:   ['clamp(...)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        xl:   ['clamp(...)', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        '2xl': ['clamp(...)', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '3xl': ['clamp(...)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        '4xl': ['clamp(...)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        '5xl': ['clamp(...)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',  // sector-tuned
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        xs:  '0 1px 2px 0 oklch(0 0 0 / 0.05)',
        sm:  '0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)',
        md:  '0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)',
        lg:  '0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)',
        xl:  '0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1)',
      },
      transitionDuration: {
        micro:  '100ms',
        short:  '200ms',
        medium: '350ms',
        long:   '500ms',
      },
      transitionTimingFunction: {
        enter: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
        exit:  'cubic-bezier(0.4, 0.0, 1.0, 1.0)',
        move:  'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
      },
    },
  },
}
```

### Step 14 — Save to `.sumi/style.json`

Persist everything decided above so `/palette`, `/type`, `/tokens`, `/screen`,
`/component`, `/page` and `/fix` consume it instead of inventing a second
palette mid-session.

Follow `design-memory` for the schema, ownership, and merge rules. `/style` owns
the whole file and is the only command that may create it. Write the envelope
(`meta`, `project`, `tone`, `references`) plus the full DTCG payload under
`tokens`.

---

## Output Format

```
## Style: [Sector] — [Sub-niche / Mood]

### Direction Summary
[2-3 sentences]

### Color Palette
[Full tables: neutral, brand, secondary, semantic, dark mode, accessible pairings]

### Typography
[Font pairing table, type scale with clamp() values, paragraph width]

### Spacing System
[Base grid, scale, component spacing conventions]

### Motion Language
[Personality, easing, durations, spring, signature interaction, reduced motion]

### Border Radius
[Scale with sector reasoning]

### Shadows & Elevation
[5-level scale, dark mode strategy]

### Tone of Voice
[Formality, traits, microcopy examples for every context]

### Reference Apps
[5-row table with steal-this and honest critiques]

### Inspiration Sources
[Curated per-platform search terms]

### Do's and Don'ts
[5 must-haves, 5 pitfalls]

### Design Tokens (W3C JSON)
[Complete JSON block]

### CSS Custom Properties
[Complete, copy-paste-ready CSS with light + dark themes]

### Tailwind Config
[Complete extend block]

### Saved
> Tokens saved to `.sumi/style.json` — available to `/palette`, `/type`, `/tokens`, `/screen`, `/component`
```

---

## Design Memory Persistence

`/style` is the only command that may create `.sumi/style.json`, and it owns the
whole file. Follow `design-memory` for the canonical schema, the read-modify-write
discipline, and the merge rules.

Write the decisions made above into the envelope:

- `meta.sector`, `meta.mood`, `meta.platform` — what was chosen and why it fits
- `project` — the detected framework, styling approach, and TypeScript flag
- `tokens.*` — the DTCG payload: color, typography, space, radius, shadow,
  duration, easing, z, and `$themes.dark` as deltas from light
- `tone` — formality, traits, words to use, words to avoid
- `references` — the apps studied, with what to steal from each

Then append one line to `.sumi/decisions.log` for any decision a later command
might reasonably want to override.

**Do not emit CSS, Tailwind, or Style Dictionary here.** `/tokens` owns
serialization and reads `.sumi/style.json` as its input. Emitting them in both
places is how the two files drift apart.

`.sumi/context.json` is retired — its `project` block now lives in
`style.json`, and its decision array is `decisions.log`.


## Cross-References

When generating style directions, draw sector knowledge and design system patterns from:
- `sector-style-intelligence` skill for sector-specific color, typography, and motion conventions
- `ui-visual-design-system` skill for color theory, typography scales, visual hierarchy
- `visual-design-mastery` skill for canonical design rules and visual scoring
- `design-systems-architecture` skill for token architecture and naming conventions
- `interaction-motion-design` skill for animation curves, spring physics, duration guidelines
- `platform-visual-standards` skill for iOS 26 Liquid Glass and Material 3 sector adaptations
- `color-palette-library` skill for curated palette references and APCA scoring
- `typography-pairing-recipes` skill for font pairing validation and type scale recipes
- `shadow-elevation-density` skill for shadow scales and density mode conventions
- `mobile-ux-design` skill for platform-specific typography and spacing norms
- `cross-cultural-i18n-ux` skill for culturally appropriate color and typography choices
- `ux-ethics-content-strategy` skill for tone of voice guidelines
- `design-token-presets` skill for industry-specific token presets as starting accelerators
- `screen-flow-patterns` skill for element-level and flow-level pattern references
- `ui-pattern-intelligence` skill for 200+ pattern benchmarks and anti-pattern encyclopedia

## Next Step

**Next** -> `/palette` — Deep-dive color system with APCA scores and data-viz palettes
**Or** -> `/type` — Deep-dive typography with fluid scaling and platform stacks
**Or** -> `/tokens` — Generate production W3C token files from your style
**Or** -> `/screen` — Build screens using your new style system