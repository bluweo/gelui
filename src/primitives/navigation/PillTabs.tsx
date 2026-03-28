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
      className={`inline-flex gap-1 p-1 rounded-[var(--glass-radius-pill,100px)] bg-[var(--theme-header-bg)] ${className}`}
      style={style}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            data-active={isActive || undefined}
            className={[
              "py-1.5 px-3.5 text-[13px] font-semibold font-[family-name:var(--font-ui)]",
              "border-none rounded-[var(--glass-radius-pill,100px)]",
              "cursor-pointer transition-all duration-200 outline-none whitespace-nowrap",
              isActive
                ? "bg-[var(--theme-bg-solid)] text-[var(--theme-fg-on-solid)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                : "bg-transparent text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)] hover:bg-[var(--theme-fg)]/[0.06]",
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
