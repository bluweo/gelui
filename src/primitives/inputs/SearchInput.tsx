import { type CSSProperties, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function SearchInput({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  className = "",
  style,
}: SearchInputProps) {
  const [internal, setInternal] = useState("");
  const val = controlledValue ?? internal;

  const handleChange = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div className="prim-search-wrap">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--theme-fg-muted)"
        strokeWidth="var(--prim-search-stroke)"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="prim-search-icon"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={val}
        onChange={(e) => handleChange(e.target.value)}
        className={`prim-search-input ${className}`}
        style={style}
      />
      {val && (
        <button
          onClick={() => handleChange("")}
          className="prim-search-clear"
        >
          &times;
        </button>
      )}
    </div>
  );
}
