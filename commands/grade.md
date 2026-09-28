---
name: grade
description: "Visual quality scoring — Awwwards-calibrated 10-dimension assessment, designer DNA match, canonical rule compliance, production quality verdict."
argument-hint: "[design, screenshot, or file to score]"
---

# Grade — Visual Design Quality Score

## Before running

This command needs a design, screenshot, or file to score.

If the user invoked it with nothing and no target is evident from the conversation or open files, ask for it in one plain-language question and stop. Do not invent a target and do not produce generic output in place of the real work — output about something imaginary reads as authoritative and is worthless.

If a target is evident from context, use it and say which one you picked.


Score any UI's visual design quality across 10 weighted dimensions, calibrated to Awwwards and international design award standards. Every score is justified with specific observations, benchmarked against world-class products, and paired with actionable prescriptions that include exact values.

**Accepts**: Screenshot, code files, URL description, or Figma reference. Code + screenshot together gives highest-fidelity scoring. Do NOT score hypothetically without visual evidence.

---

## Scoring Protocol

### Step 0: Gather Context

1. **Input**: What was provided (screenshot, code, URL, Figma)
2. **What the app does**: Product description, purpose, target users
3. **Sector**: Auto-detect from content/code, or ask. Sector determines what "good" looks like — fintech and a children's game have different benchmarks
4. **Platform**: Web, iOS, Android, or cross-platform
5. **Prior Sumi outputs**: Consume `/style`, `/tokens`, `/palette`, `/type` if available. Score against the intended direction
6. **Reference Board**: If `.sumi/refs/board.json` exists, grade side by side with the references per `reference-intelligence/references/comparison-protocol.md`: report `Build | Best ref | Δ` and a verdict (clears the wall / below the wall / clone risk). No board → say the grade is uncalibrated

### Step 1: Visual Inventory

Catalog every visual element present:

**Colors**: List every distinct color observed. Note palette structure (or lack thereof). Count unique colors. Identify primary, secondary, semantic usage.

**Typography**: List every font observed (or inferred from code). Note size variations, weight usage, hierarchy levels. Count distinct type styles.

**Spacing**: Note spacing consistency or inconsistency. Identify apparent base unit (or lack of one). Note density.

**Shapes**: Border radii observed, shape consistency across components, icon style.

**Imagery**: Photos, illustrations, decorative elements — quality, treatment consistency.

**Icons**: Style (outlined/filled/mixed), consistency, grid adherence.

**Motion** (if code available): Transitions, animations, easing curves, durations.

**Elevation**: Shadow usage, depth layering, consistency.

**Visual language assessment**: Is there a coherent visual language? Intentional or ad hoc?

### Step 2: 10-Dimension Scoring

Score each dimension 1-10. Be honest — most production apps score 5-7. Scores of 8+ are rare and reserved for genuinely exceptional work. Scores below 4 indicate fundamental problems.

For EACH dimension, provide ALL of the following:
1. **Score** (1-10): Whole numbers only
2. **What's working**: Minimum 2 specific positive observations
3. **What's failing**: Minimum 2 specific negative observations (unless score is 9+)
4. **Benchmark**: Named product that scores 9/10 in this dimension + what they do that this UI does not
5. **Priority fix**: Single most impactful improvement with specific values

**The 10 dimensions**:

