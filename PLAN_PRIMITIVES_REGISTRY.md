# Implementation Plan: Primitives + Registry Viewer

## Overview
Build production-ready primitive components and a visual registry database page.

---

## Part A: Registry Viewer Page

### Page: `/design-system/registry`
A searchable, filterable table showing all components in the system.

### Features:
1. **Summary stats** — total components, by layer, by status
2. **Filterable table** — filter by Layer, Category, Status
3. **Search** — search by name, ID, tags
4. **Table columns**: #, Category, Component, DSL ID, Layer, Status, Production-ready?
5. **Click row** → expand to show props schema, slots, dependencies
6. **Color-coded status badges**: ✅ Stable, ⚠ Beta, 🔬 Experimental, 📋 Planned
7. **Layer badges**: Core, Token, Primitive, Component, Pattern, Layout

### Implementation:
- React island `RegistryViewer.tsx` (interactive filtering/search)
- Reads from `registry.json` at build time (passed as prop)
- Glass card layout matching other pages
- Side nav integration

---

## Part B: Upgrade Existing Primitives (Tier 1)

### B1. Button (upgrade)
- [ ] Add CSS class system (not just inline styles)
- [ ] 5 variants: solid, ghost, glass, gel, link
- [ ] 3 sizes: sm, md, lg
- [ ] Hover/active/focus states with transitions
- [ ] Contrast-aware text color
- [ ] Border radius from appearance settings
- [ ] Disabled state
- **File**: `src/dsl/primitives.tsx` → Button component

### B2. Input (upgrade)
- [ ] Focus: solid border (black/white), solid background
- [ ] Blur: return to glass background
- [ ] Contrast-aware placeholder text
- [ ] Validation states: valid (green border + ✓), invalid (red border + ✗)
- [ ] Disabled state (opacity + cursor)
- [ ] Size variants: sm, md, lg

### B3. Heading (upgrade)
- [ ] Integrate `--font-heading` CSS variable
- [ ] Apply Type Presets (size/weight/lineHeight from scale)
- [ ] Support h1-h6 levels
- [ ] Contrast-aware color

### B4. Text (upgrade)
- [ ] Integrate `--font-body` CSS variable
- [ ] Size presets: xs, sm, md, lg
- [ ] Color variants: default, muted, contrast

### B5. Toggle (upgrade)
- [ ] Add gel variant (volumetric shadows)
- [ ] Smooth transition animation
- [ ] Contrast-aware track color

### B6. Checkbox (upgrade)
- [ ] Add gel variant
- [ ] Check animation
- [ ] Indeterminate state

### B7. Radio (upgrade)
- [ ] Add gel variant
- [ ] Selection animation

### B8. Card (upgrade)
- [ ] Integrate frost zone props (standard, haze, none)
- [ ] 5 variants: glass-frost, glass-haze, glass-plain, transparent, solid
- [ ] Auto frost-zone height based on content

### B9. Code (upgrade)
- [ ] Syntax highlighting colors (keyword, string, variable, etc.)
- [ ] Dark/light background variants
- [ ] Inline vs block mode
- [ ] Copy button

### B10. Badge (upgrade)
- [ ] Status dot indicator
- [ ] Removable (with × button)
- [ ] Outline variant

### B11. Spinner (upgrade)
- [ ] Multiple styles: circle, dots, pulse
- [ ] Size variants
- [ ] Color from brand palette

### B12. Progress (upgrade)
- [ ] Animated fill
- [ ] Percentage label
- [ ] Color variants (brand, success, warning, error)

### B13. Skeleton (upgrade)
- [ ] Shimmer animation (not just pulse)
- [ ] Shape variants: text, circle, rect
- [ ] Configurable lines/width

---

## Part C: Build Missing Primitives (Tier 2)

### C1. Select (custom glass dropdown)
- [ ] Custom styled dropdown (no native select)
- [ ] Glass/solid panel for options list
- [ ] Keyboard navigation (↑↓ Enter Esc)
- [ ] Selected item display
- [ ] Chevron icon
- [ ] Focus border (solid black/white)

### C2. SearchableSelect (filterable dropdown)
- [ ] Search input inside dropdown
- [ ] Filter options as user types
- [ ] Highlight matching text
- [ ] Same glass styling as Select

### C3. SearchInput (with icon)
- [ ] Search icon (magnifying glass)
- [ ] Icon thickens on focus (strokeWidth 1.5 → 2.5)
- [ ] Clear button (×) when has text
- [ ] Solid bg on focus

### C4. SegmentedControl
- [ ] N-segment toggle (like Day/Week/Month)
- [ ] Active segment: solid bg pill
- [ ] Smooth sliding animation
- [ ] Gel variant option

### C5. Slider
- [ ] Simple flat variant (for Controls block)
- [ ] Glass variant (LiquidGlassSlider wrapper)
- [ ] Min/max/step props
- [ ] Value display (percentage or absolute)
- [ ] Track color: black/gray gradient

### C6. Modal
- [ ] Glass backdrop (blur + dim)
- [ ] Draggable (reuse useDraggableModal hook)
- [ ] Header: title + close button
- [ ] Footer: Cancel/Apply buttons
- [ ] Body scroll lock
- [ ] Close on Escape
- [ ] Size variants: sm, md, lg

### C7. Tooltip
- [ ] Hover trigger
- [ ] 4 positions: top, bottom, left, right
- [ ] Arrow pointer
- [ ] Glass panel styling
- [ ] Delay (show after 300ms)

