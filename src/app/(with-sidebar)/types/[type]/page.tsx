"use client";

import {useState, useMemo} from "react";
import {use} from "react";
import {
  TypePageHeader,
  TypePageSearch,
  TypePokemonGrid,
  TypePagination,
} from "./_components";
import {useGetTypeDetail} from "@/shared/services/app/app.query";
import {
  extractPokemonId,
  filterPokemonByName,
  paginate,
  calculateTotalPages,
} from "@/lib/pokemon-utils";

const ITEMS_PER_PAGE = 25;

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function TypePage({params}: PageProps) {
  const resolvedParams = use(params);
  const typeName = resolvedParams.type;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {data: typeData, isLoading} = useGetTypeDetail(typeName);

  // Process Pokémon data
  const allPokemon = useMemo(() => {
    if (!typeData?.pokemon) return [];

    return typeData.pokemon
      .map(({pokemon}) => {
        const id = extractPokemonId(pokemon.url);
        return {
          id,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
          types: [typeName],
        };
      })
  }, [typeData, typeName]);

  // Filter and paginate
  const filteredPokemon = useMemo(() => {
    return filterPokemonByName(allPokemon, searchTerm);
  }, [allPokemon, searchTerm]);

  const paginatedPokemon = useMemo(() => {
    return paginate(filteredPokemon, currentPage, ITEMS_PER_PAGE);
  }, [filteredPokemon, currentPage]);

  const totalPages = calculateTotalPages(
    filteredPokemon.length,
    ITEMS_PER_PAGE
  );

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Hero Header with Search */}
      <TypePageHeader
        typeName={typeName}
        totalPokemon={allPokemon.length}
        isLoading={isLoading}
      >
        <TypePageSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          resultCount={filteredPokemon.length}
        />
      </TypePageHeader>

      {/* Pokémon Grid */}
      <div className="flex-1 overflow-y-auto bg-background">
        <TypePokemonGrid
          pokemon={paginatedPokemon}
          isLoading={isLoading}
          searchTerm={searchTerm}
        />

        {/* Pagination */}
        <TypePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
