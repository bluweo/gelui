import { useState } from "react";
import { LiquidGlassSlider } from "@/components/glass/LiquidGlassSlider";

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
          {/* Toggle Off/On */}
          <div className={rowClass}>
            <span className={labelClass}>Toggle Off</span>
            <button
              onClick={() => setToggleOff(!toggleOff)}
              className="relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 border-none"
              style={{ background: toggleOff ? "#354334" : "rgba(0,0,0,0.1)" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200"
                style={{ left: toggleOff ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Toggle On</span>
            <button
              onClick={() => setToggleOn(!toggleOn)}
              className="relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 border-none"
              style={{ background: toggleOn ? "#354334" : "rgba(0,0,0,0.1)" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200"
                style={{ left: toggleOn ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Unchecked</span>
            <button
              onClick={() => setUnchecked(!unchecked)}
              className="w-5 h-5 rounded-[5px] cursor-pointer border-none flex items-center justify-center transition-all duration-200"
              style={{
                background: unchecked ? "#354334" : "rgba(255,255,255,0.6)",
                border: unchecked ? "none" : "2px solid rgba(0,0,0,0.2)",
              }}
            >
              {unchecked && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className={labelClass}>Checked</span>
            <button
              onClick={() => setChecked(!checked)}
              className="w-5 h-5 rounded-[5px] cursor-pointer border-none flex items-center justify-center transition-all duration-200"
              style={{
                background: checked ? "#354334" : "rgba(255,255,255,0.6)",
                border: checked ? "none" : "2px solid rgba(0,0,0,0.2)",
              }}
            >
              {checked && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Radio & Segmented */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Radio & Segmented</span>
        </div>
        <div className="p-4 flex flex-col">
          {/* Radio */}
          <div className={rowClass}>
            <span className={labelClass}>Option A</span>
            <button
              onClick={() => setRadio("a")}
              className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 border-none"
              style={{
                border: `2px solid ${radio === "a" ? "#354334" : "rgba(0,0,0,0.2)"}`,
                background: "rgba(255,255,255,0.6)",
              }}
            >
              {radio === "a" && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#354334" }} />}
            </button>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Option B</span>
            <button
              onClick={() => setRadio("b")}
              className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 border-none"
              style={{
                border: `2px solid ${radio === "b" ? "#354334" : "rgba(0,0,0,0.2)"}`,
                background: "rgba(255,255,255,0.6)",
              }}
            >
              {radio === "b" && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#354334" }} />}
            </button>
          </div>

          {/* Segmented Control */}
          <div className="flex flex-col gap-2 py-2.5 border-b border-black/10 dark:border-white/10">
            <span className="text-[10px] font-[500] text-black/45 dark:text-white/40">Segmented Control</span>
            <div className="inline-flex rounded-full p-1 gap-0.5 self-start" style={{ background: "rgba(0,0,0,0.04)" }}>
              {["Day", "Week", "Month"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSegment(s)}
                  className="text-[12px] font-[600] px-4 py-1.5 rounded-full cursor-pointer border-none transition-all duration-200"
                  style={{
                    background: segment === s ? "rgba(0,0,0,0.8)" : "transparent",
                    color: segment === s ? "#fff" : "rgba(0,0,0,0.5)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div className="py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-[500] text-black/45 dark:text-white/40">Slider</span>
              <span className="text-[10px] font-mono text-black/35 dark:text-white/30">{slider}%</span>
            </div>
            <LiquidGlassSlider
              min={0}
              max={100}
              step={1}
              value={slider}
              onChange={setSlider}
              ariaLabel="Demo slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
