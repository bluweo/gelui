import { useState, useEffect } from "react";
import { BadgesShowcaseV2 } from "./BadgesShowcaseV2";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Badge, Tag, Avatar } from "@/primitives/data";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function BadgesShowcase() {
  const [tags, setTags] = useState(["React", "Tailwind", "Astro"]);
  const [activeChip, setActiveChip] = useState("Active");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* Status Badges */}
      {["success", "warning", "error", "info"].map((v) => (
        <Badge variant={v}>{v}</Badge>
      ))}

      {/* Status Dots */}
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#34C759" }} />

      {/* Removable Tags */}
      {tags.map((tag) => (
        <Tag label={tag} color="blue" onRemove={() => setTags(tags.filter(t => t !== tag))} />
      ))}

      {/* Avatars with status */}
      <Avatar name="A" size="28px" />
      <Avatar name="UI" size="44px" status="online" />

      {/* Avatar Group */}
      <div style={{ display: "flex", marginLeft: -8 }}>
        <Avatar name="A" size="36px" status="online" />
        <Avatar name="B" size="36px" status="away" />
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
      padding: "3px 8px", borderRadius: "100px",
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
      padding: "4px 10px", borderRadius: "var(--glass-radius-pill)",
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
