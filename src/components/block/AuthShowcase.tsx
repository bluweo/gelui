import { LoginForm } from "@/components/composed/LoginForm";
import { ProfileCard } from "@/components/composed/ProfileCard";
import { Stack, Grid } from "@/primitives/layout";

export function AuthShowcase() {
  return (
    <div className="flex flex-col gap-6">
      {/* Overline labels for sub-sections */}
      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Login Form</span>
        <div className="flex justify-center py-4">
          <LoginForm />
        </div>
      </div>

      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Profile Cards</span>
        <Grid cols={2} gap="12px" className="mt-3 max-[540px]:grid-cols-1">
          <ProfileCard name="Alice Chen" role="Lead Engineer" status="active" />
          <ProfileCard name="Bob Smith" role="Designer" status="away" />
          <ProfileCard name="Carol Wu" role="Product Manager" status="active" />
          <ProfileCard name="Dan Lee" role="DevOps" status="offline" />
        </Grid>
      </div>
    </div>
  );
}
