---
name: screen
description: "Production screen builder — generate complete, runnable React/TypeScript + Tailwind screens for 30+ screen types with all states, accessibility, responsive breakpoints, dark mode, and token consumption."
argument-hint: "[screen type and requirements]"
---

# Screen — Production Screen Builder

## Before running

This command needs a screen type and its requirements.

If the user invoked it with nothing and no target is evident from the conversation or open files, ask for it in one plain-language question and stop. Do not invent a target and do not produce generic output in place of the real work — output about something imaginary reads as authoritative and is worthless.

If a target is evident from context, use it and say which one you picked.


Generate a complete, production-ready, RUNNABLE screen for any standard screen type. Output is React/TypeScript + Tailwind CSS (shadcn/ui foundation) with every state handled, full ARIA, responsive breakpoints, dark mode, and design token consumption. No placeholders, no TODOs — copy-paste and run.

## Supported Screen Types (30+)

| Category | Screen Types |
|----------|-------------|
| Onboarding | Welcome, Get Started, Permissions, Tutorial, Value Prop |
| Auth | Login, Signup, Password Reset, MFA/2FA, Account Recovery, Magic Link |
| Core | Home, Dashboard, Feed/List, Search Results, Notifications, Analytics |
| Profile | My Account, Edit Profile, Settings, Preferences, Privacy |
| Commerce | Product Listing (PLP), Product Detail (PDP), Cart, Checkout, Order Confirmation, Order Tracking |
| Content | Article/Detail, Media Viewer, Gallery, Comments, Editor, Blog Post |
| Social | Chat/Messaging, Activity Feed, User Profile (public), Contacts |
| Utility | Error (404/500), Empty State, Loading, Offline, Maintenance |
| SaaS | Pricing, Landing Page, Feature Comparison, Billing/Subscription, Team Management |
| Calendar | Calendar (month/week/day), Event Detail, Scheduling, Booking |

## Builder Protocol

### Step 1 — Gather Context

Before generating anything, resolve the full picture:

**Required input:**
- Screen type (e.g., "dashboard," "checkout," "settings")

**Optional inputs (with defaults):**
- Sector: neutral (fintech, healthcare, e-commerce, SaaS, media, education, etc.)
- Platform: web/React (default) — iOS/SwiftUI or Android noted if requested
- Design system: neutral tokens unless `.sumi/style.json` is detected
- User sophistication: intermediate (novice, intermediate, expert)
- Accessibility tier: WCAG AA (default) or AAA
- Dark mode: yes (default)

**Auto-resolve:**
- Primary user task: What is the ONE thing the user must accomplish on this screen?
- Cognitive load budget: Apply Miller's Law — each screen region gets 4-7 chunks max
- Prior Sumi outputs: Check for `/style` (style direction), `/inspo` (sourced references in `.sumi/refs/board.json` and `mobbin.json`), `/benchmark` (competitive gaps). Consume if available; use neutral defaults and note what is missing if not
- Sector conventions: A fintech checkout differs from a food-delivery checkout in trust signals, data density, and regulatory constraints

### Step 2 — Research the Screen Type

Identify what makes a great implementation of this screen type:

1. **Reference apps**: Name 3 applications known for excellent implementations
2. **Key principles** (3-5): Cite the specific source skill for each:
   - Cognitive principles from `cognitive-psychology-ux` (Fitts, Hick, Miller, Von Restorff, Peak-End)
   - Heuristic principles from `nng-ux-heuristics` (H1-H10)
   - Sector conventions from `sector-style-intelligence` (trust signals, density norms, regulatory patterns)
3. **Must-have elements**: Document the non-negotiable elements for this screen type (e.g., checkout requires order summary, trust signals, progress indicator, payment selector, error recovery)
4. **Common pitfalls and anti-patterns**: What to avoid
5. **Cognitive load budget per region**: Assign each major region (header, main, sidebar, footer/action bar) a max chunk count

### Step 3 — Heuristic and Principle Mapping

Map every major screen element to the UX principle that justifies it. No element without a reason.

| Screen Element | Principle | Application |
|----------------|-----------|-------------|
| Navigation/wayfinding | H6 (Recognition > Recall) | Show current location, provide visible paths |
| Progress indicators | H1 (Visibility of System Status) | Always show where user is in multi-step flows |
| Destructive actions | Fitts's Law + H5 (Error Prevention) | Make destructive targets smaller/distant; require confirmation |
| Content grouping | Gestalt Proximity + Similarity | Group related items visually; separate unrelated with whitespace |
| Empty states | Peak-End Rule (Kahneman) | First/last impressions — make them helpful and encouraging |
| Information density | Miller's Law (4-7 chunks) | Respect cognitive budget per region; chunk and progressively disclose |
| Primary CTA | Von Restorff Effect | Primary action must be the most visually distinct element |
| Error messages | H9 (Help Users Recover) | Specific, constructive, actionable — never just "Error" |
| Loading feedback | Doherty Threshold (<400ms) | Instant feel; skeleton for anything >400ms |

