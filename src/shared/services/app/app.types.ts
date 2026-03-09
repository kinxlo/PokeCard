// Basic API response types
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// Type/Category responses
export interface PokemonType {
  name: string;
  url: string;
}

export interface TypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[] | TypeDetailResponse[];
}

export interface TypePokemon {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface TypeDetailResponse {
  id: number;
  name: string;
  names: Array<{ language: { name: string; url: string }; name: string }>;
  pokemon: TypePokemon[];
  url: string;
  moves?: Array<{
    name: string;
    url: string;
  }>;
  generation?: {
    name: string;
    url: string;
  };
  damage_relations?: {
    double_damage_from: Array<{ name: string; url: string }>;
    double_damage_to: Array<{ name: string; url: string }>;
    half_damage_from: Array<{ name: string; url: string }>;
    half_damage_to: Array<{ name: string; url: string }>;
    no_damage_from: Array<{ name: string; url: string }>;
    no_damage_to: Array<{ name: string; url: string }>;
  };
  move_damage_class: {
    name: string;
    url: string;
  };
  sprites?: {
    [generationName: string]: {
      [gameName: string]: {
        name_icon: string | null;
      };
    };
  };
}

// Pokémon detail responses
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    home?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  species: {
    name: string;
    url: string;
  };
}

// Helper type for processed Pokémon data
export interface ProcessedPokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  generation?: number;
}
