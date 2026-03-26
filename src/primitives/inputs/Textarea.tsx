import { type CSSProperties } from "react";

interface TextareaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function Textarea({
  placeholder = "",
  rows = 3,
  value,
  onChange,
  className = "",
  style,
}: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={[
        "w-full py-3 px-4 text-sm font-[family-name:var(--font-body)]",
        "rounded-[var(--glass-radius-sm,10px)]",
        "border-2 border-transparent bg-[var(--theme-divider)] text-[var(--theme-bg-solid)]",
        "outline-none resize-y transition-all duration-200",
        "focus:border-[var(--theme-bg-solid)]",
        className,
      ].join(" ")}
      style={style}
    />
  );
}
