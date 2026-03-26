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
    <blockquote className={`prim-blockquote ${className}`} style={style}>
      <div className="prim-blockquote-body type-body">
        {children}
      </div>
      {(author || source) && (
        <footer className="prim-blockquote-footer type-caption">
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
