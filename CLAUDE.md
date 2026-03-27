# GelUI Design System — AI Instructions

## Project Overview
Astro 6 + React 19 + Tailwind CSS v4 glassmorphism design system.
Dev server: `npm run dev` (port 4322). Use preview tools, not Bash, for dev server.

## Architecture (6 Layers)
1. **Tokens** (`src/tokens/`) — colors, spacing, typography, glass, motion
2. **Primitives** (`src/primitives/`) — 60+ React components (buttons, inputs, surfaces, etc.)
3. **Components** (`src/components/`) — app shell, modals, context providers
4. **Block** (`src/components/block/`) — showcase/demo components for docs
5. **Pages** (`src/pages/`) — Astro pages for design system docs
6. **Registry** (`src/registry/registry.json`) — single source of truth for all components

## Component Registry
**ALWAYS read `src/registry/registry.json` before creating or modifying components.**
- 99 entries across 6 layers, 14 categories
- Each entry has: id, props, path, status, tags, description
- When adding/changing components: UPDATE the registry entry
- Run `npm run registry:check` to validate

## SSR Safety Rules (CRITICAL)
1. NEVER use `Math.random()`, `Date.now()` in render
2. NEVER read `window`, `document`, `localStorage` during render — only in `useEffect`
3. NEVER use inline style objects with number values (`paddingTop: 3`) — use strings (`"3px"`) or CSS classes
4. NEVER use `var()` fallbacks with commas inside `@utility` blocks — Tailwind v4 breaks
5. NEVER use ancestor selectors (`[data-contrast] &`) inside `@utility` blocks — breaks ALL utility generation
6. ALWAYS ensure same initial state SSR vs client
7. Target: ZERO hydration warnings on all pages

## Tailwind v4 Rules
- `@utility` blocks must use simple selectors only (no ancestor selectors, no nested var() fallbacks)
- Dynamic class names (template literals like `` `prim-btn-${size}` ``) are NOT scanned — use static lookup maps
- Contrast-aware styling uses CSS custom properties on `[data-contrast]` selectors (outside `@utility`)

## Contrast System
- **`contrast-text` / `contrast-muted`** — adapts to page background luminance
- **`glass-type-title` / `glass-type-sub`** — for text inside glass panels (always dark in light mode)
- **`--btn-*` CSS vars** — button colors adapt via `[data-contrast="dark"]`
- **`--icon-btn-*` CSS vars** — icon button colors, with glass panel overrides
- Components on transparent backgrounds: use `contrast-*`
- Components inside glass panels: use `glass-type-*` or theme colors

## Button Primitives
- `<Button variant="solid|ghost|glass|gel|link" size="sm|md|lg" shape="pill|rounded|circle">`
- `<IconButton size="sm|md|lg" title="...">` — contrast-aware circle button for tools/utility
- `<Button variant="gel" shape="circle">` — volumetric gel icon button for content
- `<LinkButton underline arrow>` — text link button

## Code Modals (ViewSourceModal)
- 2 tabs: Source + Components (with accordion props table + implementation)
- Implementation code auto-loaded via `?raw` Vite imports — zero manual maintenance
- Pattern: `import IMPL from "@/primitives/path/Component.tsx?raw"`
- When changing component files, modals update automatically

## Font System
- Type presets use CSS classes (`.type-h1`, `.type-body`, etc.) with `calc(size * var(--type-scale))`
- Font families set via `--font-heading`, `--font-body`, `--font-ui`, `--font-mono` on `:root`
- BaseLayout.astro blocking script restores presets from localStorage before paint
- All block titles use `.type-h2`, overlines use `.type-overline`, descriptions use `.type-body-sm`

## File Patterns
- `*WithSource.tsx` — wraps a demo component + ViewSourceModal with `?raw` imports
- `*Source.tsx` — standalone ViewSourceModal (no demo wrapper)
- Primitives export from `src/primitives/index.ts` via PRIMITIVE_MAP

## Key Commands
```bash
npm run dev          # Start dev server (port 4322)
npm run registry:check  # Validate registry
npm run registry:sync   # Fix broken paths
```

## Git Conventions
- Version in `src/components/footer/DSFooter.tsx` default prop
- Tag format: `v0.XX.0`
- Always verify with preview tools before committing
- Kill stale dev servers: `lsof -ti:4322 | xargs kill -9`
