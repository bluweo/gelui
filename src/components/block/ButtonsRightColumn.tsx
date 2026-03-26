import { useRef, useState, useEffect } from "react";
import { Button } from "@/primitives/buttons";

/** Read contrast from nearest ancestor with data-contrast, or main element */
function useInheritedContrast(ref: React.RefObject<HTMLElement | null>) {
  const [contrast, setContrast] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!ref.current) return;
    const check = () => {
      // Look for parent (not self) with data-contrast, fall back to main
      const parent = ref.current?.parentElement?.closest("[data-contrast]") as HTMLElement | null;
      const main = document.querySelector("main[data-contrast]") as HTMLElement | null;
      const value = parent?.getAttribute("data-contrast") || main?.getAttribute("data-contrast") || "light";
      setContrast(value as "light" | "dark");
    };
    check();
    const main = document.querySelector("main[data-contrast]");
    if (main) {
      const obs = new MutationObserver(check);
      obs.observe(main, { attributes: true, attributeFilter: ["data-contrast"] });
      return () => obs.disconnect();
    }
  }, [ref]);

  return contrast;
}

export function ButtonsRightColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const contrast = useInheritedContrast(ref);

  return (
    <div ref={ref} data-contrast={contrast} className="flex flex-col gap-5">
      {/* Gel Buttons table */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="px-3 py-2 border-b contrast-border">
          <span className="type-overline contrast-muted">Gel</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Sizes</span>
          <div className="flex items-center gap-2.5 flex-wrap justify-end">
            <Button variant="gel" size="sm" shape="pill">Small</Button>
            <Button variant="gel" size="md" shape="pill">Medium</Button>
            <Button variant="gel" size="lg" shape="pill">Large</Button>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="type-label contrast-muted">Icons</span>
          <div className="flex items-center gap-2.5">
            <Button variant="gel" size="sm" shape="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg>
            </Button>
            <Button variant="gel" size="md" shape="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Glass Buttons table */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="px-3 py-2 border-b contrast-border">
          <span className="type-overline contrast-muted">Glass</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Pill</span>
          <Button variant="glass" size="md" shape="pill">Glass Pill</Button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="type-label contrast-muted">Rounded</span>
          <Button variant="glass" size="md" shape="rounded">Glass Rounded</Button>
        </div>
      </div>

      {/* States table */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="px-3 py-2 border-b contrast-border">
          <span className="type-overline contrast-muted">States</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Default</span>
          <Button variant="gel" size="md" shape="pill">Default</Button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Hover</span>
          <Button variant="gel" size="md" shape="pill" style={{ transform: "scale(1.05)" }}>Hover</Button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="type-label contrast-muted">Disabled</span>
          <Button variant="gel" size="md" shape="pill" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
