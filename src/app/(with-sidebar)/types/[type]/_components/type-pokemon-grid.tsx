import {PokemonCard} from "@/shared/components";
import {Skeleton} from "@/shared/components/ui/skeleton";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface TypePokemonGridProps {
  pokemon: Pokemon[];
  isLoading?: boolean;
  searchTerm?: string;
  loadingCount?: number;
}

export function TypePokemonGrid({
                                  pokemon,
                                  isLoading = false,
                                  searchTerm = "",
                                  loadingCount = 25,
                                }: TypePokemonGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 mx-auto lg:grid-cols-3 gap-4 max-w-7xl">
        {Array.from({length: loadingCount}).map((_, i) => (
          <div key={i} className="rounded-xl p-4 border">
            <Skeleton className="w-24 h-24 mx-auto mb-3 rounded-lg"/>
            <Skeleton className="h-5 w-20 mx-auto mb-2"/>
            <Skeleton className="h-4 w-16 mx-auto"/>
          </div>
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No Pokémon Found</h3>
        <p className="text-muted-foreground">
          {searchTerm
            ? `No results for "${searchTerm}". Try a different search term.`
            : "No Pokémon found for this type."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto xl:grid-cols-3 max-w-360 gap-2">
      {pokemon.map((poke) => (
        <PokemonCard
          key={poke.id}
          id={poke.id}
          name={poke.name}
          sprite={poke.sprite}
          types={poke.types}
          variant="grid"
        />
      ))}
    </div>
  );
}