| # | Dimension | Weight | What It Measures |
|---|-----------|--------|------------------|
| 1 | **Typography** | 15% | Hierarchy clarity, readability, vertical rhythm, font selection, weight discipline, line-height, letter-spacing, fluid scaling, platform adherence |
| 2 | **Color** | 12% | Palette harmony, contrast ratios, semantic usage, cohesion across components, dark mode quality, color blindness consideration, accent restraint |
| 3 | **Spacing** | 12% | Token consistency, breathing room, density for sector, vertical rhythm, component padding, section margins, grid alignment, responsive adaptation |
| 4 | **Composition** | 12% | Grid alignment, visual weight distribution, balance, focal point hierarchy, whitespace, content grouping (Gestalt proximity), alignment consistency, responsive reflow |
| 5 | **Imagery** | 8% | Photo/illustration quality, relevance, treatment consistency, art direction, placeholder quality, responsive handling, loading treatment |
| 6 | **Iconography** | 8% | Style consistency, clarity of meaning, size consistency, grid adherence, stroke width, optical alignment, icon-to-label relationship |
| 7 | **Motion** | 8% | Purpose (communicates or decorates?), timing, easing quality, choreography, restraint, reduced motion support, state transition smoothness |
| 8 | **Polish** | 10% | Pixel perfection, state coverage (hover/focus/active/disabled/loading/error/empty/skeleton), edge cases, detail work, interactive feedback, no glitches |
| 9 | **Coherence** | 8% | Visual language unity across screens, token consumption consistency, pattern language consistency, brand expression, no "franken-design" |
| 10 | **Craft** | 7% | Overall intentionality, care, mastery. Does this feel like every pixel was considered? Does the whole exceed the sum of parts? |

### Step 3: Weighted Overall Score

```
Overall = (Typography * 0.15) + (Color * 0.12) + (Spacing * 0.12) +
          (Composition * 0.12) + (Imagery * 0.08) + (Iconography * 0.08) +
          (Motion * 0.08) + (Polish * 0.10) + (Coherence * 0.08) +
          (Craft * 0.07)
```

**Quality tier**:
- **< 4.0**: Needs Redesign — fundamental visual problems, not shippable
- **4.0-5.4**: Amateur — functional but visually weak, typical of undesigned vibe-coded apps
- **5.5-6.9**: Competent — acceptable but generic, no visual distinction
- **7.0-8.4**: Professional — solid visual quality, competitive with good SaaS products
- **8.5-10.0**: World-Class — exceptional craft, award-worthy, top 1% of products

**Awwwards equivalent**: Map to Awwwards 4-criteria system (Design, Usability, Creativity, Content — each 1-10). Estimate total score. Note: Awwwards skews toward marketing sites; adjust for product/app context.

### Step 4: Designer DNA Match

Identify which famous designer, studio, or design team this most resembles in approach and aesthetic:

- **Primary match**: [Designer/Studio name] — [Why: specific visual qualities that match]
- **Secondary match**: [Designer/Studio name] — [Why]
- **Aspirational match**: If this design were elevated to its full potential, which designer's work would it resemble?

Draw from the `designer-pattern-library.md` reference. Examples: Dieter Rams (functional minimalism), Jony Ive (material honesty), Tobias van Schneider (bold monochrome + accent), Stripe design team (engineering precision + warmth), Linear design team (dark mode craft + motion).

### Step 5: Canonical Rule Compliance

Check against the 70 canonical design rules from `canonical-design-rules.md`. Flag the top rules being violated and the top rules being followed well:

**Rules followed** (top 5):
| Rule # | Rule Name | Evidence |
|--------|-----------|----------|
| [N] | [Rule name] | [How this design follows it] |

**Rules violated** (top 5):
| Rule # | Rule Name | Violation | Fix |
|--------|-----------|-----------|-----|
| [N] | [Rule name] | [What is wrong] | [Specific fix with values] |

### Step 6: Issue Priority Ranking

Rank ALL visual issues by impact * effort:

**P0 — Critical** (makes the design look amateur):
- Issues that immediately signal "not designed by a designer"
- These destroy credibility on first impression

**P1 — High Impact** (prevents professional quality):
- Issues that cap the design at "competent" level
- Fixing these moves the score from 5-6 range to 7-8 range

**P2 — Polish** (prevents world-class quality):
- Issues that separate good from great
- Fixing these moves the score from 7-8 range to 8.5+ range

**P3 — Delight** (opportunities for exceptional craft):
- Not problems but opportunities
- Micro-interactions, Easter eggs, exceptional empty states, crafted transitions

### Step 7: Visual Upgrade Roadmap

For each P0-P2 issue, provide ALL of the following:

