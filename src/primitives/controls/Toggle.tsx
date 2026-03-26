import { type CSSProperties } from "react";

interface ToggleProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  variant?: "flat" | "gel";
  className?: string;
  style?: CSSProperties;
}

export function Toggle({
  checked = false,
  onChange,
  variant = "flat",
  className = "",
  style,
}: ToggleProps) {
  if (variant === "gel") {
    return (
      <button
        className={`prim-toggle-gel gel-glass ${className}`}
        onClick={() => onChange?.(!checked)}
        data-checked={checked}
        style={style}
      >
        <div className="prim-toggle-gel-thumb" data-checked={checked} />
      </button>
    );
  }

  // flat (default)
  return (
    <button
      className={`prim-toggle-flat ${className}`}
      onClick={() => onChange?.(!checked)}
      data-checked={checked}
      style={style}
    >
      <div className="prim-toggle-flat-thumb" />
    </button>
  );
}
