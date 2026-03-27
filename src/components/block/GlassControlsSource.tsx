import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_TOGGLE from "@/primitives/controls/Toggle.tsx?raw";
import IMPL_CHECKBOX from "@/primitives/controls/Checkbox.tsx?raw";
import IMPL_RADIO from "@/primitives/controls/Radio.tsx?raw";
import IMPL_SEGMENTED from "@/primitives/controls/SegmentedControl.tsx?raw";
import IMPL_SLIDER from "@/primitives/controls/Slider.tsx?raw";

const SOURCE_CODE = `import { Toggle } from "@/primitives/controls";
import { Checkbox } from "@/primitives/controls";
import { Radio } from "@/primitives/controls";
import { SegmentedControl } from "@/primitives/controls";
import { Slider } from "@/primitives/controls";

{/* All gel variants use variant="gel" */}

{/* Gel Toggle */}
<Toggle variant="gel" checked={true} onChange={setChecked} />
<Toggle variant="gel" checked={false} onChange={setChecked} />

{/* Gel Checkbox */}
<Checkbox variant="gel" checked={true} onChange={setChecked} />
<Checkbox variant="gel" checked={false} onChange={setChecked} />

{/* Gel Radio */}
<Radio variant="gel" selected={true} onChange={setSelected} />
<Radio variant="gel" selected={false} onChange={setSelected} />

{/* Gel Segmented Control */}
<SegmentedControl
  variant="gel"
  options={["Day", "Week", "Month"]}
  value={selected}
  onChange={setSelected}
/>

{/* Gel Slider */}
<Slider variant="gel" value={60} onChange={setValue} showValue />`;

const COMPONENTS = [
  {
    name: "Toggle (gel)",
    path: "@/primitives/controls",
    description: "Volumetric gel-styled on/off switch with glass effect and inset shadows",
    implementation: IMPL_TOGGLE,
    props: [
      { name: "checked", type: "boolean", default: "false" },
      { name: "onChange", type: "(v: boolean) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"gel"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Checkbox (gel)",
    path: "@/primitives/controls",
    description: "Volumetric gel-styled checkbox with specular highlights",
    implementation: IMPL_CHECKBOX,
    props: [
      { name: "checked", type: "boolean", default: "false" },
      { name: "onChange", type: "(v: boolean) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"gel"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Radio (gel)",
    path: "@/primitives/controls",
    description: "Volumetric gel-styled radio button with glass effect",
    implementation: IMPL_RADIO,
    props: [
      { name: "selected", type: "boolean", default: "false" },
      { name: "onChange", type: "(v: boolean) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"gel"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "SegmentedControl (gel)",
    path: "@/primitives/controls",
    description: "Gel segmented control with glass active pill and translucent background",
    implementation: IMPL_SEGMENTED,
    props: [
      { name: "options", type: "string[]" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"gel"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Slider (gel)",
    path: "@/primitives/controls",
    description: "Gel slider with glass thumb and translucent track",
    implementation: IMPL_SLIDER,
    props: [
      { name: "min", type: "number", default: "0" },
      { name: "max", type: "number", default: "100" },
      { name: "value", type: "number" },
      { name: "onChange", type: "(v: number) => void" },
      { name: "showValue", type: "boolean", default: "false" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"gel"' },
      { name: "className", type: "string" },
    ],
  },
];

export function GlassControlsSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="glass-controls"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal
      open={open}
      onClose={() => setOpen(false)}
      title="Glass Controls"
      code={SOURCE_CODE}
      components={COMPONENTS}
    />
  );
}