**Sector integration** (if sector context exists, apply `sector-style-intelligence`):
- Fintech: elevated trust signals (security badges, encryption copy, regulatory logos)
- Healthcare: high contrast, simple language, clear data hierarchy, HIPAA-compliant patterns
- E-commerce: social proof, frictionless CTA path, urgency cues (only if ethical)
- SaaS: higher information density tolerance for expert users; density controls

### Step 4 — Define Component Hierarchy

Map the screen into a tree:

```
[ScreenName]Page
├── Header (sticky)
│   ├── Logo / BackButton
│   ├── PageTitle / Breadcrumb
│   ├── SearchBar (if applicable)
│   └── ActionMenu / UserAvatar
├── Main Content
│   ├── [SectionComponent]
│   │   ├── [ChildComponent]
│   │   └── [ChildComponent]
│   └── [SectionComponent]
├── Sidebar (if applicable)
│   └── [FilterPanel / Navigation / Widgets]
└── Footer / BottomActionBar
    └── PrimaryCTA / NavigationTabs
```

For each component: name, purpose, data requirements, props, events emitted.

### Step 5 — Generate State Matrix

Every screen MUST handle all of these states explicitly:

| State | Description | Visual Treatment |
|-------|-------------|-----------------|
| Loading | Data being fetched | Skeleton screens matching populated layout exactly |
| Empty | No data (first run, no results) | Illustration + explanation + CTA to populate |
| Populated | Normal state with data | Full component rendering |
| Error | Fetch or action failed | Contextual error with specific recovery action |
| Partial | Some data loaded, some failed | Graceful degradation — show what loaded, error badge on failed |
| Offline | No network | Cached data if available + offline indicator bar |
| Updating | User action processing | Optimistic UI or inline spinner; never freeze the screen |

### Step 6 — Generate Production Code

The code output MUST be:
- **Runnable**: Complete imports, no placeholders, no TODOs
- **React 18+ / TypeScript**: Functional components, typed props, proper hooks
- **Tailwind CSS**: shadcn/ui as the component foundation
- **Mobile-first**: Base styles for 375px, then `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **Dark mode**: `dark:` class strategy throughout
- **Accessible**: Full ARIA, keyboard navigation, focus management
- **Token-aware**: References CSS custom properties for theming

#### 6a — TypeScript Interfaces

Define ALL types before any component code:

```typescript
// Types for [ScreenName]

interface [ScreenName]Props {
  // All props with JSDoc comments
}

interface [ScreenName]Data {
  // The data shape this screen displays
}

type [ScreenName]State = 'loading' | 'empty' | 'populated' | 'error' | 'partial' | 'offline' | 'updating';

interface [ScreenName]Error {
  code: string;
  message: string;
  recovery?: {
    label: string;
    action: () => void;
  };
}
```

#### 6b — Custom Hooks

Extract data fetching and state management into custom hooks:

```typescript
function use[ScreenName]Data(params: Params) {
  // Returns: { data, state, error, refetch, isOffline }
}
```

#### 6c — Main Screen Component

```typescript
export function [ScreenName]Screen({ ...props }: [ScreenName]Props) {
  const { data, state, error, refetch, isOffline } = use[ScreenName]Data(props);

  // State rendering with explicit switch/match
  if (state === 'loading') return <[ScreenName]Skeleton />;
  if (state === 'empty') return <[ScreenName]Empty onAction={...} />;
  if (state === 'error') return <[ScreenName]Error error={error} onRetry={refetch} />;

  return (
    // Full populated screen with all sections
    // Mobile-first Tailwind
    // Dark mode classes
    // ARIA landmarks, roles, labels
    // Keyboard navigation handlers
  );
}
```

#### 6d — Skeleton Component

A dedicated skeleton that matches the populated layout exactly:

```typescript
export function [ScreenName]Skeleton() {
  return (
    // Animated skeleton matching the exact layout of the populated state
    // Uses animate-pulse on Tailwind
    // Proper ARIA: aria-busy="true", aria-label="Loading [screen name]"
  );
}
```

#### 6e — Empty State Component

```typescript
export function [ScreenName]Empty({ onAction }: { onAction: () => void }) {
  return (
    // Illustration placeholder (SVG or icon)
    // Helpful heading + description
    // CTA button to populate
    // Proper ARIA
  );
}
```

#### 6f — Error State Component

```typescript
export function [ScreenName]Error({ error, onRetry }: { error: [ScreenName]Error; onRetry: () => void }) {
  return (
    // Error icon
    // Specific error message (not generic)
    // Recovery action button
    // "Contact support" fallback link
  );
}
```

### Step 7 — Responsive Breakpoints

Use real Tailwind breakpoints, not abstract descriptions:

| Breakpoint | Width | Layout Adaptation |
|------------|-------|-------------------|
| Base (mobile) | 0-639px | Single column, stacked sections, bottom action bar |
| `sm` | 640px+ | Slight spacing increase, 2-column where appropriate |
| `md` | 768px+ | Sidebar appears (if applicable), wider content area |
| `lg` | 1024px+ | Full desktop layout, multi-column grids |
| `xl` | 1280px+ | Max-width container, comfortable spacing |
| `2xl` | 1536px+ | Large desktop, optional density increase |

Every layout shift must be defined in the code with actual Tailwind classes.

### Step 8 — Design Token Consumption

If `.sumi/style.json` exists, consume it; `.sumi/refs/board.json` fills anything it leaves open. Otherwise, provide a default token map:

```css
:root {
  /* Surface */
  --color-surface-primary: theme('colors.white');
  --color-surface-secondary: theme('colors.gray.50');
  --color-surface-elevated: theme('colors.white');

  /* Text */
  --color-text-primary: theme('colors.gray.900');
  --color-text-secondary: theme('colors.gray.600');
  --color-text-tertiary: theme('colors.gray.400');

  /* Action */
  --color-action-primary: theme('colors.blue.600');
  --color-action-primary-hover: theme('colors.blue.700');

  /* Feedback */
  --color-feedback-error: theme('colors.red.600');
  --color-feedback-success: theme('colors.green.600');
  --color-feedback-warning: theme('colors.amber.600');

  /* Spacing rhythm */
  --space-section: theme('spacing.16');
  --space-component: theme('spacing.6');
  --space-element: theme('spacing.3');

  /* Radius */
  --radius-sm: theme('borderRadius.md');
  --radius-md: theme('borderRadius.lg');
  --radius-lg: theme('borderRadius.xl');

  /* Shadow */
  --shadow-sm: theme('boxShadow.sm');
  --shadow-md: theme('boxShadow.md');
  --shadow-lg: theme('boxShadow.lg');
}

