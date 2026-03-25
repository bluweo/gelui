import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Divider } from "@/primitives/surfaces";

{/* Standard horizontal divider */}
<Divider />

{/* Bold divider */}
<Divider variant="bold" />

{/* Dashed divider */}
<Divider variant="dashed" />

{/* With label */}
<Divider label="or" />

{/* With icon */}
<Divider icon={<CircleIcon />} />

{/* Vertical divider */}
<Divider direction="vertical" />

{/* Inset (padded) divider */}
<Divider variant="inset" />

{/* Gradient fade */}
<Divider variant="gradient" />

{/* Section break (3 dots) */}
<Divider variant="dots" />

{/* Glass variants — for transparent backgrounds */}
<Divider variant="etched" />
<Divider variant="groove" />
<Divider variant="ridge" />
<Divider variant="frostedSlit" />

{/* Vertical glass */}
<Divider direction="vertical" variant="groove" />`;

const IMPL_DIVIDER = `import { useDarkMode } from "../hooks/useDarkMode";

interface DividerProps {
  variant?: "default" | "bold" | "dashed" | "inset" |
            "gradient" | "dots" | "etched" | "groove" |
            "ridge" | "frostedSlit";
  direction?: "horizontal" | "vertical";
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Divider({
  variant = "default",
  direction = "horizontal",
  label,
  icon,
  ...props
}: DividerProps) {
  const isDark = useDarkMode();

  // Default horizontal line
  if (variant === "default" && !label && !icon) {
    return (
      <div style={{
        width: direction === "vertical" ? "1px" : "100%",
        height: direction === "vertical" ? "100%" : "1px",
        background: isDark
          ? "rgba(255,255,255,0.15)"
          : "rgba(0,0,0,0.15)",
      }} />
    );
  }

  // Glass variants use box-shadow pairs
  // for a slit-like etched effect
  if (variant === "groove") {
    return (
      <div style={{ height: 2, width: "100%", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.3) 85%, transparent 100%)",
          height: 1,
        }} />
        <div style={{
          position: "absolute", top: 1, left: 0, right: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 15%, rgba(255,255,255,0.6) 85%, transparent 100%)",
          height: 1,
        }} />
      </div>
    );
  }

  // ... other variants
}`;

const COMPONENTS = [
  { name: "Divider", path: "@/primitives/surfaces", description: "Visual separator with 10+ variants including glass effects", implementation: IMPL_DIVIDER },
  { name: "default", path: "Variant", description: "Simple 1px line — light gray" },
  { name: "bold", path: "Variant", description: "2px thicker line for emphasis" },
  { name: "dashed", path: "Variant", description: "Dashed border style" },
  { name: "label", path: "Prop", description: 'Text in the middle: ── or ──' },
  { name: "gradient", path: "Variant", description: "Fade from transparent edges to visible center" },
  { name: "dots", path: "Variant", description: "Three dots section break (• • •)" },
  { name: "etched", path: "Glass variant", description: "Light-to-dark gradient slit for glass surfaces" },
  { name: "groove", path: "Glass variant", description: "Double-line groove effect (dark + light)" },
  { name: "ridge", path: "Glass variant", description: "Inverted groove (light + dark)" },
  { name: "frostedSlit", path: "Glass variant", description: "Blurred glass strip with translucent fill" },
];

export function DividersSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="dividers"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Dividers" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
