# Component Architecture & Registry Sync Plan

## Vision

Establish a scalable component architecture where:
1. Each primitive is its own file (easy to find, edit, test)
2. Registry stays in sync with actual code (never stale)
3. Higher-level components compose from primitives (no duplication)
4. The registry page always shows accurate information

---

## Phase 1: Split Primitives into Individual Files

### Goal
Split `src/dsl/primitives.tsx` (2764 lines, 41 components) into individual files organized by category.

### New Folder Structure

```
src/
  primitives/                          ← NEW root for all primitive components
    │
    ├── hooks/                         ← Shared hooks used by primitives
    │   ├── useDarkMode.ts             ← MutationObserver on data-theme
    │   └── useClickOutside.ts         ← Click outside detection for dropdowns
    │
    ├── typography/                    ← 6 components
    │   ├── Heading.tsx
    │   ├── Text.tsx
    │   ├── Label.tsx
    │   ├── Caption.tsx
    │   ├── Code.tsx
    │   ├── Link.tsx
    │   └── index.ts                   ← barrel export
    │
    ├── buttons/                       ← 3 components
    │   ├── Button.tsx
    │   ├── IconButton.tsx
    │   ├── LinkButton.tsx
    │   └── index.ts
    │
    ├── surfaces/                      ← 3 components
    │   ├── Card.tsx
    │   ├── Surface.tsx
    │   ├── Divider.tsx
    │   └── index.ts
    │
    ├── inputs/                        ← 5 components
    │   ├── Input.tsx
    │   ├── SearchInput.tsx
    │   ├── Textarea.tsx
    │   ├── Select.tsx
    │   ├── SearchableSelect.tsx
    │   └── index.ts
    │
    ├── controls/                      ← 5 components
    │   ├── Toggle.tsx
    │   ├── Checkbox.tsx
    │   ├── Radio.tsx
    │   ├── SegmentedControl.tsx
    │   ├── Slider.tsx
    │   └── index.ts
    │
    ├── layout/                        ← 6 components
    │   ├── Box.tsx
    │   ├── Stack.tsx
    │   ├── Inline.tsx
    │   ├── Center.tsx
    │   ├── Spacer.tsx
    │   ├── Grid.tsx
    │   └── index.ts
    │
    ├── feedback/                      ← 6 components
    │   ├── Spinner.tsx
    │   ├── Progress.tsx
    │   ├── Skeleton.tsx
    │   ├── Modal.tsx
    │   ├── Overlay.tsx
    │   ├── Tooltip.tsx
    │   └── index.ts
    │
    ├── data/                          ← 3 components
    │   ├── Badge.tsx
    │   ├── Tag.tsx
    │   ├── Avatar.tsx
    │   └── index.ts
    │
    ├── navigation/                    ← 4 components
    │   ├── TabBar.tsx
    │   ├── PillTabs.tsx
    │   ├── NavItem.tsx
    │   ├── Breadcrumb.tsx
    │   └── index.ts
    │
    └── index.ts                       ← Master re-export + PRIMITIVE_MAP

```

### Barrel Export Pattern

Each category `index.ts`:
```ts
// src/primitives/buttons/index.ts
export { Button } from "./Button";
export { IconButton } from "./IconButton";
export { LinkButton } from "./LinkButton";
```

Master `index.ts`:
```ts
// src/primitives/index.ts
export * from "./typography";
export * from "./buttons";
export * from "./surfaces";
export * from "./inputs";
export * from "./controls";
export * from "./layout";
export * from "./feedback";
export * from "./data";
export * from "./navigation";

// PRIMITIVE_MAP for DSL Renderer
import { Button, IconButton, LinkButton } from "./buttons";
import { Heading, Text, Label, Caption, Code, Link } from "./typography";
// ... all imports

export const PRIMITIVE_MAP: Record<string, React.ComponentType<any>> = {
  "button": Button,
  "icon-button": IconButton,
  // ... all 41 mappings
};
```

