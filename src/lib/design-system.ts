/**
 * Design System
 *
 * Inspired by OpenWatch.ng's compact, data-focused aesthetic
 * - Tight typography (11-13px)
 * - Color-coded categories
 * - Minimal spacing and borders
 * - Status badges
 * - Information-dense layout
 */

/**
 * Typography Scale (OpenWatch-inspired compact sizing)
 */
export const typography = {
  xs: 'text-[11px] leading-tight',      // 11px - timestamps, metadata
  sm: 'text-xs leading-snug',            // 12px - body text, labels
  base: 'text-[13px] leading-snug',      // 13px - primary content
  md: 'text-sm leading-normal',          // 14px - headings
  lg: 'text-base leading-normal',        // 16px - page titles
  xl: 'text-lg leading-tight',           // 18px - hero sections
} as const;

/**
 * Spacing Scale (Tight, OpenWatch-style)
 */
export const spacing = {
  none: 'gap-0',
  xs: 'gap-1',      // 4px
  sm: 'gap-2',      // 8px
  base: 'gap-3',    // 12px
  md: 'gap-4',      // 16px
  lg: 'gap-6',      // 24px
} as const;

/**
 * Border Radius (Minimal, flat design)
 */
export const radius = {
  none: 'rounded-none',
  sm: 'rounded-sm',     // 2px
  base: 'rounded',      // 4px
  md: 'rounded-md',     // 6px
  lg: 'rounded-lg',     // 8px
  full: 'rounded-full',
} as const;

/**
 * Pokémon Type Colors (OpenWatch color-coding style)
 * Muted, professional tones similar to incident categories
 */
export const typeColors: Record<string, {
  bg: string;
  text: string;
  dot: string;
  hover: string;
  border: string;
}> = {
  normal: {
    bg: 'bg-gray-400',
    text: 'text-white',
    dot: 'bg-gray-400',
    hover: 'hover:bg-gray-500',
    border: 'border-gray-400',
  },
  fire: {
    bg: 'bg-red-500',
    text: 'text-white',
    dot: 'bg-red-500',
    hover: 'hover:bg-red-600',
    border: 'border-red-500',
  },
  water: {
    bg: 'bg-blue-500',
    text: 'text-white',
    dot: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    border: 'border-blue-500',
  },
  electric: {
    bg: 'bg-yellow-400',
    text: 'text-gray-900',
    dot: 'bg-yellow-400',
    hover: 'hover:bg-yellow-500',
    border: 'border-yellow-400',
  },
  grass: {
    bg: 'bg-green-500',
    text: 'text-white',
    dot: 'bg-green-500',
    hover: 'hover:bg-green-600',
    border: 'border-green-500',
  },
  ice: {
    bg: 'bg-cyan-400',
    text: 'text-gray-900',
    dot: 'bg-cyan-400',
    hover: 'hover:bg-cyan-500',
    border: 'border-cyan-400',
  },
  fighting: {
    bg: 'bg-orange-600',
    text: 'text-white',
    dot: 'bg-orange-600',
    hover: 'hover:bg-orange-700',
    border: 'border-orange-600',
  },
  poison: {
    bg: 'bg-purple-500',
    text: 'text-white',
    dot: 'bg-purple-500',
    hover: 'hover:bg-purple-600',
    border: 'border-purple-500',
  },
  ground: {
    bg: 'bg-yellow-600',
    text: 'text-white',
    dot: 'bg-yellow-600',
    hover: 'hover:bg-yellow-700',
    border: 'border-yellow-600',
  },
  flying: {
    bg: 'bg-indigo-400',
    text: 'text-white',
    dot: 'bg-indigo-400',
    hover: 'hover:bg-indigo-500',
    border: 'border-indigo-400',
  },
  psychic: {
    bg: 'bg-pink-500',
    text: 'text-white',
    dot: 'bg-pink-500',
    hover: 'hover:bg-pink-600',
    border: 'border-pink-500',
  },
  bug: {
    bg: 'bg-lime-500',
    text: 'text-gray-900',
    dot: 'bg-lime-500',
    hover: 'hover:bg-lime-600',
    border: 'border-lime-500',
  },
  rock: {
    bg: 'bg-amber-700',
    text: 'text-white',
    dot: 'bg-amber-700',
    hover: 'hover:bg-amber-800',
    border: 'border-amber-700',
  },
  ghost: {
    bg: 'bg-purple-700',
    text: 'text-white',
    dot: 'bg-purple-700',
    hover: 'hover:bg-purple-800',
    border: 'border-purple-700',
  },
  dragon: {
    bg: 'bg-indigo-700',
    text: 'text-white',
    dot: 'bg-indigo-700',
    hover: 'hover:bg-indigo-800',
    border: 'border-indigo-700',
  },
  dark: {
    bg: 'bg-gray-800',
    text: 'text-white',
    dot: 'bg-gray-800',
    hover: 'hover:bg-gray-900',
    border: 'border-gray-800',
  },
  steel: {
    bg: 'bg-slate-500',
    text: 'text-white',
    dot: 'bg-slate-500',
    hover: 'hover:bg-slate-600',
    border: 'border-slate-500',
  },
  fairy: {
    bg: 'bg-pink-300',
    text: 'text-gray-900',
    dot: 'bg-pink-300',
    hover: 'hover:bg-pink-400',
    border: 'border-pink-300',
  },
};

/**
 * Status Badge Variants (BREAKING, CONFIRMED, LIKELY style)
 * Adapted for Pokémon context: Generation, Rarity, Stats
 */
export const statusStyles = {
  generation: {
    'gen-1': 'bg-red-500 text-white',
    'gen-2': 'bg-yellow-500 text-gray-900',
    'gen-3': 'bg-green-500 text-white',
    'gen-4': 'bg-blue-500 text-white',
    'gen-5': 'bg-purple-500 text-white',
    'gen-6': 'bg-pink-500 text-white',
    'gen-7': 'bg-orange-500 text-white',
    'gen-8': 'bg-teal-500 text-white',
    'gen-9': 'bg-indigo-500 text-white',
  },
  rarity: {
    common: 'bg-gray-400 text-white',
    uncommon: 'bg-green-500 text-white',
    rare: 'bg-blue-500 text-white',
    legendary: 'bg-yellow-500 text-gray-900',
    mythical: 'bg-purple-600 text-white',
  },
  stats: {
    high: 'bg-green-600 text-white',
    medium: 'bg-yellow-600 text-white',
    low: 'bg-red-600 text-white',
  },
} as const;

/**
 * Component Styles
 */
export const componentStyles = {
  // Compact card (OpenWatch list item style)
  card: {
    base: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 hover:shadow-sm transition-shadow',
    compact: 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
  },
  // Small badge with dot indicator
  badge: {
    base: 'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium',
    dot: 'w-1.5 h-1.5 rounded-full',
  },
  // Compact button (OpenWatch style)
  button: {
    base: 'inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded transition-colors',
    small: 'px-2 py-1 text-[11px]',
  },
} as const;

/**
 * Layout Constants
 */
export const layout = {
  sidebar: {
    width: 'w-56',      // 224px - compact sidebar
    widthPx: 224,
  },
  header: {
    height: 'h-14',     // 56px - compact header
    heightPx: 56,
  },
  content: {
    maxWidth: 'max-w-7xl',
  },
} as const;



