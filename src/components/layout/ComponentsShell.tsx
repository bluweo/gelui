import { useRef, useEffect, type ReactNode } from "react";
import { AppProviders } from "./AppProviders";
import { DSNav } from "../header/DSNav";
import { DSFooter } from "../footer/DSFooter";
import { LiquidGlassFilter } from "../glass/LiquidGlassFilter";
import { AppearanceModal } from "../modal/AppearanceModal";
import { ContextMenu } from "../modal/ContextMenu";
import { BackgroundPicker } from "../modal/BackgroundPicker";
import { FontPickerModal } from "../modal/FontPickerModal";
import { BackToTop } from "@/primitives/navigation/BackToTop";
import { useBackground, COLOR_BACKGROUNDS } from "@/components/context/BackgroundContext";
import { useContrastColor } from "@/components/hooks/useContrastColor";

interface Props {
  currentPath: string;
  children: ReactNode;
}

function BackgroundLayer() {
  const { currentBg, currentBgId, currentBgType, hydrated } = useBackground();

  useEffect(() => {
    if (hydrated) {
      document.documentElement.setAttribute("data-bg-type", currentBgType || "color");
    }
  }, [currentBgType, hydrated]);

  if (!hydrated) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
      />
    );
  }

  if (currentBgType === "video" && currentBg) {
    return (
      <div className="fixed inset-0 -z-10">
        <video src={currentBg} autoPlay loop muted playsInline className="w-full h-full object-cover" />
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
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url("${currentBg}")` }} />
    );
  }

  return (
    <div className="fixed inset-0 -z-10" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }} />
  );
}

function ShellInner({ currentPath, children }: Props) {
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const contrast = useContrastColor(mainRef);
  const footerContrast = useContrastColor(footerRef);

  useEffect(() => {
    const applyScale = () => {
      const scale = localStorage.getItem("gelui-type-scale") || "medium";
      const factors: Record<string, number> = { small: 0.82, medium: 1.0, large: 1.22 };
      const factor = factors[scale] ?? 1;
      document.documentElement.style.setProperty("--type-scale", String(factor));
    };
    applyScale();
    const handleStorage = (e: StorageEvent) => { if (e.key === "gelui-type-scale") applyScale(); };
    window.addEventListener("storage", handleStorage);
    const handleCustom = () => applyScale();
    window.addEventListener("gelui-type-scale-change", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("gelui-type-scale-change", handleCustom);
    };
  }, [currentPath]);

  return (
    <>
      <LiquidGlassFilter />
      <BackgroundLayer />
      <ContextMenu />
      <AppearanceModal />
      <BackgroundPicker />
      <FontPickerModal />
      {/* NO SectionNav */}
      <BackToTop />
      <div className="min-h-screen flex flex-col p-4 gap-4 max-[540px]:p-3 max-[540px]:gap-3">
        <DSNav currentPath={currentPath} />
        <div className="h-[72px] shrink-0" />
        <main
          ref={mainRef}
          data-contrast={contrast}
          className="flex-1 min-w-0 max-w-[1400px] mx-auto w-full"
        >
          {children}
        </main>
        <DSFooter ref={footerRef} contrast={footerContrast} />
      </div>
    </>
  );
}

export function ComponentsShell({ currentPath, children }: Props) {
  return (
    <AppProviders>
      <ShellInner currentPath={currentPath}>{children}</ShellInner>
    </AppProviders>
  );
}
