import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useBackground, COLOR_BACKGROUNDS } from "./BackgroundContext";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ContrastTheme = "light" | "dark";

interface ContrastContextValue {
  /** Sample the contrast at a given bounding rect (viewport coords). */
  contrastAt: (rect: DOMRect) => ContrastTheme;
  /** Bumps on every background change — consumers re-run effects on this. */
  version: number;
}

/* ------------------------------------------------------------------ */
/*  Luminance helpers                                                  */
/* ------------------------------------------------------------------ */

/** Weighted luminance from RGB (0–255). Returns 0–255. */
function luminance(r: number, g: number, b: number): number {
  return r * 0.299 + g * 0.587 + b * 0.114;
}

/** Parse a CSS color string (hex, rgb, rgba) to [r, g, b]. */
function parseCssColor(color: string): [number, number, number] | null {
  // #hex
  if (color.startsWith("#")) {
    const h = color.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b];
  }
  // rgb() / rgba()
  const m = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
  return null;
}

/* ------------------------------------------------------------------ */
/*  Cover-fit canvas drawing (matches CSS bg-cover bg-center)          */
/* ------------------------------------------------------------------ */

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const imgRatio = iw / ih;
  const canvasRatio = cw / ch;

  let sx: number, sy: number, sw: number, sh: number;

  if (imgRatio > canvasRatio) {
    // Image wider than canvas → crop horizontally
    sh = ih;
    sw = ih * canvasRatio;
    sx = (iw - sw) / 2;
    sy = 0;
  } else {
    // Image taller than canvas → crop vertically
    sw = iw;
    sh = iw / canvasRatio;
    sx = 0;
    sy = (ih - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ContrastContext = createContext<ContrastContextValue | null>(null);

/**
 * Global reference for portal components that render outside the React tree.
 * Set by the ContrastProvider, readable by useContrast() fallback.
 */
let _globalContrastRef: ContrastContextValue | null = null;
export function getGlobalContrast(): ContrastContextValue | null {
  return _globalContrastRef;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function ContrastProvider({ children }: { children: ReactNode }) {
  const { currentBg, currentBgId, currentBgType, hydrated } = useBackground();
  const [version, setVersion] = useState(0);

  // Uniform theme for color presets and videos (no canvas needed)
  const uniformThemeRef = useRef<ContrastTheme | null>(null);

  // Shared offscreen canvas for image backgrounds
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasReadyRef = useRef(false);

  /* ── Rebuild contrast source on background change ── */
  useEffect(() => {
    if (!hydrated) return;

    canvasReadyRef.current = false;
    uniformThemeRef.current = null;

    /* ── Color preset: use theme metadata directly ── */
    if (currentBgType === "color") {
      const preset = COLOR_BACKGROUNDS.find((p) => p.id === currentBgId);
      if (preset?.theme) {
        // Background theme "light" → background is light → need dark text → contrast is "light"
        uniformThemeRef.current = preset.theme;
      } else if (preset?.style) {
        // Try to parse backgroundColor
        const bg =
          (preset.style.backgroundColor as string) ??
          (preset.style.background as string);
        if (bg) {
          const rgb = parseCssColor(bg);
          if (rgb) {
            uniformThemeRef.current =
              luminance(...rgb) > 150 ? "light" : "dark";
          }
        }
      }
      uniformThemeRef.current ??= "light";
      setVersion((v) => v + 1);
      return;
    }

    /* ── Video: extract theme from ID (e.g. "video:dark:name") ── */
    if (currentBgType === "video") {
      if (currentBgId.includes("dark")) {
        uniformThemeRef.current = "dark";
      } else {
        uniformThemeRef.current = "light";
      }
      setVersion((v) => v + 1);
      return;
    }

    /* ── Image: draw to canvas for per-region sampling ── */
    if (currentBgType === "image" && currentBg) {
      // Extract theme hint from ID as initial fallback
      if (currentBgId.includes("dark")) {
        uniformThemeRef.current = "dark";
      } else {
        uniformThemeRef.current = "light";
      }
      // Bump version immediately with fallback, then refine with canvas
      setVersion((v) => v + 1);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const cw = window.innerWidth;
        const ch = window.innerHeight;

        if (!canvasRef.current) {
          canvasRef.current = document.createElement("canvas");
        }
        const canvas = canvasRef.current;
        canvas.width = cw;
        canvas.height = ch;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctxRef.current = ctx;

        drawCover(ctx, img, cw, ch);
        canvasReadyRef.current = true;
        uniformThemeRef.current = null; // canvas is now the source of truth
        setVersion((v) => v + 1);
      };
      img.src = currentBg;
      return;
    }

    // Fallback
    uniformThemeRef.current = "light";
    setVersion((v) => v + 1);
  }, [currentBg, currentBgId, currentBgType, hydrated]);

  /* ── Resize handler: redraw canvas for images ── */
  useEffect(() => {
    if (!hydrated) return;

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (currentBgType !== "image" || !canvasReadyRef.current) return;
        // Reload and redraw
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const cw = window.innerWidth;
          const ch = window.innerHeight;
          const canvas = canvasRef.current!;
          canvas.width = cw;
          canvas.height = ch;
          const ctx = ctxRef.current ?? canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) return;
          ctxRef.current = ctx;
          drawCover(ctx, img, cw, ch);
          setVersion((v) => v + 1);
        };
        img.src = currentBg;
      }, 200);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [currentBg, currentBgType, hydrated]);

  /* ── Sampling function ── */
  const contrastAt = useCallback(
    (rect: DOMRect, bias: number = 0): ContrastTheme => {
      const threshold = 150;

      // If we have a uniform theme (color preset, video, or image fallback)
      if (uniformThemeRef.current !== null) {
        // For uniform themes, bias can still shift the result
        // e.g. a "light" background with bias=-40 may become "dark"
        if (bias !== 0) {
          // Approximate: "light" ≈ lum 180, "dark" ≈ lum 80
          const approxLum = uniformThemeRef.current === "light" ? 180 : 80;
          return (approxLum + bias) > threshold ? "light" : "dark";
        }
        return uniformThemeRef.current;
      }

      // Canvas sampling for images
      if (!canvasReadyRef.current || !ctxRef.current) {
        return "light"; // safe default
      }

      const ctx = ctxRef.current;
      const cw = canvasRef.current?.width ?? window.innerWidth;
      const ch = canvasRef.current?.height ?? window.innerHeight;

      // Clamp rect to canvas bounds
      const x = Math.max(0, Math.min(Math.floor(rect.x), cw - 1));
      const y = Math.max(0, Math.min(Math.floor(rect.y), ch - 1));
      const w = Math.max(1, Math.min(Math.floor(rect.width), cw - x));
      const h = Math.max(1, Math.min(Math.floor(rect.height), ch - y));

      let imageData: ImageData;
      try {
        imageData = ctx.getImageData(x, y, w, h);
      } catch {
        return "light";
      }

      const data = imageData.data;
      const stride = 8; // sample every 8th pixel for performance
      let totalLum = 0;
      let count = 0;

      for (let i = 0; i < data.length; i += 4 * stride) {
        totalLum += luminance(data[i], data[i + 1], data[i + 2]);
        count++;
      }

      if (count === 0) return "light";
      const avgLum = totalLum / count;
      return (avgLum + bias) > threshold ? "light" : "dark";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version],
  );

  // Expose globally for portal components that render outside the React tree
  const value = { contrastAt, version };
  _globalContrastRef = value;

  return (
    <ContrastContext.Provider value={value}>
      {children}
    </ContrastContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook — raw context access                                         */
/* ------------------------------------------------------------------ */

export function useContrast(): ContrastContextValue | null {
  return useContext(ContrastContext);
}
