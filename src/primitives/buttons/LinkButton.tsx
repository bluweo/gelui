import { useState } from "react";
import type { BaseProps } from "../types";

interface LinkButtonProps extends BaseProps {
  href?: string;
  arrow?: boolean;
  underline?: boolean;
  onClick?: () => void;
}

export function LinkButton({
  children,
  href,
  arrow = false,
  underline = false,
  className = "",
  style,
  onClick,
}: LinkButtonProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={className}
      onClick={onClick ?? (() => href && (window.location.href = href))}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "var(--font-ui)",
        color: "var(--theme-fg)",
        textDecoration: underline ? "underline" : "none",
        textUnderlineOffset: "3px",
        opacity: hovered ? 0.7 : 1,
        transition: "opacity 200ms ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        ...style,
      }}
    >
      {children}
      {arrow && (
        <span
          style={{
            transition: "transform 200ms ease",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            display: "inline-block",
          }}
        >
          &rarr;
        </span>
      )}
    </button>
  );
}
