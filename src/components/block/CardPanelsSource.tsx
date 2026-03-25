import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

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

const IMPL_CARD = `import type { BaseProps } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";

interface CardProps extends BaseProps {
  variant?: "glass" | "gel" | "solid" | "transparent";
  frost?: "standard" | "haze" | "directional" | "none";
}

export function Card({
  variant = "glass",
  frost = "standard",
  children,
  className = "",
  style,
}: CardProps) {
  const isDark = useDarkMode();

  const variantClasses: Record<string, string> = {
    glass: "glass-1 glass-specular",
    gel: "gel-glass glass-specular",
    solid: "",
    transparent: "",
  };

  const frostClass =
    frost === "standard" ? "ds-card-frost"
    : frost === "haze" ? "ds-card-frost-haze"
    : frost === "directional" ? "token-hero-frost"
    : "";

  return (
    <div
      className={\`relative overflow-hidden rounded-[var(--glass-radius)] p-5 \${variantClasses[variant]} \${className}\`}
      style={{
        ...(variant === "solid"
          ? { background: isDark ? "#1a1a1a" : "rgba(255,255,255,0.95)" }
          : variant === "transparent"
            ? { border: \`1px solid \${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}\` }
            : {}),
        ...style,
      }}
    >
      {frostClass && (
        <div
          className={\`absolute inset-x-0 top-0 pointer-events-none \${frostClass}\`}
          style={{ height: frost === "directional" ? "100%" : "160px" }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}`;

const COMPONENTS = [
  { name: "Card", path: "@/primitives/surfaces", description: "Glass card container with configurable variant and frost zone", implementation: IMPL_CARD },
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
