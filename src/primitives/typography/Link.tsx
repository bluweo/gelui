import type { BaseProps } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";

interface LinkProps extends BaseProps {
  href?: string;
}

export function Link({
  href = "#",
  children,
  className = "",
  style,
}: LinkProps) {
  const dark = useDarkMode();
  return (
    <a
      href={href}
      className={className}
      style={{
        fontSize: "15px",
        fontWeight: 500,
        color: dark ? "#b0c4af" : "#354334",
        textDecoration: "underline",
        textDecorationColor: dark
          ? "rgba(176,196,175,0.3)"
          : "rgba(53,67,52,0.3)",
        textUnderlineOffset: "3px",
        cursor: "pointer",
        transition: "opacity 200ms ease",
        ...style,
      }}
    >
      {children}
    </a>
  );
}
