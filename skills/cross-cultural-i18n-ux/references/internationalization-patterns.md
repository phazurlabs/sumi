# Internationalization Patterns — Building for a Global Audience

This reference provides the technical patterns and implementation details needed to build interfaces that work across languages, scripts, and locales. It covers CSS logical properties for direction-agnostic layout, RTL layout patterns, i18n frameworks for React and iOS, text expansion handling, multi-script font loading, and locale-aware data formatting.

---

## CSS Logical Properties

CSS logical properties replace physical direction properties (left, right, top, bottom) with flow-relative equivalents that automatically adapt to the document's writing mode and directionality. When the `dir` attribute is set to `rtl`, logical properties reverse their physical mapping without any additional CSS rules.

Logical properties should be the default for all new code. There is no performance cost, no browser support concern in modern targets (baseline support since 2020 across Chrome, Firefox, Safari, and Edge), and no reason to continue using physical properties for inline-direction layout.

The mental model shift is straightforward: instead of thinking in terms of a fixed page with left, right, top, and bottom edges, think in terms of a text flow with an inline axis (the direction text flows) and a block axis (the direction blocks stack). In English, the inline axis is left-to-right and the block axis is top-to-bottom. In Arabic, the inline axis is right-to-left. In traditional Japanese vertical writing, the inline axis is top-to-bottom and the block axis is right-to-left. Logical properties automatically adapt to whatever writing mode and direction the document declares.

The adoption strategy for existing codebases is incremental: use logical properties in all new code, and migrate existing physical properties during routine refactoring. Linting rules (such as the stylelint-use-logical-spec plugin) can enforce logical properties in new commits while allowing existing physical properties to be migrated over time.

### Complete Physical-to-Logical Property Mapping

| Physical Property | Logical Property | Notes |
|---|---|---|
| `margin-left` | `margin-inline-start` | Start of the inline axis (left in LTR, right in RTL) |
| `margin-right` | `margin-inline-end` | End of the inline axis |
| `margin-top` | `margin-block-start` | Start of the block axis (top in horizontal writing modes) |
| `margin-bottom` | `margin-block-end` | End of the block axis |
| `padding-left` | `padding-inline-start` | Same inline-start logic as margin |
| `padding-right` | `padding-inline-end` | |
| `padding-top` | `padding-block-start` | |
| `padding-bottom` | `padding-block-end` | |
| `border-left` | `border-inline-start` | |
| `border-right` | `border-inline-end` | |
| `border-top` | `border-block-start` | |
| `border-bottom` | `border-block-end` | |
| `left` | `inset-inline-start` | For positioned elements |
| `right` | `inset-inline-end` | |
| `top` | `inset-block-start` | |
| `bottom` | `inset-block-end` | |
| `text-align: left` | `text-align: start` | Aligns to inline start |
| `text-align: right` | `text-align: end` | Aligns to inline end |
| `width` | `inline-size` | Size along the inline axis |
| `height` | `block-size` | Size along the block axis |
| `min-width` | `min-inline-size` | |
| `max-width` | `max-inline-size` | |
| `min-height` | `min-block-size` | |
| `max-height` | `max-block-size` | |
| `border-top-left-radius` | `border-start-start-radius` | Block-start, inline-start corner |
| `border-top-right-radius` | `border-start-end-radius` | Block-start, inline-end corner |
| `border-bottom-left-radius` | `border-end-start-radius` | Block-end, inline-start corner |
| `border-bottom-right-radius` | `border-end-end-radius` | Block-end, inline-end corner |
| `float: left` | `float: inline-start` | |
| `float: right` | `float: inline-end` | |
| `clear: left` | `clear: inline-start` | |
| `clear: right` | `clear: inline-end` | |

### Shorthand Logical Properties

Logical shorthands use a two-value syntax where the first value applies to the block axis and the second to the inline axis:

