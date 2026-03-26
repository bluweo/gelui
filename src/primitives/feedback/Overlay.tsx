import { type CSSProperties } from "react";

interface OverlayProps {
  open: boolean;
  onClick?: () => void;
  blur?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Overlay({
  open,
  onClick,
  blur = true,
  className = "",
  style,
}: OverlayProps) {
  if (!open) return null;
  return (
    <div
      className={`prim-overlay ${blur ? "prim-overlay-blur" : ""} ${className}`}
      onClick={onClick}
      style={style}
    />
  );
}
