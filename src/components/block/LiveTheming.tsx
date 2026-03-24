import { useState, useEffect } from "react";
import { Button } from "@/primitives/buttons";
import { Card } from "@/primitives/surfaces";
import { Input } from "@/primitives/inputs";
import { Badge, Tag } from "@/primitives/data";
import { Toggle } from "@/primitives/controls";
import { Spinner } from "@/primitives/feedback";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import type { RadiusPreset, ShadowPreset } from "@/components/context/AppearanceContext";
import { LiquidGlassSlider } from "@/components/glass/LiquidGlassSlider";

/* ─── CSS Variable definitions ─── */
interface VarDef { variable: string; label: string; setBy: string; category: string; }

const CSS_VARS: VarDef[] = [
  { variable: "--glass-radius", label: "Main radius", setBy: "Border Radius", category: "Radius" },
  { variable: "--glass-radius-sm", label: "Small radius", setBy: "Border Radius", category: "Radius" },
  { variable: "--glass-radius-pill", label: "Pill radius", setBy: "Border Radius", category: "Radius" },
  { variable: "--glass-blur", label: "Blur intensity", setBy: "Blur Slider", category: "Blur" },
  { variable: "--glass-blur-strong", label: "Strong blur", setBy: "Blur Slider", category: "Blur" },
  { variable: "--glass-saturation", label: "Saturation", setBy: "Theme", category: "Blur" },
  { variable: "--glass-shadow", label: "Base shadow", setBy: "Shadow Depth", category: "Shadow" },
  { variable: "--glass-shadow-hover", label: "Hover shadow", setBy: "Shadow Depth", category: "Shadow" },
  { variable: "--text-primary", label: "Primary text", setBy: "Theme", category: "Text" },
  { variable: "--text-secondary", label: "Secondary text", setBy: "Theme", category: "Text" },
  { variable: "--font-heading", label: "Heading font", setBy: "Font Families", category: "Font" },
  { variable: "--font-body", label: "Body font", setBy: "Font Families", category: "Font" },
  { variable: "--font-ui", label: "UI font", setBy: "Font Families", category: "Font" },
  { variable: "--font-mono", label: "Mono font", setBy: "Font Families", category: "Font" },
  { variable: "--glass-border", label: "Glass border", setBy: "Theme", category: "Glass" },
  { variable: "--liquid-specular-top", label: "Specular top", setBy: "Theme", category: "Glass" },
];

/* ─── Poll computed CSS variables ─── */
function useLiveCSSVars(vars: VarDef[]) {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    function read() {
      const cs = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const v of vars) next[v.variable] = cs.getPropertyValue(v.variable).trim() || "(not set)";
      setValues(next);
    }
    read();
    const id = setInterval(read, 500);
    return () => clearInterval(id);
  }, []);
  return values;
}

