/**
 * Typography tokens
 */
export const typography = {
  fontFamily: {
    sans: "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace",
  },
  fontSize: {
    '2xs': '10px',
    xs: '11.5px',
    sm: '13px',
    md: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 550,
    bold: 650,
    heavy: 750,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.06em',
  },
} as const;

export type TypographyScale = typeof typography;
