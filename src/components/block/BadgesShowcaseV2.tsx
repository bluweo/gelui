import { Badge, Tag, Avatar, Stat, ColorSwatch } from "@/primitives/data";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function BadgesShowcaseV2() {
  const isDark = useDarkMode();
  const [tags, setTags] = useState(["React", "Astro", "Tailwind", "TypeScript"]);

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";

  const headerStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 650,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: headerColor,
  };

  const tableStyle: React.CSSProperties = {
    borderRadius: "var(--glass-radius-sm, 10px)",
    overflow: "hidden",
    background: tableBg,
    border: `1px solid ${borderColor}`,
  };

  const rowStyle = (last = false): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: last ? undefined : `1px solid ${rowBorder}`,
  });

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 550,
    color: labelColor,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Status Badges */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Status Badges</span>
        </div>
        {(["default", "success", "warning", "error", "info"] as const).map((variant, i) => (
          <div key={variant} style={rowStyle(i === 4)}>
            <span style={{ ...labelStyle, textTransform: "capitalize" }}>{variant}</span>
            <Badge variant={variant}>{variant === "default" ? "Default" : variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>
          </div>
        ))}
      </div>

      {/* Removable Tags */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Removable Tags</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "14px 16px" }}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              color={tag === "React" ? "blue" : tag === "Astro" ? "purple" : tag === "Tailwind" ? "green" : "amber"}
              onRemove={() => setTags(tags.filter(t => t !== tag))}
            />
          ))}
          {tags.length === 0 && (
            <span style={{ fontSize: "12px", opacity: 0.4 }}>All tags removed — refresh to reset</span>
          )}
        </div>
      </div>

      {/* Avatars */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Avatars</span>
        </div>
        <div style={rowStyle()}>
          <span style={labelStyle}>With Status</span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Avatar name="John Doe" size="36px" status="online" />
            <Avatar name="Jane Smith" size="36px" status="busy" />
            <Avatar name="Bob" size="36px" status="away" />
            <Avatar name="AI" size="36px" status="offline" />
          </div>
        </div>
        <div style={rowStyle(true)}>
          <span style={labelStyle}>Sizes</span>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar name="XS" size="24px" />
            <Avatar name="SM" size="32px" />
            <Avatar name="MD" size="40px" />
            <Avatar name="LG" size="52px" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Stat Cards</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", padding: "14px 16px" }}>
          <Stat value="1,284" label="Users" trend="up" trendValue="+12%" />
          <Stat value="$48K" label="Revenue" trend="up" trendValue="+8.5%" />
          <Stat value="326" label="Orders" trend="down" trendValue="-3.2%" />
          <Stat value="99.9%" label="Uptime" trend="neutral" trendValue="0.0%" />
        </div>
      </div>

      {/* Color Swatches */}
      <div style={tableStyle}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Color Swatches</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "14px 16px", justifyContent: "center" }}>
          <ColorSwatch color="#354334" label="Primary" showHex />
          <ColorSwatch color="#97AD96" label="Accent" showHex />
          <ColorSwatch color="#FFC800" label="Warning" showHex />
          <ColorSwatch color="#FF3B30" label="Error" showHex />
          <ColorSwatch color="#5AC8FA" label="Info" showHex />
          <ColorSwatch color="#34C759" label="Success" showHex />
        </div>
      </div>
    </div>
  );
}
