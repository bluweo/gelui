import { useState } from "react";
import { TabBar, PillTabs, NavItem, Breadcrumb } from "@/primitives/navigation";

/* ═══ Main Export ═══ */
export function PrimitiveNavigation() {
  const [tabBarActive, setTabBarActive] = useState(0);
  const [pillActive, setPillActive] = useState("All");
  const [navActive, setNavActive] = useState("Overview");

  const navItems = [
    {
      label: "Overview",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="m9.02 2.84-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12Z" />
        </svg>
      ),
    },
    {
      label: "Settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1v.09a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06c.5.5 1.21.67 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0c.26.6.79 1.03 1.39 1.08H21a2 2 0 0 1 0 4h-.09" />
        </svg>
      ),
    },
    {
      label: "Team",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4" suppressHydrationWarning>
      {/* Tab Bar */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Tab Bar</span>
        </div>
        <div className="p-4">
          <TabBar
            tabs={["Overview", "Settings", "Activity"]}
            active={tabBarActive}
            onChange={setTabBarActive}
          />
        </div>
      </div>

      {/* Pill Tabs */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Pill Tabs</span>
        </div>
        <div className="p-4">
          <PillTabs
            tabs={["All", "Active", "Archived"]}
            activeTab={pillActive}
            onChange={setPillActive}
          />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Breadcrumb</span>
        </div>
        <div className="p-4">
          <Breadcrumb items={["Home", "Design System", "Primitives"]} />
        </div>
      </div>

      {/* Nav Items */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white dark:bg-[#1a1a1a]">
        <div className="px-4 py-2.5 bg-black/[0.06] dark:bg-white/[0.08] border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/70 dark:text-white/70">Nav Items</span>
        </div>
        <div className="p-4 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={navActive === item.label}
              onClick={() => setNavActive(item.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
