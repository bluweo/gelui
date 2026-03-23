import { useState, useEffect, useRef } from "react";
import { LiquidGlassSlider } from "@/components/glass/LiquidGlassSlider";

/* ─── Gel Toggle ─── */
function GelToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-12 h-7 rounded-full cursor-pointer border-none transition-all duration-300"
      style={{
        background: on
          ? "linear-gradient(180deg, rgba(53,67,52,0.9) 0%, rgba(53,67,52,0.7) 100%)"
          : "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 100%)",
        boxShadow: on
          ? "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.1)"
          : "inset 0 2px 4px rgba(0,0,0,0.08), inset 0 -1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute top-[3px] w-[22px] h-[22px] rounded-full transition-all duration-300"
        style={{
          left: on ? "calc(100% - 25px)" : "3px",
          background: "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(240,240,244,0.85) 40%, rgba(220,220,228,0.75) 100%)",
          border: "1.5px solid rgba(255,255,255,0.9)",
          boxShadow: `
            0 2px 8px rgba(0,0,0,0.15),
            0 1px 3px rgba(0,0,0,0.1),
            inset 0 2px 3px rgba(255,255,255,1),
            inset 0 -2px 4px rgba(0,0,0,0.06),
            inset 2px 0 3px rgba(255,255,255,0.5),
            inset -2px 0 3px rgba(0,0,0,0.04)
          `,
        }}
      />
    </button>
  );
}

/* ─── Gel Checkbox ─── */
function GelCheckbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-6 h-6 rounded-[6px] cursor-pointer border-none flex items-center justify-center transition-all duration-200"
      style={{
        background: checked
          ? "linear-gradient(165deg, rgba(53,67,52,0.9) 0%, rgba(53,67,52,0.7) 100%)"
          : "linear-gradient(165deg, rgba(255,255,255,0.7) 0%, rgba(240,240,244,0.5) 100%)",
        boxShadow: checked
          ? "inset 0 2px 4px rgba(0,0,0,0.25), inset 0 -1px 2px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.1)"
          : `0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06),
             inset 0 2px 3px rgba(255,255,255,0.8),
             inset 0 -2px 3px rgba(0,0,0,0.04),
             inset 2px 0 3px rgba(255,255,255,0.4),
             inset -2px 0 3px rgba(0,0,0,0.03)`,
        border: checked ? "none" : "1px solid rgba(255,255,255,0.6)",
      }}
    >
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      )}
    </button>
  );
}

/* ─── Gel Radio ─── */
function GelRadio({ selected, onSelect }: { selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-6 h-6 rounded-full cursor-pointer border-none flex items-center justify-center transition-all duration-200"
      style={{
        background: "linear-gradient(165deg, rgba(255,255,255,0.7) 0%, rgba(240,240,244,0.5) 100%)",
        boxShadow: `
          0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06),
          inset 0 2px 3px rgba(255,255,255,0.8),
          inset 0 -2px 3px rgba(0,0,0,0.04),
          inset 2px 0 3px rgba(255,255,255,0.4),
          inset -2px 0 3px rgba(0,0,0,0.03)
        `,
        border: selected ? "2px solid #354334" : "1px solid rgba(255,255,255,0.6)",
      }}
    >
      {selected && (
        <div className="w-3 h-3 rounded-full" style={{
          background: "linear-gradient(165deg, rgba(53,67,52,0.95) 0%, rgba(53,67,52,0.75) 100%)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.3)",
        }} />
      )}
    </button>
  );
}

/* ─── Gel Segmented Control ─── */
function GelSegmented({ options, value, onChange, isDarkBg }: { options: string[]; value: string; onChange: (v: string) => void; isDarkBg: boolean }) {
  return (
    <div
      className="inline-flex rounded-full p-1 gap-1 self-start"
      style={{
        background: isDarkBg
          ? "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
          : "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 100%)",
        boxShadow: isDarkBg
          ? "inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.05)"
          : "inset 0 1px 3px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.4)",
      }}
    >
      {options.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className="text-[12px] font-[600] px-4 py-1.5 rounded-full cursor-pointer border-none transition-all duration-200"
          style={{
            background: value === s
              ? isDarkBg
                ? "linear-gradient(165deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)"
                : "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(240,240,244,0.85) 100%)"
              : "transparent",
            color: value === s
              ? (isDarkBg ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)")
              : (isDarkBg ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"),
            boxShadow: value === s
              ? isDarkBg
                ? "0 2px 6px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.1)"
                : "0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06), inset 0 1px 2px rgba(255,255,255,0.8)"
              : "none",
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export function GlassControlsDemo() {
  const [toggleOff, setToggleOff] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);
  const [radio, setRadio] = useState<"a" | "b">("b");
  const [segment, setSegment] = useState("Day");
  const [slider, setSlider] = useState(60);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
            <GelToggle on={toggleOff} onToggle={() => setToggleOff(!toggleOff)} />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Toggle On</span>
            <GelToggle on={toggleOn} onToggle={() => setToggleOn(!toggleOn)} />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Unchecked</span>
            <GelCheckbox checked={unchecked} onToggle={() => setUnchecked(!unchecked)} />
          </div>
          <div className="flex items-center justify-between py-3">
            <span className={labelClass}>Checked</span>
            <GelCheckbox checked={checked} onToggle={() => setChecked(!checked)} />
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
            <GelRadio selected={radio === "a"} onSelect={() => setRadio("a")} />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Option B</span>
            <GelRadio selected={radio === "b"} onSelect={() => setRadio("b")} />
          </div>

          <div className="flex flex-col gap-2 py-3 border-b contrast-border">
            <span className="text-[10px] font-[500] contrast-text-muted">Segmented Control</span>
            <GelSegmented options={["Day", "Week", "Month"]} value={segment} onChange={setSegment} isDarkBg={isDarkBg} />
          </div>

          {/* LiquidGlassSlider — gel style */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-[500] contrast-text-muted">Slider</span>
              <span className="text-[13px] font-[600] font-mono contrast-text">{slider}%</span>
            </div>
            <LiquidGlassSlider
              min={0}
              max={100}
              step={1}
              value={slider}
              onChange={setSlider}
              ariaLabel="Gel demo slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
