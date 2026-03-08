/**
 * Application Configuration
 *
 * Centralized configuration for environment variables and constants.
 *
 * @see docs/agent-rules/01-AGENT-RULES.md - No exposed secrets
 * @see docs/BRAINSTORM.md - Configuration strategy
 */

const config = {
  /**
   * PokeAPI Base URL
   * Public API - no authentication required
   */
  pokeApiUrl: process.env.NEXT_PUBLIC_POKEAPI_URL,

  /**
   * Pagination settings
   */
  pagination: {
    itemsPerPage: 25,
    maxItems: 1000,
  },

  /**
   * Cache settings (in seconds)
   */
  cache: {
    types: 86400, // 1 day
    pokemon: 604800, // 7 days
    details: 604800, // 7 days
  },
} as const;

export default config;

