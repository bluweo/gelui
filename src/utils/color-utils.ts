import { colors } from "@/tokens";

/** Returns true when the background is light enough to need dark text */
export function isLightBg(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150;
}

/** Contrast-safe text color for overlaying on a given background */
export function textOnBg(hex: string): string {
  return isLightBg(hex) ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.85)";
}

export function textOnBgMuted(hex: string): string {
  return isLightBg(hex) ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)";
}

/** Resolve a semantic color value (CSS var or hex) to an actual hex string */
export function resolveSemanticHex(value: string): string {
  if (value.startsWith("#")) return value;
  const m = value.match(/var\(--raw-([a-zA-Z0-9]+)(?:-(\d+))?\)/);
  if (!m) return "#888888";
  const [, name, shade] = m;
  const raw = colors.raw as Record<string, unknown>;
  const entry = raw[name];
  if (!entry) return "#888888";
  if (typeof entry === "string") return entry;
  if (shade && typeof entry === "object" && entry !== null) {
    const hex = (entry as Record<string, string>)[shade];
    if (hex) return hex;
  }
  return "#888888";
}
