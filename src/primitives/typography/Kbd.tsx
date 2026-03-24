import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();

  return (
    <kbd
      className={className}
      style={{
        display: "inline-block",
        fontSize: "12px",
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        lineHeight: 1,
        padding: "3px 6px",
        borderRadius: "4px",
        border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
        borderBottom: `2px solid ${dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"}`,
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
        color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
        boxShadow: dark
          ? "0 1px 0 rgba(255,255,255,0.06)"
          : "0 1px 0 rgba(0,0,0,0.08)",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...style,
      }}
    >
      {children}
    </kbd>
  );
}
