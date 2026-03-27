import { useState } from "react";
import { Toggle, Checkbox, Radio, SegmentedControl, Slider } from "@/primitives/controls";

export function ControlsDemo() {
  const [toggleOff, setToggleOff] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);
  const [radio, setRadio] = useState<"a" | "b">("b");
  const [segment, setSegment] = useState("Day");
  const [slider, setSlider] = useState(60);

  const rowClass = "flex items-center justify-between py-2.5 border-b border-black/10 dark:border-white/10";
  const labelClass = "text-[12px] font-[500] text-black/60 dark:text-white/60";

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle & Checkbox */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Toggle & Checkbox</span>
        </div>
        <div className="p-4 flex flex-col">
          <div className={rowClass}>
            <span className={labelClass}>Toggle Off</span>
            <Toggle checked={toggleOff} onChange={setToggleOff} />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Toggle On</span>
            <Toggle checked={toggleOn} onChange={setToggleOn} />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Unchecked</span>
            <Checkbox checked={unchecked} onChange={setUnchecked} />
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className={labelClass}>Checked</span>
            <Checkbox checked={checked} onChange={setChecked} />
          </div>
        </div>
      </div>

      {/* Radio & Segmented */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Radio & Segmented</span>
        </div>
        <div className="p-4 flex flex-col">
          <div className={rowClass}>
            <span className={labelClass}>Option A</span>
            <Radio selected={radio === "a"} onChange={() => setRadio("a")} />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Option B</span>
            <Radio selected={radio === "b"} onChange={() => setRadio("b")} />
          </div>

          {/* Segmented Control */}
          <div className="flex flex-col gap-2 py-2.5 border-b border-black/10 dark:border-white/10">
            <span className="text-[10px] font-[500] text-black/45 dark:text-white/40">Segmented Control</span>
            <SegmentedControl
              options={["Day", "Week", "Month"]}
              value={segment}
              onChange={setSegment}
            />
          </div>

          {/* Slider */}
          <div className="py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-[500] text-black/45 dark:text-white/40">Slider</span>
              <span className="text-[14px] font-[600] font-[family-name:var(--font-body)] text-black/70 dark:text-white/65">{slider}%</span>
            </div>
            <Slider value={slider} onChange={setSlider} />
          </div>
        </div>
      </div>
    </div>
  );
}
