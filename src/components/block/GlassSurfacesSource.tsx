import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `/* ═══════════════════════════════════════
   Glass Surfaces — CSS Classes (primary approach)
   No component import needed — just add classes to any element
   ═══════════════════════════════════════ */

/* Transparent — border only, fully see-through */
<div class="glass-transparent rounded-[var(--glass-radius)] p-4">
  Content on transparent surface
</div>

/* Subtle — minimal blur, light tint */
<div class="glass-0 rounded-[var(--glass-radius)] p-4">
  Content on subtle glass
</div>

/* Card — standard glass surface (most common) */
<div class="glass-1 glass-specular rounded-[var(--glass-radius)] p-4">
  Content on card-level glass
</div>

/* Modal — stronger blur for dialogs */
<div class="glass-2 glass-specular rounded-[var(--glass-radius)] p-4">
  Content on modal-level glass
</div>

/* Overlay — maximum blur depth */
<div class="glass-3 glass-specular rounded-[var(--glass-radius)] p-4">
  Content on overlay-level glass
</div>

/* Gel — volumetric inset shadows + specular highlight */
<div class="gel-glass rounded-[var(--glass-radius)] p-4">
  <div class="gel-glass-shine"></div>
  Content on gel surface
</div>

/* Solid — 100% opaque, no transparency */
<div class="bg-white dark:bg-[#1a1a1a] rounded-[var(--glass-radius)] p-4">
  Content on solid surface
</div>`;

const CSS_CONFIG = `/* ═══════════════════════════════════════
   CSS Configuration — defined in global.css
   These classes are available globally
   ═══════════════════════════════════════ */

/* Glass levels use backdrop-filter for blur */
.glass-0 {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px) saturate(1.2);
}

.glass-1 {
  background: rgba(255, 255, 255, 0.23);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
}

.glass-2 {
  background: rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(calc(var(--glass-blur) * 1.5)) saturate(var(--glass-saturation));
}

.glass-3 {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(var(--glass-blur-strong)) saturate(var(--glass-saturation));
}

/* Specular adds noise + lighting filter */
.glass-specular {
  filter: url(#liquid-glass-panel);
}

/* Gel adds volumetric inset shadows */
.gel-glass {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(0, 0, 0, 0.08),
    var(--glass-shadow);
}

/* Dark mode overrides */
[data-theme="dark"] .glass-1 {
  background: rgba(0, 0, 0, 0.35);
}`;

const IMPL_SURFACE = `/* ═══════════════════════════════════════
   React Alternative — Surface component
   Use this in React islands when you need
   programmatic level changes or dark mode hooks
   ═══════════════════════════════════════ */

import { Surface } from "@/primitives/surfaces";

// Basic usage
<Surface level={1}>Card content</Surface>

// With custom styles
<Surface level={2} style={{ padding: 24 }}>
  Modal content with stronger blur
</Surface>

// Gel variant
<Surface level={1} variant="gel">
  Volumetric gel surface
</Surface>

/* The Surface component maps to CSS classes internally:
   level 0 → glass-0
   level 1 → glass-1 glass-specular
   level 2 → glass-2 glass-specular
   level 3 → glass-3 glass-specular
*/`;

const COMPONENTS = [
  { name: "glass-transparent", path: "CSS class", description: "Border only, fully see-through — no blur, no tint" },
  { name: "glass-0", path: "CSS class", description: "Minimal blur (8px), light tint — for subtle backgrounds" },
  { name: "glass-1", path: "CSS class", description: "Standard blur + tint — default card surface, most common" },
  { name: "glass-2", path: "CSS class", description: "Stronger blur — for modals and dialogs" },
  { name: "glass-3", path: "CSS class", description: "Maximum blur — for overlays and heavy backdrops" },
  { name: "gel-glass", path: "CSS class", description: "Volumetric inset shadows + specular — premium feel" },
  { name: "glass-specular", path: "CSS class", description: "Adds noise texture + specular lighting filter (combine with glass-1/2/3)" },
  { name: "Surface", path: "@/primitives/surfaces", description: "React component wrapper — programmatic level control", implementation: IMPL_SURFACE },
  { name: "Card", path: "@/primitives/surfaces", description: "Glass card with frost zone support" },
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
    <ViewSourceModal
      open={open}
      onClose={() => setOpen(false)}
      title="Glass Surfaces"
      code={SOURCE_CODE}
      components={COMPONENTS}
      extraTabs={[
        { label: "CSS Config", code: CSS_CONFIG },
      ]}
    />
  );
}