```css
/* margin: block-value inline-value */
.element {
  margin-block: 1rem;        /* top and bottom */
  margin-inline: 2rem;       /* left and right in LTR, right and left in RTL */
  padding-block: 0.5rem 1rem; /* top 0.5rem, bottom 1rem */
  padding-inline: 1rem;      /* both inline start and end */
  inset-inline: 0;           /* stretch to both inline edges */
}
```

---

## RTL Layout Patterns

### Setting Document Direction

Direction is set via the HTML `dir` attribute, not CSS. The `dir` attribute triggers the Unicode Bidirectional Algorithm and informs assistive technologies. CSS `direction` property should only be used for overriding specific inline elements, never for document-level direction.

```html
<html lang="ar" dir="rtl">
```

For applications that switch languages dynamically, set the `dir` attribute on the root element programmatically based on the active locale. A common pattern in single-page applications is to maintain a mapping of RTL locales and update both `lang` and `dir` when the user switches languages:

```javascript
const RTL_LOCALES = ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ckb', 'yi'];

function setLocaleDirection(locale) {
  const baseLocale = locale.split('-')[0];
  const dir = RTL_LOCALES.includes(baseLocale) ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', locale);
}
```

### Flexbox Direction Reversal

Flexbox and CSS Grid automatically reverse their layout axis when the document direction is RTL, provided you use logical alignment values:

```css
.nav-bar {
  display: flex;
  gap: 1rem;
  justify-content: flex-start; /* Becomes right-aligned in RTL */
  padding-inline-start: 1.5rem;
}

.sidebar-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  /* In RTL, the sidebar will appear on the right */
  gap: 2rem;
}
```

An RTL-safe flexbox container pattern:

```css
.card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-inline: 1.5rem;
  padding-block: 1rem;
  border-inline-start: 4px solid var(--accent-color);
  /* The accent border appears on the left in LTR, right in RTL */
}

.card__icon {
  flex-shrink: 0;
  /* Icon stays on the inline-start side automatically */
}

.card__content {
  flex: 1;
  text-align: start;
}

.card__action {
  margin-inline-start: auto;
  /* Pushes to inline-end in both directions */
}
```

### Icon Mirroring Rules

Not all icons should mirror in RTL contexts. The rules:

**Icons that MUST mirror (represent inline direction):**
- Back arrow / Forward arrow
- Undo / Redo
- Send button arrow
- Navigation breadcrumb separators
- Progress indicators (horizontal)
- Text indent / outdent
- List bullet alignment
- Reply / Forward (email)
- Expand / Collapse (horizontal)

**Icons that must NOT mirror (universal or directionless):**
- Search (magnifying glass)
- Checkmark / Checkboxes
- Close (X)
- Plus / Minus
- Media playback (play, pause, stop)
- Volume controls
- Clock / Time
- Lock / Unlock
- Heart / Star / Bookmark
- Settings gear
- Upload / Download (vertical)
- Phone handset
- Camera / Image
- Home

To implement selective mirroring, use a CSS class:

```css
[dir="rtl"] .icon--mirrored {
  transform: scaleX(-1);
}
```

For icon systems using SVGs, an alternative approach is to provide separate RTL SVG assets for directional icons and swap them based on the document direction. This can produce cleaner rendering than CSS transforms in some cases, particularly for icons with asymmetric details like shadows or gradients:

```jsx
// React component with direction-aware icon selection
function DirectionalIcon({ name, className }) {
  const dir = useDirection(); // Custom hook reading document dir
  const iconName = MIRRORED_ICONS.includes(name) && dir === 'rtl'
    ? `${name}-rtl`
    : name;
  return <svg className={className}><use href={`#icon-${iconName}`} /></svg>;
}
```

### Scrollbar and Scroll Position

In RTL layouts, horizontal scroll containers have their origin on the right side. This affects carousel components, horizontally scrollable tables, and any custom scroll-position-dependent logic (such as infinite scroll or lazy loading triggers). JavaScript `scrollLeft` behavior varies by browser in RTL contexts: some browsers return negative values, others return positive values measured from the right edge. Libraries like `normalize-scroll-left` can abstract these differences.

### Bidirectional Text Mixing

When RTL text contains embedded LTR segments (brand names, URLs, code snippets, numbers with units), the Unicode Bidirectional Algorithm determines display order. However, the algorithm can produce incorrect results without explicit isolation.

The `<bdi>` (Bidirectional Isolate) element isolates a span of text so that its directionality does not affect surrounding text:

```html
<p>User <bdi>@john_doe_123</bdi> left a review.</p>
<!-- In Arabic context, the username won't disrupt the RTL flow -->
```

For dynamic content where usernames, product names, or codes might be in either direction, always wrap them in `<bdi>`.

The CSS property `unicode-bidi: isolate` provides equivalent behavior for styled elements:

```css
.user-generated-content {
  unicode-bidi: isolate;
}
```

### Number Handling in RTL

Numbers in Arabic script can use either Western digits (0-9) or Eastern Arabic-Indic digits. The choice is locale-specific:

- Arabic (most countries): Eastern Arabic-Indic digits are traditional but Western digits are increasingly common in digital interfaces.
- Hebrew: Always uses Western digits.
- Persian/Farsi: Uses Extended Arabic-Indic digits (a different set from Arabic).
- Urdu: Uses Extended Arabic-Indic digits.

Use `Intl.NumberFormat` with the correct locale and numbering system to ensure correct digit rendering:

```javascript
new Intl.NumberFormat('ar-EG').format(1234567);
// "١٬٢٣٤٬٥٦٧" (Eastern Arabic-Indic with Arabic comma grouping)

new Intl.NumberFormat('ar-EG', { numberingSystem: 'latn' }).format(1234567);
// "1,234,567" (Western digits, forced)
```

---

## React i18n: react-intl vs i18next

### Comparison Table

| Feature | react-intl (FormatJS) | react-i18next (i18next) |
|---|---|---|
| ICU MessageFormat | Native, full support | Via plugin (i18next-icu) |
| Pluralization | ICU plural rules (CLDR) | Built-in simple plurals + ICU via plugin |
| Interpolation | ICU syntax `{name}` | Default `{{name}}`, configurable |
| Date/Number formatting | Built-in via Intl API wrappers | Separate; relies on Intl API directly |
| Namespace support | Flat by default, manual organization | Built-in namespace system |
| Bundle splitting | Manual via dynamic import | Built-in lazy loading per namespace |
| SSR support | Full | Full |
| TypeScript | Strong types for message descriptors | Strong types via code generation |
| Extraction tooling | formatjs CLI (extract, compile) | i18next-parser, scanner |
| Ecosystem size | Focused on React | Framework-agnostic core (React, Vue, Node, etc.) |
| Message format | ICU MessageFormat exclusively | JSON key-value with nesting, ICU optional |

### ICU MessageFormat

ICU MessageFormat is the industry standard for translatable strings with variables, plurals, selects, and nested logic:

```
{count, plural,
  =0 {No items in your cart}
  one {1 item in your cart}
  other {{count} items in your cart}
}
```

```
{gender, select,
  male {He commented on your post}
  female {She commented on your post}
  other {They commented on your post}
}
```

### Pluralization Rules

English has two plural forms (one, other). Arabic has six (zero, one, two, few, many, other). Russian has three (one, few, many). Polish has four. CLDR (Common Locale Data Repository) defines the rules for all locales. Never hand-code plural logic; always use ICU plural rules or equivalent library support.

A common mistake is using ternary operators for pluralization in code: `count === 1 ? 'item' : 'items'`. This works for English but fails spectacularly for languages with complex plural rules. Russian, for instance, uses different forms for counts ending in 1 (except 11), counts ending in 2-4 (except 12-14), and everything else. The only correct approach is to delegate pluralization to the i18n library, which consults CLDR rules for the active locale.

### Nested ICU Messages

ICU MessageFormat supports nesting, which is essential for complex strings that vary on multiple axes:

```
{gender, select,
  male {{count, plural,
    one {He has 1 item}
    other {He has {count} items}
  }}
  female {{count, plural,
    one {She has 1 item}
    other {She has {count} items}
  }}
  other {{count, plural,
    one {They have 1 item}
    other {They have {count} items}
  }}
}
```

While powerful, nested messages become difficult for translators to manage beyond two levels of nesting. If a message requires three or more selection axes, consider splitting it into separate strings or simplifying the grammar.

### Namespace Organization

Organize translation keys by feature or page, not by component:

```
locales/
  en/
    common.json        # Shared: buttons, labels, errors
    auth.json           # Login, signup, password reset
    dashboard.json      # Dashboard-specific strings
    settings.json       # Settings page
  de/
    common.json
    auth.json
    ...
