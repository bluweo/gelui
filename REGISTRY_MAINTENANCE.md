# Registry Maintenance Guide for AI Automation

## Purpose
The registry (`src/registry/registry.json`) is the **single source of truth** for all UI primitives, components, and CSS utilities in the GelUI design system. AI uses it to discover, select, and compose components when building UI pages.

## When to Update the Registry

Update the registry whenever you:
1. **Add a new primitive or component** — add a full entry with props, path, tags
2. **Change component props** — update the props object to match the actual interface
3. **Change component status** — e.g., from "planned" to "stable" when implemented
4. **Add new CSS utility classes** — register them with `path: "src/styles/global.css"` and `isReact: false`
5. **Remove or deprecate a component** — set `status: "deprecated"` (don't delete the entry)
6. **Change file paths** — update the `path` field if files are moved

## Registry Entry Schema

```json
{
  "id": "kebab-case-id",
  "name": "ComponentName",
  "displayName": "Human Readable Name",
  "description": "Clear description of what this component does and when to use it. Include contrast/SSR notes if relevant.",
  "layer": "primitive | component | pattern | layout | token | core",
  "category": "typography | interactive | form | feedback | surface | layout | navigation | data | media | glass | overlay",
  "status": "stable | beta | experimental | deprecated | planned",
  "version": "0.43.0",
  "path": "src/primitives/category/ComponentName.tsx",
  "isReact": true,
  "exportName": "ComponentName",
  "props": {
    "propName": {
      "type": "string | number | boolean | enum | ReactNode | CSSProperties | () => void",
      "options": ["option1", "option2"],
      "default": "defaultValue",
      "description": "What this prop does"
    }
  },
  "documentedOn": "/design-system/primitives",
  "section": "Section Name on the page",
  "tags": ["searchable", "keywords", "for", "discovery"]
}
```

## Key Rules

### Props Must Match Actual Code
Every prop in the component's TypeScript interface MUST be in the registry. Check the actual `.tsx` file:
```bash
grep -A 20 "interface.*Props" src/primitives/buttons/Button.tsx
```

### CSS-Only Components
For CSS utility classes (not React components), use:
```json
{
  "path": "src/styles/global.css",
  "isReact": false,
  "props": {}
}
```

### Contrast-Aware Components
If a component uses `--btn-*`, `--icon-btn-*`, or `contrast-*` CSS vars for background adaptation, mention it in the description:
```json
"description": "Contrast-aware via --btn-* CSS vars. Adapts to dark backgrounds automatically."
```

### Implementation Code Auto-Loading
Code modals use `?raw` Vite imports to auto-load implementation from actual source files. When you change a component file, the modal updates automatically. No manual string maintenance needed.

### PRIMITIVE_MAP
When adding a new primitive, also add it to `src/primitives/index.ts` PRIMITIVE_MAP so the DSL renderer can resolve it by string name.

## Validation

Run the registry validation script to check for issues:
```bash
npm run registry:check
```

This checks:
- Duplicate IDs
- Required fields present
- File paths exist
- Export names valid
- Orphaned files not in registry

## Quick Commands

```bash
# Validate registry
npm run registry:check

# Find orphan primitives (files not in registry)
npm run registry:sync

# Auto-add orphan files to registry
npm run registry:add
```

## AI Prompt Template

When asking AI to update the registry, use this prompt:

> Please update `src/registry/registry.json` to reflect the current state of the codebase:
> 1. Check all primitives in `src/primitives/` — ensure each has a registry entry with correct props
> 2. Check status: any "planned" components that now have implementations should be "stable"
> 3. Check props: compare each entry's props against the actual TypeScript interface in the source file
> 4. Update `lastUpdated` to today's date
> 5. Run `npm run registry:check` to validate

## File Locations

| File | Purpose |
|------|---------|
| `src/registry/registry.json` | Component registry data |
| `src/registry/types.ts` | TypeScript type definitions |
| `src/registry/validate.ts` | Validation script |
| `src/registry/sync.ts` | Path sync script |
| `src/registry/add-component.ts` | Auto-add orphans |
| `src/primitives/index.ts` | PRIMITIVE_MAP for DSL |
| `src/components/block/RegistryViewer.tsx` | Registry page viewer |
