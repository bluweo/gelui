import { Badge, Tag, Avatar } from "@/primitives/data";
import { useState } from "react";

export function BadgesShowcaseV2() {
  const [tags, setTags] = useState(["React", "Tailwind", "Astro"]);
  const [activeChip, setActiveChip] = useState("Active");

  const card: React.CSSProperties = {
    borderRadius: "var(--glass-radius-sm, 10px)",
    overflow: "hidden",
    background: "var(--theme-table-bg)",
    border: "1px solid var(--theme-divider)",
  };

  const header: React.CSSProperties = {
    padding: "10px 14px",
    background: "var(--theme-header-bg)",
    borderBottom: "1px solid var(--theme-divider)",
  };

  const row = (last = false): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    borderBottom: last ? undefined : "1px solid var(--theme-divider)",
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {/* Top-left: Status Badges */}
      <div style={card}>
        <div style={header}>
          <span className="type-overline" style={{ color: "var(--theme-fg-subtle)" }}>Status Badges</span>
        </div>
        {(["success", "warning", "error", "info", "default"] as const).map((v, i) => (
          <div key={v} style={row(i === 4)}>
            <span className="type-label" style={{ color: "var(--theme-fg)", textTransform: "capitalize" }}>{v === "default" ? "Neutral" : v}</span>
            <Badge variant={v}>{v === "default" ? "Neutral" : v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
          </div>
        ))}
      </div>

      {/* Top-right: Status Dots */}
      <div style={card}>
        <div style={header}>
          <span className="type-overline" style={{ color: "var(--theme-fg-subtle)" }}>Status Dots</span>
        </div>
        {([
          { label: "Online", color: "#34C759" },
          { label: "Away", color: "#FFC800" },
          { label: "Busy", color: "#FF3B30" },
          { label: "Offline", color: "var(--theme-fg-faint)" },
        ]).map((dot, i) => (
          <div key={dot.label} style={row(i === 3)}>
            <span className="type-label" style={{ color: "var(--theme-fg)" }}>{dot.label}</span>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: dot.color, flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* Bottom-left: Tags & Chips */}
      <div style={card}>
        <div style={header}>
          <span className="type-overline" style={{ color: "var(--theme-fg-subtle)" }}>Tags & Chips</span>
        </div>
        {/* Removable Tags */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-caption" style={{ color: "var(--theme-fg-subtle)", display: "block", marginBottom: 8 }}>Removable Tags</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                color={tag === "React" ? "blue" : tag === "Tailwind" ? "green" : "purple"}
                onRemove={() => setTags(tags.filter(t => t !== tag))}
              />
            ))}
            {tags.length === 0 && (
              <span style={{ fontSize: "11px", color: "var(--theme-fg-subtle)" }}>All removed — refresh to reset</span>
            )}
          </div>
        </div>
        {/* Selectable Chips */}
        <div style={{ padding: "12px 14px" }}>
          <span className="type-caption" style={{ color: "var(--theme-fg-subtle)", display: "block", marginBottom: 8 }}>Selectable Chips</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Active", "Inactive", "Another"].map((chip) => (
              <button
                key={chip}
                className="type-overline"
                onClick={() => setActiveChip(chip)}
                style={{
                  padding: "5px 14px",
                  borderRadius: "var(--glass-radius-pill, 100px)",
                  border: "1px solid var(--theme-ghost-border)",
                  background: activeChip === chip ? "var(--theme-bg-solid)" : "transparent",
                  color: activeChip === chip ? "var(--theme-fg-on-solid)" : "var(--theme-fg)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-right: Avatars */}
      <div style={card}>
        <div style={header}>
          <span className="type-overline" style={{ color: "var(--theme-fg-subtle)" }}>Avatars</span>
        </div>
        {/* Sizes */}
        <div style={{ padding: "14px", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-caption" style={{ color: "var(--theme-fg-subtle)", display: "block", marginBottom: 10 }}>Sizes</span>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
            {([
              { initials: "A", size: 28, bg: "#5856D6", label: "xs" },
              { initials: "B", size: 36, bg: "#FF9500", label: "sm" },
              { initials: "U", size: 44, bg: "#007AFF", label: "md" },
              { initials: "D", size: 56, bg: "#34C759", label: "lg" },
            ]).map((a) => (
              <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: a.size,
                  height: a.size,
                  borderRadius: "50%",
                  background: a.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${Math.max(a.size * 0.38, 11)}px`,
                  fontWeight: 600,
                  color: "#fff",
                  overflow: "hidden",
                }}>
                  {a.initials}
                </div>
                <span className="type-caption" style={{ color: "var(--theme-fg-subtle)" }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Group */}
        <div style={{ padding: "14px" }}>
          <span className="type-caption" style={{ color: "var(--theme-fg-subtle)", display: "block", marginBottom: 10 }}>Group</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            {([
              { initials: "A", bg: "#5856D6", status: "online" as const },
              { initials: "B", bg: "#FF9500", status: "away" as const },
              { initials: "C", bg: "#FF2D55", status: "busy" as const },
            ]).map((u, i) => (
              <div
                key={u.initials}
                style={{
                  marginLeft: i > 0 ? -10 : 0,
                  zIndex: 4 - i,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: u.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                  border: "2.5px solid var(--theme-table-bg)",
                  position: "relative",
                }}
              >
                {u.initials}
                <span style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: u.status === "online" ? "#34C759" : u.status === "away" ? "#FFC800" : "#FF3B30",
                  border: "2px solid var(--theme-table-bg)",
                }} />
              </div>
            ))}
            <div
              style={{
                marginLeft: -10,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--theme-bg-solid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 650,
                color: "var(--theme-fg-on-solid)",
                border: "2.5px solid var(--theme-table-bg)",
                zIndex: 0,
              }}
            >
              +3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
