import { useState } from "react";

/* ── Tab Bar ── */
function TabBar({ tabs, defaultTab }: { tabs: string[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab || tabs[0]);
  return (
    <div className="flex border-b border-black/[0.08] dark:border-white/[0.08]">
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
          className={`text-[13px] font-[${active === tab ? "600" : "500"}] px-4 py-2 rounded-full cursor-pointer border-none transition-all duration-200 ${
            active === tab
              ? "bg-white/80 dark:bg-white/10 text-black/80 dark:text-white/80 shadow-sm"
              : "text-black/40 dark:text-white/35 hover:text-black/60 dark:hover:text-white/50 bg-transparent"
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
    <div className="flex flex-col gap-0.5 w-[220px]">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-[var(--glass-radius-sm)] text-[13px] no-underline cursor-pointer border-none text-left transition-all duration-150 ${
            active === item.label
              ? "bg-black/[0.04] dark:bg-white/[0.06] font-[600] text-black/75 dark:text-white/70"
              : "font-[500] text-black/45 dark:text-white/40 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] bg-transparent"
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
    <div className="flex flex-col gap-5">
      {/* Tab Bar */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Tab Bar</span>
        <TabBar tabs={["Overview", "Settings", "Activity"]} />
      </div>

      {/* Pill Tabs */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Pill Tabs</span>
        <PillTabs tabs={["All", "Active", "Archived"]} />
      </div>

      {/* Breadcrumb */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Breadcrumb</span>
        <nav className="flex items-center gap-1.5 text-[13px]">
          <a href="#" className="text-black/40 dark:text-white/35 hover:text-black/60 dark:hover:text-white/50 no-underline transition-colors" onClick={(e) => e.preventDefault()}>Home</a>
          <span className="text-black/20 dark:text-white/15">/</span>
          <a href="#" className="text-black/40 dark:text-white/35 hover:text-black/60 dark:hover:text-white/50 no-underline transition-colors" onClick={(e) => e.preventDefault()}>Design System</a>
          <span className="text-black/20 dark:text-white/15">/</span>
          <span className="text-black/70 dark:text-white/65 font-[550]">Primitives</span>
        </nav>
      </div>

      {/* Nav Items */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Nav Item</span>
        <NavItems />
      </div>
    </div>
  );
}
