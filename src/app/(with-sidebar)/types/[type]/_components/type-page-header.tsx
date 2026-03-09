import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {formatPokemonName, getTypeArtworkUrl} from "@/lib/pokemon-utils";
import {TYPE_GRADIENT} from "@/lib/constants";
import {ReactNode} from "react";

interface TypePageHeaderProps {
  typeName: string;
  totalPokemon: number;
  isLoading?: boolean;
  children?: ReactNode;
}

export function TypePageHeader({
                                 typeName,
                                 totalPokemon,
                                 isLoading = false,
                                 children,
                               }: TypePageHeaderProps) {
  const gradientClass = TYPE_GRADIENT[typeName] ?? TYPE_GRADIENT.normal;

  return (
    <div className={`relative rounded-lg px-4 lg:-px-0 overflow-hidden bg-linear-to-br ${gradientClass}`}>
      {/* Background Artwork */}
      <img
        src={getTypeArtworkUrl(typeName)}
        alt=""
        className="pointer-events-none absolute -top-10 -right-10 size-80 object-contain opacity-10 dark:mix-blend-screen dark:opacity-20"
        loading="lazy"
        aria-hidden="true"
      />

      <div className="relative z-10 py-8 max-w-360 mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors mb-4 drop-shadow-md"
        >
          <ArrowLeft className="h-4 w-4"/>
          Back to Home
        </Link>

        {/* Type Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg capitalize mb-2">
            {formatPokemonName(typeName)} Type
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md">
            {isLoading ? (
              "Loading Pokémon..."
            ) : (
              `${totalPokemon} Pokémon species`
            )}
          </p>
        </div>

        {/* Search Bar or other children */}
        {children}
      </div>
    </div>
  );
}