.dark {
  --color-surface-primary: theme('colors.gray.950');
  --color-surface-secondary: theme('colors.gray.900');
  --color-surface-elevated: theme('colors.gray.800');
  --color-text-primary: theme('colors.gray.50');
  --color-text-secondary: theme('colors.gray.400');
  --color-text-tertiary: theme('colors.gray.600');
  --color-action-primary: theme('colors.blue.400');
  --color-action-primary-hover: theme('colors.blue.300');
  --color-feedback-error: theme('colors.red.400');
  --color-feedback-success: theme('colors.green.400');
  --color-feedback-warning: theme('colors.amber.400');
}
```

### Step 9 — Accessibility Requirements

Every screen MUST include:

1. **Landmark regions**: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` — screen readers use these to navigate
2. **Heading hierarchy**: h1 (page title) -> h2 (sections) -> h3 (subsections) — no skips
3. **ARIA live regions**: `aria-live="polite"` on areas that update dynamically (notifications, counters, status messages)
4. **ARIA busy**: `aria-busy="true"` on loading regions
5. **Focus management**: When state changes (e.g., loading -> populated), move focus appropriately; trap focus in modals
6. **Keyboard navigation**: All interactive elements reachable via Tab; Enter/Space to activate; Escape to close overlays; Arrow keys for lists/menus
7. **Color contrast**: text >= 4.5:1, UI components >= 3:1 (AA); text >= 7:1 for AAA
8. **Touch targets**: >= 44x44px on mobile (use `min-h-11 min-w-11` in Tailwind)
9. **Reduced motion**: `motion-safe:` prefix on all Tailwind animations; `prefers-reduced-motion` media query in custom CSS
10. **Skip link**: First focusable element should be "Skip to main content"

### Step 10 — Interaction and Motion

Define for every screen:

1. **Page entrance**: How the screen appears (fade-in, slide-up, or instant based on navigation type)
2. **State transitions**: Loading -> Populated (skeleton dissolves), Error -> Retry (inline spinner)
3. **Scroll behavior**: Sticky header, scroll-to-top button (after 2 viewport heights), scroll restoration on back navigation
4. **Micro-interactions**: Button press feedback, input focus glow, success checkmark animation
5. **Reduced motion alternative**: Every animation has a `prefers-reduced-motion` fallback (typically opacity-only or instant)

```typescript
// Motion constants
const MOTION = {
  entrance: 'motion-safe:animate-in fade-in duration-300',
  stagger: (i: number) => ({ animationDelay: `${i * 50}ms` }),
  skeleton: 'animate-pulse',
  press: 'active:scale-[0.98] transition-transform',
  focus: 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
} as const;
```

---

## Platform-Aware Generation

When generating any screen, detect or ask for the target platform. Adapt every aspect of the output — layout patterns, component APIs, interaction models, navigation paradigms, and visual standards — to the platform's native conventions.

### Platform Detection

Auto-detect from project signals:
| Signal | Platform | Action |
|--------|----------|--------|
| `next.config`, `vite.config`, `index.html` | Web (React/Vue/Svelte) | Generate responsive web components with Tailwind |
| `Package.swift`, `.xcodeproj`, `ContentView.swift` | iOS (SwiftUI) | Generate SwiftUI views with iOS 26 Liquid Glass conventions |
| `build.gradle`, `AndroidManifest.xml`, `@Composable` | Android (Compose) | Generate Jetpack Compose with Material 3 Expressive |
| `pubspec.yaml`, `lib/main.dart` | Flutter | Generate Flutter widgets with Material/Cupertino adaptive |
| `expo`, `react-native` in package.json | React Native | Generate RN components with platform-adaptive styling |

