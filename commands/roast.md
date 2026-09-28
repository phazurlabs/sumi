---
name: roast
description: "Quick brutal design critique — 10 dimensions scored, letter grade, top fixes, one-line verdict. Fast and opinionated."
argument-hint: "[design, screenshot, or file to critique]"
---

# Roast — Quick Design Critique

## Before running

This command needs a design, screenshot, or file to critique.

If the user invoked it with nothing and no target is evident from the conversation or open files, ask for it in one plain-language question and stop. Do not invent a target and do not produce generic output in place of the real work — output about something imaginary reads as authoritative and is worthless.

If a target is evident from context, use it and say which one you picked.


Fast, opinionated, actionable design critique. Not comprehensive (that is `/audit`). This is the "show me your design and I will tell you what is wrong in 60 seconds" command.

**Accepts**: Code, screenshot description, URL description, or Figma reference.

---

## Critique Protocol

### Step 0: Establish Context

Quick context grab — do not block on missing information:

1. **What is it**: Component, screen, flow, or product
2. **Who is it for**: Target users and their context
3. **What stage**: Exploration, refinement, or final review
4. **Against what**: If `.sumi/refs/board.json` exists, roast against the wall. Look at the best reference's screenshots and name where the build falls short, citing the reference by name
4. **Designer's questions**: Does the designer have specific concerns? Address those first

### Step 1: Statements of Meaning

Before critiquing, identify what WORKS. This is not flattery — it identifies what to protect during iteration. Following the Liz Lerman Critical Response Process.

List 3-5 genuine strengths with specific reasoning:
- What stands out positively and WHY
- What design decisions show clear intentionality
- What would be lost if this were redesigned carelessly

### Step 1.5: Questions Before Opinions (CRP Steps 2-3)

Liz Lerman's process does not go from strengths straight to judgment. Two question rounds sit in between, and they are the part that keeps a critique from becoming an opinion dump. Run both, briefly.

**Designer's questions.** Ask what the designer wants examined. If no designer is present — the usual case when the target is code or a screenshot — infer the two or three decisions that were clearly deliberate and state what they appear to be optimising for. Naming an intention before judging it is what separates a critique from a reaction.

**Neutral questions.** Ask about the design without smuggling an opinion into the question. A neutral question has no preferred answer.

- Neutral: "What decides which of these two actions is primary?"
- Not neutral: "Why is the primary action so hard to find?"

The second sentence is an opinion wearing a question mark. If a question can only be answered by agreeing with you, rewrite it or move it to the findings where it belongs. Where a neutral question exposes a decision with no answer, that is a finding — usually a good one.

### Step 2: Score 10 Dimensions

Score each dimension 1-10. Be honest — most production designs score 4-7. An 8+ is genuinely impressive. A 3 or below means fundamental problems.

| # | Dimension | What It Measures | Score Criteria |
|---|-----------|-----------------|----------------|
| 1 | **Clarity** | Can users understand what to do without instruction? | 10: Self-explanatory, zero confusion. 5: Some labels unclear. 1: Users have no idea what to do |
| 2 | **Hierarchy** | Is information prioritized visually and structurally? | 10: Crystal clear what matters most. 5: Competing elements. 1: Everything screams equally |
| 3 | **Consistency** | Does it follow established patterns and conventions? | 10: Every element follows the system. 5: Some deviations. 1: Every screen feels like a different app |
| 4 | **Spacing** | Is whitespace used purposefully? Breathing room appropriate? | 10: Perfect rhythm. 5: Inconsistent but functional. 1: Cramped or wasteful |
| 5 | **Color** | Is the palette harmonious, semantic, and accessible? | 10: Cohesive palette with clear semantic meaning. 5: Works but generic. 1: Clashing or inaccessible |
| 6 | **Typography** | Is the type system clear, readable, and hierarchical? | 10: Beautiful type scale, perfect readability. 5: Functional but bland. 1: Unreadable or chaotic |
| 7 | **Interaction** | Do interactive elements provide clear feedback and feel responsive? | 10: Every click/tap feels intentional and responsive. 5: Basic hover states. 1: Dead clicks, no feedback |
| 8 | **Accessibility** | Does it work for users of all abilities? | 10: WCAG AAA, keyboard perfect, screen reader tested. 5: Basic AA compliance. 1: Inaccessible |
| 9 | **Innovation** | Does it solve problems in novel, valuable ways? | 10: Genuinely new approach that works. 5: Solid execution of known patterns. 1: Outdated or copied |
| 10 | **Polish** | Is the craft quality and attention to detail high? | 10: Every pixel intentional, all states covered. 5: Mostly done. 1: Clearly unfinished |

