import { useState, useRef, useEffect, useCallback } from "react";

/* ─── Custom Select ─── */
function GlassSelect({
  options,
  value,
  onChange,
  placeholder = "Choose...",
  isDark,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  isDark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 rounded-[var(--glass-radius-sm)] border text-[14px] outline-none transition-all duration-200 cursor-pointer flex items-center justify-between"
        style={{
          background: open
            ? (isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.98)")
            : (isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)"),
          borderColor: open
            ? (isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)")
            : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
          color: value
            ? (isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)")
            : (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"),
          fontFamily: "var(--font-ui)",
        }}
      >
        <span>{value || placeholder}</span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{ transition: "transform 200ms", transform: open ? "rotate(180deg)" : "rotate(0)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-[10px] overflow-hidden"
          style={{
            background: isDark ? "rgba(30,30,30,0.96)" : "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {options.map((opt) => {
            const isActive = opt === value;
            return (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-[13px] border-none cursor-pointer transition-colors duration-100 block"
                style={{
                  background: isActive ? (isDark ? "#fff" : "#000") : "transparent",
                  color: isActive ? (isDark ? "#000" : "#fff") : (isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)"),
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "var(--font-ui)",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Searchable Select (Select2-style) ─── */
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  isDark,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  isDark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setSearch(""); }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 rounded-[var(--glass-radius-sm)] border text-[14px] outline-none transition-all duration-200 cursor-pointer flex items-center justify-between"
        style={{
          background: open
            ? (isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.98)")
            : (isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)"),
          borderColor: open
            ? (isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)")
            : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
          color: value
            ? (isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)")
            : (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"),
          fontFamily: "var(--font-ui)",
        }}
      >
        <span>{value || placeholder}</span>
        <div className="flex items-center gap-1.5">
          {value && (
            <span
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="w-4 h-4 flex items-center justify-center rounded-full cursor-pointer"
              style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)" }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </span>
          )}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transition: "transform 200ms", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-[10px] overflow-hidden"
          style={{
            background: isDark ? "rgba(30,30,30,0.96)" : "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* Search input */}
          <div className="px-3 py-2.5" style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to filter..."
                className="w-full pl-8 pr-3 py-2 rounded-[6px] text-[12px] border-none outline-none"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
                  color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                  fontFamily: "var(--font-ui)",
                }}
              />
            </div>
          </div>

          {/* Options */}
          <div style={{ maxHeight: "180px", overflowY: "auto", scrollbarWidth: "thin" }}>
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-[12px]" style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)" }}>
                No results found
              </div>
            ) : (
              filtered.map((opt) => {
                const isActive = opt === value;
                return (
                  <button
                    key={opt}
                    onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                    className="w-full text-left px-4 py-2.5 text-[13px] border-none cursor-pointer transition-colors duration-100 block"
                    style={{
                      background: isActive ? (isDark ? "#fff" : "#000") : "transparent",
                      color: isActive ? (isDark ? "#000" : "#fff") : (isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)"),
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: "var(--font-ui)",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    {opt}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Focus-aware Input ─── */
function FocusInput({
  type = "text",
  placeholder,
  icon,
  isDark,
  defaultValue,
  disabled,
  validState,
}: {
  type?: string;
  placeholder?: string;
  icon?: "search";
  isDark: boolean;
  defaultValue?: string;
  disabled?: boolean;
  validState?: "valid" | "error";
}) {
  const [focused, setFocused] = useState(false);

  const borderColor = validState === "valid"
    ? "rgba(52,199,89,0.5)"
    : validState === "error"
    ? "rgba(255,59,48,0.5)"
    : focused
    ? (isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)")
    : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)");

  const bg = disabled
    ? (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)")
    : focused
    ? (isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.98)")
    : (isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)");

  return (
    <div className="relative">
      {icon === "search" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused ? (isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)") : (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"), strokeWidth: focused ? 2.5 : 1.5, transition: "color 200ms, stroke-width 200ms" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
      )}
      {validState === "valid" && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(52,199,89,0.15)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
      )}
      {validState === "error" && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(255,59,48,0.15)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={!!validState}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full py-3 rounded-[var(--glass-radius-sm)] text-[14px] outline-none transition-all duration-200"
        style={{
          paddingLeft: icon === "search" ? "2.5rem" : "1rem",
          paddingRight: validState ? "2.5rem" : "1rem",
          background: bg,
          border: validState ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
          color: disabled ? (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)") : (isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"),
          fontFamily: "var(--font-ui)",
          cursor: disabled ? "not-allowed" : "text",
          boxShadow: focused && !validState ? `0 0 0 3px ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}` : "none",
        }}
      />
    </div>
  );
}

/* ─── Focus-aware Textarea ─── */
function FocusTextarea({ placeholder, isDark }: { placeholder?: string; isDark: boolean }) {
  const [focused, setFocused] = useState(false);

  return (
    <textarea
      rows={3}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-[var(--glass-radius-sm)] text-[14px] outline-none transition-all duration-200 resize-none"
      style={{
        background: focused
          ? (isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.98)")
          : (isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)"),
        border: `1px solid ${focused ? (isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)") : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`,
        color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
        fontFamily: "var(--font-ui)",
        boxShadow: focused ? `0 0 0 3px ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}` : "none",
      }}
    />
  );
}

/* ─── Main Demo Export ─── */
const SELECT_OPTIONS = ["Button", "Card", "Modal", "Input", "Select", "Slider", "Badge", "Avatar"];
const SEARCH_OPTIONS = ["React", "Vue", "Svelte", "Angular", "Solid", "Astro", "Next.js", "Nuxt", "Remix", "SvelteKit", "Gatsby", "Qwik", "Fresh", "Lit"];

export function InputFieldsDemo() {
  const [isDark, setIsDark] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [searchSelectVal, setSearchSelectVal] = useState("");

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>Text Input</label>
        <FocusInput placeholder="Enter your name..." isDark={isDark} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>Search</label>
        <FocusInput placeholder="Search components..." icon="search" isDark={isDark} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>Select</label>
        <GlassSelect options={SELECT_OPTIONS} value={selectVal} onChange={setSelectVal} placeholder="Choose a component..." isDark={isDark} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>Searchable Select</label>
        <SearchableSelect options={SEARCH_OPTIONS} value={searchSelectVal} onChange={setSearchSelectVal} placeholder="Search frameworks..." isDark={isDark} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>Textarea</label>
        <FocusTextarea placeholder="Write a description..." isDark={isDark} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>Validation States</label>
        <div className="grid grid-cols-2 gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <FocusInput defaultValue="Valid input" validState="valid" isDark={isDark} />
          <FocusInput defaultValue="Invalid input" validState="error" isDark={isDark} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>Disabled</label>
        <FocusInput defaultValue="Cannot edit" disabled isDark={isDark} />
      </div>
    </div>
  );
}
