import { Badge, Tag, Avatar, NotificationBadge } from "@/primitives/data";
import { Tooltip } from "@/primitives/feedback";
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

      {/* Bottom-left row 3: Notification Badges */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-subtle)]">Notification Badges</span>
        </div>
        <div className="flex items-center justify-between py-3 px-3.5 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">Count</span>
          <div className="flex gap-6 items-center pr-1">
            <NotificationBadge count={3}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </NotificationBadge>
            <NotificationBadge count={12}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </NotificationBadge>
            <NotificationBadge count={128} max={99}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </NotificationBadge>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 px-3.5">
          <span className="type-label text-[var(--theme-fg)]">Dot</span>
          <div className="flex gap-6 items-center pr-1">
            <NotificationBadge dot>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </NotificationBadge>
            <NotificationBadge dot color="#FF9500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </NotificationBadge>
            <NotificationBadge dot color="#34C759">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </NotificationBadge>
          </div>
        </div>
      </div>

      {/* Bottom-right row 3: Tooltip Labels */}
      <div className="rounded-[var(--glass-radius-sm)] bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)] rounded-t-[var(--glass-radius-sm)]">
          <span className="type-overline text-[var(--theme-fg-subtle)]">Tooltip Labels</span>
        </div>
        <div className="flex items-center justify-between py-3 px-3.5 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">Top</span>
          <div className="flex gap-2 items-center">
            <Tooltip content="Edit document" position="top">
              <button className="prim-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </button>
            </Tooltip>
            <Tooltip content="Delete item" position="top">
              <button className="prim-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
            </Tooltip>
            <Tooltip content="Share link" position="top">
              <button className="prim-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 px-3.5">
          <span className="type-label text-[var(--theme-fg)]">Bottom</span>
          <div className="flex gap-2 items-center">
            <Tooltip content="Download" position="bottom">
              <button className="prim-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </button>
            </Tooltip>
            <Tooltip content="Settings" position="bottom">
              <button className="prim-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              </button>
            </Tooltip>
            <Tooltip content="Help" position="bottom">
              <button className="prim-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
