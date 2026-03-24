import { useState, useEffect } from "react";
import { Button } from "@/primitives/buttons";
import { Card } from "@/primitives/surfaces";
import { Input } from "@/primitives/inputs";
import { Badge } from "@/primitives/data";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

/* ─── CSS Variable definitions grouped by category ─── */
interface VarDef {
  variable: string;
  label: string;
  category: string;
}

const CSS_VARS: VarDef[] = [
  // Radius
  { variable: "--glass-radius", label: "Border Radius", category: "Radius" },
  { variable: "--glass-radius-sm", label: "Border Radius (sm)", category: "Radius" },
  { variable: "--glass-radius-xs", label: "Border Radius (xs)", category: "Radius" },
  // Blur
  { variable: "--glass-blur", label: "Blur Intensity", category: "Blur" },
  { variable: "--glass-saturate", label: "Saturate", category: "Blur" },
  // Shadow
  { variable: "--glass-shadow", label: "Shadow", category: "Shadow" },
  { variable: "--glass-shadow-ring", label: "Shadow Ring", category: "Shadow" },
  // Text
  { variable: "--text-primary", label: "Text Primary", category: "Text" },
  { variable: "--text-secondary", label: "Text Secondary", category: "Text" },
  { variable: "--text-muted", label: "Text Muted", category: "Text" },
  // Font
  { variable: "--font-heading", label: "Font Heading", category: "Font" },
  { variable: "--font-body", label: "Font Body", category: "Font" },
  { variable: "--font-ui", label: "Font UI", category: "Font" },
  { variable: "--font-mono", label: "Font Mono", category: "Font" },
  // Glass
  { variable: "--glass-bg", label: "Glass Background", category: "Glass" },
  { variable: "--glass-border", label: "Glass Border", category: "Glass" },
  { variable: "--glass-bg-alpha", label: "Glass BG Alpha", category: "Glass" },
  { variable: "--gel-bg", label: "Gel Background", category: "Glass" },
];

/* ─── Flow chain examples ─── */
const CHAIN_EXAMPLES = [
  {
    setting: "Border Radius: Large",
    variable: "--glass-radius",
    fallback: "20px",
    preview: "radius",
  },
  {
    setting: "Blur: 24px",
    variable: "--glass-blur",
    fallback: "24px",
    preview: "blur",
  },
  {
    setting: "Shadow: Soft",
    variable: "--glass-shadow",
    fallback: "0 8px 40px...",
    preview: "shadow",
  },
];

/* ─── Hook to poll computed CSS variables ─── */
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

