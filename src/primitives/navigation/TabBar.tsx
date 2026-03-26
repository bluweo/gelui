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
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange?.(i)}
          data-active={i === active || undefined}
          className={[
            "py-2.5 px-4 text-[13px] border-none bg-transparent cursor-pointer",
            "transition-all duration-200 -mb-px border-b-2",
            i === active
              ? "font-semibold text-[var(--theme-fg)] border-b-[var(--theme-fg)]"
              : "font-normal text-[var(--theme-fg-subtle)] border-b-transparent",
          ].join(" ")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
