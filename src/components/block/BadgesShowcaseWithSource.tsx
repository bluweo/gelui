import { useState, useEffect } from "react";
import { BadgesShowcaseV2 } from "./BadgesShowcaseV2";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_BADGE from "@/primitives/data/Badge.tsx?raw";
import IMPL_TAG from "@/primitives/data/Tag.tsx?raw";
import IMPL_AVATAR from "@/primitives/data/Avatar.tsx?raw";
import IMPL_STAT from "@/primitives/data/Stat.tsx?raw";
import IMPL_COLORSWATCH from "@/primitives/data/ColorSwatch.tsx?raw";

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

const COMPONENTS = [
  { name: "Badge", path: "@/primitives/data", description: "Status indicator with color variants (success, warning, error, info, default)", implementation: IMPL_BADGE },
  { name: "Tag", path: "@/primitives/data", description: "Removable label with color and onRemove callback", implementation: IMPL_TAG },
  { name: "Avatar", path: "@/primitives/data", description: "User avatar with initials, image, size, and status dot", implementation: IMPL_AVATAR },
  { name: "Stat", path: "@/primitives/data", description: "Big number + label + trend indicator", implementation: IMPL_STAT },
  { name: "ColorSwatch", path: "@/primitives/data", description: "Color preview square with optional hex label", implementation: IMPL_COLORSWATCH },
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
      />
    </>
  );
}
