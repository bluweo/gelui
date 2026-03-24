import { Button, LinkButton } from "@/primitives/buttons";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function ButtonsShowcase() {
  const isDark = useDarkMode();

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 550,
    color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)",
  };

  const headerStyle = {
    fontSize: "10px",
    fontWeight: 650,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)",
  };

  const tableBg = isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <div className="flex flex-col gap-5">
      {/* Solid Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Solid</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={labelStyle}>Pill</span>
          <Button variant="solid" size="md">Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={labelStyle}>Rounded</span>
          <Button variant="solid" size="md" style={{ borderRadius: "var(--glass-radius, 16px)" }}>Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={labelStyle}>Small</span>
          <Button variant="solid" size="sm">Button</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Ghost</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={labelStyle}>Pill</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={labelStyle}>Rounded</span>
          <Button variant="ghost" size="md" style={{ borderRadius: "var(--glass-radius-sm, 10px)" }}>Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Action Pair</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "16px" }}>
          <Button variant="ghost" size="md">Cancel</Button>
          <Button variant="solid" size="md" style={{ borderRadius: "var(--glass-radius, 16px)" }}>Apply</Button>
        </div>
      </div>

      {/* Link Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Link</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={labelStyle}>Underline</span>
          <LinkButton underline>Learn more</LinkButton>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={labelStyle}>Arrow</span>
          <LinkButton arrow>Explore</LinkButton>
        </div>
      </div>
    </div>
  );
}
