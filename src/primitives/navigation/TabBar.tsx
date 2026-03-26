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
      className={className}
      style={{
        display: "flex",
        gap: "0",
        borderBottom: "1px solid var(--theme-divider)",
        ...style,
      }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange?.(i)}
          style={{
            paddingTop: 10, paddingBottom: 10, paddingLeft: 16, paddingRight: 16,
            fontSize: "13px",
            fontWeight: i === active ? 600 : 400,
            color:
              i === active
                ? "var(--theme-fg)"
                : "var(--theme-fg-subtle)",
            border: "none",
            borderBottom:
              i === active
                ? "2px solid var(--theme-fg)"
                : "2px solid transparent",
            background: "transparent",
            cursor: "pointer",
            transition: "all 200ms",
            marginBottom: "-1px",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