/* ─── Arrow SVG ─── */
function Arrow({ isDark }: { isDark: boolean }) {
  return (
    <svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      style={{ flexShrink: 0, opacity: 0.35 }}
    >
      <path
        d="M0 8h22m0 0l-5-5m5 5l-5 5"
        stroke={isDark ? "#fff" : "#000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Section A: How It Works ─── */
function HowItWorks({ isDark }: { isDark: boolean }) {
  const liveVars = useLiveCSSVars([
    { variable: "--glass-radius", label: "", category: "" },
    { variable: "--glass-blur", label: "", category: "" },
    { variable: "--glass-shadow", label: "", category: "" },
  ]);

  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const labelColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const valueColor = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)";
  const monoColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";

  const stepCard: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: "10px",
    background: cardBg,
    border: `1px solid ${cardBorder}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    minWidth: "110px",
  };

  return (
    <div style={{ marginBottom: "28px" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 650,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: labelColor,
          marginBottom: "12px",
        }}
      >
        How It Works
      </div>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            ...stepCard,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: 600, color: labelColor }}>
            Appearance Setting
          </span>
        </div>
        <Arrow isDark={isDark} />
        <div
          style={{
            ...stepCard,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: 600, color: labelColor }}>
            CSS Variable
          </span>
        </div>
        <Arrow isDark={isDark} />
        <div
          style={{
            ...stepCard,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: 600, color: labelColor }}>
            Component
          </span>
        </div>
      </div>

      {/* Example rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {CHAIN_EXAMPLES.map((ex) => {
          const liveVal = liveVars[ex.variable] || ex.fallback;
          const displayVal =
            liveVal.length > 24 ? liveVal.slice(0, 24) + "..." : liveVal;

          return (
            <div
              key={ex.variable}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <div style={stepCard}>
                <span
                  style={{ fontSize: "12px", fontWeight: 600, color: valueColor }}
                >
                  {ex.setting}
                </span>
              </div>
              <Arrow isDark={isDark} />
              <div style={stepCard}>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono, monospace)",
                    color: monoColor,
                  }}
                >
                  {ex.variable}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "var(--font-mono, monospace)",
                    color: labelColor,
                  }}
                >
                  {displayVal}
                </span>
              </div>
              <Arrow isDark={isDark} />
              <div style={stepCard}>
                {ex.preview === "radius" && (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: `var(--glass-radius, 12px)`,
                      background: isDark
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.08)",
                      border: `2px solid ${
                        isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)"
                      }`,
                    }}
                  />
                )}
                {ex.preview === "blur" && (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      backdropFilter: `blur(var(--glass-blur, 12px))`,
                      WebkitBackdropFilter: `blur(var(--glass-blur, 12px))`,
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.04)",
                      border: `1px solid ${
                        isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
                      }`,
                    }}
                  />
                )}
                {ex.preview === "shadow" && (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: isDark ? "rgba(255,255,255,0.1)" : "#fff",
                      boxShadow: `var(--glass-shadow, 0 2px 8px rgba(0,0,0,0.1))`,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section B: Live CSS Variables Table ─── */
function LiveVariablesTable({ isDark }: { isDark: boolean }) {
  const values = useLiveCSSVars(CSS_VARS);

  const tableBg = isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const headerText = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelText = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.75)";
  const monoText = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  const dimText = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const catBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";

  // Group by category
  const grouped: Record<string, VarDef[]> = {};
  for (const v of CSS_VARS) {
    if (!grouped[v.category]) grouped[v.category] = [];
    grouped[v.category].push(v);
  }

  return (
    <div style={{ marginBottom: "28px" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 650,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: headerText,
          marginBottom: "12px",
        }}
      >
        Live CSS Variables
      </div>
      <div
        style={{
          borderRadius: "var(--glass-radius-sm, 10px)",
          overflow: "hidden",
          background: tableBg,
          border: `1px solid ${borderColor}`,
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 0.8fr",
            padding: "8px 12px",
            background: headerBg,
            borderBottom: `1px solid ${borderColor}`,
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 650,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: headerText,
            }}
          >
            Variable
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 650,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: headerText,
            }}
          >
            Current Value
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 650,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: headerText,
            }}
          >
            Set By
          </span>
        </div>

        {/* Rows grouped by category */}
        {Object.entries(grouped).map(([category, vars]) => (
          <div key={category}>
            {/* Category label */}
            <div
              style={{
                padding: "6px 12px",
                background: catBg,
                borderBottom: `1px solid ${rowBorder}`,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 650,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: dimText,
                }}
              >
                {category}
              </span>
            </div>
            {vars.map((v, idx) => {
              const rawVal = values[v.variable] || "(not set)";
              const displayVal =
                rawVal.length > 40 ? rawVal.slice(0, 40) + "..." : rawVal;
              return (
                <div
                  key={v.variable}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.2fr 0.8fr",
                    padding: "7px 12px",
                    borderBottom:
                      idx < vars.length - 1
                        ? `1px solid ${rowBorder}`
                        : "none",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "var(--font-mono, monospace)",
                      color: monoText,
                      wordBreak: "break-all",
                    }}
                  >
                    {v.variable}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "var(--font-mono, monospace)",
                      color: labelText,
                      wordBreak: "break-all",
                    }}
                  >
                    {displayVal}
                  </span>
                  <span style={{ fontSize: "11px", color: dimText }}>
                    {v.label}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section C: Try It ─── */
function TryIt({ isDark }: { isDark: boolean }) {
  const labelColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const noteColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const noteBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const noteBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  return (
    <div>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 650,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: labelColor,
          marginBottom: "12px",
        }}
      >
        Try It
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Button variant="gel" size="md">
          Gel Button
        </Button>
        <Card glass={1} style={{ padding: "16px 20px", minWidth: 120 }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 550,
              color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
            }}
          >
            Glass Card
          </span>
        </Card>
        <Input placeholder="Type here..." style={{ maxWidth: 160 }} />
        <Badge>Live</Badge>
      </div>
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          background: noteBg,
          border: `1px solid ${noteBorder}`,
        }}
      >
        <span style={{ fontSize: "12px", color: noteColor, lineHeight: 1.5 }}>
          Open Appearance (right-click &rarr; Appearance) to see these components
          update in real-time
        </span>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function LiveTheming() {
  const isDark = useDarkMode();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
      <HowItWorks isDark={isDark} />
      <LiveVariablesTable isDark={isDark} />
      <TryIt isDark={isDark} />
    </div>
  );
}