1. **What's wrong**: Specific observation with exact location/component
2. **What world-class looks like**: Named product that does this exceptionally
3. **How to fix**: Specific values — exact colors (hex/oklch), exact sizes (px/rem), exact spacing, exact timing (ms). Not "make it bigger" but "increase to 18px with 28px line-height"
4. **Canonical rule**: Citation from `canonical-design-rules.md`
5. **Designer reference**: Who would solve this differently (from `designer-pattern-library.md`)
6. **Effort estimate**: Quick win (<1hr) | Medium (1-4hr) | Large (4hr+) | Strategic (days)
7. **Sumi command**: Which `/command` addresses this issue

### Step 8: Score Projection

If all P0 fixes applied: **[X.X/10]** (from [current])
If all P0 + P1 fixes applied: **[X.X/10]**
If all P0 + P1 + P2 fixes applied: **[X.X/10]**

### Step 9: Before/After Comparison (if redesigning)

If the user is comparing a redesign against an original, provide:

| Dimension | Before | After | Delta | Assessment |
|-----------|--------|-------|-------|------------|
| Typography | X/10 | X/10 | +/-N | [improved/regressed/unchanged] |
| ... | ... | ... | ... | ... |

**Overall**: [Before X.X] -> [After X.X] — Net change: [+/-X.X]

Highlight:
- Dimensions that improved
- Dimensions that regressed (this is critical — redesigns can lose qualities)
- Trade-offs made (e.g., gained polish but lost personality)

---

## Output Format

```
## Visual Grade: [App/Design Name]

### Overview
- **App**: [name/description]
- **Sector**: [detected/specified]
- **Platform**: [platform]
- **Input analyzed**: [what was examined]
- **Prior Sumi context**: [consumed or "none"]

---

### Visual Inventory
**Colors**: [N] unique — [key colors with hex]
**Typography**: [N] type styles — [fonts, sizes]
**Spacing**: [base unit or "inconsistent"] — [density]
**Shapes**: [radii] — [consistency]
**Imagery**: [type and quality]
**Icons**: [style, consistency]
**Motion**: [present/absent, quality]
**Elevation**: [shadow usage]
**Visual Language**: [coherent/fragmented]

---

### 10-Dimension Scores

| # | Dimension | Weight | Score | Tier | Top Issue |
|---|-----------|--------|-------|------|-----------|
| 1 | Typography | 15% | X/10 | [tier] | [top issue] |
| 2 | Color | 12% | X/10 | [tier] | [top issue] |
| 3 | Spacing | 12% | X/10 | [tier] | [top issue] |
| 4 | Composition | 12% | X/10 | [tier] | [top issue] |
| 5 | Imagery | 8% | X/10 | [tier] | [top issue] |
| 6 | Iconography | 8% | X/10 | [tier] | [top issue] |
| 7 | Motion | 8% | X/10 | [tier] | [top issue] |
| 8 | Polish | 10% | X/10 | [tier] | [top issue] |
| 9 | Coherence | 8% | X/10 | [tier] | [top issue] |
| 10 | Craft | 7% | X/10 | [tier] | [top issue] |

**Overall Visual Score: [X.X/10] — [Quality Tier]**
**Awwwards Equivalent: ~[X.X]/10**

---

### Dimension Deep-Dives

#### 1. Typography — [X/10]
**Working**: [specific positives]
**Failing**: [specific negatives]
**Benchmark**: [Product] scores 9/10 because [reason]
**Priority fix**: [single most impactful improvement with exact values]

#### 2. Color — [X/10]
[same structure for all 10 dimensions]

---

### Designer DNA
- **Primary match**: [Designer/Studio] — [why]
- **Secondary match**: [Designer/Studio] — [why]
- **Aspirational**: [Designer/Studio] — [what this design could become]

---

### Canonical Rule Compliance

**Rules followed well**:
| Rule # | Rule | Evidence |
|--------|------|----------|

**Rules violated**:
| Rule # | Rule | Violation | Fix |
|--------|------|-----------|-----|

---

### Visual Issues by Priority

#### P0 — Critical
[Issues with location, observation, and fix with exact values]

#### P1 — High Impact
[Issues]

#### P2 — Polish
[Issues]

#### P3 — Delight Opportunities
[Opportunities]

---

### Upgrade Roadmap

| # | Priority | Dimension | Issue | Fix (with values) | Rule | Designer Ref | Effort | Command |
|---|----------|-----------|-------|--------------------|------|-------------|--------|---------|

---

### Score Projection
- P0 fixes applied: **[X.X/10]**
- P0 + P1 fixes: **[X.X/10]**
- P0 + P1 + P2 fixes: **[X.X/10]**

---

### Next Steps
1. [Highest-impact fix — specific]
2. [Second fix — specific]
3. [Third fix — specific]

**Recommended command sequence**:
-> `/style` — Generate/update visual direction
-> `/tokens` — Formalize tokens to fix coherence
-> `/component [name]` — Rebuild weakest-scoring components
-> `/grade` — Re-run to measure improvement
```

