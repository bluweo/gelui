import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface RadioProps {
  selected?: boolean;
  onChange?: (v: boolean) => void;
  variant?: "flat" | "gel";
  className?: string;
  style?: CSSProperties;
}

export function Radio({
  selected = false,
  onChange,
  variant = "flat",
  className = "",
  style,
}: RadioProps) {
  const dark = useDarkMode();
  const accent = dark ? "#b0c4af" : "#354334";

  if (variant === "gel") {
    return (
      <button
        className={`gel-glass ${className}`}
        onClick={() => onChange?.(!selected)}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: selected ? "2px solid #354334" : "1px solid rgba(255,255,255,0.6)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 200ms",
          padding: 0,
          background:
            "linear-gradient(165deg, rgba(255,255,255,0.7) 0%, rgba(240,240,244,0.5) 100%)",
          boxShadow: `
            0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06),
            inset 0 2px 3px rgba(255,255,255,0.8),
            inset 0 -2px 3px rgba(0,0,0,0.04),
            inset 2px 0 3px rgba(255,255,255,0.4),
            inset -2px 0 3px rgba(0,0,0,0.03)
          `,
          ...style,
        }}
      >
        {selected && (
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background:
                "linear-gradient(165deg, rgba(53,67,52,0.95) 0%, rgba(53,67,52,0.75) 100%)",
              boxShadow:
                "inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.3)",
            }}
          />
        )}
      </button>
    );
  }

  // flat (default)
  return (
    <button
      className={className}
      onClick={() => onChange?.(!selected)}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: `2px solid ${selected ? accent : dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"}`,
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 200ms",
        padding: 0,
        ...style,
      }}
    >
      {selected && (
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: accent,
          }}
        />
      )}
    </button>
  );
}
