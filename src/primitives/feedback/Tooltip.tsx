import { type ReactNode, type CSSProperties, useState, useRef } from "react";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Tooltip({
  content,
  position = "top",
  children,
  className = "",
  style,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), 300);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const positionStyles: Record<string, CSSProperties> = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
  };

  const arrowPositions: Record<string, CSSProperties> = {
    top: {
      bottom: "-4px",
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
    bottom: {
      top: "-4px",
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
    left: {
      right: "-4px",
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
    right: {
      left: "-4px",
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
  };

  return (
    <div
      className={className}
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{
        position: "relative",
        display: "inline-flex",
        ...style,
      }}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "absolute",
            ...positionStyles[position],
            zIndex: 1000,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "6px 10px",
              fontSize: "12px",
              fontWeight: 500,
              fontFamily: "var(--font-ui)",
              borderRadius: "var(--glass-radius-sm, 8px)",
              background: "var(--theme-bg-solid)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "var(--theme-fg-on-solid)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {content}
            <div
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                background: "var(--theme-bg-solid)",
                ...arrowPositions[position],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
