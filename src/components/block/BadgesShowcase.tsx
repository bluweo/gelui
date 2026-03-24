import { Badge, Tag, Avatar } from "@/primitives/data";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function BadgesShowcase() {
  const isDark = useDarkMode();
  const [tags, setTags] = useState(["React", "Astro", "Tailwind", "TypeScript"]);

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Status Badges */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Status Badges</span>
        </div>
        {(["default", "success", "warning", "error", "info"] as const).map((variant, i) => (
          <div key={variant} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: i < 4 ? `1px solid ${rowBorder}` : undefined }}>
            <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor, textTransform: "capitalize" }}>{variant}</span>
            <Badge variant={variant}>{variant === "default" ? "Default" : variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Removable Tags</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "14px 16px" }}>
          {tags.map((tag) => (
            <Tag key={tag} label={tag} color={tag === "React" ? "blue" : tag === "Astro" ? "purple" : tag === "Tailwind" ? "green" : "amber"} onRemove={() => setTags(tags.filter(t => t !== tag))} />
          ))}
          {tags.length === 0 && <span style={{ fontSize: "12px", opacity: 0.4 }}>All tags removed — refresh to reset</span>}
        </div>
      </div>

      {/* Avatars */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Avatars</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>With Status</span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Avatar name="John Doe" size="36px" status="online" />
            <Avatar name="Jane Smith" size="36px" status="busy" />
            <Avatar name="Bob" size="36px" status="away" />
            <Avatar name="AI" size="36px" status="offline" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>Sizes</span>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar name="XS" size="24px" />
            <Avatar name="SM" size="32px" />
            <Avatar name="MD" size="40px" />
            <Avatar name="LG" size="52px" />
          </div>
        </div>
      </div>
    </div>
  );
}