```

This enables lazy loading: the settings page only loads `common.json` and `settings.json`, not the entire translation catalog.

For large applications, namespace granularity has a direct impact on initial load performance. A monolithic `en.json` file containing 10,000 translation keys forces every page to download the entire catalog. Splitting into 15-20 namespaces of 500-700 keys each enables the router or page component to declare its dependencies and load only what is needed. The `common` namespace (shared labels, buttons, error messages) is typically the only one loaded globally.

Translation key naming should follow a consistent convention. A recommended pattern is `{namespace}.{section}.{element}.{variant}`:

```
auth.login.button.submit      → "Sign In"
auth.login.error.invalid       → "Invalid email or password"
auth.signup.button.submit      → "Create Account"
dashboard.header.greeting      → "Welcome back, {name}"
```

This hierarchical naming makes keys self-documenting, reduces naming collisions, and enables translators to understand context from the key path alone.

### Context-Aware Translations

Some strings require translator context to avoid ambiguity. "Post" could be a verb (to post) or a noun (a post). Provide context via description fields:

```javascript
// react-intl
const messages = defineMessages({
  postVerb: {
    id: 'action.post',
    defaultMessage: 'Post',
    description: 'Verb: action to publish a new message',
  },
  postNoun: {
    id: 'content.post',
    defaultMessage: 'Post',
    description: 'Noun: a published message or article',
  },
});
```

---

## iOS Internationalization

### NSLocalizedString and String Catalogs

Since Xcode 15, String Catalogs (`.xcstrings` files) replace `.strings` and `.stringsdict` files. They provide a visual editor for managing translations, pluralization, and device variations in a single JSON-based file.

```swift
// Basic localized string
let greeting = String(localized: "welcome_message")

// With interpolation
let itemCount = String(localized: "\(count) items remaining")

// With explicit comment for translators
let post = String(localized: "Post",
                  comment: "Verb: action button to publish content")
```

String Catalogs automatically detect localizable strings in SwiftUI `Text` views, making extraction largely automatic.

String Catalogs support plural variations natively. For a string like "X items remaining," the catalog editor lets you define variations for each CLDR plural category (zero, one, two, few, many, other) per locale. This replaces the older `.stringsdict` plist format, which was error-prone and difficult to manage at scale.

For projects not yet on Xcode 15+, the legacy approach uses `NSLocalizedString` with a `.strings` file for simple translations and `.stringsdict` for plurals:

```swift
// Legacy approach
let greeting = NSLocalizedString("welcome_message", comment: "Greeting shown on launch")
```

### Auto Layout for RTL

UIKit and SwiftUI handle RTL layout automatically when constraints use leading/trailing instead of left/right:

```swift
// UIKit - correct (RTL-aware)
view.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 16)
view.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -16)

// UIKit - incorrect (ignores RTL)
view.leftAnchor.constraint(equalTo: container.leftAnchor, constant: 16)
```

SwiftUI layouts are RTL-aware by default. `HStack` reverses in RTL environments. Use the `.environment(\.layoutDirection, .rightToLeft)` modifier for testing.

Images and icons in UIKit need explicit attention. `UIImage` provides `imageFlippedForRightToLeftLayoutDirection()` which creates an image that automatically mirrors in RTL contexts. For SF Symbols, many symbols already have built-in RTL variants that activate automatically.

```swift
// Create an RTL-aware image
let backArrow = UIImage(systemName: "chevron.left")?
    .imageFlippedForRightToLeftLayoutDirection()
