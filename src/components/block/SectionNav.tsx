import { useState, useEffect, useCallback, useRef } from "react";

/**
 * SectionNav — sticky right-side table of contents
 * Auto-discovers sections via [data-section] attributes in the DOM.
 * Shows only at ≥1280px. Highlights current section via IntersectionObserver.
 */

interface Section {
  id: string;
  label: string;
  el: Element;
}

export function SectionNav() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [contrast, setContrast] = useState<"light" | "dark">("light");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const clickLockRef = useRef<string | null>(null);
  const clickLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check viewport width
  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Watch contrast from main element
  useEffect(() => {
    const mainEl = document.querySelector("main[data-contrast]");
    if (!mainEl) return;

    const check = () => {
      setContrast((mainEl.getAttribute("data-contrast") as "light" | "dark") || "light");
    };
    check();

    const obs = new MutationObserver(check);
    obs.observe(mainEl, { attributes: true, attributeFilter: ["data-contrast"] });
    return () => obs.disconnect();
  }, []);

  // Discover sections and observe
  const discover = useCallback(() => {
    const els = document.querySelectorAll("[data-section]");
    const found: Section[] = [];
    els.forEach((el, i) => {
      const label = el.getAttribute("data-section") || "";
      if (label) {
        const id = el.id || `section-${i}`;
        found.push({ id, label, el });
      }
    });
    setSections(found);

    // Setup IntersectionObserver
    if (observerRef.current) observerRef.current.disconnect();

    const visibleSections = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const label = entry.target.getAttribute("data-section") || "";
          if (entry.isIntersecting) {
            visibleSections.set(label, entry.intersectionRatio);
          } else {
            visibleSections.delete(label);
          }
        });

        // Find the most visible section
        let best = "";
        let bestRatio = 0;
        visibleSections.forEach((ratio, label) => {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            best = label;
          }
        });

        // Only update if not locked by a recent click
        if (best && !clickLockRef.current) setActiveId(best);
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    found.forEach((s) => observerRef.current?.observe(s.el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Discover on mount and after Astro page transitions
  useEffect(() => {
    const cleanup = discover();

    // Re-discover after Astro view transitions
    const handleTransition = () => {
      setTimeout(discover, 100);
    };
    document.addEventListener("astro:page-load", handleTransition);

    return () => {
      cleanup?.();
      document.removeEventListener("astro:page-load", handleTransition);
    };
  }, [discover]);

  const handleClick = useCallback((label: string, el: Element) => {
    // Lock active to clicked section — ignore observer for 1.5s
    clickLockRef.current = label;
    setActiveId(label);

    if (clickLockTimerRef.current) clearTimeout(clickLockTimerRef.current);
    clickLockTimerRef.current = setTimeout(() => {
      clickLockRef.current = null;
    }, 1500);

    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }, []);

  if (!visible || sections.length === 0) return null;

  const isDark = contrast === "dark";
  const textColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)";
  const activeTextColor = isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.85)";
  const lineColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
  const dotActiveColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)";

  return (
    <nav
      className="fixed z-50 flex flex-col"
      style={{
        top: "50%",
        right: 20,
        transform: "translateY(-50%)",
        width: 120,
        pointerEvents: "auto",
      }}
      aria-label="Page sections"
    >
      <div className="relative flex flex-col gap-0 pl-3">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-1 bottom-1 w-px"
          style={{ background: lineColor }}
        />

        {sections.map((s) => {
          const isActive = activeId === s.label;
          return (
            <button
              key={s.label}
              onClick={() => handleClick(s.label, s.el)}
              className="prim-section-nav-item"
              data-active={isActive || undefined}
              style={{
                "--nav-color": isActive ? activeTextColor : textColor,
                "--nav-dot-bg": isActive ? dotActiveColor : lineColor,
              } as React.CSSProperties}
            >
              {/* Dot on the line */}
              <div className={`prim-section-nav-dot ${isActive ? "prim-section-nav-dot-active" : ""}`} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
