import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source file at build time
import IMPL_DIVIDER from "@/primitives/surfaces/Divider.tsx?raw";

const SOURCE_CODE = `import { Divider } from "@/primitives/surfaces";

{/* Standard horizontal */}
<Divider />
<Divider variant="bold" />
<Divider variant="dashed" />
<Divider variant="gradient" />

{/* With label or icon */}
<Divider label="or" />
<Divider icon={<CircleIcon />} />

{/* Section break (dots) */}
<Divider variant="dots" />

{/* Vertical */}
<div className="flex items-center gap-4 h-[40px]">
  <span>Left</span>
  <Divider direction="vertical" />
  <span>Right</span>
</div>

{/* Glass variants — for transparent/glass backgrounds */}
<Divider variant="etched" />
<Divider variant="groove" />
<Divider variant="ridge" />
<Divider variant="frostedSlit" />`;

const COMPONENTS = [
  {
    name: "Divider",
    path: "@/primitives/surfaces",
    description: "Visual separator with 10 variants including glass effects. Supports horizontal, vertical, labeled, and icon modes.",
    implementation: IMPL_DIVIDER,
    props: [
      { name: "variant", type: "enum", options: ["default", "bold", "dashed", "gradient", "glass", "etched", "groove", "ridge", "frostedSlit", "dots"], default: '"default"' },
      { name: "direction", type: "enum", options: ["horizontal", "vertical"], default: '"horizontal"' },
      { name: "label", type: "string" },
      { name: "icon", type: "ReactNode" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  { name: "default", path: "Variant", description: "Simple 1px line" },
  { name: "bold", path: "Variant", description: "2px thicker line for emphasis" },
  { name: "dashed", path: "Variant", description: "Dashed border style" },
  { name: "gradient", path: "Variant", description: "Fade from transparent edges to visible center" },
  { name: "dots", path: "Variant", description: "Three dots section break" },
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
