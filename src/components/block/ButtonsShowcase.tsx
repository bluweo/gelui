import { Button, LinkButton } from "@/primitives/buttons";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function ButtonsShowcase() {
  const isDark = useDarkMode();

  const labelColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";

  const tableBg = isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <div className="flex flex-col gap-5" suppressHydrationWarning>
      {/* Solid Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span className="type-overline" style={{ color: headerColor }}>Solid</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Pill</span>
          <Button variant="solid" size="md">Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Rounded</span>
          <Button variant="solid" size="md" style={{ borderRadius: "var(--glass-radius, 16px)" }}>Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: labelColor }}>Small</span>
          <Button variant="solid" size="sm">Button</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span className="type-overline" style={{ color: headerColor }}>Ghost</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Pill</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: labelColor }}>Rounded</span>
          <Button variant="ghost" size="md" style={{ borderRadius: "var(--glass-radius-sm, 10px)" }}>Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span className="type-overline" style={{ color: headerColor }}>Action Pair</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Medium</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="ghost" size="md" shape="rounded">Cancel</Button>
            <Button variant="solid" size="md" shape="rounded">Apply</Button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: labelColor }}>Compact</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="ghost" size="sm" shape="rounded">Cancel</Button>
            <Button variant="solid" size="sm" shape="rounded">Apply</Button>
          </div>
        </div>
      </div>

      {/* Link Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span className="type-overline" style={{ color: headerColor }}>Link</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Underline</span>
          <LinkButton underline>Learn more</LinkButton>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: labelColor }}>Arrow</span>
          <LinkButton arrow>Explore</LinkButton>
        </div>
      </div>
    </div>
  );
}
