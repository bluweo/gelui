import { useState, useEffect } from "react";

interface BackToTopProps {
  threshold?: number;
  smooth?: boolean;
  className?: string;
}

export function BackToTop({
  threshold = 400,
  smooth = true,
  className = "",
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const [contrast, setContrast] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

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

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <button
      className={`prim-back-to-top ${visible ? "prim-back-to-top-visible" : "prim-back-to-top-hidden"} ${contrast === "dark" ? "prim-back-to-top-dark" : ""} ${className}`}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
