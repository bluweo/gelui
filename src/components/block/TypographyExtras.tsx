import { Blockquote, List, Kbd } from "@/primitives/typography";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function TypographyExtras() {
  const isDark = useDarkMode();

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Blockquote */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Blockquote</span>
        </div>
        <div style={{ padding: "16px" }}>
          <Blockquote author="Dieter Rams" source="Ten Principles of Good Design">
            Good design is as little design as possible. Less, but better, because it concentrates on the essential aspects, and the products are not burdened with non-essentials.
          </Blockquote>
        </div>
      </div>

      {/* Lists */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Lists</span>
        </div>
        <div style={{ display: "flex", gap: "0", borderBottom: "none" }}>
          <div style={{ flex: 1, padding: "16px", borderRight: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: labelColor, display: "block", marginBottom: "12px" }}>Unordered</span>
            <List
              items={[
                "Design tokens",
                "Glass primitives",
                "Layout compositions",
                "Interactive controls",
              ]}
            />
          </div>
          <div style={{ flex: 1, padding: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: labelColor, display: "block", marginBottom: "12px" }}>Ordered</span>
            <List
              ordered
              items={[
                "Install dependencies",
                "Configure tokens",
                "Import primitives",
                "Build components",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Kbd */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Keyboard Shortcuts</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { label: "Command Palette", keys: ["Cmd", "K"] },
            { label: "Copy", keys: ["Ctrl", "C"] },
            { label: "Save", keys: ["Cmd", "S"] },
            { label: "Undo", keys: ["Cmd", "Z"] },
            { label: "Select All", keys: ["Cmd", "A"] },
          ].map((shortcut, i, arr) => (
            <div
              key={shortcut.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: i < arr.length - 1 ? `1px solid ${rowBorder}` : undefined,
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 500, color: labelColor }}>{shortcut.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {shortcut.keys.map((key, j) => (
                  <span key={j}>
                    <Kbd>{key}</Kbd>
                    {j < shortcut.keys.length - 1 && (
                      <span style={{ margin: "0 2px", fontSize: "11px", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
