---
name: component
description: "Production component builder — generate complete, runnable UI components (30+ types) with 10 states, full accessibility, design tokens, animation, tests, and platform code (React/SwiftUI/CSS)."
argument-hint: "[component name and requirements]"
---

# Component — Production Component Builder

## Before running

This command needs a component name and its requirements.

If the user invoked it with nothing and no target is evident from the conversation or open files, ask for it in one plain-language question and stop. Do not invent a target and do not produce generic output in place of the real work — output about something imaginary reads as authoritative and is worthless.

If a target is evident from context, use it and say which one you picked.


Generate a production-ready, RUNNABLE UI component with complete state coverage, accessibility, design tokens, animation, and platform-specific code. Output is copy-paste ready — no placeholders, no TODOs.

## Supported Components (30+)

| Category | Components |
|----------|-----------|
| Actions | Button, IconButton, FAB, SplitButton, ButtonGroup, Link |
| Inputs | Input, Textarea, Select, Checkbox, Radio, Toggle/Switch, Slider, RangeSlider, DatePicker, TimePicker, FileUpload, ColorPicker, SearchInput, OTPInput |
| Display | Card, Avatar, Badge, Tag/Chip, Tooltip, Popover, Banner, Alert, Progress, Skeleton, Rating, Stat/Metric |
| Layout | Accordion, Tabs, Sidebar, Divider, Stepper, Breadcrumb, Pagination |
| Overlay | Modal/Dialog, Drawer/Sheet, Toast/Notification, DropdownMenu, ContextMenu, CommandPalette |
| Data | Table, DataGrid, List, TreeView, Timeline, Calendar |
| Navigation | NavBar, BottomTabs, TabBar, MegaMenu, SideNav |

## Builder Protocol

### Step 1 — Gather Context

**Required input:**
- Component name (e.g., "button," "modal," "date picker")

**Optional inputs (with defaults):**
- Platform: React/TypeScript + Tailwind (default) | SwiftUI | Vanilla CSS/HTML | All three
- Sector: neutral (determines trust signals, density, conventions)
- Size variants: sm, md (default), lg
- Design system: neutral tokens unless `.sumi/style.json` detected
- Animation: Framer Motion (optional, include if requested)
- User sophistication: intermediate (novice, intermediate, expert)
- Interaction frequency: moderate (daily-use vs. occasional)
- Cognitive context: focused (focused, browsing, stressed, relaxed)

**Auto-resolve:**
- Prior Sumi outputs: Check `/style` (`.sumi/style.json`), `/inspo` (`.sumi/refs/board.json`), `/benchmark`. Consume if available; note what is missing
- Sector conventions: Apply `sector-style-intelligence` if sector specified

---

## Platform-Aware Component Generation

Components must respect platform conventions. A button on iOS feels different from a button on web or Android. This section ensures every component generated matches the platform's native interaction model, visual language, and accessibility API.

### Platform Detection

Check project context to determine platform. If ambiguous, ask the user.

### Web Components (React + Tailwind)

For web, generate React + TypeScript + Tailwind with:

**Structure:**
- Functional component with TypeScript interface for props
- `forwardRef` for composability
- `className` prop merged with `cn()` utility for customization
- Slot pattern for compound components (e.g., `Card.Header`, `Card.Body`, `Card.Footer`)