### C8. Tag (removable label)
- [ ] Color variants (from brand palette)
- [ ] Remove button (×)
- [ ] Size: sm, md
- [ ] Outline variant

### C9. PillTabs
- [ ] Horizontal pill-shaped tabs
- [ ] Active pill: solid bg
- [ ] Smooth transition on switch
- [ ] Glass container

### C10. NavItem
- [ ] Icon + label layout
- [ ] Active state (solid bg)
- [ ] Hover state
- [ ] Used in sidebar navigation

### C11. LinkButton
- [ ] Looks like link, acts like button
- [ ] Underline variant
- [ ] Arrow variant (text + →)

### C12. Overlay
- [ ] Semi-transparent backdrop
- [ ] Click to dismiss
- [ ] Glass blur option
- [ ] Transition animation

### C13. Avatar (upgrade with status)
- [ ] Image or initials
- [ ] Status dot: online (green), offline (gray), busy (red), away (amber)
- [ ] Size: xs, sm, md, lg
- [ ] Border ring

### C14. Divider (upgrade with glass variants)
- [ ] Horizontal: default, bold, dashed, gradient, section break
- [ ] Vertical: default, with label
- [ ] Glass: etched, groove, ridge, frosted slit
- [ ] With icon

---

## Part D: Refactor Primitives Page

After building all primitives:
1. Replace hand-coded HTML in primitives.astro with actual DSL components
2. Each section imports from `dsl/primitives.tsx`
3. Add "View in Registry" link to each section
4. Add "DSL JSON" preview toggle (show the JSON that generates each demo)

---

## Part E: Add to Nav

Add "Registry" to the top nav bar:
- Icon: database/table icon
- Position: after Layouts
- URL: `/design-system/registry`

---

## Implementation Order

| Step | What | Effort | Priority |
|------|------|--------|----------|
| 1 | Registry Viewer page | 3-4 hours | HIGH |
| 2 | Upgrade Button (B1) | 2 hours | HIGH |
| 3 | Upgrade Input (B2) | 1.5 hours | HIGH |
| 4 | Build Select (C1) | 2 hours | HIGH |
| 5 | Build SearchableSelect (C2) | 1.5 hours | HIGH |
| 6 | Build Modal (C6) | 2 hours | HIGH |
| 7 | Upgrade Card (B8) | 1.5 hours | HIGH |
| 8 | Build SegmentedControl (C4) | 1.5 hours | MEDIUM |
| 9 | Build Tooltip (C7) | 1.5 hours | MEDIUM |
| 10 | Build Slider (C5) | 1 hour | MEDIUM |
| 11 | Upgrade Toggle/Checkbox/Radio (B5-B7) | 2 hours | MEDIUM |
| 12 | Build Tag, PillTabs, NavItem (C8-C10) | 2 hours | MEDIUM |
| 13 | Upgrade Heading/Text (B3-B4) | 1 hour | MEDIUM |
| 14 | Upgrade Code (B9) | 1.5 hours | LOW |
| 15 | Upgrade Spinner/Progress/Skeleton (B11-B13) | 1.5 hours | LOW |
| 16 | Build LinkButton, Overlay (C11-C12) | 1 hour | LOW |
| 17 | Upgrade Avatar, Badge, Divider (B10, B13, B14) | 1.5 hours | LOW |
| 18 | Refactor Primitives page (D) | 3 hours | FINAL |
| 19 | Add planned entries to registry | 1 hour | FINAL |

**Total estimate: ~30 hours**

---

## Registry Page Mockup

```
┌─────────────────────────────────────────────────────────────┐
│ DEVELOPER TOOLS                                             │
│ Component Registry                                          │
│ 67 registered components across 6 layers                    │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔍 Search components...                                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [All] [Core] [Token] [Primitive] [Component] [Pattern]      │
│ [Layout]                                                    │
│                                                             │
│ ┌───┬──────────┬────────────────┬──────────┬───────┬──────┐ │
│ │ # │ Category │ Component      │ DSL ID   │ Layer │Status│ │
│ ├───┼──────────┼────────────────┼──────────┼───────┼──────┤ │
│ │   │TYPOGRAPHY│                │          │       │      │ │
│ │ 1 │          │ Heading (h1-h6)│ heading  │ PRIM  │  ✅  │ │
│ │ 2 │          │ Text           │ text     │ PRIM  │  ✅  │ │
│ │ 3 │          │ Label          │ label    │ PRIM  │  ⚠   │ │
│ │...│          │                │          │       │      │ │
│ │   │BUTTONS   │                │          │       │      │ │
│ │ 7 │          │ Button         │ button   │ PRIM  │  ✅  │ │
│ │ 8 │          │ IconButton     │icon-btn  │ PRIM  │  ⚠   │ │
│ │ 9 │          │ LinkButton     │link-btn  │ PRIM  │  📋  │ │
│ └───┴──────────┴────────────────┴──────────┴───────┴──────┘ │
│                                                             │
│ 44 Primitives · 12 Tokens · 8 Components · 3 Planned       │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure (new files)

```
src/
  pages/
    design-system/
      registry.astro              ← NEW: Registry viewer page
  components/
    block/
      RegistryHero.astro          ← NEW: Hero banner
  islands/
    RegistryViewer.tsx            ← NEW: Interactive table (React island)
  dsl/
    primitives.tsx               ← UPGRADE: 30 existing + 14 new
    types.ts                     ← EXISTS: DSL types
    renderer.tsx                 ← EXISTS: DSL renderer
  registry/
    registry.json                ← UPDATE: add 14 planned entries
    types.ts                     ← EXISTS
    validate.ts                  ← EXISTS
```
