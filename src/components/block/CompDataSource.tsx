import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
import IMPL_DATATABLE from "@/components/composed/DataTable.tsx?raw";
import IMPL_STATSROW from "@/components/composed/StatsRow.tsx?raw";

const SOURCE_CODE = `import { DataTable, StatsRow } from "@/components/composed";

{/* Stats Row */}
<StatsRow stats={[
  { value: "1,234", label: "Users", trend: "up", trendValue: "+12%" },
  { value: "98.5%", label: "Uptime", trend: "neutral", trendValue: "0.0%" },
  { value: "$12.4k", label: "Revenue", trend: "up", trendValue: "+8.3%" },
]} />

{/* Data Table */}
<DataTable
  title="Team Members"
  columns={[
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ]}
  data={users}
  searchPlaceholder="Search team..."
  actionLabel="Add Member"
  pageSize={5}
/>`;

const COMPONENTS = [
  {
    name: "DataTable",
    path: "@/components/composed",
    description: "Searchable, paginated data table with column headers and action button",
    implementation: IMPL_DATATABLE,
    props: [
      { name: "title", type: "string" },
      { name: "columns", type: "Column[]", options: ["required"] },
      { name: "data", type: "Record[]", options: ["required"] },
      { name: "searchPlaceholder", type: "string", default: '"Search..."' },
      { name: "actionLabel", type: "string" },
      { name: "onAction", type: "() => void" },
      { name: "pageSize", type: "number", default: "5" },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "StatsRow",
    path: "@/components/composed",
    description: "Responsive row of KPI metric cards with icons, values, labels, and trends",
    implementation: IMPL_STATSROW,
    props: [
      { name: "stats", type: "StatItem[]", options: ["required"] },
      { name: "cols", type: "number" },
      { name: "className", type: "string" },
    ],
  },
];

export function CompDataSource() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="comp-data"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);
  return <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Data & Tables" code={SOURCE_CODE} components={COMPONENTS} />;
}
