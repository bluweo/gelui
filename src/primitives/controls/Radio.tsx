import { type CSSProperties } from "react";

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
  if (variant === "gel") {
    return (
      <button
        className={`prim-radio-gel gel-glass ${className}`}
        onClick={() => onChange?.(!selected)}
        data-selected={selected}
        style={style}
      >
        {selected && (
          <div className="prim-radio-gel-dot" />
        )}
      </button>
    );
  }

  // flat (default)
  return (
    <button
      className={`prim-radio-flat ${className}`}
      onClick={() => onChange?.(!selected)}
      data-selected={selected}
      style={style}
    >
      {selected && (
        <div className="prim-radio-flat-dot" />
      )}
    </button>
  );
}
