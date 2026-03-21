/**
 * Border radius tokens — includes user-configurable presets
 */
export const radii = {
  raw: {
    0: '0px',
    4: '4px',
    6: '6px',
    8: '8px',
    10: '10px',
    12: '12px',
    16: '16px',
    18: '18px',
    24: '24px',
    28: '28px',
    40: '40px',
    100: '100px',
    full: '9999px',
  },
  presets: {
    minimal: { glassLg: '12px', glass: '8px',  glassSm: '4px',  glassPill: '8px' },
    medium:  { glassLg: '24px', glass: '16px', glassSm: '10px', glassPill: '40px' },
    large:   { glassLg: '40px', glass: '28px', glassSm: '18px', glassPill: '100px' },
  },
} as const;

export type RadiusPreset = keyof typeof radii.presets;
export type RadiiScale = typeof radii;
