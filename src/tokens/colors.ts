/**
 * Color tokens — Core (immutable) + Semantic (remappable)
 *
 * Brand colors: Forest Green (#354334), Olive Green (#4A5E48), Golden Yellow (#FFC800)
 */
export const colors = {
  raw: {
    forest: {
      50: '#F4F6F4',
      100: '#E3E8E3',
      200: '#C2CEC1',
      300: '#97AD96',
      400: '#6B8669',
      500: '#354334',
      600: '#2D392C',
      700: '#252F25',
      800: '#1D251D',
      900: '#161B16',
    },
    olive: {
      50: '#F5F7F5',
      100: '#E5EAE5',
      200: '#C6D1C5',
      300: '#9FB39E',
      400: '#748F73',
      500: '#4A5E48',
      600: '#3E503D',
      700: '#334233',
      800: '#283428',
      900: '#1E261E',
    },
    gold: {
      50: '#FFFBF0',
      100: '#FFF4D6',
      200: '#FFE9A8',
      300: '#FFDD74',
      400: '#FFD23E',
      500: '#FFC800',
      600: '#D4A700',
      700: '#A98500',
      800: '#7E6400',
      900: '#544300',
    },
    gray: {
      50: '#F9F9FA',
      100: '#F0F0F2',
      200: '#E0E0E4',
      300: '#C8C8CE',
      400: '#A0A0A8',
      500: '#78788A',
      600: '#56566A',
      700: '#3A3A4A',
      800: '#25252F',
      900: '#19191F',
    },
    white: '#FFFFFF',
    black: '#000000',
    red: { 500: '#FF3B30' },
    green: { 500: '#34C759' },
    amber: { 500: '#FF9500' },
    cyan: { 500: '#5AC8FA' },
  },
  semantic: {
    primary:      { light: 'var(--raw-forest-500)', dark: 'var(--raw-forest-400)' },
    primaryHover: { light: 'var(--raw-forest-600)', dark: 'var(--raw-forest-300)' },
    error:        { light: 'var(--raw-red-500)',  dark: '#FF6961' },
    success:      { light: 'var(--raw-green-500)', dark: '#4AD96B' },
    warning:      { light: 'var(--raw-amber-500)', dark: '#FFB340' },
    info:         { light: 'var(--raw-cyan-500)',  dark: '#7AD4FC' },
    surface:      { light: 'var(--raw-white)',     dark: 'var(--raw-gray-900)' },
    onSurface:    { light: 'var(--raw-gray-800)',  dark: 'var(--raw-gray-100)' },
  },
  text: {
    primary:   { light: 'rgba(30,30,35, 0.88)',  dark: 'rgba(255,255,255, 0.92)' },
    secondary: { light: 'rgba(30,30,35, 0.52)',  dark: 'rgba(255,255,255, 0.55)' },
    tertiary:  { light: 'rgba(30,30,35, 0.35)',  dark: 'rgba(255,255,255, 0.35)' },
    onPrimary: { light: '#FFFFFF', dark: '#FFFFFF' },
    onError:   { light: '#FFFFFF', dark: '#FFFFFF' },
  },
} as const;

export type ColorScale = typeof colors;
