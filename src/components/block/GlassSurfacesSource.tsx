import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_SURFACE from "@/primitives/surfaces/Surface.tsx?raw";
import IMPL_CARD from "@/primitives/surfaces/Card.tsx?raw";

const SOURCE_CODE = `/* Glass Surfaces — CSS Classes */
/* No component import needed — add classes to any element */

/* Transparent — border only */
<div class="glass-transparent rounded-[var(--glass-radius)] p-4">...</div>

/* Subtle — minimal blur */
<div class="glass-0 rounded-[var(--glass-radius)] p-4">...</div>

/* Card — standard glass (most common) */
<div class="glass-1 glass-specular rounded-[var(--glass-radius)] p-4">...</div>

/* Modal — stronger blur */
<div class="glass-2 glass-specular rounded-[var(--glass-radius)] p-4">...</div>

/* Overlay — maximum blur */
<div class="glass-3 glass-specular rounded-[var(--glass-radius)] p-4">...</div>

/* Gel — volumetric inset shadows */
<div class="gel-glass rounded-[var(--glass-radius)] p-4">...</div>

/* Solid — 100% opaque */
<div class="bg-white dark:bg-[#1a1a1a] rounded-[var(--glass-radius)] p-4">...</div>

/* React Components */
import { Surface, Card } from "@/primitives/surfaces";

<Surface level={1}>Card content</Surface>
<Surface level={2}>Modal content</Surface>

<Card variant="glass" frost="standard">Standard card</Card>
<Card variant="gel">Gel card</Card>
<Card variant="solid">Opaque card</Card>`;

const COMPONENTS = [
  { name: "glass-transparent", path: "CSS class", description: "Border only, fully see-through — no blur, no tint" },
  { name: "glass-0", path: "CSS class", description: "Minimal blur (8px), light tint — for subtle backgrounds" },
  { name: "glass-1", path: "CSS class", description: "Standard blur + tint — default card surface, most common" },
  { name: "glass-2", path: "CSS class", description: "Stronger blur — for modals and dialogs" },
  { name: "glass-3", path: "CSS class", description: "Maximum blur — for overlays and heavy backdrops" },
  { name: "gel-glass", path: "CSS class", description: "Volumetric inset shadows + specular — premium feel" },
  { name: "glass-specular", path: "CSS class", description: "Adds noise texture + specular lighting filter" },
  {
    name: "Surface",
    path: "@/primitives/surfaces",
    description: "React wrapper — maps level prop to glass CSS classes",
    implementation: IMPL_SURFACE,
    props: [
      { name: "level", type: "enum", options: ["0", "1", "2", "3"], default: "1" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Card",
    path: "@/primitives/surfaces",
    description: "Glass card with variant styling and optional frost overlay",
    implementation: IMPL_CARD,
    props: [
      { name: "variant", type: "enum", options: ["glass", "gel", "solid", "transparent"], default: '"glass"' },
      { name: "frost", type: "enum", options: ["standard", "haze", "directional", "none"], default: '"standard"' },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
];

export function GlassSurfacesSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="glass-surfaces"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Glass Surfaces" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
