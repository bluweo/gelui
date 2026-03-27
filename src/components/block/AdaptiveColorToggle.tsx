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
  const [allBgs, setAllBgs] = useState<Array<{ id: string; src: string; type: string }>>([]);

  // Gather all available backgrounds on mount
  useEffect(() => {
    const bgs: Array<{ id: string; src: string; type: string }> = [];

    // Color backgrounds (available immediately)
    COLOR_BACKGROUNDS.forEach((c) => {
      bgs.push({ id: c.id, src: JSON.stringify(c.style), type: "color" });
    });

    // Fetch image + video backgrounds
    Promise.all([
      fetch("/api/backgrounds").then((r) => r.json()).catch(() => []),
      fetch("/api/video-backgrounds").then((r) => r.json()).catch(() => []),
    ]).then(([images, videos]) => {
      (images as any[]).forEach((img) => bgs.push({ id: img.id, src: img.src, type: "image" }));
      (videos as any[]).forEach((v) => bgs.push({ id: v.id, src: v.src, type: "video" }));
      setAllBgs([...bgs]);
    });

    setAllBgs(bgs);
  }, []);

  // Read current background from localStorage
  const readCurrentBg = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("gelui-background") || "{}");
      const theme = JSON.parse(localStorage.getItem("gelui-appearance") || "{}").theme || "light";
      const themeData = stored[theme] || {};
      return {
        id: themeData.id || "",
        src: themeData.src || "",
        type: themeData.type || "image",
      };
    } catch {
      return { id: "", src: "", type: "image" };
    }
  }, []);

  const pickRandom = useCallback(() => {
    if (allBgs.length === 0) return;
    const candidates = allBgs.filter((b) => b.id !== lastRandomIdRef.current);
    const pick = candidates[Math.floor(Math.random() * candidates.length)] || allBgs[0];
    lastRandomIdRef.current = pick.id;

    // Dispatch event for BackgroundContext to pick up
    window.dispatchEvent(
      new CustomEvent("gelui:set-background", {
        detail: { id: pick.id, src: pick.src, type: pick.type },
      }),
    );
  }, [allBgs]);

  const handleToggle = useCallback(
    (checked: boolean) => {
      if (checked) {
        // Save current background
        savedBgRef.current = readCurrentBg();
        setActive(true);
        pickRandom();
      } else {
        // Restore original
        setActive(false);
        if (savedBgRef.current) {
          window.dispatchEvent(
            new CustomEvent("gelui:set-background", {
              detail: savedBgRef.current,
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
