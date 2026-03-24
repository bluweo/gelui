import { useState, useEffect } from "react";
import { Toggle, Checkbox, Radio, SegmentedControl, Slider } from "@/primitives/controls";

export function GlassControlsDemo() {
  const [toggleOff, setToggleOff] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);
  const [radio, setRadio] = useState<"a" | "b">("b");
  const [segment, setSegment] = useState("Day");
  const [slider, setSlider] = useState(60);
  const [isDarkBg, setIsDarkBg] = useState(false);

  // Detect contrast from nearest data-contrast attribute
  useEffect(() => {
    const check = () => {
      const main = document.querySelector("main");
      const contrast = main?.getAttribute("data-contrast");
      setIsDarkBg(contrast === "dark");
    };
    check();
    const obs = new MutationObserver(check);
    const main = document.querySelector("main");
    if (main) obs.observe(main, { attributes: true, attributeFilter: ["data-contrast"] });
    return () => obs.disconnect();
  }, []);

  const rowClass = "flex items-center justify-between py-3 border-b contrast-border";
  const labelClass = "text-[12px] font-[500] contrast-text-muted";

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle & Checkbox */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border" style={{ background: "transparent" }}>
        <div className="px-4 py-2.5 border-b contrast-border">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] contrast-text-muted">Gel Toggle & Checkbox</span>
        </div>
        <div className="p-4 flex flex-col">
          <div className={rowClass}>
            <span className={labelClass}>Toggle Off</span>
            <Toggle checked={toggleOff} onChange={setToggleOff} variant="gel" />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Toggle On</span>
            <Toggle checked={toggleOn} onChange={setToggleOn} variant="gel" />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Unchecked</span>
            <Checkbox checked={unchecked} onChange={setUnchecked} variant="gel" />
          </div>
          <div className="flex items-center justify-between py-3">
            <span className={labelClass}>Checked</span>
            <Checkbox checked={checked} onChange={setChecked} variant="gel" />
          </div>
        </div>
      </div>

      {/* Radio & Segmented */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border" style={{ background: "transparent" }}>
        <div className="px-4 py-2.5 border-b contrast-border">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] contrast-text-muted">Gel Radio & Segmented</span>
        </div>
        <div className="p-4 flex flex-col">
          <div className={rowClass}>
            <span className={labelClass}>Option A</span>
            <Radio selected={radio === "a"} onChange={() => setRadio("a")} variant="gel" />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Option B</span>
            <Radio selected={radio === "b"} onChange={() => setRadio("b")} variant="gel" />
          </div>

          <div className="flex flex-col gap-2 py-3 border-b contrast-border">
            <span className="text-[10px] font-[500] contrast-text-muted">Segmented Control</span>
            <SegmentedControl options={["Day", "Week", "Month"]} value={segment} onChange={setSegment} variant="gel" />
          </div>

          {/* Slider — gel style */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-[500] contrast-text-muted">Slider</span>
              <span className="text-[13px] font-[600] font-mono contrast-text">{slider}%</span>
            </div>
            <Slider
              min={0}
              max={100}
              value={slider}
              onChange={setSlider}
              variant="gel"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
