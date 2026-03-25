import { type ReactNode } from "react";
import type { BaseProps } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";

interface CodeProps extends BaseProps {
  inline?: boolean;
  highlightedChildren?: ReactNode;
}

/* ─── Auto-color detection for inline code ─── */
function getInlineColor(text: string, dark: boolean): string {
  const s = typeof text === "string" ? text.trim() : "";

  // <Component> or <tag> → blue
  if (s.startsWith("<") && s.endsWith(">")) {
    return dark ? "#7cc4fa" : "#0969da";
  }

  // "string" or 'string' → green
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return dark ? "#a5d6a7" : "#1a7f37";
  }

  // variant="value" or prop={value} → treat as prop (orange for whole thing)
  if (s.includes('="') || s.includes("={")) {
    return dark ? "#ffb74d" : "#bf5700";
  }

  // --css-variable → orange
  if (s.startsWith("--")) {
    return dark ? "#ffb74d" : "#bf5700";
  }

  // @/path/to/module → muted purple
  if (s.startsWith("@/")) {
    return dark ? "#b39ddb" : "#6f42c1";
  }

  // functionName() → purple
  if (s.endsWith("()") || s.endsWith("();")) {
    return dark ? "#ce93d8" : "#8250df";
  }

  // keyword-like: import, export, const, let, var, return, true, false
  if (/^(import|export|const|let|var|return|function|true|false|null|undefined)$/.test(s)) {
    return dark ? "#ce93d8" : "#8250df";
  }

  // Default mono color
  return dark ? "#e0e0e0" : "#d63384";
}

function renderInlineHighlighted(children: ReactNode, dark: boolean): ReactNode {
  if (typeof children !== "string") return children;
  const color = getInlineColor(children, dark);
  return <span style={{ color }}>{children}</span>;
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
        suppressHydrationWarning
        className={className}
        style={{
          fontSize: "var(--type-code-size, 13px)",
          fontWeight: "var(--type-code-weight, 500)" as any,
          lineHeight: "var(--type-code-lh, 1.5)",
          fontFamily: "var(--font-mono)",
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          padding: "2px 6px",
          borderRadius: "4px",
          ...style,
        }}
      >
        {renderInlineHighlighted(children, dark)}
      </code>
    );
  }
  return (
    <pre
      suppressHydrationWarning
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
