import type { BaseProps } from "../types";

export function Box({ children, className = "", style }: BaseProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
