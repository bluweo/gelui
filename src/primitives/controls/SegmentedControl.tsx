import { type CSSProperties } from "react";

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
      <div
        className={`gel-glass ${className}`}
        style={{
          display: "inline-flex",
          borderRadius: "9999px",
          padding: "4px",
          gap: "4px",
          alignSelf: "flex-start",
          background: "var(--theme-header-bg)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.4)",
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
                  ? "var(--theme-table-bg)"
                  : "transparent",
                color: isActive
                  ? "var(--theme-fg)"
                  : "var(--theme-fg-subtle)",
                boxShadow: isActive
                  ? "0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)"
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
        background: "var(--theme-header-bg)",
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
            left: `calc(3px + ${Math.round((activeIdx / count) * 10000) / 100}%)`,
            width: `calc(${Math.round(10000 / count) / 100}% - 3px)`,
            borderRadius: "var(--glass-radius-pill, 100px)",
            background: "var(--theme-bg-solid)",
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
                ? "var(--theme-fg-on-solid)"
                : "var(--theme-fg-muted)",
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
