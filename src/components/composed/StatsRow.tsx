import type { ReactNode, CSSProperties } from "react";
import { Grid } from "@/primitives/layout";
import { Stat } from "@/primitives/data";

interface StatItem {
  icon?: ReactNode;
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

interface StatsRowProps {
  stats: StatItem[];
  cols?: number;
  className?: string;
  style?: CSSProperties;
}

export function StatsRow({ stats, cols, className = "", style }: StatsRowProps) {
  return (
    <Grid cols={cols || stats.length} gap="16px" className={className} style={style}>
      {stats.map((s, i) => (
        <Stat
          key={i}
          icon={s.icon}
          value={s.value}
          label={s.label}
          trend={s.trend}
          trendValue={s.trendValue}
        />
      ))}
    </Grid>
  );
}
