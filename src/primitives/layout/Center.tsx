import type { BaseProps } from "../types";

export function Center({ children, className = "", style }: BaseProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
