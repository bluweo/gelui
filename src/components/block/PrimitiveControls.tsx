import { useState, useRef, useEffect } from "react";

/* ═══ Interactive Controls for Primitives Page ═══ */

/* ── Toggle Switch ── */
function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOn(!on)}>
      <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? "bg-[#354334]" : "bg-black/10 dark:bg-white/10"}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${on ? "right-0.5" : "left-0.5"}`} />
      </div>
      <span className="text-[13px] text-black/60 dark:text-white/55">{label}</span>
    </label>
  );
}

/* ── Checkbox ── */
function Checkbox({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setChecked(!checked)}>
      <div className={`w-5 h-5 rounded-[5px] flex items-center justify-center transition-all duration-150 ${checked ? "bg-[#354334]" : "border-2 border-black/20 dark:border-white/20 bg-white/60 dark:bg-black/30"}`}>
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        )}
      </div>
      <span className="text-[13px] text-black/60 dark:text-white/55">{label}</span>
    </label>
  );
}

/* ── Radio Group ── */
function RadioGroup({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  const [selected, setSelected] = useState(defaultValue || options[0]);
  return (
    <div className="flex items-center gap-6">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setSelected(opt)}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-150 ${selected === opt ? "border-2 border-[#354334] bg-white/60 dark:bg-black/30" : "border-2 border-black/20 dark:border-white/20 bg-white/60 dark:bg-black/30"}`}>
            {selected === opt && <div className="w-2.5 h-2.5 rounded-full bg-[#354334]" />}
          </div>
          <span className="text-[13px] text-black/60 dark:text-white/55">{opt}</span>
        </label>
      ))}
    </div>
  );
}

/* ── Segmented Control ── */
function SegmentedControl({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  const [selected, setSelected] = useState(defaultValue || options[0]);
  return (
    <div className="inline-flex rounded-full p-1 gap-0.5" style={{ background: "rgba(0,0,0,0.04)" }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          className={`text-[12px] font-[600] px-4 py-1.5 rounded-full cursor-pointer border-none transition-all duration-200 ${
            selected === opt
              ? "bg-black/80 dark:bg-white/80 text-white dark:text-black"
              : "text-black/50 dark:text-white/40 hover:text-black/70 dark:hover:text-white/60 bg-transparent"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ── Glass Select ── */
function GlassSelect({ options, placeholder = "Select..." }: { options: string[]; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-[var(--glass-radius-sm)] bg-white/70 dark:bg-black/30 border border-black/[0.08] dark:border-white/[0.08] text-[14px] text-left cursor-pointer transition-all duration-200 hover:border-black/15 dark:hover:border-white/15"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        <span className={selected ? "text-black/80 dark:text-white/80" : "text-black/30 dark:text-white/25"}>
          {selected || placeholder}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-black/30 dark:text-white/25 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-[var(--glass-radius-sm)] bg-white/95 dark:bg-[#1a1a1f]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-lg overflow-hidden z-50 backdrop-blur-xl">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-[13px] cursor-pointer border-none transition-colors duration-100 ${
                selected === opt
                  ? "bg-[#354334]/10 dark:bg-[#97AD96]/10 text-[#354334] dark:text-[#97AD96] font-[600]"
                  : "text-black/70 dark:text-white/65 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] bg-transparent"
              }`}
              style={{ fontFamily: "var(--font-ui)" }}
            >
              {selected === opt && <span className="mr-2">✓</span>}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Searchable Select ── */
function SearchSelect({ options, placeholder = "Search..." }: { options: string[]; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => { setOpen(!open); setQuery(""); }}
        className="w-full flex items-center justify-between px-4 py-3 rounded-[var(--glass-radius-sm)] bg-white/70 dark:bg-black/30 border border-black/[0.08] dark:border-white/[0.08] text-[14px] text-left cursor-pointer transition-all duration-200 hover:border-black/15 dark:hover:border-white/15"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        <span className={selected ? "text-black/80 dark:text-white/80" : "text-black/30 dark:text-white/25"}>
          {selected || placeholder}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-black/30 dark:text-white/25">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-[var(--glass-radius-sm)] bg-white/95 dark:bg-[#1a1a1f]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-lg overflow-hidden z-50 backdrop-blur-xl">
          {/* Search input */}
          <div className="px-3 py-2 border-b border-black/[0.06] dark:border-white/[0.06]">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full text-[13px] bg-transparent border-none outline-none text-black/80 dark:text-white/80 placeholder:text-black/25 dark:placeholder:text-white/20"
              style={{ fontFamily: "var(--font-ui)" }}
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-[12px] text-black/30 dark:text-white/25">No results</div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSelected(opt); setOpen(false); setQuery(""); }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] cursor-pointer border-none transition-colors duration-100 ${
                    selected === opt
                      ? "bg-[#354334]/10 dark:bg-[#97AD96]/10 text-[#354334] dark:text-[#97AD96] font-[600]"
                      : "text-black/70 dark:text-white/65 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] bg-transparent"
                  }`}
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {selected === opt && <span className="mr-2">✓</span>}
                  {opt}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ Main Export ═══ */
export function PrimitiveControls() {
  return (
    <div className="flex flex-col gap-5">
      {/* Toggle */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Toggle Switch</span>
        <div className="flex items-center gap-6">
          <Toggle label="Off" />
          <Toggle label="On" defaultOn />
        </div>
      </div>

      {/* Checkbox */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Checkbox</span>
        <div className="flex items-center gap-6">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
        </div>
      </div>

      {/* Radio */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Radio</span>
        <RadioGroup options={["Option A", "Option B", "Option C"]} defaultValue="Option B" />
      </div>

      {/* Segmented */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Segmented Control</span>
        <SegmentedControl options={["Day", "Week", "Month"]} />
      </div>

      {/* Glass Select */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Glass Select</span>
        <div className="max-w-[300px]">
          <GlassSelect options={["Button", "Card", "Modal", "Input", "Avatar", "Badge"]} placeholder="Choose a component..." />
        </div>
      </div>

      {/* Searchable Select */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Searchable Select</span>
        <div className="max-w-[300px]">
          <SearchSelect
            options={["React", "Vue", "Svelte", "Angular", "Astro", "Next.js", "Nuxt", "SvelteKit", "Remix", "Solid"]}
            placeholder="Search frameworks..."
          />
        </div>
      </div>

      {/* Slider */}
      <div>
        <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-3 block">Slider</span>
        <input type="range" min="0" max="100" defaultValue="60" className="appearance-slider w-full max-w-[300px]" />
      </div>
    </div>
  );
}