---

## Quality Gates

The output MUST include:
- [ ] All 10 dimensions scored with specific observations (minimum 2 working + 2 failing per dimension)
- [ ] Named benchmark product for every dimension
- [ ] Weighted overall score computed correctly using the formula
- [ ] Quality tier label applied correctly
- [ ] Awwwards equivalent estimated
- [ ] Designer DNA match with primary, secondary, and aspirational
- [ ] Canonical rule compliance (top 5 followed, top 5 violated)
- [ ] Priority-ranked issues across P0-P3 levels
- [ ] Every prescription includes specific values (hex, px, ms — not "make it better")
- [ ] Canonical design rule citation for every P0 and P1 prescription
- [ ] Designer reference for P0 prescriptions
- [ ] Effort estimate for every prescription
- [ ] Sumi command for every prescription
- [ ] Upgrade roadmap table sorted by priority
- [ ] Score projection showing expected score after each priority tier

The output MUST NOT include:
- Vague feedback ("could be better", "needs work") — every finding must be specific
- Scores without justification — every score must cite what is present and what is missing
- Recommendations without benchmarks — every upgrade must reference a product that does it well
- Inflated scores — most production apps score 5-7. Be honest
- Prescriptions without specific values — "increase contrast" is not acceptable; "change text from #999 to #555 on #fff (ratio: 7.0:1)" is
- Hypothetical scoring — require visual evidence (code, screenshot, or URL description)

---

## Cross-References

When scoring visual design, draw knowledge from:
- `visual-design-mastery` -> `visual-scoring-framework.md` — Scoring rubric and dimension definitions
- `visual-design-mastery` -> `designer-pattern-library.md` — Designer references and benchmark comparisons
- `visual-design-mastery` -> `canonical-design-rules.md` — Rule citations for prescriptions
- `visual-design-mastery` -> `color-mastery.md` — Color harmony evaluation, contrast verification
- `visual-design-mastery` -> `typography-mastery.md` — Type scale evaluation, readability assessment
- `visual-design-mastery` -> `composition-mastery.md` — Layout and spacing evaluation
- `color-palette-library` — Palette quality benchmarks
- `typography-pairing-recipes` — Type pairing quality assessment
- `shadow-elevation-density` — Elevation and density assessment
- `ui-pattern-intelligence` — Pattern quality and benchmark products
- `sector-style-intelligence` — Sector-specific visual expectations
- `accessibility-inclusive-design` — WCAG contrast and motion requirements
- `interaction-motion-design` — Motion quality evaluation
- `cognitive-psychology-ux` — Perception science grounding

---

## Next Steps

After `/grade`:
- `/style` — Generate or revise visual direction based on findings
- `/tokens` — Formalize design tokens to fix coherence issues
- `/palette` — Fix color issues with a proper palette
- `/type` — Fix typography issues with a proper type system
- `/component [name]` — Rebuild lowest-scoring components
- `/audit` — Full comprehensive audit (heuristic + cognitive + flow + fortification)
- `/roast` — Quick opinionated critique

---

## Design Quality Score (DQS) — 0-100

Like Lighthouse for performance, DQS gives a single number that represents the overall design quality of any UI. This score complements the existing 10-dimension 1-10 scoring system by providing a normalized 0-100 scale that is easier to communicate, track over time, and compare across products.

