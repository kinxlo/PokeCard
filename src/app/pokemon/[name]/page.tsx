"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { TypeSidebar, TypeBadge } from "@/shared/components";
import { useGetPokemonDetail } from "@/shared/services/app/app.query";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  formatPokemonName,
  formatStatName,
  getStatColor,
  calculateTotalStats,
  getPokemonGeneration,
  formatHeight,
  formatWeight,
  getSpriteUrl
} from "@/lib/pokemon-utils";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default function PokemonDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pokemonName = resolvedParams.name;

  const { data: pokemon, isLoading } = useGetPokemonDetail(pokemonName);

  if (isLoading) {
    return (
      <div className="flex h-full">
        <TypeSidebar />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-64 mb-6" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex h-full">
        <TypeSidebar />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Pokémon not found</p>
            <Link href="/" className="text-primary hover:underline mt-4 inline-block">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const generation = getPokemonGeneration(pokemon.id);
  const totalStats = calculateTotalStats(pokemon.stats);
  const mainSprite = getSpriteUrl(pokemon.sprites);

  return (
    <div className="flex h-full">
      <TypeSidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to All Pokémon
          </Link>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{formatPokemonName(pokemon.name)}</h1>
              <span className="text-xl text-muted-foreground font-mono">
                #{pokemon.id.toString().padStart(3, '0')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {pokemon.types.map(({ type }) => (
                <TypeBadge key={type.name} type={type.name} />
              ))}
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                Generation {generation}
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-4">
              {/* Sprite */}
              <div className="bg-card border rounded-lg p-6 flex items-center justify-center">
                <Image
                  src={mainSprite}
                  alt={formatPokemonName(pokemon.name)}
                  width={300}
                  height={300}
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>

              {/* Physical Characteristics */}
              <div className="bg-card border rounded-lg p-4">
                <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
                  Physical
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-1">Height</div>
                    <div className="text-sm font-medium">{formatHeight(pokemon.height)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-1">Weight</div>
                    <div className="text-sm font-medium">{formatWeight(pokemon.weight)}</div>
                  </div>
                </div>
              </div>

              {/* Abilities */}
              <div className="bg-card border rounded-lg p-4">
                <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
                  Abilities
                </h2>
                <div className="space-y-2">
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <div key={ability.name} className="flex items-center gap-2">
                      <span className="text-sm capitalize">{ability.name.replace('-', ' ')}</span>
                      {is_hidden && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500 text-white">
                          HIDDEN
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-4">
              {/* Stats */}
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Base Stats
                  </h2>
                  <span className="text-[11px] text-muted-foreground">
                    Total: <span className="font-semibold text-foreground">{totalStats}</span>
                  </span>
                </div>
                <div className="space-y-3">
                  {pokemon.stats.map(({ stat, base_stat }) => (
                    <div key={stat.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{formatStatName(stat.name)}</span>
                        <span className="text-xs font-semibold">{base_stat}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStatColor(base_stat)} transition-all`}
                          style={{ width: `${Math.min((base_stat / 255) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Moves Preview */}
              <div className="bg-card border rounded-lg p-4">
                <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
                  Moves ({pokemon.moves.length})
                </h2>
                <div className="max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {pokemon.moves.slice(0, 20).map(({ move }) => (
                      <div
                        key={move.name}
                        className="text-xs px-2 py-1 bg-muted rounded capitalize"
                      >
                        {move.name.replace('-', ' ')}
                      </div>
                    ))}
                  </div>
                  {pokemon.moves.length > 20 && (
                    <div className="text-[11px] text-muted-foreground mt-2 text-center">
                      + {pokemon.moves.length - 20} more moves
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

