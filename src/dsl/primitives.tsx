/* ═══════════════════════════════════════════════
   GEL UI — React Primitive Library
   50+ components mapped from registry IDs.
   Used by DSLRenderer to resolve "type" → React component.
   ═══════════════════════════════════════════════ */
import {
  type ReactNode,
  type CSSProperties,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

/* ─── Helper types ─── */
interface BaseProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ─── Dark mode helper ─── */
function useDarkMode(): boolean {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ─── Click outside hook ─── */
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

/* ═══════════════════════════════════════════════
   TYPOGRAPHY
   ═══════════════════════════════════════════════ */

/* --- Heading --- */
interface HeadingProps extends BaseProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
  level = 1,
  children,
  className = "",
  style,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes: Record<number, string> = {
    1: "36px",
    2: "30px",
    3: "24px",
    4: "20px",
    5: "17px",
    6: "15px",
  };
  const weights: Record<number, number> = {
    1: 750,
    2: 700,
    3: 650,
    4: 600,
    5: 600,
    6: 600,
  };
  return (
    <Tag
      className={className}
      style={{
        fontSize: sizes[level],
        fontWeight: weights[level],
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        fontFamily: "var(--font-heading)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* --- Text --- */
interface TextProps extends BaseProps {
  size?: "xs" | "sm" | "md" | "lg";
  weight?: number;
}

export function Text({
  size = "md",
  weight = 400,
  children,
  className = "",
  style,
}: TextProps) {
  const sizeMap: Record<string, string> = {
    xs: "12px",
    sm: "13px",
    md: "15px",
    lg: "18px",
  };
  return (
    <p
      className={className}
      style={{
        fontSize: sizeMap[size],
        fontWeight: weight,
        lineHeight: 1.6,
        fontFamily: "var(--font-body)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/* --- Label --- */
export function Label({ children, className = "", style }: BaseProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
        fontFamily: "var(--font-ui)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* --- Caption --- */
export function Caption({ children, className = "", style }: BaseProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: "11px",
        fontWeight: 400,
        opacity: 0.5,
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* --- Code --- */
interface CodeProps extends BaseProps {
  inline?: boolean;
  highlightedChildren?: ReactNode;
}

export function Code({
  children,
  className = "",
  style,
  inline = true,
  highlightedChildren,
}: CodeProps) {
  const dark = useDarkMode();
  if (inline) {
    return (
      <code
        className={className}
        style={{
          fontSize: "13px",
          fontFamily: "var(--font-mono)",
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          color: dark ? "#e0e0e0" : "inherit",
          padding: "2px 6px",
          borderRadius: "4px",
          ...style,
        }}
      >
        {children}
      </code>
    );
  }
  return (
    <pre
      className={className}
      style={{
        fontSize: "13px",
        fontFamily: "var(--font-mono)",
        background: dark ? "#0d0d0d" : "#1a1a1a",
        color: "#e0e0e0",
        padding: "16px",
        borderRadius: "var(--glass-radius-sm, 10px)",
        overflow: "auto",
        margin: 0,
        ...style,
      }}
    >
      <code>{highlightedChildren ?? children}</code>
    </pre>
  );
}

/* --- Link --- */
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

/* ═══════════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════════ */

/* --- Button --- */
interface ButtonProps extends BaseProps {
  variant?: "solid" | "ghost" | "glass" | "gel" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export function Button({
  variant = "solid",
  size = "md",
  disabled = false,
  fullWidth = false,
  children,
  className = "",
  style,
  onClick,
}: ButtonProps) {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState(false);
  const sizeMap = {
    sm: { px: "14px", py: "8px", fs: "12px" },
    md: { px: "20px", py: "10px", fs: "13px" },
    lg: { px: "28px", py: "14px", fs: "15px" },
  };
  const s = sizeMap[size];

  const base: CSSProperties = {
    fontSize: s.fs,
    fontWeight: 600,
    fontFamily: "var(--font-ui)",
    padding: `${s.py} ${s.px}`,
    borderRadius: "var(--glass-radius-pill, 100px)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 200ms ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.5 : 1,
    transform: hovered && !disabled ? "scale(1.05)" : "scale(1)",
    outline: "none",
  };

  const variants: Record<string, CSSProperties> = {
    solid: {
      ...base,
      background: dark ? "#fff" : "#000",
      color: dark ? "#000" : "#fff",
      boxShadow: hovered && !disabled ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
    },
    ghost: {
      ...base,
      background: hovered && !disabled
        ? dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.04)"
        : "transparent",
      border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
      color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
    },
    glass: {
      ...base,
      background: dark
        ? "rgba(255,255,255,0.1)"
        : "rgba(255,255,255,0.6)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.2)"}`,
      color: dark ? "#fff" : "#000",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.06)",
    },
    gel: {
      ...base,
      background: dark
        ? "rgba(255,255,255,0.12)"
        : "rgba(255,255,255,0.25)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow:
        "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
      color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
    },
    link: {
      ...base,
      background: "transparent",
      padding: "0",
      color: dark ? "#b0c4af" : "#354334",
      textDecoration: "underline",
      transform: "none",
      opacity: hovered && !disabled ? 0.7 : disabled ? 0.5 : 1,
    },
  };

  return (
    <button
      className={`${variant === "glass" ? "glass-1 glass-specular" : ""} ${variant === "gel" ? "gel-glass" : ""} ${className}`}
      style={{ ...variants[variant], ...style }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

/* --- IconButton --- */
interface IconButtonProps extends BaseProps {
  icon?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function IconButton({
  icon = "+",
  size = "md",
  children,
  className = "",
  style,
  onClick,
}: IconButtonProps) {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState(false);
  const dim = size === "sm" ? "32px" : size === "lg" ? "48px" : "40px";
  return (
    <button
      className={className}
      style={{
        width: dim,
        height: dim,
        borderRadius: "50%",
        border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "18px",
        color: dark ? "#fff" : "#000",
        transition: "all 200ms ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children || icon}
    </button>
  );
}

/* --- LinkButton --- */
interface LinkButtonProps extends BaseProps {
  href?: string;
  arrow?: boolean;
  underline?: boolean;
  onClick?: () => void;
}

export function LinkButton({
  children,
  href,
  arrow = false,
  underline = false,
  className = "",
  style,
  onClick,
}: LinkButtonProps) {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={className}
      onClick={onClick ?? (() => href && (window.location.href = href))}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "var(--font-ui)",
        color: dark ? "#b0c4af" : "#354334",
        textDecoration: underline ? "underline" : "none",
        textUnderlineOffset: "3px",
        opacity: hovered ? 0.7 : 1,
        transition: "opacity 200ms ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        ...style,
      }}
    >
      {children}
      {arrow && (
        <span
          style={{
            transition: "transform 200ms ease",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            display: "inline-block",
          }}
        >
          &rarr;
        </span>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   SURFACES
   ═══════════════════════════════════════════════ */

/* --- Card --- */
interface CardProps extends BaseProps {
  variant?: "glass" | "gel" | "solid" | "transparent";
  frost?: "standard" | "haze" | "none";
}

export function Card({
  variant = "glass",
  frost = "standard",
  children,
  className = "",
  style,
}: CardProps) {
  const variantClasses: Record<string, string> = {
    glass: "glass-1 glass-specular",
    gel: "gel-glass glass-specular",
    solid: "",
    transparent: "",
  };
  const frostClass =
    frost === "standard"
      ? "ds-card-frost"
      : frost === "haze"
        ? "ds-card-frost-haze"
        : "";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--glass-radius,16px)] p-5 ${variantClasses[variant]} ${className}`}
      style={{
        ...(variant === "solid"
          ? { background: "rgba(255,255,255,0.95)" }
          : variant === "transparent"
            ? { border: "1px solid rgba(0,0,0,0.08)" }
            : {}),
        ...style,
      }}
    >
      {frostClass && (
        <div
          className={`absolute inset-x-0 top-0 pointer-events-none ${frostClass}`}
          style={{ height: "160px" }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

/* --- Surface --- */
interface SurfaceProps extends BaseProps {
  level?: 0 | 1 | 2 | 3;
}

export function Surface({
  level = 1,
  children,
  className = "",
  style,
}: SurfaceProps) {
  return (
    <div
      className={`glass-${level} rounded-[var(--glass-radius,16px)] p-4 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* --- Divider --- */
interface DividerProps {
  variant?:
    | "default"
    | "bold"
    | "dashed"
    | "gradient"
    | "glass"
    | "etched"
    | "groove"
    | "ridge"
    | "frostedSlit";
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Divider({
  variant = "default",
  label,
  className = "",
  style,
}: DividerProps) {
  const dark = useDarkMode();
  if (label) {
    return (
      <div
        className={`flex items-center gap-3 ${className}`}
        style={style}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            background: dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            opacity: 0.4,
            textTransform: "uppercase" as const,
          }}
        >
          {label}
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        />
      </div>
    );
  }

  const w = dark ? "255,255,255" : "0,0,0";
  const wInv = dark ? "0,0,0" : "255,255,255";

  const styles: Record<string, CSSProperties> = {
    default: { height: "1px", background: `rgba(${w},0.08)` },
    bold: { height: "2px", background: `rgba(${w},0.15)` },
    dashed: {
      height: "1px",
      borderBottom: `1px dashed rgba(${w},0.15)`,
      background: "transparent",
    },
    gradient: {
      height: "1px",
      background: `linear-gradient(90deg, transparent, rgba(${w},0.12), transparent)`,
    },
    glass: {
      height: "2px",
      background: `linear-gradient(to bottom, rgba(${wInv},0.4), rgba(${w},0.08))`,
    },
    etched: {
      height: "0px",
      boxShadow: `0 -1px 0 rgba(${w},0.08), 0 1px 0 rgba(${wInv},0.15)`,
    },
    groove: {
      height: "0px",
      boxShadow: `0 -1px 0 rgba(${w},0.12), 0 1px 0 rgba(${wInv},0.2), 0 -2px 0 rgba(${wInv},0.08), 0 2px 0 rgba(${w},0.05)`,
    },
    ridge: {
      height: "0px",
      boxShadow: `0 -1px 0 rgba(${wInv},0.2), 0 1px 0 rgba(${w},0.12), 0 -2px 0 rgba(${w},0.05), 0 2px 0 rgba(${wInv},0.08)`,
    },
    frostedSlit: {
      height: "1px",
      background: `linear-gradient(90deg, transparent 5%, rgba(${wInv},0.25) 30%, rgba(${wInv},0.35) 50%, rgba(${wInv},0.25) 70%, transparent 95%)`,
      boxShadow: `0 1px 2px rgba(${w},0.1)`,
    },
  };

  return (
    <div
      className={className}
      style={{ width: "100%", ...styles[variant], ...style }}
    />
  );
}

/* ═══════════════════════════════════════════════
   FORM INPUTS
   ═══════════════════════════════════════════════ */

/* --- Input --- */
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Input({
  placeholder = "",
  value,
  onChange,
  type = "text",
  size = "md",
  error = false,
  success = false,
  disabled = false,
  icon,
  className = "",
  style,
}: InputProps) {
  const dark = useDarkMode();
  const [focused, setFocused] = useState(false);

  const sizeMap = {
    sm: { py: "8px", px: "12px", fs: "12px" },
    md: { py: "12px", px: "16px", fs: "14px" },
    lg: { py: "16px", px: "20px", fs: "16px" },
  };
  const s = sizeMap[size];

  const borderColor = error
    ? "rgba(255,59,48,0.7)"
    : success
      ? "rgba(52,199,89,0.7)"
      : focused
        ? dark
          ? "#fff"
          : "#000"
        : "transparent";

  const bg = focused
    ? dark
      ? "rgba(30,30,30,1)"
      : "rgba(255,255,255,1)"
    : dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(255,255,255,0.6)";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      {icon && (
        <span
          style={{
            position: "absolute",
            left: s.px,
            display: "flex",
            pointerEvents: "none",
            opacity: 0.5,
          }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={className}
        style={{
          width: "100%",
          padding: `${s.py} ${s.px}`,
          paddingLeft: icon ? "40px" : s.px,
          paddingRight: error || success ? "40px" : s.px,
          fontSize: s.fs,
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${borderColor}`,
          background: bg,
          color: dark ? "#fff" : "#000",
          outline: "none",
          transition: "all 200ms ease",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          ...style,
        }}
      />
      {error && (
        <span
          style={{
            position: "absolute",
            right: "14px",
            color: "rgba(255,59,48,0.8)",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          &#x2717;
        </span>
      )}
      {success && !error && (
        <span
          style={{
            position: "absolute",
            right: "14px",
            color: "rgba(52,199,89,0.8)",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          &#x2713;
        </span>
      )}
    </div>
  );
}

/* --- SearchInput --- */
interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function SearchInput({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  className = "",
  style,
}: SearchInputProps) {
  const dark = useDarkMode();
  const [internal, setInternal] = useState("");
  const val = controlledValue ?? internal;
  const [focused, setFocused] = useState(false);

  const handleChange = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };

  const strokeWidth = focused ? 2.5 : 1.5;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          left: "14px",
          pointerEvents: "none",
          transition: "stroke-width 200ms ease",
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={val}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={className}
        style={{
          width: "100%",
          padding: "12px 16px",
          paddingLeft: "40px",
          paddingRight: val ? "36px" : "16px",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-pill, 100px)",
          border: `2px solid ${focused ? (dark ? "#fff" : "#000") : "transparent"}`,
          background: dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.6)",
          color: dark ? "#fff" : "#000",
          outline: "none",
          transition: "all 200ms ease",
          ...style,
        }}
      />
      {val && (
        <button
          onClick={() => handleChange("")}
          style={{
            position: "absolute",
            right: "12px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: "none",
            background: dark
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.08)",
            color: dark ? "#fff" : "#000",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            padding: 0,
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
}

/* --- Textarea --- */
interface TextareaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function Textarea({
  placeholder = "",
  rows = 3,
  value,
  onChange,
  className = "",
  style,
}: TextareaProps) {
  const dark = useDarkMode();
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={className}
      style={{
        width: "100%",
        padding: "12px 16px",
        fontSize: "14px",
        fontFamily: "var(--font-body)",
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: `2px solid ${focused ? (dark ? "#fff" : "#000") : "transparent"}`,
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.6)",
        color: dark ? "#fff" : "#000",
        outline: "none",
        resize: "vertical",
        transition: "all 200ms ease",
        ...style,
      }}
    />
  );
}

/* --- Toggle --- */
interface ToggleProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export function Toggle({
  checked = false,
  onChange,
  className = "",
  style,
}: ToggleProps) {
  const dark = useDarkMode();
  return (
    <button
      className={className}
      onClick={() => onChange?.(!checked)}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "12px",
        border: "none",
        padding: "2px",
        cursor: "pointer",
        transition: "all 200ms",
        background: checked
          ? dark
            ? "#b0c4af"
            : "#354334"
          : dark
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        ...style,
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          transition: "all 200ms",
        }}
      />
    </button>
  );
}

/* --- Checkbox --- */
interface CheckboxProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export function Checkbox({
  checked = false,
  onChange,
  className = "",
  style,
}: CheckboxProps) {
  const dark = useDarkMode();
  return (
    <button
      className={className}
      onClick={() => onChange?.(!checked)}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "4px",
        border: checked
          ? "none"
          : `2px solid ${dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"}`,
        background: checked ? (dark ? "#b0c4af" : "#354334") : "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 200ms",
        padding: 0,
        ...style,
      }}
    >
      {checked && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={dark ? "#000" : "#fff"}
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </button>
  );
}

/* --- Radio --- */
interface RadioProps {
  selected?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export function Radio({
  selected = false,
  onChange,
  className = "",
  style,
}: RadioProps) {
  const dark = useDarkMode();
  const accent = dark ? "#b0c4af" : "#354334";
  return (
    <button
      className={className}
      onClick={() => onChange?.(!selected)}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: `2px solid ${selected ? accent : dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"}`,
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 200ms",
        padding: 0,
        ...style,
      }}
    >
      {selected && (
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: accent,
          }}
        />
      )}
    </button>
  );
}

/* --- Select --- */
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

export function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  style,
}: SelectProps) {
  const dark = useDarkMode();
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const selected = options.find((o) => o.value === value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      setHighlightIdx(0);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIdx >= 0) {
      e.preventDefault();
      onChange?.(options[highlightIdx].value);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", width: "100%", ...style }}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${open ? (dark ? "#fff" : "#000") : "transparent"}`,
          background: dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.6)",
          color: selected
            ? dark
              ? "#fff"
              : "#000"
            : dark
              ? "rgba(255,255,255,0.4)"
              : "rgba(0,0,0,0.4)",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          outline: "none",
          transition: "all 200ms ease",
        }}
      >
        <span>{selected?.label ?? placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            borderRadius: "var(--glass-radius-sm, 10px)",
            background: dark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "4px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {options.map((opt, i) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlightIdx(i)}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                border: "none",
                borderRadius: "var(--glass-radius-sm, 8px)",
                background:
                  i === highlightIdx
                    ? dark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.04)"
                    : "transparent",
                color:
                  opt.value === value
                    ? dark
                      ? "#fff"
                      : "#000"
                    : dark
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(0,0,0,0.7)",
                fontWeight: opt.value === value ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                outline: "none",
                transition: "background 100ms ease",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* --- SearchableSelect --- */
interface SearchableSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

export function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = "Search & select...",
  className = "",
  style,
}: SearchableSelectProps) {
  const dark = useDarkMode();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIdx, setHighlightIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (open) {
      setSearch("");
      setHighlightIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIdx >= 0 && filtered[highlightIdx]) {
      e.preventDefault();
      onChange?.(filtered[highlightIdx].value);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const highlightMatch = (text: string) => {
    if (!search) return text;
    const idx = text.toLowerCase().indexOf(search.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <strong style={{ fontWeight: 700 }}>
          {text.slice(idx, idx + search.length)}
        </strong>
        {text.slice(idx + search.length)}
      </>
    );
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", width: "100%", ...style }}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${open ? (dark ? "#fff" : "#000") : "transparent"}`,
          background: dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.6)",
          color: selected
            ? dark
              ? "#fff"
              : "#000"
            : dark
              ? "rgba(255,255,255,0.4)"
              : "rgba(0,0,0,0.4)",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          outline: "none",
          transition: "all 200ms ease",
        }}
      >
        <span>{selected?.label ?? placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            borderRadius: "var(--glass-radius-sm, 10px)",
            background: dark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "4px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "4px 4px 0" }}>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightIdx(0);
              }}
              placeholder="Type to filter..."
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "13px",
                fontFamily: "var(--font-body)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                borderRadius: "var(--glass-radius-sm, 8px)",
                background: dark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                color: dark ? "#fff" : "#000",
                outline: "none",
                marginBottom: "4px",
              }}
            />
          </div>
          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "10px 12px",
                  fontSize: "13px",
                  opacity: 0.4,
                  textAlign: "center",
                }}
              >
                No results
              </div>
            ) : (
              filtered.map((opt, i) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setHighlightIdx(i)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    fontFamily: "var(--font-body)",
                    border: "none",
                    borderRadius: "var(--glass-radius-sm, 8px)",
                    background:
                      i === highlightIdx
                        ? dark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.04)"
                        : "transparent",
                    color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                    fontWeight: opt.value === value ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    outline: "none",
                    transition: "background 100ms ease",
                  }}
                >
                  {highlightMatch(opt.label)}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* --- SegmentedControl --- */