If no signal is detected, ask: "What platform? (web / ios / android / cross-platform)"

### Web Platform Rules

When generating for web (React + Tailwind):
- **Layout**: CSS Grid + Flexbox, container queries for component-level responsiveness
- **Breakpoints**: sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px
- **Typography**: Fluid type with `clamp()`, `font-display: swap`
- **Interaction**: hover states, focus-visible, keyboard nav, pointer-events
- **Navigation**: Top bar (marketing), sidebar (dashboard), bottom tabs (mobile web)
- **Scrolling**: Smooth scroll, scroll-snap for carousels, IntersectionObserver for lazy load
- **States**: Skeleton loading, error boundaries, empty states, Suspense fallbacks
- **Dark mode**: `dark:` Tailwind prefix or CSS custom properties with `prefers-color-scheme`

### iOS Platform Rules (iOS 26 / SwiftUI)

When generating for iOS:
- **Layout**: VStack/HStack/ZStack, GeometryReader for adaptive layouts
- **Typography**: System fonts (SF Pro), Dynamic Type support mandatory (`@ScaledMetric`)
- **Navigation**: NavigationStack, TabView, sheet/fullScreenCover for modals
- **Interaction**: 44pt minimum tap targets, swipe gestures, haptic feedback (UIImpactFeedbackGenerator)
- **Components**: Use native components first (List, Form, Toggle, Picker, DatePicker)
- **Liquid Glass (iOS 26)**: Apply `.glassEffect()` modifier for translucent surfaces. Use `.ultraThinMaterial` for overlays. Respect `UIVibrancyEffect` for text on glass.
- **Safe areas**: Always respect safe area insets (`.safeAreaInset`, `.ignoresSafeArea` only when intentional)
- **Dark mode**: Support `@Environment(\.colorScheme)`, use semantic colors (`.primary`, `.secondary`, `.background`)
- **Motion**: Use `withAnimation(.spring(response: 0.3, dampingFraction: 0.7))` for iOS-native feel
- **Accessibility**: VoiceOver labels on all interactive elements, `accessibilityLabel`, `accessibilityHint`, `accessibilityAction`

### Android Platform Rules (Material 3 Expressive)

When generating for Android:
- **Layout**: Column/Row/Box composables, ConstraintLayout for complex arrangements
- **Typography**: MaterialTheme.typography scale (displayLarge → bodySmall)
- **Navigation**: NavigationBar (bottom), NavigationRail (tablet), NavigationDrawer (expanded)
- **Components**: Use Material 3 components (Card, Button, TextField, TopAppBar, BottomSheet)
- **M3 Expressive (2025+)**: Apply expressive shapes (`RoundedCornerShape(28.dp)` for FABs), tonal elevation, dynamic color from wallpaper
- **Interaction**: Ripple effects (default in M3), 48dp minimum touch targets
- **Theming**: Dynamic color with `dynamicDarkColorScheme()` / `dynamicLightColorScheme()`
- **Motion**: SharedTransitionScope for shared element transitions, `animateContentSize()`
- **Accessibility**: Compose semantics (`Modifier.semantics`), content descriptions, minimum touch targets

### Cross-Platform Rules

When generating for cross-platform (React Native / Flutter):
- **Adaptive components**: Use `Platform.OS` (RN) or `Theme.of(context).platform` (Flutter) to switch behavior
- **Navigation**: Platform-adaptive — bottom tabs on iOS, drawer on Android (or follow user preference)
- **Typography**: Use system fonts by default, custom fonts loaded per-platform
- **Spacing**: Use density-independent pixels (dp/pt), not raw pixels
- **Interaction**: Respect platform haptic conventions (stronger on iOS, subtle on Android)

### Platform Output Format

For each platform, output:
1. **The full component/screen code** in the platform's native language
2. **Platform-specific tokens** (CSS custom properties for web, Color/Font extensions for SwiftUI, MaterialTheme for Compose)
3. **Accessibility implementation** in the platform's native API
4. **Platform-specific states** (Suspense for React, ProgressView for SwiftUI, CircularProgressIndicator for Compose)

---

## Output Format

When invoked, produce the following structure:

```
## Screen Build: [Screen Type] — [Sector if specified]

### What Makes a Great [Screen Type]
**Reference Apps**: [App 1], [App 2], [App 3]
**Key Principles**:
1. [Principle] — [source skill] — [how applied]
2. [Principle] — [source skill] — [how applied]
3. [Principle] — [source skill] — [how applied]

**Must-Have Elements**: [bulleted list]
**Common Pitfalls**: [what to avoid]

### Component Hierarchy
[ASCII tree of components]

### State Matrix
| State | Trigger | Visual Treatment | User Action |
|-------|---------|-----------------|-------------|
| Loading | Initial fetch | Skeleton matching layout | Wait |
| Empty | No data returned | Illustration + CTA | Create first item |
| Populated | Data available | Full render | Interact |
| Error | Fetch failed | Error card + retry | Retry / Contact support |
| Partial | Partial fetch | Show loaded, badge failed | Retry failed sections |
| Offline | No network | Cached data + bar | Check connection |
| Updating | User action | Optimistic UI | Wait (non-blocking) |

### Production Code

#### types.ts
[All TypeScript interfaces and types]

#### hooks/use-[screen-name]-data.ts
[Custom hook for data fetching and state management]

#### [screen-name]-screen.tsx
[Main screen component — FULL, RUNNABLE code]
[Includes: skeleton, empty, error, populated states]
[Includes: responsive Tailwind classes for all breakpoints]
[Includes: dark mode via dark: prefix]
[Includes: full ARIA attributes]
[Includes: keyboard navigation handlers]
[Includes: motion-safe animations]

#### [screen-name]-skeleton.tsx
[Skeleton component matching populated layout]

#### [screen-name]-empty.tsx
[Empty state component with CTA]

#### [screen-name]-error.tsx
[Error state component with recovery]

#### tokens.css
[CSS custom properties for theming — light and dark]

### Responsive Behavior
| Breakpoint | Layout Changes |
|------------|---------------|
| Base (mobile) | [specific changes with Tailwind classes used] |
| sm (640px) | [specific changes] |
| md (768px) | [specific changes] |
| lg (1024px) | [specific changes] |
| xl (1280px) | [specific changes] |

### Accessibility Checklist
- [ ] Skip link present as first focusable element
- [ ] Heading hierarchy: h1 -> h2 -> h3 (no skips)
- [ ] All interactive elements keyboard-accessible (Tab, Enter, Space, Escape)
- [ ] Focus management on state transitions
- [ ] ARIA live regions for dynamic content
- [ ] ARIA busy on loading regions
- [ ] Color contrast >= 4.5:1 (text), >= 3:1 (UI)
- [ ] Touch targets >= 44x44px
- [ ] Motion respects prefers-reduced-motion
- [ ] Screen reader announces state changes

### Heuristic Map
| Element | Principle | Application |
|---------|-----------|-------------|
| [element] | [H#/Law] | [how applied in this screen] |

### Cognitive Load Budget
| Region | Max (Miller) | Actual | Status |
|--------|-------------|--------|--------|
| Header/Nav | 5-7 | [N] | OK/Over |
| Main Content | 4-7 | [N] | OK/Over |
| Sidebar | 4-5 | [N] | OK/Over |
| Footer/Action | 3-5 | [N] | OK/Over |

### Design Token Dependencies
| Token | Usage | Light | Dark |
|-------|-------|-------|------|
| --color-surface-primary | Page bg | white | gray.950 |
| [more tokens...] | | | |

### Design Decision Rationale
| Decision | Choice | Principle | Why |
|----------|--------|-----------|-----|
| [decision] | [choice] | [principle] | [reasoning] |

### Prior Output Integration
- **`/style` consumed**: [Yes/No — what was used]
- **`/style` consumed**: [Yes/No — what was used]
- **`/benchmark` consumed**: [Yes/No — what was used]
- **Missing context**: [what would improve this]

### Interaction Notes
[Scroll behavior, transitions, gestures, keyboard shortcuts]
```

## Screen-Type-Specific Recipes

Each screen type has specific requirements beyond the general protocol. When building a specific type, follow these additional guidelines.

### Dashboard Screen

**Must-have elements**: Summary metrics (4-6 KPIs), primary data visualization, activity feed or recent items, quick actions, date range selector.

**Layout pattern**:
```
DashboardScreen
├── TopBar (sticky)
│   ├── PageTitle ("Dashboard")
│   ├── DateRangeSelector
│   ├── NotificationBell
│   └── UserAvatar
├── MetricsRow
│   ├── MetricCard (revenue)
│   ├── MetricCard (users)
│   ├── MetricCard (conversion)
│   └── MetricCard (growth)
├── MainGrid (2 columns on desktop, stacked on mobile)
│   ├── PrimaryChart (line/bar chart, spans full width on mobile)
│   └── SecondaryPanel
│       ├── RecentActivity
│       └── QuickActions
└── DataTable (recent transactions/items)
```

**Responsive behavior**:
- Mobile: Metrics scroll horizontally, chart full-width, panels stacked
- Tablet: 2-column metric grid, chart full-width, panels side-by-side
- Desktop: 4-column metrics, chart + sidebar, full data table

**Key principle**: Information density must be HIGH for expert dashboards but LOW for consumer-facing. Use `sector-style-intelligence` to calibrate.

### Settings Screen

**Must-have elements**: Categorized sections (account, notifications, privacy, appearance, billing), toggle switches for boolean settings, save/cancel actions, danger zone for destructive settings.

**Layout pattern**:
```
SettingsScreen
├── Header
│   ├── PageTitle ("Settings")
│   └── Breadcrumb (if nested)
├── SettingsNavigation (sidebar on desktop, top tabs on mobile)
│   ├── Account
│   ├── Notifications
│   ├── Privacy
│   ├── Appearance
│   └── Billing
├── SettingsContent
│   ├── SectionHeading
│   ├── SettingGroup
│   │   ├── SettingRow (label + control + description)
│   │   ├── SettingRow
│   │   └── SettingRow
│   ├── SectionHeading
│   ├── SettingGroup
│   └── DangerZone (red border, destructive actions)
└── StickyFooter (Save / Discard changes — appears on unsaved changes)
```

