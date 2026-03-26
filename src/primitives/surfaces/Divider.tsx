import { type CSSProperties } from "react";

interface DividerProps {
  variant?:
    | "default"
    | "bold"
    | "dashed"
    | "gradient"
    | "glass"
    | "etched"
    | "groove"
    | "ridge"
    | "frostedSlit";
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Divider({
  variant = "default",
  label,
  className = "",
  style,
}: DividerProps) {
  if (label) {
    return (
      <div
        className={`flex items-center gap-3 ${className}`}
        style={style}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "var(--theme-divider)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            opacity: 0.4,
            textTransform: "uppercase" as const,
          }}
        >
          {label}
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "var(--theme-divider)",
          }}
        />
      </div>
    );
  }

  const styles: Record<string, CSSProperties> = {
    default: { height: "1px", background: "var(--theme-divider)" },
    bold: { height: "2px", background: "var(--theme-divider)" },
    dashed: {
      height: "1px",
      borderBottom: "1px dashed var(--theme-divider)",
      background: "transparent",
    },
    gradient: {
      height: "1px",
      background: "linear-gradient(90deg, transparent, var(--theme-divider), transparent)",
    },
    glass: {
      height: "2px",
      background: "linear-gradient(to bottom, var(--theme-divider), transparent)",
    },
    etched: {
      height: "0px",
      boxShadow: "0 -1px 0 var(--theme-divider), 0 1px 0 var(--theme-divider)",
    },
    groove: {
      height: "0px",
      boxShadow: "0 -1px 0 var(--theme-divider), 0 1px 0 var(--theme-divider), 0 -2px 0 var(--theme-divider), 0 2px 0 var(--theme-divider)",
    },
    ridge: {
      height: "0px",
      boxShadow: "0 -1px 0 var(--theme-divider), 0 1px 0 var(--theme-divider), 0 -2px 0 var(--theme-divider), 0 2px 0 var(--theme-divider)",
    },
    frostedSlit: {
      height: "1px",
      background: "linear-gradient(90deg, transparent 5%, var(--theme-divider) 30%, var(--theme-divider) 70%, transparent 95%)",
      boxShadow: "0 1px 2px var(--theme-divider)",
    },
  };

  return (
    <div
      className={className}
      style={{ width: "100%", ...styles[variant], ...style }}
    />
  );
}
