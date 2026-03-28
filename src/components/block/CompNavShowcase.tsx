import { Navbar } from "@/components/composed/Navbar";
import { PageHeader } from "@/components/composed/PageHeader";
import { Stack } from "@/primitives/layout";
import { Button } from "@/primitives/buttons";

export function CompNavShowcase() {
  return (
    <Stack gap="24px">
      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Navbar</span>
        <div className="mt-3">
          <Navbar
            brand="Acme Inc"
            links={[
              { label: "Dashboard", active: true },
              { label: "Projects" },
              { label: "Team" },
              { label: "Settings" },
            ]}
            userName="Alice Chen"
            notificationCount={3}
          />
        </div>
      </div>

      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Page Header</span>
        <div className="mt-3">
          <PageHeader
            overline="Administration"
            title="Team Members"
            description="Manage your team and their roles"
            breadcrumbs={["Home", "Settings", "Team"]}
            actionLabel="Add Member"
          />
        </div>
      </div>

      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Page Header (Minimal)</span>
        <div className="mt-3">
          <PageHeader
            title="Dashboard"
            description="Overview of your project metrics"
            action={<Button variant="ghost">Export</Button>}
          />
        </div>
      </div>
    </Stack>
  );
}
