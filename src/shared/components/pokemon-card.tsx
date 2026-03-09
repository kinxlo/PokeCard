"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TypeBadge } from "./type-badge";
import { formatPokemonName, getPokemonGeneration } from "@/lib/pokemon-utils";

interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  variant?: "compact" | "grid";
  className?: string;
}

/**
 * Pokémon Card Component
 *
 * OpenWatch-inspired compact card with sprite, name, and type badges
 * Two variants:
 * - compact: List-style (similar to OpenWatch feed items)
 * - grid: Grid-style with more visual emphasis
 */
export function PokemonCard({
  id,
  name,
  sprite,
  types,
  variant = "compact",
  className
}: PokemonCardProps) {
  const generation = getPokemonGeneration(id);
  const formattedName = formatPokemonName(name);

  if (variant === "grid") {
    return (
      <Link
        href={`/pokemon/${name}`}
        className={cn(
          "group block bg-card border rounded p-3 hover:shadow-md transition-shadow",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          {/* Sprite */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <Image
              src={sprite}
              alt={formattedName}
              width={80}
              height={80}
              className="object-contain group-hover:scale-110 transition-transform"
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="text-center w-full">
            <div className="text-[11px] text-muted-foreground font-mono">
              #{id.toString().padStart(3, '0')}
            </div>
            <h3 className="text-sm font-semibold text-foreground mt-0.5 truncate">
              {formattedName}
            </h3>
          </div>

          {/* Types */}
          <div className="flex gap-1 flex-wrap justify-center">
            {types.map((type) => (
              <TypeBadge key={type} type={type} size="sm" />
            ))}
          </div>
        </div>
      </Link>
    );
  }

  // Compact variant (OpenWatch feed style)
  return (
    <Link
      href={`/pokemon/${name}`}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 border-b hover:bg-muted/50 transition-colors",
        className
      )}
    >
      {/* Sprite */}
      <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
        <Image
          src={sprite}
          alt={formattedName}
          width={48}
          height={48}
          className="object-contain group-hover:scale-110 transition-transform"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-foreground truncate">
            {formattedName}
          </h3>
          <span className="text-[11px] text-muted-foreground font-mono">
            #{id.toString().padStart(3, '0')}
          </span>
        </div>
        <div className="flex gap-1 mt-1">
          {types.map((type) => (
            <TypeBadge key={type} type={type} size="sm" />
          ))}
        </div>
      </div>

      {/* Generation Badge */}
      <div className="shrink-0">
        <div className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
          GEN {generation}
        </div>
      </div>
    </Link>
  );
}