**States (all 10 required):**
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size: 'sm' | 'md' | 'lg'
  loading?: boolean    // shows spinner, disables click
  disabled?: boolean   // reduced opacity, no pointer events
  // ... rest of props
}
```
- Default, Hover, Focus (focus-visible ring), Active/Pressed, Disabled, Loading (spinner + text), Error, Success, Empty (for data components), Skeleton (for async components)

**Interaction:**
- `transition-colors duration-150` for color changes
- `active:scale-[0.98]` for press feedback
- `focus-visible:ring-2 focus-visible:ring-offset-2` for keyboard focus
- `cursor-not-allowed opacity-50` for disabled

**Accessibility:**
- `role` attribute where semantic HTML isn't sufficient
- `aria-label`, `aria-describedby`, `aria-expanded`, `aria-pressed` as appropriate
- `aria-busy={loading}` during loading states
- Keyboard handlers: Enter/Space for buttons, Escape for dismissibles

**Test skeleton:**
```tsx
describe('ComponentName', () => {
  it('renders default state', () => {})
  it('renders loading state', () => {})
  it('renders disabled state', () => {})
  it('handles click', () => {})
  it('handles keyboard interaction', () => {})
  it('meets accessibility requirements', () => {})
})
```

### iOS Components (SwiftUI)

For iOS, generate SwiftUI views with:

**Structure:**
- Swift struct conforming to View
- `@Binding` for two-way data flow
- `@Environment` for system values (colorScheme, dynamicTypeSize)
- ViewModifier pattern for reusable styling
- `PreviewProvider` with multiple preview configurations

**Platform conventions:**
- 44pt minimum tap target (Apple HIG)
- SF Symbols for icons (specify symbol name)
- System colors: `.primary`, `.secondary`, `.accentColor`
- Haptic feedback: `UIImpactFeedbackGenerator(style: .medium)`
- Liquid Glass (iOS 26): `.glassEffect()` for translucent surfaces
- Continuous corner radius: `RoundedRectangle(cornerRadius: 12, style: .continuous)`
- Dynamic Type: `@ScaledMetric` for size values

**Accessibility:**
- `.accessibilityLabel("descriptive text")`
- `.accessibilityHint("what happens")`
- `.accessibilityAddTraits(.isButton)` for custom tap targets
- `.accessibilityValue()` for sliders/steppers
- Group related elements: `.accessibilityElement(children: .combine)`

### Android Components (Jetpack Compose)

For Android, generate Compose with:

**Structure:**
- `@Composable` function with parameter defaults
- Material 3 theming: `MaterialTheme.colorScheme`, `MaterialTheme.typography`
- State hoisting pattern: events up, state down
- `@Preview` annotations with multiple configurations

**Platform conventions:**
- 48dp minimum touch target
- Ripple indication on touch (default in Material 3)
- M3 Expressive shapes: `RoundedCornerShape(12.dp)` for containers, `CircleShape` for FABs
- Tonal elevation: `tonalElevation = 2.dp` instead of shadow
- Dynamic color: respect `dynamicDarkColorScheme(context)`

**Accessibility:**
- `Modifier.semantics { contentDescription = "..." }`
- `Modifier.clickable(onClickLabel = "action description")`
- `Role.Button`, `Role.Checkbox`, etc.
- Live region: `Modifier.semantics { liveRegion = LiveRegionMode.Polite }`

### Component Comparison Table

For components that exist across platforms, ensure consistent behavior:

| Aspect | Web (React) | iOS (SwiftUI) | Android (Compose) |
|--------|-------------|---------------|-------------------|
| Min tap target | 44px (WCAG) | 44pt (HIG) | 48dp (M3) |
| Focus indicator | ring-2 ring-offset-2 | System default | Ripple |
| Loading | Spinner component | ProgressView | CircularProgressIndicator |
| Haptic | N/A | UIImpactFeedback | HapticFeedbackConstants |
| Motion easing | cubic-bezier | .spring(response:) | M3 EmphasizedEasing |
| Dark mode | dark: prefix / CSS | @Environment colorScheme | isSystemInDarkTheme() |

---

### Step 2 — Generate State Matrix

Every component MUST handle all 10 states (where applicable):

| # | State | Description | Visual Treatment | ARIA |
|---|-------|-------------|-----------------|------|
| 1 | Default | Resting state | Base styling, full opacity | — |
| 2 | Hover | Cursor over (pointer devices) | Subtle bg shift or elevation; `@media (hover: hover)` guard | — |
| 3 | Focus | Keyboard focus | 2px+ focus ring with offset; high contrast | `focus-visible` |
| 4 | Active/Pressed | Being activated | Scale down (0.98), deeper color | — |
| 5 | Disabled | Not interactive | Opacity 0.38-0.5, `cursor-not-allowed`, no pointer events | `aria-disabled="true"` |
| 6 | Loading | Awaiting response | Inline spinner, disabled interaction | `aria-busy="true"` |
| 7 | Error | Validation failure | Error color border/text, error icon, message below | `aria-invalid="true"`, `aria-describedby` |
| 8 | Success | Action completed | Success color, checkmark animation, announcement | `aria-live="polite"` |
| 9 | Selected | Active selection in group | Distinct bg/border, checkmark or highlight | `aria-selected="true"` or `aria-checked="true"` |
| 10 | Dragging | Being dragged (if applicable) | Elevated shadow, slight rotation, ghost at origin | `aria-grabbed="true"` |

Not all states apply to every component. Mark which are applicable and which are N/A.

### Step 3 — Apply Design Principles

For every design decision, cite the law or heuristic:

| Decision Area | Principle | Application |
|---------------|-----------|-------------|
| Target size and padding | Fitts's Law | Min 44x44px touch, 48x48px for frequent actions; generous padding |
| Number of options visible | Hick's Law | Limit visible choices; group if >5; progressive disclosure |
| Visual distinction | Von Restorff Effect | Primary variant must be most visually distinct |
| Spatial grouping | Gestalt Proximity | Related controls close together; clear separation from unrelated |
| Familiar patterns | Jakob's Law | Match conventions from similar products users already know |
| Error prevention | H5 + Cognitive Load Theory | Constrain inputs, sensible defaults, confirm destructive actions |
| Default values | H5 (Error Prevention) | Pre-fill with most common/safest choice |
| Feedback timing | Doherty Threshold (<400ms) | System response feels instant; skeleton or optimistic UI if slower |
| Consistency | H4 (Consistency and Standards) | Same component looks and behaves the same everywhere |

### Step 4 — Build with Accessibility First

Every component MUST include:

1. **Semantic HTML**: Use native elements (`<button>`, `<input>`, `<dialog>`, `<nav>`) — never `<div onClick>`
2. **ARIA attributes**: Only where native semantics are insufficient
3. **Keyboard interaction pattern**:
   - Button: Enter/Space to activate
   - Input: standard text input behavior
   - Modal: Tab trap, Escape to close, focus restore on close
   - Dropdown: Arrow keys to navigate, Enter to select, Escape to close
   - Tabs: Arrow keys to switch, Tab to enter/exit tab list
   - Accordion: Enter/Space to toggle, Arrow keys between headers
4. **Focus management**: Visible focus ring (`focus-visible`), trap in modals, restore on close
5. **Color contrast**: 4.5:1 text, 3:1 UI components (AA); 7:1 text for AAA
6. **Motion respect**: `prefers-reduced-motion` fallback for every animation
7. **Screen reader**: `aria-live` announcements for dynamic state changes
8. **Touch targets**: >= 44x44px on mobile

### Step 5 — Apply Design Tokens

Use semantic token names throughout — never raw values:

```css
/* Component token consumption pattern */
.component {
  /* Surface */
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);

  /* Typography */
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);

  /* Spacing */
  padding: var(--space-component) var(--space-element);

  /* Elevation */
  box-shadow: var(--shadow-sm);

  /* Motion */
  transition: all var(--duration-fast) var(--easing-default);
}

