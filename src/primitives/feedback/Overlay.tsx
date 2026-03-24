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
      className={className}
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 998,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: blur ? "blur(8px)" : undefined,
        WebkitBackdropFilter: blur ? "blur(8px)" : undefined,
        transition: "opacity 200ms ease",
        ...style,
      }}
    />
  );
}
