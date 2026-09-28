---
name: page
description: "Full page builder — generate complete, runnable marketing and product pages with ordered block stacking, SEO, Open Graph, scroll animations, lazy loading, and responsive composition."
argument-hint: "[page type and purpose]"
---

# Page — Full Page Composition Builder

## Before running

This command needs a page type and its purpose.

If the user invoked it with nothing and no target is evident from the conversation or open files, ask for it in one plain-language question and stop. Do not invent a target and do not produce generic output in place of the real work — output about something imaginary reads as authoritative and is worthless.

If a target is evident from context, use it and say which one you picked.


Generate a complete, production-ready, RUNNABLE full page composed of ordered content blocks. Output is React/TypeScript + Tailwind CSS (shadcn/ui foundation) with SEO meta, Open Graph tags, scroll behavior, lazy loading, code splitting hints, and responsive composition. No placeholders, no TODOs — deploy-ready.

## Supported Page Types (12+)

| Category | Page Types |
|----------|-----------|
| SaaS | SaaS Landing, Feature Tour, Changelog, Status Page |
| Startup | Startup Launch, Coming Soon, Waitlist, Product Hunt Launch |
| Commerce | E-commerce Product, Category, Store Home |
| Agency | Agency Portfolio, Case Study, Services |
| Enterprise | Enterprise B2B, Platform Overview, Security/Compliance |
| Content | Blog/Article, Documentation, Knowledge Base |
| Event | Event/Conference, Webinar, Workshop |
| Pricing | Pricing Page, Comparison, Plan Selector |
| Mobile App | App Landing (iOS/Android), App Download |
| Personal | Personal Portfolio, Resume/CV, Link-in-Bio |

## Block Library (25+ Composable Blocks)

Every page is composed from an ordered sequence of blocks. Each block is a self-contained React component with its own responsive CSS.

| Block | Purpose | Common Position |
|-------|---------|----------------|
| **AnnouncementBar** | Top banner for promos, launches, alerts | 1st (sticky top) |
| **NavBar** | Primary navigation with logo, links, CTA | 1st-2nd (sticky) |
| **Hero** | Primary value proposition, headline, CTA | 2nd-3rd |
| **LogoCloud** | Trust bar with partner/client logos | After Hero |
| **Features** | Feature grid/list with icons and descriptions | Mid-page |
| **FeatureShowcase** | Large feature spotlight with image/demo | Mid-page |
| **HowItWorks** | Step-by-step process explanation | Mid-page |
| **Benefits** | Benefit-oriented cards with metrics | Mid-page |
| **SocialProof** | Testimonials, reviews, case study quotes | Mid-page |
| **Stats** | Key metrics (users, revenue, uptime, etc.) | Mid-page |
| **Pricing** | Plan cards with feature comparison | Mid-lower |
| **PricingComparison** | Detailed feature comparison table | After Pricing |
| **FAQ** | Frequently asked questions accordion | Lower |
| **CTA** | Call-to-action section with headline + button | Lower |
| **Newsletter** | Email signup form | Lower |
| **Team** | Team member grid with photos/roles | Lower |
| **Timeline** | Company history or product roadmap | Lower |
| **Integrations** | Integration/partner logo grid with links | Lower |
| **Download** | App download buttons (App Store, Play Store) | Lower |
| **Comparison** | Us vs. Them comparison table | Mid-lower |
| **VideoSection** | Embedded video with play button overlay | Anywhere |
| **ImageGallery** | Masonry or grid image gallery | Anywhere |
| **BlogPreview** | Latest blog posts grid | Lower |
| **ContactForm** | Contact form with fields and submit | Lower |
| **Footer** | Links, legal, social, copyright | Last |

## Builder Protocol

### Step 1 — Gather Context

**Required input:**
- Page type (e.g., "SaaS landing," "pricing page," "agency portfolio")

**Reference Board:** if `.sumi/refs/board.json` exists (from `/inspo`), build against it. Its `direction` (type, color, rhythm, shape, motion) fills any gap `.sumi/style.json` leaves, and nothing on its `avoid` list may appear. Name the board trait each major section implements.

