"use client";

import {useState, useMemo} from "react";
import {use} from "react";
import Link from "next/link";
import {TypeSidebar, PokemonCard, TypeBadge} from "@/shared/components";
import {useGetTypeDetail} from "@/shared/services/app/app.query";
import {Input} from "@/shared/components/ui/input";
import {Skeleton} from "@/shared/components/ui/skeleton";
import {
  extractPokemonId,
  filterPokemonByName,
  paginate,
  calculateTotalPages,
  formatPokemonName
} from "@/lib/pokemon-utils";
import {Search, ArrowLeft} from "lucide-react";

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

    return typeData.pokemon.map(({pokemon}) => {
      const id = extractPokemonId(pokemon.url);
      return {
        id,
        name: pokemon.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        types: [typeName],
      };
    }).sort((a, b) => a.id - b.id); // Sort by ID
  }, [typeData, typeName]);

  // Filter and paginate
  const filteredPokemon = useMemo(() => {
    return filterPokemonByName(allPokemon, searchTerm);
  }, [allPokemon, searchTerm]);

  const paginatedPokemon = useMemo(() => {
    return paginate(filteredPokemon, currentPage, ITEMS_PER_PAGE);
  }, [filteredPokemon, currentPage]);

  const totalPages = calculateTotalPages(filteredPokemon.length, ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <TypeSidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b bg-card px-4 py-3">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-3">
              <Link
                href="/"
                className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3"/>
                All Pokémon
              </Link>
            </div>

            {/* Type Header */}
            <div className="flex items-center gap-3 mb-3">
              <TypeBadge type={typeName} size="md"/>
              <h1 className="text-lg font-bold capitalize">
                {formatPokemonName(typeName)} Type
              </h1>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input
                type="text"
                placeholder="Search Pokémon by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Showing {filteredPokemon.length} Pokémon
                  {searchTerm && ` matching "${searchTerm}"`}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Pokémon Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({length: 25}).map((_, i) => (
                <div key={i} className="border rounded p-3">
                  <Skeleton className="w-20 h-20 mx-auto mb-2"/>
                  <Skeleton className="h-4 w-16 mx-auto mb-1"/>
                  <Skeleton className="h-3 w-24 mx-auto"/>
                </div>
              ))}
            </div>
          ) : paginatedPokemon.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm
                  ? `No Pokémon found matching "${searchTerm}"`
                  : "No Pokémon found for this type"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {paginatedPokemon.map((poke) => (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