**Key principle**: Settings should use progressive disclosure — show the most common settings first, hide advanced behind expandable sections. Apply H5 (Error Prevention) on destructive settings (delete account, revoke access).

### Profile / Account Screen

**Must-have elements**: Avatar with upload, name/email fields, bio or description, connected accounts, activity history or stats.

**Layout pattern**:
```
ProfileScreen
├── ProfileHeader
│   ├── AvatarUpload (click to change, drag-and-drop)
│   ├── Name + Handle
│   ├── Bio / Description
│   └── EditButton
├── StatsRow
│   ├── Stat (followers/connections)
│   ├── Stat (posts/projects)
│   └── Stat (joined date)
├── ContentTabs
│   ├── Tab: Activity
│   ├── Tab: Projects / Posts
│   └── Tab: Settings (or link to /settings)
└── TabContent
    └── [Dynamic based on active tab]
```

### Auth — Login Screen

**Must-have elements**: Email/username input, password input with show/hide toggle, submit button, "Forgot password" link, sign-up link, social login options (if applicable), error handling for invalid credentials.

**Layout pattern**:
```
LoginScreen
├── LogoAndBrand (centered)
├── LoginCard (max-w-md, centered)
│   ├── Heading ("Welcome back")
│   ├── SocialLoginButtons (Google, GitHub, etc.)
│   ├── Divider ("or continue with email")
│   ├── EmailInput
│   ├── PasswordInput (with show/hide toggle)
│   ├── RememberMe + ForgotPasswordLink (row)
│   ├── SubmitButton ("Sign in")
│   └── ErrorAlert (hidden until error)
└── SignupLink ("Don't have an account? Sign up")
```

**Key principles**: Keep cognitive load minimal — login should feel effortless. Use autofill-friendly `name` attributes. Never clear the email field on error. Show specific error messages ("Invalid password" not "Invalid credentials").

### Checkout Screen

**Must-have elements**: Order summary (always visible or easily accessible), progress indicator (cart -> shipping -> payment -> confirmation), shipping address form, payment method selector, trust signals, promo code input, order total with breakdown, submit order button.

**Layout pattern**:
```
CheckoutScreen
├── ProgressIndicator (Cart → Shipping → Payment → Confirm)
├── TwoColumnLayout (desktop: form + summary | mobile: stacked)
│   ├── CheckoutForm
│   │   ├── ShippingSection
│   │   │   ├── AddressForm (with autocomplete)
│   │   │   └── ShippingMethodSelector
│   │   ├── PaymentSection
│   │   │   ├── PaymentMethodSelector (cards, wallets)
│   │   │   └── CardForm (or wallet widget)
│   │   └── PromoCodeInput
│   └── OrderSummary (sticky on desktop)
│       ├── ItemList (collapsible on mobile)
│       ├── PriceBreakdown (subtotal, shipping, tax, discount)
│       ├── TrustSignals (lock icon, guarantee, SSL badge)
│       └── PlaceOrderButton
└── SecurityFooter (encryption note, support link)
```

**Key principles**: Reduce friction at all costs. Pre-fill from saved data. Show real-time price updates. Trust signals are mandatory for commerce (lock icons, SSL badges, guarantee copy). Error recovery on payment failure must be graceful — never lose the user's input.

### Search Results Screen

**Must-have elements**: Search input (pre-filled with query), result count, filter/sort controls, result list with relevant metadata, pagination or infinite scroll, empty state for no results, loading state for search execution.

**Layout pattern**:
```
SearchResultsScreen
├── SearchBar (sticky, pre-filled with query)
├── ResultsMeta ("42 results for 'query'" + sort dropdown)
├── FilterSidebar (desktop) / FilterSheet (mobile)
│   ├── FilterGroup (category)
│   ├── FilterGroup (price range)
│   ├── FilterGroup (rating)
│   └── ClearAllFilters
├── ResultsList
│   ├── ResultCard (thumbnail, title, description, metadata)
│   ├── ResultCard
│   └── ... (10-20 per page)
└── Pagination / InfiniteScrollTrigger
```

### Chat / Messaging Screen

**Must-have elements**: Message list (scrolled to bottom), message input with send button, typing indicator, message status (sent, delivered, read), timestamp grouping, user avatars.

**Layout pattern**:
```
ChatScreen
├── ChatHeader (sticky)
│   ├── BackButton
│   ├── ContactAvatar + Name + Status
│   └── ActionMenu (call, info, more)
├── MessageList (scroll to bottom, infinite scroll up for history)
│   ├── DateSeparator
│   ├── MessageBubble (sent — right aligned)
│   ├── MessageBubble (received — left aligned)
│   ├── TypingIndicator
│   └── UnreadDivider ("New messages")
└── MessageComposer (sticky bottom)
    ├── AttachButton
    ├── TextInput (auto-resize)
    ├── EmojiPicker
    └── SendButton
```