**Scoring guidance per dimension**:

#### 1. Clarity (Can they figure it out?)
- Check: Primary CTA is immediately identifiable
- Check: Labels describe what will happen, not internal jargon
- Check: Information architecture is self-evident (no "Where do I go?")
- Check: Empty states tell users what to do, not just "Nothing here"
- Check: Onboarding is unnecessary because the UI explains itself
- Red flag: Any moment where the user must guess what a button or link does
- Principle: Don't Make Me Think (Krug). If users have to think, clarity has failed

#### 2. Hierarchy (What matters most?)
- Check: One primary action per screen dominates visually
- Check: Size, weight, color, and position all reinforce the same priority order
- Check: Secondary content recedes — it is present but does not compete
- Check: F-pattern or Z-pattern reading flow is respected for the content type
- Check: Visual hierarchy matches task hierarchy (most important task = most prominent element)
- Red flag: Multiple elements compete for attention with equal visual weight
- Principle: Von Restorff Effect — the distinct item is remembered. If everything is distinct, nothing is

#### 3. Consistency (Same thing, same way?)
- Check: Same action looks the same everywhere (all "Save" buttons are identical)
- Check: Platform conventions respected (iOS back chevron, Android back arrow)
- Check: Spacing tokens used consistently (not 12px here, 14px there)
- Check: Interaction patterns are predictable (swipe does the same thing everywhere)
- Check: Terminology is consistent (not "Save" in one place and "Update" in another for the same action)
- Red flag: A component that looks different from its siblings for no reason
- Principle: Jakob's Law — users spend most of their time on other products and expect yours to work the same

#### 4. Spacing (Does it breathe?)
- Check: Consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- Check: Related items are closer together than unrelated items (Gestalt proximity)
- Check: Touch targets have enough surrounding space (no accidental taps)
- Check: Content density is appropriate for the sector (dashboard vs. landing page)
- Check: Vertical rhythm is maintained (consistent line-height multiples)
- Red flag: Arbitrary spacing values that break the rhythm
- Principle: Proximity is the strongest Gestalt grouping principle. Spacing IS meaning

#### 5. Color (Harmonious and meaningful?)
- Check: 60-30-10 color distribution (dominant, secondary, accent)
- Check: Semantic colors are consistent (red = destructive everywhere, not sometimes warning)
- Check: Palette has at most 5-6 distinct hues (excluding neutrals)
- Check: Contrast meets WCAG AA minimums (4.5:1 text, 3:1 UI components)
- Check: Color is not the only way information is conveyed (use icons, text, patterns too)
- Red flag: More than 2 accent colors competing, or semantic confusion (green delete button)
- Principle: Color is emotional first, informational second. Wrong color creates wrong feeling

#### 6. Typography (Readable and structured?)
- Check: Maximum 2 font families (one display, one body — or a single versatile family)
- Check: Clear type scale with consistent ratios (1.2, 1.25, 1.333, 1.5, or 1.618)
- Check: Body text >= 16px, line-height >= 1.5
- Check: Line length between 45-75 characters for readability
- Check: Weight usage is disciplined (Regular, Medium, Semibold — not all 9 weights)
- Red flag: More than 5 distinct text styles, or font sizes that don't follow a scale
- Principle: Typography is 95% of web design (Oliver Reichenstein). Get type right and the design follows