.dark .component {
  background: var(--color-surface-primary); /* resolved to dark value */
}
```

Support light/dark via token switching. Respect density variants (compact, default, comfortable) via token tiers.

### Step 6 — Generate Platform Code

#### 6a — React/TypeScript + Tailwind (Primary Output)

Every React component MUST include:

```typescript
// Complete imports — no missing deps
import * as React from 'react';
import { cn } from '@/lib/utils'; // shadcn/ui class merge utility
import { cva, type VariantProps } from 'class-variance-authority';

// Variant definitions using CVA
const componentVariants = cva(
  'base-classes-here', // Base styles all variants share
  {
    variants: {
      variant: {
        default: 'default-variant-classes',
        destructive: 'destructive-classes',
        outline: 'outline-classes',
        ghost: 'ghost-classes',
      },
      size: {
        sm: 'size-sm-classes',
        md: 'size-md-classes',
        lg: 'size-lg-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Props interface with JSDoc
interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Whether the component is disabled */
  isDisabled?: boolean;
  // ... all props documented
}

// Component with forwardRef
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, isLoading, isDisabled, children, ...props }, ref) => {
    return (
      // Full implementation with:
      // - All state handling
      // - Tailwind responsive classes (mobile-first)
      // - Dark mode via dark: prefix
      // - ARIA attributes
      // - Keyboard handlers
      // - motion-safe: animations
    );
  }
);
Component.displayName = 'Component';