### 404 Error Screen

**Must-have elements**: Clear "page not found" message, helpful navigation (home link, search, popular pages), brand-consistent illustration, avoid blame language.

**Layout pattern**:
```
NotFoundScreen
├── CenteredContent (max-w-lg)
│   ├── Illustration (brand-consistent, not generic)
│   ├── Heading ("Page not found" — NOT "404 Error")
│   ├── Description ("The page you're looking for doesn't exist or has been moved.")
│   ├── SearchInput (optional — help them find what they need)
│   ├── PrimaryAction ("Go to homepage")
│   └── PopularLinks (3-4 popular pages)
└── [No footer — minimal distractions]
```

### Empty State Screen

**Must-have elements**: Illustration or icon, clear heading explaining the empty state, description with context, primary CTA to populate, optional secondary action.

**Key principle**: Empty states are often the FIRST impression (Peak-End Rule). Make them welcoming and actionable, never make the user feel lost. Show what the screen WILL look like with data (ghost/preview) if possible.

### Analytics Screen

**Must-have elements**: Date range selector, primary metric chart (line/area), breakdown chart (bar/pie), comparison period, export functionality, data table with sortable columns.

**Layout pattern**:
```
AnalyticsScreen
├── Header
│   ├── PageTitle
│   ├── DateRangeSelector
│   ├── ComparisonToggle ("vs. previous period")
│   └── ExportButton
├── KPIRow (4-6 metric cards with sparklines)
├── PrimaryChart (full width, line/area chart)
├── ChartGrid (2-column)
│   ├── BreakdownChart (bar chart — by source/category)
│   └── DistributionChart (pie/donut — composition)
├── DataTable (sortable, filterable, exportable)
└── InsightCards (AI-generated insights, optional)
```

### Calendar Screen

**Must-have elements**: Month/week/day view toggle, event indicators on dates, event creation, navigation between months/weeks, today button, event detail on click.

**Layout pattern**:
```
CalendarScreen
├── CalendarHeader
│   ├── NavigationArrows (prev/next)
│   ├── CurrentPeriodLabel ("March 2026")
│   ├── ViewToggle (Month | Week | Day)
│   └── TodayButton + CreateEventButton
├── CalendarGrid
│   ├── DayHeaders (Mon-Sun)
│   ├── DayCell (date number + event dots/bars)
│   └── ... (42 cells for month view)
├── EventDetailSheet (slides in on event click)
└── MiniCalendar (sidebar on desktop, hidden on mobile)
```

## Code Generation Templates

### Hook Template

```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseScreenDataOptions {
  // Screen-specific parameters
}

interface UseScreenDataReturn<T> {
  data: T | null;
  state: 'loading' | 'empty' | 'populated' | 'error' | 'partial' | 'offline' | 'updating';
  error: { code: string; message: string; recovery?: { label: string; action: () => void } } | null;
  refetch: () => Promise<void>;
  isOffline: boolean;
}

export function useScreenData<T>(options: UseScreenDataOptions): UseScreenDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<UseScreenDataReturn<T>['state']>('loading');
  const [error, setError] = useState<UseScreenDataReturn<T>['error']>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => {
      setIsOffline(true);
      setState('offline');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setState('loading');
      setError(null);
      // Replace with actual data fetching logic
      const response = await fetch('/api/screen-data');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json() as T;

      if (!result || (Array.isArray(result) && result.length === 0)) {
        setState('empty');
      } else {
        setData(result);
        setState('populated');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError({
        code: 'FETCH_FAILED',
        message,
        recovery: { label: 'Try again', action: () => void fetchData() },
      });
      setState('error');
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, state, error, refetch: fetchData, isOffline };
}
```

### Offline Indicator Component

```typescript
import { WifiOff } from 'lucide-react';

export function OfflineIndicator({ isOffline }: { isOffline: boolean }) {
  if (!isOffline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900 px-4 py-2 text-sm font-medium text-amber-800 dark:text-amber-200 shadow-lg"
    >
      <WifiOff className="h-4 w-4" aria-hidden="true" />
      <span>You are offline. Some data may be outdated.</span>
    </div>
  );
}
```

### Scroll-to-Top Component

```typescript
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight * 2);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg transition-all motion-safe:animate-in motion-safe:fade-in hover:bg-gray-700 dark:hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
```

### Skip Link Component

```typescript
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-blue-500 dark:focus:bg-gray-900 dark:focus:text-white"
    >
      Skip to main content
    </a>
  );
}
```

### Screen Wrapper Component

```typescript
import { SkipLink } from './skip-link';
import { OfflineIndicator } from './offline-indicator';
import { ScrollToTop } from './scroll-to-top';

interface ScreenWrapperProps {
  children: React.ReactNode;
  isOffline?: boolean;
  className?: string;
}

export function ScreenWrapper({ children, isOffline = false, className }: ScreenWrapperProps) {
  return (
    <>
      <SkipLink />
      <div className={cn('min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50', className)}>
        {children}
      </div>
      <OfflineIndicator isOffline={isOffline} />
      <ScrollToTop />
    </>
  );
}
```

