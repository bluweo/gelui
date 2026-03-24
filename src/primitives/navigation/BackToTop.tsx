import { useState, useEffect, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface BackToTopProps {
  threshold?: number;
  smooth?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function BackToTop({
  threshold = 400,
  smooth = true,
  className = "",
  style,
}: BackToTopProps) {
  const dark = useDarkMode();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}`,
        background: dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        transition: "opacity 0.25s, transform 0.25s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 1000,
        ...style,
      }}
    >
      &#8593;
    </button>
  );
}
