import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: string;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
  style?: CSSProperties;
}

export function Avatar({
  src,
  name = "",
  size = "40px",
  status,
  className = "",
  style,
}: AvatarProps) {
  const dark = useDarkMode();
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const statusColors: Record<string, string> = {
    online: "#34C759",
    offline: "#8E8E93",
    busy: "#FF3B30",
    away: "#FF9F0A",
  };

  const sizeNum = parseInt(size) || 40;
  const dotSize = Math.max(8, sizeNum * 0.25);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: src ? undefined : dark ? "#4a5a49" : "#354334",
          backgroundImage: src ? `url(${src})` : undefined,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: `calc(${size} * 0.35)`,
          fontWeight: 600,
          overflow: "hidden",
        }}
      >
        {!src && initials}
      </div>
      {status && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: "50%",
            background: statusColors[status],
            border: `2px solid ${dark ? "#1a1a1a" : "#fff"}`,
          }}
        />
      )}
    </div>
  );
}
