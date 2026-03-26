import { useState, useEffect, useMemo } from "react";
import type { ComponentRegistryEntry, Layer, Status, Category } from "@/registry/types";
import * as Primitives from "@/primitives";

/* ═══════════════════════════════════════════════
   RegistryViewer — Interactive component registry table
   React island with search, filter, and expandable rows.
   ═══════════════════════════════════════════════ */

interface Props {
  components: ComponentRegistryEntry[];
}

/* ── Constants ── */

const LAYER_COLORS: Record<Layer, string> = {
  core: "#6B7280",
  token: "#FFC800",
  primitive: "#354334",
  component: "#4A5E48",
  pattern: "#7B9779",
  layout: "#97AD96",
};

const LAYER_LABELS: Record<Layer, string> = {
  core: "Core",
  token: "Token",
  primitive: "Primitive",
  component: "Component",
  pattern: "Pattern",
  layout: "Layout",
};

const STATUS_ICONS: Record<Status, string> = {
  stable: "\u2705",
  beta: "\u26A0\uFE0F",
  experimental: "\uD83D\uDD2C",
  planned: "\uD83D\uDCCB",
  deprecated: "\u274C",
};

const STATUS_LABELS: Record<Status, string> = {
  stable: "Stable",
  beta: "Beta",
  experimental: "Experimental",
  planned: "Planned",
  deprecated: "Deprecated",
};

const ALL_LAYERS: Layer[] = ["core", "token", "primitive", "component", "pattern", "layout"];
const ALL_STATUSES: Status[] = ["stable", "beta", "experimental", "planned", "deprecated"];

const CATEGORY_LABELS: Record<Category, string> = {
  typography: "Typography",
  interactive: "Interactive",
  surface: "Surface",
  form: "Form",
  feedback: "Feedback",
  navigation: "Navigation",
  layout: "Layout",
  data: "Data",
  overlay: "Overlay",
  media: "Media",
  color: "Color",
  spacing: "Spacing",
  motion: "Motion",
  glass: "Glass",
};

/* ── Helpers ── */

function getLayerTextColor(layer: Layer): string {
  if (layer === "token") return "#000";
  if (layer === "layout" || layer === "pattern") return "#1a1a1a";
  return "#fff";
}

/* ── Interactive Preview Wrappers ── */

function TogglePreview() {
  const [on, setOn] = useState(false);
  return <Primitives.Toggle checked={on} onChange={setOn} />;
}

function CheckboxPreview() {
  const [checked, setChecked] = useState(true);
  return <Primitives.Checkbox checked={checked} onChange={setChecked} />;
}

function RadioPreview() {
  const [val, setVal] = useState("a");
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Primitives.Radio checked={val === "a"} onChange={() => setVal("a")} />
      <Primitives.Radio checked={val === "b"} onChange={() => setVal("b")} />
    </div>
  );
}

function SliderPreview() {
  const [val, setVal] = useState(50);
  return <Primitives.Slider value={val} onChange={setVal} />;
}

function GelTogglePreview() {
  const [on, setOn] = useState(false);
  return <Primitives.Toggle variant="gel" checked={on} onChange={setOn} />;
}

function GelCheckboxPreview() {
  const [checked, setChecked] = useState(true);
  return <Primitives.Checkbox variant="gel" checked={checked} onChange={setChecked} />;
}

function GelRadioPreview() {
  const [val, setVal] = useState("a");
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Primitives.Radio variant="gel" checked={val === "a"} onChange={() => setVal("a")} />
      <Primitives.Radio variant="gel" checked={val === "b"} onChange={() => setVal("b")} />
    </div>
  );
}

function TabBarPreview() {
  const [active, setActive] = useState(1);
  return <Primitives.TabBar tabs={["Overview","Settings","Activity"]} active={active} onChange={setActive} />;
}

function PillTabsPreview() {
  const [active, setActive] = useState("All");
  return <Primitives.PillTabs tabs={["All","Active","Archived"]} activeTab={active} onChange={setActive} />;
}

function SegmentedPreview() {
  const [val, setVal] = useState("Week");
  return <Primitives.SegmentedControl options={["Day","Week","Month"]} value={val} onChange={setVal} />;
}

function TagInputPreview() {
  const [tags, setTags] = useState(["React", "Astro"]);
  return <Primitives.TagInput value={tags} onChange={setTags} placeholder="Add tag..." />;
}

