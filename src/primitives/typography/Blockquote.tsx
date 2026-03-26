import { type ReactNode, type CSSProperties } from "react";

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

  return (
    <blockquote
      suppressHydrationWarning
      className={className}
      style={{
        margin: 0,
        paddingTop: 12, paddingRight: 0, paddingBottom: 12, paddingLeft: 20,
        borderLeft: "4px solid var(--theme-fg-muted)",
        ...style,
      }}
    >
      <div
        className="type-body"
        style={{
          fontStyle: "italic",
          color: "var(--theme-fg-muted)",
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
            color: "var(--theme-fg-subtle)",
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