```

### iOS Formatters

```swift
// Date formatting - locale-aware
let dateFormatter = DateFormatter()
dateFormatter.locale = Locale.current
dateFormatter.dateStyle = .long
dateFormatter.timeStyle = .short
let dateString = dateFormatter.string(from: Date())
// US: "February 12, 2026 at 3:45 PM"
// Germany: "12. Februar 2026 um 15:45"
// Japan: "2026年2月12日 15:45"

// Number formatting
let numberFormatter = NumberFormatter()
numberFormatter.locale = Locale.current
numberFormatter.numberStyle = .decimal
let numberString = numberFormatter.string(from: 1234567.89)
// US: "1,234,567.89"
// Germany: "1.234.567,89"
// France: "1 234 567,89"

// Currency formatting
let currencyFormatter = NumberFormatter()
currencyFormatter.locale = Locale(identifier: "ja_JP")
currencyFormatter.numberStyle = .currency
let priceString = currencyFormatter.string(from: 1500)
// "¥1,500"
```

---

## Text Expansion Handling

### Expansion Ratios by Language

| Source Language (English) Character Count | Typical Expansion |
|---|---|
| 1-10 characters | 200-300% (short labels are most volatile) |
| 11-20 characters | 180-200% |
| 21-30 characters | 160-180% |
| 31-50 characters | 140-160% |
| 51-70 characters | 130-140% |
| 70+ characters | 120-130% |

**Language-specific tendencies:**
- **German**: 30-35% longer on average. Compound words create very long single tokens ("Geschwindigkeitsbegrenzung" for "speed limit").
- **Finnish**: 30-40% longer. Agglutinative grammar produces long words.
- **French**: 15-20% longer. Articles and prepositions add length.
- **Russian**: 20-30% longer. Case endings and longer words.
- **Chinese/Japanese**: Often 30-50% shorter in character count, but each character is full-width (approximately 1.5-2x the width of a Latin character).
- **Korean**: Slightly shorter to comparable length, with full-width characters.
- **Arabic/Hebrew**: Comparable to English in visual width but line height may need adjustment for diacritical marks.

### Strategies for Handling Expansion

**1. Flexible containers as the default.** Never set fixed widths on text containers. Use `min-inline-size` for minimum clickable/tappable area and `max-inline-size` for readability constraints, but let the container grow between those bounds.

**2. Pseudo-localization during development.** Generate inflated strings that replace ASCII characters with accented equivalents and add padding characters. This reveals layout issues before real translations arrive:

```
"Save" → "[Šåååvé______]"
"Submit order" → "[Šûûbmîît öördéér__________]"
```

Tools like `pseudo-localization` npm package or custom scripts can automate this.

**3. Truncation as a last resort.** When layout constraints are truly immovable (hardware pixel limits, fixed-size notification badges), truncation is acceptable with these rules:
- Always use ellipsis character (U+2026 `...`) not three periods.
- Provide full text on hover/long-press via tooltip.
- Never truncate critical information (prices, quantities, error codes).
- Prefer multi-line reflow over truncation.

**4. Dynamic layout testing.** Test every screen at three extremes: shortest expected locale (often CJK), typical locale (English), and longest expected locale (German or Finnish). Automate these test configurations in the CI pipeline.

**5. String concatenation avoidance.** Never construct translatable strings by concatenating fragments: `"You have " + count + " items in your cart"`. This approach breaks in languages with different word order. Instead, use parameterized messages: `"You have {count} items in your cart"` where the i18n library handles interpolation and the translator controls the position of the variable within the sentence.

**6. Icon-only buttons need text alternatives.** When space constraints push toward icon-only buttons (common in toolbar designs), ensure that the `aria-label` or tooltip text is also localized. An icon that is self-explanatory in one culture may be ambiguous in another. The text alternative provides both accessibility and cultural context.

**7. Vertical text considerations.** Traditional CJK vertical writing (tategaki) flows top-to-bottom in columns that progress right-to-left. While most digital interfaces use horizontal layout, certain contexts (book readers, formal invitations, some Japanese news sites) use vertical text. CSS `writing-mode: vertical-rl` enables this, but it requires a thorough rethinking of layout since "width" becomes the block dimension and "height" becomes the inline dimension. Logical properties handle this correctly.

---

## Font Loading for Multi-Script Support

### System Font Stacks by Script

Using system fonts eliminates download cost and ensures native rendering quality:

```css
:root {
  /* Latin, Cyrillic, Greek */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
               Roboto, "Helvetica Neue", Arial, sans-serif;

  /* Arabic */
  --font-arabic: "SF Arabic", "Segoe UI", "Tahoma", "Arabic Typesetting",
                 sans-serif;

  /* CJK - Chinese Simplified */
  --font-cjk-sc: "PingFang SC", "Microsoft YaHei", "Noto Sans SC",
                  "Source Han Sans SC", sans-serif;

  /* CJK - Japanese */
  --font-cjk-ja: "Hiragino Sans", "Yu Gothic", "Noto Sans JP",
                  "Source Han Sans JP", sans-serif;

  /* CJK - Korean */
  --font-cjk-ko: "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR",
                  "Source Han Sans KR", sans-serif;

  /* Hebrew */
  --font-hebrew: "SF Hebrew", "Segoe UI", "Arial Hebrew", "Tahoma",
                 sans-serif;

  /* Devanagari (Hindi) */
  --font-devanagari: "Kohinoor Devanagari", "Noto Sans Devanagari",
                     "Mangal", sans-serif;
}
```

### CJK Font Size Considerations

CJK fonts contain tens of thousands of glyphs. A full CJK font file can be 15-25MB. Strategies for managing this:

**Unicode-range subsetting:** Load only the character subsets needed for a given page using `@font-face` with `unicode-range`:

```css
/* Load only common CJK characters (most frequent ~3,000) */
@font-face {
  font-family: "Noto Sans SC";
  src: url("/fonts/noto-sans-sc-common.woff2") format("woff2");
  unicode-range: U+4E00-9FFF; /* CJK Unified Ideographs */
  font-display: swap;
}

