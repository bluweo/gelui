import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { brand as defaultBrand } from "@/tokens/brand";
import { colors as defaultColors } from "@/tokens/colors";
import { extractDominantColors, generateScale, isLightColor, textOnColor, textOnColorMuted, autoLabelColors } from "@/utils/color-extract";
import { useDraggableModal } from "@/components/hooks/useDraggableModal";

/* ── Types ── */
interface BrandEntry { hex: string; label: string; role: string; scale: Record<string, string> }
interface SemanticEntry { name: string; light: string; dark: string; lightRef?: string; darkRef?: string }
interface TextEntry { name: string; light: string; dark: string }

/* ── Default brand data ── */
const DEFAULT_LOGO = "/logos/uigel-logo.svg";
const DEFAULT_LOGO_WHITE = "/logos/uigel-logo-white.svg";

function getDefaultBrands(): BrandEntry[] {
  return defaultBrand.map((b) => {
    const raw = (defaultColors.raw as Record<string, unknown>)[b.key];
    const scale = raw && typeof raw === "object" && "50" in raw ? (raw as Record<string, string>) : generateScale(b.hex);
    return { hex: b.hex, label: b.label, role: b.role ?? "accent", scale };
  });
}

function getDefaultSemantic(primaryHex: string, brandLabel?: string): SemanticEntry[] {
  const key = brandLabel?.toLowerCase().replace(/\s+/g, "-") ?? "primary";
  return [
    { name: "primary", light: primaryHex, dark: lighten(primaryHex, 0.3), lightRef: `var(--raw-${key}-500)`, darkRef: `var(--raw-${key}-400)` },
    { name: "primaryHover", light: darken(primaryHex, 0.15), dark: lighten(primaryHex, 0.45), lightRef: `var(--raw-${key}-600)`, darkRef: `var(--raw-${key}-300)` },
    { name: "error", light: "#FF3B30", dark: "#FF6961", lightRef: "var(--raw-red-500)", darkRef: "#FF6961" },
    { name: "success", light: "#34C759", dark: "#4AD96B", lightRef: "var(--raw-green-500)", darkRef: "#4AD96B" },
    { name: "warning", light: "#FF9500", dark: "#FFB340", lightRef: "var(--raw-amber-500)", darkRef: "#FFB340" },
    { name: "info", light: "#5AC8FA", dark: "#7AD4FC", lightRef: "var(--raw-cyan-500)", darkRef: "#7AD4FC" },
    { name: "surface", light: "#FFFFFF", dark: "#19191F", lightRef: "var(--raw-white)", darkRef: "var(--raw-gray-900)" },
    { name: "onSurface", light: "#25252F", dark: "#F0F0F2", lightRef: "var(--raw-gray-800)", darkRef: "var(--raw-gray-100)" },
  ];
}

function getDefaultText(primaryHex: string): TextEntry[] {
  return [
    { name: "primary", light: "rgba(30,30,35, 0.88)", dark: "rgba(255,255,255, 0.92)" },
    { name: "secondary", light: "rgba(30,30,35, 0.52)", dark: "rgba(255,255,255, 0.55)" },
    { name: "tertiary", light: "rgba(30,30,35, 0.35)", dark: "rgba(255,255,255, 0.35)" },
    { name: "onPrimary", light: "#FFFFFF", dark: "#FFFFFF" },
    { name: "onError", light: "#FFFFFF", dark: "#FFFFFF" },
  ];
}

/* ── Color helpers ── */
function hexToHsl(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue = 0;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) hue = ((b - r) / d + 2) / 6;
  else hue = ((r - g) / d + 4) / 6;
  return [hue * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360; s = Math.max(0, Math.min(1, s)); l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  const toHex = (v: number) => Math.round(Math.max(0, Math.min(255, (v + m) * 255))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function lighten(hex: string, amount: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s, Math.min(1, l + amount));
}

function darken(hex: string, amount: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s, Math.max(0, l - amount));
}

