/* ═══════════════════════════════════════════════
   GEL UI — React Primitive Library
   30+ components mapped from registry IDs.
   Used by DSLRenderer to resolve "type" → React component.
   ═══════════════════════════════════════════════ */
import { type ReactNode, type CSSProperties, useState } from "react";

/* ─── Helper types ─── */
interface BaseProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ═══════════════════════════════════════════════
   TYPOGRAPHY
   ═══════════════════════════════════════════════ */
export function Heading({ level = 1, children, className = "", style }: BaseProps & { level?: 1|2|3|4|5|6 }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes: Record<number, string> = { 1: "36px", 2: "30px", 3: "24px", 4: "20px", 5: "17px", 6: "15px" };
  const weights: Record<number, number> = { 1: 750, 2: 700, 3: 650, 4: 600, 5: 600, 6: 600 };
  return (
    <Tag
      className={className}
      style={{ fontSize: sizes[level], fontWeight: weights[level], lineHeight: 1.2, letterSpacing: "-0.02em", fontFamily: "var(--font-heading)", ...style }}
    >
      {children}
    </Tag>
  );
}

export function Text({ size = "15px", weight = 400, children, className = "", style }: BaseProps & { size?: string; weight?: number }) {
  return <p className={className} style={{ fontSize: size, fontWeight: weight, lineHeight: 1.6, fontFamily: "var(--font-body)", ...style }}>{children}</p>;
}

export function Label({ children, className = "", style }: BaseProps) {
  return <span className={className} style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const, fontFamily: "var(--font-ui)", ...style }}>{children}</span>;
}

export function Caption({ children, className = "", style }: BaseProps) {
  return <span className={className} style={{ fontSize: "11px", fontWeight: 400, opacity: 0.5, fontFamily: "var(--font-body)", ...style }}>{children}</span>;
}

