import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `/* ═══════════════════════════════════════
   Glass Surfaces — CSS Classes
   No component import needed — add classes to any element
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
</div>

/* ═══════════════════════════════════════
   React Components — Surface & Card
   ═══════════════════════════════════════ */

import { Surface, Card } from "@/primitives/surfaces";

// Surface — simple glass level wrapper
<Surface level={1}>Card content</Surface>
<Surface level={2}>Modal content</Surface>

// Card — with variant + frost options
<Card variant="glass" frost="standard">Standard card</Card>
<Card variant="gel">Gel card</Card>
<Card variant="solid">Opaque card</Card>
<Card variant="transparent">Border-only card</Card>`;

const IMPL_SURFACE = `import type { BaseProps } from "../types";

interface SurfaceProps extends BaseProps {
  level?: 0 | 1 | 2 | 3;
}

export function Surface({ level = 1, children, className = "", style }: SurfaceProps) {
  return (
    <div className={\`glass-\${level} rounded-[var(--glass-radius,16px)] p-4 \${className}\`} style={style}>
      {children}
    </div>
  );
}`;

const IMPL_CARD = `import type { BaseProps } from "../types";

interface CardProps extends BaseProps {
  variant?: "glass" | "gel" | "solid" | "transparent";
  frost?: "standard" | "haze" | "directional" | "none";
}

export function Card({ variant = "glass", frost = "standard", children, className = "", style }: CardProps) {
  const variantClasses: Record<string, string> = {
    glass: "glass-1 glass-specular",
    gel: "gel-glass glass-specular",
    solid: "",
    transparent: "",
  };
  const frostClass = frost === "standard" ? "ds-card-frost"
    : frost === "haze" ? "ds-card-frost-haze"
    : frost === "directional" ? "token-hero-frost" : "";

  return (
    <div className={\`relative overflow-hidden rounded-[var(--glass-radius,16px)] p-5 \${variantClasses[variant]} \${className}\`}
      style={{ ...(variant === "solid" ? { background: "var(--theme-table-bg)", border: "1px solid var(--theme-divider)" } : variant === "transparent" ? { border: "1px solid var(--theme-divider)" } : {}), ...style }}>
      {frostClass && <div className={\`absolute inset-x-0 top-0 pointer-events-none \${frostClass}\`} style={{ height: frost === "directional" ? "100%" : "160px" }} />}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}`;

const COMPONENTS = [
  { name: "glass-transparent", path: "CSS class", description: "Border only, fully see-through — no blur, no tint" },
  { name: "glass-0", path: "CSS class", description: "Minimal blur (8px), light tint — for subtle backgrounds" },
  { name: "glass-1", path: "CSS class", description: "Standard blur + tint — default card surface, most common" },
  { name: "glass-2", path: "CSS class", description: "Stronger blur — for modals and dialogs" },
  { name: "glass-3", path: "CSS class", description: "Maximum blur — for overlays and heavy backdrops" },
  { name: "gel-glass", path: "CSS class", description: "Volumetric inset shadows + specular — premium feel" },
  { name: "glass-specular", path: "CSS class", description: "Adds noise texture + specular lighting filter (combine with glass-1/2/3)" },
  {
    name: "Surface",
    path: "@/primitives/surfaces",
    description: "React wrapper — maps level prop to glass-0 through glass-3 CSS classes",
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
    description: "Glass card with variant styling and optional frost overlay zone",
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
    <ViewSourceModal
      open={open}
      onClose={() => setOpen(false)}
      title="Glass Surfaces"
      code={SOURCE_CODE}
      components={COMPONENTS}
    />
  );
}
