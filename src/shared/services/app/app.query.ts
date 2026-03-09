import {useQuery} from "@tanstack/react-query";

import {appService} from "./app.service";
import {QUERY_KEYS} from "@/lib/react-query/query-keys";
import type {
  PokemonListResponse,
  TypeListResponse,
  TypeDetailResponse,
  PokemonDetailResponse
} from "./app.types";

/**
 * Get paginated list of all Pokémon
 */
function useGetPokemon(limit = 1000, offset = 0) {
  return useQuery<PokemonListResponse, Error>({
    queryKey: [...QUERY_KEYS.POKEMON, limit, offset],
    queryFn: () => appService.getPokemon(limit, offset),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

/**
 * Get list of all Pokémon types
 */
function useGetTypes() {
  return useQuery<TypeListResponse, Error>({
    queryKey: QUERY_KEYS.TYPES,
    queryFn: () => appService.getTypes(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

/**
 * Get detailed information about a specific type
 */
function useGetTypeDetail(typeNameOrId: string | number) {
  return useQuery<TypeDetailResponse, Error>({
    queryKey: [...QUERY_KEYS.TYPE_DETAIL, typeNameOrId],
    queryFn: () => appService.getTypeDetail(typeNameOrId),
    enabled: !!typeNameOrId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

/**
 * Get detailed information about a specific Pokémon
 */
function useGetPokemonDetail(nameOrId: string | number) {
  return useQuery<PokemonDetailResponse, Error>({
    queryKey: [...QUERY_KEYS.POKEMON_DETAIL, nameOrId],
    queryFn: () => appService.getPokemonDetail(nameOrId),
    enabled: !!nameOrId,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

export {useGetPokemon, useGetTypes, useGetTypeDetail, useGetPokemonDetail};

