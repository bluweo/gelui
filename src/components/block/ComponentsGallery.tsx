import { useState, useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* ── Registry data (loaded at build time) ── */
import registryData from "@/registry/registry.json";

/* ── Composed components for live preview ── */
import { LoginForm } from "@/components/composed/LoginForm";
import { ProfileCard } from "@/components/composed/ProfileCard";
import { PricingCard } from "@/components/composed/PricingCard";
import { StatsRow } from "@/components/composed/StatsRow";
import { DataTable } from "@/components/composed/DataTable";
import { ContactForm } from "@/components/composed/ContactForm";
import { SettingsPanel } from "@/components/composed/SettingsPanel";
import { PageHeader } from "@/components/composed/PageHeader";
import { Navbar } from "@/components/composed/Navbar";

/* ── Source modals ── */
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
import IMPL_LOGIN from "@/components/composed/LoginForm.tsx?raw";
import IMPL_PROFILE from "@/components/composed/ProfileCard.tsx?raw";
import IMPL_PRICING from "@/components/composed/PricingCard.tsx?raw";
import IMPL_STATS from "@/components/composed/StatsRow.tsx?raw";
import IMPL_DATATABLE from "@/components/composed/DataTable.tsx?raw";
import IMPL_CONTACT from "@/components/composed/ContactForm.tsx?raw";
import IMPL_SETTINGS from "@/components/composed/SettingsPanel.tsx?raw";
import IMPL_PAGEHEADER from "@/components/composed/PageHeader.tsx?raw";
import IMPL_NAVBAR from "@/components/composed/Navbar.tsx?raw";

/* ─────────────────────────────────────────────── */
/* Component definitions                           */
/* ─────────────────────────────────────────────── */

interface CompDef {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: () => ReactNode;
  skeleton: () => ReactNode;
  implementation: string;
  importPath: string;
  exportName: string;
  usedPrimitives: string[];
  useWhen: string[];
  avoidWhen: string[];
  examples: { title: string; jsx: string }[];
  props: { name: string; type: string; default?: string }[];
}

const SAMPLE_TABLE_DATA = [
  { name: "Alice Chen", role: "Engineer", status: "Active" },
  { name: "Bob Smith", role: "Designer", status: "Away" },
  { name: "Carol Wu", role: "PM", status: "Active" },
  { name: "Dan Lee", role: "DevOps", status: "Offline" },
];

const COMPONENTS: CompDef[] = [
  {
    id: "login-form", name: "LoginForm", description: "Email + password login with social options",
    category: "Auth", implementation: IMPL_LOGIN,
    importPath: "@/components/composed", exportName: "LoginForm",
    usedPrimitives: ["Card", "Input", "PasswordInput", "FormGroup", "Checkbox", "Button", "LinkButton", "Divider", "Stack"],
    useWhen: ["login page", "authentication", "sign in form"],
    avoidWhen: ["signup", "profile editing"],
    examples: [{ title: "Login", jsx: '<LoginForm onSubmit={handleLogin} showSocial />' }],
    props: [{ name: "onSubmit", type: "(data) => void" }, { name: "showSocial", type: "boolean", default: "true" }],
    preview: () => <LoginForm />,
    skeleton: () => <SkeletonForm rows={3} hasTitle hasSocial />,
  },
  {
    id: "profile-card", name: "ProfileCard", description: "User card with avatar, status, and edit",
    category: "Auth", implementation: IMPL_PROFILE,
    importPath: "@/components/composed", exportName: "ProfileCard",
    usedPrimitives: ["Avatar", "Badge", "Heading", "Caption", "Button", "Stack", "Inline"],
    useWhen: ["user cards", "team display", "profile preview"],
    avoidWhen: ["user tables", "single avatar"],
    examples: [{ title: "Profile", jsx: '<ProfileCard name="Alice" role="Engineer" status="active" />' }],
    props: [{ name: "name", type: "string" }, { name: "role", type: "string" }, { name: "status", type: "enum", default: "active" }],
    preview: () => (
      <div className="grid grid-cols-2 gap-3 max-w-[500px] mx-auto max-[540px]:grid-cols-1">
        <ProfileCard name="Alice Chen" role="Engineer" status="active" />
        <ProfileCard name="Bob Smith" role="Designer" status="away" />
      </div>
    ),
    skeleton: () => <SkeletonCard hasAvatar />,
  },
  {
    id: "pricing-card", name: "PricingCard", description: "Plan with price, features, and CTA",
    category: "Cards", implementation: IMPL_PRICING,
    importPath: "@/components/composed", exportName: "PricingCard",
    usedPrimitives: ["Card", "Overline", "Heading", "Caption", "Text", "Badge", "Button", "Divider", "Stack"],
    useWhen: ["pricing pages", "plan comparison", "subscription tiers"],
    avoidWhen: ["product cards", "feature cards"],
    examples: [{ title: "Pricing", jsx: '<PricingCard plan="Pro" price="$29" popular features={["Unlimited"]} />' }],
    props: [{ name: "plan", type: "string" }, { name: "price", type: "string" }, { name: "popular", type: "boolean", default: "false" }, { name: "features", type: "string[]" }],
    preview: () => (
      <div className="grid grid-cols-3 gap-4 max-[860px]:grid-cols-1 max-w-[700px] mx-auto">
        <PricingCard plan="Starter" price="$9" features={["5 projects", "1 member", "2GB storage"]} />
        <PricingCard plan="Pro" price="$29" popular features={["Unlimited projects", "10 members", "20GB"]} />
        <PricingCard plan="Enterprise" price="$99" features={["Unlimited", "SSO", "SLA"]} />
      </div>
    ),
    skeleton: () => <SkeletonPricing />,
  },
  {
    id: "stats-row", name: "StatsRow", description: "Responsive KPI metric cards",
    category: "Data", implementation: IMPL_STATS,
    importPath: "@/components/composed", exportName: "StatsRow",
    usedPrimitives: ["Grid", "Stat"],
    useWhen: ["dashboard KPIs", "metrics overview"],
    avoidWhen: ["single stat", "detailed analytics"],
    examples: [{ title: "Stats", jsx: '<StatsRow stats={[{value:"1,234",label:"Users",trend:"up"}]} />' }],
    props: [{ name: "stats", type: "StatItem[]" }, { name: "cols", type: "number" }],
    preview: () => (
      <StatsRow stats={[
        { value: "1,234", label: "Users", trend: "up", trendValue: "+12%" },
        { value: "98.5%", label: "Uptime", trend: "neutral", trendValue: "0.0%" },
        { value: "$12.4k", label: "Revenue", trend: "up", trendValue: "+8.3%" },
      ]} cols={3} />
    ),
    skeleton: () => <SkeletonStats />,
  },
  {
    id: "data-table", name: "DataTable", description: "Searchable, paginated data table",
    category: "Data", implementation: IMPL_DATATABLE,
    importPath: "@/components/composed", exportName: "DataTable",
    usedPrimitives: ["Table", "SearchInput", "Pagination", "Badge", "Heading", "Button", "Stack", "Inline"],
    useWhen: ["data management", "user lists", "admin tables"],
    avoidWhen: ["simple lists", "card grids"],
    examples: [{ title: "Table", jsx: '<DataTable title="Users" columns={cols} data={users} />' }],
    props: [{ name: "title", type: "string" }, { name: "columns", type: "Column[]" }, { name: "data", type: "Record[]" }, { name: "pageSize", type: "number", default: "5" }],
    preview: () => (
      <DataTable
        title="Team Members"
        columns={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "status", label: "Status" }]}
        data={SAMPLE_TABLE_DATA}
        pageSize={3}
      />
    ),
    skeleton: () => <SkeletonTable />,
  },
  {
    id: "contact-form", name: "ContactForm", description: "Name, email, subject, and message form",
    category: "Forms", implementation: IMPL_CONTACT,
    importPath: "@/components/composed", exportName: "ContactForm",
    usedPrimitives: ["Heading", "Text", "Input", "Textarea", "Select", "FormGroup", "Button", "Stack", "Inline"],
    useWhen: ["contact pages", "feedback forms", "inquiry forms"],
    avoidWhen: ["login forms", "settings"],
    examples: [{ title: "Contact", jsx: '<ContactForm onSubmit={handleSubmit} />' }],
    props: [{ name: "onSubmit", type: "(data) => void" }, { name: "subjects", type: "string[]" }],
    preview: () => <ContactForm />,
    skeleton: () => <SkeletonForm rows={4} hasTitle />,
  },
  {
    id: "settings-panel", name: "SettingsPanel", description: "Tabbed settings with toggles",
    category: "Forms", implementation: IMPL_SETTINGS,
    importPath: "@/components/composed", exportName: "SettingsPanel",
    usedPrimitives: ["Heading", "Text", "TabBar", "Toggle", "Select", "Input", "FormGroup", "Divider", "Button", "Stack", "Inline"],
    useWhen: ["settings pages", "preferences panel"],
    avoidWhen: ["simple forms", "profile editing"],
    examples: [{ title: "Settings", jsx: "<SettingsPanel />" }],
    props: [{ name: "className", type: "string" }],
    preview: () => <SettingsPanel />,
    skeleton: () => <SkeletonSettings />,
  },
  {
    id: "navbar", name: "Navbar", description: "Top nav with brand, links, and user",
    category: "Navigation", implementation: IMPL_NAVBAR,
    importPath: "@/components/composed", exportName: "Navbar",
    usedPrimitives: ["Heading", "Avatar", "Badge", "NotificationBadge", "Button", "IconButton", "LinkButton", "Inline"],
    useWhen: ["top navigation", "app header"],
    avoidWhen: ["sidebar navigation", "footer"],
    examples: [{ title: "Navbar", jsx: '<Navbar brand="Acme" links={[{label:"Home",active:true}]} userName="Alice" />' }],
    props: [{ name: "brand", type: "string", default: "GelUI" }, { name: "links", type: "NavLink[]" }, { name: "userName", type: "string" }],
    preview: () => (
      <Navbar brand="Acme Inc" links={[{ label: "Dashboard", active: true }, { label: "Projects" }, { label: "Team" }]} userName="Alice" notificationCount={3} />
    ),
    skeleton: () => <SkeletonNavbar />,
  },
  {
    id: "page-header", name: "PageHeader", description: "Page title with breadcrumbs and action",
    category: "Navigation", implementation: IMPL_PAGEHEADER,
    importPath: "@/components/composed", exportName: "PageHeader",
    usedPrimitives: ["Heading", "Text", "Overline", "Breadcrumb", "Button", "Stack", "Inline"],
    useWhen: ["page top section", "admin page titles"],
    avoidWhen: ["hero sections", "navigation bars"],
    examples: [{ title: "Header", jsx: '<PageHeader title="Users" breadcrumbs={["Home","Users"]} actionLabel="Add" />' }],
    props: [{ name: "title", type: "string" }, { name: "overline", type: "string" }, { name: "breadcrumbs", type: "string[]" }, { name: "actionLabel", type: "string" }],
    preview: () => (
      <PageHeader overline="Administration" title="Team Members" description="Manage your team" breadcrumbs={["Home", "Settings", "Team"]} actionLabel="Add Member" />
    ),
    skeleton: () => <SkeletonPageHeader />,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(COMPONENTS.map((c) => c.category)))];

