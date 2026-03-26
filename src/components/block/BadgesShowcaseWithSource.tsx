import { useState, useEffect } from "react";
import { BadgesShowcaseV2 } from "./BadgesShowcaseV2";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Badge, Tag, Avatar } from "@/primitives/data";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function BadgesShowcase() {
  const isDark = useDarkMode();
  const [tags, setTags] = useState(["React", "Tailwind", "Astro"]);
  const [activeChip, setActiveChip] = useState("Active");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

      {/* Status Badges — 5 variants */}
      <div className="card">
        <span className="type-overline">Status Badges</span>
        {(["success", "warning", "error", "info", "default"] as const).map((v) => (
          <div className="row">
            <span className="type-label">{v}</span>
            <Badge variant={v}>{v}</Badge>
          </div>
        ))}
      </div>

      {/* Status Dots — colored circles */}
      <div className="card">
        <span className="type-overline">Status Dots</span>
        {[
          { label: "Online", color: "#34C759" },
          { label: "Away", color: "#FFC800" },
          { label: "Busy", color: "#FF3B30" },
          { label: "Offline", color: "rgba(0,0,0,0.25)" },
        ].map((dot) => (
          <div className="row">
            <span className="type-label">{dot.label}</span>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: dot.color }} />
          </div>
        ))}
      </div>

      {/* Tags & Chips — removable + selectable */}
      <div className="card">
        <span className="type-overline">Tags & Chips</span>
        <span className="type-caption">Removable Tags</span>
        <div style={{ display: "flex", gap: 8 }}>
          {tags.map((tag) => (
            <Tag
              label={tag}
              color={tag === "React" ? "blue" : tag === "Tailwind" ? "green" : "purple"}
              onRemove={() => setTags(tags.filter(t => t !== tag))}
            />
          ))}
        </div>
        <span className="type-caption">Selectable Chips</span>
        <div style={{ display: "flex", gap: 8 }}>
          {["Active", "Inactive", "Another"].map((chip) => (
            <button
              className="type-overline"
              onClick={() => setActiveChip(chip)}
              style={{
                paddingTop: 5, paddingBottom: 5, paddingLeft: 14, paddingRight: 14,
                borderRadius: "var(--glass-radius-pill)",
                background: activeChip === chip ? "#000" : "transparent",
                color: activeChip === chip ? "#fff" : "inherit",
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Avatars — sizes + group */}
      <div className="card">
        <span className="type-overline">Avatars</span>
        <span className="type-caption">Sizes</span>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          {[
            { initials: "A", size: 28, bg: "#5856D6" },
            { initials: "B", size: 36, bg: "#FF9500" },
            { initials: "U", size: 44, bg: "#007AFF" },
            { initials: "D", size: 56, bg: "#34C759" },
          ].map((a) => (
            <div style={{
              width: a.size, height: a.size, borderRadius: "50%",
              background: a.bg, display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontWeight: 600,
            }}>
              {a.initials}
            </div>
          ))}
        </div>
        <span className="type-caption">Group</span>
        <div style={{ display: "flex" }}>
          {[
            { initials: "A", bg: "#5856D6", status: "online" },
            { initials: "B", bg: "#FF9500", status: "away" },
            { initials: "C", bg: "#FF2D55", status: "busy" },
          ].map((u, i) => (
            <div style={{
              marginLeft: i > 0 ? -10 : 0, zIndex: 4 - i,
              width: 36, height: 36, borderRadius: "50%",
              background: u.bg, color: "#fff", fontWeight: 600,
              border: "2.5px solid #fff", position: "relative",
            }}>
              {u.initials}
            </div>
          ))}
          <div style={{
            marginLeft: -10, width: 36, height: 36,
            borderRadius: "50%", background: "#1a1a1a",
            color: "#fff", fontWeight: 650, fontSize: 11,
            border: "2.5px solid #fff",
          }}>
            +3
          </div>
        </div>
      </div>
    </div>
  );
}`;

const IMPLEMENTATION = `// Badge — colored status pill
export function Badge({ variant = "default", children }) {
  const colors = {
    success: { bg: "rgba(52,199,89,0.15)", text: "#34C759" },
    warning: { bg: "rgba(255,149,0,0.15)", text: "#FF9500" },
    error:   { bg: "rgba(255,59,48,0.15)", text: "#FF3B30" },
    info:    { bg: "rgba(90,200,250,0.15)", text: "#5AC8FA" },
    default: { bg: "rgba(0,0,0,0.06)", text: "rgba(0,0,0,0.6)" },
  };
  const c = colors[variant];
  return (
    <span className="type-caption" style={{
      display: "inline-flex", alignItems: "center",
      paddingTop: 3, paddingBottom: 3, paddingLeft: 8, paddingRight: 8, borderRadius: "100px",
      background: c.bg, color: c.text,
    }}>
      {children}
    </span>
  );
}

// Tag — removable pill with color and × button
export function Tag({ label, color, onRemove }) {
  const colorMap = {
    blue:   { bg: "rgba(0,122,255,0.12)",  text: "#007AFF" },
    green:  { bg: "rgba(52,199,89,0.12)",  text: "#34C759" },
    purple: { bg: "rgba(175,82,222,0.12)", text: "#AF52DE" },
  };
  const c = colorMap[color];
  return (
    <span className="type-caption" style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderRadius: "var(--glass-radius-pill)",
      background: c.bg, color: c.text,
    }}>
      {label}
      {onRemove && <button onClick={onRemove}>×</button>}
    </span>
  );
}

// Avatar — circle with initials or image + status dot
export function Avatar({ name, size = "36px", src, status }) {
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase();
  const bg = generateColorFromName(name); // deterministic color
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: src ? "transparent" : bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      {src ? <img src={src} style={{ width: "100%", borderRadius: "50%" }} />
           : <span style={{ color: "#fff", fontSize: "40%", fontWeight: 600 }}>{initials}</span>}
      {status && (
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: "30%", height: "30%", borderRadius: "50%",
          background: statusColors[status],
          border: "2px solid #fff",
        }} />
      )}
    </div>
  );
}`;

const COMPONENTS = [
  { name: "Badge", path: "@/primitives/data", description: "Status indicator with color variants (success, warning, error, info, default)" },
  { name: "Tag", path: "@/primitives/data", description: "Removable label with color and onRemove callback" },
  { name: "Avatar", path: "@/primitives/data", description: "User avatar with initials, image, size, and status dot" },
  { name: "Stat", path: "@/primitives/data", description: "Big number + label + trend indicator" },
  { name: "ColorSwatch", path: "@/primitives/data", description: "Color preview square with optional hex label" },
];

export function BadgesShowcaseWithSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="badges"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <BadgesShowcaseV2 />
      <ViewSourceModal
        open={open}
        onClose={() => setOpen(false)}
        title="Badges & Labels"
        code={SOURCE_CODE}
        components={COMPONENTS}
        extraTabs={[{ label: "Implementation", code: IMPLEMENTATION }]}
      />
    </>
  );
}