**Optional inputs (with defaults):**
- Sector: neutral (SaaS, fintech, healthcare, e-commerce, creative, etc.)
- Brand name: "Acme" (used in placeholder content)
- Primary CTA: "Get Started" (used across hero, CTA blocks, nav)
- Color direction: neutral (or consume from `.sumi/style.json`, then `.sumi/refs/board.json`)
- Tone: professional (professional, playful, bold, minimal, premium)
- Content density: moderate (sparse, moderate, dense)

**Auto-resolve:**
- Prior Sumi outputs: Consume `/style` (design direction), `/inspo` (Reference Board), `/palette` (colors), `/type` (typography) if available
- Block order: Determined by page type (see Page Composition Recipes below)
- Section spacing rhythm: Consistent vertical rhythm based on content density

### Step 2 — Select Block Composition Recipe

Each page type has a recommended block stacking order. The recipe defines which blocks appear and in what order.

#### SaaS Landing Page
```
NavBar (sticky)
Hero (gradient bg, headline + subtitle + CTA + product screenshot)
LogoCloud (trusted by)
Features (3-column grid)
FeatureShowcase (alternating left/right image + text, 2-3 sections)
SocialProof (testimonial carousel or grid)
Stats (4 key metrics)
Pricing (3 plans)
FAQ (6-8 questions)
CTA (final conversion push)
Footer
```

#### Startup Launch Page
```
AnnouncementBar (launch announcement)
NavBar (minimal)
Hero (bold headline + waitlist form or CTA)
LogoCloud (backed by / featured in)
HowItWorks (3 steps)
Features (key differentiators)
SocialProof (early user quotes)
CTA (join waitlist or get early access)
Footer (minimal)
```

#### Enterprise B2B Page
```
NavBar (with mega menu)
Hero (enterprise headline + demo CTA + trust badges)
LogoCloud (enterprise client logos)
Stats (scale metrics: users, uptime, compliance)
Features (capability grid)
FeatureShowcase (platform deep dives)
Comparison (vs. competitors table)
SocialProof (case study quotes with company logos)
Integrations (integration partner grid)
Pricing (contact sales emphasis)
FAQ
CTA (book a demo)
Footer (comprehensive with compliance links)
```

#### E-commerce Product Page
```
NavBar (with cart, search, categories)
Hero (product hero with image gallery + price + add-to-cart)
Features (product specs grid)
SocialProof (customer reviews)
ImageGallery (product photos)
Benefits (why this product)
FAQ (product-specific)
CTA (add to cart / buy now)
BlogPreview (related products)
Footer
```

#### Agency Portfolio Page
```
NavBar (minimal, elegant)
Hero (agency name + tagline + showreel or hero image)
LogoCloud (client logos)
FeatureShowcase (case study highlights, 3 projects)
Stats (projects delivered, clients, awards)
Team (team grid)
SocialProof (client testimonials)
CTA (start a project)
Footer
```

#### Pricing Page
```
NavBar
Hero (simple: "Simple, transparent pricing")
Pricing (3 plans with toggle monthly/annual)
PricingComparison (detailed feature table)
FAQ (pricing-specific)
SocialProof (customer quotes about value)
CTA (get started)
Footer
```

#### Blog/Article Page
```
NavBar
Hero (article title + author + date + cover image)
[Article Content — prose with responsive typography]
Newsletter (subscribe inline)
BlogPreview (related articles)
Footer
```

#### Event Page
```
AnnouncementBar (dates + countdown)
NavBar
Hero (event name + date + location + register CTA)
Stats (speakers, attendees, sessions)
Features (agenda highlights)
Team (speaker grid)
Pricing (ticket tiers)
FAQ (event logistics)
CTA (register now)
Footer
```

#### Documentation Page
```
NavBar (with search)
[Sidebar Navigation]
[Documentation Content — MDX-style with code blocks]
[On-page TOC sidebar]
Footer (minimal)
```

#### App Landing Page
```
NavBar (minimal)
Hero (phone mockup + headline + download buttons)
Features (app feature grid with icons)
FeatureShowcase (screenshot carousel)
SocialProof (app store reviews)
Stats (downloads, rating, users)
Download (App Store + Play Store buttons)
FAQ
Footer
```