/* Load extended characters only if needed */
@font-face {
  font-family: "Noto Sans SC";
  src: url("/fonts/noto-sans-sc-ext.woff2") format("woff2");
  unicode-range: U+3400-4DBF; /* CJK Extension A */
  font-display: swap;
}
```

**Google Fonts slice approach:** Google Fonts automatically slices CJK fonts into over 100 small subsets (each ~50-100KB) using unicode-range, downloading only the slices containing characters present on the page.

**Variable fonts:** Where available, variable CJK fonts reduce the total number of files by combining weight and width variations in a single file, though the base file size remains large.

**Preloading critical subsets:** For the primary language of the page, preload the most critical font subset to avoid a flash of unstyled text (FOUT):

```html
<link rel="preload" as="font" type="font/woff2"
      href="/fonts/noto-sans-sc-common.woff2" crossorigin>
```

Only preload the primary subset; additional subsets loaded via unicode-range should be left to the browser's lazy-loading mechanism. Preloading too many font files saturates the connection and delays other critical resources.

**Fallback font metrics matching:** When a web font loads asynchronously, the fallback system font may have different metrics (x-height, ascender, descender, character width), causing layout shift when the web font arrives. CSS `@font-face` descriptors `ascent-override`, `descent-override`, `line-gap-override`, and `size-adjust` can fine-tune the fallback font to match the web font's metrics, minimizing cumulative layout shift (CLS).

### Line Height for Multi-Script

CJK text typically requires more line height than Latin text due to the visual density of characters. Arabic and Devanagari scripts require additional line height for diacritical marks and vowel signs:

```css
/* Base for Latin */
body { line-height: 1.5; }

/* CJK override */
:lang(zh), :lang(ja), :lang(ko) {
  line-height: 1.7;
}

/* Arabic override */
:lang(ar) {
  line-height: 1.8;
}

