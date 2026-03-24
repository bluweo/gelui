import { useState, useEffect } from "react";
import { Button } from "@/primitives/buttons";
import { Card } from "@/primitives/surfaces";
import { Input } from "@/primitives/inputs";
import { Badge, Tag } from "@/primitives/data";
import { Toggle } from "@/primitives/controls";
import { Spinner } from "@/primitives/feedback";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

/* ─── CSS Variable definitions ─── */
interface VarDef {
  variable: string;
  label: string;
  setBy: string;
  category: string;
}

const CSS_VARS: VarDef[] = [
  { variable: "--glass-radius", label: "Main radius", setBy: "Border Radius", category: "Radius" },
  { variable: "--glass-radius-sm", label: "Small radius", setBy: "Border Radius", category: "Radius" },
  { variable: "--glass-radius-pill", label: "Pill radius", setBy: "Border Radius", category: "Radius" },
  { variable: "--glass-blur", label: "Blur intensity", setBy: "Blur Slider", category: "Blur" },
  { variable: "--glass-blur-strong", label: "Strong blur", setBy: "Blur Slider", category: "Blur" },
  { variable: "--glass-saturation", label: "Saturation", setBy: "Theme", category: "Blur" },
  { variable: "--glass-shadow", label: "Base shadow", setBy: "Shadow Depth", category: "Shadow" },
  { variable: "--glass-shadow-hover", label: "Hover shadow", setBy: "Shadow Depth", category: "Shadow" },
  { variable: "--glass-shadow-sm", label: "Small shadow", setBy: "Shadow Depth", category: "Shadow" },
  { variable: "--text-primary", label: "Primary text", setBy: "Theme", category: "Text" },
  { variable: "--text-secondary", label: "Secondary text", setBy: "Theme", category: "Text" },
  { variable: "--text-tertiary", label: "Tertiary text", setBy: "Theme", category: "Text" },
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
      for (const v of vars) {
        next[v.variable] = cs.getPropertyValue(v.variable).trim() || "(not set)";
      }
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
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
      <path d="M0 6h18m0 0l-4-4m4 4l-4 4" stroke={isDark ? "#fff" : "#000"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Section A: How It Works (Left) ─── */
function HowItWorks({ isDark }: { isDark: boolean }) {
  const liveVars = useLiveCSSVars([
    { variable: "--glass-radius", label: "", setBy: "", category: "" },
    { variable: "--glass-blur", label: "", setBy: "", category: "" },
    { variable: "--glass-shadow", label: "", setBy: "", category: "" },
  ]);

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const headerText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";
  const monoText = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const valueText = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)";

  const headerCell: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 650,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: headerText,
  };

  const chains = [
    { setting: "Border Radius → Large", variable: "--glass-radius", fallback: "20px", previewType: "radius" },
    { setting: "Blur Intensity → 24px", variable: "--glass-blur", fallback: "24px", previewType: "blur" },
    { setting: "Shadow Depth → Soft", variable: "--glass-shadow", fallback: "0 8px 40px...", previewType: "shadow" },
  ];

  return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 20px 1.2fr 20px 80px", alignItems: "center", padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}`, gap: "8px" }}>
        <span style={headerCell}>Setting</span>
        <span />
        <span style={headerCell}>CSS Variable</span>
        <span />
        <span style={{ ...headerCell, textAlign: "center" }}>Preview</span>
      </div>
      {/* Rows */}
      {chains.map((ch, idx) => {
        const liveVal = liveVars[ch.variable] || ch.fallback;
        const displayVal = liveVal.length > 22 ? liveVal.slice(0, 22) + "…" : liveVal;
        return (
          <div
            key={ch.variable}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 20px 1.2fr 20px 80px",
              alignItems: "center",
              padding: "14px 16px",
              borderBottom: idx < chains.length - 1 ? `1px solid ${rowBorder}` : "none",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 600, color: labelText }}>{ch.setting}</span>
            <Arrow isDark={isDark} />
            <div>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: monoText, display: "block" }}>{ch.variable}</span>
              <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)" }}>{displayVal}</span>
            </div>
            <Arrow isDark={isDark} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              {ch.previewType === "radius" && (
                <div style={{ width: 40, height: 40, borderRadius: "var(--glass-radius, 12px)", background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", border: `2px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}` }} />
              )}
              {ch.previewType === "blur" && (
                <div style={{ width: 40, height: 40, borderRadius: 8, backdropFilter: "blur(var(--glass-blur, 12px))", WebkitBackdropFilter: "blur(var(--glass-blur, 12px))", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}` }} />
              )}
              {ch.previewType === "shadow" && (
                <div style={{ width: 40, height: 40, borderRadius: 8, background: isDark ? "rgba(255,255,255,0.08)" : "#fff", boxShadow: "var(--glass-shadow, 0 2px 8px rgba(0,0,0,0.1))" }} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Section B: Try It (Right) ─── */
function TryIt({ isDark }: { isDark: boolean }) {
  const [toggled, setToggled] = useState(false);

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const labelText = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";
  const noteText = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const noteBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        {/* Header */}
        <div style={{ padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: headerText }}>Live Component Preview</span>
        </div>
        {/* Gel Button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Gel Button</span>
          <Button variant="gel" size="sm">Button</Button>
        </div>
        {/* Glass Card */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Glass Card</span>
          <Card glass={1} style={{ padding: "8px 16px" }}>
            <span style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}>Content</span>
          </Card>
        </div>
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}`, gap: 12 }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelText, flexShrink: 0 }}>Input</span>
          <Input placeholder="Type here..." style={{ maxWidth: 180 }} />
        </div>
        {/* Toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Toggle</span>
          <Toggle checked={toggled} onChange={setToggled} />
        </div>
        {/* Badge + Tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Badges</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Badge variant="success">Live</Badge>
            <Tag variant="info">v0.20</Tag>
          </div>
        </div>
        {/* Spinner */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelText }}>Spinner</span>
          <Spinner size={20} />
        </div>
      </div>
      {/* Note */}
      <div style={{ padding: "10px 14px", borderRadius: "var(--glass-radius-sm, 8px)", background: noteBg, border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}` }}>
        <span style={{ fontSize: "11px", color: noteText, lineHeight: 1.5 }}>
          💡 Right-click → Appearance to see these components update in real-time
        </span>
      </div>
    </div>
  );
}

/* ─── Section C: Live CSS Variables Table (Full width) ─── */
function LiveVariablesTable({ isDark }: { isDark: boolean }) {
  const values = useLiveCSSVars(CSS_VARS);

  const tableBg = isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.60)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";
  const monoText = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const dimText = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)";
  const catBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";

  const grouped: Record<string, VarDef[]> = {};
  for (const v of CSS_VARS) {
    if (!grouped[v.category]) grouped[v.category] = [];
    grouped[v.category].push(v);
  }

  const headerCell: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 650,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: headerText,
  };

  return (
    <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.8fr", padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}`, gap: "12px" }}>
        <span style={headerCell}>Variable</span>
        <span style={headerCell}>Current Value</span>
        <span style={headerCell}>Set By</span>
      </div>
      {/* Grouped rows */}
      {Object.entries(grouped).map(([category, vars]) => (
        <div key={category}>
          <div style={{ padding: "6px 16px", background: catBg, borderBottom: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.08em", color: dimText }}>{category}</span>
          </div>
          {vars.map((v, idx) => {
            const rawVal = values[v.variable] || "(not set)";
            const displayVal = rawVal.length > 45 ? rawVal.slice(0, 45) + "…" : rawVal;
            return (
              <div
                key={v.variable}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.5fr 0.8fr",
                  padding: "8px 16px",
                  borderBottom: idx < vars.length - 1 ? `1px solid ${rowBorder}` : "none",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: monoText }}>{v.variable}</span>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: labelText, wordBreak: "break-all" }}>{displayVal}</span>
                <span style={{ fontSize: "11px", color: dimText }}>{v.setBy}</span>
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
      {/* Top row: How It Works (left) + Try It (right) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <HowItWorks isDark={isDark} />
        <TryIt isDark={isDark} />
      </div>
      {/* Bottom: Full-width CSS Variables table */}
      <LiveVariablesTable isDark={isDark} />
    </div>
  );
}
