import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

import IMPL_TABBAR from "@/primitives/navigation/TabBar.tsx?raw";
import IMPL_PILLTABS from "@/primitives/navigation/PillTabs.tsx?raw";
import IMPL_NAVITEM from "@/primitives/navigation/NavItem.tsx?raw";
import IMPL_BREADCRUMB from "@/primitives/navigation/Breadcrumb.tsx?raw";

const SOURCE_CODE = `import { TabBar, PillTabs, NavItem, Breadcrumb } from "@/primitives/navigation";

{/* Tab Bar — underline style */}
<TabBar
  tabs={["Overview", "Settings", "Activity"]}
  active={activeIndex}
  onChange={setActiveIndex}
/>

{/* Pill Tabs — pill style selector */}
<PillTabs
  tabs={["All", "Active", "Archived"]}
  activeTab={selected}
  onChange={setSelected}
/>

{/* Breadcrumb — path navigation */}
<Breadcrumb items={["Home", "Design System", "Primitives"]} />

{/* Nav Item — sidebar navigation with icons */}
<NavItem
  icon={<HomeIcon />}
  label="Overview"
  active={true}
  onClick={() => setActive("Overview")}
/>
<NavItem icon={<SettingsIcon />} label="Settings" onClick={() => setActive("Settings")} />
<NavItem icon={<TeamIcon />} label="Team" onClick={() => setActive("Team")} />`;

const COMPONENTS = [
  {
    name: "TabBar",
    path: "@/primitives/navigation",
    description: "Underline-style tab navigation with active indicator and hover transitions",
    implementation: IMPL_TABBAR,
    props: [
      { name: "tabs", type: "string[]", default: '["Tab 1", "Tab 2", "Tab 3"]' },
      { name: "active", type: "number", default: "0" },
      { name: "onChange", type: "(i: number) => void" },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "PillTabs",
    path: "@/primitives/navigation",
    description: "Pill-style tab selector with active highlight and hover transitions",
    implementation: IMPL_PILLTABS,
    props: [
      { name: "tabs", type: "string[]" },
      { name: "activeTab", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Breadcrumb",
    path: "@/primitives/navigation",
    description: "Path breadcrumb trail with hover underline on clickable items",
    implementation: IMPL_BREADCRUMB,
    props: [
      { name: "items", type: "string[]", default: '["Home", "Page"]' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "NavItem",
    path: "@/primitives/navigation",
    description: "Sidebar navigation item with icon, label, and active state",
    implementation: IMPL_NAVITEM,
    props: [
      { name: "icon", type: "ReactNode" },
      { name: "label", type: "string" },
      { name: "active", type: "boolean", default: "false" },
      { name: "onClick", type: "() => void" },
      { name: "className", type: "string" },
    ],
  },
];

export function NavigationSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="navigation"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Navigation" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
