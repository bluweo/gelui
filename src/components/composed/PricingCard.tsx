import type { CSSProperties } from "react";
import { Card, Divider } from "@/primitives/surfaces";
import { Heading, Text, Caption, Overline } from "@/primitives/typography";
import { Badge } from "@/primitives/data";
import { Button } from "@/primitives/buttons";
import { Stack } from "@/primitives/layout";

interface PricingCardProps {
  plan: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  ctaLabel?: string;
  onSelect?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function PricingCard({
  plan,
  price,
  period = "/mo",
  description,
  features,
  popular,
  ctaLabel = "Get Started",
  onSelect,
  className = "",
  style,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-[var(--glass-radius-sm)] border p-6 flex flex-col ${
        popular
          ? "bg-[var(--theme-fg)] text-[var(--theme-bg-solid)] border-transparent"
          : "bg-[var(--theme-card-bg)] border-[var(--theme-divider)] text-[var(--theme-fg)]"
      } ${className}`}
      style={style}
    >
      <Stack gap="20px" className="flex-1">
        <div>
          {popular && <Badge variant="success" className="mb-2">Most Popular</Badge>}
          <Overline className={popular ? "text-white/60" : ""}>{plan}</Overline>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[36px] font-[700] leading-none" style={{ fontFamily: "var(--font-heading)" }}>{price}</span>
            <Caption className={popular ? "text-white/50" : "text-[var(--theme-fg-muted)]"}>{period}</Caption>
          </div>
          {description && (
            <Text className={`mt-2 ${popular ? "text-white/70" : "text-[var(--theme-fg-muted)]"}`}>{description}</Text>
          )}
        </div>

        <Divider className={popular ? "opacity-20" : ""} />

        <ul className="flex flex-col gap-3 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px]" style={{ fontFamily: "var(--font-body)" }}>
              <svg className={`w-4 h-4 mt-0.5 shrink-0 ${popular ? "text-green-400" : "text-green-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className={popular ? "text-white/80" : ""}>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={popular ? "glass" : "solid"}
          size="lg"
          fullWidth
          onClick={onSelect}
        >
          {ctaLabel}
        </Button>
      </Stack>
    </div>
  );
}
