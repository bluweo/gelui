import { useState, type CSSProperties } from "react";

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
  const [loaded, setLoaded] = useState(false);
  const showSkeleton = skeleton && !loaded;

  return (
    <div
      className={[
        "relative inline-block overflow-hidden border border-[var(--theme-divider)]",
        rounded ? "rounded-[var(--glass-radius,16px)]" : "rounded-none",
        className,
      ].join(" ")}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
    >
      {showSkeleton && (
        <div
          className="absolute inset-0 animate-[shimmer_1.5s_infinite]"
          style={{
            background: "linear-gradient(90deg, var(--theme-header-bg) 25%, var(--theme-fg-faint) 50%, var(--theme-header-bg) 75%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={[
          "block w-full h-full transition-opacity duration-300",
          showSkeleton ? "opacity-0" : "opacity-100",
        ].join(" ")}
        style={{ objectFit }}
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
