import type { ReactNode } from "react";

/* ── Composed components ── */
import { LoginForm } from "./LoginForm";
import { ProfileCard } from "./ProfileCard";
import { PricingCard } from "./PricingCard";
import { StatsRow } from "./StatsRow";
import { DataTable } from "./DataTable";
import { ContactForm } from "./ContactForm";
import { SettingsPanel } from "./SettingsPanel";
import { PageHeader } from "./PageHeader";
import { Navbar } from "./Navbar";

/* ── Raw source (auto-loaded at build time) ── */
import IMPL_LOGIN from "./LoginForm.tsx?raw";
import IMPL_PROFILE from "./ProfileCard.tsx?raw";
import IMPL_PRICING from "./PricingCard.tsx?raw";
import IMPL_STATS from "./StatsRow.tsx?raw";
import IMPL_DATATABLE from "./DataTable.tsx?raw";
import IMPL_CONTACT from "./ContactForm.tsx?raw";
import IMPL_SETTINGS from "./SettingsPanel.tsx?raw";
import IMPL_PAGEHEADER from "./PageHeader.tsx?raw";
import IMPL_NAVBAR from "./Navbar.tsx?raw";

/* ── Skeleton building blocks ── */
function Bar({ w = "100%", h = "10px" }: { w?: string; h?: string }) {
  return <div className="rounded-full bg-[var(--theme-divider)]" style={{ width: w, height: h }} />;
}

/* ── Component map ── */
export interface ComponentMapEntry {
  preview: () => ReactNode;
  skeleton: () => ReactNode;
  implementation: string;
}

const SAMPLE_TABLE_DATA = [
  { name: "Alice Chen", role: "Engineer", status: "Active" },
  { name: "Bob Smith", role: "Designer", status: "Away" },
  { name: "Carol Wu", role: "PM", status: "Active" },
  { name: "Dan Lee", role: "DevOps", status: "Offline" },
];

