/**
 * Utility functions for Pokémon data processing
 */
import {TYPE_ARTWORK_ID} from "@/lib/constants";

export function extractPokemonId(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
}

/**
 * Extract type ID from PokeAPI URL
 */
export function extractTypeId(url: string): number {
  const matches = url.match(/\/type\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
}

/**
 * Format Pokémon name for display
 * Example: "pikachu" -> "Pikachu"
 * Example: "mr-mime" -> "Mr. Mime"
 */
export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map(word => {
      // Handle special cases
      if (word.toLowerCase() === 'mr' || word.toLowerCase() === 'mime') {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Format stat name for display
 */
export function formatStatName(stat: string): string {
  const statMap: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed',
  };
  return statMap[stat] || stat;
}

/**
 * Get stat color based on value
 */
export function getStatColor(value: number): string {
  if (value >= 100) return 'bg-green-500';
  if (value >= 70) return 'bg-blue-500';
  if (value >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

/**
 * Calculate total stats
 */
export function calculateTotalStats(stats: Array<{ base_stat: number }>): number {
  return stats.reduce((total, stat) => total + stat.base_stat, 0);
}

/**
 * Determine Pokémon generation from ID
 */
export function getPokemonGeneration(id: number): number {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  return 9;
}

/**
 * Format height (decimetres to feet/inches)
 */
export function formatHeight(decimetres: number): string {
  const inches = decimetres * 3.937;
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  return `${feet}'${remainingInches}" (${(decimetres / 10).toFixed(1)}m)`;
}

/**
 * Format weight (hectograms to pounds/kg)
 */
export function formatWeight(hectograms: number): string {
  const pounds = (hectograms * 0.220462).toFixed(1);
  const kg = (hectograms / 10).toFixed(1);
  return `${pounds} lbs (${kg} kg)`;
}

/**
 * Get sprite URL with fallback
 */
export function getSpriteUrl(sprites: any): string {
  return (
    sprites?.other?.['official-artwork']?.front_default ||
    sprites?.other?.home?.front_default ||
    sprites?.front_default ||
    '/placeholder-pokemon.png'
  );
}

/**
 * Search filter for Pokémon
 */
export function filterPokemonByName<T extends { name: string }>(pokemon: T[], searchTerm: string): T[] {
  if (!searchTerm.trim()) return pokemon;
  const search = searchTerm.toLowerCase().trim();
  return pokemon.filter(p => p.name.toLowerCase().includes(search));
}

/**
 * Paginate array
 */
export function paginate<T>(array: T[], page: number, itemsPerPage: number): T[] {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return array.slice(start, end);
}

/**
 * Calculate total pages
 */
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function getTypeArtworkUrl(type: string) {
  const artworkId = TYPE_ARTWORK_ID[type] ?? 25;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${artworkId}.png`;
}