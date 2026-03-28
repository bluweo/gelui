import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
import IMPL_PRICING from "@/components/composed/PricingCard.tsx?raw";

const SOURCE_CODE = `import { PricingCard } from "@/components/composed";

<PricingCard
  plan="Starter"
  price="$9"
  description="For individuals"
  features={["5 projects", "1 member", "2GB storage"]}
/>

<PricingCard
  plan="Pro"
  price="$29"
  popular
  description="For growing teams"
  features={["Unlimited projects", "10 members", "20GB storage", "Priority support"]}
/>

<PricingCard
  plan="Enterprise"
  price="$99"
  description="For organizations"
  features={["Unlimited everything", "SSO", "Custom contracts", "SLA"]}
/>`;

const COMPONENTS = [
  {
    name: "PricingCard",
    path: "@/components/composed",
    description: "Plan name, price, feature list with checkmarks, and CTA button. Popular variant inverts colors.",
    implementation: IMPL_PRICING,
    props: [
      { name: "plan", type: "string", options: ["required"] },
      { name: "price", type: "string", options: ["required"] },
      { name: "period", type: "string", default: '"/mo"' },
      { name: "description", type: "string" },
      { name: "features", type: "string[]", options: ["required"] },
      { name: "popular", type: "boolean", default: "false" },
      { name: "ctaLabel", type: "string", default: '"Get Started"' },
      { name: "onSelect", type: "() => void" },
      { name: "className", type: "string" },
    ],
  },
];

export function CompCardsSource() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="comp-cards"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);
  return <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Cards & Content" code={SOURCE_CODE} components={COMPONENTS} />;
}