interface SegmentedControlProps {
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function SegmentedControl({
  options = [],
  value,
  onChange,
  className = "",
  style,
}: SegmentedControlProps) {
  const dark = useDarkMode();
  const activeIdx = options.indexOf(value ?? "");
  const count = options.length || 1;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        position: "relative",
        borderRadius: "var(--glass-radius-pill, 100px)",
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.06)",
        padding: "3px",
        ...style,
      }}
    >
      {/* Sliding active indicator */}
      {activeIdx >= 0 && (
        <div
          style={{
            position: "absolute",
            top: "3px",
            bottom: "3px",
            left: `calc(3px + ${(activeIdx / count) * 100}%)`,
            width: `calc(${100 / count}% - 3px)`,
            borderRadius: "var(--glass-radius-pill, 100px)",
            background: dark ? "#fff" : "#000",
            transition: "left 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 0,
          }}
        />
      )}
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange?.(opt)}
            style={{
              position: "relative",
              zIndex: 1,
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-ui)",
              border: "none",
              borderRadius: "var(--glass-radius-pill, 100px)",
              background: "transparent",
              color: isActive
                ? dark
                  ? "#000"
                  : "#fff"
                : dark
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(0,0,0,0.5)",
              cursor: "pointer",
              transition: "color 200ms ease",
              outline: "none",
              flex: 1,
              whiteSpace: "nowrap",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* --- Slider --- */
interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (v: number) => void;
  showValue?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Slider({
  min = 0,
  max = 100,
  value: controlledValue,
  onChange,
  showValue = false,
  className = "",
  style,
}: SliderProps) {
  const dark = useDarkMode();
  const [internal, setInternal] = useState(50);
  const val = controlledValue ?? internal;
  const pct = ((val - min) / (max - min)) * 100;

  const handleChange = (v: number) => {
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        ...style,
      }}
    >
      <div style={{ position: "relative", flex: 1, height: "20px", display: "flex", alignItems: "center" }}>
        {/* Track background */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "4px",
            borderRadius: "2px",
            background: dark
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.1)",
          }}
        />
        {/* Track fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: "4px",
            borderRadius: "2px",
            background: dark
              ? "linear-gradient(90deg, rgba(255,255,255,0.4), #fff)"
              : "linear-gradient(90deg, rgba(0,0,0,0.3), #000)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => handleChange(Number(e.target.value))}
          style={{
            width: "100%",
            height: "20px",
            appearance: "none",
            WebkitAppearance: "none",
            background: "transparent",
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
            margin: 0,
          }}
        />
      </div>
      {showValue && (
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            minWidth: "36px",
            textAlign: "right",
            color: dark ? "#fff" : "#000",
          }}
        >
          {val}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LAYOUT
   ═══════════════════════════════════════════════ */

export function Box({ children, className = "", style }: BaseProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

interface StackProps extends BaseProps {
  gap?: string;
}

export function Stack({
  gap = "12px",
  children,
  className = "",
  style,
}: StackProps) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap, ...style }}
    >
      {children}
    </div>
  );
}

