import { type ReactNode, type CSSProperties } from "react";

interface ListProps {
  items: (string | ReactNode)[];
  ordered?: boolean;
  spacing?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

const spacingMap: Record<string, string> = {
  sm: "4px",
  md: "8px",
  lg: "14px",
};

export function List({
  items,
  ordered = false,
  spacing = "md",
  className = "",
  style,
}: ListProps) {
  return (
    <div
      className={`prim-list ${className}`}
      role="list"
      style={{ "--list-gap": spacingMap[spacing], ...style } as CSSProperties}
    >
      {items.map((item, i) => (
        <div key={i} role="listitem" className="prim-list-item type-body">
          {ordered ? (
            <span className="prim-list-number">{i + 1}.</span>
          ) : (
            <span className="prim-list-bullet" />
          )}
          <span className="flex-1">{item}</span>
        </div>
      ))}
    </div>
  );
}
