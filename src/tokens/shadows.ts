/**
 * Shadow tokens — includes user-configurable presets
 */
export const shadows = {
  presets: {
    flat: {
      glass: 'none',
      glassHover: 'none',
      glassElevated: '0 4px 12px rgba(0,0,0,0.06)',
    },
    soft: {
      glass: '0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)',
      glassHover: '0 20px 60px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)',
      glassElevated: '0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)',
    },
    elevated: {
      glass: '0 16px 60px rgba(0,0,0,0.16), 0 6px 24px rgba(0,0,0,0.1)',
      glassHover: '0 28px 80px rgba(0,0,0,0.22), 0 8px 32px rgba(0,0,0,0.12)',
      glassElevated: '0 32px 100px rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.1)',
    },
  },
} as const;

export type ShadowPreset = keyof typeof shadows.presets;
export type ShadowScale = typeof shadows;
