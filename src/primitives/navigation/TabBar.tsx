import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();
  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: "0",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        ...style,
      }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange?.(i)}
          style={{
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: i === active ? 600 : 400,
            color:
              i === active
                ? dark
                  ? "#fff"
                  : "#000"
                : dark
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.4)",
            border: "none",
            borderBottom:
              i === active
                ? `2px solid ${dark ? "#fff" : "#000"}`
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
