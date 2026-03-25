import { useState } from "react";
import { LiquidGlassSlider } from "@/components/glass/LiquidGlassSlider";

export function SliderDemo() {
  const [value, setValue] = useState(60);
  return (
    <div className="flex flex-col gap-2" suppressHydrationWarning>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-[500]" style={{ color: "rgba(0,0,0,0.45)" }}>Slider</span>
        <span className="text-[10px] font-mono" style={{ color: "rgba(0,0,0,0.35)" }}>{value}%</span>
      </div>
      <LiquidGlassSlider
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={setValue}
        ariaLabel="Demo slider"
      />
    </div>
  );
}
