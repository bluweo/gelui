import { type ReactNode } from "react";
import type { BaseProps } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";

interface CodeProps extends BaseProps {
  inline?: boolean;
  highlightedChildren?: ReactNode;
}

export function Code({
  children,
  className = "",
  style,
  inline = true,
  highlightedChildren,
}: CodeProps) {
  const dark = useDarkMode();
  if (inline) {
    return (
      <code
        className={className}
        style={{
          fontSize: "13px",
          fontFamily: "var(--font-mono)",
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          color: dark ? "#e0e0e0" : "inherit",
          padding: "2px 6px",
          borderRadius: "4px",
          ...style,
        }}
      >
        {children}
      </code>
    );
  }
  return (
    <pre
      className={className}
      style={{
        fontSize: "13px",
        fontFamily: "var(--font-mono)",
        background: dark ? "#0d0d0d" : "#1a1a1a",
        color: "#e0e0e0",
        padding: "16px",
        borderRadius: "var(--glass-radius-sm, 10px)",
        overflow: "auto",
        margin: 0,
        ...style,
      }}
    >
      <code>{highlightedChildren ?? children}</code>
    </pre>
  );
}