/* ─── Arrow ─── */
function Arrow({ isDark }: { isDark: boolean }) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" style={{ flexShrink: 0, opacity: 0.2 }}>
      <path d="M0 5h14m0 0l-3.5-3.5M14 5l-3.5 3.5" stroke={isDark ? "#fff" : "#000"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Column 1: How It Works ─── */
function HowItWorks({ isDark }: { isDark: boolean }) {
  const liveVars = useLiveCSSVars([
    { variable: "--glass-radius", label: "", setBy: "", category: "" },
    { variable: "--glass-blur", label: "", setBy: "", category: "" },
    { variable: "--glass-shadow", label: "", setBy: "", category: "" },
  ]);

  const chains = [
    { setting: "Border Radius", variable: "--glass-radius", previewType: "radius" },
    { setting: "Blur Intensity", variable: "--glass-blur", previewType: "blur" },
    { setting: "Shadow Depth", variable: "--glass-shadow", previewType: "shadow" },
  ];

  return (
    <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30 h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">Setting</span>
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">CSS Variable</span>
      </div>
      {chains.map((ch, idx) => {
        const liveVal = liveVars[ch.variable] || "";
        const displayVal = liveVal.length > 20 ? liveVal.slice(0, 20) + "…" : liveVal;
        return (
          <div key={ch.variable} className={`flex items-center justify-between gap-3 px-3 py-2.5 ${idx < chains.length - 1 ? "border-b border-black/[0.04] dark:border-white/[0.04]" : ""}`}>
            <span className="text-[12px] font-[600] text-black/75 dark:text-white/70">{ch.setting}</span>
            <div className="text-right">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.07] text-black/50 dark:text-white/40 tabular-nums">{ch.variable}</span>
              <span className="block text-[10px] font-mono text-black/30 dark:text-white/25 mt-0.5 tabular-nums">{displayVal}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Read/write appearance from localStorage (bypasses React context) ─── */
const STORAGE_KEY = "gelui-appearance";
function readAppearance() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      transparency: stored.transparency ?? 0.64,
      radiusPreset: stored.radiusPreset ?? "medium",
      blurIntensity: stored.blurIntensity ?? 24,
      shadowPreset: stored.shadowPreset ?? "soft",
    };
  } catch { return { transparency: 0.64, radiusPreset: "medium", blurIntensity: 24, shadowPreset: "soft" }; }
}
function writeAppearance(key: string, value: any) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    stored[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    // Dispatch event so AppearanceContext picks up the change
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
    // Also force a re-render in AppearanceContext by dispatching custom event
    window.dispatchEvent(new CustomEvent("gelui-appearance-change", { detail: { [key]: value } }));
  } catch {}
}

/* ─── Column 2: Embedded Appearance Controls ─── */
function AppearanceControls({ isDark }: { isDark: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [transparency, setTransparencyLocal] = useState(0.64);
  const [radiusPreset, setRadiusLocal] = useState("medium");
  const [blurIntensity, setBlurLocal] = useState(24);
  const [shadowPreset, setShadowLocal] = useState("soft");

  // Read from localStorage on mount
  useEffect(() => {
    const vals = readAppearance();
    setTransparencyLocal(vals.transparency);
    setRadiusLocal(vals.radiusPreset);
    setBlurLocal(vals.blurIntensity);
    setShadowLocal(vals.shadowPreset);
    setMounted(true);

    // Poll for external changes (from the Appearance modal)
    const id = setInterval(() => {
      const v = readAppearance();
      setTransparencyLocal(v.transparency);
      setRadiusLocal(v.radiusPreset);
      setBlurLocal(v.blurIntensity);
      setShadowLocal(v.shadowPreset);
    }, 500);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <span style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>Loading...</span>
      </div>
    );
  }

  const setTransparency = (v: number) => { setTransparencyLocal(v); writeAppearance("transparency", v); };
  const setRadiusPreset = (v: string) => { setRadiusLocal(v); writeAppearance("radiusPreset", v); };
  const setBlurIntensity = (v: number) => { setBlurLocal(v); writeAppearance("blurIntensity", v); };
  const setShadowPreset = (v: string) => { setShadowLocal(v); writeAppearance("shadowPreset", v); };
  const resetToDefaults = () => {
    setTransparency(0.64); setRadiusPreset("medium"); setBlurIntensity(24); setShadowPreset("soft");
  };

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.75)";
  // Colors now handled by Tailwind classes (text-text-secondary, text-text-tertiary)
  // and glass-preset-btn/glass-preset-active CSS utilities

  const radiusOptions: { label: string; value: RadiusPreset }[] = [
    { label: "Minimal", value: "minimal" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  const shadowOptions: { label: string; value: ShadowPreset }[] = [
    { label: "Flat", value: "flat" },
    { label: "Soft", value: "soft" },
    { label: "Elevated", value: "elevated" },
  ];

  // Use the same glass-preset classes as the Appearance modal

  return (
    <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">Appearance</span>
        <button onClick={resetToDefaults} className="text-[10px] font-[550] text-black/35 dark:text-white/35 bg-transparent border-none cursor-pointer hover:opacity-70">Reset</button>
      </div>

      {/* Transparency */}
      <div className="px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <div className="flex justify-between mb-2">
          <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary">Transparency</span>
          <span className="text-[11.5px] font-[600] text-text-tertiary tabular-nums">{Math.round(transparency * 100)}%</span>
        </div>
        <LiquidGlassSlider min={0.2} max={1.0} step={0.01} value={transparency} onChange={setTransparency} />
      </div>

      {/* Border Radius */}
      <div className="px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary block mb-2">Border Radius</span>
        <div className="flex gap-1 p-[3px] bg-black/6 rounded-glass-sm dark:bg-white/6">
          {radiusOptions.map(o => (
            <button key={o.value} onClick={() => setRadiusPreset(o.value)} className={`glass-preset-btn ${radiusPreset === o.value ? "glass-preset-active" : ""}`}>{o.label}</button>
          ))}
        </div>
      </div>

      {/* Blur Intensity */}
      <div className="px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <div className="flex justify-between mb-2">
          <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary">Blur Intensity</span>
          <span className="text-[11.5px] font-[600] text-text-tertiary tabular-nums">{blurIntensity}px</span>
        </div>
        <LiquidGlassSlider min={0} max={60} step={1} value={blurIntensity} onChange={setBlurIntensity} />
      </div>

      {/* Shadow Depth */}
      <div className="px-3 py-2.5">
        <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary block mb-2">Shadow Depth</span>
        <div className="flex gap-1 p-[3px] bg-black/6 rounded-glass-sm dark:bg-white/6">
          {shadowOptions.map(o => (
            <button key={o.value} onClick={() => setShadowPreset(o.value)} className={`glass-preset-btn ${shadowPreset === o.value ? "glass-preset-active" : ""}`}>{o.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Column 3: Live Component Preview ─── */
function LivePreview({ isDark }: { isDark: boolean }) {
  const [toggled, setToggled] = useState(false);

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const labelText = isDark ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.75)";

  return (
    <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30 h-full">
      <div className="flex items-center px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">Live Preview</span>
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <span className="text-[12px] font-[600] text-black/75 dark:text-white/70">Gel Button</span>
        <Button variant="gel" size="sm">Button</Button>
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <span className="text-[12px] font-[600] text-black/75 dark:text-white/70">Glass Card</span>
        <Card glass={1} style={{ padding: "6px 14px" }}>
          <span className="text-[11px] text-black/65 dark:text-white/65">Content</span>
        </Card>
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <span className="text-[12px] font-[600] text-black/75 dark:text-white/70 shrink-0">Input</span>
        <Input placeholder="Type here..." style={{ maxWidth: 140, fontSize: 12 }} />
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <span className="text-[12px] font-[600] text-black/75 dark:text-white/70">Toggle</span>
        <Toggle checked={toggled} onChange={setToggled} />
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]">
        <span className="text-[12px] font-[600] text-black/75 dark:text-white/70">Badges</span>
        <div className="flex gap-1.5 items-center">
          <Badge variant="success">Live</Badge>
          <Tag variant="info">v0.20</Tag>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <span className="text-[12px] font-[600] text-black/75 dark:text-white/70">Spinner</span>
        <Spinner size={18} />
      </div>
    </div>
  );
}

/* ─── Live CSS Variables Table (Full width) ─── */
function LiveVariablesTable({ isDark }: { isDark: boolean }) {
  const values = useLiveCSSVars(CSS_VARS);

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.40)";
  const monoText = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.40)";
  const dimText = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";
  const catBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const pillBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const pillColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";

  const grouped: Record<string, VarDef[]> = {};
  for (const v of CSS_VARS) { if (!grouped[v.category]) grouped[v.category] = []; grouped[v.category].push(v); }

  return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.8fr", padding: "10px 14px", background: headerBg, borderBottom: `1px solid ${borderColor}`, gap: "12px" }}>
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em]" style={{ color: headerText }}>Variable</span>
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em]" style={{ color: headerText }}>Current Value</span>
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em]" style={{ color: headerText }}>Set By</span>
      </div>
      {Object.entries(grouped).map(([category, vars]) => (
        <div key={category}>
          <div style={{ padding: "5px 14px", background: catBg, borderBottom: `1px solid ${rowBorder}` }}>
            <span className="text-[9px] font-[650] uppercase tracking-[0.08em]" style={{ color: dimText }}>{category}</span>
          </div>
          {vars.map((v, idx) => {
            const rawVal = values[v.variable] || "(not set)";
            const displayVal = rawVal.length > 45 ? rawVal.slice(0, 45) + "…" : rawVal;
            return (
              <div key={v.variable} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.8fr", padding: "6px 14px", borderBottom: idx < vars.length - 1 ? `1px solid ${rowBorder}` : "none", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: labelText }}>{v.variable}</span>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", padding: "2px 8px", borderRadius: "100px", background: pillBg, color: pillColor, wordBreak: "break-all", display: "inline-block", width: "fit-content" }}>{displayVal}</span>
                <span style={{ fontSize: "10px", color: dimText }}>{v.setBy}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Export ─── */
export function LiveTheming() {
  const isDark = useDarkMode();

  return (
    <div className="font-sans">
      {/* 3-column layout: How It Works | Appearance | Live Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <HowItWorks isDark={isDark} />
        <AppearanceControls isDark={isDark} />
        <LivePreview isDark={isDark} />
      </div>
      {/* Full-width CSS Variables table */}
      <LiveVariablesTable isDark={isDark} />
    </div>
  );
}