### What Happens to `src/dsl/primitives.tsx`

Becomes a thin re-export:
```ts
// src/dsl/primitives.tsx — backwards compatibility
export * from "@/primitives";
export { PRIMITIVE_MAP } from "@/primitives";
```

### Import Updates Needed

| File | Old Import | New Import |
|------|-----------|------------|
| `src/dsl/renderer.tsx` | `from "./primitives"` | `from "@/primitives"` (or keep re-export) |
| `src/pages/ui-dsl/index.astro` | `from "@/dsl/primitives"` | `from "@/primitives"` |
| Future primitives page | Hand-coded HTML | `from "@/primitives/buttons"` |

### Steps
1. Create `src/primitives/` folder structure
2. Extract shared hooks (useDarkMode, useClickOutside) first
3. Extract shared types (BaseProps) to `src/primitives/types.ts`
4. Extract each component to its own file (copy from primitives.tsx)
5. Create barrel exports (index.ts files)
6. Create master PRIMITIVE_MAP in `src/primitives/index.ts`
7. Update `src/dsl/primitives.tsx` to re-export from `@/primitives`
8. Verify all pages still work
9. Delete the original 2764-line file content (keep re-export only)

### Effort: ~2-3 hours (mostly mechanical file splitting)

---

## Phase 2: Enhanced Registry Validation (Option C)

### Goal
Ensure registry.json and component files stay in sync via validation scripts.

### Enhanced `validate.ts`

Currently checks:
- ✅ Unique IDs
- ✅ Valid layer/category/status values
- ✅ Required fields present

Add these checks:
- 🆕 **File existence**: Every registry entry with `path` → file must exist
- 🆕 **Orphan detection**: Every `src/primitives/**/*.tsx` file → must have a registry entry
- 🆕 **Export check**: If `exportName` is set → that export must exist in the file
- 🆕 **Props drift warning**: Compare TypeScript interface props with registry `props` schema (optional, advanced)

### New Script: `registry:check`

```bash
npm run registry:check
```

Output example:
```
✅ Registry Validation
  74 components checked

📁 File Check
  ✅ 41 files found
  ⚠  2 orphans (files without registry entry):
     → src/primitives/buttons/SubmitButton.tsx
     → src/primitives/inputs/PhoneInput.tsx

🔗 Export Check
  ✅ 39 exports verified
  ⚠  2 missing exports:
     → custom-select: "Select" not found in src/primitives/inputs/Select.tsx

📋 Summary
  67 stable · 5 beta · 2 planned
  2 warnings · 0 errors
```

### New Script: `registry:add`

Interactive CLI that:
1. Scans `src/primitives/` for files NOT in registry
2. For each orphan, prompts:
   - ID (auto-suggest from filename: `Button.tsx` → `button`)
   - Display name
   - Layer (default: primitive)
   - Category (auto-detect from folder: `buttons/` → `interactive`)
   - Status (default: beta)
   - Tags (auto-suggest from filename)
3. Adds entry to `registry.json`
4. Sorts entries by layer → category → name

### New Script: `registry:sync`

Automated sync that:
1. Reads all `src/primitives/**/*.tsx` files
2. Parses TypeScript for exported function names
3. Updates registry `path` fields if files moved
4. Updates registry `exportName` if renamed
5. Reports any entries pointing to deleted files

### package.json Scripts

```json
{
  "scripts": {
    "registry:check": "tsx src/registry/validate.ts",
    "registry:add": "tsx src/registry/add-component.ts",
    "registry:sync": "tsx src/registry/sync.ts"
  }
}
```

### Files to Create

```
src/registry/
  validate.ts          ← UPGRADE: add file/orphan/export checks
  add-component.ts     ← NEW: interactive CLI to add registry entries
  sync.ts              ← NEW: auto-sync paths and exports
  utils.ts             ← NEW: shared scanning/parsing utilities
```

