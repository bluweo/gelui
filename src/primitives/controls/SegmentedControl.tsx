import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();
  const activeIdx = options.indexOf(value ?? "");
  const count = options.length || 1;

  if (variant === "gel") {
    return (
      <div
        className={`gel-glass ${className}`}
        style={{
          display: "inline-flex",
          borderRadius: "9999px",
          padding: "4px",
          gap: "4px",
          alignSelf: "flex-start",
          background: dark
            ? "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 100%)",
          boxShadow: dark
            ? "inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.05)"
            : "inset 0 1px 3px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.4)",
          ...style,
        }}
      >
        {options.map((s) => {
          const isActive = value === s;
          return (
            <button
              key={s}
              onClick={() => onChange?.(s)}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: "9999px",
                cursor: "pointer",
                border: "none",
                transition: "all 200ms",
                background: isActive
                  ? dark
                    ? "linear-gradient(165deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)"
                    : "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(240,240,244,0.85) 100%)"
                  : "transparent",
                color: isActive
                  ? dark
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(0,0,0,0.85)"
                  : dark
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(0,0,0,0.4)",
                boxShadow: isActive
                  ? dark
                    ? "0 2px 6px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.1)"
                    : "0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06), inset 0 1px 2px rgba(255,255,255,0.8)"
                  : "none",
              }}
            >
              {s}
            </button>
          );
        })}
      </div>
    );
  }

  // flat (default)
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