/* ─────────────────────────────────────────────── */
/* Skeleton thumbnails                             */
/* ─────────────────────────────────────────────── */

function SkeletonBar({ w = "100%", h = "10px" }: { w?: string; h?: string }) {
  return <div className="rounded-full bg-[var(--theme-divider)]" style={{ width: w, height: h }} />;
}

function SkeletonForm({ rows, hasTitle, hasSocial }: { rows: number; hasTitle?: boolean; hasSocial?: boolean }) {
  return (
    <div className="flex flex-col gap-3 p-4">
      {hasTitle && <><SkeletonBar w="50%" h="14px" /><SkeletonBar w="70%" h="8px" /></>}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5"><SkeletonBar w="30%" h="7px" /><SkeletonBar h="28px" /></div>
      ))}
      <SkeletonBar h="32px" />
      {hasSocial && <><div className="h-px bg-[var(--theme-divider)] my-1" /><SkeletonBar h="28px" /><SkeletonBar h="28px" /></>}
    </div>
  );
}

function SkeletonCard({ hasAvatar }: { hasAvatar?: boolean }) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        {hasAvatar && <div className="w-10 h-10 rounded-full bg-[var(--theme-divider)]" />}
        <div className="flex-1 flex flex-col gap-1.5"><SkeletonBar w="60%" h="10px" /><SkeletonBar w="40%" h="7px" /></div>
        <SkeletonBar w="50px" h="18px" />
      </div>
      <SkeletonBar h="28px" />
    </div>
  );
}

