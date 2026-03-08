import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 Configuration
 *
 * Minimal configuration following Tailwind v4 best practices.
 * Theme configuration moved to CSS (@theme directive in globals.css).
 *
 * @see docs/CONFIGURATION-COMPLETE.md
 * @see https://tailwindcss.com/docs/v4-beta
 */
const config: Config = {
  // Required for shadcn/ui dark mode
  darkMode: "class",

  // Simplified content paths
  content: [
    "./src/**/*.{ts,tsx}",
  ],

  // Required for shadcn/ui animations
  plugins: [],
};

export default config;