### Step 3 — Section Spacing Rhythm

Consistent vertical rhythm between blocks creates visual coherence:

```typescript
// Section spacing system
const SECTION_SPACING = {
  sparse: 'py-24 md:py-32 lg:py-40',   // Luxury, premium, minimal
  moderate: 'py-16 md:py-24 lg:py-32',  // Default — most pages
  dense: 'py-12 md:py-16 lg:py-24',     // Content-heavy, documentation
} as const;

// Between-section dividers (optional)
const SECTION_DIVIDER = {
  none: '',
  subtle: 'border-t border-gray-100 dark:border-gray-800',
  gradient: 'bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950',
  alternating: 'even:bg-gray-50 dark:even:bg-gray-900/50', // alternating bg
} as const;

// Container widths per block type
const CONTAINER = {
  narrow: 'max-w-2xl mx-auto px-4 sm:px-6',      // Text-heavy (hero subtitle, FAQ)
  default: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8', // Most blocks
  wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',    // Feature grids, pricing
  full: 'w-full px-4 sm:px-6 lg:px-8',                // Logo clouds, full-bleed
} as const;
```

### Step 4 — Generate Production Code

The code output MUST be:
- **Runnable**: Complete imports, no placeholders, no TODOs
- **React 18+ / TypeScript**: Functional components, typed props
- **Tailwind CSS**: shadcn/ui as foundation, Tailwind for layout and utility
- **Mobile-first**: Base styles for 375px, then `sm:`, `md:`, `lg:`, `xl:`
- **Dark mode**: `dark:` class strategy throughout
- **Accessible**: Semantic HTML, ARIA where needed, keyboard navigable
- **Performant**: Lazy loading images, code splitting hints, font loading strategy

#### 4a — Page Shell and Meta

```typescript
import type { Metadata } from 'next';

// SEO Meta Tags
export const metadata: Metadata = {
  title: '[Page Title] | [Brand]',
  description: '[155-character meta description with primary keyword]',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  authors: [{ name: '[Brand]' }],
  openGraph: {
    title: '[Page Title] | [Brand]',
    description: '[Meta description]',
    url: 'https://[domain]/[path]',
    siteName: '[Brand]',
    images: [
      {
        url: 'https://[domain]/og-image.png',
        width: 1200,
        height: 630,
        alt: '[Descriptive alt text for OG image]',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Page Title]',
    description: '[Meta description]',
    images: ['https://[domain]/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage', // or Product, Organization, Event, Article, etc.
  name: '[Page Title]',
  description: '[Description]',
  url: 'https://[domain]/[path]',
};
```

#### 4b — Page Component

```typescript
import { lazy, Suspense } from 'react';

// Eagerly load above-the-fold blocks
import { NavBar } from './blocks/nav-bar';
import { Hero } from './blocks/hero';
import { LogoCloud } from './blocks/logo-cloud';

// Lazy load below-the-fold blocks for performance
const Features = lazy(() => import('./blocks/features'));
const FeatureShowcase = lazy(() => import('./blocks/feature-showcase'));
const SocialProof = lazy(() => import('./blocks/social-proof'));
const Stats = lazy(() => import('./blocks/stats'));
const Pricing = lazy(() => import('./blocks/pricing'));
const FAQ = lazy(() => import('./blocks/faq'));
const CTA = lazy(() => import('./blocks/cta'));
const Footer = lazy(() => import('./blocks/footer'));

// Block loading fallback
function BlockSkeleton() {
  return (
    <div className="py-16 md:py-24" aria-busy="true" aria-label="Loading section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function [PageType]Page() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>

      {/* Above the fold — eagerly loaded */}
      <NavBar />
      <main id="main-content">
        <Hero />
        <LogoCloud />

        {/* Below the fold — lazy loaded */}
        <Suspense fallback={<BlockSkeleton />}>
          <Features />
        </Suspense>
        <Suspense fallback={<BlockSkeleton />}>
          <FeatureShowcase />
        </Suspense>
        <Suspense fallback={<BlockSkeleton />}>
          <SocialProof />
        </Suspense>
        <Suspense fallback={<BlockSkeleton />}>
          <Stats />
        </Suspense>
        <Suspense fallback={<BlockSkeleton />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<BlockSkeleton />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<BlockSkeleton />}>
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={<BlockSkeleton />}>
        <Footer />
      </Suspense>
    </>
  );
}
```

