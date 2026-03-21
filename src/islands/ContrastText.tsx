import { useRef, type ReactNode } from "react";
import { useContrastColor } from "@/hooks/useContrastColor";
import type { ContrastTheme } from "@/context/ContrastContext";

interface ContrastTextProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  defaultContrast?: ContrastTheme;
}

/**
 * Generic wrapper that detects whether its background region is light or dark
 * and sets `data-contrast="light"|"dark"` on the element.
 *
 * Use CSS `[data-contrast="light"]` and `[data-contrast="dark"]` to style.
 */
export function ContrastText({
  children,
  as: Tag = "div",
  className,
  defaultContrast = "light",
}: ContrastTextProps) {
  const ref = useRef<HTMLElement>(null);
  const contrast = useContrastColor(ref, defaultContrast);

  return (
    // @ts-expect-error -- dynamic tag with ref
    <Tag ref={ref} className={className} data-contrast={contrast}>
      {children}
    </Tag>
  );
}
