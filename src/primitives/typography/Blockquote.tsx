import { type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface BlockquoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
  className?: string;
  style?: CSSProperties;
}

export function Blockquote({
  children,
  author,
  source,
  className = "",
  style,
}: BlockquoteProps) {
  const dark = useDarkMode();

  return (
    <blockquote
      className={className}
      style={{
        margin: 0,
        padding: "12px 0 12px 20px",
        borderLeft: "4px solid #007AFF",
        ...style,
      }}
    >
      <div
        style={{
          fontStyle: "italic",
          fontSize: "14px",
          lineHeight: 1.6,
          color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
          fontFamily: "var(--font-ui)",
        }}
      >
        {children}
      </div>
      {(author || source) && (
        <footer
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
            fontFamily: "var(--font-ui)",
            fontStyle: "normal",
          }}
        >
          {author && <span>&mdash; {author}</span>}
          {author && source && <span>, </span>}
          {source && (
            <cite style={{ fontStyle: "italic" }}>{source}</cite>
          )}
        </footer>
      )}
    </blockquote>
  );
}