#### 4c — Individual Block Components

Each block is a self-contained component. Every block MUST include:

1. **Section element** with `id` for anchor linking
2. **Responsive layout** (mobile-first Tailwind)
3. **Dark mode** via `dark:` prefix
4. **ARIA landmarks** where appropriate
5. **Lazy-loaded images** with `loading="lazy"` and explicit `width`/`height`
6. **Motion** with `motion-safe:` prefix

**Block template pattern:**

```typescript
interface [Block]Props {
  // Typed props for content customization
}

export function [Block]({ ...props }: [Block]Props) {
  return (
    <section
      id="[block-id]"
      className="py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950"
      aria-labelledby="[block-id]-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
            [Eyebrow]
          </p>
          <h2
            id="[block-id]-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            [Heading]
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            [Subheading]
          </p>
        </div>

        {/* Section content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Block-specific content */}
        </div>
      </div>
    </section>
  );
}

export default [Block];
```

### Step 5 — Scroll Behavior

Define scroll interactions for the page:

```typescript
// Sticky navigation
// NavBar: sticky top-0 z-50 with backdrop-blur on scroll
// Detect scroll position for nav background transition:
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

// Smooth scroll for anchor links
// html { scroll-behavior: smooth; scroll-padding-top: 80px; }
// @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

// Scroll-to-top button (appears after 2 viewport heights)
// Intersection Observer for scroll-driven animations on blocks

// Scroll-driven entrance animations
// Each block fades in + slides up on viewport entry
const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};
```

### Step 6 — Performance Requirements

Every page MUST include:

1. **Image optimization**:
   - `loading="lazy"` on all images below the fold
   - Explicit `width` and `height` attributes to prevent CLS
   - `<picture>` with WebP/AVIF sources where appropriate
   - `priority` prop on hero image (Next.js Image component)
   - `decoding="async"` on non-critical images

2. **Code splitting**:
   - Above-the-fold blocks eagerly imported
   - Below-the-fold blocks lazy loaded with `React.lazy()` + `Suspense`
   - Heavy libraries (chart libs, animation libs) dynamically imported

3. **Font loading**:
   - `font-display: swap` in @font-face
   - Preload critical fonts: `<link rel="preload" as="font" crossorigin>`
   - System font fallback stack in CSS

4. **CSS**:
   - Tailwind purges unused styles in production
   - No render-blocking CSS for below-fold content
   - `contain: content` on independent sections for layout containment

