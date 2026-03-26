import { type ReactNode, type CSSProperties } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Input({
  placeholder = "",
  value,
  onChange,
  type = "text",
  size = "md",
  error = false,
  success = false,
  disabled = false,
  icon,
  className = "",
  style,
}: InputProps) {
  const iconLeftMap = { sm: "12px", md: "16px", lg: "20px" };

  return (
    <div className="prim-input-wrap">
      {icon && (
        <span
          className="prim-input-icon"
          style={{ left: iconLeftMap[size] }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`prim-input-field prim-input-${size} ${className}`}
        data-error={error}
        data-success={success}
        style={style}
      />
      {error && (
        <span className="prim-input-status prim-input-status-error">
          &#x2717;
        </span>
      )}
      {success && !error && (
        <span className="prim-input-status prim-input-status-success">
          &#x2713;
        </span>
      )}
    </div>
  );
}
