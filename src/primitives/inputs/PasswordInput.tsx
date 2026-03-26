import { type CSSProperties, useState } from "react";
import { Input } from "./Input";

interface PasswordInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  showToggle?: boolean;
  className?: string;
  style?: CSSProperties;
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 4.5C5.5 4.5 2 10 2 10s3.5 5.5 8 5.5 8-5.5 8-5.5-3.5-5.5-8-5.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 4.5C5.5 4.5 2 10 2 10s3.5 5.5 8 5.5 8-5.5 8-5.5-3.5-5.5-8-5.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 17L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PasswordInput({
  placeholder = "Password",
  value,
  onChange,
  size = "md",
  error = false,
  success = false,
  disabled = false,
  showToggle = true,
  className = "",
  style,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
        error={error}
        success={success}
        disabled={disabled}
        className={className}
        style={{
          paddingRight: showToggle ? "44px" : undefined,
          ...style,
        }}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
          style={{
            position: "absolute",
            right: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "var(--glass-radius-sm, 6px)",
            border: "none",
            background: "transparent",
            color: "var(--theme-fg-subtle)",
            cursor: disabled ? "not-allowed" : "pointer",
            padding: 0,
            transition: "color 150ms ease",
            fontFamily: "var(--font-ui)",
          }}
        >
          <EyeIcon open={visible} />
        </button>
      )}
    </div>
  );
}
