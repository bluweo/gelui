/**
 * Glass tokens — the core identity of the design system
 */
export const glass = {
  levels: {
    0: { blur: 4,  saturate: 1.2, bgAlpha: 0.10, label: 'Subtle' },
    1: { blur: 12, saturate: 1.6, bgAlpha: 0.35, label: 'Cards' },
    2: { blur: 24, saturate: 1.8, bgAlpha: 0.65, label: 'Modals' },
    3: { blur: 40, saturate: 2.0, bgAlpha: 0.80, label: 'Overlays' },
  },
  specular: {
    light: {
      top: 'rgba(255,255,255, 0.35)',
      mid: 'rgba(255,255,255, 0.08)',
      innerShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.04)',
      edgeGlow: 'inset 0 0.5px 0 rgba(255,255,255,0.7)',
      noiseOpacity: 0.03,
    },
    dark: {
      top: 'rgba(255,255,255, 0.08)',
      mid: 'rgba(255,255,255, 0.02)',
      innerShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.08)',
      edgeGlow: 'inset 0 0.5px 0 rgba(255,255,255,0.06)',
      noiseOpacity: 0.02,
    },
  },
  border: {
    light: { default: 'rgba(255,255,255, 0.55)', hover: 'rgba(255,255,255, 0.75)' },
    dark:  { default: 'rgba(255,255,255, 0.10)', hover: 'rgba(255,255,255, 0.18)' },
  },
  defaults: {
    transparency: 0.85,
    blurIntensity: 24,
    radiusPreset: 'medium' as const,
    shadowPreset: 'soft' as const,
  },
} as const;

export type GlassLevel = 0 | 1 | 2 | 3;
export type GlassScale = typeof glass;
