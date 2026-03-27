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
      className={[
        "flex flex-wrap items-center gap-1.5 py-2.5 px-4 min-h-[48px]",
        "rounded-[var(--glass-radius-sm,10px)]",
        "border-2 border-transparent bg-[var(--theme-divider)]",
        "transition-[border-color,background] duration-150",
        "focus-within:border-[var(--theme-bg-solid)]",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-text",
        className,
      ].join(" ")}
      onClick={() => inputRef.current?.focus()}
      style={style}
    >
      {tags.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-flex items-center gap-1 py-[3px] px-2 rounded-[var(--glass-radius-pill,100px)] text-xs font-[550] font-[family-name:var(--font-ui)] bg-[var(--theme-divider)] text-[var(--theme-fg)]"
        >
          {tag}
          {!disabled && (
            <button
              onClick={(e) => { e.stopPropagation(); removeTag(i); }}
              className="flex items-center justify-center w-3.5 h-3.5 rounded-full border-none bg-[var(--theme-divider)] text-[var(--theme-fg-muted)] cursor-pointer text-[10px] leading-none p-0"
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
        onBlur={() => addTag()}
        placeholder={tags.length === 0 ? placeholder : ""}
        disabled={disabled}
        className="flex-1 min-w-[80px] border-none outline-none bg-transparent text-[14px] font-[family-name:var(--font-body)] text-[var(--theme-fg)] p-0"
      />
    </div>
  );
}
