import { useState, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  skeleton?: boolean;
  objectFit?: "cover" | "contain" | "fill";
  className?: string;
  style?: CSSProperties;
}

export function Image({
  src,
  alt,
  width,
  height,
  rounded = false,
  skeleton = false,
  objectFit = "cover",
  className = "",
  style,
}: ImageProps) {
  const dark = useDarkMode();
  const [loaded, setLoaded] = useState(false);
  const showSkeleton = skeleton && !loaded;

  const borderRadius = rounded ? "var(--glass-radius, 16px)" : "0px";

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius,
        overflow: "hidden",
        border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
        ...style,
      }}
    >
      {showSkeleton && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: dark
              ? "linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)"
              : "linear-gradient(90deg, rgba(0,0,0,0.04) 25%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.04) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit,
          opacity: showSkeleton ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