export { Component, componentVariants };
export type { ComponentProps };
```

#### 6b — SwiftUI (if requested)

```swift
import SwiftUI

struct ComponentName: View {
    // @Binding, @State, @Environment as needed
    // Accessibility modifiers
    // iOS 26 Liquid Glass support where appropriate
    // Dark mode via @Environment(\.colorScheme)
}
```

#### 6c — Vanilla CSS/HTML (if requested)

```html
<!-- Semantic HTML with ARIA -->
<!-- CSS custom properties for theming -->
<!-- Container queries for responsive -->
<!-- Logical properties for RTL -->
```

### Step 7 — Animation (Optional — Framer Motion)

If animation is requested or the component type warrants it:

```typescript
import { motion, AnimatePresence } from 'framer-motion';

const motionVariants = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

// Wrap with AnimatePresence for enter/exit
// Always include reducedMotion prop or useReducedMotion() hook
```

Standard animation recipes per component type:
- **Modal**: Backdrop fade + content scale-up from 0.95
- **Toast**: Slide in from edge + fade; slide out on dismiss
- **Dropdown**: Scale-y from 0.95 + opacity; origin at trigger
- **Accordion**: Height auto-animate with content fade
- **Tooltip**: Fade + slight translate toward trigger
- **Tabs**: Crossfade content; sliding indicator
- **Button press**: scale(0.98) on active

### Step 8 — Usage Examples (Storybook-style)

Provide usage examples covering every variant and key states:

```typescript
// Default usage
<Component>Label</Component>

// All variants
<Component variant="default">Default</Component>
<Component variant="destructive">Delete</Component>
<Component variant="outline">Cancel</Component>
<Component variant="ghost">More</Component>

// All sizes
<Component size="sm">Small</Component>
<Component size="md">Medium</Component>
<Component size="lg">Large</Component>

// States
<Component isLoading>Saving...</Component>
<Component isDisabled>Disabled</Component>

// With icons
<Component><Icon /> With Icon</Component>

// Composition (if compound)
<Component.Root>
  <Component.Trigger />
  <Component.Content />
</Component.Root>
```

### Step 9 — Test Skeleton

Provide a test file covering critical interactions:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './component';

describe('Component', () => {
  it('renders in default state', () => {
    render(<Component>Label</Component>);
    expect(screen.getByRole('button', { name: 'Label' })).toBeInTheDocument();
  });

  it('handles click interaction', async () => {
    const onClick = vi.fn();
    render(<Component onClick={onClick}>Click me</Component>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire when disabled', async () => {
    const onClick = vi.fn();
    render(<Component isDisabled onClick={onClick}>Disabled</Component>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Component isLoading>Loading</Component>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('is keyboard accessible', async () => {
    const onClick = vi.fn();
    render(<Component onClick={onClick}>Press me</Component>);
    screen.getByRole('button').focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies variant classes', () => {
    render(<Component variant="destructive">Delete</Component>);
    // Assert destructive styling applied
  });
});
```

Adapt the test structure to the component type (e.g., input tests check value changes, modal tests check focus trap).

## Output Format

When invoked, produce the following structure:

```
## Component: [Name]

### Context
- **Platform**: [React/TypeScript + Tailwind | SwiftUI | CSS/HTML]
- **Sector**: [sector or neutral]
- **Variants**: [list]
- **Sizes**: [sm, md, lg]

### State Matrix
| # | State | Applicable | Visual Treatment | ARIA |
|---|-------|-----------|-----------------|------|
| 1 | Default | Yes | [treatment] | — |
| 2 | Hover | Yes | [treatment] | — |
| ... | | | | |

### Design Decision Rationale
| Decision | Choice | Principle | Why |
|----------|--------|-----------|-----|
| [decision] | [choice] | [principle] | [reasoning] |

### Production Code

#### component.tsx
[FULL React/TypeScript + Tailwind component]
[Complete imports, CVA variants, forwardRef, all states, ARIA, keyboard, responsive, dark mode]

#### component.test.tsx
[Test skeleton covering: render, click, disabled, loading, keyboard, variants]

#### component.stories.tsx (usage examples)
[All variants, sizes, states, compositions]

### SwiftUI Implementation (if requested)
[Complete SwiftUI view]

### CSS/HTML Implementation (if requested)
[Semantic HTML + modern CSS]

### Animation Recipes (if applicable)
[Framer Motion variants with reduced-motion fallback]

### Accessibility Checklist
- [ ] Uses semantic HTML element (not div with onClick)
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape, Arrows as applicable)
- [ ] Screen reader announces state changes
- [ ] Focus indicator visible (2px+ ring, high contrast)
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Touch target >= 44x44px
- [ ] Motion respects prefers-reduced-motion
- [ ] Disabled state uses aria-disabled, not just visual
- [ ] Error state uses aria-invalid + aria-describedby
- [ ] Loading state uses aria-busy

### Design Token Dependencies
| Token | Usage | Default Value |
|-------|-------|--------------|
| --color-action-primary | Primary variant bg | blue-600 |
| --color-text-on-action | Primary variant text | white |
| [more tokens...] | | |

### Prior Output Integration
- **`/style` consumed**: [Yes/No — what was used]
- **`/style` consumed**: [Yes/No — what was used]
- **`/benchmark` consumed**: [Yes/No — what was used]
- **Missing context**: [what would improve this]
```

## Component-Specific Recipes

Each component type has unique requirements beyond the general protocol. When building a specific component, follow these additional guidelines.

### Button

**Variants**: default, destructive, outline, ghost, link
**Sizes**: sm (h-8 px-3 text-xs), md (h-10 px-4 text-sm), lg (h-12 px-6 text-base), icon (h-10 w-10)
**States**: all 10 (default through dragging — dragging is N/A)
**Keyboard**: Enter/Space to activate
**ARIA**: Native `<button>` element; `aria-disabled` when disabled; `aria-busy` when loading

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 motion-safe:active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400',
        destructive: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400',
        outline: 'border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
        link: 'text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);
```

### Input

**Variants**: default, with-icon, with-addon, with-clear
**States**: default, hover, focus (ring), active, disabled, error (red border + message), success (green check), loading (spinner in trailing position)
**Keyboard**: Standard text input behavior
**ARIA**: `<input>` with `aria-invalid`, `aria-describedby` (links to error/help text), `aria-required`

Key pattern: Always associate `<label>` with input via `htmlFor`/`id`. Never use placeholder as the only label. Show error messages below the input with `role="alert"`.

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isLoading?: boolean;
}
```

### Modal / Dialog

**Sizes**: sm (max-w-sm), md (max-w-lg), lg (max-w-2xl), full (max-w-4xl)
**States**: open, closed (AnimatePresence), loading (content loading within)
**Keyboard**: Escape to close, Tab trap within modal, focus first focusable on open, restore focus on close
**ARIA**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (heading), `aria-describedby` (description)

Key pattern: Use native `<dialog>` element where supported, or `@radix-ui/react-dialog` for cross-browser. Backdrop click closes (configurable). Prevent body scroll when open.

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  preventClose?: boolean; // Disable backdrop click and Escape
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

### Toast / Notification

**Variants**: info, success, warning, error
**Behavior**: Auto-dismiss (5s default, configurable), stack from bottom-right (configurable position), swipe to dismiss on mobile, pause timer on hover
**Keyboard**: Focus via F6 (or custom shortcut), Tab between toasts, Escape to dismiss
**ARIA**: `role="alert"` for errors, `role="status"` for info/success, `aria-live="polite"` (or "assertive" for errors)