**Relationship to 10-Dimension Score**: The 10-dimension score (Step 2-3 above) provides granular craft assessment. DQS reframes the evaluation into 7 functional categories optimized for actionability. Both scores should be reported together — the 10-dimension score for design craft analysis, DQS for the universal quality benchmark.

### Scoring Formula

DQS = weighted average of 7 category scores:

| Category | Weight | What It Measures |
|----------|--------|-----------------|
| Visual Hierarchy | 20% | Information architecture, visual prioritization, scanning patterns |
| Typography System | 15% | Type scale, pairing, readability, fluid sizing, hierarchy |
| Color System | 15% | Palette harmony, semantic usage, contrast, dark mode |
| Spacing & Layout | 15% | Grid consistency, rhythm, responsive behavior, breathing room |
| Component Quality | 15% | State coverage, interaction feedback, consistency across components |
| Accessibility | 10% | WCAG 2.2 AA compliance, keyboard nav, screen reader, ARIA |
| Design System Coherence | 10% | Token usage, consistency, scalability, maintainability |

### Score Ranges

| Score | Grade | Badge Color | Meaning |
|-------|-------|-------------|---------|
| 90-100 | A+ | Green (#22C55E) | Production excellence — ships at top-tier quality |
| 80-89 | A | Green (#22C55E) | Strong design — minor polish items only |
| 70-79 | B | Yellow (#EAB308) | Good foundation — some consistency/accessibility gaps |
| 60-69 | C | Orange (#F97316) | Functional but needs design attention |
| 50-59 | D | Red (#EF4444) | Significant quality issues — run /fix |
| 0-49 | F | Red (#EF4444) | AI slop — needs complete transformation |

### Category Scoring Rubric

For each category, score 0-100 based on specific criteria:

**Visual Hierarchy (0-100)**:
- 90+: Crystal clear what matters most. F-pattern or Z-pattern scanning. One primary CTA per viewport. Progressive disclosure.
- 70-89: Clear primary/secondary distinction. Minor competing elements.
- 50-69: Some hierarchy exists but multiple elements compete for attention.
- 30-49: Flat hierarchy — everything at same visual weight.
- 0-29: Chaotic — no discernible reading order.

**Typography System (0-100)**:
- 90+: Professional type scale (mathematical ratio), fluid sizing with clamp(), intentional font pairing, proper line heights per size, letter-spacing adjusted per size.
- 70-89: Good scale with minor inconsistencies. Reasonable font choice.
- 50-69: Basic sizing hierarchy but no systematic scale. Generic fonts.
- 30-49: Random font sizes, no pairing logic, poor readability.
- 0-29: Single font/size/weight throughout, or chaotic sizing.

**Color System (0-100)**:
- 90+: Custom palette with 10-step scales, semantic tokens, APCA-compliant contrast, thoughtful dark mode, consistent application.
- 70-89: Good palette with minor gaps. Mostly semantic usage.
- 50-69: Functional colors but default/generic palette (Tailwind defaults).
- 30-49: Random color values, no semantic meaning, contrast issues.
- 0-29: Default purple/indigo on white. Color used inconsistently.

**Spacing & Layout (0-100)**:
- 90+: Consistent grid system, mathematical spacing scale, responsive breakpoints, container queries, proper section rhythm.
- 70-89: Good spacing with minor inconsistencies. Responsive works.
- 50-69: Basic spacing but not systematic. Some responsive issues.
- 30-49: Inconsistent spacing, cramped or wasteful. Poor mobile layout.
- 0-29: No spacing system. Layout breaks across viewports.

**Component Quality (0-100)**:
- 90+: All states covered (default, hover, focus, active, disabled, loading, error, empty, success). Smooth transitions. Consistent patterns.
- 70-89: Most states covered. Transitions present. Minor gaps.
- 50-69: Basic hover states. Some missing states (loading, empty, error).
- 30-49: Minimal interaction feedback. Many missing states.
- 0-29: No interactive states beyond default. Dead clicks.

**Accessibility (0-100)**:
- 90+: WCAG 2.2 AA compliant. Full keyboard nav. ARIA implemented correctly. Skip links. Focus management. Reduced motion support.
- 70-89: Good accessibility with minor gaps. Most ARIA correct.
- 50-69: Basic accessibility. Some labels, some contrast compliance.
- 30-49: Significant accessibility issues. Missing labels, poor contrast.
- 0-29: Inaccessible. No ARIA, no keyboard support, contrast failures.

**Design System Coherence (0-100)**:
- 90+: Full token system. Every value references a token. Consistent naming. Scalable architecture.
- 70-89: Good token usage with some hardcoded values.
- 50-69: Partial tokens. Mix of tokens and hardcoded values.
- 30-49: Mostly hardcoded. Inconsistent patterns.
- 0-29: No tokens. Every value is arbitrary.

### DQS Output Format

Include the following block in the grade output, after the 10-Dimension Scores:

```
### Design Quality Score (DQS)

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Visual Hierarchy | 20% | [X]/100 | [X * 0.20] |
| Typography System | 15% | [X]/100 | [X * 0.15] |
| Color System | 15% | [X]/100 | [X * 0.15] |
| Spacing & Layout | 15% | [X]/100 | [X * 0.15] |
| Component Quality | 15% | [X]/100 | [X * 0.15] |
| Accessibility | 10% | [X]/100 | [X * 0.10] |
| Design System Coherence | 10% | [X]/100 | [X * 0.10] |

**DQS: [SCORE]/100 — Grade [LETTER] [BADGE_COLOR]**
```

---

### Badge Generation

If the design scores 80+ (Grade A or A+), generate a "Designed with Sumi" badge.

**Markdown badge** (for README):
```markdown
![Design Quality Score](https://img.shields.io/badge/DQS-[SCORE]-[COLOR]?style=flat-square&label=Chef%20Sumi)
```

Where `[COLOR]` maps to: `22C55E` for green (80+), `EAB308` for yellow (70-79), `F97316` for orange (60-69), `EF4444` for red (below 60).

**Badge tiers**:
- Score 90+: `DQS 95 — A+` on green — output the badge markdown
- Score 80-89: `DQS 84 — A` on green — output the badge markdown
- Score 70-79: `DQS 73 — B` on yellow — no badge recommended, suggest `/fix` first
- Below 70: No badge generated — suggest running `/fix`

**Output the badge markdown** that the user can paste directly into their README when the score qualifies.

---

### Comparison Mode

When run with a reference (`/grade vs stripe` or `/grade vs linear`), score the user's design against a reference product:

| Dimension | Your App | [Reference] | Gap |
|-----------|----------|-------------|-----|
| Visual Hierarchy | [X] | [X] | [+/-N] |
| Typography System | [X] | [X] | [+/-N] |
| Color System | [X] | [X] | [+/-N] |
| Spacing & Layout | [X] | [X] | [+/-N] |
| Component Quality | [X] | [X] | [+/-N] |
| Accessibility | [X] | [X] | [+/-N] |
| Design System Coherence | [X] | [X] | [+/-N] |
| **DQS** | **[X]** | **[X]** | **[+/-N]** |

Then generate specific recommendations to close the gap, prioritized by impact:

1. **Largest gap first**: Address the dimension with the biggest negative gap
2. **Quick wins**: Identify gaps that can be closed with minimal effort
3. **Strategic investments**: Identify gaps that require significant work but yield the highest quality improvement
4. **Irrelevant gaps**: Note dimensions where the gap is expected due to different product contexts (e.g., a B2B tool vs a consumer marketing site)

**Available reference products**: Stripe, Linear, Vercel, Notion, Figma, Apple, Airbnb, Shopify, GitHub, Raycast, Arc, Craft, Things 3, Bear, Mercury, Ramp, Loom, Pitch. Reference scores are based on public product analysis and the `designer-pattern-library.md` benchmarks.

**Usage**:
- `/grade vs stripe` — Compare against Stripe's design quality
- `/grade vs linear` — Compare against Linear's design quality
- `/grade vs [product]` — Compare against any well-known product