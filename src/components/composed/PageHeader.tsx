import type { ReactNode, CSSProperties } from "react";
import { Heading, Text, Overline } from "@/primitives/typography";
import { Breadcrumb } from "@/primitives/navigation";
import { Button } from "@/primitives/buttons";
import { Stack, Inline } from "@/primitives/layout";

interface PageHeaderProps {
  title: string;
  overline?: string;
  description?: string;
  breadcrumbs?: string[];
  action?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function PageHeader({
  title,
  overline,
  description,
  breadcrumbs,
  action,
  actionLabel,
  onAction,
  className = "",
  style,
}: PageHeaderProps) {
  return (
    <div className={`w-full ${className}`} style={style}>
      <Stack gap="12px">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} />
        )}
        <Inline justify="between" align="start" className="max-[540px]:flex-col max-[540px]:gap-3">
          <div>
            {overline && <Overline className="text-[var(--theme-fg-muted)]">{overline}</Overline>}
            <Heading level={1}>{title}</Heading>
            {description && <Text className="text-[var(--theme-fg-muted)] mt-1">{description}</Text>}
          </div>
          {action || (actionLabel && (
            <Button variant="solid" onClick={onAction}>{actionLabel}</Button>
          ))}
        </Inline>
      </Stack>
    </div>
  );
}
