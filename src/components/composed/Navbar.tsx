import type { CSSProperties } from "react";
import { Avatar, Badge } from "@/primitives/data";
import { Heading } from "@/primitives/typography";
import { Button, IconButton, LinkButton } from "@/primitives/buttons";
import { Inline } from "@/primitives/layout";
import { NotificationBadge } from "@/primitives/data";

interface NavLink {
  label: string;
  href?: string;
  active?: boolean;
}

interface NavbarProps {
  brand?: string;
  links?: NavLink[];
  userName?: string;
  userAvatar?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onLogin?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function Navbar({
  brand = "GelUI",
  links = [],
  userName,
  userAvatar,
  showNotifications = true,
  notificationCount = 0,
  onLogin,
  className = "",
  style,
}: NavbarProps) {
  return (
    <nav
      className={`w-full rounded-[var(--glass-radius-sm)] bg-[var(--theme-card-bg)] border border-[var(--theme-divider)] px-5 py-3 ${className}`}
      style={style}
    >
      <Inline justify="between" align="center">
        {/* Left: Brand + Links */}
        <Inline gap="24px" align="center">
          <Heading level={4}>{brand}</Heading>
          {links.length > 0 && (
            <Inline gap="4px" align="center" className="max-[540px]:hidden">
              {links.map((link, i) => (
                <LinkButton
                  key={i}
                  className={link.active ? "font-semibold" : ""}
                >
                  {link.label}
                </LinkButton>
              ))}
            </Inline>
          )}
        </Inline>

        {/* Right: Notifications + User */}
        <Inline gap="12px" align="center">
          {showNotifications && (
            <NotificationBadge count={notificationCount}>
              <IconButton title="Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </IconButton>
            </NotificationBadge>
          )}
          {userName ? (
            <Inline gap="8px" align="center">
              <Avatar name={userName} src={userAvatar} size="sm" />
              <span className="text-[13px] font-[550] text-[var(--theme-fg)] max-[540px]:hidden" style={{ fontFamily: "var(--font-body)" }}>{userName}</span>
            </Inline>
          ) : (
            <Button variant="solid" size="sm" onClick={onLogin}>Sign In</Button>
          )}
        </Inline>
      </Inline>
    </nav>
  );
}
