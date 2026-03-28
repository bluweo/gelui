import { PricingCard } from "@/components/composed/PricingCard";
import { Grid } from "@/primitives/layout";

export function CompCardsShowcase() {
  return (
    <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
      <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Pricing Cards</span>
      <Grid cols={3} gap="16px" className="mt-3 max-[860px]:grid-cols-1">
        <PricingCard
          plan="Starter"
          price="$9"
          description="For individuals getting started"
          features={["5 projects", "1 team member", "2GB storage", "Email support"]}
        />
        <PricingCard
          plan="Pro"
          price="$29"
          popular
          description="For growing teams"
          features={["Unlimited projects", "10 team members", "20GB storage", "Priority support", "Analytics"]}
        />
        <PricingCard
          plan="Enterprise"
          price="$99"
          description="For large organizations"
          features={["Unlimited everything", "SSO & SAML", "Custom contracts", "Dedicated support", "SLA guarantee"]}
        />
      </Grid>
    </div>
  );
}
