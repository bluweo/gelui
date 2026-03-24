import { type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();

  const scrollbarColor = dark
    ? "rgba(255,255,255,0.2)"
    : "rgba(0,0,0,0.15)";
  const scrollbarHover = dark
    ? "rgba(255,255,255,0.35)"
    : "rgba(0,0,0,0.25)";
  const fadeTop = dark
    ? "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 24px)"
    : "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, transparent 24px)";
  const fadeBottom = dark
    ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 24px)"
    : "linear-gradient(to top, rgba(255,255,255,0.8) 0%, transparent 24px)";

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
          background: fadeTop,
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "var(--glass-radius-sm, 10px) var(--glass-radius-sm, 10px) 0 0",
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
          background: fadeBottom,
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "0 0 var(--glass-radius-sm, 10px) var(--glass-radius-sm, 10px)",
        }}
      />
    </div>
  );
}
