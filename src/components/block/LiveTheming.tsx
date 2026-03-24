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
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" style={{ flexShrink: 0, opacity: 0.25 }}>
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

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";
  const monoText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  const chains = [
    { setting: "Border Radius", variable: "--glass-radius", previewType: "radius" },
    { setting: "Blur Intensity", variable: "--glass-blur", previewType: "blur" },
    { setting: "Shadow Depth", variable: "--glass-shadow", previewType: "shadow" },
  ];

  return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}`, height: "100%" }}>
      <div style={{ padding: "10px 14px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: headerText }}>How It Works</span>
      </div>
      {chains.map((ch, idx) => {
        const liveVal = liveVars[ch.variable] || "";
        const displayVal = liveVal.length > 18 ? liveVal.slice(0, 18) + "…" : liveVal;
        return (
          <div key={ch.variable} style={{ display: "flex", alignItems: "center", padding: "12px 14px", borderBottom: idx < chains.length - 1 ? `1px solid ${rowBorder}` : "none", gap: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: labelText, minWidth: 90, flexShrink: 0 }}>{ch.setting}</span>
            <Arrow isDark={isDark} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: monoText, display: "block" }}>{ch.variable}</span>
              <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)" }}>{displayVal}</span>
            </div>
            <Arrow isDark={isDark} />
            <div style={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {ch.previewType === "radius" && <div style={{ width: 32, height: 32, borderRadius: "var(--glass-radius, 12px)", background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", border: `2px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}` }} />}
              {ch.previewType === "blur" && <div style={{ width: 32, height: 32, borderRadius: 6, backdropFilter: "blur(var(--glass-blur, 12px))", WebkitBackdropFilter: "blur(var(--glass-blur, 12px))", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}` }} />}
              {ch.previewType === "shadow" && <div style={{ width: 32, height: 32, borderRadius: 6, background: isDark ? "rgba(255,255,255,0.06)" : "#fff", boxShadow: "var(--glass-shadow, 0 2px 8px rgba(0,0,0,0.1))" }} />}
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

/* ─── Column 3: Live Component Preview ─── */
function LivePreview({ isDark }: { isDark: boolean }) {
  const [toggled, setToggled] = useState(false);

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const labelText = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";

  return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}`, height: "100%" }}>
      <div style={{ padding: "10px 14px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: headerText }}>Live Preview</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${rowBorder}` }}>
        <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Gel Button</span>
        <Button variant="gel" size="sm">Button</Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${rowBorder}` }}>
        <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Glass Card</span>
        <Card glass={1} style={{ padding: "6px 14px" }}>
          <span style={{ fontSize: "11px", color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)" }}>Content</span>
        </Card>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${rowBorder}`, gap: 10 }}>
        <span style={{ fontSize: "12px", fontWeight: 550, color: labelText, flexShrink: 0 }}>Input</span>
        <Input placeholder="Type here..." style={{ maxWidth: 140, fontSize: 12 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${rowBorder}` }}>
        <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Toggle</span>
        <Toggle checked={toggled} onChange={setToggled} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${rowBorder}` }}>
        <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Badges</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <Badge variant="success">Live</Badge>
          <Tag variant="info">v0.20</Tag>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
        <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Spinner</span>
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
  const headerText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)";
  const monoText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";
  const dimText = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";
  const catBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";

  const grouped: Record<string, VarDef[]> = {};
  for (const v of CSS_VARS) { if (!grouped[v.category]) grouped[v.category] = []; grouped[v.category].push(v); }

  return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.8fr", padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}`, gap: "12px" }}>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: headerText }}>Variable</span>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: headerText }}>Current Value</span>
        <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: headerText }}>Set By</span>
      </div>
      {Object.entries(grouped).map(([category, vars]) => (
        <div key={category}>
          <div style={{ padding: "5px 16px", background: catBg, borderBottom: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: "9px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.08em", color: dimText }}>{category}</span>
          </div>
          {vars.map((v, idx) => {
            const rawVal = values[v.variable] || "(not set)";
            const displayVal = rawVal.length > 45 ? rawVal.slice(0, 45) + "…" : rawVal;
            return (
              <div key={v.variable} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.8fr", padding: "7px 16px", borderBottom: idx < vars.length - 1 ? `1px solid ${rowBorder}` : "none", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: monoText }}>{v.variable}</span>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: labelText, wordBreak: "break-all" }}>{displayVal}</span>
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
    <div>
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
