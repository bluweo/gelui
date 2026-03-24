import { Button } from "@/primitives/buttons";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function ButtonsRightColumn() {
  const isDark = useDarkMode();

  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const subtleBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const headerColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const labelColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";

  const tableStyle: React.CSSProperties = {
    borderRadius: "var(--glass-radius-sm, 10px)",
    overflow: "hidden",
    border: `1px solid ${borderColor}`,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Gel Buttons table */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>
          <span className="type-overline" style={{ color: headerColor }}>Gel</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${subtleBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Sizes</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Button variant="gel" size="sm" shape="pill">Small</Button>
            <Button variant="gel" size="md" shape="pill">Medium</Button>
            <Button variant="gel" size="lg" shape="pill">Large</Button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: labelColor }}>Icons</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button variant="gel" size="sm" shape="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </Button>
            <Button variant="gel" size="md" shape="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"><path d="M4 12h16M12 4v16" /></svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Glass Buttons table */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>
          <span className="type-overline" style={{ color: headerColor }}>Glass</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${subtleBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Pill</span>
          <Button variant="glass" size="md" shape="pill">Glass Pill</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: labelColor }}>Rounded</span>
          <Button variant="glass" size="md" shape="rounded">Glass Rounded</Button>
        </div>
      </div>

      {/* States table */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>
          <span className="type-overline" style={{ color: headerColor }}>States</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${subtleBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Default</span>
          <Button variant="gel" size="md" shape="pill">Default</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${subtleBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Hover</span>
          <Button variant="gel" size="md" shape="pill" style={{ transform: "scale(1.05)" }}>Hover</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: labelColor }}>Disabled</span>
          <Button variant="gel" size="md" shape="pill" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