#### 7. Interaction (Does it respond?)
- Check: Every interactive element has hover, focus, and active states
- Check: Feedback is immediate (< 100ms for direct manipulation, < 400ms for system response)
- Check: Transitions are purposeful (communicate state change, not just decoration)
- Check: Loading states present for any action > 300ms
- Check: Error states provide recovery paths (not dead ends)
- Red flag: Click/tap with no visual response, or states that appear identical
- Principle: Doherty Threshold — response within 400ms or the user's attention breaks

#### 8. Accessibility (Does it work for everyone?)
- Check: Keyboard navigation reaches all interactive elements
- Check: Focus indicators are visible and high-contrast
- Check: Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- Check: Images have alt text, icons have labels
- Check: Form inputs have associated labels
- Red flag: Any interactive element unreachable by keyboard, or invisible focus
- Principle: Accessibility is not a feature — it is a quality requirement. 1 in 4 adults has a disability

#### 9. Innovation (Is it novel and valuable?)
- Check: Solves a real problem in a way competitors do not
- Check: Innovation serves the user (not just the business or the designer's portfolio)
- Check: Novel patterns are learnable (innovation without usability is decoration)
- Check: Familiar patterns are used for familiar tasks (innovate where it matters)
- Check: The innovation is defensible (would users miss it if removed?)
- Red flag: Innovation for its own sake, or copying a trend without understanding why it works
- Principle: Innovation is earned by first mastering convention. Break rules only when you understand them

#### 10. Polish (Is the craft high?)
- Check: All UI states implemented (default, hover, focus, active, disabled, loading, error, empty, skeleton)
- Check: Pixel-level alignment — elements on grid, consistent spacing, no 1px offsets
- Check: Smooth transitions between states (no jarring jumps)
- Check: Edge cases handled (long text, empty data, slow connections, large datasets)
- Check: Micro-interactions add delight without slowing users down
- Red flag: Missing states, inconsistent border-radius, mixed icon sizes, orphaned styles
- Principle: God is in the details (Mies van der Rohe). Polish is what separates professional from amateur

### Step 2.5: AI Slop Detection

Scan the design for telltale AI-generated UI patterns. Check each item that applies:

**THE PURPLE GRADIENT SYNDROME**:
- [ ] Uses default Tailwind indigo/violet/purple as primary color (bg-indigo-500, bg-purple-600, bg-violet-500)
- [ ] Purple/indigo gradient backgrounds (from-indigo-500 to-purple-600)
- [ ] White or near-white background with purple accents — the #1 AI-generated look
- [ ] Uses Tailwind's default color palette with zero customization

**THE FONT MONOTONY**:
- [ ] Inter as the only font (or Roboto, system-ui with no intentional pairing)
- [ ] No font pairing — heading and body use same font/weight
- [ ] Generic font-sans with no typographic hierarchy
- [ ] Missing type scale — sizes feel random rather than systematic

**THE LAYOUT LOTTERY**:
- [ ] 3-column equal-width grid for everything (the default AI layout)
- [ ] Every section has the same padding/spacing
- [ ] Hero section with centered text + generic gradient background
- [ ] Features grid: 3 cards with icon + title + paragraph (the AI cliche)
- [ ] No visual rhythm variation — every section same height/weight

**THE COMPONENT COPY-PASTE**:
- [ ] Buttons with bg-blue-500 or bg-indigo-600 and no hover state defined
- [ ] Cards with rounded-lg shadow-md (the AI default card)
- [ ] Missing states: no loading, error, empty, disabled
- [ ] No micro-interactions or transitions
- [ ] Generic placeholder content ("Lorem ipsum" or "Description goes here")

**THE ACCESSIBILITY VOID**:
- [ ] No ARIA labels on interactive elements
- [ ] Color as the only meaning indicator
- [ ] No focus-visible styles
- [ ] No skip navigation
- [ ] Images without alt text

**Slop Scoring**:
Count the number of checks that apply:
- **0-2**: Clean — this doesn't look AI-generated
- **3-5**: Mild slop — some AI defaults slipped through
- **6-8**: Moderate slop — needs a Sumi `/fix` pass
- **9+**: Full slop — this is raw AI output, run `/fix` immediately

Add a **Slop Score** to the final output alongside the letter grade. Format: `Slop Score: X/23 ([Severity]) — run /fix to transform this into visual cuisine`

### Step 3: Calculate Total Score

**Total**: Sum of all 10 dimensions (out of 100)

**Letter Grade**:
- **A** (90-100): Exceptional. Ship it and submit to Awwwards
- **A-** (85-89): Excellent. Minor polish away from world-class
- **B+** (80-84): Very good. Competitive with top products
- **B** (75-79): Good. Solid professional work with room to grow
- **B-** (70-74): Above average. Some clear weaknesses to address
- **C+** (65-69): Decent. Functional but unimpressive
- **C** (60-64): Average. Needs meaningful improvement
- **C-** (55-59): Below average. Multiple areas need work
- **D** (45-54): Poor. Significant problems across dimensions
- **F** (0-44): Failing. Fundamental redesign needed

### Step 4: Top 3 Must-Fix Items

For each must-fix, provide:

1. **What is wrong**: Specific observation with exact location
2. **Why it matters**: UX principle or cognitive science grounding (one line)
3. **How to fix it**: Specific actionable fix
4. **Code fix** (if code was provided): Exact corrected code snippet

These are the three changes that will have the highest impact on the overall score. Prioritize by (severity * breadth of impact).

**Classify every finding, not just the top three.** Three must-fixes is the right ceiling for what leads the output, but findings below that line still need a home, and the class you assign tells the reader what to do with each one:

| Class | Meaning | What the reader does |
|---|---|---|
| **Must-fix** | Breaks the experience, blocks a task, or fails accessibility. Max 3. | Fix before shipping |
| **Should-fix** | Real cost to quality or conversion, but the design works without it | Fix this cycle |
| **Could-improve** | Craft and polish. Defensible to leave as-is | Fix when touching that area |
| **Explore** | A genuine open question the critique cannot settle | Route to research, do not argue |

**Explore** is the class most critiques lack. When a disagreement rests on an assumption about users rather than a design principle, saying so is more honest than picking a side with confidence you have not earned. Send it to `/research` and say what would resolve it.

### Step 5: Top 3 Strengths to Keep

For each strength:

1. **What is working**: Specific observation
2. **Why it works**: UX principle that makes this effective
3. **Protect it**: What would accidentally break this during iteration

These are the three things that would hurt the design most if lost.

### Step 6: One-Line Verdict

A single sentence that captures the essence of this design's quality. Be direct. Be memorable. Examples:

- "A solid foundation buried under visual noise — strip it back and you have something good."
- "All the right components, none of the right hierarchy — this design whispers when it should shout."
- "Ship-ready craft with one fatal flaw: users cannot find the primary action."
- "This is what happens when a developer designs without a type scale — functional but forgettable."
- "Genuinely impressive interaction design held back by a color palette that fights itself."

---

## Output Format

```
## Roast: [Design Name]

### Context
- **Artifact**: [type]
- **Stage**: [exploration / refinement / final]
- **Users**: [who]

---

### Strengths (Protect These)
1. **[Strength]**: [Why it works — principle grounding]
2. **[Strength]**: [Why it works]
3. **[Strength]**: [Why it works]

---

### Dimension Scores

| # | Dimension | Score | Observation |
|---|-----------|-------|-------------|
| 1 | Clarity | X/10 | [one-line observation] |
| 2 | Hierarchy | X/10 | [one-line observation] |
| 3 | Consistency | X/10 | [one-line observation] |
| 4 | Spacing | X/10 | [one-line observation] |
| 5 | Color | X/10 | [one-line observation] |
| 6 | Typography | X/10 | [one-line observation] |
| 7 | Interaction | X/10 | [one-line observation] |
| 8 | Accessibility | X/10 | [one-line observation] |
| 9 | Innovation | X/10 | [one-line observation] |
| 10 | Polish | X/10 | [one-line observation] |

**Total: [X/100] — Grade: [Letter]**
**Slop Score: [X/23] ([Clean/Mild/Moderate/Full]) — run `/fix` to transform this into visual cuisine**

---

### AI Slop Detection

| Category | Flags Hit | Details |
|----------|-----------|---------|
| Purple Gradient Syndrome | X/4 | [specifics] |
| Font Monotony | X/4 | [specifics] |
| Layout Lottery | X/5 | [specifics] |
| Component Copy-Paste | X/5 | [specifics] |
| Accessibility Void | X/5 | [specifics] |

**Slop Score: [X/23] ([Clean/Mild/Moderate/Full])**

---

### Must-Fix (Top 3)

#### 1. [Issue Title]
- **What**: [specific observation + location]
- **Why**: [principle — one line]
- **Fix**: [specific action]
- **Code**: [corrected snippet if applicable]

#### 2. [Issue Title]
[same format]

#### 3. [Issue Title]
[same format]

---

### Keep (Top 3)

1. **[Strength]** — [what would break it during iteration]
2. **[Strength]** — [what would break it]
3. **[Strength]** — [what would break it]

---

### Verdict
> [One-line verdict]

---

### Next Steps
- `/audit` — Deep comprehensive audit (all lenses)
- `/grade` — Visual quality scoring (Awwwards-calibrated)
- `/a11y` — Accessibility deep-dive
- `/remix` — Fix the issues found
```

---

## Quality Gates

The output MUST include:
- [ ] 3-5 genuine strengths identified before any criticism (Liz Lerman process)
- [ ] All 10 dimensions scored with one-line observation per dimension
- [ ] Total score calculated correctly (sum of 10 dimensions)
- [ ] Letter grade assigned correctly from the scale
- [ ] Top 3 must-fix items with specific location, principle grounding, and actionable fix
- [ ] Top 3 strengths with what would break them during iteration
- [ ] One-line verdict that is specific to THIS design (not generic)
- [ ] Code fixes included when code input was provided
- [ ] AI Slop Detection checklist completed with per-category flags and total Slop Score

The output MUST NOT include:
- Vague criticism ("could be improved") — every finding must cite what specifically and where
- Inflated scores — most designs score 4-7 per dimension. Justify any 8+ or 3-
- Generic verdict that could apply to any design — make it specific
- More than 3 must-fix items — this is a quick critique, not a comprehensive audit
- Unsupported opinions — every criticism must cite a UX principle or cognitive science basis

---

## Cross-References

When critiquing, draw evaluation criteria from:
- `design-critique-case-studies` — Liz Lerman critique methodology, case study benchmarks
- `nng-ux-heuristics` — Heuristic violation identification
- `cognitive-psychology-ux` — Cognitive load and bias analysis
- `accessibility-inclusive-design` — Accessibility scoring
- `ux-ethics-content-strategy` — Ethical design evaluation
- `ui-visual-design-system` — Visual design quality assessment
- `visual-design-mastery` — Visual scoring calibration
- `sector-style-intelligence` — Sector-appropriate expectations

---

## Next Steps

After `/roast`:
- `/audit` — Comprehensive audit (the deep version of this)
- `/grade` — Visual quality scoring
- `/a11y` — Accessibility audit
- `/remix` — Fix the issues found
- `/component` — Rebuild weak components