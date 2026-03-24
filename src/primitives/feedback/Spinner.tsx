import { type CSSProperties } from "react";

interface SpinnerProps {
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export function Spinner({ size = "24px", className = "", style }: SpinnerProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        border: "2.5px solid rgba(0,0,0,0.1)",
        borderTopColor: "#354334",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        ...style,
      }}
    />
  );
}
