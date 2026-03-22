/**
 * Color extraction from images + scale generation
 * Uses Canvas API for pixel sampling and median-cut for dominant colors
 */

/* ── Hex ↔ RGB ↔ HSL helpers ── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/* ── Color distance (Euclidean in RGB) ── */
function colorDistance(a: [number, number, number], b: [number, number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

/* ── Median Cut color quantization ── */
interface ColorBucket {
  pixels: [number, number, number][];
}

function getRange(pixels: [number, number, number][], channel: number): number {
  let min = 255, max = 0;
  for (const p of pixels) {
    if (p[channel] < min) min = p[channel];
    if (p[channel] > max) max = p[channel];
  }
  return max - min;
}

function medianCut(pixels: [number, number, number][], maxColors: number): [number, number, number][] {
  if (pixels.length === 0) return [];

  let buckets: ColorBucket[] = [{ pixels }];

  while (buckets.length < maxColors) {
    // Find bucket with largest range
    let bestIdx = 0, bestRange = 0, bestChannel = 0;
    for (let i = 0; i < buckets.length; i++) {
      for (let ch = 0; ch < 3; ch++) {
        const range = getRange(buckets[i].pixels, ch);
        if (range > bestRange) {
          bestRange = range;
          bestIdx = i;
          bestChannel = ch;
        }
      }
    }

    if (bestRange === 0) break;

    const bucket = buckets[bestIdx];
    bucket.pixels.sort((a, b) => a[bestChannel] - b[bestChannel]);
    const mid = Math.floor(bucket.pixels.length / 2);

    buckets.splice(bestIdx, 1, { pixels: bucket.pixels.slice(0, mid) }, { pixels: bucket.pixels.slice(mid) });
  }

  // Get average color of each bucket
  return buckets
    .filter((b) => b.pixels.length > 0)
    .map((b) => {
      const avg: [number, number, number] = [0, 0, 0];
      for (const p of b.pixels) {
        avg[0] += p[0]; avg[1] += p[1]; avg[2] += p[2];
      }
      return [Math.round(avg[0] / b.pixels.length), Math.round(avg[1] / b.pixels.length), Math.round(avg[2] / b.pixels.length)] as [number, number, number];
    });
}

/* ── Extract dominant colors from image ── */
export async function extractDominantColors(imageUrl: string, maxColors: number = 5): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 80; // Small for performance
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve([]); return; }

      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      const pixels: [number, number, number][] = [];
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        // Skip transparent, near-white, and near-black pixels
        if (a < 128) continue;
        const brightness = r * 0.299 + g * 0.587 + b * 0.114;
        if (brightness > 245 || brightness < 10) continue;
        pixels.push([r, g, b]);
      }

      if (pixels.length === 0) { resolve([]); return; }

      const colors = medianCut(pixels, maxColors * 2); // Oversample then deduplicate

      // Deduplicate similar colors (distance < 40)
      const unique: [number, number, number][] = [];
      for (const c of colors) {
        if (!unique.some((u) => colorDistance(u, c) < 40)) {
          unique.push(c);
        }
      }

      // Sort by saturation (most vibrant first)
      unique.sort((a, b) => {
        const [, sa] = rgbToHsl(...a);
        const [, sb] = rgbToHsl(...b);
        return sb - sa;
      });

      resolve(unique.slice(0, maxColors).map((c) => rgbToHex(...c)));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/* ── Generate 50–900 color scale from a base hex ── */
export function generateScale(hex: string): Record<string, string> {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);

  return {
    "50": hslToHex(h, s * 0.25, 0.97),
    "100": hslToHex(h, s * 0.35, 0.93),
    "200": hslToHex(h, s * 0.45, 0.85),
    "300": hslToHex(h, s * 0.65, 0.72),
    "400": hslToHex(h, s * 0.85, 0.55),
    "500": hex,
    "600": hslToHex(h, s * 0.9, l * 0.78),
    "700": hslToHex(h, s * 0.85, l * 0.6),
    "800": hslToHex(h, s * 0.8, l * 0.42),
    "900": hslToHex(h, s * 0.75, l * 0.28),
  };
}

/* ── Re-export isLightBg logic ── */
export function isLightColor(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150;
}

export function textOnColor(hex: string): string {
  return isLightColor(hex) ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.88)";
}

export function textOnColorMuted(hex: string): string {
  return isLightColor(hex) ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)";
}

/* ── Auto-label colors by role ── */
const ROLE_LABELS = ["Primary", "Secondary", "Accent", "Highlight", "Muted"];
export function autoLabelColors(hexColors: string[]): { hex: string; label: string; role: string }[] {
  return hexColors.slice(0, 5).map((hex, i) => ({
    hex,
    label: ROLE_LABELS[i] || `Color ${i + 1}`,
    role: i === 0 ? "primary" : i === 1 ? "secondary" : "accent",
  }));
}
