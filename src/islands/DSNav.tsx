import { useState, useEffect, useRef, useCallback } from "react";
import {
  Home2,
  Colorfilter,
  Box1,
  Category,
  Layer,
  SidebarLeft,
  Sun1,
  Moon,
  Login,
  HambergerMenu,
} from "iconsax-react";
import { useAppearance } from "@/context/AppearanceContext";
import { useContrastColor } from "@/hooks/useContrastColor";

const DS_NAV = [
  { href: "/design-system", id: "Overview", icon: Home2, label: "Overview" },
  { href: "/design-system/tokens", id: "Tokens", icon: Colorfilter, label: "Tokens" },
  { href: "/design-system/primitives", id: "Primitives", icon: Box1, label: "Primitives" },
  { href: "/design-system/components", id: "Components", icon: Category, label: "Components" },
  { href: "/design-system/patterns", id: "Patterns", icon: Layer, label: "Patterns" },
  { href: "/design-system/layouts", id: "Layouts", icon: SidebarLeft, label: "Layouts" },
] as const;

/* ── Glass Tooltip ── */
interface TooltipState {
  label: string;
  x: number;
  y: number;
}

function GlassTooltip({ label, x, y }: TooltipState) {
  return (
    <div
      className="gel-tooltip"
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 200,
      }}
    >
      {label}
    </div>
  );
}

interface DSNavProps {
  currentPath: string;
}

