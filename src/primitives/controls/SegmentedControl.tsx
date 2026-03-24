import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface SegmentedControlProps {
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function SegmentedControl({
  options = [],
  value,
  onChange,
  className = "",
  style,
}: SegmentedControlProps) {
  const dark = useDarkMode();
  const activeIdx = options.indexOf(value ?? "");
  const count = options.length || 1;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        position: "relative",
        borderRadius: "var(--glass-radius-pill, 100px)",
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.06)",
        padding: "3px",
        ...style,
      }}
    >
      {/* Sliding active indicator */}
      {activeIdx >= 0 && (
        <div
          style={{
            position: "absolute",
            top: "3px",
            bottom: "3px",
            left: `calc(3px + ${(activeIdx / count) * 100}%)`,
            width: `calc(${100 / count}% - 3px)`,
            borderRadius: "var(--glass-radius-pill, 100px)",
            background: dark ? "#fff" : "#000",
            transition: "left 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 0,
          }}
        />
      )}
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange?.(opt)}
            style={{
              position: "relative",
              zIndex: 1,
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-ui)",
              border: "none",
              borderRadius: "var(--glass-radius-pill, 100px)",
              background: "transparent",
              color: isActive
                ? dark
                  ? "#000"
                  : "#fff"
                : dark
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(0,0,0,0.5)",
              cursor: "pointer",
              transition: "color 200ms ease",
              outline: "none",
              flex: 1,
              whiteSpace: "nowrap",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
