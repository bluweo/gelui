import { useState, useEffect, type RefObject } from "react";
import { useContrast, getGlobalContrast, type ContrastTheme } from "@/context/ContrastContext";

/**
 * Lightweight luminance helper for standalone fallback (no canvas).
 * Parses the computed background-color from the body or nearest ancestor.
 */
function getBodyLuminance(): number {
  const bg = getComputedStyle(document.body).backgroundColor;
  const m = bg.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) {
    return parseInt(m[1]) * 0.299 + parseInt(m[2]) * 0.587 + parseInt(m[3]) * 0.114;
  }
  return 200; // default to light
}

interface UseContrastOptions {
  /** Default contrast when not yet computed. */
  defaultContrast?: ContrastTheme;
  /**
   * Luminance bias offset (–255 to +255).
   * Negative values = treat background as darker (e.g. for elements on gel/glass surfaces
   * where the frosted material darkens the underlying background).
   * Use -30 to -40 for gel panels, -20 for glass panels.
   */
  bias?: number;
  /**
   * Optional key that forces re-evaluation when changed.
   * Useful for portal elements (e.g. context menu) whose position changes dynamically.
   */
  positionKey?: string;
}

/**
 * Samples the background behind the given element and returns whether
 * that region is "light" or "dark".
 *
 * - "light" → background is light → use dark text
 * - "dark"  → background is dark  → use light text
 *
 * When used inside a ContrastProvider (via DSShell/AppProviders), uses
 * the shared canvas-based sampling for per-region accuracy.
 *
 * When used standalone (e.g. separate Astro island), falls back to
 * simple body background-color luminance detection.
 *
 * Re-runs automatically when the background changes or the window resizes.
 */
export function useContrastColor(
  ref: RefObject<HTMLElement | null>,
  options: ContrastTheme | UseContrastOptions = "light",
): ContrastTheme {
  // Support both old API (string) and new API (object)
  const { defaultContrast = "light", bias = 0, positionKey } =
    typeof options === "string" ? { defaultContrast: options, positionKey: undefined } : options;

  const ctx = useContrast();
  const [contrast, setContrast] = useState<ContrastTheme>(defaultContrast);

  // ── Sampling function ──
  const sample = () => {
    if (!ref.current) return;

    // Try React context first, then global ref (for portals outside the tree)
    const provider = ctx ?? getGlobalContrast();

    if (provider) {
      // Full canvas-based sampling with optional bias
      const rect = ref.current.getBoundingClientRect();
      setContrast(provider.contrastAt(rect, bias));
    } else {
      // Standalone fallback: body bg luminance
      setContrast((getBodyLuminance() + bias) > 150 ? "light" : "dark");
    }
  };

  // ── Main effect: re-run on version change, bias change, or position key change ──
  useEffect(() => {
    if (!ref.current) return;

    const id = requestAnimationFrame(() => sample());
    return () => cancelAnimationFrame(id);
  }, [ref, ctx?.contrastAt, ctx?.version, bias, positionKey]);

  // ── Resize handler ──
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => sample(), 250);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [ref, ctx?.contrastAt, bias]);

  return contrast;
}