### Steps
1. Create `src/registry/utils.ts` — file scanner, export parser
2. Upgrade `validate.ts` — add bi-directional checks
3. Create `add-component.ts` — interactive CLI
4. Create `sync.ts` — automated path/export sync
5. Add npm scripts to `package.json`
6. Run `npm run registry:check` to verify current state
7. Fix any drift found

### Effort: ~3-4 hours

---

## Phase 3: Registry Page Auto-Refresh

### Goal
Registry page (`/design-system/registry`) always shows latest data.

### Current Flow
```
registry.json → read at build time → passed as prop → RegistryViewer renders
```

This means changes to `registry.json` require a page reload (in dev) or rebuild (in production). In dev mode with Vite HMR, JSON changes auto-reload, so this already works well.

### Enhancement: Add "Last Validated" Indicator

Show on the Registry page:
```
Last validated: 2026-03-24 10:55 · 74 components · 0 errors
```

This comes from a `registry-meta.json` generated by `registry:check`:
```json
{
  "lastValidated": "2026-03-24T10:55:00Z",
  "totalComponents": 74,
  "errors": 0,
  "warnings": 2,
  "orphans": ["SubmitButton.tsx"]
}
```

### Steps
1. `validate.ts` outputs `registry-meta.json` alongside `registry.json`
2. Registry page reads both files
3. Shows validation status in the hero section

### Effort: ~1 hour

---

## Phase 4: Refactor Primitives Page to Use DSL Components

### Goal
Replace hand-coded HTML/React demos in the Primitives page with actual DSL primitive imports.

### Current Primitives Page React Islands

| File | Currently | Replace With |
|------|-----------|-------------|
| `InputFields.tsx` | Hand-coded inputs | `import { Input, SearchInput, Select, SearchableSelect, Textarea } from "@/primitives/inputs"` |
| `ControlsDemo.tsx` | Hand-coded toggle/checkbox/radio | `import { Toggle, Checkbox, Radio, SegmentedControl } from "@/primitives/controls"` |
| `GlassControlsDemo.tsx` | Hand-coded gel controls | Same primitives with `variant="gel"` prop |
| `NavigationDemo.tsx` | Hand-coded tabs/breadcrumb | `import { TabBar, PillTabs, NavItem, Breadcrumb } from "@/primitives/navigation"` |
| `SliderDemo.tsx` | Custom wrapper | `import { Slider } from "@/primitives/controls"` |
| `TypePresetsTable.tsx` | Custom (keep as-is) | No change — unique editing functionality |
| `primitives.astro` | Hand-coded buttons, badges, etc. | `import { Button, Badge, Card, ... } from "@/primitives"` via React islands |

### Approach

Since Astro pages can't directly render React components inline (only via `client:load` islands), I'll create thin wrapper islands:

```tsx
// src/components/block/ButtonsShowcase.tsx — React island
import { Button, IconButton, LinkButton } from "@/primitives/buttons";

export function ButtonsShowcase() {
  return (
    <div>
      <Button variant="solid" size="md">Apply</Button>
      <Button variant="ghost" size="md">Cancel</Button>
      {/* etc */}
    </div>
  );
}
```

Then in `primitives.astro`:
```astro
<ButtonsShowcase client:load />
```

### Benefits
- Primitives are proven to work (they render on the page)
- No duplication between `primitives.tsx` and page code
- Changes to `Button.tsx` automatically update the demo page
- The demo IS the component

### Files to Create/Update

```
src/components/block/
  ButtonsShowcase.tsx         ← NEW: uses @/primitives/buttons
  SurfacesShowcase.tsx        ← NEW: uses @/primitives/surfaces
  BadgesShowcase.tsx          ← NEW: uses @/primitives/data
  FeedbackShowcase.tsx        ← NEW: uses @/primitives/feedback

  InputFields.tsx             ← REWRITE: import from @/primitives/inputs
  ControlsDemo.tsx            ← REWRITE: import from @/primitives/controls
  GlassControlsDemo.tsx       ← REWRITE: import from @/primitives/controls (gel variant)
  NavigationDemo.tsx          ← REWRITE: import from @/primitives/navigation

src/pages/design-system/
  primitives.astro            ← UPDATE: replace hand-coded HTML with islands
```

