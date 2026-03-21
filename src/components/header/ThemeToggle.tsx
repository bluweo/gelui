import { Sun1, Moon } from "iconsax-react";
import { useAppearance } from "@/components/context/AppearanceContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppearance();

  return (
    <button
      className="glass-btn-icon w-9 h-9 font-[inherit] [&_svg]:w-[18px] [&_svg]:h-[18px] [&_svg]:transition-transform [&_svg]:duration-[400ms] [&_svg]:ease-[var(--transition-bounce)] hover:[&_svg]:rotate-[20deg]"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={18} color="currentColor" variant="Linear" /> : <Sun1 size={18} color="currentColor" variant="Linear" />}
    </button>
  );
}
