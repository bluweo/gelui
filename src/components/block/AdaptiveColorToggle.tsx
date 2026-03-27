import { useState, useEffect, useRef, useCallback } from "react";
import { Toggle } from "@/primitives/controls";
import { COLOR_BACKGROUNDS } from "@/components/context/BackgroundContext";

/**
 * AdaptiveColorToggle — toggles random backgrounds to demonstrate
 * contrast adaptation. Uses custom events to communicate with
 * BackgroundContext (since this is a separate Astro island).
 */
export function AdaptiveColorToggle() {
  const [active, setActive] = useState(false);
  const savedBgRef = useRef<{ id: string; src: string; type: string } | null>(null);
  const lastRandomIdRef = useRef<string | null>(null);
  const [allBgs, setAllBgs] = useState<Array<{ id: string; src: string; type: string; theme: string }>>([]);

  // Get current theme
  const getTheme = (): "light" | "dark" => {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  };

  // Gather all available backgrounds on mount
  useEffect(() => {
    const bgs: Array<{ id: string; src: string; type: string; theme: string }> = [];

    // Color backgrounds
    COLOR_BACKGROUNDS.forEach((c) => {
      bgs.push({ id: c.id, src: JSON.stringify(c.style), type: "color", theme: c.theme });
    });

    // Fetch image + video backgrounds
    Promise.all([
      fetch("/api/backgrounds").then((r) => r.json()).catch(() => []),
      fetch("/api/video-backgrounds").then((r) => r.json()).catch(() => []),
    ]).then(([images, videos]) => {
      (images as any[]).forEach((img) =>
        bgs.push({ id: img.id, src: img.src, type: "image", theme: img.theme || "light" }),
      );
      (videos as any[]).forEach((v) =>
        bgs.push({ id: v.id, src: v.src, type: "video", theme: v.theme || "dark" }),
      );
      setAllBgs([...bgs]);
    });

    setAllBgs(bgs);
  }, []);

  // Read current background from localStorage (per-theme storage)
  const readCurrentBg = useCallback(() => {
    try {
      const theme = getTheme();
      const key = theme === "dark" ? "gelui-background-dark" : "gelui-background-light";
      const stored = JSON.parse(localStorage.getItem(key) || "null");
      if (stored?.id && stored?.src) {
        return { id: stored.id, src: stored.src, type: stored.type || "image" };
      }
      // Fallback to defaults
      return theme === "dark"
        ? { id: "dark:night-desert", src: "/backgrounds/dark/night-desert.jpg", type: "image" }
        : { id: "light:green-field", src: "/backgrounds/light/green-field.webp", type: "image" };
    } catch {
      return { id: "light:green-field", src: "/backgrounds/light/green-field.webp", type: "image" };
    }
  }, []);

  const pickRandom = useCallback(() => {
    if (allBgs.length === 0) return;
    // Filter by current theme only
    const theme = getTheme();
    const themed = allBgs.filter((b) => b.theme === theme);
    const pool = themed.length > 0 ? themed : allBgs;
    // Exclude last pick
    const candidates = pool.filter((b) => b.id !== lastRandomIdRef.current);
    const pick = candidates[Math.floor(Math.random() * candidates.length)] || pool[0];
    lastRandomIdRef.current = pick.id;

    window.dispatchEvent(
      new CustomEvent("gelui:set-background", {
        detail: { id: pick.id, src: pick.src, type: pick.type },
      }),
    );
  }, [allBgs]);

  const handleToggle = useCallback(
    (checked: boolean) => {
      if (checked) {
        // Save current background BEFORE changing
        savedBgRef.current = readCurrentBg();
        setActive(true);
        pickRandom();
      } else {
        // Restore saved original background
        setActive(false);
        const saved = savedBgRef.current;
        if (saved) {
          window.dispatchEvent(
            new CustomEvent("gelui:set-background", {
              detail: saved,
            }),
          );
        }
      }
    },
    [readCurrentBg, pickRandom],
  );

  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-[11px] font-[600] contrast-muted whitespace-nowrap">Adaptive Color</span>
      <Toggle checked={active} onChange={handleToggle} />
    </div>
  );
}
