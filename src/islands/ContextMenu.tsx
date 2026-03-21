import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useBackground } from "@/context/BackgroundContext";
import { useAppearance } from "@/context/AppearanceContext";
import { useContrastColor } from "@/hooks/useContrastColor";
import {
  Gallery,
  Setting2,
  Maximize4,
  Code1,
  SearchNormal1,
} from "iconsax-react";

/* ------------------------------------------------------------------ */
/*  Menu items                                                         */
/* ------------------------------------------------------------------ */

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  action: string;
  dividerAfter?: boolean;
}

const ICON_SIZE = 18;

const MENU_ITEMS: MenuItem[] = [
  { icon: <Gallery size={ICON_SIZE} color="currentColor" variant="Bulk" />,       label: "Change Background", action: "change-bg" },
  { icon: <Setting2 size={ICON_SIZE} color="currentColor" variant="Bulk" />,      label: "Appearance",        action: "appearance" },
  { icon: <Maximize4 size={ICON_SIZE} color="currentColor" variant="Bulk" />,     label: "Full Screen",       action: "fullscreen", dividerAfter: true },
  { icon: <Code1 size={ICON_SIZE} color="currentColor" variant="Bulk" />,         label: "View Source",       action: "view-source" },
  { icon: <SearchNormal1 size={ICON_SIZE} color="currentColor" variant="Bulk" />, label: "Inspect Element",   action: "inspect" },
];

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MENU_WIDTH = 220;
const MENU_HEIGHT_ESTIMATE = 260;
const EDGE_MARGIN = 12;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/** Check if an element or any ancestor is a glass/panel surface */
function isOnGlassSurface(el: Element | null): boolean {
  const glassSelectors = [
    "glass-1", "glass-2", "glass-3",
    "glass-panel", "glass-card",
    "gel-glass-nav", "gel-btn",
  ];
  let current = el;
  while (current && current !== document.body) {
    const cls = current.className;
    if (typeof cls === "string") {
      for (const sel of glassSelectors) {
        if (cls.includes(sel)) return true;
      }
    }
    current = current.parentElement;
  }
  return false;
}

export function ContextMenu() {
  const { openPicker } = useBackground();
  const { openModal: openAppearance } = useAppearance();
  const { theme } = useAppearance();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [onGlass, setOnGlass] = useState(false);

  // Contrast detection for the gel panel
  const menuRef = useRef<HTMLDivElement>(null);
  const bgContrast = useContrastColor(menuRef, { bias: -35, positionKey: `${position.x},${position.y},${visible}` });

  // If right-clicked on a glass surface, the frosted panel creates its own surface:
  // light theme → glass is white/light → dark text
  // dark theme → glass is dark → white text
  // Otherwise, use background-based contrast detection
  const contrast = onGlass
    ? (theme === "dark" ? "dark" : "light")
    : bgContrast;

  // Contrast-aware colors
  const colors = contrast === "light"
    ? {
        text: "rgba(30, 30, 35, 0.85)",
        muted: "rgba(30, 30, 35, 0.45)",
        hoverBg: "rgba(30, 30, 35, 0.08)",
        activeBg: "rgba(30, 30, 35, 0.12)",
        divider: "rgba(30, 30, 35, 0.1)",
      }
    : {
        text: "rgba(255, 255, 255, 0.9)",
        muted: "rgba(255, 255, 255, 0.45)",
        hoverBg: "rgba(255, 255, 255, 0.12)",
        activeBg: "rgba(255, 255, 255, 0.18)",
        divider: "rgba(255, 255, 255, 0.1)",
      };

  useEffect(() => { setMounted(true); }, []);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;

    // Detect if right-click target is on a glass/panel surface
    const target = document.elementFromPoint(e.clientX, e.clientY);
    setOnGlass(isOnGlassSurface(target));

    if (x + MENU_WIDTH + EDGE_MARGIN > window.innerWidth) x = window.innerWidth - MENU_WIDTH - EDGE_MARGIN;
    if (y + MENU_HEIGHT_ESTIMATE + EDGE_MARGIN > window.innerHeight) y = window.innerHeight - MENU_HEIGHT_ESTIMATE - EDGE_MARGIN;
    x = Math.max(EDGE_MARGIN, x);
    y = Math.max(EDGE_MARGIN, y);
    setPosition({ x, y });
    setVisible(true);
  }, []);

  const dismiss = useCallback(() => setVisible(false), []);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", dismiss);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", dismiss);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, [handleContextMenu, dismiss, handleKeyDown]);

  if (!mounted || !visible) return null;

  const handleItemClick = (item: MenuItem) => {
    setVisible(false);
    if (item.action === "change-bg") openPicker();
    if (item.action === "appearance") openAppearance();
    if (item.action === "fullscreen") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
    if (item.action === "view-source") {
      const w = window.open("", "_blank");
      if (w) {
        w.document.title = "Loading source...";
        w.document.body.style.cssText = "margin:0;background:#1e1e2e;color:#636370;font:13px/1.6 'SF Mono',monospace;padding:20px;";
        w.document.body.textContent = "Loading source...";
        fetch(window.location.href)
          .then((r) => r.text())
          .then((html) => {
            w.document.title = "Source: " + window.location.pathname;
            w.document.body.textContent = "";
            const pre = w.document.createElement("pre");
            pre.style.cssText =
              "margin:0;padding:20px;font:13px/1.6 'SF Mono',SFMono-Regular,ui-monospace,Menlo,monospace;" +
              "background:#1e1e2e;color:#cdd6f4;white-space:pre-wrap;word-break:break-all;tab-size:2;";
            pre.textContent = html;
            w.document.body.style.margin = "0";
            w.document.body.appendChild(pre);
          });
      }
    }
    if (item.action === "inspect") {
      window.dispatchEvent(new CustomEvent("toggle-inspector"));
    }
  };

  return createPortal(
    <div
      ref={menuRef}
      className="gel-glass-context-menu fixed z-[1000] min-w-[200px] p-2 animate-context-menu-enter origin-top-left select-none"
      style={{ left: position.x, top: position.y }}
      role="menu"
      aria-label="Context menu"
      onClick={(e) => e.stopPropagation()}
    >
      {MENU_ITEMS.map((item, i) => (
        <div key={i} className="relative z-[1]">
          <button
            className="ctx-menu-row flex items-center gap-2.5 w-full py-2 px-2.5 border-none bg-transparent cursor-pointer transition-all duration-200 text-left font-[inherit] leading-none"
            style={{
              color: colors.text,
              fontSize: "13.5px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              borderRadius: "calc(var(--glass-radius-sm) - 4px)",
            }}
            role="menuitem"
            onClick={() => handleItemClick(item)}
            onMouseEnter={(e) => { e.currentTarget.style.background = colors.hoverBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            onMouseDown={(e) => { e.currentTarget.style.background = colors.activeBg; e.currentTarget.style.transform = "scale(0.98)"; }}
            onMouseUp={(e) => { e.currentTarget.style.background = colors.hoverBg; e.currentTarget.style.transform = ""; }}
          >
            <span
              className="w-5 h-5 flex items-center justify-center shrink-0 [&_svg]:w-[18px] [&_svg]:h-[18px] transition-colors duration-200"
              style={{ color: colors.muted }}
            >
              {item.icon}
            </span>
            <span className="whitespace-nowrap">{item.label}</span>
          </button>
          {item.dividerAfter && (
            <div
              className="mx-2.5 my-1"
              style={{ height: "1px", background: colors.divider }}
            />
          )}
        </div>
      ))}
    </div>,
    document.body
  );
}
