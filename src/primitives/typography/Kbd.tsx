import { type CSSProperties } from "react";

interface KbdProps {
  children: string;
  className?: string;
  style?: CSSProperties;
}

export function Kbd({
  children,
  className = "",
  style,
}: KbdProps) {

  return (
    <kbd
      suppressHydrationWarning
      className={className}
      style={{
        display: "inline-block",
        fontSize: "12px",
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        lineHeight: 1,
        padding: "3px 6px",
        borderRadius: "4px",
        border: "1px solid var(--theme-fg-faint)",
        borderBottom: "2px solid var(--theme-fg-faint)",
        background: "var(--theme-header-bg)",
        color: "var(--theme-fg-muted)",
        boxShadow: "0 1px 0 var(--theme-divider)",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...style,
      }}
    >
      {children}
    </kbd>
  );
}