Key pattern: Use a toast provider/context pattern. Queue management — max 3 visible, new ones queue. Position options: top-right, top-center, bottom-right, bottom-center.

### Dropdown Menu

**Behavior**: Trigger opens menu, items are navigable, selection closes menu
**Keyboard**: Enter/Space to open, Arrow Down/Up to navigate items, Enter to select, Escape to close, type-ahead to jump to matching item
**ARIA**: `role="menu"` on container, `role="menuitem"` on items, `aria-expanded` on trigger, `aria-haspopup="true"` on trigger

Key pattern: Position with collision detection (flip if near viewport edge). Support nested submenus with Arrow Right/Left. Separator items with `role="separator"`. Disabled items with `aria-disabled`.

### Tabs

**Behavior**: Click tab to switch content panel, indicator animates to active tab
**Keyboard**: Arrow Left/Right to switch tabs (within tablist), Tab to move into panel content, Home/End to jump to first/last tab
**ARIA**: `role="tablist"` on container, `role="tab"` on each tab, `role="tabpanel"` on each panel, `aria-selected="true"` on active tab, `aria-controls` links tab to panel, `id` links panel to tab via `aria-labelledby`

```typescript
interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; disabled?: boolean }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'enclosed';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

### Accordion

**Behavior**: Click header to expand/collapse panel, single or multiple panels open
**Keyboard**: Enter/Space to toggle, Arrow Up/Down between headers, Home/End to first/last header
**ARIA**: `aria-expanded` on trigger, `aria-controls` links trigger to panel, `role="region"` on panel with `aria-labelledby`

### Table / DataGrid

**Variants**: simple, striped, hoverable, bordered, condensed
**Features**: Sortable columns, resizable columns, row selection (checkbox), pagination, sticky header, horizontal scroll on mobile
**Keyboard**: Arrow keys for cell navigation (if interactive), Tab between interactive elements within rows
**ARIA**: `role="grid"` for interactive tables, `aria-sort` on sortable column headers, `aria-selected` on selected rows, `aria-rowcount`/`aria-colcount` for virtual tables

```typescript
interface Column<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  cell?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}
```

### Select / Combobox

**Behavior**: Click to open option list, type to filter (combobox variant), select option to close
**Keyboard**: Enter/Space to open, Arrow Up/Down to navigate, Enter to select, Escape to close, type-ahead for jump (select) or filter (combobox)
**ARIA**: `role="listbox"` on option list, `role="option"` on items, `aria-expanded`, `aria-activedescendant` for current highlight, `aria-selected` on chosen option

### File Upload

**Variants**: dropzone (drag-and-drop area), button (click to browse), inline (small trigger)
**States**: idle, drag-over (highlight), uploading (progress bar), success (file preview), error (retry)
**Keyboard**: Enter/Space to open file picker, Escape to cancel
**ARIA**: `aria-label="Upload file"`, progress bar with `role="progressbar"` + `aria-valuenow`

Key pattern: Show file preview (image thumbnail, file icon + name + size). Support multiple files. Show individual upload progress. Allow removal of uploaded files. Validate file type and size before upload.

### Command Palette

**Behavior**: Global keyboard shortcut (Cmd+K / Ctrl+K) to open, type to search, arrow navigate, Enter to execute
**Keyboard**: Cmd/Ctrl+K to open, type to filter, Arrow Up/Down to navigate, Enter to select, Escape to close
**ARIA**: `role="combobox"` on input, `role="listbox"` on results, `aria-activedescendant`, `aria-expanded`

Key pattern: Group results by category (pages, actions, settings). Show keyboard shortcut hints. Recent/frequent items at top. Fuzzy search matching.

## Compound Component Patterns

For complex components, use the compound component pattern:

```typescript
// Compound pattern example — Select
const SelectRoot = ({ children, value, onValueChange }: SelectRootProps) => {
  const [open, setOpen] = useState(false);
  return (
    <SelectContext.Provider value={{ open, setOpen, value, onValueChange }}>
      {children}
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { open, setOpen, value } = useSelectContext();
    return (
      <button
        ref={ref}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
        className={cn('...', className)}
        {...props}
      >
        {children || value}
      </button>
    );
  }
);

