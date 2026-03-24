import { type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface ListProps {
  items: (string | ReactNode)[];
  ordered?: boolean;
  spacing?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

export function List({
  items,
  ordered = false,
  spacing = "md",
  className = "",
  style,
}: ListProps) {
  const dark = useDarkMode();

  const spacingMap: Record<string, string> = {
    sm: "4px",
    md: "8px",
    lg: "14px",
  };

  const itemStyle: CSSProperties = {
    fontSize: "14px",
    lineHeight: 1.5,
    color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
    fontFamily: "var(--font-ui)",
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  };

  const bulletStyle: CSSProperties = {
    flexShrink: 0,
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#007AFF",
    marginTop: "7px",
    alignSelf: "flex-start",
  };

  const numberStyle: CSSProperties = {
    flexShrink: 0,
    minWidth: "18px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#007AFF",
  };

  return (
    <div
      className={className}
      role="list"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacingMap[spacing],
        margin: 0,
        padding: 0,
        listStyle: "none",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <div key={i} role="listitem" style={itemStyle}>
          {ordered ? (
            <span style={numberStyle}>{i + 1}.</span>
          ) : (
            <span style={bulletStyle} />
          )}
          <span style={{ flex: 1 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}
