/**
 * Query keys for TanStack Query
 */
export const QUERY_KEYS = {
  POKEMON: ['pokemon'] as const,
  TYPES: ['types'] as const,
  TYPE_DETAIL: ( id: string | number ) => ['type', id] as const,
  POKEMON_BY_TYPE: ( typeId: string | number, page: number, search: string ) =>
    ['pokemon', 'type', typeId, page, search] as const,
  POKEMON_DETAIL: ( id: string | number ) => ['pokemon', id] as const,

} as const;