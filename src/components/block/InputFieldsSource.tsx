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

const COMPONENTS = [
  { name: "Input", path: "@/primitives/inputs", description: "Text input with focus, validation, and disabled states", implementation: IMPL_INPUT },
  { name: "SearchInput", path: "@/primitives/inputs", description: "Input with search icon, bold stroke on focus, clear button", implementation: IMPL_SEARCHINPUT },
  { name: "Select", path: "@/primitives/inputs", description: "Custom dropdown with keyboard navigation and glass panel", implementation: IMPL_SELECT },
  { name: "SearchableSelect", path: "@/primitives/inputs", description: "Filterable dropdown with type-to-search", implementation: IMPL_SEARCHABLESELECT },
  { name: "Textarea", path: "@/primitives/inputs", description: "Multi-line text input with theme styling", implementation: IMPL_TEXTAREA },
  { name: "TagInput", path: "@/primitives/inputs", description: "Type and press Enter to add tag pills, with X to remove", implementation: IMPL_TAGINPUT },
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
