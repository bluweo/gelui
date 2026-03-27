import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_INPUT from "@/primitives/inputs/Input.tsx?raw";
import IMPL_SEARCHINPUT from "@/primitives/inputs/SearchInput.tsx?raw";
import IMPL_SELECT from "@/primitives/inputs/Select.tsx?raw";
import IMPL_SEARCHABLESELECT from "@/primitives/inputs/SearchableSelect.tsx?raw";
import IMPL_TEXTAREA from "@/primitives/inputs/Textarea.tsx?raw";
import IMPL_TAGINPUT from "@/primitives/inputs/TagInput.tsx?raw";

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
      <div className="flex items-center">
        <div className="py-3 px-4 text-[14px] font-mono bg-[var(--theme-header-bg)] rounded-l-[var(--glass-radius-sm)] border-2 border-transparent border-r-0 text-[var(--theme-fg-muted)]">
          https://
        </div>
        <Input placeholder="example.com" className="rounded-l-none" />
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

const COMPONENTS = [
  {
    name: "Input", path: "@/primitives/inputs",
    description: "Text input with focus, validation, and disabled states",
    implementation: IMPL_INPUT,
    props: [
      { name: "type", type: "string", default: '"text"' },
      { name: "placeholder", type: "string" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
      { name: "error", type: "boolean", default: "false" },
      { name: "success", type: "boolean", default: "false" },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "icon", type: "ReactNode" },
    ],
  },
  {
    name: "SearchInput", path: "@/primitives/inputs",
    description: "Input with search icon, bold stroke on focus, clear button",
    implementation: IMPL_SEARCHINPUT,
    props: [
      { name: "placeholder", type: "string", default: '"Search..."' },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
    ],
  },
  {
    name: "Select", path: "@/primitives/inputs",
    description: "Custom dropdown with keyboard navigation and glass panel",
    implementation: IMPL_SELECT,
    props: [
      { name: "options", type: "SelectOption[]" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "placeholder", type: "string", default: '"Select..."' },
    ],
  },
  {
    name: "SearchableSelect", path: "@/primitives/inputs",
    description: "Filterable dropdown with type-to-search and highlight matching",
    implementation: IMPL_SEARCHABLESELECT,
    props: [
      { name: "options", type: "SelectOption[]" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "placeholder", type: "string", default: '"Search & select..."' },
    ],
  },
  {
    name: "Textarea", path: "@/primitives/inputs",
    description: "Multi-line text input with theme styling and vertical resize",
    implementation: IMPL_TEXTAREA,
    props: [
      { name: "placeholder", type: "string" },
      { name: "rows", type: "number", default: "3" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
    ],
  },
  {
    name: "TagInput", path: "@/primitives/inputs",
    description: "Type and press Enter to add tag pills, Backspace to remove last",
    implementation: IMPL_TAGINPUT,
    props: [
      { name: "value", type: "string[]" },
      { name: "onChange", type: "(tags: string[]) => void" },
      { name: "placeholder", type: "string" },
      { name: "maxTags", type: "number" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
  },
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