interface InlineProps extends BaseProps {
  gap?: string;
  align?: string;
}

export function Inline({
  gap = "12px",
  children,
  className = "",
  style,
  align = "center",
}: InlineProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        gap,
        alignItems: align,
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Center({ children, className = "", style }: BaseProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface SpacerProps {
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export function Spacer({ size = "16px", className = "", style }: SpacerProps) {
  return (
    <div className={className} style={{ height: size, width: "100%", ...style }} />
  );
}

interface GridProps extends BaseProps {
  cols?: number;
  gap?: string;
}

export function Grid({
  cols = 2,
  gap = "16px",
  children,
  className = "",
  style,
}: GridProps) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FEEDBACK
   ═══════════════════════════════════════════════ */

interface SpinnerProps {
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export function Spinner({ size = "24px", className = "", style }: SpinnerProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        border: "2.5px solid rgba(0,0,0,0.1)",
        borderTopColor: "#354334",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        ...style,
      }}
    />
  );
}

interface ProgressProps {
  value?: number;
  className?: string;
  style?: CSSProperties;
}

export function Progress({
  value = 60,
  className = "",
  style,
}: ProgressProps) {
  const dark = useDarkMode();
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "6px",
        borderRadius: "3px",
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: "100%",
          borderRadius: "3px",
          background: dark ? "#b0c4af" : "#354334",
          transition: "width 300ms ease",
        }}
      />
    </div>
  );
}

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  width = "100%",
  height = "16px",
  rounded = "8px",
  className = "",
  style,
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius: rounded,
        background: "rgba(0,0,0,0.06)",
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════
   DATA DISPLAY
   ═══════════════════════════════════════════════ */