export const componentMap: Record<string, ComponentMapEntry> = {
  "login-form": {
    preview: () => <LoginForm />,
    skeleton: () => (
      <div className="flex flex-col gap-3 p-4">
        <Bar w="50%" h="14px" /><Bar w="70%" h="8px" />
        <div className="flex flex-col gap-1.5"><Bar w="30%" h="7px" /><Bar h="28px" /></div>
        <div className="flex flex-col gap-1.5"><Bar w="30%" h="7px" /><Bar h="28px" /></div>
        <Bar h="32px" />
        <div className="h-px bg-[var(--theme-divider)] my-1" />
        <Bar h="28px" /><Bar h="28px" />
      </div>
    ),
    implementation: IMPL_LOGIN,
  },
  "profile-card": {
    preview: () => (
      <div className="grid grid-cols-2 gap-3 max-w-[500px] mx-auto max-[540px]:grid-cols-1">
        <ProfileCard name="Alice Chen" role="Engineer" status="active" />
        <ProfileCard name="Bob Smith" role="Designer" status="away" />
      </div>
    ),
    skeleton: () => (
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--theme-divider)]" />
          <div className="flex-1 flex flex-col gap-1.5"><Bar w="60%" h="10px" /><Bar w="40%" h="7px" /></div>
          <Bar w="50px" h="18px" />
        </div>
        <Bar h="28px" />
      </div>
    ),
    implementation: IMPL_PROFILE,
  },
  "pricing-card": {
    preview: () => (
      <div className="grid grid-cols-3 gap-4 max-[860px]:grid-cols-1 max-w-[700px] mx-auto">
        <PricingCard plan="Starter" price="$9" features={["5 projects", "1 member", "2GB storage"]} />
        <PricingCard plan="Pro" price="$29" popular features={["Unlimited projects", "10 members", "20GB"]} />
        <PricingCard plan="Enterprise" price="$99" features={["Unlimited", "SSO", "SLA"]} />
      </div>
    ),
    skeleton: () => (
      <div className="flex gap-3">
        {[false, true, false].map((pop, i) => (
          <div key={i} className={`flex-1 flex flex-col gap-2 p-3 rounded-lg ${pop ? "bg-[var(--theme-fg)] opacity-20" : ""}`}>
            <Bar w="40%" h="7px" /><Bar w="50%" h="18px" /><div className="h-px bg-[var(--theme-divider)]" />
            <Bar w="80%" h="7px" /><Bar w="70%" h="7px" /><Bar w="60%" h="7px" /><Bar h="28px" />
          </div>
        ))}
      </div>
    ),
    implementation: IMPL_PRICING,
  },
  "stats-row": {
    preview: () => (
      <StatsRow stats={[
        { value: "1,234", label: "Users", trend: "up" as const, trendValue: "+12%" },
        { value: "98.5%", label: "Uptime", trend: "neutral" as const, trendValue: "0.0%" },
        { value: "$12.4k", label: "Revenue", trend: "up" as const, trendValue: "+8.3%" },
      ]} cols={3} />
    ),
    skeleton: () => (
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 flex flex-col gap-2 p-3 rounded-lg border border-[var(--theme-divider)]">
            <Bar w="30%" h="7px" /><Bar w="60%" h="18px" /><Bar w="40%" h="7px" />
          </div>
        ))}
      </div>
    ),
    implementation: IMPL_STATS,
  },
  "data-table": {
    preview: () => (
      <DataTable
        title="Team Members"
        columns={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "status", label: "Status" }]}
        data={SAMPLE_TABLE_DATA}
        pageSize={3}
      />
    ),
    skeleton: () => (
      <div className="flex flex-col gap-2 p-3">
        <div className="flex justify-between"><Bar w="30%" h="12px" /><Bar w="35%" h="24px" /></div>
        <div className="flex gap-2 py-1">{["30%", "20%", "20%"].map((w, i) => <Bar key={i} w={w} h="8px" />)}</div>
        {[1, 2, 3].map((i) => <div key={i} className="flex gap-2 py-1.5 border-t border-[var(--theme-divider)]"><Bar w="30%" h="8px" /><Bar w="20%" h="8px" /><Bar w="20%" h="8px" /></div>)}
      </div>
    ),
    implementation: IMPL_DATATABLE,
  },
  "contact-form": {
    preview: () => <ContactForm />,
    skeleton: () => (
      <div className="flex flex-col gap-3 p-4">
        <Bar w="40%" h="14px" /><Bar w="60%" h="8px" />
        <div className="flex gap-3"><div className="flex-1 flex flex-col gap-1.5"><Bar w="30%" h="7px" /><Bar h="28px" /></div><div className="flex-1 flex flex-col gap-1.5"><Bar w="30%" h="7px" /><Bar h="28px" /></div></div>
        <div className="flex flex-col gap-1.5"><Bar w="25%" h="7px" /><Bar h="28px" /></div>
        <div className="flex flex-col gap-1.5"><Bar w="25%" h="7px" /><Bar h="60px" /></div>
        <div className="flex justify-end gap-2"><Bar w="70px" h="28px" /><Bar w="90px" h="28px" /></div>
      </div>
    ),
    implementation: IMPL_CONTACT,
  },
  "settings-panel": {
    preview: () => <SettingsPanel />,
    skeleton: () => (
      <div className="flex flex-col gap-2 p-3">
        <Bar w="30%" h="12px" />
        <div className="flex gap-2"><Bar w="60px" h="24px" /><Bar w="60px" h="24px" /><Bar w="60px" h="24px" /></div>
        {[1, 2, 3].map((i) => <div key={i} className="flex justify-between py-2 border-t border-[var(--theme-divider)]"><Bar w="40%" h="8px" /><Bar w="36px" h="20px" /></div>)}
      </div>
    ),
    implementation: IMPL_SETTINGS,
  },
  "navbar": {
    preview: () => (
      <Navbar brand="Acme Inc" links={[{ label: "Dashboard", active: true }, { label: "Projects" }, { label: "Team" }]} userName="Alice" notificationCount={3} />
    ),
    skeleton: () => (
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4"><Bar w="60px" h="14px" /><Bar w="40px" h="8px" /><Bar w="40px" h="8px" /></div>
        <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-[var(--theme-divider)]" /><Bar w="50px" h="8px" /></div>
      </div>
    ),
    implementation: IMPL_NAVBAR,
  },
  "page-header": {
    preview: () => (
      <PageHeader overline="Administration" title="Team Members" description="Manage your team" breadcrumbs={["Home", "Settings", "Team"]} actionLabel="Add Member" />
    ),
    skeleton: () => (
      <div className="flex flex-col gap-2 p-3">
        <div className="flex gap-1"><Bar w="30px" h="7px" /><Bar w="5px" h="7px" /><Bar w="40px" h="7px" /></div>
        <Bar w="25%" h="7px" /><Bar w="50%" h="18px" /><Bar w="60%" h="8px" />
      </div>
    ),
    implementation: IMPL_PAGEHEADER,
  },
};
