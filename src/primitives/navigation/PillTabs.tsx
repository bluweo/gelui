import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface PillTabsProps {
  tabs: string[];
  activeTab?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function PillTabs({
  tabs = [],
  activeTab,
  onChange,
  className = "",
  style,
}: PillTabsProps) {
  const dark = useDarkMode();
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        gap: "4px",
        padding: "4px",
        borderRadius: "var(--glass-radius-pill, 100px)",
        background: dark
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            style={{
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-ui)",
              border: "none",
              borderRadius: "var(--glass-radius-pill, 100px)",
              background: isActive
                ? dark
                  ? "#fff"
                  : "#000"
                : "transparent",
              color: isActive
                ? dark
                  ? "#000"
                  : "#fff"
                : dark
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(0,0,0,0.5)",
              cursor: "pointer",
              transition: "all 200ms ease",
              outline: "none",
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
