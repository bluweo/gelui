import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Input, SearchInput, Textarea, Select, SearchableSelect, TagInput } from "@/primitives/inputs";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function InputFieldsDemo() {
  const isDark = useDarkMode();
  const [selectVal, setSelectVal] = useState("");
  const [searchSelectVal, setSearchSelectVal] = useState("");

  return (
    <div className="flex flex-col gap-5">
      {/* Text Input */}
      <Input placeholder="Enter your name..." />

      {/* Search */}
      <SearchInput placeholder="Search components..." />

      {/* Select dropdown */}
      <Select
        options={[
          { value: "Button", label: "Button" },
          { value: "Card", label: "Card" },
        ]}
        value={selectVal}
        onChange={setSelectVal}
        placeholder="Choose a component..."
      />

      {/* Searchable Select */}
      <SearchableSelect
        options={SEARCH_OPTIONS}
        value={searchSelectVal}
        onChange={setSearchSelectVal}
        placeholder="Search frameworks..."
      />

      {/* Tag Input — type and press Enter to add tags */}
      <TagInput placeholder="Type and press Enter..." />

      {/* URL Input with prefix */}
      <div style={{ display: "flex" }}>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, background: "rgba(0,0,0,0.04)" }}>
          https://
        </div>
        <Input placeholder="example.com" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 0 }} />
      </div>

      {/* Textarea */}
      <Textarea placeholder="Write a description..." />

      {/* Validation */}
      <Input value="Valid input" success />
      <Input value="Invalid input" error />

      {/* Disabled */}
      <Input value="Cannot edit" disabled />
    </div>
  );
}`;

const IMPL_INPUT = `import { useState, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number" | "url";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: CSSProperties;
}

export function Input({
  placeholder, value, onChange, type = "text",
  size = "md", error, success, disabled, icon, style,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const dark = useDarkMode();

  const borderColor = focused
    ? (dark ? "#fff" : "#000")
    : error ? "#FF3B30"
    : success ? "#34C759"
    : "transparent";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        padding: size === "sm" ? "8px 12px" : "12px 16px",
        fontSize: "14px",
        fontFamily: "var(--font-body)",
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: \`2px solid \${borderColor}\`,
        background: focused
          ? (dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.95)")
          : (dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)"),
        color: dark ? "#fff" : "#000",
        outline: "none",
        ...style,
      }}
    />
  );
}`;

const COMPONENTS = [
  { name: "Input", path: "@/primitives/inputs", description: "Text input with focus, validation, and disabled states", implementation: IMPL_INPUT },
  { name: "SearchInput", path: "@/primitives/inputs", description: "Input with search icon, bold stroke on focus, clear button" },
  { name: "Select", path: "@/primitives/inputs", description: "Custom dropdown with keyboard navigation and glass panel" },
  { name: "SearchableSelect", path: "@/primitives/inputs", description: "Filterable dropdown with type-to-search" },
  { name: "Textarea", path: "@/primitives/inputs", description: "Multi-line text input with auto-resize" },
  { name: "PasswordInput", path: "@/primitives/inputs", description: "Input with show/hide password toggle (eye icon)" },
  { name: "NumberInput", path: "@/primitives/inputs", description: "Input with +/- stepper buttons, min/max/step" },
  { name: "FormGroup", path: "@/primitives/inputs", description: "Label + input + helper text + error wrapper" },
  { name: "TagInput", path: "@/primitives/inputs", description: "Type and press Enter to add tag pills, with X to remove" },
];

export function InputFieldsSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="input-fields"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Input Fields" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