/* Devanagari override */
:lang(hi) {
  line-height: 1.8;
}
```

---

## Locale-Aware Formatting: Code Examples

### JavaScript — Number, Date, and Currency

```javascript
// Number formatting
function formatNumber(value, locale = navigator.language) {
  return new Intl.NumberFormat(locale).format(value);
}

formatNumber(1234567.89, 'en-US');  // "1,234,567.89"
formatNumber(1234567.89, 'de-DE');  // "1.234.567,89"
formatNumber(1234567.89, 'fr-FR');  // "1 234 567,89"
formatNumber(1234567.89, 'hi-IN');  // "12,34,567.89" (lakh/crore grouping)

// Date formatting
function formatDate(date, locale = navigator.language, options = {}) {
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat(locale, { ...defaults, ...options }).format(date);
}

const date = new Date('2026-02-12');
formatDate(date, 'en-US');   // "February 12, 2026"
formatDate(date, 'de-DE');   // "12. Februar 2026"
formatDate(date, 'ja-JP');   // "2026年2月12日"
formatDate(date, 'ar-EG');   // "١٢ فبراير ٢٠٢٦"

// Currency formatting
function formatCurrency(amount, currency, locale = navigator.language) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

formatCurrency(49.99, 'USD', 'en-US');  // "$49.99"
formatCurrency(49.99, 'EUR', 'de-DE');  // "49,99 €"
formatCurrency(5000, 'JPY', 'ja-JP');   // "￥5,000"
formatCurrency(49.99, 'GBP', 'en-GB');  // "£49.99"

// Relative time formatting
function formatRelativeTime(value, unit, locale = navigator.language) {
  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value, unit);
}

formatRelativeTime(-1, 'day', 'en-US');  // "yesterday"
formatRelativeTime(-1, 'day', 'de-DE');  // "gestern"
formatRelativeTime(3, 'hour', 'ja-JP');  // "3 時間後"

// List formatting (joining arrays with locale-appropriate conjunctions)
function formatList(items, locale = navigator.language, type = 'conjunction') {
  return new Intl.ListFormat(locale, { style: 'long', type }).format(items);
}

formatList(['Alice', 'Bob', 'Carol'], 'en-US');   // "Alice, Bob, and Carol"
formatList(['Alice', 'Bob', 'Carol'], 'de-DE');   // "Alice, Bob und Carol"
formatList(['Alice', 'Bob', 'Carol'], 'ja-JP');   // "Alice、Bob、Carol"
formatList(['Alice', 'Bob', 'Carol'], 'ar-EG');   // "Alice وBob وCarol"

// Display names (translating language/region/script names)
function getLanguageName(code, locale = navigator.language) {
  return new Intl.DisplayNames(locale, { type: 'language' }).of(code);
}

getLanguageName('ja', 'en-US');  // "Japanese"
getLanguageName('ja', 'de-DE');  // "Japanisch"
getLanguageName('ja', 'ja-JP');  // "日本語"
```

### Swift — Locale-Aware Formatting

```swift
import Foundation

// Number formatting
func formatNumber(_ value: Double, locale: Locale = .current) -> String {
    let formatter = NumberFormatter()
    formatter.locale = locale
    formatter.numberStyle = .decimal
    return formatter.string(from: NSNumber(value: value)) ?? "\(value)"
}

formatNumber(1234567.89, locale: Locale(identifier: "en_US")) // "1,234,567.89"
formatNumber(1234567.89, locale: Locale(identifier: "de_DE")) // "1.234.567,89"

// Currency formatting
func formatCurrency(_ value: Double, currencyCode: String, locale: Locale = .current) -> String {
    let formatter = NumberFormatter()
    formatter.locale = locale
    formatter.numberStyle = .currency
    formatter.currencyCode = currencyCode
    return formatter.string(from: NSNumber(value: value)) ?? "\(value)"
}

formatCurrency(49.99, currencyCode: "USD", locale: Locale(identifier: "en_US")) // "$49.99"
formatCurrency(49.99, currencyCode: "EUR", locale: Locale(identifier: "de_DE")) // "49,99 €"

