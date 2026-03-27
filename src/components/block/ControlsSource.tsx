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

{/* Toggle */}
<Toggle checked={true} onChange={setChecked} />
<Toggle checked={false} onChange={setChecked} />

{/* Checkbox */}
<Checkbox checked={true} onChange={setChecked} />
<Checkbox checked={false} onChange={setChecked} />

{/* Radio */}
<Radio checked={false} onChange={setSelected} />
<Radio checked={true} onChange={setSelected} />

{/* Segmented Control */}
<SegmentedControl
  options={["Day", "Week", "Month"]}
  value={selected}
  onChange={setSelected}
/>

{/* Slider */}
<Slider value={60} onChange={setValue} showValue />

{/* Gel variants */}
<Toggle variant="gel" checked={true} onChange={setChecked} />
<Checkbox variant="gel" checked={true} onChange={setChecked} />
<Radio variant="gel" checked={true} onChange={setSelected} />
<SegmentedControl variant="gel" options={["Day", "Week", "Month"]} value="Day" onChange={setSelected} />
<Slider variant="gel" value={60} onChange={setValue} showValue />`;

const COMPONENTS = [
  {
    name: "Toggle",
    path: "@/primitives/controls",
    description: "On/off switch with flat and gel variants",
    implementation: IMPL_TOGGLE,
    props: [
      { name: "checked", type: "boolean", default: "false" },
      { name: "onChange", type: "(v: boolean) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"flat"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Checkbox",
    path: "@/primitives/controls",
    description: "Check/uncheck control with flat and gel variants",
    implementation: IMPL_CHECKBOX,
    props: [
      { name: "checked", type: "boolean", default: "false" },
      { name: "onChange", type: "(v: boolean) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"flat"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Radio",
    path: "@/primitives/controls",
    description: "Single-select radio button with flat and gel variants",
    implementation: IMPL_RADIO,
    props: [
      { name: "checked", type: "boolean", default: "false" },
      { name: "onChange", type: "(v: boolean) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"flat"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "SegmentedControl",
    path: "@/primitives/controls",
    description: "Tab-like selector with sliding pill indicator. Gel variant uses glass active state.",
    implementation: IMPL_SEGMENTED,
    props: [
      { name: "options", type: "string[]" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"flat"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Slider",
    path: "@/primitives/controls",
    description: "Range slider. Flat: solid thumb with hover glow. Gel: glass thumb with translucent track.",
    implementation: IMPL_SLIDER,
    props: [
      { name: "min", type: "number", default: "0" },
      { name: "max", type: "number", default: "100" },
      { name: "value", type: "number" },
      { name: "onChange", type: "(v: number) => void" },
      { name: "showValue", type: "boolean", default: "false" },
      { name: "variant", type: "enum", options: ["flat", "gel"], default: '"flat"' },
      { name: "className", type: "string" },
    ],
  },
];

export function ControlsSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="controls"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal
      open={open}
      onClose={() => setOpen(false)}
      title="Controls"
      code={SOURCE_CODE}
      components={COMPONENTS}
    />
  );
}
