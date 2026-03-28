import { DataTable } from "@/components/composed/DataTable";
import { StatsRow } from "@/components/composed/StatsRow";
import { Stack } from "@/primitives/layout";

const SAMPLE_DATA = [
  { name: "Alice Chen", role: "Engineer", status: "Active", department: "Engineering" },
  { name: "Bob Smith", role: "Designer", status: "Away", department: "Design" },
  { name: "Carol Wu", role: "PM", status: "Active", department: "Product" },
  { name: "Dan Lee", role: "DevOps", status: "Offline", department: "Engineering" },
  { name: "Eve Park", role: "QA", status: "Active", department: "Engineering" },
  { name: "Frank Kim", role: "Marketing", status: "Active", department: "Marketing" },
  { name: "Grace Liu", role: "Data Analyst", status: "Away", department: "Analytics" },
  { name: "Henry Wang", role: "Frontend", status: "Active", department: "Engineering" },
];

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "department", label: "Department" },
  { key: "status", label: "Status" },
];

export function CompDataShowcase() {
  return (
    <Stack gap="24px">
      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Stats Row</span>
        <div className="mt-3">
          <StatsRow
            stats={[
              { value: "1,234", label: "Users", trend: "up" as const, trendValue: "+12%" },
              { value: "98.5%", label: "Uptime", trend: "neutral" as const, trendValue: "0.0%" },
              { value: "$12.4k", label: "Revenue", trend: "up" as const, trendValue: "+8.3%" },
            ]}
            cols={3}
          />
        </div>
      </div>

      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Data Table</span>
        <div className="mt-3">
          <DataTable
            title="Team Members"
            columns={COLUMNS}
            data={SAMPLE_DATA}
            searchPlaceholder="Search team..."
            actionLabel="Add Member"
            pageSize={4}
          />
        </div>
      </div>
    </Stack>
  );
}