5. **Core Web Vitals targets**:
   - LCP < 2.5s (hero image/text renders fast)
   - FID < 100ms (no heavy JS blocking main thread)
   - CLS < 0.1 (all images have dimensions, fonts don't shift layout)

### Step 7 — SEO and Meta

Every page MUST include:

```html
<!-- Essential Meta -->
<title>[Page Title] | [Brand]</title>
<meta name="description" content="[155 chars max, includes primary keyword]" />
<link rel="canonical" href="https://[domain]/[path]" />

<!-- Open Graph -->
<meta property="og:title" content="[Title]" />
<meta property="og:description" content="[Description]" />
<meta property="og:image" content="https://[domain]/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://[domain]/[path]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="[Brand]" />
<meta property="og:locale" content="en_US" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Title]" />
<meta name="twitter:description" content="[Description]" />
<meta name="twitter:image" content="https://[domain]/og-image.png" />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[Title]",
  "description": "[Description]",
  "url": "https://[domain]/[path]"
}
</script>

<!-- Semantic heading structure -->
<!-- h1: One per page (hero headline) -->
<!-- h2: Section headings (Features, Pricing, FAQ, etc.) -->
<!-- h3: Subsection headings within blocks -->
```

### Step 8 — Accessibility

Every page MUST include:

1. **Skip link**: First focusable element — "Skip to main content"
2. **Landmark regions**: `<header>` (nav), `<main>`, `<footer>`, `<section>` with `aria-labelledby`
3. **One h1 per page**: The hero headline
4. **Heading hierarchy**: h1 -> h2 (sections) -> h3 (subsections), no skips
5. **Link purpose**: All links have descriptive text (never "click here")
6. **Image alt text**: All images have meaningful alt (or `alt=""` if decorative)
7. **Form labels**: All form inputs have associated `<label>` elements
8. **Focus order**: Logical top-to-bottom, left-to-right tab order
9. **Color contrast**: 4.5:1 text, 3:1 UI components
10. **Motion**: All animations respect `prefers-reduced-motion`
11. **Keyboard**: All interactive elements reachable and operable via keyboard

## Output Format

When invoked, produce the following structure:

```
## Page Build: [Page Type] — [Sector if specified]

### Page Composition Recipe
| Order | Block | Purpose |
|-------|-------|---------|
| 1 | NavBar | Primary navigation (sticky) |
| 2 | Hero | Value proposition + CTA |
| 3 | LogoCloud | Social proof / trust |
| ... | ... | ... |
| N | Footer | Links, legal, copyright |

### Spacing Rhythm
- **Section padding**: [sparse/moderate/dense] — [actual Tailwind classes]
- **Container width**: [max-w class]
- **Section divider strategy**: [none/subtle/alternating]

### SEO Meta
[Complete meta tags, OG tags, JSON-LD]

### Production Code

#### page.tsx (page shell)
[Complete page component with lazy loading, Suspense, skip link, JSON-LD]

#### blocks/nav-bar.tsx
[Full NavBar block — sticky, responsive hamburger on mobile, dark mode]

#### blocks/hero.tsx
[Full Hero block — headline, subtitle, CTA, image/illustration, responsive]

#### blocks/[block-name].tsx (one per block in recipe)
[Each block as a complete, self-contained component]
[Every block: responsive, dark mode, accessible, lazy-load images]

#### blocks/footer.tsx
[Full Footer — links, legal, social icons, copyright year]

### Responsive Behavior
| Breakpoint | Layout Changes |
|------------|---------------|
| Base (mobile) | Single column, stacked blocks, hamburger nav |
| sm (640px) | 2-column grids where appropriate |
| md (768px) | Full nav visible, wider containers |
| lg (1024px) | 3-column grids, side-by-side showcases |
| xl (1280px) | Max-width container, comfortable spacing |

### Scroll Behavior
- **NavBar**: [sticky behavior, bg transition on scroll]
- **Block entrance**: [scroll-driven fade-in animations]
- **Smooth scroll**: [anchor link behavior]
- **Scroll-to-top**: [button appears after 2vh]

### Performance Checklist
- [ ] Hero image has priority loading
- [ ] Below-fold blocks are lazy loaded (React.lazy)
- [ ] All images have explicit width/height (no CLS)
- [ ] Below-fold images use loading="lazy"
- [ ] Fonts use font-display: swap
- [ ] Critical fonts are preloaded
- [ ] CSS is purged (Tailwind production build)
- [ ] LCP target < 2.5s
- [ ] CLS target < 0.1

### Accessibility Checklist
- [ ] Skip link as first focusable element
- [ ] One h1 (hero headline)
- [ ] Heading hierarchy h1 -> h2 -> h3, no skips
- [ ] All sections have aria-labelledby
- [ ] All images have meaningful alt text
- [ ] All form inputs have labels
- [ ] Color contrast >= 4.5:1 text, >= 3:1 UI
- [ ] All animations respect prefers-reduced-motion
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus order is logical

### Design Token Dependencies
| Token | Usage | Light | Dark |
|-------|-------|-------|------|
| [tokens consumed by this page] |

### Prior Output Integration
- **`/style` consumed**: [Yes/No — what was used]
- **`/style` consumed**: [Yes/No — what was used]
- **`/palette` consumed**: [Yes/No — what was used]
- **`/type` consumed**: [Yes/No — what was used]
- **Missing context**: [what would improve this]
```

## Multi-Pass Generation Strategy

Full pages often exceed what a single Claude response can produce. Use the multi-pass strategy to guarantee complete, runnable output with zero truncation.

### Pass Architecture

| Pass | Focus | Blocks Generated |
|------|-------|-----------------|
| **Pass 1: Scaffold** | Page shell, meta, imports, types, layout wrapper | `page.tsx` shell with metadata, layout component with section slots, shared types, utility imports |
| **Pass 2: Above the Fold** | Everything visible without scrolling | `AnnouncementBar`, `NavBar`, `Hero`, `LogoCloud` — the first impression |
| **Pass 3: Mid-Page** | Value communication sections | `Features`, `FeatureShowcase`, `HowItWorks`, `Benefits`, `SocialProof`, `Stats` |
| **Pass 4: Conversion** | Decision and action sections | `Pricing`, `PricingComparison`, `FAQ`, `Comparison`, `CTA`, `Newsletter` |
| **Pass 5: Footer + Assembly** | Footer, final assembly, scroll behavior | `Footer`, scroll-to-top, smooth scroll init, final page assembly |

### Generation Rules

1. **Always attempt Pass 1 + Pass 2 in the first response** — the user should see a runnable page immediately
2. **If approaching the token limit mid-section**, stop cleanly at the end of the current block component and output:
   > **Sumi checkpoint** — Passes 1-2 complete (scaffold + above-fold). Run `/page --continue` to generate mid-page and conversion sections.
3. **Each pass produces self-contained, runnable code** — the page works after every pass, just with fewer sections
4. **Pass imports are additive** — later passes add `import` statements but never modify earlier components
5. **The final pass wires everything together** — assembles all section components into the page layout in the correct stacking order

### `/page --continue` Behavior

When the user runs `/page --continue`:
1. Review what was generated in previous passes
2. Identify the next ungenerated pass
3. Generate that pass's blocks as complete components
4. If all passes are complete, output the final assembly and quality checklist

### Single-Response Optimization

For simpler pages (< 8 blocks), attempt all passes in a single response:
- Coming Soon, Waitlist, Link-in-Bio: 1 pass (always fits)
- Blog/Article, Documentation: 2 passes
- SaaS Landing, Pricing: 3-4 passes
- Enterprise B2B, Agency Portfolio: 4-5 passes

---

## Cross-References

When building pages, draw patterns and best practices from:
- `layout-block-intelligence` — 500+ block patterns (hero, features, pricing, CTA, testimonials)
- `page-composition-engine` — 100+ page recipes with block stacking order and visual rhythm
- `conversion-optimization-patterns` — CRO: CTA psychology, pricing pages, form conversion, trust signals
- `micro-copy-intelligence` — Microcopy templates for buttons, headings, CTAs, empty states
- `component-patterns-code` — React/TypeScript patterns, modern CSS, accessible implementations
- `responsive-block-patterns` — Cross-breakpoint transformation, container queries, fluid scaling
- `visual-design-mastery` — Composition rules, visual scoring, color/typography mastery
- `typography-pairing-recipes` — Font pairings, type scales, fluid typography
- `color-palette-library` — Curated palettes, APCA scores, dark mode mapping
- `animation-recipe-library` — Scroll animations, entrance animations, micro-interactions
- `image-media-patterns` — Image optimization, galleries, media patterns
- `shadow-elevation-density` — Shadow scales, elevation hierarchy
- `accessibility-inclusive-design` — WCAG compliance, ARIA, focus management
- `sector-style-intelligence` — Sector conventions, trust signals, density norms
- `design-token-presets` — Ready-to-deploy token systems by industry
- `navigation-pattern-encyclopedia` — Nav patterns for page headers
- `icon-illustration-systems` — Icon libraries, illustration guides
- `platform-visual-standards` — Modern CSS 2025-2026

## Next Step

**Next** -> `/tokens` — Extract and formalize your design tokens into a system

**Alternatives**:
- `/screen` — Build individual screens (app screens vs. marketing pages)
- `/component` — Build individual reusable components
- `/responsive` — Deep-dive responsive behavior and breakpoint testing
- `/roast` — Jump to REVIEW to critique your page
- `/sumi` — See the full command list
