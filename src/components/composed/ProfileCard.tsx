import type { CSSProperties } from "react";
import { Avatar, Badge } from "@/primitives/data";
import { Heading, Caption } from "@/primitives/typography";
import { Button } from "@/primitives/buttons";
import { Stack, Inline } from "@/primitives/layout";

interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;
  status?: "active" | "away" | "offline";
  onEdit?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function ProfileCard({
  name,
  role,
  avatar,
  status = "active",
  onEdit,
  className = "",
  style,
}: ProfileCardProps) {
  const statusMap: Record<string, string> = { active: "success", away: "warning", offline: "neutral" };
  const variant = statusMap[status] || "neutral";

  return (
    <div
      className={`rounded-[var(--glass-radius-sm)] bg-[var(--theme-card-bg)] border border-[var(--theme-divider)] p-5 ${className}`}
      style={style}
    >
      <Stack gap="16px">
        <Inline gap="12px" align="center">
          <Avatar name={name} src={avatar} size="md" />
          <Stack gap="2px" className="flex-1 min-w-0">
            <Heading level={4}>{name}</Heading>
            <Caption className="text-[var(--theme-fg-muted)]">{role}</Caption>
          </Stack>
          <Badge variant={variant}>{status}</Badge>
        </Inline>
        <Button variant="ghost" size="sm" fullWidth onClick={onEdit}>
          Edit Profile
        </Button>
      </Stack>
    </div>
  );
}