export function DSNav({ currentPath: initialPath }: DSNavProps) {
  const { theme, toggleTheme } = useAppearance();
  const [hidden, setHidden] = useState(false);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const lastScrollY = useRef(0);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const logoContrast = useContrastColor(logoRef);
  // Gel surfaces darken the background — bias shifts luminance down
  // so icons/text stay white on medium backgrounds seen through gel
  const navContrast = useContrastColor(navRef, { bias: -35 });
  const rightContrast = useContrastColor(rightRef, { bias: -35 });

  // Contrast-aware color tokens for INACTIVE icons (on semi-transparent gel)
  const navColors = navContrast === "light"
    ? { inactive: "rgba(30, 30, 35, 0.5)", hover: "rgba(30, 30, 35, 0.85)", hoverBg: "rgba(30, 30, 35, 0.08)" }
    : { inactive: "rgba(255, 255, 255, 0.7)", hover: "rgba(255, 255, 255, 0.95)", hoverBg: "rgba(255, 255, 255, 0.15)" };

  // Active tab follows THEME not background — glass button has its own opaque frost surface
  // Light theme: white frost → dark text | Dark theme: dark frost → white text
  const activeColors = theme === "light"
    ? { color: "rgba(30, 30, 35, 0.88)", shadow: "0 1px 2px rgba(255,255,255,0.3)" }
    : { color: "rgba(255, 255, 255, 0.95)", shadow: "0 1px 4px rgba(0,0,0,0.3)" };

  // Gel buttons (semi-transparent) — contrast-aware with bias
  const btnColor = rightContrast === "light"
    ? { color: "rgba(30, 30, 35, 0.85)", shadow: "0 1px 2px rgba(255,255,255,0.25)" }
    : { color: "white", shadow: "0 1px 3px rgba(0,0,0,0.15)" };

  // Listen for Astro client-side navigation to update active tab
  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname);
    document.addEventListener("astro:after-swap", updatePath);
    document.addEventListener("astro:page-load", updatePath);
    return () => {
      document.removeEventListener("astro:after-swap", updatePath);
      document.removeEventListener("astro:page-load", updatePath);
    };
  }, []);

  // Track hovered icon for inline color swap
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout>>();
  const tooltipActive = useRef(false); // true once first tooltip has shown
  const tooltipCooldown = useRef<ReturnType<typeof setTimeout>>(); // grace period after mouse leave

  const showTooltip = useCallback((label: string, el: HTMLElement) => {
    clearTimeout(tooltipTimeout.current);
    clearTimeout(tooltipCooldown.current);

    const show = () => {
      const rect = el.getBoundingClientRect();
      tooltipActive.current = true;
      setTooltip({
        label,
        x: rect.left + rect.width / 2,
        y: rect.bottom + 10,
      });
    };

    // If a tooltip is already active (or was just dismissed), show instantly
    if (tooltipActive.current) {
      show();
    } else {
      tooltipTimeout.current = setTimeout(show, 500);
    }
  }, []);

  const hideTooltip = useCallback(() => {
    clearTimeout(tooltipTimeout.current);
    clearTimeout(tooltipCooldown.current);
    setTooltip(null);
    // Keep "active" state for a short grace period so moving between
    // buttons still shows tooltips instantly
    tooltipCooldown.current = setTimeout(() => {
      tooltipActive.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(tooltipTimeout.current);
      clearTimeout(tooltipCooldown.current);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-[var(--spacing-md)] left-0 right-0 z-100 flex items-center justify-between w-full px-5 max-[540px]:px-3 transition-all duration-400 ease-[var(--transition-apple)] ${
          hidden ? "opacity-0 -translate-y-[calc(100%+var(--spacing-md)+20px)] pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        {/* ── Left: Logo pinned to page edge ── */}
        <a ref={logoRef} href="/design-system" className="flex items-center shrink-0">
          <img
            src={logoContrast === "dark" ? "/logos/bluweo-logo-white.svg" : "/logos/bluweo-logo.svg"}
            alt="GelUI"
            className="w-14 h-14 max-[640px]:w-12 max-[640px]:h-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
          />
        </a>

        {/* ── Center: Gel panel (layer 2) → glass button active tab (layer 1) ── */}
        <div
          ref={navRef}
          data-contrast={navContrast}
          className="gel-glass-nav flex items-center px-2.5 py-2.5 max-[640px]:hidden absolute left-1/2 -translate-x-1/2 max-[1024px]:relative max-[1024px]:left-auto max-[1024px]:translate-x-0"
        >
          <div className="flex items-center gap-1 relative z-[1]">
            {DS_NAV.map((tab) => {
              const Icon = tab.icon;
              const isActive =
                tab.href === "/design-system"
                  ? currentPath === "/design-system" || currentPath === "/design-system/"
                  : currentPath.startsWith(tab.href);
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  className={
                    isActive
                      ? "glass-nav-active-btn flex items-center gap-2 py-2 px-4 !rounded-[var(--glass-radius-pill)] text-[15px] font-[580] no-underline whitespace-nowrap !cursor-default max-[640px]:px-3 max-[640px]:gap-1.5"
                      : "nav-icon-inactive flex items-center justify-center w-[43px] h-[43px] rounded-[var(--glass-radius-pill)] no-underline transition-all duration-250 ease-[var(--transition-apple)] hover:scale-120 max-[640px]:w-9 max-[640px]:h-9"
                  }
                  style={{
                    color: isActive
                      ? activeColors.color
                      : hoveredId === tab.id ? navColors.hover : navColors.inactive,
                    textShadow: isActive ? activeColors.shadow : "none",
                    backgroundColor: !isActive && hoveredId === tab.id ? navColors.hoverBg : undefined,
                  }}
                  onMouseEnter={
                    !isActive
                      ? (e) => { setHoveredId(tab.id); showTooltip(tab.label, e.currentTarget); }
                      : undefined
                  }
                  onMouseLeave={() => { setHoveredId(null); hideTooltip(); }}
                >
                  <span className="w-6 h-6 flex items-center justify-center shrink-0 [&_svg]:w-6 [&_svg]:h-6 relative z-[3]">
                    <Icon size={24} color="currentColor" variant={isActive ? "Bulk" : "Linear"} />
                  </span>
                  {isActive && (
                    <span className="leading-none relative z-[3] max-[640px]:hidden">{tab.label}</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Right: Theme toggle + Login + Hamburger pinned to page edge ── */}
        <div ref={rightRef} data-contrast={rightContrast} className="flex items-center gap-2.5 shrink-0">
          <button
            className="gel-btn gel-btn-circle-sm transition-transform duration-250 ease-[var(--transition-apple)] hover:scale-120 [&_svg]:transition-transform [&_svg]:duration-[400ms] [&_svg]:ease-[var(--transition-bounce)] hover:[&_svg]:rotate-[20deg]"
            style={{ color: btnColor.color, textShadow: btnColor.shadow }}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            onMouseEnter={(e) => showTooltip(theme === "light" ? "Dark mode" : "Light mode", e.currentTarget)}
            onMouseLeave={hideTooltip}
          >
            <span className="flex items-center justify-center">
              {theme === "light"
                ? <Moon size={22} color="currentColor" variant="Linear" />
                : <Sun1 size={22} color="currentColor" variant="Linear" />
              }
            </span>
          </button>

          <a
            href="#"
            className="gel-btn gel-btn-pill transition-transform duration-250 ease-[var(--transition-apple)] hover:scale-120 max-[480px]:gel-btn-circle-sm max-[480px]:p-0 max-[480px]:w-[43px] max-[480px]:h-[43px]"
            style={{ color: btnColor.color, textShadow: btnColor.shadow }}
            onMouseEnter={(e) => showTooltip("Login", e.currentTarget)}
            onMouseLeave={hideTooltip}
          >
            <Login size={20} color="currentColor" variant="Linear" />
            <span className="max-[480px]:hidden">Login</span>
          </a>

          <button
            className="flex items-center justify-center w-[43px] h-[43px] bg-transparent border-none cursor-pointer transition-transform duration-250 ease-[var(--transition-apple)] hover:scale-120"
            style={{ color: btnColor.color, textShadow: btnColor.shadow }}
            aria-label="Menu"
            onMouseEnter={(e) => showTooltip("Menu", e.currentTarget)}
            onMouseLeave={hideTooltip}
          >
            <HambergerMenu size={24} color="currentColor" variant="Linear" />
          </button>
        </div>
      </nav>

      {/* ── Tooltip portal ── */}
      {tooltip && <GlassTooltip {...tooltip} />}
    </>
  );
}