// Date formatting with locale
func formatDate(_ date: Date, locale: Locale = .current, style: DateFormatter.Style = .long) -> String {
    let formatter = DateFormatter()
    formatter.locale = locale
    formatter.dateStyle = style
    return formatter.string(from: date)
}

// Measurement formatting
let distance = Measurement(value: 5, unit: UnitLength.kilometers)
let measurementFormatter = MeasurementFormatter()
measurementFormatter.locale = Locale(identifier: "en_US")
measurementFormatter.string(from: distance) // "3.107 mi" (auto-converts to locale unit)
measurementFormatter.locale = Locale(identifier: "de_DE")
measurementFormatter.string(from: distance) // "5 km"
```

---

## Testing and Automation

### Pseudo-Localization Configuration

Pseudo-localization should be a build-time option, not an afterthought. Configure your i18n framework to support a pseudo-locale that transforms all strings automatically:

```javascript
// Pseudo-localization transformer
function pseudoLocalize(str) {
  const charMap = {
    'a': 'aa', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'ee',
    'i': 'ii', 'o': 'oo', 'u': 'uu',
    'A': 'AA', 'E': 'EE', 'I': 'II', 'O': 'OO', 'U': 'UU',
  };

  let result = '';
  let inPlaceholder = false;

  for (const char of str) {
    if (char === '{') inPlaceholder = true;
    if (char === '}') inPlaceholder = false;

    if (inPlaceholder || !charMap[char]) {
      result += char;
    } else {
      result += charMap[char];
    }
  }

  // Add 40% padding to simulate expansion
  const padding = '~'.repeat(Math.ceil(str.length * 0.4));
  return `[${result}${padding}]`;
}
```

The brackets make it immediately visible which strings are localized (bracketed) and which are hardcoded (not bracketed). The vowel doubling and padding simulate realistic text expansion. Placeholders inside curly braces are preserved so the string still renders correctly.

### Visual Regression Testing for RTL

Integrate RTL visual regression tests into the CI pipeline. Services like Percy or Chromatic capture every page or story in both LTR and RTL and flag differences above a threshold. The setup:

1. Render each page or story twice: once as-is, once with `dir="rtl"` and `lang="ar"` on the root element.
2. Snapshot both, and keep the RTL snapshot as its own baseline.
3. Fail the check when the difference exceeds a small ratio (about 1% of pixels), and send it for human review.

### Linting for i18n Compliance

ESLint and stylelint rules can enforce i18n best practices automatically:

- **stylelint-use-logical-spec**: Warns or errors when physical properties are used where logical equivalents exist.
- **eslint-plugin-formatjs**: Enforces that all user-facing strings go through the i18n framework, catching hardcoded strings.
- **Custom rules**: Detect concatenation patterns that produce untranslatable strings, flag `text-align: left` and `text-align: right`, and warn about fixed-width containers.

These linting rules convert i18n requirements from review-time discussions into automated enforcement, catching regressions before they reach code review.

## Summary Checklist

Before shipping an internationalized interface, verify:

1. All layout properties use CSS logical properties (no physical left/right for inline-direction spacing).
2. `dir="rtl"` on the root element produces correct layout without additional stylesheets.
3. Directional icons mirror correctly; universal icons do not mirror.
4. All user-generated content in mixed-direction contexts uses `<bdi>` or `unicode-bidi: isolate`.
5. All dates, numbers, currencies, and measurements use `Intl` formatters (JS) or Foundation formatters (Swift), never manual string concatenation.
6. Translation strings use ICU MessageFormat with proper plural rules for all target locales.
7. Text containers accommodate 200% expansion for short strings without clipping or overlap.
8. Font stacks include appropriate fallbacks for each target script.
9. CJK fonts use unicode-range subsetting or sliced loading to avoid multi-megabyte initial downloads.
10. Line height is adjusted per script family to prevent clipping of diacriticals and dense glyphs.
11. Pseudo-localization testing runs in CI to catch layout regressions before translations arrive.
12. Every translatable string includes a context description for translators.
