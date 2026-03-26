import { Badge, Tag, Avatar } from "@/primitives/data";
import { useState } from "react";

export function BadgesShowcaseV2() {
  const [tags, setTags] = useState(["React", "Tailwind", "Astro"]);
  const [activeChip, setActiveChip] = useState("Active");

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Top-left: Status Badges */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-subtle)]">Status Badges</span>
        </div>
        {(["success", "warning", "error", "info", "default"] as const).map((v, i) => (
          <div key={v} className={`flex items-center justify-between py-2.5 px-3.5 ${i < 4 ? "border-b border-[var(--theme-divider)]" : ""}`}>
            <span className="type-label text-[var(--theme-fg)] capitalize">{v === "default" ? "Neutral" : v}</span>
            <Badge variant={v}>{v === "default" ? "Neutral" : v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
          </div>
        ))}
      </div>

      {/* Top-right: Status Dots */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-subtle)]">Status Dots</span>
        </div>
        {([
          { label: "Online", color: "#34C759" },
          { label: "Away", color: "#FFC800" },
          { label: "Busy", color: "#FF3B30" },
          { label: "Offline", color: "var(--theme-fg-faint)" },
        ]).map((dot, i) => (
          <div key={dot.label} className={`flex items-center justify-between py-2.5 px-3.5 ${i < 3 ? "border-b border-[var(--theme-divider)]" : ""}`}>
            <span className="type-label text-[var(--theme-fg)]">{dot.label}</span>
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: dot.color }} />
          </div>
        ))}
      </div>

      {/* Bottom-left: Tags & Chips */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-subtle)]">Tags & Chips</span>
        </div>
        {/* Removable Tags */}
        <div className="py-3 px-3.5 border-b border-[var(--theme-divider)]">
          <span className="type-caption text-[var(--theme-fg-subtle)] block mb-2">Removable Tags</span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                color={tag === "React" ? "blue" : tag === "Tailwind" ? "green" : "purple"}
                onRemove={() => setTags(tags.filter(t => t !== tag))}
              />
            ))}
            {tags.length === 0 && (
              <span className="text-[11px] text-[var(--theme-fg-subtle)]">All removed — refresh to reset</span>
            )}
          </div>
        </div>
        {/* Selectable Chips */}
        <div className="py-3 px-3.5">
          <span className="type-caption text-[var(--theme-fg-subtle)] block mb-2">Selectable Chips</span>
          <div className="flex flex-wrap gap-2">
            {["Active", "Inactive", "Another"].map((chip) => (
              <button
                key={chip}
                className={`type-overline py-[5px] px-3.5 rounded-[var(--glass-radius-pill)] border border-[var(--theme-ghost-border)] cursor-pointer transition-all duration-150 ease-in-out ${activeChip === chip ? "bg-[var(--theme-bg-solid)] text-[var(--theme-fg-on-solid)]" : "bg-transparent text-[var(--theme-fg)]"}`}
                onClick={() => setActiveChip(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-right: Avatars */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-subtle)]">Avatars</span>
        </div>
        {/* Sizes */}
        <div className="p-3.5 border-b border-[var(--theme-divider)]">
          <span className="type-caption text-[var(--theme-fg-subtle)] block mb-2.5">Sizes</span>
          <div className="flex gap-4 items-end">
            {([
              { initials: "A", size: 28, bg: "#5856D6", label: "xs" },
              { initials: "B", size: 36, bg: "#FF9500", label: "sm" },
              { initials: "U", size: 44, bg: "#007AFF", label: "md" },
              { initials: "D", size: 56, bg: "#34C759", label: "lg" },
            ]).map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-1">
                <div
                  className="rounded-full flex items-center justify-center font-semibold text-white overflow-hidden"
                  style={{
                    width: a.size,
                    height: a.size,
                    background: a.bg,
                    fontSize: `${Math.max(a.size * 0.38, 11)}px`,
                  }}
                >
                  {a.initials}
                </div>
                <span className="type-caption text-[var(--theme-fg-subtle)]">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Group */}
        <div className="p-3.5">
          <span className="type-caption text-[var(--theme-fg-subtle)] block mb-2.5">Group</span>
          <div className="flex items-center">
            {([
              { initials: "A", bg: "#5856D6", status: "online" as const },
              { initials: "B", bg: "#FF9500", status: "away" as const },
              { initials: "C", bg: "#FF2D55", status: "busy" as const },
            ]).map((u, i) => (
              <div
                key={u.initials}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white border-[2.5px] border-[var(--theme-table-bg)] relative"
                style={{
                  marginLeft: i > 0 ? -10 : 0,
                  zIndex: 4 - i,
                  background: u.bg,
                }}
              >
                {u.initials}
                <span
                  className="absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-[var(--theme-table-bg)]"
                  style={{
                    background: u.status === "online" ? "#34C759" : u.status === "away" ? "#FFC800" : "#FF3B30",
                  }}
                />
              </div>
            ))}
            <div
              className="w-9 h-9 rounded-full bg-[var(--theme-bg-solid)] flex items-center justify-center text-[11px] font-[650] text-[var(--theme-fg-on-solid)] border-[2.5px] border-[var(--theme-table-bg)] z-0"
              style={{ marginLeft: -10 }}
            >
              +3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
