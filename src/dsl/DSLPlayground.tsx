/* ═══════════════════════════════════════════════
   GEL UI — DSL Playground
   Interactive JSON editor + live preview.
   Phase 2 of UI DSL implementation.
   ═══════════════════════════════════════════════ */
import { useState, useEffect, useCallback } from "react";
import { DSLRenderer, DSL_EXAMPLES } from "./DSLRenderer";
import type { DSLNode } from "@/registry/types";

function isDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

export function DSLPlayground() {
  const [dark, setDark] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);
  const [jsonText, setJsonText] = useState("");
  const [parsedDSL, setParsedDSL] = useState<DSLNode | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "preview" | "json">("split");

  // Theme detection
  useEffect(() => {
    const check = () => setDark(isDark());
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Load example on selection
  useEffect(() => {
    const example = DSL_EXAMPLES[selectedExample];
    if (example) {
      const text = JSON.stringify(example.dsl, null, 2);
      setJsonText(text);
      setParsedDSL(example.dsl);
      setParseError(null);
    }
  }, [selectedExample]);

  // Parse JSON on text change
  const handleJsonChange = useCallback((text: string) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      setParsedDSL(parsed);
      setParseError(null);
    } catch (e: unknown) {
      setParseError((e as Error).message);
    }
  }, []);

  const textColor = dark ? "#fff" : "#000";
  const mutedColor = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const panelBg = dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)";
  const codeBg = dark ? "rgba(0,0,0,0.6)" : "#1a1a1a";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      {/* ── Header Bar ── */}
      <div
        className="glass-1 glass-specular"
        style={{ borderRadius: "var(--glass-radius, 16px)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Example selector */}
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: mutedColor }}>Template</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {DSL_EXAMPLES.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(i)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--glass-radius-pill, 100px)",
                  border: `1px solid ${i === selectedExample ? textColor : borderColor}`,
                  background: i === selectedExample ? textColor : "transparent",
                  color: i === selectedExample ? (dark ? "#000" : "#fff") : mutedColor,
                  fontSize: "12px",
                  fontWeight: i === selectedExample ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 200ms",
                }}
              >
                {ex.name}
              </button>
            ))}
          </div>
        </div>

        {/* View mode toggle */}
        <div style={{ display: "flex", gap: "2px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", borderRadius: "var(--glass-radius-pill, 100px)", padding: "3px" }}>
          {(["split", "preview", "json"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: "5px 12px",
                borderRadius: "var(--glass-radius-pill, 100px)",
                border: "none",
                background: viewMode === mode ? (dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)") : "transparent",
                color: viewMode === mode ? textColor : mutedColor,
                fontSize: "11px",
                fontWeight: viewMode === mode ? 600 : 400,
                cursor: "pointer",
                transition: "all 200ms",
                textTransform: "capitalize" as const,
              }}
            >
              {mode === "split" ? "Split" : mode === "preview" ? "Preview" : "JSON"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ display: "grid", gridTemplateColumns: viewMode === "split" ? "1fr 1fr" : "1fr", gap: "20px", minHeight: "500px" }}>
        {/* JSON Editor */}
        {(viewMode === "split" || viewMode === "json") && (
          <div
            style={{
              borderRadius: "var(--glass-radius, 16px)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: `1px solid ${borderColor}`,
            }}
          >
            {/* Editor header */}
            <div style={{ padding: "10px 16px", background: codeBg, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>JSON DSL</span>
              {parseError && (
                <span style={{ fontSize: "10px", color: "#FF6961", fontFamily: "var(--font-mono)" }}>
                  ⚠ {parseError.slice(0, 50)}
                </span>
              )}
              {!parseError && parsedDSL && (
                <span style={{ fontSize: "10px", color: "#4AD96B", fontFamily: "var(--font-mono)" }}>✓ Valid</span>
              )}
            </div>
            {/* Textarea */}
            <textarea
              value={jsonText}
              onChange={(e) => handleJsonChange(e.target.value)}
              spellCheck={false}
              style={{
                flex: 1,
                minHeight: "450px",
                padding: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                lineHeight: 1.6,
                color: "#e0e0e0",
                background: codeBg,
                border: "none",
                outline: "none",
                resize: "none",
                tabSize: 2,
              }}
            />
          </div>
        )}

        {/* Preview */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div
            className="glass-1 glass-specular"
            style={{
              borderRadius: "var(--glass-radius, 16px)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Preview header */}
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${borderColor}` }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: mutedColor, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Live Preview</span>
              <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: mutedColor }}>
                {parsedDSL ? DSL_EXAMPLES[selectedExample]?.name ?? "Custom" : "—"}
              </span>
            </div>
            {/* Rendered DSL */}
            <div style={{ flex: 1, padding: "24px", overflow: "auto" }}>
              {parsedDSL ? (
                <DSLRenderer node={parsedDSL} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: mutedColor, fontSize: "13px" }}>
                  Enter valid JSON to see preview
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Info Bar ── */}
      <div
        className="glass-1 glass-specular"
        style={{ borderRadius: "var(--glass-radius, 16px)", padding: "12px 20px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}
      >
        <span style={{ fontSize: "11px", fontWeight: 600, color: mutedColor }}>
          {DSL_EXAMPLES[selectedExample]?.description}
        </span>
        <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: mutedColor }}>
          {Object.keys(import("./primitives").then ? {} : {}).length || "30+"}  primitives available
        </span>
        <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", padding: "3px 8px", borderRadius: "100px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", color: mutedColor }}>
          Phase 2 — DSL Renderer
        </span>
      </div>
    </div>
  );
}
