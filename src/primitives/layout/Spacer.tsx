import { type CSSProperties } from "react";

interface SpacerProps {
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export function Spacer({ size = "16px", className = "", style }: SpacerProps) {
  return (
    <div className={className} style={{ height: size, width: "100%", ...style }} />
  );
}
