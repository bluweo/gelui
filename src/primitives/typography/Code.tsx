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
      <code className={`prim-code-inline ${className}`} style={style}>
        {children}
      </code>
    );
  }
  return (
    <pre className={`prim-code-block ${className}`} style={style}>
      <code>{highlightedChildren ?? children}</code>
    </pre>
  );
}
