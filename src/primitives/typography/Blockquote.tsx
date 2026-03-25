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
      suppressHydrationWarning
      className={className}
      style={{
        margin: 0,
        padding: "12px 0 12px 20px",
        borderLeft: `4px solid ${dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)"}`,
        ...style,
      }}
    >
      <div
        className="type-body"
        style={{
          fontStyle: "italic",
          color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
          fontFamily: "var(--font-body)",
        }}
      >
        {children}
      </div>
      {(author || source) && (
        <footer
          className="type-caption"
          style={{
            marginTop: "8px",
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
