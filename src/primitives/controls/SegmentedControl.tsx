import type { CSSProperties } from "react";

interface SegmentedControlProps {
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  variant?: "flat" | "gel";
  className?: string;
  style?: CSSProperties;
}

export function SegmentedControl({
  options = [],
  value,
  onChange,
  variant = "flat",
  className = "",
  style,
}: SegmentedControlProps) {
  const activeIdx = options.indexOf(value ?? "");
  const count = options.length || 1;

  if (variant === "gel") {
    return (
      <div className={`prim-seg-gel gel-glass ${className}`} style={style}>
        {options.map((s) => {
          const isActive = value === s;
          return (
            <button
              key={s}
              onClick={() => onChange?.(s)}
              className="prim-seg-gel-btn"
              data-active={isActive}
            >
              {s}
            </button>
          );
        })}
      </div>
    );
  }

  // flat (default)
  const calcLeft = `calc(3px + ${Math.round((activeIdx / count) * 10000) / 100}%)`;
  const calcWidth = `calc(${Math.round(10000 / count) / 100}% - 3px)`;

  return (
    <div className={`prim-seg-flat ${className}`} style={style}>
      {/* Sliding active indicator */}
      {activeIdx >= 0 && (
        <div
          className="prim-seg-flat-pill"
          style={
            {
              "--prim-seg-offset": calcLeft,
              "--prim-seg-width": calcWidth,
            } as CSSProperties
          }
        />
      )}
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange?.(opt)}
            className="prim-seg-flat-btn"
            data-active={isActive}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
