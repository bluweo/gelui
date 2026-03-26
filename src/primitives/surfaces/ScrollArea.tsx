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
  const scrollbarColor = "var(--theme-fg-faint)";
  const scrollbarHover = "var(--theme-fg-subtle)";

  const scrollbarId = `scroll-area-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        ...style,
      }}
    >
      {/* Top fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "24px",
          background: "linear-gradient(to bottom, var(--theme-table-bg) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
          borderTopLeftRadius: "var(--glass-radius-sm, 10px)", borderTopRightRadius: "var(--glass-radius-sm, 10px)", borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
        }}
      />

      <div
        data-scroll-area={scrollbarId}
        style={{
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: `${scrollbarColor} transparent`,
        }}
      >
        <style>{`
          [data-scroll-area="${scrollbarId}"]::-webkit-scrollbar {
            width: 6px;
          }
          [data-scroll-area="${scrollbarId}"]::-webkit-scrollbar-track {
            background: transparent;
          }
          [data-scroll-area="${scrollbarId}"]::-webkit-scrollbar-thumb {
            background: ${scrollbarColor};
            border-radius: 3px;
          }
          [data-scroll-area="${scrollbarId}"]::-webkit-scrollbar-thumb:hover {
            background: ${scrollbarHover};
          }
        `}</style>
        {children}
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "24px",
          background: "linear-gradient(to top, var(--theme-table-bg) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
          borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: "var(--glass-radius-sm, 10px)", borderBottomLeftRadius: "var(--glass-radius-sm, 10px)",
        }}
      />
    </div>
  );
}
