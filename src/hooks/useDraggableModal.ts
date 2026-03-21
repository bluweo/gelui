import { useRef, useState, useCallback, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  useDraggableModal                                                  */
/*                                                                     */
/*  Shared hook for draggable glass-panel modals.                      */
/*  Handles:                                                           */
/*    * Mouse / pointer drag with an offset                            */
/*    * Viewport boundary clamping (panel never leaves the screen)     */
/*    * Re-clamp on window resize / orientation change                 */
/*    * Position reset when the modal re-opens (re-centers)            */
/*    * Escape key to close                                            */
/*                                                                     */
/*  Usage:                                                             */
/*    const { panelRef, panelStyle, backdropDragged, onDragStart }     */
/*      = useDraggableModal({ isOpen, onClose });                      */
/* ------------------------------------------------------------------ */

interface UseDraggableModalOptions {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Minimum visible area in px the panel must keep on-screen (default 40) */
  edgePadding?: number;
}

interface UseDraggableModalReturn {
  /** Ref to attach to the panel element */
  panelRef: React.RefObject<HTMLDivElement | null>;
  /** Inline style for the panel (position when dragged) */
  panelStyle: React.CSSProperties;
  /** True when the panel has been dragged (so backdrop can stop centering) */
  backdropDragged: boolean;
  /** onMouseDown handler -- attach to the panel for drag initiation */
  onDragStart: (e: React.MouseEvent) => void;
}

/* ---- Clamp helper ---- */
function clampToViewport(
  x: number,
  y: number,
  panelW: number,
  panelH: number,
  padding: number
): { x: number; y: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Ensure at least `padding` px of the panel is visible on every edge
  const minX = padding - panelW;     // allow most of panel off-left, but keep `padding`
  const maxX = vw - padding;         // keep at least `padding` visible from right
  const minY = 0;                    // never above the viewport
  const maxY = vh - padding;         // keep at least `padding` visible from bottom

  return {
    x: Math.max(minX, Math.min(x, maxX)),
    y: Math.max(minY, Math.min(y, maxY)),
  };
}

export function useDraggableModal({
  isOpen,
  onClose,
  edgePadding = 40,
}: UseDraggableModalOptions): UseDraggableModalReturn {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  /* ---- Reset position every time the modal re-opens ---- */
  useEffect(() => {
    if (isOpen) setPos(null);
  }, [isOpen]);

  /* ---- Drag start ---- */
  const onDragStart = useCallback((e: React.MouseEvent) => {
    if (!panelRef.current) return;
    dragging.current = true;
    const rect = panelRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    document.body.style.userSelect = "none";
  }, []);

  /* ---- Drag move + end ---- */
  useEffect(() => {
    if (!isOpen) return;

    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const rawX = e.clientX - dragOffset.current.x;
      const rawY = e.clientY - dragOffset.current.y;
      const clamped = clampToViewport(rawX, rawY, rect.width, rect.height, edgePadding);
      setPos(clamped);
    };

    const onUp = () => {
      dragging.current = false;
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.userSelect = "";
    };
  }, [isOpen, edgePadding]);

  /* ---- Re-clamp on viewport resize ---- */
  useEffect(() => {
    if (!isOpen) return;

    const onResize = () => {
      // If currently centered (pos === null), nothing to clamp
      if (!pos || !panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const clamped = clampToViewport(pos.x, pos.y, rect.width, rect.height, edgePadding);

      // If the centered (non-dragged) state would now be better, snap back to center
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const centerX = (vw - rect.width) / 2;
      const centerY = (vh - rect.height) / 2;

      // If the clamped position is basically centered, reset to null (re-center)
      if (
        Math.abs(clamped.x - centerX) < 8 &&
        Math.abs(clamped.y - centerY) < 8
      ) {
        setPos(null);
      } else {
        setPos(clamped);
      }
    };

    window.addEventListener("resize", onResize);
    // Also handle orientation change on mobile
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [isOpen, pos, edgePadding]);

  /* ---- Re-center if panel overflows when in default (non-dragged) position ---- */
  useEffect(() => {
    if (!isOpen || pos !== null || !panelRef.current) return;

    // Small delay to let CSS layout happen
    const raf = requestAnimationFrame(() => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // If the centered panel overflows, force a clamped position
      if (rect.right > vw || rect.bottom > vh || rect.left < 0 || rect.top < 0) {
        const clampedX = Math.max(edgePadding, Math.min((vw - rect.width) / 2, vw - rect.width - edgePadding));
        const clampedY = Math.max(edgePadding, Math.min((vh - rect.height) / 2, vh - rect.height - edgePadding));
        setPos({ x: clampedX, y: clampedY });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [isOpen, pos, edgePadding]);

  /* ---- Escape to close ---- */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* ---- Build style ---- */
  const panelStyle: React.CSSProperties = pos
    ? { position: "fixed", left: pos.x, top: pos.y }
    : {};

  return {
    panelRef,
    panelStyle,
    backdropDragged: pos !== null,
    onDragStart,
  };
}
