import { useState } from "react";
import { Input, SearchInput, Textarea, Select, SearchableSelect, TagInput } from "@/primitives/inputs";

/* ─── Main Demo Export ─── */
const SELECT_OPTIONS = [
  { value: "Button", label: "Button" },
  { value: "Card", label: "Card" },
  { value: "Modal", label: "Modal" },
  { value: "Input", label: "Input" },
  { value: "Select", label: "Select" },
  { value: "Slider", label: "Slider" },
  { value: "Badge", label: "Badge" },
  { value: "Avatar", label: "Avatar" },
];

const SEARCH_OPTIONS = [
  { value: "React", label: "React" },
  { value: "Vue", label: "Vue" },
  { value: "Svelte", label: "Svelte" },
  { value: "Angular", label: "Angular" },
  { value: "Solid", label: "Solid" },
  { value: "Astro", label: "Astro" },
  { value: "Next.js", label: "Next.js" },
  { value: "Nuxt", label: "Nuxt" },
  { value: "Remix", label: "Remix" },
  { value: "SvelteKit", label: "SvelteKit" },
  { value: "Gatsby", label: "Gatsby" },
  { value: "Qwik", label: "Qwik" },
  { value: "Fresh", label: "Fresh" },
  { value: "Lit", label: "Lit" },
];

export function InputFieldsDemo() {
  const [selectVal, setSelectVal] = useState("");
  const [searchSelectVal, setSearchSelectVal] = useState("");

  const labelStyle = { color: "var(--theme-fg-muted)" };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Text Input</label>
        <Input placeholder="Enter your name..." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Search</label>
        <SearchInput placeholder="Search components..." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Select</label>
        <Select
          options={SELECT_OPTIONS}
          value={selectVal}
          onChange={setSelectVal}
          placeholder="Choose a component..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Searchable Select</label>
        <SearchableSelect
          options={SEARCH_OPTIONS}
          value={searchSelectVal}
          onChange={setSearchSelectVal}
          placeholder="Search frameworks..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Textarea</label>
        <Textarea placeholder="Write a description..." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Tag Input</label>
        <TagInput placeholder="Type and press Enter..." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>URL Input</label>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{
            paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
            fontSize: "14px",
            fontFamily: "var(--font-mono)",
            background: "var(--theme-header-bg)",
            borderTopLeftRadius: "var(--glass-radius-sm, 10px)", borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: "var(--glass-radius-sm, 10px)",
            border: "1px solid var(--theme-ghost-border)",
            borderRight: "none",
            color: "var(--theme-fg-muted)",
            whiteSpace: "nowrap",
          }}>
            https://
          </div>
          <Input
            placeholder="example.com"
            style={{
              borderTopLeftRadius: 0, borderTopRightRadius: "var(--glass-radius-sm, 10px)", borderBottomRightRadius: "var(--glass-radius-sm, 10px)", borderBottomLeftRadius: 0,
              borderLeft: "none",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Validation States</label>
        <div className="grid grid-cols-2 gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <Input value="Valid input" success />
          <Input value="Invalid input" error />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={labelStyle}>Disabled</label>
        <Input value="Cannot edit" disabled />
      </div>
    </div>
  );
}
