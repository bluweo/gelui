import { type ReactNode, type CSSProperties, useState, useRef } from "react";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const tooltipPositionClasses: Record<string, string> = {
  top: "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
  bottom: "top-[calc(100%+8px)] left-1/2 -translate-x-1/2",
  left: "right-[calc(100%+8px)] top-1/2 -translate-y-1/2",
  right: "left-[calc(100%+8px)] top-1/2 -translate-y-1/2",
};

const arrowPositionClasses: Record<string, string> = {
  top: "-bottom-1 left-1/2 -translate-x-1/2 rotate-45",
  bottom: "-top-1 left-1/2 -translate-x-1/2 rotate-45",
  left: "-right-1 top-1/2 -translate-y-1/2 rotate-45",
  right: "-left-1 top-1/2 -translate-y-1/2 rotate-45",
};

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

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      style={style}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-[1000] pointer-events-none whitespace-nowrap ${tooltipPositionClasses[position]}`}
        >
          <div className="relative py-1.5 px-2.5 text-xs font-medium font-[var(--font-ui)] rounded-[var(--glass-radius-sm,8px)] bg-[var(--theme-bg-solid)] backdrop-blur-[12px] text-[var(--theme-fg-on-solid)] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            {content}
            <div
              className={`absolute w-2 h-2 bg-[var(--theme-bg-solid)] ${arrowPositionClasses[position]}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
