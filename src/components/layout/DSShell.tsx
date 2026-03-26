import { useRef, useEffect, type ReactNode } from "react";
import { AppProviders } from "./AppProviders";
import { DSNav } from "../header/DSNav";
import { DSFooter } from "../footer/DSFooter";
import { LiquidGlassFilter } from "../glass/LiquidGlassFilter";
import { AppearanceModal } from "../modal/AppearanceModal";
import { ContextMenu } from "../modal/ContextMenu";
import { BackgroundPicker } from "../modal/BackgroundPicker";
import { FontPickerModal } from "../modal/FontPickerModal";
import { SectionNav } from "../block/SectionNav";
import { useBackground, COLOR_BACKGROUNDS } from "@/components/context/BackgroundContext";
import { useContrastColor } from "@/components/hooks/useContrastColor";

interface DSShellProps {
  currentPath: string;
  children: ReactNode;
}

function BackgroundLayer() {
  const { currentBg, currentBgId, currentBgType, hydrated } = useBackground();

  // Set data-bg-type on <html> so CSS can detect image/video/color backgrounds
  useEffect(() => {
    if (hydrated) {
      document.documentElement.setAttribute("data-bg-type", currentBgType || "color");
    }
  }, [currentBgType, hydrated]);

  /* Until hydrated, render a neutral gradient to avoid hydration mismatch */
  if (!hydrated) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      />
    );
  }

  if (currentBgType === "video" && currentBg) {
    return (
      <div className="fixed inset-0 -z-10">
        <video
          src={currentBg}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (currentBgType === "color") {
    const preset = COLOR_BACKGROUNDS.find((p) => p.id === currentBgId);
    if (preset) {
      return <div className="fixed inset-0 -z-10" style={preset.style} />;
    }
  }

  if (currentBgType === "image" && currentBg) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${currentBg}")` }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    />
  );
}

function DSShellInner({ currentPath, children }: DSShellProps) {
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const contrast = useContrastColor(mainRef);
  const footerContrast = useContrastColor(footerRef);

  // Global type scale — reads from localStorage, applies to all text in <main>
  useEffect(() => {
    const origFontSizes = new WeakMap<HTMLElement, string>();
    const applyScale = () => {
      const scale = localStorage.getItem("gelui-type-scale") || "medium";
      const factors: Record<string, number> = { small: 0.82, medium: 1.0, large: 1.22 };
      const factor = factors[scale] ?? 1;
      document.documentElement.style.setProperty("--type-scale", String(factor));

      const main = mainRef.current;
      if (!main) return;

      const elements = main.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, label, a, button, li, td, th, code, pre, input, textarea, select");
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.closest("[data-type-presets-table]") || htmlEl.closest("nav")) return;

        if (!origFontSizes.has(htmlEl)) {
          origFontSizes.set(htmlEl, window.getComputedStyle(htmlEl).fontSize);
        }

        const origSize = parseFloat(origFontSizes.get(htmlEl) || "0");
        if (origSize && factor !== 1) {
          htmlEl.style.fontSize = `${Math.round(origSize * factor * 10) / 10}px`;
        } else if (factor === 1) {
          htmlEl.style.fontSize = "";
        }
      });
    };

    applyScale();

    // Listen for scale changes from TypePresetsTable
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "gelui-type-scale") applyScale();
    };
    window.addEventListener("storage", handleStorage);

    // Also listen for custom event (same-tab updates)
    const handleCustom = () => applyScale();
    window.addEventListener("gelui-type-scale-change", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("gelui-type-scale-change", handleCustom);
    };
  }, [currentPath]); // Re-run when page changes

  return (
    <>
      <LiquidGlassFilter />
      <BackgroundLayer />
      <ContextMenu />
      <AppearanceModal />
      <BackgroundPicker />
      <FontPickerModal />
      <SectionNav />
      <div className="min-h-screen flex flex-col p-4 gap-4 max-[540px]:p-3 max-[540px]:gap-3">
        <DSNav currentPath={currentPath} />
        {/* Spacer for fixed nav + gap below */}
        <div className="h-[72px] shrink-0" />
        <main
          ref={mainRef}
          data-contrast={contrast}
          className="flex-1 min-w-0 max-w-[1100px] min-[1537px]:max-w-[1400px] mx-auto w-full"
        >
          {children}
        </main>

        {/* Footer */}
        <DSFooter ref={footerRef} contrast={footerContrast} />
      </div>
    </>
  );
}

export function DSShell({ currentPath, children }: DSShellProps) {
  return (
    <AppProviders>
      <DSShellInner currentPath={currentPath}>{children}</DSShellInner>
    </AppProviders>
  );
}