function NavItemPreview() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 180 }}>
      {["Overview","Settings","Team"].map((label, i) => (
        <Primitives.NavItem key={label} label={label} active={active === i} onClick={() => setActive(i)} />
      ))}
    </div>
  );
}

function AlertPreview() {
  const [show, setShow] = useState(true);
  return show ? (
    <Primitives.Alert variant="info" title="Info" dismissible onDismiss={() => setShow(false)}>
      This is an alert message
    </Primitives.Alert>
  ) : (
    <button onClick={() => setShow(true)} style={{ fontSize: 11, cursor: "pointer", border: "none", background: "none", textDecoration: "underline", color: "inherit" }}>Show alert again</button>
  );
}

function PasswordPreview() {
  const [val, setVal] = useState("secret123");
  return <Primitives.PasswordInput value={val} onChange={(e: any) => setVal(e.target?.value ?? e)} placeholder="Password" />;
}

function NumberPreview() {
  const [val, setVal] = useState(5);
  return <Primitives.NumberInput value={val} onChange={setVal} min={0} max={10} />;
}

function PaginationPreview() {
  const [page, setPage] = useState(3);
  return <Primitives.Pagination totalPages={10} currentPage={page} onPageChange={setPage} />;
}

/* ── Component Preview ── */

function ComponentPreview({ id, isDark }: { id: string; isDark: boolean }) {
  const previews: Record<string, React.ReactNode> = {
    "button": (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Primitives.Button variant="solid" size="sm">Solid</Primitives.Button>
        <Primitives.Button variant="glass" size="sm">Glass</Primitives.Button>
        <Primitives.Button variant="ghost" size="sm">Ghost</Primitives.Button>
        <Primitives.Button variant="gel" size="sm">Gel</Primitives.Button>
      </div>
    ),
    "input": <Primitives.Input placeholder="Type something..." />,
    "toggle": <TogglePreview />,
    "checkbox": <CheckboxPreview />,
    "heading": (
      <div>
        <Primitives.Heading level={1}>Heading 1</Primitives.Heading>
        <Primitives.Heading level={3}>Heading 3</Primitives.Heading>
      </div>
    ),
    "text": <Primitives.Text>The quick brown fox jumps over the lazy dog.</Primitives.Text>,
    "badge": (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Primitives.Badge variant="default">Default</Primitives.Badge>
        <Primitives.Badge variant="success">Success</Primitives.Badge>
        <Primitives.Badge variant="warning">Warning</Primitives.Badge>
        <Primitives.Badge variant="error">Error</Primitives.Badge>
      </div>
    ),
    "spinner": <Primitives.Spinner size={24} />,
    "progress": <Primitives.Progress value={65} />,
    "skeleton": <Primitives.Skeleton width="100%" height={40} />,
    "avatar": (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Primitives.Avatar name="John Doe" size={40} status="online" />
        <Primitives.Avatar name="Jane" size={32} status="busy" />
      </div>
    ),
    "tag": (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Primitives.Tag label="Default" color="default" />
        <Primitives.Tag label="Blue" color="blue" />
        <Primitives.Tag label="Removable" color="green" onRemove={() => {}} />
      </div>
    ),
    "divider": <Primitives.Divider />,
    "card": (
      <Primitives.Card variant="glass" style={{ padding: 16 }}>
        <Primitives.Text>Card content</Primitives.Text>
      </Primitives.Card>
    ),
    "label": <Primitives.Label>Email address</Primitives.Label>,
    "caption": <Primitives.Caption>Last updated 2 minutes ago</Primitives.Caption>,
    "code": <Primitives.Code>const x = 42;</Primitives.Code>,
    "link": <Primitives.Link href="#">Learn more</Primitives.Link>,
    "search-input": <Primitives.SearchInput placeholder="Search..." />,
    "textarea": <Primitives.Textarea placeholder="Write a description..." />,
    "custom-select": <Primitives.Select options={[{value:"1",label:"Option A"},{value:"2",label:"Option B"},{value:"3",label:"Option C"}]} />,
    "select": <Primitives.Select options={[{value:"1",label:"Option A"},{value:"2",label:"Option B"},{value:"3",label:"Option C"}]} />,
    "radio": <RadioPreview />,
    "segmented-control": <SegmentedPreview />,
    "slider": <SliderPreview />,
    "icon-button": <Primitives.IconButton>+</Primitives.IconButton>,
    "link-button": <Primitives.LinkButton>Learn more &rarr;</Primitives.LinkButton>,
    "tab-bar": <TabBarPreview />,
    "pill-tabs": <PillTabsPreview />,
    "breadcrumb": <Primitives.Breadcrumb items={["Home","Design System","Registry"]} />,
    "nav-item": <NavItemPreview />,
    "surface": <Primitives.Surface level={1} style={{ padding: 16, minHeight: 60 }}><Primitives.Text size="sm">Surface level 1</Primitives.Text></Primitives.Surface>,
    "box": <Primitives.Box style={{ padding: 12, border: "1px dashed rgba(128,128,128,0.3)" }}>Box content</Primitives.Box>,
    "stack": (
      <Primitives.Stack gap={8}>
        <div style={{ padding: 8, background: "rgba(128,128,128,0.1)", borderRadius: 4 }}>Item 1</div>
        <div style={{ padding: 8, background: "rgba(128,128,128,0.1)", borderRadius: 4 }}>Item 2</div>
        <div style={{ padding: 8, background: "rgba(128,128,128,0.1)", borderRadius: 4 }}>Item 3</div>
      </Primitives.Stack>
    ),
    "inline": (
      <Primitives.Inline gap={8}>
        <Primitives.Badge>A</Primitives.Badge>
        <Primitives.Badge>B</Primitives.Badge>
        <Primitives.Badge>C</Primitives.Badge>
      </Primitives.Inline>
    ),
    "grid": (
      <Primitives.Grid columns={3} gap={8}>
        <div style={{ padding: 8, background: "rgba(128,128,128,0.1)", borderRadius: 4, textAlign: "center" }}>1</div>
        <div style={{ padding: 8, background: "rgba(128,128,128,0.1)", borderRadius: 4, textAlign: "center" }}>2</div>
        <div style={{ padding: 8, background: "rgba(128,128,128,0.1)", borderRadius: 4, textAlign: "center" }}>3</div>
      </Primitives.Grid>
    ),
    "center": <Primitives.Center style={{ height: 60 }}><Primitives.Badge>Centered</Primitives.Badge></Primitives.Center>,
    "spacer": (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Primitives.Badge>Before</Primitives.Badge>
        <Primitives.Spacer size={32} />
        <Primitives.Badge>After (32px gap)</Primitives.Badge>
      </div>
    ),
    "modal": <span style={{ color: "var(--theme-fg-muted)", fontSize: 12 }}>Use &quot;Open Full Preview&quot; below</span>,
    "overlay": <span style={{ color: "var(--theme-fg-muted)", fontSize: 12 }}>Use &quot;Open Full Preview&quot; below</span>,
    "tooltip": <Primitives.Tooltip content="Hello!"><Primitives.Badge>Hover me</Primitives.Badge></Primitives.Tooltip>,
    "searchable-select": <Primitives.SearchableSelect options={[{value:"1",label:"Apple"},{value:"2",label:"Banana"},{value:"3",label:"Cherry"}]} placeholder="Pick a fruit..." />,
    // Button variants
    "gel-button": <Primitives.Button variant="gel" size="md">Gel Button</Primitives.Button>,
    "glass-button": <Primitives.Button variant="glass" size="md">Glass Button</Primitives.Button>,
    "ghost-button": <Primitives.Button variant="ghost" size="md">Ghost Button</Primitives.Button>,
    "solid-button": <Primitives.Button variant="solid" size="md">Solid Button</Primitives.Button>,
    "action-pair": (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Primitives.Button variant="ghost" size="sm">Cancel</Primitives.Button>
        <Primitives.Button variant="solid" size="sm">Apply</Primitives.Button>
      </div>
    ),
    // Surface variants
    "glass-surface": <Primitives.Surface level={1} style={{ padding: 16, minHeight: 50 }}><Primitives.Text size="sm">Glass surface</Primitives.Text></Primitives.Surface>,
    "gel-surface": <div className="gel-glass" style={{ padding: 16, minHeight: 50, borderRadius: "var(--glass-radius-sm, 8px)" }}><Primitives.Text size="sm">Gel surface</Primitives.Text></div>,
    "solid-surface": <div style={{ padding: 16, minHeight: 50, borderRadius: "var(--glass-radius-sm, 8px)", background: "var(--theme-table-bg)" }}><Primitives.Text size="sm">Solid surface</Primitives.Text></div>,
    "ds-card": <Primitives.Card variant="glass" style={{ padding: 12 }}><Primitives.Text size="sm">DSCard</Primitives.Text></Primitives.Card>,
    "frost-zone": <div style={{ position: "relative", height: 60, borderRadius: 8, overflow: "hidden", border: "1px solid var(--theme-divider)" }}><div className="ds-card-frost" style={{ position: "absolute", inset: 0 }} /><div style={{ position: "relative", padding: 12 }}><Primitives.Text size="sm">Frost zone overlay</Primitives.Text></div></div>,
    // Input variants
    "text-input": <Primitives.Input placeholder="Enter your name..." />,
    // Divider variants
    "divider-horizontal": <Primitives.Divider />,
    "divider-glass": <Primitives.Divider variant="etched" />,
    // Control variants (gel)
    "gel-toggle": <GelTogglePreview />,
    "gel-checkbox": <GelCheckboxPreview />,
    "gel-radio": <GelRadioPreview />,
    "flat-slider": <SliderPreview />,
    "liquid-glass-slider": <SliderPreview />,
    // Data display
    "body-text": <Primitives.Text>The quick brown fox jumps over the lazy dog.</Primitives.Text>,
    "overline": <Primitives.Text size="xs" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 650 }}>Overline Text</Primitives.Text>,
    "code-block": <Primitives.Code block>{`const theme = 'glass';`}</Primitives.Code>,
    "status-badge": (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Primitives.Badge variant="success">Active</Primitives.Badge>
        <Primitives.Badge variant="warning">Pending</Primitives.Badge>
        <Primitives.Badge variant="error">Failed</Primitives.Badge>
      </div>
    ),
    "status-dot": (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34C759" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF9500" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3B30" }} />
      </div>
    ),
    "chip": <Primitives.Tag label="Chip" color="blue" size="sm" />,
    "avatar-group": (
      <div style={{ display: "flex", marginLeft: 8 }}>
        {["A","B","C"].map((n, i) => (
          <div key={n} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i }}><Primitives.Avatar name={n} size={32} /></div>
        ))}
      </div>
    ),
    "progress-bar": <Primitives.Progress value={65} />,
    "skeleton-loader": <Primitives.Skeleton width="100%" height={40} />,
    // Elevation
    "elevation-flat": <div style={{ padding: 12, borderRadius: 8, background: "var(--theme-table-bg)", boxShadow: "none" }}><Primitives.Text size="sm">Flat</Primitives.Text></div>,
    "elevation-raised": <div style={{ padding: 12, borderRadius: 8, background: "var(--theme-table-bg)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><Primitives.Text size="sm">Raised</Primitives.Text></div>,
    "elevation-floating": <div style={{ padding: 12, borderRadius: 8, background: "var(--theme-table-bg)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}><Primitives.Text size="sm">Floating</Primitives.Text></div>,
    // Higher-level components (no inline preview)
    "ds-nav": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Page-level component — see nav bar above</span>,
    "ds-footer": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Page-level component — see footer below</span>,
    "ds-shell": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Page-level shell — wraps all pages</span>,
    "appearance-modal": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Right-click → Appearance</span>,
    "context-menu": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Right-click anywhere to see</span>,
    "background-picker": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Right-click → Background</span>,
    "font-picker-modal": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Tokens → Font Families → ⚙</span>,
    "preset-editor-modal": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Primitives → Type Presets → click row</span>,
    "section-nav": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Side navigation — visible on right</span>,
    "features-grid": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Overview → Features block</span>,
    "type-presets-table": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Primitives → Type Presets block</span>,
    "liquid-glass-filter": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>SVG filter — applied globally</span>,
    "drawer": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Planned — not yet implemented</span>,
    "popover": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Planned — not yet implemented</span>,
    // Components
    "view-source-modal": (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 6, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--theme-fg-muted)" }}>
          <span style={{ padding: "2px 8px", borderRadius: 6, background: "var(--theme-header-bg)" }}>Source</span>
          <span style={{ padding: "2px 8px", borderRadius: 6, background: "var(--theme-header-bg)" }}>Components</span>
          <span style={{ padding: "2px 8px", borderRadius: 6, background: "var(--theme-header-bg)" }}>Impl</span>
        </div>
        <div style={{ height: 36, borderRadius: 6, background: "#1a1a1a", display: "flex", alignItems: "center", padding: "0 12px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#ce93d8" }}>import</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#d4d4d4" }}>&nbsp;{"{ "}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#7cc4fa" }}>Button</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#d4d4d4" }}>{" }"}&nbsp;</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#ce93d8" }}>from</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#a5d6a7" }}>&nbsp;"@/primitives"</span>
        </div>
      </div>
    ),
    "view-source-button": (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--theme-header-bg)",
          border: "1px solid var(--theme-divider)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        </div>
        <span style={{ fontSize: 11, color: "var(--theme-fg-muted)" }}>Click to view source</span>
      </div>
    ),
    // New Tier 1+2 primitives
    "alert": <AlertPreview />,
    "toast": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Click "Open Full Preview" to see Toast demo</span>,
    "confirm-dialog": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Click "Open Full Preview" to see dialog</span>,
    "table": (
      <Primitives.Table
        columns={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }]}
        data={[{ name: "Alice", role: "Designer" }, { name: "Bob", role: "Developer" }]}
        compact
      />
    ),
    "stat": (
      <div style={{ display: "flex", gap: 12 }}>
        <Primitives.Stat value="1,234" label="Users" trend="up" trendValue="+12%" />
        <Primitives.Stat value="98.5%" label="Uptime" trend="neutral" />
      </div>
    ),
    "empty-state": <Primitives.EmptyState title="No results" description="Try a different search" />,
    "color-swatch": (
      <div style={{ display: "flex", gap: 8 }}>
        <Primitives.ColorSwatch color="#354334" label="Primary" size="sm" showHex />
        <Primitives.ColorSwatch color="#FFC800" label="Accent" size="sm" showHex />
      </div>
    ),
    "button-group": (
      <Primitives.ButtonGroup attached>
        <Primitives.Button variant="ghost" size="sm">Left</Primitives.Button>
        <Primitives.Button variant="ghost" size="sm">Center</Primitives.Button>
        <Primitives.Button variant="ghost" size="sm">Right</Primitives.Button>
      </Primitives.ButtonGroup>
    ),
    "password-input": <PasswordPreview />,
    "number-input": <NumberPreview />,
    "form-group": (
      <Primitives.FormGroup label="Email" required helperText="We'll never share your email">
        <Primitives.Input placeholder="you@example.com" />
      </Primitives.FormGroup>
    ),
    "tag-input": <TagInputPreview />,
    "pagination": <PaginationPreview />,
    "stepper": <Primitives.Stepper steps={["Info", "Review", "Done"]} currentStep={1} />,
    "back-to-top": <span style={{ color: "var(--theme-fg-muted)", fontSize: 11 }}>Floating button — visible when scrolling</span>,
    "accordion": <Primitives.Accordion items={[{ title: "What is GelUI?", content: "A glassmorphism design system" }, { title: "How to install?", content: "npm install gelui" }]} />,
    "scroll-area": (
      <Primitives.ScrollArea maxHeight={80}>
        <div style={{ padding: 8 }}>
          {[1,2,3,4,5,6].map(i => <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid rgba(128,128,128,0.1)", fontSize: 12 }}>Item {i}</div>)}
        </div>
      </Primitives.ScrollArea>
    ),
    "image": <Primitives.Image src="/logos/uigel-logo.svg" alt="Logo" width={60} height={60} />,
    "icon": (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Primitives.Icon size={16}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></Primitives.Icon>
        <Primitives.Icon size={24}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></Primitives.Icon>
      </div>
    ),
    "blockquote": <Primitives.Blockquote author="Dieter Rams">Less, but better.</Primitives.Blockquote>,
    "list": <Primitives.List items={["Typography", "Buttons", "Surfaces"]} />,
    "overline": <Primitives.Overline>Category Label</Primitives.Overline>,
    "kbd": (
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Primitives.Kbd>⌘</Primitives.Kbd><Primitives.Kbd>K</Primitives.Kbd>
      </div>
    ),
  };

  return previews[id] || <span style={{ color: "rgba(128,128,128,0.5)", fontSize: 12 }}>No preview available</span>;
}

