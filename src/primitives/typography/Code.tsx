import { type ReactNode } from "react";
import type { BaseProps } from "../types";

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
  if (inline) {
    return (
      <code
        className={className}
        style={{
          fontSize: "var(--type-code-size, 13px)",
          fontWeight: "var(--type-code-weight, 500)" as any,
          lineHeight: "var(--type-code-lh, 1.5)",
          fontFamily: "var(--font-mono)",
          background: "var(--theme-divider)",
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
        background: "#1a1a1a",
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