/* ── Component ── */
export function BrandColorPreview() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [brands, setBrands] = useState<BrandEntry[]>(getDefaultBrands);
  const [isDark, setIsDark] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const modalFileRef = useRef<HTMLInputElement>(null);

  const closeUploadModal = useCallback(() => setShowUploadModal(false), []);
  const { panelRef, panelStyle, backdropDragged, onDragStart } =
    useDraggableModal({ isOpen: showUploadModal, onClose: closeUploadModal });

  // Theme detection
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gelui-brand-logo");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.logoUrl) setLogoUrl(data.logoUrl);
        if (data.colors?.length) {
          const labeled = autoLabelColors(data.colors);
          setBrands(labeled.map((c) => ({ ...c, scale: generateScale(c.hex) })));
        }
      }
    } catch {}
  }, []);

  const processFile = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setLogoUrl(dataUrl);
      setShowUploadModal(false);
      setIsExtracting(true);

      try {
        const colors = await extractDominantColors(dataUrl, 5);
        if (colors.length > 0) {
          const labeled = autoLabelColors(colors);
          const newBrands = labeled.map((c) => ({ ...c, scale: generateScale(c.hex) }));
          setBrands(newBrands);
          localStorage.setItem("gelui-brand-logo", JSON.stringify({ logoUrl: dataUrl, colors }));
        }
      } catch (err) {
        console.error("Color extraction failed:", err);
      }
      setIsExtracting(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    e.target.value = "";
  }, [processFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  }, [processFile]);

  const handleReset = useCallback(() => {
    setLogoUrl(null);
    setBrands(getDefaultBrands());
    localStorage.removeItem("gelui-brand-logo");
  }, []);

  const primaryBrand = brands[0];
  const primaryHex = primaryBrand?.hex ?? "#354334";
  const semantic = getDefaultSemantic(primaryHex, primaryBrand?.label);
  const text = getDefaultText(primaryHex);

  // Derived colors from primary
  const primaryScale = primaryBrand?.scale;
  const derivedColors = primaryScale
    ? [
        { label: "Dark", hex: primaryScale["800"] },
        { label: "Gray", hex: "#78788A" },
        { label: "Muted", hex: primaryScale["300"] },
        { label: "Tint", hex: primaryScale["50"] },
      ]
    : [];

  const currentLogo = logoUrl || (isDark ? DEFAULT_LOGO_WHITE : DEFAULT_LOGO);

  return (
    <>
      {/* ═══ Brand Colour Scheme ═══ */}
      <div data-section="Brand Colors" className="col-span-2 row-span-2 glass-1 glass-specular relative overflow-hidden rounded-[var(--glass-radius)] p-5">
        <div className="absolute inset-0 pointer-events-none ds-card-frost" style={{ height: 200 }} />

        {/* Header with logo */}
        <div className="relative flex items-start justify-between mb-6 pt-1 pl-1">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-[650] uppercase tracking-[0.1em] text-black/40 dark:text-white/40 mb-1">Colour System</span>
            <h2 className="text-[24px] font-[750] tracking-[-0.03em] leading-[1.2] text-black dark:text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Brand Colour Scheme</h2>
            <p className="text-[13px] leading-[1.6] text-black/60 dark:text-white/55">
              {brands.length} brand colour{brands.length !== 1 ? "s" : ""} derived from logo &middot; auto-generated scales
            </p>
          </div>

          {/* Logo + action buttons (same style as Font Families Reset + ⚙) */}
          <div className="shrink-0 ml-4 flex items-center gap-2">
            {logoUrl && (
              <button
                onClick={handleReset}
                className="text-[11px] font-[550] px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.08] transition-all duration-150 cursor-pointer text-black/50 dark:text-white/40 hover:text-black/70 dark:hover:text-white/60"
                title="Reset to default logo"
              >
                Reset
              </button>
            )}
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.08] transition-all duration-150 cursor-pointer shrink-0"
              title="Upload logo to extract brand colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/50 dark:text-white/40">
                <path d="M9 17v-6l-2 2M9 11l2 2" />
                <path d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" />
                <path d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z" />
              </svg>
            </button>
            <div className="w-16 h-16 rounded-[var(--glass-radius-sm)] border border-black/15 dark:border-white/15 p-1.5 flex items-center justify-center bg-white/40 dark:bg-black/20">
              <img src={currentLogo} alt="Brand Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {isExtracting && (
          <div className="text-[12px] text-black/50 dark:text-white/40 mb-4 pl-1">Extracting colors...</div>
        )}

        {/* Hero: primary swatch + derived */}
        <div className="flex gap-3 mb-6 max-[540px]:flex-col">
          <div className="relative flex-1 min-w-0 min-h-[120px] rounded-[var(--glass-radius)] border border-white/10 flex flex-col justify-end p-4" style={{ backgroundColor: primaryHex }}>
            <span className="text-[13px] font-semibold leading-tight" style={{ color: textOnColor(primaryHex) }}>{primaryBrand?.label}</span>
            <span className="text-[11px] font-mono mt-0.5" style={{ color: textOnColorMuted(primaryHex) }}>{primaryHex}</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 flex-1 min-w-0">
            {derivedColors.map((d) => (
              <div key={d.label} className="relative rounded-[var(--glass-radius-sm)] border border-white/10 flex flex-col justify-end p-3" style={{ backgroundColor: d.hex }}>
                <span className="text-[11px] font-semibold leading-tight" style={{ color: textOnColor(d.hex) }}>{d.label}</span>
                <span className="text-[9px] font-mono mt-0.5" style={{ color: textOnColorMuted(d.hex) }}>{d.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colour Scheme grid */}
        <div className="mb-1">
          <span className="text-[11.5px] font-[550] uppercase opacity-45 tracking-[0.04em]">Colour Scheme</span>
        </div>
        <div className={`grid gap-2.5 mb-6 ${brands.length <= 2 ? "grid-cols-2" : brands.length === 3 ? "grid-cols-3" : brands.length === 4 ? "grid-cols-4" : "grid-cols-5"}`}>
          {brands.map((b) => (
            <div key={b.hex} className="relative min-h-[72px] rounded-[var(--glass-radius-sm)] border border-white/10 flex flex-col justify-end p-3" style={{ backgroundColor: b.scale["500"] || b.hex }}>
              <span className="text-[11px] font-semibold leading-tight" style={{ color: textOnColor(b.hex) }}>{b.label}</span>
              <span className="text-[9px] font-mono mt-0.5" style={{ color: textOnColorMuted(b.hex) }}>{b.hex}</span>
            </div>
          ))}
        </div>

        {/* Scales — card style */}
        <div className="flex flex-col gap-2">
          <span className="text-[11.5px] font-[550] uppercase opacity-45 tracking-[0.04em]">Scales</span>
          <div className="flex flex-col gap-3">
            {brands.map((b) => {
              const ROLE_DISPLAY: Record<string, string> = { primary: "Primary", secondary: "Secondary", accent: "Accent" };
              return (
                <div key={b.hex} className="flex flex-col gap-3 p-4 rounded-[var(--glass-radius-sm)] bg-white/90 dark:bg-black/60 border border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 rounded-[10px] border border-white/10" style={{ backgroundColor: b.hex }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-[600] text-black dark:text-white">{b.label}</span>
                        <span className="text-[12px] font-mono text-black/50 dark:text-white/50 px-1.5 py-0.5 rounded-[4px] bg-black/[0.04] dark:bg-white/[0.08]">
                          {ROLE_DISPLAY[b.role] ?? b.role}
                        </span>
                      </div>
                      <span className="text-[12px] font-mono text-black/40 dark:text-white/40">{b.hex}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((shade) => (
                      <div key={shade} className="flex flex-col items-center gap-0.5 flex-1 min-w-0">
                        <div className="w-full h-5 rounded-[3px]" style={{ backgroundColor: b.scale[shade] || b.hex }} title={`${shade}: ${b.scale[shade] || b.hex}`} />
                        <span className="text-[10px] font-mono text-black/40 dark:text-white/40">{shade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {/* Gray scale */}
            <div className="flex flex-col gap-3 p-4 rounded-[var(--glass-radius-sm)] bg-white/90 dark:bg-black/60 border border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0 rounded-[10px] border border-white/10" style={{ backgroundColor: "#78788A" }} />
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] font-[600] text-black dark:text-white">Gray</span>
                  <br />
                  <span className="text-[12px] font-mono text-black/40 dark:text-white/40">#78788A</span>
                </div>
              </div>
              <div className="flex gap-1">
                {[
                  { shade: "50", color: "#F9F9FA" }, { shade: "100", color: "#F0F0F2" },
                  { shade: "200", color: "#E0E0E4" }, { shade: "300", color: "#C8C8CE" },
                  { shade: "400", color: "#A0A0A8" }, { shade: "500", color: "#78788A" },
                  { shade: "600", color: "#56566A" }, { shade: "700", color: "#3A3A4A" },
                  { shade: "800", color: "#25252F" }, { shade: "900", color: "#19191F" },
                ].map(({ shade, color }) => (
                  <div key={shade} className="flex flex-col items-center gap-0.5 flex-1 min-w-0">
                    <div className="w-full h-5 rounded-[3px]" style={{ backgroundColor: color }} title={`${shade}: ${color}`} />
                    <span className="text-[10px] font-mono text-black/40 dark:text-white/40">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Semantic Colors ═══ */}
      <div data-section="Semantic Colors" className="col-span-2 glass-1 glass-specular relative overflow-hidden rounded-[var(--glass-radius)] p-5">
        <div className="absolute inset-0 pointer-events-none ds-card-frost" style={{ height: 180 }} />
        <div className="relative flex flex-col gap-1 mb-6 pt-1 pl-1">
          <span className="text-[10px] font-[650] uppercase tracking-[0.1em] text-black/40 dark:text-white/40 mb-1">Design Decisions</span>
          <h2 className="text-[24px] font-[750] tracking-[-0.03em] leading-[1.2] text-black dark:text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Semantic Colors</h2>
          <p className="text-[13px] leading-[1.6] text-black/60 dark:text-white/55">Remappable intent-based tokens with light and dark variants</p>
        </div>

        {/* Table header */}
        <div className="flex w-full rounded-[var(--glass-radius-sm)] overflow-hidden">
          <div className="w-[100px] shrink-0 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Token</span>
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-black/35 dark:text-white/30 shrink-0"><path opacity=".4" d="M12 19.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.5c0-.41.34-.75.75-.75ZM12 2.75c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.5c0-.41.34-.75.75-.75Z"/><path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/></svg>
            <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Light</span>
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-black/35 dark:text-white/30 shrink-0"><path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 0 1-1.88.13 8.409 8.409 0 0 1-5.91-2.82 8.068 8.068 0 0 1-1.68-8.51c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 0 0-6.32 10.21 10.475 10.475 0 0 0 7.04 8.99 10 10 0 0 0 3.37.58c.59 0 1.19-.05 1.77-.16a10.5 10.5 0 0 0 6.87-4.95c.38-.71.25-1.31.09-1.57l.3.46Z"/></svg>
            <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Dark</span>
          </div>
        </div>

        {/* Semantic rows — table style */}
        <div className="flex flex-col rounded-[var(--glass-radius-sm)] overflow-hidden">
          {semantic.map((s, idx) => (
            <div key={s.name} className="flex w-full border-b border-black/[0.03] dark:border-white/[0.04] last:border-b-0">
              {/* Token name */}
              <div className="w-[100px] shrink-0 flex items-center px-3 py-3">
                <span className="text-[12px] font-[600] text-black/80 dark:text-white/80">{s.name}</span>
              </div>
              {/* Light swatch */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2">
                <div className="flex-1 min-h-[48px] rounded-[8px] flex flex-col justify-end p-2.5" style={{ backgroundColor: s.light }}>
                  <span className="text-[11px] font-mono" style={{ color: textOnColorMuted(s.light) }}>{s.lightRef || s.light}</span>
                </div>
              </div>
              {/* Dark swatch */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2">
                <div className="flex-1 min-h-[48px] rounded-[8px] flex flex-col justify-end p-2.5 relative" style={{ backgroundColor: s.dark }}>
                  <span className="text-[11px] font-mono" style={{ color: textOnColorMuted(s.dark) }}>{s.darkRef || s.dark}</span>
                  <span className="absolute top-1.5 right-2.5 text-[22px] font-bold leading-none opacity-10" style={{ color: textOnColor(s.dark) }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Text Colors ═══ */}
      <div data-section="Text Colors" className="col-span-2 glass-1 glass-specular relative overflow-hidden rounded-[var(--glass-radius)] p-5">
        <div className="absolute inset-0 pointer-events-none ds-card-frost" style={{ height: 160 }} />
        <div className="relative flex flex-col gap-1 mb-6 pt-1 pl-1">
          <span className="text-[10px] font-[650] uppercase tracking-[0.1em] text-black/40 dark:text-white/40 mb-1">Hierarchy</span>
          <h2 className="text-[24px] font-[750] tracking-[-0.03em] leading-[1.2] text-black dark:text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Text Colors</h2>
          <p className="text-[13px] leading-[1.6] text-black/60 dark:text-white/55">Opacity-based text hierarchy for consistent readability</p>
        </div>

        {/* Table header */}
        <div className="flex w-full">
          <div className="w-[100px] shrink-0 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08] rounded-tl-[8px]">
            <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Token</span>
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-black/35 dark:text-white/30 shrink-0"><path opacity=".4" d="M12 19.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.5c0-.41.34-.75.75-.75ZM12 2.75c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.5c0-.41.34-.75.75-.75Z"/><path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/></svg>
            <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Light</span>
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08] rounded-tr-[8px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-black/35 dark:text-white/30 shrink-0"><path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 0 1-1.88.13 8.409 8.409 0 0 1-5.91-2.82 8.068 8.068 0 0 1-1.68-8.51c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 0 0-6.32 10.21 10.475 10.475 0 0 0 7.04 8.99 10 10 0 0 0 3.37.58c.59 0 1.19-.05 1.77-.16a10.5 10.5 0 0 0 6.87-4.95c.38-.71.25-1.31.09-1.57l.3.46Z"/></svg>
            <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Dark</span>
          </div>
        </div>

        {/* Text color rows */}
        {text.map((t) => {
          const isOnColor = t.name.startsWith("on");
          const lightBg = isOnColor ? (t.name === "onPrimary" ? primaryHex : "#FF6961") : "#ffffff";
          const darkBg = isOnColor ? (t.name === "onPrimary" ? primaryHex : "#FF6961") : "#1a1a1a";
          return (
            <div key={t.name} className="flex w-full border-b border-black/[0.03] dark:border-white/[0.04] last:border-b-0">
              <div className="w-[100px] shrink-0 flex items-center px-3 py-3">
                <span className="text-[12px] font-[600] text-black/80 dark:text-white/80">{t.name}</span>
              </div>
              <div className="flex-1 flex items-center gap-3 px-3 py-3">
                <div className="flex-1 py-2.5 px-3 rounded-[8px] border border-black/[0.06] dark:border-white/[0.06]" style={{ backgroundColor: lightBg }}>
                  <span className="text-[13px] font-[550]" style={{ color: t.light, fontFamily: "var(--font-body)" }}>Sample text</span>
                </div>
                <span className="text-[11px] font-mono text-black/35 dark:text-white/30 shrink-0 w-[90px]">{t.light}</span>
              </div>
              <div className="flex-1 flex items-center gap-3 px-3 py-3">
                <div className="flex-1 py-2.5 px-3 rounded-[8px] border border-black/[0.06] dark:border-white/[0.06]" style={{ backgroundColor: darkBg }}>
                  <span className="text-[13px] font-[550]" style={{ color: t.dark, fontFamily: "var(--font-body)" }}>Sample text</span>
                </div>
                <span className="text-[11px] font-mono text-black/35 dark:text-white/30 shrink-0 w-[90px]">{t.dark}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ Upload Logo Modal (draggable, portal) ═══ */}
      {showUploadModal && createPortal(
        <div
          className={`fixed inset-0 z-[900] bg-black/20 backdrop-blur-[var(--glass-blur-overlay)] animate-backdrop-fade-in flex items-center justify-center overflow-y-auto p-5 dark:bg-black/40 ${backdropDragged ? "items-start justify-start p-0" : ""}`}
          onClick={closeUploadModal}
          role="dialog"
          aria-modal="true"
          aria-label="Upload brand logo"
        >
          <div
            ref={panelRef}
            className="glass-panel max-h-[calc(100vh-40px)] animate-picker-enter select-none cursor-grab active:cursor-grabbing"
            style={{ ...panelStyle, width: 380, maxWidth: "90vw", padding: "24px 24px 20px" }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={onDragStart}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-[1]">
              <span className="text-[16px] font-[650] text-text-primary tracking-[-0.02em]">Upload Brand Logo</span>
              <button
                className="w-7 h-7 flex items-center justify-center border-none bg-black/6 rounded-full cursor-pointer text-text-secondary transition-all duration-200 ease-default hover:bg-black/10 hover:text-text-primary dark:bg-white/8 dark:hover:bg-white/14"
                onClick={closeUploadModal}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Description */}
            <div className="pb-4">
              <p className="text-[13px] leading-[1.6] text-black/55 dark:text-white/50">
                Upload your brand logo to automatically extract dominant colors. These colors will define your brand palette, semantic tokens, and text hierarchy across the entire design system.
              </p>
            </div>

            {/* Drop zone — solid background */}
            <div
              className={`relative flex flex-col items-center justify-center gap-3 py-10 px-6 rounded-[var(--glass-radius-sm)] border-2 border-dashed transition-all duration-200 cursor-pointer mb-5 ${
                dragOver
                  ? "border-black/30 dark:border-white/30 bg-white dark:bg-[#1a1a1f]"
                  : "border-black/[0.12] dark:border-white/[0.1] bg-white dark:bg-[#1a1a1f] hover:border-black/20 dark:hover:border-white/20"
              }`}
              onClick={() => modalFileRef.current?.click()}
              onMouseDown={(e) => e.stopPropagation()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="w-14 h-14 rounded-full bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/35 dark:text-white/30">
                  <path d="M12 15V3m0 0l-3 3m3-3l3 3" />
                  <path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[14px] font-[600] text-black/70 dark:text-white/65">
                  {dragOver ? "Drop your logo here" : "Click to upload or drag & drop"}
                </span>
                <span className="text-[12px] text-black/40 dark:text-white/35">PNG, JPG, or SVG — max 2MB</span>
              </div>
              <input ref={modalFileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={handleUpload} />
            </div>

            {/* Sample logos */}
            <div className="pb-1">
              <span className="text-[11px] font-[600] uppercase tracking-[0.06em] text-black/40 dark:text-white/35 mb-2.5 block">Or try a sample logo</span>
              <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
                {[
                  { src: "/logos/uigel-logo.svg", label: "UIGel" },
                  { src: "/logos/browsers/chrome.svg", label: "Chrome" },
                  { src: "/logos/browsers/firefox.svg", label: "Firefox" },
                  { src: "/logos/browsers/safari.svg", label: "Safari" },
                  { src: "/logos/browsers/edge.svg", label: "Edge" },
                  { src: "/logos/browsers/opera.svg", label: "Opera" },
                ].map((sample) => (
                  <button
                    key={sample.label}
                    className="w-11 h-11 rounded-[8px] bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.07] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center cursor-pointer transition-all duration-150 hover:scale-110 active:scale-95"
                    title={`Try ${sample.label} logo`}
                    onClick={async () => {
                      try {
                        const colors = await extractDominantColors(sample.src, 5);
                        if (colors.length > 0) {
                          setLogoUrl(sample.src);
                          setShowUploadModal(false);
                          const labeled = autoLabelColors(colors);
                          const newBrands = labeled.map((c) => ({ ...c, scale: generateScale(c.hex) }));
                          setBrands(newBrands);
                          localStorage.setItem("gelui-brand-logo", JSON.stringify({ logoUrl: sample.src, colors }));
                        }
                      } catch (err) {
                        console.error("Sample extraction failed:", err);
                      }
                    }}
                  >
                    <img src={sample.src} alt={sample.label} className="w-7 h-7 object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer hint */}
            <div className="pt-3">
              <p className="text-[11px] text-black/35 dark:text-white/30 leading-[1.5]">
                Tip: For best results, use a logo with distinct, vibrant colors on a transparent or white background. Up to 5 dominant colors will be extracted.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
