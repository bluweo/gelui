import { Table, Stat, EmptyState, ColorSwatch } from "@/primitives/data";
import { useState } from "react";

export function DataShowcase() {
  const [showEmpty, setShowEmpty] = useState(true);

  const tableColumns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  const tableData = [
    { name: "Alice Chen", role: "Engineer", status: "Active" },
    { name: "Bob Smith", role: "Designer", status: "Away" },
    { name: "Carol Wu", role: "PM", status: "Active" },
    { name: "Dan Lee", role: "DevOps", status: "Offline" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Table */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Table (Striped)</span>
        </div>
        <div className="p-4">
          <Table columns={tableColumns} data={tableData} striped />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-divider)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Stat Cards</span>
        </div>
        <div className="p-3 grid grid-cols-3 gap-3">
          <Stat
            value="1.39K"
            label="New Users"
            trend="up"
            trendValue="147%"
            iconColor="#C0392B"
            iconBg="rgba(192,57,43,0.1)"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            }
          />
          <Stat
            value="4.53%"
            label="Week 1 Retention"
            trend="down"
            trendValue="10.7%"
            iconColor="#2980B9"
            iconBg="rgba(41,128,185,0.1)"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                <path d="M8.5 14.5s1.5 2 3.5 2 3.5-2 3.5-2" />
                <path d="M17 12c-1-4-3.5-4-5-4s-4 0-5 4" />
              </svg>
            }
          />
          <Stat
            value="$12.4k"
            label="Revenue"
            trend="up"
            trendValue="8.3%"
            iconColor="#27AE60"
            iconBg="rgba(39,174,96,0.1)"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            }
          />
        </div>
      </div>

      {/* EmptyState */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Empty State</span>
        </div>
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
          action={
            <button
              onClick={() => setShowEmpty(!showEmpty)}
              className="py-2 px-5 rounded-[var(--glass-radius-pill)] border-none bg-[var(--theme-bg-solid)] text-[var(--theme-fg-on-solid)] text-[13px] font-semibold font-[var(--font-ui)] cursor-pointer"
            >
              Clear Filters
            </button>
          }
        />
      </div>

      {/* ColorSwatch — bento grid */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Color Swatches</span>
        </div>
        <div className="p-3 grid grid-cols-3 gap-2" style={{ gridTemplateRows: "auto auto" }}>
          {/* Row 1: Info (large) + Success */}
          <ColorSwatch color="#5AC8FA" label="Info" variant="card" textColor="dark" className="col-span-2 min-h-[100px]" />
          <ColorSwatch color="#34C759" label="Success" variant="card" />
          {/* Row 2: Warning + Error + Neutral */}
          <ColorSwatch color="#FF9500" label="Warning" variant="card" textColor="dark" />
          <ColorSwatch color="#FF3B30" label="Error" variant="card" />
          <ColorSwatch color="#8E8E93" label="Neutral" variant="card" textColor="dark" />
        </div>
      </div>
    </div>
  );
}
