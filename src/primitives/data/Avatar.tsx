import { type CSSProperties } from "react";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: string;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
  style?: CSSProperties;
}

const statusColors: Record<string, string> = {
  online: "#34C759",
  offline: "#8E8E93",
  busy: "#FF3B30",
  away: "#FF9F0A",
};

export function Avatar({
  src,
  name = "",
  size = "40px",
  status,
  className = "",
  style,
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeNum = parseInt(size) || 40;
  const dotSize = `${Math.max(8, sizeNum * 0.25)}px`;

  const vars = {
    "--avatar-size": size,
    "--avatar-dot": dotSize,
  } as CSSProperties;

  return (
    <div className={`prim-avatar ${className}`} style={{ ...vars, ...style }}>
      <div
        className="prim-avatar-img"
        style={{
          background: src ? undefined : "var(--theme-fg-muted, #354334)",
          backgroundImage: src ? `url(${src})` : undefined,
          backgroundSize: src ? "cover" : undefined,
          backgroundPosition: src ? "center" : undefined,
        }}
      >
        {!src && initials}
      </div>
      {status && (
        <div
          className="prim-avatar-dot"
          style={{ background: statusColors[status] }}
        />
      )}
    </div>
  );
}
