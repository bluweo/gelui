import { useState } from "react";

/* ── Tab Bar ── */
function TabBar({ tabs, defaultTab }: { tabs: string[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab || tabs[0]);
  return (
    <div className="flex border-b border-black/10 dark:border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2.5 text-[13px] bg-transparent cursor-pointer -mb-px border-b-2 transition-all duration-200 ${
            active === tab
              ? "font-[600] border-[#354334] dark:border-[#97AD96] text-[#354334] dark:text-[#97AD96]"
              : "font-[500] border-transparent text-black/40 dark:text-white/35 hover:text-black/60 dark:hover:text-white/50"
          }`}
          style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* ── Pill Tabs ── */
function PillTabs({ tabs, defaultTab }: { tabs: string[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab || tabs[0]);
  return (
    <div className="inline-flex rounded-full p-1 gap-0.5" style={{ background: "rgba(0,0,0,0.04)" }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`text-[13px] px-4 py-2 rounded-full cursor-pointer border-none transition-all duration-200 ${
            active === tab
              ? "font-[600] bg-white/80 dark:bg-white/10 text-black/80 dark:text-white/80 shadow-sm"
              : "font-[500] text-black/40 dark:text-white/35 hover:text-black/60 dark:hover:text-white/50 bg-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* ── Nav Items ── */
function NavItems() {
  const [active, setActive] = useState("Overview");
  const items = [
    { label: "Overview", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m9.02 2.84-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12Z" /></svg> },
    { label: "Settings", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1v.09a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06c.5.5 1.21.67 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0c.26.6.79 1.03 1.39 1.08H21a2 2 0 0 1 0 4h-.09" /></svg> },
    { label: "Team", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
  ];

  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--glass-radius-sm)] text-[13px] no-underline cursor-pointer border-none text-left transition-all duration-150 w-full ${
            active === item.label
              ? "bg-black/[0.06] dark:bg-white/[0.08] font-[600] text-black/75 dark:text-white/70"
              : "font-[500] text-black/45 dark:text-white/40 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] bg-transparent"
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* ═══ Main Export ═══ */
export function PrimitiveNavigation() {
  return (
    <div className="flex flex-col gap-4">
      {/* Tab Bar */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Tab Bar</span>
        </div>
        <div className="p-4">
          <TabBar tabs={["Overview", "Settings", "Activity"]} />
        </div>
      </div>

      {/* Pill Tabs */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Pill Tabs</span>
        </div>
        <div className="p-4">
          <PillTabs tabs={["All", "Active", "Archived"]} />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Breadcrumb</span>
        </div>
        <div className="p-4">
          <nav className="flex items-center gap-1.5 text-[13px]">
            <a href="#" className="text-black/45 dark:text-white/40 hover:text-black/65 dark:hover:text-white/55 no-underline transition-colors" onClick={(e) => e.preventDefault()}>Home</a>
            <span className="text-black/20 dark:text-white/15">/</span>
            <a href="#" className="text-black/45 dark:text-white/40 hover:text-black/65 dark:hover:text-white/55 no-underline transition-colors" onClick={(e) => e.preventDefault()}>Design System</a>
            <span className="text-black/20 dark:text-white/15">/</span>
            <span className="text-black/75 dark:text-white/70 font-[600]">Primitives</span>
          </nav>
        </div>
      </div>

      {/* Nav Items */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Nav Items</span>
        </div>
        <div className="p-4">
          <NavItems />
        </div>
      </div>
    </div>
  );
}
