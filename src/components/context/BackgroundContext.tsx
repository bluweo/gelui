import React, {
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

export type BgType = "image" | "video" | "color";

export interface BgOption {
  id: string;
  src: string;
  label: string;
  type?: BgType;
  theme?: "light" | "dark";
}

/* ------------------------------------------------------------------ */
/*  CSS color/pattern background presets                               */
/* ------------------------------------------------------------------ */

export interface ColorBgPreset {
  id: string;
  label: string;
  style: React.CSSProperties;
  theme?: "light" | "dark";
}

export const COLOR_BACKGROUNDS: ColorBgPreset[] = [
  /* -- Light theme -- */
  {
    id: "dot-grid",
    label: "Dot Grid",
    theme: "light",
    style: {
      backgroundColor: "#ffffff",
      backgroundImage:
        "radial-gradient(circle, #d0d0d0 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    },
  },
  {
    id: "line-grid",
    label: "Line Grid",
    theme: "light",
    style: {
      backgroundColor: "#ffffff",
      backgroundImage:
        "radial-gradient(circle, #b8b8b8 1.2px, transparent 1.2px), linear-gradient(#e0e0e0 0.5px, transparent 0.5px), linear-gradient(90deg, #e0e0e0 0.5px, transparent 0.5px)",
      backgroundSize: "24px 24px, 24px 24px, 24px 24px",
      backgroundPosition: "12px 12px, 0 0, 0 0",
    },
  },
  {
    id: "cross-grid",
    label: "Cross Grid",
    theme: "light",
    style: {
      backgroundColor: "#ffffff",
      backgroundImage:
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cline x1='12' y1='8' x2='12' y2='16' stroke='%23dcdcdc' stroke-width='1'/%3E%3Cline x1='8' y1='12' x2='16' y2='12' stroke='%23dcdcdc' stroke-width='1'/%3E%3C/svg%3E")`,
      backgroundSize: "24px 24px",
    },
  },
  /* -- Light gradient + dot grid -- */
  {
    id: "gray-dot",
    label: "Ash",
    theme: "light",
    style: {
      background:
        "radial-gradient(circle, #b0b0b0 1px, transparent 1px), linear-gradient(160deg, #ffffff 0%, #e8e8e8 14%, #f5f5f5 28%, #d5d5d5 42%, #efefef 56%, #c8c8c8 70%, #e0e0e0 85%, #f8f8f8 100%)",
      backgroundSize: "20px 20px, 100% 100%",
    },
  },
  /* -- Dark theme -- */
  {
    id: "dark-dot-grid",
    label: "Dot Grid",
    theme: "dark",
    style: {
      backgroundColor: "#121218",
      backgroundImage:
        "radial-gradient(circle, #2a2a35 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    },
  },
  {
    id: "dark-line-grid",
    label: "Line Grid",
    theme: "dark",
    style: {
      backgroundColor: "#121218",
      backgroundImage:
        "radial-gradient(circle, #3a3a48 1.2px, transparent 1.2px), linear-gradient(#1e1e28 0.5px, transparent 0.5px), linear-gradient(90deg, #1e1e28 0.5px, transparent 0.5px)",
      backgroundSize: "24px 24px, 24px 24px, 24px 24px",
      backgroundPosition: "12px 12px, 0 0, 0 0",
    },
  },
  {
    id: "dark-cross-grid",
    label: "Cross Grid",
    theme: "dark",
    style: {
      backgroundColor: "#121218",
      backgroundImage:
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cline x1='12' y1='8' x2='12' y2='16' stroke='%232a2a35' stroke-width='1'/%3E%3Cline x1='8' y1='12' x2='16' y2='12' stroke='%232a2a35' stroke-width='1'/%3E%3C/svg%3E")`,
      backgroundSize: "24px 24px",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Context value                                                      */
/* ------------------------------------------------------------------ */

interface BackgroundContextValue {
  currentBg: string;
  currentBgId: string;
  currentBgType: BgType;
  hydrated: boolean;
  setBg: (id: string, src: string, type?: BgType) => void;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
}

/* ------------------------------------------------------------------ */
/*  Defaults (color presets)                                           */
/* ------------------------------------------------------------------ */

const THEME_DEFAULTS = {
  light: { id: "light:green-field", src: "/backgrounds/light/green-field.webp", type: "image" as BgType },
  dark: { id: "dark:night-desert", src: "/backgrounds/dark/night-desert.jpg", type: "image" as BgType },
};

const DEFAULT_BG_ID = THEME_DEFAULTS.light.id;
const DEFAULT_BG_SRC = THEME_DEFAULTS.light.src;
const DEFAULT_BG_TYPE: BgType = THEME_DEFAULTS.light.type;

/* ------------------------------------------------------------------ */
/*  localStorage persistence                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY_LIGHT = "gelui-background-light";
const STORAGE_KEY_DARK = "gelui-background-dark";

interface StoredBackground {
  id: string;
  src: string;
  type?: BgType;
}

function loadStored(theme: "light" | "dark"): StoredBackground | null {
  if (typeof window === "undefined") return null;
  const key = theme === "dark" ? STORAGE_KEY_DARK : STORAGE_KEY_LIGHT;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredBackground;
    if (parsed.id && parsed.src) return parsed;
    return null;
  } catch {
    return null;
  }
}

function saveStored(theme: "light" | "dark", bg: StoredBackground) {
  const key = theme === "dark" ? STORAGE_KEY_DARK : STORAGE_KEY_LIGHT;
  try {
    localStorage.setItem(key, JSON.stringify(bg));
  } catch {
    /* quota exceeded -- ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const BackgroundContext = createContext<BackgroundContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function BackgroundProvider({ children }: { children: ReactNode }) {
  /* Detect current theme (data-theme attribute) */
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const check = () =>
      setTheme(
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light",
      );
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => obs.disconnect();
  }, []);

  /* Initialize with static defaults (same on server + client to avoid hydration mismatch).
     Real values from localStorage are loaded in the hydration effect below. */
  const [currentBg, setCurrentBg] = useState(THEME_DEFAULTS.light.src);
  const [currentBgId, setCurrentBgId] = useState(THEME_DEFAULTS.light.id);
  const [currentBgType, setCurrentBgType] = useState<BgType>(THEME_DEFAULTS.light.type);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const hydratedRef = useRef(false);
  const prevThemeRef = useRef<"light" | "dark">("light");

  /* Hydrate from localStorage after first mount */
  useEffect(() => {
    const detectedTheme =
      document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    prevThemeRef.current = detectedTheme;
    const stored = loadStored(detectedTheme);
    const defaults = THEME_DEFAULTS[detectedTheme];
    setCurrentBgId(stored?.id ?? defaults.id);
    setCurrentBg(stored?.src ?? defaults.src);
    setCurrentBgType(stored?.type ?? defaults.type);
    hydratedRef.current = true;
    setHydrated(true);
  }, []);

  /* When theme changes, swap to that theme's stored background (or default) */
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (theme === prevThemeRef.current) return;
    prevThemeRef.current = theme;

    const themeBg = loadStored(theme);
    const fallback = THEME_DEFAULTS[theme];
    setCurrentBgId(themeBg?.id ?? fallback.id);
    setCurrentBg(themeBg?.src ?? fallback.src);
    setCurrentBgType(themeBg?.type ?? fallback.type);
  }, [theme]);

  /* Persist to localStorage on every change (after hydration) */
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveStored(theme, {
      id: currentBgId,
      src: currentBg,
      type: currentBgType,
    });
  }, [currentBgId, currentBg, currentBgType, theme]);

  const setBg = useCallback(
    (id: string, src: string, type: BgType = "image") => {
      setCurrentBgId(id);
      setCurrentBg(src);
      setCurrentBgType(type);
    },
    [],
  );

  const openPicker = useCallback(() => setPickerOpen(true), []);
  const closePicker = useCallback(() => setPickerOpen(false), []);

  // Listen for custom events from Astro components
  useEffect(() => {
    const openHandler = () => setPickerOpen(true);
    window.addEventListener("gelui:open-background", openHandler);

    // Set background from external components (e.g., AdaptiveColorToggle)
    const setHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.id && detail?.src) {
        setBg(detail.id, detail.src, detail.type || "image");
      }
    };
    window.addEventListener("gelui:set-background", setHandler);

    return () => {
      window.removeEventListener("gelui:open-background", openHandler);
      window.removeEventListener("gelui:set-background", setHandler);
    };
  }, [setBg]);

  return (
    <BackgroundContext.Provider
      value={{
        currentBg,
        currentBgId,
        currentBgType,
        hydrated,
        setBg,
        pickerOpen,
        openPicker,
        closePicker,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return ctx;
}
