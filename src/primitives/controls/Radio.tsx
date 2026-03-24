import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface RadioProps {
  selected?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export function Radio({
  selected = false,
  onChange,
  className = "",
  style,
}: RadioProps) {
  const dark = useDarkMode();
  const accent = dark ? "#b0c4af" : "#354334";
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
