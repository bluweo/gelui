import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source file at build time
import IMPL_CARD from "@/primitives/surfaces/Card.tsx?raw";

const SOURCE_CODE = `import { Card } from "@/primitives/surfaces";

{/* 1. Standard — glass + 95% frost */}
<Card variant="glass" frost="standard">
  <h3>Standard Card</h3>
  <p>Default for text-heavy content. Maximum readability.</p>
</Card>

{/* 2. Haze — glass + 35% frost (see-through) */}
<Card variant="glass" frost="haze">
  <h3>Haze Card</h3>
  <p>Partial see-through. Background shows through lightly.</p>
</Card>

{/* 3. Transparent — border only, no glass */}
<Card variant="transparent" frost="none">
  <h3>Transparent Card</h3>
  <p>Content floats on the wallpaper. Border-only container.</p>
</Card>

{/* 4. Plain Glass — blur without frost overlay */}
<Card variant="glass" frost="none">
  <h3>Plain Glass Card</h3>
  <p>Glass blur without frost. For small cards and badges.</p>
</Card>

{/* 5. Directional — left-to-right frost gradient */}
<Card variant="glass" frost="directional">
  <h3>Directional Card</h3>
  <p>Left side readable, right side shows through.</p>
</Card>

{/* 6. Solid — 100% opaque, no transparency */}
<Card variant="solid" frost="none">
  <h3>Solid Card</h3>
  <p>Fully opaque. Maximum contrast for critical content.</p>
</Card>

{/* 7. Gel Standard — volumetric shadows + specular */}
<Card variant="gel">
  <h3>Gel Standard</h3>
  <p>Premium feel with volumetric inset shadows.</p>
</Card>

{/* 8. Gel Floating — elevated with stronger outer shadow */}
<Card variant="gel-floating">
  <h3>Gel Floating</h3>
  <p>Appears to float above the background.</p>
</Card>

{/* 9. Gel Inset — pressed/recessed look */}
<Card variant="gel-inset">
  <h3>Gel Inset</h3>
  <p>Pressed into the background. For input wells and nested containers.</p>
</Card>`;

const COMPONENTS = [
  {
    name: "Card",
    path: "@/primitives/surfaces",
    description: "Glass card container with 6 variants including 3 gel styles",
    implementation: IMPL_CARD,
    props: [
      { name: "variant", type: "enum", options: ["glass", "gel", "gel-floating", "gel-inset", "solid", "transparent"], default: '"glass"' },
      { name: "frost", type: "enum", options: ["standard", "haze", "directional", "none"], default: '"standard"' },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  { name: "ds-card-frost", path: "CSS class", description: "Standard frost zone — 95% white/black gradient, top-to-bottom" },
  { name: "ds-card-frost-haze", path: "CSS class", description: "Haze frost zone — 35% opacity, subtle see-through" },
  { name: "token-hero-frost", path: "CSS class", description: "Directional frost — left-to-right gradient for text + image layouts" },
  { name: "glass-1", path: "CSS class", description: "Standard glass surface with backdrop blur" },
  { name: "glass-specular", path: "CSS class", description: "Adds noise texture + specular lighting filter" },
  { name: "gel-glass", path: "CSS class", description: "Gel standard — volumetric inset shadows + specular highlight" },
  { name: "gel-card-floating", path: "CSS class", description: "Gel floating — elevated outer shadow, appears to float above background" },
  { name: "gel-card-inset", path: "CSS class", description: "Gel inset — pressed/recessed look with reversed inset shadows" },
];

export function CardPanelsSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-view-source="card-panels"]');
      if (target) setOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Card Panels" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
