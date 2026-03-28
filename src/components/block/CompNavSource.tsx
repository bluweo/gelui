import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
import IMPL_NAVBAR from "@/components/composed/Navbar.tsx?raw";
import IMPL_PAGEHEADER from "@/components/composed/PageHeader.tsx?raw";

const SOURCE_CODE = `import { Navbar, PageHeader } from "@/components/composed";

{/* Navbar */}
<Navbar
  brand="Acme Inc"
  links={[
    { label: "Dashboard", active: true },
    { label: "Projects" },
    { label: "Team" },
  ]}
  userName="Alice Chen"
  notificationCount={3}
/>

{/* Page Header with breadcrumbs */}
<PageHeader
  overline="Administration"
  title="Team Members"
  description="Manage your team"
  breadcrumbs={["Home", "Settings", "Team"]}
  actionLabel="Add Member"
/>

{/* Minimal Page Header */}
<PageHeader title="Dashboard" description="Overview" />`;

const COMPONENTS = [
  {
    name: "Navbar",
    path: "@/components/composed",
    description: "Top navigation bar with brand, links, notification badge, and user avatar",
    implementation: IMPL_NAVBAR,
    props: [
      { name: "brand", type: "string", default: '"GelUI"' },
      { name: "links", type: "NavLink[]" },
      { name: "userName", type: "string" },
      { name: "userAvatar", type: "string" },
      { name: "showNotifications", type: "boolean", default: "true" },
      { name: "notificationCount", type: "number", default: "0" },
      { name: "onLogin", type: "() => void" },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "PageHeader",
    path: "@/components/composed",
    description: "Page title with optional overline, description, breadcrumbs, and action button",
    implementation: IMPL_PAGEHEADER,
    props: [
      { name: "title", type: "string", options: ["required"] },
      { name: "overline", type: "string" },
      { name: "description", type: "string" },
      { name: "breadcrumbs", type: "string[]" },
      { name: "actionLabel", type: "string" },
      { name: "action", type: "ReactNode" },
      { name: "onAction", type: "() => void" },
      { name: "className", type: "string" },
    ],
  },
];

export function CompNavSource() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="comp-nav"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);
  return <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Navigation & Layout" code={SOURCE_CODE} components={COMPONENTS} />;
}
