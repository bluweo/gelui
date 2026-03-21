import { useRef, type ReactNode } from "react";
import { AppProviders } from "./AppProviders";
import { DSNav } from "./DSNav";
import { LiquidGlassFilter } from "./LiquidGlassFilter";
import { AppearanceModal } from "./AppearanceModal";
import { ContextMenu } from "./ContextMenu";
import { BackgroundPicker } from "./BackgroundPicker";
import { useBackground, COLOR_BACKGROUNDS } from "@/context/BackgroundContext";
import { useContrastColor } from "@/hooks/useContrastColor";

interface DSShellProps {
  currentPath: string;
  children: ReactNode;
}

function BackgroundLayer() {
  const { currentBg, currentBgId, currentBgType, hydrated } = useBackground();

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

  return (
    <>
      <LiquidGlassFilter />
      <BackgroundLayer />
      <ContextMenu />
      <AppearanceModal />
      <BackgroundPicker />
      <div className="min-h-screen flex flex-col p-4 gap-4 max-[540px]:p-3 max-[540px]:gap-3">
        <DSNav currentPath={currentPath} />
        {/* Spacer for fixed nav + gap below */}
        <div className="h-[72px] shrink-0" />
        <main
          ref={mainRef}
          data-contrast={contrast}
          className="flex-1 min-w-0 max-w-[1400px] mx-auto w-full"
        >
          {children}
        </main>

        {/* Footer */}
        <footer ref={footerRef} className="w-full mt-8 mb-2 -mx-4 px-0 max-[540px]:-mx-3" style={{ width: "calc(100% + 2rem)" }} data-contrast={footerContrast}>
          {/* Full-width border line — edge to edge, no gap */}
          <div
            className="w-full h-px mb-4"
            style={{
              background: footerContrast === "dark"
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.2)",
            }}
          />
          <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 px-4 pb-3 max-[640px]:flex-col max-[640px]:gap-3">
            {/* Left: Copyright */}
            <p
              className="text-[13px] font-[500]"
              style={{ color: footerContrast === "dark" ? "#ffffff" : "#000000" }}
            >
              &copy; {new Date().getFullYear()} Bluweo. All rights reserved.
            </p>

            {/* Center: Links */}
            <div className="flex items-center gap-5 max-[640px]:gap-3">
              <a
                href="#"
                className="text-[13px] font-[500] hover:opacity-60 transition-opacity duration-200 no-underline"
                style={{ color: footerContrast === "dark" ? "#ffffff" : "#000000" }}
              >
                Cookie Policy
              </a>
              <span
                className="text-[13px]"
                style={{ color: footerContrast === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)" }}
              >·</span>
              <a
                href="#"
                className="text-[13px] font-[500] hover:opacity-60 transition-opacity duration-200 no-underline"
                style={{ color: footerContrast === "dark" ? "#ffffff" : "#000000" }}
              >
                Privacy Policy
              </a>
              <span
                className="text-[13px]"
                style={{ color: footerContrast === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)" }}
              >·</span>
              <a
                href="#"
                className="text-[13px] font-[500] hover:opacity-60 transition-opacity duration-200 no-underline"
                style={{ color: footerContrast === "dark" ? "#ffffff" : "#000000" }}
              >
                Terms & Conditions
              </a>
            </div>

            {/* Right: Version */}
            <span
              className="text-[12px] font-mono font-[500] select-none px-2.5 py-1 rounded-full"
              style={{
                color: footerContrast === "dark" ? "#ffffff" : "#000000",
                border: `1px solid ${footerContrast === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)"}`,
              }}
            >
              v0.2.1
            </span>
          </div>
        </footer>
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
