import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source file at build time
import IMPL_DIVIDER from "@/primitives/surfaces/Divider.tsx?raw";

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

const COMPONENTS = [
  {
    name: "Divider",
    path: "@/primitives/surfaces",
    description: "Visual separator with 10+ variants including glass effects",
    implementation: IMPL_DIVIDER,
    props: [
      { name: "variant", type: "enum", options: ["default", "bold", "dashed", "gradient", "glass", "etched", "groove", "ridge", "frostedSlit"], default: '"default"' },
      { name: "direction", type: "enum", options: ["horizontal", "vertical"], default: '"horizontal"' },
      { name: "label", type: "string" },
      { name: "icon", type: "ReactNode" },
      { name: "className", type: "string" },
    ],
  },
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
