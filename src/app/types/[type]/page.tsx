"use client";

import {useState, useMemo, useEffect} from "react";
import {use} from "react";
import {TypeSidebar} from "@/shared/components";
import {Button} from "@/shared/components/ui/button";
import {Menu, X} from "lucide-react";
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  useEffect(() => {
    if (!isMobileSidebarOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [isMobileSidebarOpen]);


  return (
    <>
      <div className="flex h-full">
        {/* Sidebar (desktop only) */}
        <div className="hidden md:block">
          <TypeSidebar/>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile drawer trigger */}
          <div className="md:hidden border-b bg-card px-4 py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="gap-2"
            >
              <Menu className="h-4 w-4"/>
              Browse Types
            </Button>
          </div>

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
          <div className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
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
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Type sidebar drawer">
          <button
            type="button"
            aria-label="Close type sidebar"
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative h-full w-72 max-w-[85vw] bg-card shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="text-sm font-semibold">Browse Types</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(false)}
                aria-label="Close drawer"
              >
                <X className="h-4 w-4"/>
              </Button>
            </div>
            <TypeSidebar
              className="w-full border-r-0"
              onNavigate={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