/* ── Component ── */

export function RegistryViewer({ components }: Props) {
  const [search, setSearch] = useState("");
  const [layerFilter, setLayerFilter] = useState<Layer | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [fullPreviewId, setFullPreviewId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Dark mode observer
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.getAttribute("data-theme") === "dark");

    const observer = new MutationObserver(() => {
      setIsDark(root.getAttribute("data-theme") === "dark");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Filtered components
  const filtered = useMemo(() => {
    return components.filter((c) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const haystack = [c.name, c.id, c.displayName, ...c.tags].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Layer
      if (layerFilter !== "all" && c.layer !== layerFilter) return false;
      // Status
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      // Category
      if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
      return true;
    });
  }, [components, search, layerFilter, statusFilter, categoryFilter]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<Category, ComponentRegistryEntry[]>();
    for (const c of filtered) {
      const list = map.get(c.category) || [];
      list.push(c);
      map.set(c.category, list);
    }
    return map;
  }, [filtered]);

  // Unique categories present in data
  const availableCategories = useMemo(() => {
    const cats = new Set<Category>();
    components.forEach((c) => cats.add(c.category));
    return Array.from(cats).sort();
  }, [components]);

  // Footer stats
  const stats = useMemo(() => {
    const primitives = filtered.filter((c) => c.layer === "primitive").length;
    const tokens = filtered.filter((c) => c.layer === "token").length;
    const comps = filtered.filter((c) => c.layer === "component").length;
    const planned = filtered.filter((c) => c.status === "planned").length;
    return { primitives, tokens, comps, planned, total: filtered.length };
  }, [filtered]);

  // Row numbering
  let rowIndex = 0;

  const textPrimary = "var(--theme-fg)";
  const textSecondary = "var(--theme-fg-muted)";
  const textMuted = "var(--theme-fg-subtle)";
  const borderColor = "var(--theme-divider)";
  const bgCard = "var(--theme-table-bg)";
  const bgHover = "var(--theme-header-bg)";
  const bgCategoryHeader = "var(--theme-header-bg)";
  const bgExpanded = "var(--theme-header-bg)";
  const bgInput = "var(--theme-header-bg)";

  return (
    <div id="registry-table" style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}>
      {/* ── Filters ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={textMuted}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search components by name, ID, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              borderRadius: "var(--glass-radius-sm, 10px)",
              border: `1px solid ${borderColor}`,
              background: bgInput,
              backdropFilter: "blur(12px)",
              color: textPrimary,
              fontSize: "13px",
              fontWeight: 500,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Layer pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          <FilterPill
            label="All"
            active={layerFilter === "all"}
            onClick={() => setLayerFilter("all")}

          />
          {ALL_LAYERS.map((l) => (
            <FilterPill
              key={l}
              label={LAYER_LABELS[l]}
              active={layerFilter === l}
              onClick={() => setLayerFilter(l)}
  
              dotColor={LAYER_COLORS[l]}
            />
          ))}
        </div>

        {/* Status + Category row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          {/* Status filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginRight: "4px" }}>Status</span>
            <FilterPill label="All" active={statusFilter === "all"} onClick={() => setStatusFilter("all")} />
            {ALL_STATUSES.map((s) => (
              <FilterPill
                key={s}
                label={STATUS_LABELS[s]}
                active={statusFilter === s}
                onClick={() => setStatusFilter(s)}
    
                icon={STATUS_ICONS[s]}
              />
            ))}
          </div>

          {/* Category dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted }}>Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category | "all")}
              style={{
                padding: "5px 8px",
                borderRadius: "var(--glass-radius-sm, 10px)",
                border: `1px solid ${borderColor}`,
                background: bgInput,
                color: textPrimary,
                fontSize: "12px",
                fontWeight: 550,
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="all">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div
        style={{
          borderRadius: "var(--glass-radius, 16px)",
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
          background: bgCard,
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 0.9fr 1.2fr 0.6fr 0.4fr",
            padding: "10px 16px",
            borderBottom: `1px solid ${borderColor}`,
            background: bgCategoryHeader,
            gap: "8px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>#</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>Component</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>DSL ID</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>File</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>Layer</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>Status</span>
        </div>

        {/* Grouped rows */}
        {Array.from(grouped.entries()).map(([category, items]) => (
          <div key={category}>
            {/* Category header */}
            <div
              style={{
                padding: "8px 16px",
                background: bgCategoryHeader,
                borderBottom: `1px solid ${borderColor}`,
                borderTop: `1px solid ${borderColor}`,
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: textSecondary }}>
                {CATEGORY_LABELS[category] || category}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 500, color: textMuted, marginLeft: "8px" }}>
                {items.length}
              </span>
            </div>

            {/* Component rows */}
            {items.map((comp) => {
              rowIndex++;
              const isExpanded = expandedId === comp.id;
              return (
                <div key={comp.id}>
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : comp.id)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr 0.9fr 1.2fr 0.6fr 0.4fr",
                      padding: "10px 16px",
                      borderBottom: `1px solid ${borderColor}`,
                      gap: "8px",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      background: isExpanded ? bgExpanded : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) e.currentTarget.style.background = bgHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isExpanded ? bgExpanded : "transparent";
                    }}
                  >
                    {/* # */}
                    <span style={{ fontSize: "12px", fontWeight: 500, color: textMuted, fontVariantNumeric: "tabular-nums" }}>
                      {rowIndex}
                    </span>

                    {/* Component name */}
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: textPrimary }}>{comp.displayName}</span>
                      {comp.description && (
                        <p style={{ fontSize: "11px", color: textMuted, margin: "2px 0 0", lineHeight: 1.4 }}>{comp.description}</p>
                      )}
                    </div>

                    {/* DSL ID pill */}
                    <div>
                      <code
                        style={{
                          fontSize: "11px",
                          fontWeight: 550,
                          fontFamily: "var(--font-mono, monospace)",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: "var(--theme-header-bg)",
                          color: "var(--theme-fg-muted)",
                        }}
                      >
                        {comp.id}
                      </code>
                    </div>

                    {/* File path */}
                    <div style={{ overflow: "hidden" }}>
                      {comp.path ? (
                        <code
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-mono, monospace)",
                            color: textMuted,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "block",
                          }}
                          title={comp.path}
                        >
                          {comp.path.replace(/^src\//, "").replace(/\.tsx?$/, "")}
                        </code>
                      ) : (
                        <span style={{ fontSize: "10px", color: textMuted, opacity: 0.4 }}>—</span>
                      )}
                    </div>

                    {/* Layer badge */}
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "10px",
                          fontWeight: 650,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: LAYER_COLORS[comp.layer],
                          color: getLayerTextColor(comp.layer),
                        }}
                      >
                        {LAYER_LABELS[comp.layer]}
                      </span>
                    </div>

                    {/* Status */}
                    <span style={{ fontSize: "12px" }} title={STATUS_LABELS[comp.status]}>
                      {STATUS_ICONS[comp.status]} <span style={{ fontSize: "11px", color: textSecondary }}>{STATUS_LABELS[comp.status]}</span>
                    </span>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: "16px 16px 16px 56px",
                        borderBottom: `1px solid ${borderColor}`,
                        background: bgExpanded,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1.2fr",
                        gap: "16px",
                        fontSize: "12px",
                      }}
                    >
                      {/* Left: Props */}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginBottom: "8px" }}>
                          Props Schema
                        </div>
                        {Object.keys(comp.props).length > 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {Object.entries(comp.props).map(([name, schema]) => (
                              <div key={name} style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                                <code style={{ fontSize: "11px", fontWeight: 600, fontFamily: "var(--font-mono, monospace)", color: "var(--theme-fg-muted)" }}>
                                  {name}
                                </code>
                                <span style={{ fontSize: "10px", color: textMuted }}>
                                  {schema.type}
                                  {schema.required && <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>}
                                  {schema.default !== undefined && (
                                    <span style={{ marginLeft: "4px" }}>= {String(schema.default)}</span>
                                  )}
                                </span>
                                {schema.description && (
                                  <span style={{ fontSize: "10px", color: textMuted, fontStyle: "italic" }}>{schema.description}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontSize: "11px", color: textMuted, fontStyle: "italic" }}>No props defined</span>
                        )}
                      </div>

                      {/* Middle: Metadata */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginBottom: "4px" }}>
                          Metadata
                        </div>
                        <MetaRow label="Path" value={comp.path} />
                        <MetaRow label="Version" value={comp.version} />
                        <MetaRow label="React" value={comp.isReact ? "Yes" : "No"} />
                        {comp.tags.length > 0 && (
                          <div>
                            <span style={{ fontSize: "10px", fontWeight: 600, color: textMuted }}>Tags: </span>
                            <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px", marginTop: "2px" }}>
                              {comp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: 550,
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    background: "var(--theme-header-bg)",
                                    color: textSecondary,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </span>
                          </div>
                        )}
                        {comp.slots && Object.keys(comp.slots).length > 0 && (
                          <div>
                            <span style={{ fontSize: "10px", fontWeight: 600, color: textMuted }}>Slots: </span>
                            {Object.entries(comp.slots).map(([slotName, slotSchema]) => (
                              <div key={slotName} style={{ marginTop: "2px", marginLeft: "8px" }}>
                                <code style={{ fontSize: "10px", fontFamily: "var(--font-mono, monospace)", fontWeight: 600, color: "var(--theme-fg-muted)" }}>
                                  {slotName}
                                </code>
                                <span style={{ fontSize: "10px", color: textMuted, marginLeft: "4px" }}>
                                  accepts: {slotSchema.accepts.join(", ")}
                                  {slotSchema.multiple && " (multiple)"}
                                  {slotSchema.required && " (required)"}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {comp.documentedOn && (
                          <MetaRow label="Documented" value={comp.documentedOn + (comp.section ? ` #${comp.section}` : "")} />
                        )}
                      </div>

                      {/* Right: Live Preview */}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginBottom: "8px" }}>
                          Live Preview
                        </div>
                        <div style={{
                          padding: "16px",
                          borderRadius: "var(--glass-radius-sm, 8px)",
                          border: "1px solid var(--theme-divider)",
                          background: "var(--theme-header-bg)",
                          minHeight: "80px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <ComponentPreview id={comp.id} />
                        </div>
                        {["modal", "overlay", "card", "surface", "toast", "confirm-dialog"].includes(comp.id) && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setFullPreviewId(comp.id); }}
                            style={{
                              marginTop: 8,
                              fontSize: 11,
                              fontWeight: 550,
                              padding: "6px 14px",
                              borderRadius: "var(--glass-radius-pill, 100px)",
                              border: "1px solid var(--theme-ghost-border)",
                              background: "transparent",
                              color: "var(--theme-fg-muted)",
                              cursor: "pointer",
                            }}
                          >
                            Open Full Preview
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ padding: "40px 16px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: textMuted }}>No components match your filters.</p>
          </div>
        )}
      </div>

      {/* ── Full Preview Modal ── */}
      {fullPreviewId && (
        <div
          onClick={() => setFullPreviewId(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(90vw, 720px)",
              maxHeight: "80vh",
              overflow: "auto",
              borderRadius: "var(--glass-radius, 16px)",
              border: "1px solid var(--theme-ghost-border)",
              background: "var(--theme-table-bg)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              padding: "32px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setFullPreviewId(null)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid var(--theme-ghost-border)",
                background: "var(--theme-header-bg)",
                color: "var(--theme-fg-muted)",
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              &times;
            </button>
            <div style={{ fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginBottom: "16px" }}>
              Full Preview &mdash; {fullPreviewId}
            </div>
            <div style={{
              padding: "24px",
              borderRadius: "var(--glass-radius-sm, 8px)",
              border: "1px solid var(--theme-divider)",
              background: "var(--theme-header-bg)",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <ComponentPreview id={fullPreviewId} />
            </div>
          </div>
        </div>
      )}

      {/* ── Footer stats ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 16px",
          padding: "12px 0 4px",
          fontSize: "12px",
          fontWeight: 550,
          color: textMuted,
        }}
      >
        <span>{stats.total} Total</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.primitives} Primitives</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.tokens} Tokens</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.comps} Components</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.planned} Planned</span>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function FilterPill({
  label,
  active,
  onClick,
  dotColor,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  isDark?: boolean;
  dotColor?: string;
  icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 10px",
        borderRadius: "999px",
        border: active ? "1px solid var(--theme-ghost-border)" : "1px solid transparent",
        background: active ? "var(--theme-header-bg)" : "var(--theme-header-bg)",
        color: active ? "var(--theme-fg)" : "var(--theme-fg-muted)",
        fontSize: "11px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {dotColor && (
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: dotColor,
            flexShrink: 0,
          }}
        />
      )}
      {icon && <span style={{ fontSize: "12px" }}>{icon}</span>}
      {label}
    </button>
  );
}

function MetaRow({ label, value }: { label: string; value: string; isDark?: boolean }) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
      <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--theme-fg-subtle)" }}>{label}:</span>
      <code
        style={{
          fontSize: "11px",
          fontFamily: "var(--font-mono, monospace)",
          color: "var(--theme-fg-muted)",
        }}
      >
        {value}
      </code>
    </div>
  );
}

export default RegistryViewer;