/* --- Badge --- */
interface BadgeProps extends BaseProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export function Badge({
  children,
  variant = "default",
  className = "",
  style,
}: BadgeProps) {
  const colors: Record<string, { bg: string; text: string }> = {
    default: { bg: "rgba(0,0,0,0.06)", text: "rgba(0,0,0,0.6)" },
    success: { bg: "rgba(52,199,89,0.15)", text: "#34C759" },
    warning: { bg: "rgba(255,149,0,0.15)", text: "#FF9500" },
    error: { bg: "rgba(255,59,48,0.15)", text: "#FF3B30" },
    info: { bg: "rgba(90,200,250,0.15)", text: "#5AC8FA" },
  };
  const c = colors[variant] ?? colors.default;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "11px",
        fontWeight: 600,
        padding: "3px 8px",
        borderRadius: "100px",
        background: c.bg,
        color: c.text,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* --- Tag --- */
interface TagProps {
  label: string;
  color?: "default" | "blue" | "green" | "red" | "orange" | "purple";
  onRemove?: () => void;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
}

export function Tag({
  label,
  color = "default",
  onRemove,
  size = "md",
  className = "",
  style,
}: TagProps) {
  const dark = useDarkMode();
  const colorMap: Record<string, { bg: string; text: string }> = {
    default: {
      bg: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
      text: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
    },
    blue: { bg: "rgba(0,122,255,0.12)", text: "#007AFF" },
    green: { bg: "rgba(52,199,89,0.12)", text: "#34C759" },
    red: { bg: "rgba(255,59,48,0.12)", text: "#FF3B30" },
    orange: { bg: "rgba(255,149,0,0.12)", text: "#FF9500" },
    purple: { bg: "rgba(175,82,222,0.12)", text: "#AF52DE" },
  };
  const c = colorMap[color] ?? colorMap.default;
  const isSm = size === "sm";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: isSm ? "11px" : "12px",
        fontWeight: 600,
        fontFamily: "var(--font-ui)",
        padding: isSm ? "2px 8px" : "4px 10px",
        borderRadius: "var(--glass-radius-pill, 100px)",
        background: c.bg,
        color: c.text,
        ...style,
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 0,
            fontSize: isSm ? "12px" : "14px",
            lineHeight: 1,
            color: "inherit",
            opacity: 0.6,
            display: "flex",
            alignItems: "center",
          }}
        >
          &times;
        </button>
      )}
    </span>
  );
}

