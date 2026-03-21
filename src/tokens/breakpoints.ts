/**
 * Breakpoint tokens
 */
export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600,
  max: 9999,
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type ZIndex = keyof typeof zIndex;