function SkeletonPricing() {
  return (
    <div className="flex gap-3">
      {[false, true, false].map((pop, i) => (
        <div key={i} className={`flex-1 flex flex-col gap-2 p-3 rounded-lg ${pop ? "bg-[var(--theme-fg)] opacity-20" : ""}`}>
          <SkeletonBar w="40%" h="7px" /><SkeletonBar w="50%" h="18px" /><div className="h-px bg-[var(--theme-divider)]" />
          <SkeletonBar w="80%" h="7px" /><SkeletonBar w="70%" h="7px" /><SkeletonBar w="60%" h="7px" /><SkeletonBar h="28px" />
        </div>
      ))}
    </div>
  );
}

function SkeletonStats() {
  return (
    <div className="flex gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-1 flex flex-col gap-2 p-3 rounded-lg border border-[var(--theme-divider)]">
          <SkeletonBar w="30%" h="7px" /><SkeletonBar w="60%" h="18px" /><SkeletonBar w="40%" h="7px" />
        </div>
      ))}
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="flex justify-between"><SkeletonBar w="30%" h="12px" /><SkeletonBar w="35%" h="24px" /></div>
      <div className="flex gap-2 py-1">{["30%", "20%", "20%"].map((w, i) => <SkeletonBar key={i} w={w} h="8px" />)}</div>
      {[1, 2, 3].map((i) => <div key={i} className="flex gap-2 py-1.5 border-t border-[var(--theme-divider)]"><SkeletonBar w="30%" h="8px" /><SkeletonBar w="20%" h="8px" /><SkeletonBar w="20%" h="8px" /></div>)}
    </div>
  );
}