const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSelectContext();
  if (!open) return null;
  return (
    <div role="listbox" className="...">
      {children}
    </div>
  );
};

const SelectItem = ({ value, children }: SelectItemProps) => {
  const { value: selectedValue, onValueChange, setOpen } = useSelectContext();
  return (
    <div
      role="option"
      aria-selected={value === selectedValue}
      onClick={() => { onValueChange(value); setOpen(false); }}
      className="..."
    >
      {children}
    </div>
  );
};

// Usage:
// <Select.Root value={v} onValueChange={setV}>
//   <Select.Trigger>Choose...</Select.Trigger>
//   <Select.Content>
//     <Select.Item value="a">Option A</Select.Item>
//     <Select.Item value="b">Option B</Select.Item>
//   </Select.Content>
// </Select.Root>
```

## Quality Checklist

Before delivering any component, verify:

### Code Quality
- [ ] All imports present and valid
- [ ] No `any` types — everything typed
- [ ] `forwardRef` used for DOM-wrapping components
- [ ] `displayName` set on forwardRef components
- [ ] Props interface exported for consumer use
- [ ] CVA used for variant management
- [ ] `cn()` utility used for class merging
- [ ] No inline styles — Tailwind only

### Accessibility Quality
- [ ] Semantic HTML element used (not div with onClick)
- [ ] All ARIA attributes correct for component type
- [ ] Keyboard interaction matches WAI-ARIA Authoring Practices
- [ ] Focus indicator visible and high-contrast
- [ ] Screen reader announces state changes
- [ ] Disabled state prevents interaction AND is announced
- [ ] Error state is programmatically associated with control

### Visual Quality
- [ ] All 10 states have distinct visual treatment (where applicable)
- [ ] Dark mode covers every visual element
- [ ] Hover state guarded with `@media (hover: hover)` or Tailwind hover
- [ ] Active/pressed feedback is immediate
- [ ] Animations respect prefers-reduced-motion
- [ ] Touch targets >= 44x44px

### API Quality
- [ ] Props API is minimal but sufficient
- [ ] Sensible defaults for all optional props
- [ ] Variant and size props use string unions (not booleans for >2 options)
- [ ] Callback props follow `on[Event]` naming
- [ ] Component extends native HTML attributes where appropriate
- [ ] Ref forwarding works correctly

## Cross-References

When building components, draw implementation patterns from:
- `component-patterns-code` — Platform-specific cookbook patterns (React, SwiftUI, CSS)
- `cognitive-psychology-ux` — Fitts's Law (target sizing), Hick's Law (option count), Von Restorff
- `accessibility-inclusive-design` — WCAG compliance, ARIA patterns, focus management
- `design-systems-architecture` — Token architecture, component API design, variant systems
- `interaction-motion-design` — Animation recipes, micro-interactions, haptics
- `performance-states-patterns` — Loading, error, empty, skeleton states
- `sector-style-intelligence` — Sector-specific conventions, trust signals, density norms
- `nng-ux-heuristics` — Heuristic grounding of component decisions
- `ui-pattern-intelligence` — 200+ UI patterns, anti-pattern encyclopedia
- `platform-visual-standards` — iOS 26 Liquid Glass, M3 Expressive, modern CSS
- `design-token-presets` — Ready-to-deploy token systems by industry
- `form-design-encyclopedia` — Form patterns, input types, validation strategies
- `animation-recipe-library` — Production animation recipes (CSS/Framer Motion)
- `shadow-elevation-density` — Shadow scales, elevation hierarchy, density modes
- `icon-illustration-systems` — Icon libraries, SVG implementation

## Next Step

**Next** -> `/page` — Compose full pages from your components and screens

**Alternatives**:
- `/screen` — Build a complete screen from screen type templates
- `/generate` — AI-powered design asset generation
- `/roast` — Jump to VALIDATE to critique what you have built
- `/sumi` — See the full command journey
