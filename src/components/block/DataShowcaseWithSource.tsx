import { useState, useEffect } from "react";
import { DataShowcase } from "./DataShowcase";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_TABLE from "@/primitives/data/Table.tsx?raw";
import IMPL_STAT from "@/primitives/data/Stat.tsx?raw";
import IMPL_EMPTYSTATE from "@/primitives/data/EmptyState.tsx?raw";
import IMPL_COLORSWATCH from "@/primitives/data/ColorSwatch.tsx?raw";

const SOURCE_CODE = `import { Table, Stat, EmptyState, ColorSwatch } from "@/primitives/data";

{/* Striped table */}
<Table
  columns={[
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ]}
  data={[
    { name: "Alice Chen", role: "Engineer", status: "Active" },
    { name: "Bob Smith", role: "Designer", status: "Away" },
  ]}
  striped
/>

{/* Stat card with trend */}
<Stat value="1,234" label="Users" trend="up" trendValue="+12%" icon={<UsersIcon />} />

{/* Empty state with action */}
<EmptyState
  title="No results found"
  description="Try adjusting your search or filters."
  icon={<SearchIcon />}
  action={<Button>Clear Filters</Button>}
/>

{/* Color swatch with hex label */}
<ColorSwatch color="#007AFF" label="Primary" showHex />`;

const COMPONENTS = [
  {
    name: "Table", path: "@/primitives/data",
    description: "Data table with columns, rows, optional striping and compact mode",
    implementation: IMPL_TABLE,
    props: [
      { name: "columns", type: "Column[]", description: "{ key, label } array" },
      { name: "data", type: "Record<string, string>[]" },
      { name: "striped", type: "boolean", default: "false" },
      { name: "compact", type: "boolean", default: "false" },
    ],
  },
  {
    name: "Stat", path: "@/primitives/data",
    description: "Big number metric card with label, icon, and trend indicator",
    implementation: IMPL_STAT,
    props: [
      { name: "value", type: "string | number" },
      { name: "label", type: "string" },
      { name: "trend", type: "enum", options: ["up", "down", "neutral"] },
      { name: "trendValue", type: "string" },
      { name: "icon", type: "ReactNode" },
    ],
  },
  {
    name: "EmptyState", path: "@/primitives/data",
    description: "Placeholder when no data — icon, title, description, action button",
    implementation: IMPL_EMPTYSTATE,
    props: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "icon", type: "ReactNode" },
      { name: "action", type: "ReactNode" },
    ],
  },
  {
    name: "ColorSwatch", path: "@/primitives/data",
    description: "Color preview square with optional hex label",
    implementation: IMPL_COLORSWATCH,
    props: [
      { name: "color", type: "string" },
      { name: "label", type: "string" },
      { name: "showHex", type: "boolean", default: "false" },
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
    ],
  },
];

export function DataShowcaseWithSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="data-display"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <DataShowcase />
      <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Data Display" code={SOURCE_CODE} components={COMPONENTS} />
    </>
  );
}
