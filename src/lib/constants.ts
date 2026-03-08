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
export const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400 text-white',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-gray-900',
  grass: 'bg-green-500 text-white',
  ice: 'bg-blue-200 text-gray-900',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-yellow-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-white',
  rock: 'bg-yellow-800 text-white',
  ghost: 'bg-purple-700 text-white',
  dragon: 'bg-indigo-700 text-white',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-gray-500 text-white',
  fairy: 'bg-pink-300 text-gray-900',
} as const;


/**
 * Pagination constants
 */
export const PAGINATION = {
  ITEMS_PER_PAGE: 25,
  MAX_ITEMS: 1000,
} as const;



