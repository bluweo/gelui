import { useState, useEffect } from "react";
import { Button } from "@/primitives/buttons";
import { Card } from "@/primitives/surfaces";
import { Input } from "@/primitives/inputs";
import { Badge, Tag } from "@/primitives/data";
import { Toggle } from "@/primitives/controls";
import { Spinner } from "@/primitives/feedback";
import { Overline } from "@/primitives/typography/Overline";
import { Label } from "@/primitives/typography/Label";
import { Code } from "@/primitives/typography/Code";
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
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" style={{ flexShrink: 0, opacity: 0.25 }}>
      <path d="M0 5h14m0 0l-3.5-3.5M14 5l-3.5 3.5" stroke={isDark ? "#fff" : "#000"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Column 1: Settings with live preview objects ─── */
function SettingsPreview() {
  const liveVars = useLiveCSSVars([
    { variable: "--glass-radius", label: "", setBy: "", category: "" },
    { variable: "--glass-blur", label: "", setBy: "", category: "" },
    { variable: "--glass-shadow", label: "", setBy: "", category: "" },
  ]);

  return (
    <div className="rounded-[var(--glass-radius-sm)] overflow-hidden h-full border contrast-border">
      {/* Header */}
      <div className="flex items-center px-3 py-2 border-b contrast-border">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] contrast-muted">Setting Preview</span>
      </div>

      {/* Border Radius */}
      <div className="px-4 py-4 border-b contrast-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-[600] contrast-text">Border Radius</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full contrast-muted contrast-border tabular-nums">{liveVars["--glass-radius"] || "14px"}</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 glass-1 border-2 contrast-border transition-all duration-300"
            style={{ borderRadius: "var(--glass-radius, 14px)" }}
          />
          <div
            className="w-10 h-10 glass-1 border-2 contrast-border transition-all duration-300"
            style={{ borderRadius: "var(--glass-radius-sm, 10px)" }}
          />
          <div
            className="h-8 px-4 glass-1 border-2 contrast-border transition-all duration-300"
            style={{ borderRadius: "var(--glass-radius-pill, 40px)" }}
          />
        </div>
      </div>

      {/* Blur Intensity */}
      <div className="px-4 py-4 border-b contrast-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-[600] contrast-text">Blur Intensity</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full contrast-muted contrast-border tabular-nums">{liveVars["--glass-blur"] || "24px"}</span>
        </div>
        <div
          className="w-full h-14 rounded-[var(--glass-radius-sm)] border contrast-border transition-all duration-300"
          style={{
            backdropFilter: "blur(var(--glass-blur, 24px))",
            WebkitBackdropFilter: "blur(var(--glass-blur, 24px))",
            background: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-center h-full">
            <span className="text-[10px] font-mono contrast-muted">backdrop-filter: blur({liveVars["--glass-blur"] || "24px"})</span>
          </div>
        </div>
      </div>

      {/* Shadow Depth */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-[600] contrast-text">Shadow Depth</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full contrast-muted contrast-border tabular-nums truncate max-w-[120px]">{(liveVars["--glass-shadow"] || "none").slice(0, 16)}…</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-14 rounded-[var(--glass-radius-sm)] glass-1 transition-all duration-300"
            style={{ boxShadow: "var(--glass-shadow, none)" }}
          />
          <div
            className="w-16 h-14 rounded-[var(--glass-radius-sm)] glass-1 transition-all duration-300"
            style={{ boxShadow: "var(--glass-shadow-hover, none)" }}
          />
          <div
            className="flex-1 h-14 rounded-[var(--glass-radius-sm)] glass-1 transition-all duration-300"
            style={{ boxShadow: "var(--glass-shadow-elevated, none)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── localStorage read/write (bypasses React context for SSR safety) ─── */
const STORAGE_KEY = "gelui-appearance";
function readAppearance() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { transparency: stored.transparency ?? 0.64, radiusPreset: stored.radiusPreset ?? "medium", blurIntensity: stored.blurIntensity ?? 24, shadowPreset: stored.shadowPreset ?? "soft" };
  } catch { return { transparency: 0.64, radiusPreset: "medium", blurIntensity: 24, shadowPreset: "soft" }; }
}
function writeAppearance(key: string, value: any) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    stored[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    window.dispatchEvent(new CustomEvent("gelui-appearance-change", { detail: { [key]: value } }));
  } catch {}
}

/* ─── Column 2: Embedded Appearance Controls ─── */
function AppearanceControls({ isDark }: { isDark: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [transparency, setTL] = useState(0.64);
  const [radiusPreset, setRL] = useState("medium");
  const [blurIntensity, setBL] = useState(24);
  const [shadowPreset, setSL] = useState("soft");

  useEffect(() => {
    const v = readAppearance();
    setTL(v.transparency); setRL(v.radiusPreset); setBL(v.blurIntensity); setSL(v.shadowPreset);
    setMounted(true);
    const id = setInterval(() => { const v = readAppearance(); setTL(v.transparency); setRL(v.radiusPreset); setBL(v.blurIntensity); setSL(v.shadowPreset); }, 500);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 11, color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>Loading...</span>
    </div>
  );

  const setTransparency = (v: number) => { setTL(v); writeAppearance("transparency", v); };
  const setRadiusPreset = (v: string) => { setRL(v); writeAppearance("radiusPreset", v); };
  const setBlurIntensity = (v: number) => { setBL(v); writeAppearance("blurIntensity", v); };
  const setShadowPreset = (v: string) => { setSL(v); writeAppearance("shadowPreset", v); };
  const resetToDefaults = () => { setTransparency(0.64); setRadiusPreset("medium"); setBlurIntensity(24); setShadowPreset("soft"); };

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";
  const valueText = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)";
  const segBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const segActiveBg = isDark ? "rgba(255,255,255,0.95)" : "#fff";
  const segActiveText = isDark ? "#000" : "#000";
  const segInactiveText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

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

  const segStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "7px 0",
    fontSize: "12px",
    fontWeight: active ? 600 : 450,
    textAlign: "center",
    borderRadius: "var(--glass-radius-pill, 100px)",
    background: active ? segActiveBg : "transparent",
    color: active ? segActiveText : segInactiveText,
    border: "none",
    cursor: "pointer",
    transition: "all 200ms ease",
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
  });

  return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}`, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "10px 14px", background: headerBg, borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: headerText }}>Appearance</span>
        <button onClick={resetToDefaults} style={{ fontSize: "10px", fontWeight: 550, color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", background: "none", border: "none", cursor: "pointer" }}>Reset</button>
      </div>

      {/* Transparency */}
      <div style={{ padding: "12px 14px", borderBottom: `1px solid ${rowBorder}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.04em", color: labelText }}>Transparency</span>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: valueText }}>{Math.round(transparency * 100)}%</span>
        </div>
        <LiquidGlassSlider min={0} max={100} step={1} value={Math.round(transparency * 100)} onChange={(v) => setTransparency(v / 100)} />
      </div>

      {/* Border Radius */}
      <div style={{ padding: "12px 14px", borderBottom: `1px solid ${rowBorder}` }}>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.04em", color: labelText, display: "block", marginBottom: 8 }}>Border Radius</span>
        <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: "var(--glass-radius-pill, 100px)", background: segBg }}>
          {radiusOptions.map(o => (
            <button key={o.value} onClick={() => setRadiusPreset(o.value)} style={segStyle(radiusPreset === o.value)}>{o.label}</button>
          ))}
        </div>
      </div>

      {/* Blur Intensity */}
      <div style={{ padding: "12px 14px", borderBottom: `1px solid ${rowBorder}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.04em", color: labelText }}>Blur Intensity</span>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: valueText }}>{blurIntensity}px</span>
        </div>
        <LiquidGlassSlider min={0} max={60} step={1} value={blurIntensity} onChange={setBlurIntensity} />
      </div>

      {/* Shadow Depth */}
      <div style={{ padding: "12px 14px" }}>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.04em", color: labelText, display: "block", marginBottom: 8 }}>Shadow Depth</span>
        <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: "var(--glass-radius-pill, 100px)", background: segBg }}>
          {shadowOptions.map(o => (
            <button key={o.value} onClick={() => setShadowPreset(o.value)} style={segStyle(shadowPreset === o.value)}>{o.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Column 3: Live Component Preview (Breakpoints-style table) ─── */
function LivePreview() {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="rounded-[var(--glass-radius-sm)] overflow-hidden glass-1 glass-specular h-full">
      {/* Header */}
      <div className="flex items-center px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">Live Preview</span>
      </div>
      {/* Rows — identical structure to Breakpoints */}
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
          <Tag variant="info">v0.21</Tag>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <span className="text-[12px] font-[600] text-black/75 dark:text-white/70">Spinner</span>
        <Spinner size={18} />
      </div>
    </div>
  );
}

/* ─── Live CSS Variables Table (Full width, Breakpoints-style) ─── */
function LiveVariablesTable() {
  const values = useLiveCSSVars(CSS_VARS);

  const grouped: Record<string, VarDef[]> = {};
  for (const v of CSS_VARS) { if (!grouped[v.category]) grouped[v.category] = []; grouped[v.category].push(v); }

  return (
    <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1.5fr_0.8fr] gap-3 px-3 py-2 bg-gray-100/80 dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">Variable</span>
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">Current Value</span>
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40">Set By</span>
      </div>
      {/* Grouped rows */}
      {Object.entries(grouped).map(([category, vars]) => (
        <div key={category}>
          {/* Category header */}
          <div className="px-3 py-1 bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.04] dark:border-white/[0.04]">
            <span className="text-[9px] font-[650] uppercase tracking-[0.08em] text-black/25 dark:text-white/20">{category}</span>
          </div>
          {/* Variable rows */}
          {vars.map((v, idx) => {
            const rawVal = values[v.variable] || "(not set)";
            const displayVal = rawVal.length > 40 ? rawVal.slice(0, 40) + "…" : rawVal;
            return (
              <div key={v.variable} className={`grid grid-cols-[1fr_1.5fr_0.8fr] gap-3 items-center px-3 py-2 ${idx < vars.length - 1 ? "border-b border-black/[0.04] dark:border-white/[0.04]" : ""}`}>
                <span className="text-[11px] font-mono text-black/40 dark:text-white/35 tabular-nums">{v.variable}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full contrast-muted contrast-border tabular-nums w-fit break-all">{displayVal}</span>
                <span className="text-[10px] text-black/25 dark:text-white/20">{v.setBy}</span>
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
  const [showVars, setShowVars] = useState(false);

  return (
    <div>
      {/* 3-column layout: Settings | Appearance | Live Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <SettingsPreview />
        <AppearanceControls isDark={isDark} />
        <LivePreview />
      </div>
      {/* Toggle button */}
      <button
        onClick={() => setShowVars(!showVars)}
        className="flex items-center gap-2 px-3 py-2 mb-3 rounded-full text-[11px] font-[600] cursor-pointer transition-all duration-200 hover:scale-[1.02] border contrast-border contrast-muted"
        style={{ background: "transparent" }}
      >
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="transition-transform duration-200"
          style={{ transform: showVars ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {showVars ? "Hide" : "Show"} CSS Variables
        <span className="text-[10px] font-mono contrast-muted">{CSS_VARS.length} vars</span>
      </button>
      {/* Collapsible CSS Variables table */}
      {showVars && <LiveVariablesTable />}
    </div>
  );
}
