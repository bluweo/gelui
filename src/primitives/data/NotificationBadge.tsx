import type { ReactNode, CSSProperties } from "react";

interface NotificationBadgeProps {
  count?: number;
  max?: number;
  dot?: boolean;
  color?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function NotificationBadge({
  count,
  max = 99,
  dot = false,
  color = "#FF3B30",
  children,
  className = "",
  style,
}: NotificationBadgeProps) {
  const showBadge = dot || (count !== undefined && count > 0);
  const display = dot ? "" : count !== undefined && count > max ? `${max}+` : `${count}`;

  return (
    <span className={`prim-notif-badge ${className}`} style={style}>
      {children}
      {showBadge && (
        <span
          className={`prim-notif-badge-count ${dot ? "prim-notif-badge-dot" : ""}`}
          style={{ "--notif-color": color } as CSSProperties}
        >
          {!dot && display}
        </span>
      )}
    </span>
  );
}