## Quality Checklist

Before delivering any screen, verify:

### Code Quality
- [ ] All imports are present and valid
- [ ] No `any` types — everything is typed
- [ ] No `// TODO` or `// FIXME` comments
- [ ] No placeholder text that looks like a placeholder (use realistic content)
- [ ] Component names follow PascalCase convention
- [ ] File names follow kebab-case convention
- [ ] Custom hooks start with `use`
- [ ] All event handlers are properly typed

### UX Quality
- [ ] Primary user task is achievable in minimal steps
- [ ] Cognitive load budget per region is respected (Miller's Law)
- [ ] Every element maps to a UX principle
- [ ] Empty state is helpful and actionable
- [ ] Error state provides recovery path
- [ ] Loading state matches populated layout shape

### Visual Quality
- [ ] Consistent spacing rhythm throughout
- [ ] Typography hierarchy is clear (size, weight, color)
- [ ] Color usage is intentional and purposeful
- [ ] Dark mode is complete (no missed elements)
- [ ] Responsive layout works at all 5 breakpoints

### Technical Quality
- [ ] No layout shifts (all images/dynamic content have dimensions)
- [ ] Animations respect prefers-reduced-motion
- [ ] No render-blocking resources
- [ ] Proper error boundaries for partial failures

## Multi-Pass Generation Strategy

Complex screens (dashboard, checkout, chat, analytics) can exceed a single response. Use the multi-pass strategy for complete output.

### Pass Architecture

| Pass | Focus | Output |
|------|-------|--------|
| **Pass 1: Foundation** | Types, hooks, state machine, screen wrapper | `types.ts`, `use[Screen]Data.ts`, skeleton component, error component, empty state component |
| **Pass 2: Main Screen** | Primary populated state with full layout | Main screen component with all sections, responsive breakpoints, dark mode |
| **Pass 3: Polish** | Interactions, animations, tokens, final assembly | Motion recipes, design token CSS, accessibility audit, quality checklist |

### Generation Rules

1. **Always complete Pass 1 + Pass 2 minimum** — the user gets a working screen in the first response
2. **If approaching token limit**, stop at a clean component boundary and output:
   > **Sumi checkpoint** — Foundation + main screen complete. Run `/screen --continue` for interactions, animation, and polish.
3. **Each pass is additive and non-destructive** — later passes add files but never rewrite earlier ones
4. **Simple screens fit in one pass**: Error (404/500), Empty State, Loading, Offline, Welcome

### `/screen --continue` Behavior

When the user runs `/screen --continue`:
1. Review previously generated components
2. Generate the next unfinished pass
3. If all passes are done, output the final quality checklist and design token summary

---

## Cross-References

When building screens, draw patterns and best practices from:
- `component-patterns-code` — React/TypeScript component patterns, CSS modern layout, accessible implementations
- `performance-states-patterns` — Skeleton screens, optimistic UI, error boundaries, loading strategies, offline-first
- `mobile-ux-design` — iOS 26 Liquid Glass, safe area insets, Material 3 adaptive patterns
- `desktop-app-design` — Desktop-density layouts, keyboard navigation, multi-panel architectures
- `ui-visual-design-system` — Design token architecture, color systems, typography scales
- `accessibility-inclusive-design` — ARIA patterns, focus management, screen reader considerations
- `sector-style-intelligence` — Sector-specific conventions, trust signals, density norms
- `cognitive-psychology-ux` — Fitts's Law, Hick's Law, Miller's Law, Von Restorff, Peak-End Rule
- `nng-ux-heuristics` — Heuristic grounding of screen-level decisions
- `screen-flow-patterns` — Screen type catalog, flow patterns, UI element patterns
- `ui-pattern-intelligence` — 200+ UI patterns, anti-pattern encyclopedia
- `visual-design-mastery` — Composition rules, visual scoring, color/typography mastery
- `platform-visual-standards` — iOS 26, M3 Expressive, modern CSS 2025-2026
- `design-token-presets` — Ready-to-deploy token systems by industry
- `responsive-block-patterns` — Cross-breakpoint transformation, container queries, fluid scaling
- `navigation-pattern-encyclopedia` — Nav patterns, IA guide
- `form-design-encyclopedia` — Form patterns, input types, validation strategies
- `data-visualization-mastery` — Chart types, dashboard composition, data tables
- `animation-recipe-library` — Production animation recipes (CSS/Framer Motion)
- `color-palette-library` — Curated palettes, APCA scores, dark mode mapping
- `typography-pairing-recipes` — Font pairings, type scales, fluid typography
- `shadow-elevation-density` — Shadow scales, elevation hierarchy, density modes

## Next Step

**Next** -> `/component` — Extract reusable components from your screens

**Alternatives**:
- `/page` — Build a full marketing/landing page with block stacking
- `/generate` — AI-powered design asset generation
- `/roast` — Jump to VALIDATE to critique what you have built
- `/sumi` — See the full command journey
