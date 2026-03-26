import { type CSSProperties } from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  width = "100%",
  height = "16px",
  rounded = "8px",
  className = "",
  style,
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer bg-black/[0.06] ${className}`}
      style={{ width, height, borderRadius: rounded, ...style }}
    />
  );
}
