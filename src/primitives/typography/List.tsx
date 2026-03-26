import { type ReactNode, type CSSProperties } from "react";

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

  const spacingMap: Record<string, string> = {
    sm: "4px",
    md: "8px",
    lg: "14px",
  };

  const itemStyle: CSSProperties = {
    color: "var(--theme-fg-muted)",
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
    background: "var(--theme-fg-muted)",
    marginTop: "7px",
    alignSelf: "flex-start",
  };

  const numberStyle: CSSProperties = {
    flexShrink: 0,
    minWidth: "18px",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--theme-fg-muted)",
  };

  return (
    <div
      suppressHydrationWarning
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