export function Code({ children, className = "", style, inline = true }: BaseProps & { inline?: boolean }) {
  if (inline) {
    return (
      <code className={className} style={{ fontSize: "13px", fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.06)", padding: "2px 6px", borderRadius: "4px", ...style }}>
        {children}
      </code>
    );
  }
  return (
    <pre className={className} style={{ fontSize: "13px", fontFamily: "var(--font-mono)", background: "#1a1a1a", color: "#e0e0e0", padding: "16px", borderRadius: "var(--glass-radius-sm, 10px)", overflow: "auto", ...style }}>
      <code>{children}</code>
    </pre>
  );
}

export function Link({ href = "#", children, className = "", style }: BaseProps & { href?: string }) {
  return (
    <a href={href} className={className} style={{ fontSize: "15px", fontWeight: 500, color: "#354334", textDecoration: "underline", textDecorationColor: "rgba(53,67,52,0.3)", textUnderlineOffset: "3px", cursor: "pointer", ...style }}>
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════════ */
export function Button({ variant = "solid", size = "md", children, className = "", style, onClick }: BaseProps & { variant?: "solid"|"ghost"|"glass"|"gel"|"link"; size?: "sm"|"md"|"lg"; onClick?: () => void }) {
  const sizeMap = { sm: { px: "14px", py: "8px", fs: "12px" }, md: { px: "20px", py: "10px", fs: "13px" }, lg: { px: "28px", py: "14px", fs: "15px" } };
  const s = sizeMap[size];
  const base: CSSProperties = { fontSize: s.fs, fontWeight: 600, fontFamily: "var(--font-ui)", padding: `${s.py} ${s.px}`, borderRadius: "var(--glass-radius-pill, 100px)", cursor: "pointer", border: "none", transition: "all 200ms ease", display: "inline-flex", alignItems: "center", gap: "8px", ...style };

  const variants: Record<string, CSSProperties> = {
    solid: { ...base, background: "#000", color: "#fff" },
    ghost: { ...base, background: "transparent", border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.7)" },
    glass: { ...base, background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", color: "#000" },
    gel: { ...base, background: "rgba(255,255,255,0.25)", backdropFilter: "blur(12px)", boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.75)" },
    link: { ...base, background: "transparent", padding: "0", color: "#354334", textDecoration: "underline" },
  };

  return <button className={className} style={variants[variant]} onClick={onClick}>{children}</button>;
}

export function IconButton({ icon = "+", size = "md", children, className = "", style, onClick }: BaseProps & { icon?: string; size?: "sm"|"md"|"lg"; onClick?: () => void }) {
  const dim = size === "sm" ? "32px" : size === "lg" ? "48px" : "40px";
  return (
    <button
      className={className}
      style={{ width: dim, height: dim, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px", ...style }}
      onClick={onClick}
    >
      {children || icon}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   SURFACES
   ═══════════════════════════════════════════════ */
export function Card({ variant = "glass", frost = "standard", children, className = "", style }: BaseProps & { variant?: "glass"|"gel"|"solid"|"transparent"; frost?: "standard"|"haze"|"none" }) {
  const variantClasses: Record<string, string> = {
    glass: "glass-1 glass-specular",
    gel: "gel-glass glass-specular",
    solid: "",
    transparent: "",
  };
  const frostClass = frost === "standard" ? "ds-card-frost" : frost === "haze" ? "ds-card-frost-haze" : "";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--glass-radius,16px)] p-5 ${variantClasses[variant]} ${className}`}
      style={{ ...(variant === "solid" ? { background: "rgba(255,255,255,0.95)" } : variant === "transparent" ? { border: "1px solid rgba(0,0,0,0.08)" } : {}), ...style }}
    >
      {frostClass && <div className={`absolute inset-x-0 top-0 pointer-events-none ${frostClass}`} style={{ height: "160px" }} />}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

export function Surface({ level = 1, children, className = "", style }: BaseProps & { level?: 0|1|2|3 }) {
  return (
    <div className={`glass-${level} rounded-[var(--glass-radius,16px)] p-4 ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Divider({ variant = "default", label, className = "", style }: { variant?: "default"|"bold"|"dashed"|"gradient"|"glass"; label?: string; className?: string; style?: CSSProperties }) {
  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className}`} style={style}>
        <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.1)" }} />
        <span style={{ fontSize: "11px", fontWeight: 600, opacity: 0.4, textTransform: "uppercase" as const }}>{label}</span>
        <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.1)" }} />
      </div>
    );
  }
  const styles: Record<string, CSSProperties> = {
    default: { height: "1px", background: "rgba(0,0,0,0.08)" },
    bold: { height: "2px", background: "rgba(0,0,0,0.15)" },
    dashed: { height: "1px", borderBottom: "1px dashed rgba(0,0,0,0.15)", background: "transparent" },
    gradient: { height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)" },
    glass: { height: "2px", background: "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(0,0,0,0.08))" },
  };
  return <div className={className} style={{ width: "100%", ...styles[variant], ...style }} />;
}

/* ═══════════════════════════════════════════════
   FORM INPUTS
   ═══════════════════════════════════════════════ */
export function Input({ placeholder = "", value, onChange, type = "text", disabled = false, validation, className = "", style }: { placeholder?: string; value?: string; onChange?: (v: string) => void; type?: string; disabled?: boolean; validation?: "valid"|"invalid"; className?: string; style?: CSSProperties }) {
  const borderColor = validation === "valid" ? "rgba(52,199,89,0.6)" : validation === "invalid" ? "rgba(255,59,48,0.6)" : "rgba(0,0,0,0.1)";
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={className}
      style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-body)", borderRadius: "var(--glass-radius-sm, 10px)", border: `1.5px solid ${borderColor}`, background: "rgba(255,255,255,0.8)", outline: "none", transition: "all 200ms", opacity: disabled ? 0.5 : 1, ...style }}
    />
  );
}

export function Textarea({ placeholder = "", rows = 3, value, onChange, className = "", style }: { placeholder?: string; rows?: number; value?: string; onChange?: (v: string) => void; className?: string; style?: CSSProperties }) {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={className}
      style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-body)", borderRadius: "var(--glass-radius-sm, 10px)", border: "1.5px solid rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.8)", outline: "none", resize: "vertical", transition: "all 200ms", ...style }}
    />
  );
}

export function Toggle({ checked = false, onChange, className = "", style }: { checked?: boolean; onChange?: (v: boolean) => void; className?: string; style?: CSSProperties }) {
  return (
    <button
      className={className}
      onClick={() => onChange?.(!checked)}
      style={{ width: "44px", height: "24px", borderRadius: "12px", border: "none", padding: "2px", cursor: "pointer", transition: "all 200ms", background: checked ? "#354334" : "rgba(0,0,0,0.12)", display: "flex", alignItems: checked ? "center" : "center", justifyContent: checked ? "flex-end" : "flex-start", ...style }}
    >
      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", transition: "all 200ms" }} />
    </button>
  );
}

export function Checkbox({ checked = false, onChange, className = "", style }: { checked?: boolean; onChange?: (v: boolean) => void; className?: string; style?: CSSProperties }) {
  return (
    <button
      className={className}
      onClick={() => onChange?.(!checked)}
      style={{ width: "20px", height: "20px", borderRadius: "4px", border: checked ? "none" : "2px solid rgba(0,0,0,0.2)", background: checked ? "#354334" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 200ms", ...style }}
    >
      {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}
    </button>
  );
}

export function Radio({ selected = false, onChange, className = "", style }: { selected?: boolean; onChange?: (v: boolean) => void; className?: string; style?: CSSProperties }) {
  return (
    <button
      className={className}
      onClick={() => onChange?.(!selected)}
      style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${selected ? "#354334" : "rgba(0,0,0,0.2)"}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 200ms", ...style }}
    >
      {selected && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#354334" }} />}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   LAYOUT
   ═══════════════════════════════════════════════ */
export function Box({ children, className = "", style }: BaseProps) {
  return <div className={className} style={style}>{children}</div>;
}

export function Stack({ gap = "12px", children, className = "", style }: BaseProps & { gap?: string }) {
  return <div className={className} style={{ display: "flex", flexDirection: "column", gap, ...style }}>{children}</div>;
}

export function Inline({ gap = "12px", children, className = "", style, align = "center" }: BaseProps & { gap?: string; align?: string }) {
  return <div className={className} style={{ display: "flex", flexDirection: "row", gap, alignItems: align, flexWrap: "wrap", ...style }}>{children}</div>;
}

export function Center({ children, className = "", style }: BaseProps) {
  return <div className={className} style={{ display: "flex", alignItems: "center", justifyContent: "center", ...style }}>{children}</div>;
}

export function Spacer({ size = "16px", className = "", style }: { size?: string; className?: string; style?: CSSProperties }) {
  return <div className={className} style={{ height: size, width: "100%", ...style }} />;
}

export function Grid({ cols = 2, gap = "16px", children, className = "", style }: BaseProps & { cols?: number; gap?: string }) {
  return (
    <div className={className} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FEEDBACK
   ═══════════════════════════════════════════════ */
export function Spinner({ size = "24px", className = "", style }: { size?: string; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={className}
      style={{ width: size, height: size, border: "2.5px solid rgba(0,0,0,0.1)", borderTopColor: "#354334", borderRadius: "50%", animation: "spin 0.8s linear infinite", ...style }}
    />
  );
}

export function Progress({ value = 60, className = "", style }: { value?: number; className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ width: "100%", height: "6px", borderRadius: "3px", background: "rgba(0,0,0,0.08)", overflow: "hidden", ...style }}>
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: "100%", borderRadius: "3px", background: "#354334", transition: "width 300ms ease" }} />
    </div>
  );
}

export function Skeleton({ width = "100%", height = "16px", rounded = "8px", className = "", style }: { width?: string; height?: string; rounded?: string; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{ width, height, borderRadius: rounded, background: "rgba(0,0,0,0.06)", ...style }}
    />
  );
}

/* ═══════════════════════════════════════════════
   DATA DISPLAY
   ═══════════════════════════════════════════════ */
export function Badge({ children, variant = "default", className = "", style }: BaseProps & { variant?: "default"|"success"|"warning"|"error"|"info" }) {
  const colors: Record<string, { bg: string; text: string }> = {
    default: { bg: "rgba(0,0,0,0.06)", text: "rgba(0,0,0,0.6)" },
    success: { bg: "rgba(52,199,89,0.15)", text: "#34C759" },
    warning: { bg: "rgba(255,149,0,0.15)", text: "#FF9500" },
    error: { bg: "rgba(255,59,48,0.15)", text: "#FF3B30" },
    info: { bg: "rgba(90,200,250,0.15)", text: "#5AC8FA" },
  };
  const c = colors[variant] ?? colors.default;
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "100px", background: c.bg, color: c.text, ...style }}>
      {children}
    </span>
  );
}

export function Avatar({ src, name = "", size = "40px", className = "", style }: { src?: string; name?: string; size?: string; className?: string; style?: CSSProperties }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className={className}
      style={{ width: size, height: size, borderRadius: "50%", background: src ? undefined : "#354334", backgroundImage: src ? `url(${src})` : undefined, backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: `calc(${size} * 0.35)`, fontWeight: 600, overflow: "hidden", ...style }}
    >
      {!src && initials}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════ */
export function TabBar({ tabs = ["Tab 1", "Tab 2", "Tab 3"], active = 0, onChange, className = "", style }: { tabs?: string[]; active?: number; onChange?: (i: number) => void; className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(0,0,0,0.08)", ...style }}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange?.(i)}
          style={{
            padding: "10px 16px", fontSize: "13px", fontWeight: i === active ? 600 : 400,
            color: i === active ? "#000" : "rgba(0,0,0,0.4)",
            border: "none", borderBottom: i === active ? "2px solid #000" : "2px solid transparent",
            background: "transparent", cursor: "pointer", transition: "all 200ms",
            marginBottom: "-1px",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function Breadcrumb({ items = ["Home", "Page"], className = "", style }: { items?: string[]; className?: string; style?: CSSProperties }) {
  return (
    <nav className={className} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", ...style }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {i > 0 && <span style={{ opacity: 0.3 }}>/</span>}
          <span style={{ fontWeight: i === items.length - 1 ? 600 : 400, opacity: i === items.length - 1 ? 1 : 0.5, cursor: i < items.length - 1 ? "pointer" : "default" }}>{item}</span>
        </span>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   COMPONENT MAP — maps registry IDs to React components
   ═══════════════════════════════════════════════ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PRIMITIVE_MAP: Record<string, React.ComponentType<any>> = {
  // Typography
  "heading": Heading,
  "text": Text,
  "label": Label,
  "caption": Caption,
  "code": Code,
  "link": Link,
  // Buttons
  "button": Button,
  "icon-button": IconButton,
  // Surfaces
  "card": Card,
  "surface": Surface,
  "divider": Divider,
  // Form
  "input": Input,
  "textarea": Textarea,
  "toggle": Toggle,
  "checkbox": Checkbox,
  "radio": Radio,
  // Layout
  "box": Box,
  "stack": Stack,
  "inline": Inline,
  "center": Center,
  "spacer": Spacer,
  "grid": Grid,
  // Feedback
  "spinner": Spinner,
  "progress": Progress,
  "skeleton": Skeleton,
  // Data
  "badge": Badge,
  "avatar": Avatar,
  // Navigation
  "tab-bar": TabBar,
  "breadcrumb": Breadcrumb,
};
