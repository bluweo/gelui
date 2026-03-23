# Gel UI — UI DSL (Domain-Specific Language) Implementation Plan

**Version:** 1.0
**Date:** 2026-03-24
**Status:** Planning
**Author:** Bluweo + Claude

---

## Table of Contents

1. [Vision & Goals](#1-vision--goals)
2. [Architecture Overview](#2-architecture-overview)
3. [Phase 0: Cleanup & Foundation](#3-phase-0-cleanup--foundation)
4. [Phase 1: Component Registry](#4-phase-1-component-registry)
5. [Phase 2: DSL Renderer](#5-phase-2-dsl-renderer)
6. [Phase 3: Node Editor](#6-phase-3-node-editor)
7. [Phase 4: Advanced Features](#7-phase-4-advanced-features)
8. [Technical Decisions](#8-technical-decisions)
9. [Timeline & Milestones](#9-timeline--milestones)
10. [File Structure](#10-file-structure)
11. [Risk & Mitigation](#11-risk--mitigation)

---

## 1. Vision & Goals

### What is UI DSL?

A system where users can **visually compose UI** by connecting component nodes, and the system outputs a **JSON definition** that renders real, interactive Gel UI components.

### Goals

| Goal | Description |
|------|-------------|
| **Visual Composition** | Drag-and-drop node editor to compose UI from registered components |
| **JSON-to-UI** | Write JSON, get rendered glassmorphism UI |
| **Layer Visualization** | See how Token → Primitive → Component → Pattern → Layout connects |
| **Component Registry** | Single source of truth for all components, powering both editor and renderer |
| **Code Export** | Generate Astro/React code from visual compositions |

### Non-Goals (for now)

- No backend / database server (all client-side)
- No multi-user collaboration
- No version control within the editor (use git)
- No drag-and-drop page builder (this is a composition tool, not a WYSIWYG editor)

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    ARCHITECTURE                          │
│                                                          │
│  ┌──────────────┐     ┌──────────────┐                  │
│  │  Component    │────▶│  Node Editor  │                  │
│  │  Registry     │     │  /ui-dsl/     │                  │
│  │  (JSON DB)    │     │              │                  │
│  │              │     │  Canvas +     │                  │
│  │  Single       │     │  Connections  │                  │
│  │  Source of    │     │  + Props      │                  │
│  │  Truth        │     └──────┬───────┘                  │
│  │              │            │                           │
│  │              │     ┌──────▼───────┐                  │
│  │              │────▶│  DSL Output   │                  │
│  │              │     │  (JSON)       │                  │
│  └──────────────┘     └──────┬───────┘                  │
│                              │                           │
│                       ┌──────▼───────┐                  │
│                       │  DSL Renderer │                  │
│                       │  JSON → React │                  │
│                       │  → Live UI    │                  │
│                       └──────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
Registry.json
    ↓
Node Editor reads available components
    ↓
User drags nodes, connects them, sets props
    ↓
Editor outputs JSON DSL
    ↓
DSL Renderer converts JSON → React component tree
    ↓
Live preview renders actual Gel UI
    ↓
Optional: Export to Astro/JSX code
```

---

## 3. Phase 0: Cleanup & Foundation

**Goal:** Fix existing pages to match the 6-layer architecture before building the registry.

**Duration:** 0.5 day

### 3.1 Page Hierarchy Fix

| Current | Action | Target |
|---------|--------|--------|
| `/design-system/` | Keep as landing page | Overview with guided tour |
| `/design-system/tokens` | No change | ✅ Complete |
| `/design-system/primitives` | No change | ✅ Complete |
| `/design-system/components` | Build scaffold | Hero + planned sections + "coming soon" |
| `/design-system/patterns` | Build scaffold | Hero + planned sections + "coming soon" |
| `/design-system/layouts` | Build scaffold | Hero + planned sections + "coming soon" |
| `/design-system/core` | Do NOT create | Core is infrastructure, documented in Overview |

### 3.2 Scaffold Empty Pages

Each scaffold includes:
- Hero banner (matching Primitives hero style)
- Page-specific hero image (dummy placeholder)
- Stat blocks (count of planned items)
- "Explore" CTA button
- Section headers for planned content (grayed out, "Coming Soon" badges)
- Proper SEO meta tags
- Side nav section anchors

#### Components Page Scaffold (`/design-system/components`)

```
Hero: "Components — Multi-primitive compositions"
Planned sections:
  - Data Display (DataTable, List, Tree, Timeline)
  - Overlay (Modal, Drawer, Popover, Tooltip)
  - Form (Form Group, Field Validation, Multi-step Form)
  - Card Variants (Profile Card, Stat Card, Media Card)
  - Navigation (Header, Sidebar, Footer, Pagination)
  - Feedback (Toast, Alert, Notification, Banner)
Stats: 6 categories, 24+ components
```

#### Patterns Page Scaffold (`/design-system/patterns`)

```
Hero: "Patterns — Recurring UI patterns & flows"
Planned sections:
  - Authentication (Login, Register, Forgot Password, OTP)
  - Dashboard (Analytics, KPI Cards, Chart Layout)
  - Settings (Profile, Preferences, Notifications, Security)
  - Data Management (CRUD, Filters, Sort, Bulk Actions)
  - Onboarding (Welcome, Tour, Setup Wizard)
  - Empty States (No Data, Error, Offline, Maintenance)
Stats: 6 categories, 30+ patterns
```

#### Layouts Page Scaffold (`/design-system/layouts`)

```
Hero: "Layouts — Page grids, shells, composition"
Planned sections:
  - Page Shells (App Shell, Auth Shell, Dashboard Shell)
  - Grid Systems (Bento Grid, Masonry, Responsive Columns)
  - Navigation Layouts (Top Nav, Side Nav, Bottom Nav)
  - Content Layouts (Article, Gallery, Split View)
  - Responsive Patterns (Breakpoint demos, Container queries)
Stats: 5 categories, 15+ layouts
```

### 3.3 Overview Page Cleanup

Add "Core Foundation" section at bottom of Overview:
- Tech stack details (Astro 5, React 19, Tailwind v4)
- CSS architecture (custom properties, @layer system)
- Font loading strategy
- Theme system explanation

### 3.4 Architecture Diagram Link Fix

| Layer | Current Link | Updated Link |
|-------|-------------|-------------|
| 06 Layouts | `/design-system/layouts` | No change |
| 05 Patterns | `/design-system/patterns` | No change |
| 04 Components | `/design-system/components` | No change |
| 03 Primitives | `/design-system/primitives` | No change |
| 02 Tokens | `/design-system/tokens` | No change |
| 01 Core | `/design-system` | No change (Core = Overview) |

### 3.5 Nav Update

Current: Overview, Tokens, Primitives, Components, Patterns, Layouts (6 items)
Keep as-is. Core is not a separate nav item.

### 3.6 Deliverables

- [ ] Components page scaffold
- [ ] Patterns page scaffold
- [ ] Layouts page scaffold
- [ ] Core Foundation section on Overview
- [ ] All pages render without errors
- [ ] Side nav works on all pages
- [ ] Commit & push

---

## 4. Phase 1: Component Registry

**Goal:** Create a JSON registry of all components as the single source of truth.

**Duration:** 1-2 days

### 4.1 Registry File Location

```
src/registry/
├── registry.json          # Main component registry
├── compositions.json      # Pre-built composition templates
├── validate.ts            # Script to validate registry vs actual files
└── types.ts               # TypeScript types for registry schema
```

### 4.2 Registry Schema (Detailed)

```typescript
// types.ts

type Layer = "core" | "token" | "primitive" | "component" | "pattern" | "layout";
type Category = "typography" | "interactive" | "surface" | "form" | "feedback" |
                "navigation" | "layout" | "data" | "overlay" | "media";
type PropType = "string" | "number" | "boolean" | "enum" | "color" | "size" | "node";

interface PropSchema {
  type: PropType;
  required?: boolean;
  default?: any;
  options?: string[];          // For enum type
  min?: number;                // For number type
  max?: number;
  description?: string;
}

interface SlotSchema {
  accepts: string[];           // Component IDs that can go in this slot
  multiple?: boolean;          // Can contain multiple children?
  required?: boolean;
}

interface ComponentRegistryEntry {
  // Identity
  id: string;                  // Unique kebab-case ID: "gel-button"
  name: string;                // Display name: "Button"
  displayName: string;         // Full name: "Gel Button"
  description: string;         // Short description
  layer: Layer;                // Which architecture layer
  category: Category;          // Functional category

  // Source
  path: string;                // File path relative to src/
  exportName: string;          // Named export: "GelButton"
  isReact: boolean;            // true = React island, false = Astro component

  // Props
  props: Record<string, PropSchema>;

  // Composition
  slots: Record<string, SlotSchema>;  // Named slots for children
  accepts: string[];           // What parent components can contain this
  composedOf?: string[];       // What smaller components this is built from

  // Metadata
  tags: string[];              // Search tags
  status: "stable" | "beta" | "experimental" | "deprecated";
  version: string;             // When it was added
  documentedOn: string;        // Which page documents it: "/design-system/primitives"
  thumbnail?: string;          // Preview image path

  // Node Editor
  nodeColor?: string;          // Color in the node editor canvas
  nodeIcon?: string;           // Icon identifier for the palette
  nodeWidth?: number;          // Default node width on canvas
}

interface CompositionEntry {
  id: string;
  name: string;
  description: string;
  layer: Layer;
  composedOf: string[];        // Component IDs used
  dsl: DSLNode;                // The JSON DSL definition
  thumbnail?: string;
  tags: string[];
}

interface DSLNode {
  type: string;                // Component registry ID
  props?: Record<string, any>;
  children?: DSLNode[] | string;
  slot?: string;               // Which slot to place in
}
```

### 4.3 Initial Registry Population

Register all existing components by layer:

#### Tokens (layer: "token")

| ID | Name | Path |
|----|------|------|
| `color-brand` | Brand Colors | `src/tokens/colors.ts` |
| `color-semantic` | Semantic Colors | `src/tokens/colors.ts` |
| `typography-sizes` | Font Sizes | `src/tokens/typography.ts` |
| `typography-weights` | Font Weights | `src/tokens/typography.ts` |
| `spacing-scale` | Spacing Scale | `src/tokens/spacing.ts` |
| `radii-presets` | Border Radii | `src/tokens/radii.ts` |
| `shadow-presets` | Shadow Presets | `src/tokens/shadows.ts` |
| `glass-levels` | Glass Levels | `src/tokens/glass.ts` |
| `motion-tokens` | Motion Tokens | `src/tokens/motion.ts` |
| `breakpoints` | Breakpoints | `src/tokens/breakpoints.ts` |

#### Primitives (layer: "primitive")

| ID | Name | Category | Path |
|----|------|----------|------|
| `heading` | Heading | typography | (inline in primitives page) |
| `body-text` | Body Text | typography | (inline) |
| `caption` | Caption | typography | (inline) |
| `label` | Label | typography | (inline) |
| `overline` | Overline | typography | (inline) |
| `code-block` | Code Block | typography | (inline) |
| `link` | Link | typography | (inline) |
| `gel-button` | Gel Button | interactive | `global.css (gel-btn)` |
| `glass-button` | Glass Button | interactive | `global.css` |
| `ghost-button` | Ghost Button | interactive | `global.css` |
| `solid-button` | Solid Button | interactive | (inline) |
| `icon-button` | Icon Button | interactive | `global.css (gel-btn-circle)` |
| `link-button` | Link Button | interactive | (inline) |
| `action-pair` | Action Pair | interactive | (inline) |
| `glass-surface` | Glass Surface | surface | `global.css (glass-0..3)` |
| `gel-surface` | Gel Surface | surface | `global.css (gel-glass)` |
| `solid-surface` | Solid Surface | surface | (inline) |
| `ds-card` | Card | surface | `src/components/card/DSCard.astro` |
| `frost-zone` | Frost Zone | surface | `global.css (ds-card-frost)` |
| `divider-horizontal` | Horizontal Divider | surface | (inline) |
| `divider-glass` | Glass Divider | surface | (inline) |
| `text-input` | Text Input | form | `InputFieldsDemo.tsx` |
| `search-input` | Search Input | form | `InputFieldsDemo.tsx` |
| `select` | Select | form | `InputFieldsDemo.tsx` |
| `searchable-select` | Searchable Select | form | `InputFieldsDemo.tsx` |
| `textarea` | Textarea | form | `InputFieldsDemo.tsx` |
| `toggle` | Toggle Switch | form | `ControlsDemo.tsx` |
| `checkbox` | Checkbox | form | `ControlsDemo.tsx` |
| `radio` | Radio | form | `ControlsDemo.tsx` |
| `slider` | Slider | form | `LiquidGlassSlider.tsx` |
| `flat-slider` | Flat Slider | form | `ControlsDemo.tsx` |
| `segmented-control` | Segmented Control | form | `ControlsDemo.tsx` |
| `gel-toggle` | Gel Toggle | form | `GlassControlsDemo.tsx` |
| `gel-checkbox` | Gel Checkbox | form | `GlassControlsDemo.tsx` |
| `gel-radio` | Gel Radio | form | `GlassControlsDemo.tsx` |
| `status-badge` | Status Badge | feedback | (inline) |
| `status-dot` | Status Dot | feedback | (inline) |
| `tag` | Tag | feedback | (inline) |
| `chip` | Chip | feedback | (inline) |
| `avatar` | Avatar | media | (inline) |
| `avatar-group` | Avatar Group | media | (inline) |
| `spinner` | Spinner | feedback | (inline) |
| `progress-bar` | Progress Bar | feedback | (inline) |
| `skeleton-loader` | Skeleton Loader | feedback | (inline) |
| `tab-bar` | Tab Bar | navigation | `PrimitiveNavigation.tsx` |
| `pill-tabs` | Pill Tabs | navigation | `PrimitiveNavigation.tsx` |
| `breadcrumb` | Breadcrumb | navigation | `PrimitiveNavigation.tsx` |
| `nav-item` | Nav Item | navigation | `PrimitiveNavigation.tsx` |
| `elevation-flat` | Elevation Flat | surface | (inline) |
| `elevation-raised` | Elevation Raised | surface | (inline) |
| `elevation-floating` | Elevation Floating | surface | (inline) |
| `stack` | Stack | layout | (inline) |
| `inline` | Inline | layout | (inline) |
| `center` | Center | layout | (inline) |
| `spacer` | Spacer | layout | (inline) |

#### Components (layer: "component") — To be built

| ID | Name | Category |
|----|------|----------|
| `ds-nav` | Navigation Bar | navigation |
| `ds-footer` | Footer | navigation |
| `ds-shell` | App Shell | layout |
| `appearance-modal` | Appearance Modal | overlay |
| `background-picker` | Background Picker | overlay |
| `context-menu` | Context Menu | overlay |
| `font-picker-modal` | Font Picker Modal | overlay |
| `preset-editor-modal` | Preset Editor Modal | overlay |
| `logo-upload-modal` | Logo Upload Modal | overlay |
| `section-nav` | Section Navigation | navigation |
| `features-grid` | Features Grid | data |
| `type-presets-table` | Type Presets Table | data |

### 4.4 Validation Script

```typescript
// validate.ts — checks registry.json against actual files
// For each entry:
//   1. Does the file at `path` exist?
//   2. Does the named export `exportName` exist in that file?
//   3. Are all `composedOf` IDs valid registry entries?
//   4. Are all `slots.accepts` IDs valid?
// Output: list of errors/warnings
```

### 4.5 Deliverables

- [ ] `src/registry/types.ts` — TypeScript types
- [ ] `src/registry/registry.json` — All components registered
- [ ] `src/registry/compositions.json` — 5-10 example compositions
- [ ] `src/registry/validate.ts` — Validation script
- [ ] Registry viewer section on Components page
- [ ] Commit & push

---

## 5. Phase 2: DSL Renderer

**Goal:** Build a component that takes JSON DSL and renders real Gel UI.

**Duration:** 2-3 days

### 5.1 DSL Format

```json
{
  "type": "ds-card",
  "props": {
    "frost": "standard",
    "title": "Welcome"
  },
  "children": [
    {
      "type": "heading",
      "props": { "level": 2 },
      "children": "Hello World"
    },
    {
      "type": "body-text",
      "children": "This card was generated from JSON."
    },
    {
      "type": "inline",
      "props": { "gap": "12px" },
      "children": [
        {
          "type": "gel-button",
          "props": { "variant": "gel", "size": "md" },
          "children": "Accept"
        },
        {
          "type": "ghost-button",
          "props": { "size": "md" },
          "children": "Cancel"
        }
      ]
    }
  ]
}
```

### 5.2 Renderer Architecture

```typescript
// DSLRenderer.tsx

interface DSLRendererProps {
  dsl: DSLNode;
  registry: ComponentRegistryEntry[];
}

function DSLRenderer({ dsl, registry }: DSLRendererProps) {
  // 1. Look up component by dsl.type in registry
  // 2. Dynamically import/resolve the actual React component
  // 3. Apply dsl.props
  // 4. Recursively render dsl.children
  // 5. Return rendered component tree
}
```

### 5.3 Component Resolution Strategy

Since we can't dynamically import in the browser, we need a **component map**:

```typescript
// component-map.ts — maps registry IDs to actual components

import { GelButton } from "@/components/...";
import { DSCard } from "@/components/card/DSCard";
// ... etc

export const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  "gel-button": GelButton,
  "ds-card": DSCardReact,  // Need React wrapper for Astro components
  "heading": HeadingPrimitive,
  // ...
};
```

**Challenge:** Many primitives are inline HTML in `.astro` files, not exported components. We need to either:
1. Extract them into standalone React components
2. Create thin React wrappers that render the same HTML

**Decision:** Create a `primitives/` folder with React versions of all primitives.

### 5.4 React Primitive Library

```
src/primitives/
├── Heading.tsx          # <h1>-<h6> with font role
├── BodyText.tsx         # <p> with body font
├── Caption.tsx          # Small caption text
├── Label.tsx            # Form label
├── CodeBlock.tsx        # Syntax-highlighted code
├── GelButton.tsx        # Already exists in CSS, wrap in React
├── GlassButton.tsx
├── GhostButton.tsx
├── SolidButton.tsx
├── GlassSurface.tsx     # Div with glass-0..3 classes
├── GelSurface.tsx
├── Divider.tsx
├── TextInput.tsx        # Already in InputFieldsDemo
├── Toggle.tsx           # Already in ControlsDemo
├── Checkbox.tsx
├── Radio.tsx
├── StatusBadge.tsx
├── Avatar.tsx
├── Spinner.tsx
├── ProgressBar.tsx
├── TabBar.tsx           # Already in PrimitiveNavigation
├── PillTabs.tsx
├── Breadcrumb.tsx
├── Stack.tsx            # Flex column with gap
├── Inline.tsx           # Flex row with gap
├── Center.tsx           # Flex center
└── index.ts             # Export all
```

### 5.5 Error Handling

```typescript
// If a component type is not found in registry:
<div className="dsl-error">
  Unknown component: "{dsl.type}"
</div>

// If props don't match schema:
<div className="dsl-warning">
  Invalid prop "{propName}" on "{dsl.type}"
</div>
```

### 5.6 Live Preview Component

```typescript
// DSLPreview.tsx — used on /ui-dsl/ page and in docs

function DSLPreview({ json }: { json: string }) {
  const [dsl, error] = parseAndValidate(json);
  if (error) return <ErrorDisplay error={error} />;
  return <DSLRenderer dsl={dsl} registry={registry} />;
}
```

### 5.7 Deliverables

- [ ] `src/primitives/` — React primitive library (30+ components)
- [ ] `src/dsl/DSLRenderer.tsx` — Main renderer
- [ ] `src/dsl/component-map.ts` — ID → Component mapping
- [ ] `src/dsl/DSLPreview.tsx` — Preview wrapper with error handling
- [ ] `src/dsl/validate-dsl.ts` — DSL validation against registry schemas
- [ ] Test: render 5 example compositions from `compositions.json`
- [ ] Commit & push

---

## 6. Phase 3: Node Editor

**Goal:** Visual drag-and-drop node editor at `/ui-dsl/`.

**Duration:** 5-7 days

### 6.1 Technology: React Flow

**Install:** `npm install @xyflow/react`

**Why React Flow:**
- Handles node positioning, connections, zoom, pan
- Customizable node/edge rendering (can apply glass styling)
- TypeScript support
- Active maintenance, large community
- ~150KB but tree-shakeable

### 6.2 Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  /ui-dsl/                                                        │
│                                                                   │
│  ┌─────────────┬──────────────────────────┬──────────────────┐  │
│  │  PALETTE     │  CANVAS                   │  INSPECTOR       │  │
│  │  (left)      │  (center)                 │  (right)         │  │
│  │              │                           │                  │  │
│  │  ▼ Tokens    │   ┌─────┐    ┌─────┐    │  Selected Node   │  │
│  │    • color   │   │Card │────│Head │    │                  │  │
│  │    • spacing │   └──┬──┘    └─────┘    │  Type: Card      │  │
│  │              │      │                  │  Props:           │  │
│  │  ▼ Primitive │   ┌──┴──┐               │    frost: standard│  │
│  │    • button  │   │ Btn │               │    title: ...     │  │
│  │    • input   │   └─────┘               │                  │  │
│  │    • card    │                          │  Slots:          │  │
│  │              │                          │    header: [Head]│  │
│  │  ▼ Component │                          │    body: [Btn]   │  │
│  │    • modal   │                          │                  │  │
│  │    • nav     │                          │                  │  │
│  │              │                          │                  │  │
│  └─────────────┴──────────────────────────┴──────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────┬──────────────────┐  │
│  │  LIVE PREVIEW                           │  JSON DSL         │  │
│  │  (rendered output)                      │  (raw JSON)       │  │
│  │                                         │                   │  │
│  │  ┌──────────────────────┐              │  {                │  │
│  │  │  Welcome             │              │    "type": "card",│  │
│  │  │  ──────────          │              │    "props": {...},│  │
│  │  │  Hello World         │              │    "children":[..]│  │
│  │  │  [Accept] [Cancel]   │              │  }                │  │
│  │  └──────────────────────┘              │                   │  │
│  └────────────────────────────────────────┴──────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 6.3 Custom Node Types

Each layer gets a distinct node style:

| Layer | Node Color | Border Style |
|-------|-----------|-------------|
| Token | `#FFC800` (gold) | Dashed |
| Primitive | `#354334` (forest green) | Solid |
| Component | `#4A5E48` (olive) | Solid, thicker |
| Pattern | `#7B9779` (sage) | Double |
| Layout | `#97AD96` (light sage) | Solid, rounded |

Each node displays:
- Layer badge (top-left corner)
- Component name
- Mini preview thumbnail
- Input handles (top) — for receiving from parent
- Output handles (bottom) — for passing to children
- Prop summary (collapsed)

### 6.4 Connection Rules

Connections are validated against the registry:
- A `heading` node can connect INTO a `card` node's "children" slot
- A `card` cannot connect INTO a `button` (button doesn't accept card children)
- Visual feedback: valid connections = green line, invalid = red with error tooltip

### 6.5 Palette Panel

Left sidebar with collapsible categories:

```
▼ Tokens
  ├── Color (click to configure)
  ├── Spacing
  ├── Typography
  └── Glass Level

▼ Primitives
  ├── Typography
  │   ├── Heading
  │   ├── Body Text
  │   ├── Caption
  │   └── Code Block
  ├── Buttons
  │   ├── Gel Button
  │   ├── Glass Button
  │   ├── Ghost Button
  │   └── Solid Button
  ├── Inputs
  │   ├── Text Input
  │   ├── Select
  │   └── Toggle
  ├── Surfaces
  │   ├── Glass Surface
  │   ├── Card
  │   └── Divider
  └── Feedback
      ├── Badge
      ├── Spinner
      └── Progress

▼ Components
  ├── Modal
  ├── Nav Bar
  └── Footer

▼ Templates (pre-built compositions)
  ├── Login Card
  ├── Settings Panel
  └── Dashboard Widget
```

### 6.6 Inspector Panel

Right sidebar shows details of the selected node:

```
┌─────────────────────────┐
│  🟢 Gel Button           │
│  layer: primitive        │
│  category: interactive   │
│                          │
│  PROPS                   │
│  ┌─────────────────────┐│
│  │ variant  [gel     ▾] ││
│  │ size     [md      ▾] ││
│  │ label    [Submit   ] ││
│  │ disabled [ ]         ││
│  └─────────────────────┘│
│                          │
│  SLOTS                   │
│  ┌─────────────────────┐│
│  │ icon: (empty)       ││
│  │ + Add child         ││
│  └─────────────────────┘│
│                          │
│  ACTIONS                 │
│  [Duplicate] [Delete]    │
│  [View Source]           │
└─────────────────────────┘
```

### 6.7 Canvas Features

| Feature | Priority | Description |
|---------|----------|-------------|
| Drag nodes from palette | P0 | Core functionality |
| Connect nodes with wires | P0 | Parent-child relationships |
| Select node → show inspector | P0 | Edit props |
| Zoom / pan | P0 | React Flow built-in |
| Delete node / connection | P0 | Keyboard (Delete/Backspace) |
| Undo / redo | P1 | Ctrl+Z / Ctrl+Shift+Z |
| Auto-layout | P1 | Organize nodes neatly |
| Minimap | P2 | Overview of large compositions |
| Copy / paste nodes | P2 | Clipboard operations |
| Group nodes | P3 | Visual grouping |

### 6.8 Deliverables

- [ ] Install React Flow
- [ ] `/ui-dsl/` page with DSLayout wrapper
- [ ] Custom node components (per layer)
- [ ] Palette panel reading from registry
- [ ] Inspector panel with prop editing
- [ ] Connection validation
- [ ] Real-time JSON DSL output
- [ ] Live preview panel using DSLRenderer
- [ ] Save/load to localStorage
- [ ] Commit & push

---

## 7. Phase 4: Advanced Features

**Duration:** Ongoing

### 7.1 Code Export

```
JSON DSL → Astro component code
JSON DSL → React component code
JSON DSL → HTML + Tailwind classes
```

### 7.2 Template Library

Pre-built compositions users can start from:
- Login form
- Dashboard header
- Settings panel
- Profile card
- Data table with filters
- Empty state
- Loading state
- Error page

### 7.3 Composition Sharing

- Export composition as JSON file
- Import JSON file into editor
- URL-based sharing (encode DSL in URL params)

### 7.4 Visual Diff

- Compare two compositions side by side
- Highlight differences in props/structure

### 7.5 Accessibility Audit

- Auto-check compositions for a11y issues
- Missing alt text, color contrast, keyboard navigation

---

## 8. Technical Decisions

### 8.1 Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Registry format | JSON | Human-readable, easy to edit, no build step |
| Node editor library | React Flow | Production-ready, handles complex interactions |
| DSL format | JSON | Universal, easy to parse/generate |
| Component resolution | Static map | No dynamic imports needed, tree-shakeable |
| Storage | localStorage | No backend needed, works offline |
| Core page | No separate page | Core is infrastructure, not user-facing |

### 8.2 Decisions Pending

| Decision | Options | Notes |
|----------|---------|-------|
| Astro component wrappers | React wrappers vs. hybrid | Need React versions of Astro primitives for DSL |
| Registry editing UI | JSON editor vs. form UI | Phase 4 — for now, edit JSON directly |
| Multi-file export | Single file vs. component per file | Phase 4 |

---

## 9. Timeline & Milestones

```
Week 1:
  Day 1-2:  Phase 0 — Cleanup & scaffolds
  Day 3-4:  Phase 1 — Component registry
  Day 5:    Phase 1 — Validation & testing

Week 2:
  Day 1-2:  Phase 2 — React primitive library
  Day 3-4:  Phase 2 — DSL renderer + preview
  Day 5:    Phase 2 — Testing with example compositions

Week 3-4:
  Day 1-2:  Phase 3 — React Flow setup, custom nodes
  Day 3-4:  Phase 3 — Palette + inspector panels
  Day 5-7:  Phase 3 — Connections, validation, live preview
  Day 8-10: Phase 3 — Polish, save/load, responsive

Week 5+:
  Phase 4 — Code export, templates, sharing
```

### Milestones

| Milestone | Target | Deliverable |
|-----------|--------|-------------|
| M0: Clean foundation | Day 2 | All pages scaffolded, no empty pages |
| M1: Registry complete | Day 5 | 60+ components registered, validated |
| M2: DSL renders | Day 10 | JSON → live Gel UI working |
| M3: Node editor MVP | Day 20 | Drag, connect, edit, preview working |
| M4: Production ready | Day 30 | Templates, export, polish |

---

## 10. File Structure

### New files to create

```
src/
├── registry/
│   ├── types.ts                    # Registry TypeScript types
│   ├── registry.json               # Component registry (60+ entries)
│   ├── compositions.json           # Pre-built template compositions
│   └── validate.ts                 # Validation script
├── primitives/                      # React primitive components
│   ├── Heading.tsx
│   ├── BodyText.tsx
│   ├── GelButton.tsx
│   ├── GlassSurface.tsx
│   ├── TextInput.tsx
│   ├── Toggle.tsx
│   ├── StatusBadge.tsx
│   ├── Avatar.tsx
│   ├── Spinner.tsx
│   ├── TabBar.tsx
│   ├── Stack.tsx
│   ├── Inline.tsx
│   ├── Center.tsx
│   └── index.ts                    # Export all
├── dsl/
│   ├── DSLRenderer.tsx             # JSON → React component tree
│   ├── DSLPreview.tsx              # Preview wrapper with error handling
│   ├── component-map.ts           # Registry ID → React component
│   └── validate-dsl.ts            # DSL schema validation
├── pages/
│   └── ui-dsl/
│       └── index.astro             # Node editor page
├── components/
│   └── editor/                     # Node editor components
│       ├── NodeCanvas.tsx          # React Flow canvas wrapper
│       ├── ComponentPalette.tsx    # Left sidebar — drag source
│       ├── NodeInspector.tsx       # Right sidebar — prop editor
│       ├── LivePreview.tsx         # Bottom — rendered output
│       ├── DSLOutput.tsx           # Bottom — raw JSON display
│       ├── CustomNode.tsx          # Custom React Flow node
│       └── ConnectionValidator.ts  # Valid connection rules
```

### Modified files

```
src/pages/design-system/
├── components.astro                # Scaffold → full content (Phase 1+)
├── patterns.astro                  # Scaffold → full content (Phase 1+)
├── layouts.astro                   # Scaffold → full content (Phase 1+)
└── index.astro                     # Add Core Foundation section
```

---

## 11. Risk & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| React Flow adds too much bundle size | Slower page load | Medium | Tree-shake, lazy load only on /ui-dsl/ page |
| Astro components can't be used in DSL renderer | Need React wrappers for everything | High | Phase 2 creates React primitive library |
| Registry goes stale as components change | Invalid references | Medium | Validation script runs on build/CI |
| Node editor is too complex for users | Low adoption | Low | Start with templates, add guided tour |
| Performance with many nodes | Laggy canvas | Low | React Flow handles 100+ nodes well |
| View Transitions break editor state | Lost work on navigation | Medium | /ui-dsl/ is a standalone page, no view transitions |

---

## Appendix: Example DSL Compositions

### A. Login Card

```json
{
  "type": "ds-card",
  "props": { "frost": "standard" },
  "children": [
    {
      "type": "stack",
      "props": { "gap": "16px" },
      "children": [
        { "type": "heading", "props": { "level": 2 }, "children": "Sign In" },
        { "type": "body-text", "children": "Welcome back. Enter your credentials." },
        { "type": "text-input", "props": { "placeholder": "Email", "icon": "search" } },
        { "type": "text-input", "props": { "placeholder": "Password", "type": "password" } },
        {
          "type": "inline",
          "props": { "gap": "12px", "justify": "end" },
          "children": [
            { "type": "ghost-button", "children": "Forgot password?" },
            { "type": "gel-button", "props": { "size": "md" }, "children": "Sign In" }
          ]
        }
      ]
    }
  ]
}
```

### B. Status Dashboard Widget

```json
{
  "type": "ds-card",
  "props": { "frost": "haze" },
  "children": [
    {
      "type": "stack",
      "props": { "gap": "12px" },
      "children": [
        {
          "type": "inline",
          "props": { "justify": "between" },
          "children": [
            { "type": "heading", "props": { "level": 3 }, "children": "System Status" },
            { "type": "status-badge", "props": { "variant": "success" }, "children": "Operational" }
          ]
        },
        { "type": "divider-horizontal" },
        { "type": "progress-bar", "props": { "value": 92, "label": "CPU Usage" } },
        { "type": "progress-bar", "props": { "value": 67, "label": "Memory" } },
        { "type": "progress-bar", "props": { "value": 34, "label": "Storage" } }
      ]
    }
  ]
}
```

---

**End of Plan**

*This document will be updated as implementation progresses.*
