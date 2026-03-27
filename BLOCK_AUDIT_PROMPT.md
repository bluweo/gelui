# Block Audit & Primitive Completion Prompt

Use this prompt to audit any block on the primitives page. Copy the prompt below and replace `[BLOCK_NAME]` with the target block (e.g., "Badges & Labels", "Input Fields", "Controls", "Feedback", "Navigation", etc.).

---

## Prompt

> Audit the **[BLOCK_NAME]** block on the primitives page (`/design-system/primitives`).
>
> ### Step 1: Identify all UI elements in the block
> Read the block's demo component and the Astro page section. List every UI element shown.
>
> ### Step 2: Check each element has a primitive
> For each UI element, check:
> - Does a primitive component exist in `src/primitives/`?
> - Is it registered in `src/registry/registry.json` with correct props?
> - Is it exported from `src/primitives/index.ts` (PRIMITIVE_MAP)?
>
> If any element is rendered with raw HTML/Tailwind instead of a primitive, flag it.
>
> ### Step 3: Create missing primitives
> For each missing primitive:
> 1. Create the `.tsx` file in the appropriate `src/primitives/` subdirectory
> 2. Use CSS classes (`@utility` or Tailwind) — NO inline style objects (SSR safety)
> 3. Follow the contrast system: use `--theme-*` CSS vars for glass panels, `contrast-*` for transparent backgrounds
> 4. Add to `src/primitives/index.ts` PRIMITIVE_MAP
> 5. Add to `src/registry/registry.json` with full props
>
> ### Step 4: Update the block demo to use primitives
> Replace any raw HTML/Tailwind in the demo component with the proper primitive components.
> Ensure the block looks polished — proper spacing, alignment, contrast.
>
> ### Step 5: Update the code modal
> The block should have a `*WithSource.tsx` or `*Source.tsx` file with:
> - **Source tab**: Example usage code showing how to compose the block
> - **Components tab**: All primitives used, with:
>   - `implementation`: auto-loaded via `import IMPL from "@/primitives/path/Component.tsx?raw"`
>   - `props`: complete prop definitions matching the actual TypeScript interface
>
> If the `*WithSource` file doesn't exist, create it following the pattern in `ButtonsShowcaseWithSource.tsx`.
>
> ### Step 6: Verify
> 1. Zero hydration errors on the primitives page
> 2. Zero console errors
> 3. Block renders correctly with all primitives
> 4. Code modal Source tab shows correct usage
> 5. Code modal Components tab shows all primitives with props + auto-loaded implementation
> 6. Registry entries match actual code
>
> ### Rules (from CLAUDE.md)
> - SSR Safety: NO inline style objects with number values, NO `Math.random()` in render, NO browser APIs during render
> - Tailwind v4: NO ancestor selectors inside `@utility`, NO template literal class names (use static lookup maps)
> - Contrast: use `--btn-*` / `--icon-btn-*` CSS vars for buttons, `glass-type-*` for text inside glass panels, `contrast-*` for transparent backgrounds
> - Code modals: use `?raw` Vite imports for implementation code — zero manual string maintenance
> - Always update `src/registry/registry.json` when adding/changing components
> - Always run verification via preview tools before committing

---

## Example Usage

To audit the Feedback block:
> Audit the **Feedback** block on the primitives page.

To audit all blocks systematically:
> Audit each block on the primitives page one by one: Typography, Buttons, Glass Surfaces, Surfaces Extras, Card Panels, Dividers, Input Fields, Advanced Inputs, Badges & Labels, Data Display, Controls, Glass Controls, Layout, Elevation, Feedback, Navigation, Navigation Extras. For each block, follow the audit steps.

---

## Quick Reference: Existing Block Files

| Block | Demo Component | WithSource File | data-view-source |
|-------|---------------|-----------------|-----------------|
| Typography | TypePresetsTable | — | — |
| Typography Extras | TypographyExtras | TypographyExtrasWithSource | typography-extras |
| Buttons | ButtonsShowcase + ButtonsRightColumn | ButtonsShowcaseWithSource | buttons |
| Glass Surfaces | (Astro inline) | GlassSurfacesSource | glass-surfaces |
| Surfaces Extras | SurfacesExtras | SurfacesExtrasWithSource | surfaces-extras |
| Card Panels | (Astro inline) | CardPanelsSource | card-panels |
| Dividers | (Astro inline) | DividersSource | dividers |
| Input Fields | InputFieldsDemo | InputFieldsSource | input-fields |
| Advanced Inputs | FormsShowcase | FormsShowcaseWithSource | advanced-inputs |
| Badges & Labels | BadgesShowcaseV2 | BadgesShowcaseWithSource | badges |
| Data Display | DataShowcase | — | — |
| Controls | ControlsDemo | — | — |
| Glass Controls | GlassControlsDemo | — | — |
| Layout | LayoutShowcase | — | — |
| Elevation | ElevationShowcase | — | — |
| Feedback | FeedbackShowcaseV2 | — | — |
| Navigation | PrimitiveNavigation | — | — |
| Navigation Extras | NavigationExtras | — | — |

**Blocks without `WithSource` files need them created.**
**Blocks without `data-view-source` need the `<>` icon button added.**
