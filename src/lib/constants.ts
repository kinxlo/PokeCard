/**
 * Application Constants
 *
 * Centralized constants for the application.
 *
 * @see docs/BRAINSTORM.md - Data model specification
 */

/**
 * Pokémon Type Colors
 * Used for type badges and UI theming
 */
// Representative Pokémon artwork IDs per type for card background visuals.
const TYPE_ARTWORK_ID: Record<string, number> = {
  normal: 133,
  fire: 6,
  water: 9,
  electric: 25,
  grass: 3,
  ice: 131,
  fighting: 68,
  poison: 34,
  ground: 51,
  flying: 18,
  psychic: 65,
  bug: 123,
  rock: 95,
  ghost: 94,
  dragon: 149,
  dark: 197,
  steel: 208,
  fairy: 36,
};

const TYPE_GRADIENT: Record<string, string> = {
  normal: "from-zinc-50/95 via-zinc-100/80 to-zinc-200/60 dark:from-zinc-800/90 dark:via-zinc-700/70 dark:to-zinc-600/40",
  fire: "from-red-50/95 via-orange-100/80 to-orange-200/60 dark:from-red-900/90 dark:via-orange-800/70 dark:to-orange-700/40",
  water: "from-blue-50/95 via-cyan-100/80 to-cyan-200/60 dark:from-blue-900/90 dark:via-cyan-800/70 dark:to-cyan-700/40",
  electric: "from-yellow-50/95 via-amber-100/85 to-amber-200/60 dark:from-yellow-900/90 dark:via-amber-800/70 dark:to-amber-700/40",
  grass: "from-green-50/95 via-emerald-100/80 to-emerald-200/60 dark:from-green-900/90 dark:via-emerald-800/70 dark:to-emerald-700/40",
  ice: "from-cyan-50/95 via-sky-50/85 to-sky-100/60 dark:from-cyan-900/90 dark:via-sky-800/70 dark:to-sky-700/40",
  fighting: "from-orange-50/95 via-red-100/80 to-red-200/60 dark:from-orange-900/90 dark:via-red-800/70 dark:to-red-700/40",
  poison: "from-purple-50/95 via-fuchsia-100/80 to-fuchsia-200/60 dark:from-purple-900/90 dark:via-fuchsia-800/70 dark:to-fuchsia-700/40",
  ground: "from-amber-50/95 via-yellow-100/80 to-yellow-200/60 dark:from-amber-900/90 dark:via-yellow-800/70 dark:to-yellow-700/40",
  flying: "from-indigo-50/95 via-sky-100/80 to-sky-200/60 dark:from-indigo-900/90 dark:via-sky-800/70 dark:to-sky-700/40",
  psychic: "from-pink-50/95 via-rose-100/80 to-rose-200/60 dark:from-pink-900/90 dark:via-rose-800/70 dark:to-rose-700/40",
  bug: "from-lime-50/95 via-green-100/80 to-green-200/60 dark:from-lime-900/90 dark:via-green-800/70 dark:to-green-700/40",
  rock: "from-stone-50/95 via-amber-100/80 to-amber-200/60 dark:from-stone-900/90 dark:via-amber-800/70 dark:to-amber-700/40",
  ghost: "from-violet-50/95 via-purple-100/80 to-purple-200/60 dark:from-violet-900/90 dark:via-purple-800/70 dark:to-purple-700/40",
  dragon: "from-indigo-50/95 via-violet-100/80 to-violet-200/60 dark:from-indigo-900/90 dark:via-violet-800/70 dark:to-violet-700/40",
  dark: "from-slate-100/95 via-zinc-200/80 to-zinc-300/60 dark:from-slate-900/90 dark:via-zinc-800/70 dark:to-zinc-700/40",
  steel: "from-slate-50/95 via-gray-100/80 to-gray-200/60 dark:from-slate-900/90 dark:via-gray-800/70 dark:to-gray-700/40",
  fairy: "from-pink-50/95 via-fuchsia-50/85 to-fuchsia-100/60 dark:from-pink-900/90 dark:via-fuchsia-800/70 dark:to-fuchsia-700/40",
};

const TYPE_DESCRIPTION: Record<string, string> = {
  normal: "Versatile and balanced",
  fire: "Fierce and powerful",
  water: "Fluid and adaptable",
  electric: "Fast and shocking",
  grass: "Growing and healing",
  ice: "Cool and crystalline",
  fighting: "Strong and disciplined",
  poison: "Toxic and corrosive",
  ground: "Solid and grounded",
  flying: "Swift and aerial",
  psychic: "Mystical and mind-bending",
  bug: "Agile and numerous",
  rock: "Sturdy and defensive",
  ghost: "Ethereal and mysterious",
  dragon: "Legendary and mighty",
  dark: "Cunning and deceptive",
  steel: "Durable and metallic",
  fairy: "Magical and enchanting",
};


/**
 * Pagination constants
 */
 const PAGINATION = {
  ITEMS_PER_PAGE: 25,
  MAX_ITEMS: 1000,
} as const;


export {TYPE_GRADIENT, TYPE_DESCRIPTION, TYPE_ARTWORK_ID, PAGINATION}