### Steps
1. Create showcase islands (ButtonsShowcase, SurfacesShowcase, etc.)
2. Rewrite InputFields.tsx to import from `@/primitives/inputs`
3. Rewrite ControlsDemo.tsx to import from `@/primitives/controls`
4. Rewrite GlassControlsDemo.tsx (same primitives, gel variant)
5. Rewrite NavigationDemo.tsx to import from `@/primitives/navigation`
6. Update `primitives.astro` to use new islands
7. Remove old hand-coded HTML sections
8. Verify all sections still work and look the same

### Effort: ~4-5 hours

---

## Phase 5: JSDoc Metadata + Auto-Generation (Future — Option B)

### Goal
Evolve from manual registry updates to automatic generation.

### Component File Format

```tsx
// src/primitives/buttons/Button.tsx

/**
 * @registry
 * @id button
 * @name Button
 * @displayName Gel Button
 * @description Multi-variant button with solid, ghost, glass, gel, and link styles
 * @layer primitive
 * @category interactive
 * @status stable
 * @version 0.13.0
 * @tags button, action, interactive, click, submit
 * @documentedOn /design-system/primitives
 * @section Buttons
 */

export interface ButtonProps {
  /** Button visual style */
  variant?: "solid" | "ghost" | "glass" | "gel" | "link";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button content */
  children?: ReactNode;
}

export function Button({ variant = "solid", size = "md", ... }: ButtonProps) {
  // ...
}
```

### Auto-Generation Script

```bash
npm run registry:generate
```

Scans all `src/primitives/**/*.tsx` files:
1. Reads `@registry` JSDoc tags → extracts metadata
2. Reads TypeScript `interface *Props` → extracts props schema
3. Reads `export function *` → extracts export names
4. Generates `registry.json` automatically
5. No manual editing of registry.json needed

### Tools/Libraries Needed
- `typescript` compiler API (already have) — parse TypeScript ASTs
- `ts-morph` (optional) — easier TypeScript AST manipulation
- Custom JSDoc parser — extract `@registry` tags

### Steps
1. Define JSDoc tag format (`@registry`, `@id`, `@name`, etc.)
2. Add JSDoc to all 41 component files
3. Build `registry:generate` script using TypeScript compiler API
4. Run and verify output matches current `registry.json`
5. Add to build pipeline (`prebuild: npm run registry:generate`)
6. registry.json becomes a generated artifact (gitignored or committed as cache)

### Effort: ~6-8 hours

---

## Implementation Order

| # | Phase | What | Effort | Priority |
|---|-------|------|--------|----------|
| 1 | Phase 1 | Split primitives into individual files | 2-3 hours | 🔴 HIGH |
| 2 | Phase 2 | Enhanced registry validation + CLI | 3-4 hours | 🔴 HIGH |
| 3 | Phase 4 | Refactor Primitives page to use DSL | 4-5 hours | 🟡 MEDIUM |
| 4 | Phase 3 | Registry page auto-refresh indicator | 1 hour | 🟢 LOW |
| 5 | Phase 5 | JSDoc auto-generation | 6-8 hours | 🔵 FUTURE |

**Total: ~16-21 hours for Phases 1-4, +6-8 hours for Phase 5**

### Recommended Starting Point
**Phase 1** (split files) is the foundation — everything else depends on having individual component files. Start there.

---

## Summary

```
TODAY (v0.13):
  primitives.tsx (one big file) → registry.json (manual) → Registry page

AFTER Phase 1-2 (v0.14):
  src/primitives/**/*.tsx (individual files) → registry:check → registry.json → Registry page

AFTER Phase 3-4 (v0.15):
  Individual files + Primitives page uses real components + validation indicator

FUTURE Phase 5 (v1.0):
  Individual files + @registry JSDoc → registry:generate → registry.json → Registry page (fully automated)
```
