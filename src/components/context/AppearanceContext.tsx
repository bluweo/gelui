import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type RadiusPreset = "minimal" | "medium" | "large";
export type ShadowPreset = "flat" | "soft" | "elevated";
export type ThemeMode = "light" | "dark";
export type FontRole = "heading" | "body" | "ui" | "mono" | "data" | "accent";

export interface FontSettings {
  heading: string;       // "SAME_AS_BODY" = use body font
  body: string;
  ui: string;            // "SAME_AS_BODY" = use body font
  mono: string;
  data: string | null;   // null = not enabled
  accent: string | null; // null = not enabled
}

interface AppearanceContextValue {
  transparency: number;
  setTransparency: (v: number) => void;
  radiusPreset: RadiusPreset;
  setRadiusPreset: (v: RadiusPreset) => void;
  blurIntensity: number;
  setBlurIntensity: (v: number) => void;
  shadowPreset: ShadowPreset;
  setShadowPreset: (v: ShadowPreset) => void;
  theme: ThemeMode;
  setTheme: (v: ThemeMode) => void;
  toggleTheme: () => void;
  resetToDefaults: () => void;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  fonts: FontSettings;
  setFontRole: (role: FontRole, font: string | null) => void;
  fontPickerOpen: boolean;
  openFontPicker: (role?: FontRole) => void;
  closeFontPicker: () => void;
  activeFontRole: FontRole;
  fontPreviewText: string;
  setFontPreviewText: (v: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

const DEFAULT_TRANSPARENCY = 0.64;
const DEFAULT_RADIUS: RadiusPreset = "medium";
const DEFAULT_BLUR = 24;
const DEFAULT_SHADOW: ShadowPreset = "soft";
const DEFAULT_THEME: ThemeMode = "light";
const SAME_AS_BODY = "SAME_AS_BODY";
const DEFAULT_FONTS: FontSettings = {
  heading: "Google Sans",
  body: "Google Sans",
  ui: SAME_AS_BODY,
  mono: "System Default",
  data: null,
  accent: null,
};
export { SAME_AS_BODY };

/* ------------------------------------------------------------------ */
/*  localStorage persistence                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "gelui-appearance";

interface StoredAppearance {
  transparency: number;
  radiusPreset: RadiusPreset;
  blurIntensity: number;
  shadowPreset: ShadowPreset;
  theme: ThemeMode;
  fonts?: FontSettings;
}

function loadStored(): Partial<StoredAppearance> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<StoredAppearance>;
  } catch {
    return {};
  }
}

function saveStored(settings: StoredAppearance) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* quota exceeded — ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Preset maps                                                        */
/* ------------------------------------------------------------------ */

const RADIUS_MAP: Record<RadiusPreset, { lg: string; main: string; sm: string; pill: string }> = {
  minimal:  { lg: "8px",   main: "6px",  sm: "4px",  pill: "8px" },
  medium:   { lg: "20px",  main: "14px", sm: "10px", pill: "40px" },
  large:    { lg: "36px",  main: "26px", sm: "18px", pill: "100px" },
};

const SHADOW_MAP: Record<ShadowPreset, { base: string; hover: string; elevated: string }> = {
  flat: {
    base: "none",
    hover: "none",
    elevated: "0 4px 12px rgba(0,0,0,0.06)",
  },
  soft: {
    base: "0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)",
    hover: "0 20px 60px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)",
    elevated: "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)",
  },
  elevated: {
    base: "0 16px 60px rgba(0,0,0,0.16), 0 6px 24px rgba(0,0,0,0.1)",
    hover: "0 28px 80px rgba(0,0,0,0.22), 0 8px 32px rgba(0,0,0,0.12)",
    elevated: "0 32px 100px rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.1)",
  },
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [transparency, setTransparency] = useState(DEFAULT_TRANSPARENCY);
  const [radiusPreset, setRadiusPreset] = useState<RadiusPreset>(DEFAULT_RADIUS);
  const [blurIntensity, setBlurIntensity] = useState(DEFAULT_BLUR);
  const [shadowPreset, setShadowPreset] = useState<ShadowPreset>(DEFAULT_SHADOW);
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);
  const [modalOpen, setModalOpen] = useState(false);
  const [fonts, setFonts] = useState<FontSettings>({ ...DEFAULT_FONTS });
  const [fontPickerOpen, setFontPickerOpen] = useState(false);
  const [fontPreviewText, setFontPreviewText] = useState("The quick brown fox jumps over the lazy dog");
  const [activeFontRole, setActiveFontRole] = useState<FontRole>("primary");

  const hydratedRef = useRef(false);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    const stored = loadStored();
    if (stored.transparency !== undefined) setTransparency(stored.transparency);
    if (stored.radiusPreset !== undefined) setRadiusPreset(stored.radiusPreset);
    if (stored.blurIntensity !== undefined) setBlurIntensity(stored.blurIntensity);
    if (stored.shadowPreset !== undefined) setShadowPreset(stored.shadowPreset);
    if (stored.theme !== undefined) setTheme(stored.theme);
    if (stored.fonts !== undefined) setFonts({ ...DEFAULT_FONTS, ...stored.fonts });
    hydratedRef.current = true;
  }, []);

  /* Persist to localStorage on every change (after hydration) */
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveStored({ transparency, radiusPreset, blurIntensity, shadowPreset, theme, fonts });
    // Notify other components (e.g. tokens page font labels) about appearance changes
    window.dispatchEvent(new CustomEvent("gelui-appearance-change"));
  }, [transparency, radiusPreset, blurIntensity, shadowPreset, theme, fonts]);

  /* Listen for external changes (e.g. from LiveTheming island writing to localStorage) */
  useEffect(() => {
    const handleExternalChange = () => {
      const stored = loadStored();
      if (stored.transparency !== undefined && stored.transparency !== transparency) setTransparency(stored.transparency);
      if (stored.radiusPreset !== undefined && stored.radiusPreset !== radiusPreset) setRadiusPreset(stored.radiusPreset);
      if (stored.blurIntensity !== undefined && stored.blurIntensity !== blurIntensity) setBlurIntensity(stored.blurIntensity);
      if (stored.shadowPreset !== undefined && stored.shadowPreset !== shadowPreset) setShadowPreset(stored.shadowPreset);
    };
    window.addEventListener("gelui-appearance-change", handleExternalChange);
    window.addEventListener("storage", (e) => { if (e.key === STORAGE_KEY) handleExternalChange(); });
    return () => {
      window.removeEventListener("gelui-appearance-change", handleExternalChange);
    };
  }, [transparency, radiusPreset, blurIntensity, shadowPreset]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const openFontPicker = useCallback((role: FontRole = "primary") => {
    setActiveFontRole(role);
    setFontPickerOpen(true);
  }, []);
  const closeFontPicker = useCallback(() => setFontPickerOpen(false), []);

  const setFontRole = useCallback((role: FontRole, font: string | null) => {
    setFonts((prev) => ({ ...prev, [role]: font }));
  }, []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  const resetToDefaults = useCallback(() => {
    setTransparency(DEFAULT_TRANSPARENCY);
    setRadiusPreset(DEFAULT_RADIUS);
    setBlurIntensity(DEFAULT_BLUR);
    setShadowPreset(DEFAULT_SHADOW);
    setFonts({ ...DEFAULT_FONTS });
  }, []);

  /* Apply CSS variables to :root whenever settings change */
  useEffect(() => {
    const root = document.documentElement;
    const rs = root.style;
    const isDark = theme === "dark";

    /* data-theme attribute for CSS selectors */
    root.setAttribute("data-theme", theme);

    /* Transparency → glass backgrounds
       Offsets shrink as transparency approaches 1.0 so ALL variants
       converge to fully-solid when the slider is at 100%.              */
    const t = transparency;
    const remaining = Math.max(0, 1 - t);          // 0.2 at default, 0 at max
    const spread = Math.min(remaining / 0.2, 1);   // 1.0 for t≤0.8, fades to 0 at t=1.0

    const hoverAlpha   = Math.min(t + 0.16 * spread, 1.0);
    const strongAlpha  = Math.min(t + 0.20 * spread, 1.0);
    const subtleAlpha  = Math.max(t - 0.17 * spread, 0.15);

    if (isDark) {
      rs.setProperty("--glass-bg",        `rgba(25, 25, 35, ${t})`);
      rs.setProperty("--glass-bg-hover",   `rgba(35, 35, 48, ${hoverAlpha})`);
      rs.setProperty("--glass-bg-strong",  `rgba(35, 35, 48, ${strongAlpha})`);
      rs.setProperty("--glass-bg-subtle",  `rgba(20, 20, 30, ${subtleAlpha})`);
    } else {
      rs.setProperty("--glass-bg",        `rgba(255, 255, 255, ${t})`);
      rs.setProperty("--glass-bg-hover",   `rgba(255, 255, 255, ${hoverAlpha})`);
      rs.setProperty("--glass-bg-strong",  `rgba(255, 255, 255, ${strongAlpha})`);
      rs.setProperty("--glass-bg-subtle",  `rgba(255, 255, 255, ${subtleAlpha})`);
    }

    /* Glass border */
    if (isDark) {
      rs.setProperty("--glass-border", "rgba(255, 255, 255, 0.1)");
      rs.setProperty("--glass-border-hover", "rgba(255, 255, 255, 0.18)");
    } else {
      rs.setProperty("--glass-border", "rgba(255, 255, 255, 0.55)");
      rs.setProperty("--glass-border-hover", "rgba(255, 255, 255, 0.75)");
    }

    /* Text colors */
    if (isDark) {
      rs.setProperty("--text-primary", "rgba(255, 255, 255, 0.92)");
      rs.setProperty("--text-secondary", "rgba(255, 255, 255, 0.55)");
      rs.setProperty("--text-tertiary", "rgba(255, 255, 255, 0.35)");
    } else {
      rs.setProperty("--text-primary", "rgba(30, 30, 35, 0.88)");
      rs.setProperty("--text-secondary", "rgba(30, 30, 35, 0.52)");
      rs.setProperty("--text-tertiary", "rgba(30, 30, 35, 0.35)");
    }

    /* Border radius */
    const r = RADIUS_MAP[radiusPreset];
    rs.setProperty("--glass-radius-lg", r.lg);
    rs.setProperty("--glass-radius", r.main);
    rs.setProperty("--glass-radius-sm", r.sm);
    rs.setProperty("--glass-radius-pill", r.pill);

    /* Blur + Saturation */
    rs.setProperty("--glass-blur", `${blurIntensity}px`);
    rs.setProperty("--glass-blur-strong", `${Math.round(blurIntensity * 1.67)}px`);
    rs.setProperty("--glass-blur-overlay", `${Math.round(blurIntensity * 0.5)}px`);
    rs.setProperty("--glass-saturation", isDark ? "1.4" : "1.8");

    /* Liquid glass specular tokens — theme-aware */
    rs.setProperty("--liquid-specular-top", isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.35)");
    rs.setProperty("--liquid-specular-mid", isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.08)");
    rs.setProperty("--liquid-noise-opacity", isDark ? "0.02" : "0.03");

    /* Shadow — darker in dark mode */
    const s = SHADOW_MAP[shadowPreset];
    if (isDark) {
      rs.setProperty("--glass-shadow", s.base.replace(/rgba\(0,0,0,/g, "rgba(0,0,0,").replace(/0\.08/g, "0.25").replace(/0\.04/g, "0.15"));
      rs.setProperty("--glass-shadow-hover", s.hover.replace(/0\.14/g, "0.35").replace(/0\.06/g, "0.2"));
      rs.setProperty("--glass-shadow-elevated", s.elevated.replace(/0\.12/g, "0.35").replace(/0\.06/g, "0.2"));
      rs.setProperty("--glass-shadow-sm", "0 2px 8px rgba(0, 0, 0, 0.2)");
    } else {
      rs.setProperty("--glass-shadow", s.base);
      rs.setProperty("--glass-shadow-hover", s.hover);
      rs.setProperty("--glass-shadow-elevated", s.elevated);
      rs.setProperty("--glass-shadow-sm", shadowPreset === "flat" ? "none" : "0 2px 8px rgba(0, 0, 0, 0.06)");
    }

    /* Gel glass background — lower opacity than regular glass so blur is visible.
       Scales proportionally with transparency slider: default 0.85 → gel ~0.22 */
    const gelAlpha = Math.round((0.08 + t * 0.18) * 100) / 100;
    if (isDark) {
      rs.setProperty("--gel-glass-bg", `rgba(25, 25, 35, ${gelAlpha})`);
    } else {
      rs.setProperty("--gel-glass-bg", `rgba(255, 255, 255, ${gelAlpha})`);
    }

    /* ── Pre-computed gel volumetric shadows ──
       Built in JS instead of CSS color-mix(calc()) because the complex
       color-mix + calc nesting breaks Chrome GPU compositing, which
       disables backdrop-filter on gel elements. */
    const gelScale = shadowPreset === "flat" ? 0 : shadowPreset === "soft" ? 1 : 1.6;
    rs.setProperty("--gel-shadow-scale", String(gelScale));

    const lR = isDark ? 0.3 : 1;   // --gel-reflex-light
    const dR = isDark ? 2 : 1;     // --gel-reflex-dark
    const lC = isDark ? "255,255,255" : "255,255,255"; // --gel-c-light rgb
    const dC = isDark ? "0,0,0" : "0,0,0";             // --gel-c-dark rgb

    const la = (pct: number) => Math.round(lR * pct * gelScale) / 100; // light alpha
    const da = (pct: number) => Math.round(dR * pct * gelScale) / 100; // dark alpha

    // gel-glass shadow (card-level)
    rs.setProperty("--gel-shadow", gelScale === 0 ? "none" : [
      `inset 0 0 0 1px rgba(${lC},${la(10)})`,
      `inset 1.8px 3px 0px -2px rgba(${lC},${la(90)})`,
      `inset -2px -2px 0px -2px rgba(${lC},${la(80)})`,
      `inset -3px -8px 1px -6px rgba(${lC},${la(60)})`,
      `inset -0.3px -1px 4px 0px rgba(${dC},${da(12)})`,
      `inset -1.5px 2.5px 0px -2px rgba(${dC},${da(20)})`,
      `inset 0px 3px 4px -2px rgba(${dC},${da(20)})`,
      `inset 2px -6.5px 1px -4px rgba(${dC},${da(10)})`,
      `0px 1px 5px 0px rgba(${dC},${da(10)})`,
      `0px 6px 16px 0px rgba(${dC},${da(8)})`,
    ].join(","));

    // gel-glass hover shadow (boosted)
    rs.setProperty("--gel-shadow-hover", gelScale === 0 ? "none" : [
      `inset 0 0 0 1px rgba(${lC},${la(14)})`,
      `inset 1.8px 3px 0px -2px rgba(${lC},${la(95)})`,
      `inset -2px -2px 0px -2px rgba(${lC},${la(85)})`,
      `inset -3px -8px 1px -6px rgba(${lC},${la(65)})`,
      `inset -0.3px -1px 4px 0px rgba(${dC},${da(14)})`,
      `inset -1.5px 2.5px 0px -2px rgba(${dC},${da(22)})`,
      `inset 0px 3px 4px -2px rgba(${dC},${da(22)})`,
      `inset 2px -6.5px 1px -4px rgba(${dC},${da(12)})`,
      `0px 2px 8px 0px rgba(${dC},${da(14)})`,
      `0px 12px 28px 0px rgba(${dC},${da(12)})`,
    ].join(","));

    // gel-glass-nav shadow (thicker reflexes)
    rs.setProperty("--gel-shadow-nav", gelScale === 0 ? "none" : [
      `inset 0 0 0 1.5px rgba(${lC},${la(14)})`,
      `inset 2px 3.5px 0px -2px rgba(${lC},${la(95)})`,
      `inset -2.5px -2.5px 0px -2px rgba(${lC},${la(88)})`,
      `inset -3.5px -9px 1.5px -6px rgba(${lC},${la(68)})`,
      `inset -0.4px -1.2px 5px 0px rgba(${dC},${da(15)})`,
      `inset -1.8px 3px 0px -2px rgba(${dC},${da(25)})`,
      `inset 0px 3.5px 5px -2px rgba(${dC},${da(25)})`,
      `inset 2.5px -7px 1.5px -4px rgba(${dC},${da(14)})`,
      `0px 1.5px 6px 0px rgba(${dC},${da(13)})`,
      `0px 8px 20px 0px rgba(${dC},${da(10)})`,
    ].join(","));

    // gel-glass-nav hover shadow
    rs.setProperty("--gel-shadow-nav-hover", gelScale === 0 ? "none" : [
      `inset 0 0 0 1.5px rgba(${lC},${la(18)})`,
      `inset 2px 3.5px 0px -2px rgba(${lC},${la(98)})`,
      `inset -2.5px -2.5px 0px -2px rgba(${lC},${la(92)})`,
      `inset -3.5px -9px 1.5px -6px rgba(${lC},${la(72)})`,
      `inset -0.4px -1.2px 5px 0px rgba(${dC},${da(18)})`,
      `inset -1.8px 3px 0px -2px rgba(${dC},${da(28)})`,
      `inset 0px 3.5px 5px -2px rgba(${dC},${da(28)})`,
      `inset 2.5px -7px 1.5px -4px rgba(${dC},${da(16)})`,
      `0px 2px 10px 0px rgba(${dC},${da(16)})`,
      `0px 14px 32px 0px rgba(${dC},${da(14)})`,
    ].join(","));
  }, [transparency, radiusPreset, blurIntensity, shadowPreset, theme]);

  /* Apply multi-role font families and dynamically load from Google Fonts */
  useEffect(() => {
    const root = document.documentElement;
    const rs = root.style;

    const loadFont = (fontName: string) => {
      if (fontName === "Plus Jakarta Sans" || fontName === "Google Sans" || fontName === "System Default" || fontName === SAME_AS_BODY) return;
      const linkId = `google-font-${fontName.replace(/\s+/g, "-").toLowerCase()}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;500;600;700&display=swap`;
        document.head.appendChild(link);
      }
    };

    // Body font (base for everything)
    const bodyStack = `'${fonts.body}', 'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', system-ui, sans-serif`;
    rs.setProperty("--font-sans", bodyStack);
    rs.setProperty("--font-body", bodyStack);
    loadFont(fonts.body);

    // Heading font
    if (fonts.heading === SAME_AS_BODY) {
      rs.setProperty("--font-heading", bodyStack);
    } else {
      rs.setProperty("--font-heading", `'${fonts.heading}', ${bodyStack}`);
      loadFont(fonts.heading);
    }

    // UI font
    if (fonts.ui === SAME_AS_BODY) {
      rs.setProperty("--font-ui", bodyStack);
    } else {
      rs.setProperty("--font-ui", `'${fonts.ui}', ${bodyStack}`);
      loadFont(fonts.ui);
    }

    // Mono font
    if (fonts.mono === "System Default") {
      rs.setProperty("--font-mono", "'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace");
    } else {
      rs.setProperty("--font-mono", `'${fonts.mono}', ui-monospace, monospace`);
      loadFont(fonts.mono);
    }

    // Data font (optional)
    if (fonts.data) {
      rs.setProperty("--font-data", `'${fonts.data}', ${bodyStack}`);
      loadFont(fonts.data);
    } else {
      rs.removeProperty("--font-data");
    }

    // Accent font (optional)
    if (fonts.accent) {
      rs.setProperty("--font-accent", `'${fonts.accent}', ${bodyStack}`);
      loadFont(fonts.accent);
    } else {
      rs.removeProperty("--font-accent");
    }
  }, [fonts]);

  /* Listen for custom event from Astro components to open font picker */
  useEffect(() => {
    const handler = (e: Event) => {
      const role = (e as CustomEvent).detail?.role as FontRole | undefined;
      if (role) {
        setActiveFontRole(role);
        setFontPickerOpen(true);
        // Dispatch a follow-up to tell the modal to go to browse view
        setTimeout(() => window.dispatchEvent(new CustomEvent("gelui:font-picker-browse")), 50);
      } else {
        setFontPickerOpen(true);
      }
    };
    window.addEventListener("gelui:open-font-picker", handler);

    const resetHandler = () => {
      setFonts({ ...DEFAULT_FONTS });
    };
    window.addEventListener("gelui:reset-fonts", resetHandler);

    // Open appearance modal from Astro
    const openAppHandler = () => setModalOpen(true);
    window.addEventListener("gelui:open-appearance", openAppHandler);

    return () => {
      window.removeEventListener("gelui:open-font-picker", handler);
      window.removeEventListener("gelui:reset-fonts", resetHandler);
      window.removeEventListener("gelui:open-appearance", openAppHandler);
    };
  }, []);

  return (
    <AppearanceContext.Provider
      value={{
        transparency, setTransparency,
        radiusPreset, setRadiusPreset,
        blurIntensity, setBlurIntensity,
        shadowPreset, setShadowPreset,
        theme, setTheme, toggleTheme,
        resetToDefaults,
        modalOpen, openModal, closeModal,
        fonts, setFontRole,
        fontPickerOpen, openFontPicker, closeFontPicker,
        activeFontRole,
        fontPreviewText, setFontPreviewText,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return ctx;
}
