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
</Card>`;

const COMPONENTS = [
  {
    name: "Card",
    path: "@/primitives/surfaces",
    description: "Glass card container with configurable variant and frost zone",
    implementation: IMPL_CARD,
    props: [
      { name: "variant", type: "enum", options: ["glass", "gel", "solid", "transparent"], default: '"glass"' },
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
];

export function CardPanelsSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="card-panels"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Card Panels" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