function SkeletonSettings() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <SkeletonBar w="30%" h="12px" />
      <div className="flex gap-2"><SkeletonBar w="60px" h="24px" /><SkeletonBar w="60px" h="24px" /><SkeletonBar w="60px" h="24px" /></div>
      {[1, 2, 3].map((i) => <div key={i} className="flex justify-between py-2 border-t border-[var(--theme-divider)]"><SkeletonBar w="40%" h="8px" /><SkeletonBar w="36px" h="20px" /></div>)}
    </div>
  );
}

function SkeletonNavbar() {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-4"><SkeletonBar w="60px" h="14px" /><SkeletonBar w="40px" h="8px" /><SkeletonBar w="40px" h="8px" /></div>
      <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-[var(--theme-divider)]" /><SkeletonBar w="50px" h="8px" /></div>
    </div>
  );
}

function SkeletonPageHeader() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="flex gap-1"><SkeletonBar w="30px" h="7px" /><SkeletonBar w="5px" h="7px" /><SkeletonBar w="40px" h="7px" /></div>
      <SkeletonBar w="25%" h="7px" /><SkeletonBar w="50%" h="18px" /><SkeletonBar w="60%" h="8px" />
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Component Card                                  */
/* ─────────────────────────────────────────────── */

function ComponentCard({ comp, onClick }: { comp: CompDef; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-[var(--glass-radius)] bg-[var(--theme-card-bg)] border border-[var(--theme-divider)] overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[var(--theme-fg-subtle)] cursor-pointer"
    >
      {/* Skeleton thumbnail */}
      <div className="p-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)] min-h-[120px] flex items-center justify-center">
        <div className="w-full max-w-[280px] opacity-50">
          {comp.skeleton()}
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[14px] font-[600] text-[var(--theme-fg)]" style={{ fontFamily: "var(--font-heading)" }}>
            {comp.name}
          </span>
          <span className="text-[10px] font-[500] uppercase tracking-[0.04em] px-1.5 py-0.5 rounded-full bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)]">
            {comp.category}
          </span>
        </div>
        <p className="text-[12px] text-[var(--theme-fg-muted)] leading-[1.4]" style={{ fontFamily: "var(--font-body)" }}>
          {comp.description}
        </p>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────── */
/* Detail Modal                                    */
/* ─────────────────────────────────────────────── */

function DetailModal({ comp, onClose }: { comp: CompDef; onClose: () => void }) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Push URL
  useEffect(() => {
    const slug = `/design-system/components/${comp.id}`;
    window.history.pushState({}, "", slug);
    return () => { window.history.pushState({}, "", "/design-system/components"); };
  }, [comp.id]);

  const viewportWidth = viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "100%";

  const sourceComponents = [{
    name: comp.name,
    path: comp.importPath,
    description: comp.description,
    implementation: comp.implementation,
    props: comp.props.map(p => ({ name: p.name, type: p.type, default: p.default })),
  }];

  const sourceCode = `import { ${comp.exportName} } from "${comp.importPath}";\n\n${comp.examples.map(e => e.jsx).join("\n")}`;

  return createPortal(
    <div className="fixed inset-0 z-[500] flex items-start justify-center overflow-y-auto" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[1000px] my-8 mx-4 rounded-[var(--glass-radius)] bg-[var(--theme-card-bg)] border border-[var(--theme-divider)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--theme-divider)]">
          <div>
            <h2 className="text-[20px] font-[700] text-[var(--theme-fg)]" style={{ fontFamily: "var(--font-heading)" }}>
              {comp.name}
            </h2>
            <p className="text-[13px] text-[var(--theme-fg-muted)]" style={{ fontFamily: "var(--font-body)" }}>
              {comp.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Viewport toggles */}
            {(["mobile", "tablet", "desktop"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                className={`w-8 h-8 rounded-[var(--glass-radius-sm)] flex items-center justify-center transition-colors ${
                  viewport === v ? "bg-[var(--theme-fg)] text-[var(--theme-bg-solid)]" : "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)]"
                }`}
                title={v}
              >
                {v === "mobile" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>}
                {v === "tablet" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>}
                {v === "desktop" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
              </button>
            ))}

            {/* Code button */}
            <button
              onClick={() => setShowSource(true)}
              className="w-8 h-8 rounded-[var(--glass-radius-sm)] flex items-center justify-center bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)] transition-colors"
              title="View Source"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-[var(--glass-radius-sm)] flex items-center justify-center bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)] transition-colors ml-2"
              title="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="p-6 bg-[var(--theme-header-bg)] min-h-[300px] flex items-center justify-center">
          <div className="transition-all duration-300 w-full overflow-x-auto" style={{ maxWidth: viewportWidth }}>
            <div className="bg-[var(--theme-card-bg)] rounded-[var(--glass-radius-sm)] p-6 border border-[var(--theme-divider)]">
              {comp.preview()}
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="px-6 py-5 border-t border-[var(--theme-divider)]">
          <div className="grid grid-cols-2 gap-6 max-[540px]:grid-cols-1">
            {/* Left: meta + import */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Component Info</span>
                <div className="flex flex-col gap-1.5 text-[12px]" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">ID</span><span className="text-[var(--theme-fg)] font-[550]">{comp.id}</span></div>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">Layer</span><span className="text-[var(--theme-fg)]">Component</span></div>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">Category</span><span className="text-[var(--theme-fg)]">{comp.category}</span></div>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">Status</span><span className="text-green-600 font-[550]">Stable</span></div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Import</span>
                <pre className="text-[11px] p-3 rounded-[var(--glass-radius-sm)] bg-[#1e1e1e] text-[#d4d4d4] overflow-x-auto" style={{ fontFamily: "var(--font-mono)" }}>
                  {`import { ${comp.exportName} } from "${comp.importPath}";`}
                </pre>
              </div>

              {comp.examples.length > 0 && (
                <div>
                  <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Usage</span>
                  <pre className="text-[11px] p-3 rounded-[var(--glass-radius-sm)] bg-[#1e1e1e] text-[#d4d4d4] overflow-x-auto" style={{ fontFamily: "var(--font-mono)" }}>
                    {comp.examples[0].jsx}
                  </pre>
                </div>
              )}
            </div>

            {/* Right: primitives + AI hints */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Based on Primitives</span>
                <div className="flex flex-wrap gap-1.5">
                  {comp.usedPrimitives.map((p) => (
                    <span key={p} className="text-[11px] font-[500] px-2 py-0.5 rounded-full bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] border border-[var(--theme-divider)]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-green-600 mb-2 block">Use When</span>
                <ul className="flex flex-col gap-1">
                  {comp.useWhen.map((u, i) => (
                    <li key={i} className="text-[12px] text-[var(--theme-fg-muted)] flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="w-1 h-1 rounded-full bg-green-500 shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>

              {comp.avoidWhen.length > 0 && (
                <div>
                  <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-red-500 mb-2 block">Avoid When</span>
                  <ul className="flex flex-col gap-1">
                    {comp.avoidWhen.map((a, i) => (
                      <li key={i} className="text-[12px] text-[var(--theme-fg-muted)] flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ViewSourceModal */}
      {showSource && (
        <ViewSourceModal
          open={showSource}
          onClose={() => setShowSource(false)}
          title={comp.name}
          code={sourceCode}
          components={sourceComponents}
        />
      )}
    </div>,
    document.body
  );
}

/* ─────────────────────────────────────────────── */
/* Gallery                                         */
/* ─────────────────────────────────────────────── */

export function ComponentsGallery() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<CompDef | null>(null);

  // Handle direct URL navigation
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/design-system\/components\/(.+)/);
    if (match) {
      const comp = COMPONENTS.find((c) => c.id === match[1]);
      if (comp) setSelected(comp);
    }
  }, []);

  // Handle popstate (back button)
  useEffect(() => {
    const handler = () => {
      const path = window.location.pathname;
      if (path === "/design-system/components" || path === "/design-system/components/") {
        setSelected(null);
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const filtered = category === "All" ? COMPONENTS : COMPONENTS.filter((c) => c.category === category);

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? COMPONENTS.length : COMPONENTS.filter((c) => c.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex gap-6 max-[860px]:flex-col">
      {/* Category sidebar */}
      <nav className="w-[180px] shrink-0 max-[860px]:w-full">
        <h3 className="text-[12px] font-[650] uppercase tracking-[0.06em] contrast-text mb-3" style={{ fontFamily: "var(--font-ui)" }}>
          Categories
        </h3>
        <div className="flex flex-col gap-0.5 max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center justify-between px-3 py-2 rounded-[var(--glass-radius-sm)] text-left text-[13px] transition-colors max-[860px]:px-3 max-[860px]:py-1.5 ${
                category === cat
                  ? "bg-[var(--theme-fg)] text-[var(--theme-bg-solid)] font-[600]"
                  : "text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)] hover:bg-[var(--theme-header-bg)]"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>{cat}</span>
              <span className={`text-[11px] ${category === cat ? "opacity-70" : "opacity-40"}`}>
                {categoryCounts[cat]}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Cards grid */}
      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-3 gap-4 max-[1100px]:grid-cols-2 max-[540px]:grid-cols-1">
          {filtered.map((comp) => (
            <ComponentCard key={comp.id} comp={comp} onClick={() => setSelected(comp)} />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selected && <DetailModal comp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
