import { useQuery } from "@tanstack/react-query";

import { sheetService } from "./app.service";
import { QUERY_KEYS } from "@/lib/react-query/query-keys";
import type { PokemonListResponse } from "./app.types";

function useGetPokemon() {
  return useQuery<PokemonListResponse, Error>( {
    queryKey: QUERY_KEYS.POKEMON,
    queryFn: () => sheetService.getPokemon(),
  } );
}

export { useGetPokemon }