import { type CSSProperties } from "react";

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
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        gap: "4px",
        padding: "4px",
        borderRadius: "var(--glass-radius-pill, 100px)",
        background: "var(--theme-header-bg)",
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
                ? "var(--theme-bg-solid)"
                : "transparent",
              color: isActive
                ? "var(--theme-fg-on-solid)"
                : "var(--theme-fg-muted)",
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