/* --- Avatar --- */
interface AvatarProps {
  src?: string;
  name?: string;
  size?: string;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
  style?: CSSProperties;
}

export function Avatar({
  src,
  name = "",
  size = "40px",
  status,
  className = "",
  style,
}: AvatarProps) {
  const dark = useDarkMode();
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const statusColors: Record<string, string> = {
    online: "#34C759",
    offline: "#8E8E93",
    busy: "#FF3B30",
    away: "#FF9F0A",
  };

  const sizeNum = parseInt(size) || 40;
  const dotSize = Math.max(8, sizeNum * 0.25);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: src ? undefined : dark ? "#4a5a49" : "#354334",
          backgroundImage: src ? `url(${src})` : undefined,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: `calc(${size} * 0.35)`,
          fontWeight: 600,
          overflow: "hidden",
        }}
      >
        {!src && initials}
      </div>
      {status && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: "50%",
            background: statusColors[status],
            border: `2px solid ${dark ? "#1a1a1a" : "#fff"}`,
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════ */

/* --- TabBar --- */
interface TabBarProps {
  tabs?: string[];
  active?: number;
  onChange?: (i: number) => void;
  className?: string;
  style?: CSSProperties;
}

export function TabBar({
  tabs = ["Tab 1", "Tab 2", "Tab 3"],
  active = 0,
  onChange,
  className = "",
  style,
}: TabBarProps) {
  const dark = useDarkMode();
  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: "0",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        ...style,
      }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange?.(i)}
          style={{
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: i === active ? 600 : 400,
            color:
              i === active
                ? dark
                  ? "#fff"
                  : "#000"
                : dark
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.4)",
            border: "none",
            borderBottom:
              i === active
                ? `2px solid ${dark ? "#fff" : "#000"}`
                : "2px solid transparent",
            background: "transparent",
            cursor: "pointer",
            transition: "all 200ms",
            marginBottom: "-1px",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* --- PillTabs --- */
interface PillTabsProps {
  tabs: string[];
  activeTab?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function PillTabs({
  tabs = [],
  activeTab,
  onChange,
  className = "",
  style,
}: PillTabsProps) {
  const dark = useDarkMode();
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        gap: "4px",
        padding: "4px",
        borderRadius: "var(--glass-radius-pill, 100px)",
        background: dark
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            style={{
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-ui)",
              border: "none",
              borderRadius: "var(--glass-radius-pill, 100px)",
              background: isActive
                ? dark
                  ? "#fff"
                  : "#000"
                : "transparent",
              color: isActive
                ? dark
                  ? "#000"
                  : "#fff"
                : dark
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(0,0,0,0.5)",
              cursor: "pointer",
              transition: "all 200ms ease",
              outline: "none",
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

/* --- NavItem --- */
interface NavItemProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function NavItem({
  icon,
  label,
  active = false,
  onClick,
  className = "",
  style,
}: NavItemProps) {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: "none",
        width: "100%",
        textAlign: "left",
        fontSize: "14px",
        fontWeight: active ? 600 : 400,
        fontFamily: "var(--font-ui)",
        background: active
          ? dark
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.06)"
          : hovered
            ? dark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.03)"
            : "transparent",
        color: active
          ? dark
            ? "#fff"
            : "#000"
          : dark
            ? "rgba(255,255,255,0.6)"
            : "rgba(0,0,0,0.6)",
        cursor: "pointer",
        transition: "all 150ms ease",
        outline: "none",
        ...style,
      }}
    >
      {icon && (
        <span style={{ display: "flex", flexShrink: 0, opacity: active ? 1 : 0.6 }}>
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}

/* --- Breadcrumb --- */
interface BreadcrumbProps {
  items?: string[];
  className?: string;
  style?: CSSProperties;
}

export function Breadcrumb({
  items = ["Home", "Page"],
  className = "",
  style,
}: BreadcrumbProps) {
  const dark = useDarkMode();
  return (
    <nav
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {i > 0 && (
            <span style={{ opacity: 0.3, color: dark ? "#fff" : "#000" }}>
              /
            </span>
          )}
          <span
            style={{
              fontWeight: i === items.length - 1 ? 600 : 400,
              opacity: i === items.length - 1 ? 1 : 0.5,
              cursor: i < items.length - 1 ? "pointer" : "default",
              color: dark ? "#fff" : "#000",
            }}
          >
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   OVERLAYS & MODALS
   ═══════════════════════════════════════════════ */

/* --- Overlay --- */
interface OverlayProps {
  open: boolean;
  onClick?: () => void;
  blur?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Overlay({
  open,
  onClick,
  blur = true,
  className = "",
  style,
}: OverlayProps) {
  if (!open) return null;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 998,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: blur ? "blur(8px)" : undefined,
        WebkitBackdropFilter: blur ? "blur(8px)" : undefined,
        transition: "opacity 200ms ease",
        ...style,
      }}
    />
  );
}

/* --- Modal --- */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className = "",
  style,
}: ModalProps) {
  const dark = useDarkMode();

  // Body scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: "380px", md: "520px", lg: "700px" };

  return (
    <>
      <Overlay open={open} onClick={onClose} blur />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          pointerEvents: "none",
        }}
      >
        <div
          className={`glass-1 ${className}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: widths[size],
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "var(--glass-radius, 16px)",
            background: dark
              ? "rgba(30,30,30,0.92)"
              : "rgba(255,255,255,0.92)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)"}`,
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
            animation: "modalIn 200ms ease",
            overflow: "hidden",
            ...style,
          }}
        >
          {/* Header */}
          {title && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 650,
                  fontFamily: "var(--font-heading)",
                  color: dark ? "#fff" : "#000",
                }}
              >
                {title}
              </span>
              <button
                onClick={onClose}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: dark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
                  color: dark ? "#fff" : "#000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: 400,
                  transition: "background 150ms ease",
                }}
              >
                &times;
              </button>
            </div>
          )}
          {/* Body */}
          <div
            style={{
              padding: "20px",
              overflowY: "auto",
              flex: 1,
              color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
            }}
          >
            {children}
          </div>
          {/* Footer */}
          {footer && (
            <div
              style={{
                padding: "12px 20px",
                borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* --- Tooltip --- */
interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Tooltip({
  content,
  position = "top",
  children,
  className = "",
  style,
}: TooltipProps) {
  const dark = useDarkMode();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), 300);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const positionStyles: Record<string, CSSProperties> = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
  };

  const arrowPositions: Record<string, CSSProperties> = {
    top: {
      bottom: "-4px",
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
    bottom: {
      top: "-4px",
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
    left: {
      right: "-4px",
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
    right: {
      left: "-4px",
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
  };

  return (
    <div
      className={className}
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{
        position: "relative",
        display: "inline-flex",
        ...style,
      }}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "absolute",
            ...positionStyles[position],
            zIndex: 1000,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "6px 10px",
              fontSize: "12px",
              fontWeight: 500,
              fontFamily: "var(--font-ui)",
              borderRadius: "var(--glass-radius-sm, 8px)",
              background: dark ? "rgba(50,50,50,0.95)" : "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {content}
            <div
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                background: dark ? "rgba(50,50,50,0.95)" : "rgba(0,0,0,0.85)",
                ...arrowPositions[position],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COMPONENT MAP — maps registry IDs to React components
   ═══════════════════════════════════════════════ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PRIMITIVE_MAP: Record<string, React.ComponentType<any>> = {
  // Typography
  heading: Heading,
  text: Text,
  label: Label,
  caption: Caption,
  code: Code,
  link: Link,
  // Buttons
  button: Button,
  "icon-button": IconButton,
  "link-button": LinkButton,
  // Surfaces
  card: Card,
  surface: Surface,
  divider: Divider,
  // Form
  input: Input,
  "search-input": SearchInput,
  textarea: Textarea,
  toggle: Toggle,
  checkbox: Checkbox,
  radio: Radio,
  select: Select,
  "searchable-select": SearchableSelect,
  "segmented-control": SegmentedControl,
  slider: Slider,
  // Layout
  box: Box,
  stack: Stack,
  inline: Inline,
  center: Center,
  spacer: Spacer,
  grid: Grid,
  // Feedback
  spinner: Spinner,
  progress: Progress,
  skeleton: Skeleton,
  // Data Display
  badge: Badge,
  tag: Tag,
  avatar: Avatar,
  // Navigation
  "tab-bar": TabBar,
  "pill-tabs": PillTabs,
  "nav-item": NavItem,
  breadcrumb: Breadcrumb,
  // Overlays
  overlay: Overlay,
  modal: Modal,
  tooltip: Tooltip,
};
