import { type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface FormGroupProps {
  label: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function FormGroup({
  label,
  htmlFor,
  error,
  helperText,
  required = false,
  children,
  className = "",
  style,
}: FormGroupProps) {
  const dark = useDarkMode();

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      <label
        htmlFor={htmlFor}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          fontFamily: "var(--font-ui)",
          color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "center",
          gap: "2px",
        }}
      >
        {label}
        {required && (
          <span
            style={{
              color: "#FF3B30",
              fontWeight: 500,
              marginLeft: "2px",
            }}
          >
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontSize: "12px",
            color: "#FF3B30",
            fontFamily: "var(--font-body)",
            lineHeight: 1.4,
          }}
        >
          {error}
        </span>
      )}
      {!error && helperText && (
        <span
          style={{
            fontSize: "12px",
            color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            fontFamily: "var(--font-body)",
            lineHeight: 1.4,
          }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
