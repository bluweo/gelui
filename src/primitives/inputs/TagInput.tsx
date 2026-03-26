import { useState, useRef, type CSSProperties } from "react";

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function TagInput({
  value: controlledValue,
  onChange,
  placeholder = "Type and press Enter...",
  maxTags,
  disabled = false,
  className = "",
  style,
}: TagInputProps) {
  const [internalTags, setInternalTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const tags = controlledValue ?? internalTags;
  const setTags = (newTags: string[]) => {
    if (!controlledValue) setInternalTags(newTags);
    onChange?.(newTags);
  };

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;
    setTags([...tags, trimmed]);
    setInput("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div
      className={className}
      onClick={() => inputRef.current?.focus()}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 6,
        padding: "8px 12px",
        minHeight: 44,
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: `2px solid ${focused ? "var(--theme-fg)" : "transparent"}`,
        background: focused
          ? "var(--theme-table-bg)"
          : "var(--theme-header-bg)",
        cursor: disabled ? "not-allowed" : "text",
        opacity: disabled ? 0.5 : 1,
        transition: "border-color 0.15s ease, background 0.15s ease",
        ...style,
      }}
    >
      {tags.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 8px",
            borderRadius: "var(--glass-radius-pill, 100px)",
            fontSize: "12px",
            fontWeight: 550,
            fontFamily: "var(--font-ui)",
            background: "var(--theme-divider)",
            color: "var(--theme-fg)",
          }}
        >
          {tag}
          {!disabled && (
            <button
              onClick={(e) => { e.stopPropagation(); removeTag(i); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "none",
                background: "var(--theme-divider)",
                color: "var(--theme-fg-muted)",
                cursor: "pointer",
                fontSize: "10px",
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
          )}
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); addTag(); }}
        placeholder={tags.length === 0 ? placeholder : ""}
        disabled={disabled}
        style={{
          flex: 1,
          minWidth: 80,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          color: "var(--theme-fg)",
          padding: 0,
        }}
      />
    </div>
  );
}
