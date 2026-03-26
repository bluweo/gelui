import { useState, useEffect, type CSSProperties } from "react";

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
        border: "1px solid var(--theme-divider)",
        background: "var(--theme-header-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: "var(--theme-fg-muted)",
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
