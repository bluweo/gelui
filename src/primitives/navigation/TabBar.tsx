import { type CSSProperties } from "react";

interface TabBarProps {
  tabs?: string[];
  active?: number;
  onChange?: (i: number) => void;
  className?: string;
  style?: CSSProperties;
}

export function TabBar({
  tabs = ["Tab 1", "Tab 2", "Tab 3"],
  active = 0,
  onChange,
  className = "",
  style,
}: TabBarProps) {
  return (
    <div
      className={`flex gap-0 border-b border-[var(--theme-divider)] ${className}`}
      style={style}
    >
      {tabs.map((tab, i) => {
        const isActive = i === active;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(i)}
            data-active={isActive || undefined}
            className={[
              "py-2.5 px-4 text-[13px] border-none bg-transparent cursor-pointer",
              "transition-all duration-200 -mb-[3px] rounded-t-[8px]",
              "hover:text-[var(--theme-fg)] hover:bg-[var(--theme-fg)]/[0.05]",
              isActive
                ? "font-semibold text-[var(--theme-fg)] shadow-[inset_0_-3px_0_var(--theme-fg)]"
                : "font-normal text-[var(--theme-fg-subtle)] shadow-none",
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
