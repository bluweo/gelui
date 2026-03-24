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
    color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
    fontFamily: "var(--font-body)",
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  };
  const itemClassName = "type-body";

  const bulletStyle: CSSProperties = {
    flexShrink: 0,
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)",
    marginTop: "7px",
    alignSelf: "flex-start",
  };

  const numberStyle: CSSProperties = {
    flexShrink: 0,
    minWidth: "18px",
    fontSize: "13px",
    fontWeight: 600,
    color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.8)",
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
        <div key={i} role="listitem" className={itemClassName} style={itemStyle}>
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
