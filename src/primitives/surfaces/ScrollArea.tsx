import { type ReactNode, type CSSProperties } from "react";

interface ScrollAreaProps {
  maxHeight: number | string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function ScrollArea({
  maxHeight,
  children,
  className = "",
  style,
}: ScrollAreaProps) {
  const mh = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div
      className={`prim-scroll-area ${className}`}
      style={{ "--scroll-mh": mh, ...style } as CSSProperties}
    >
      {/* Top fade */}
      <div className="prim-scroll-fade-top" />

      <div className="prim-scroll-inner">
        {children}
      </div>

      {/* Bottom fade */}
      <div className="prim-scroll-fade-bottom" />
    </div>
  );
}
