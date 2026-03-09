"use client";

import {use} from "react";
import Link from "next/link";
import Image from "next/image";
import {useGetPokemonDetail} from "@/shared/services/app/app.query";
import {Skeleton} from "@/shared/components/ui/skeleton";
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
import {TYPE_GRADIENT} from "@/lib/constants";
import {ArrowLeft, Heart, Share2, Ruler, Weight, Zap} from "lucide-react";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default function PokemonDetailPage({params}: PageProps) {
  const resolvedParams = use(params);
  const pokemonName = resolvedParams.name;

  const {data: pokemon, isLoading} = useGetPokemonDetail(pokemonName);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="h-72 bg-linear-to-br from-primary/20 to-primary/5 animate-pulse"/>
        <div className="max-w-6xl mx-auto px-6 -mt-32">
          <Skeleton className="h-64 w-64 rounded-3xl mx-auto mb-8"/>
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-64"/>
            <Skeleton className="h-64"/>
            <Skeleton className="h-64"/>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Pokémon not found</h2>
          <p className="text-muted-foreground mb-8">This Pokémon doesn't exist in our database.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4"/>
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const generation = getPokemonGeneration(pokemon.id);
  const totalStats = calculateTotalStats(pokemon.stats);
  const mainSprite = getSpriteUrl(pokemon.sprites);
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const gradientClass = TYPE_GRADIENT[primaryType] || TYPE_GRADIENT.normal;

  // Get the official artwork (higher quality)
  const officialArtwork = pokemon.sprites.other?.["official-artwork"]?.front_default || mainSprite;

  return (
    <div className="flex-1 overflow-y-auto relative">
      {/* Background Sprite - Bottom Right */}
      <div className="fixed -bottom-50 right-0 pointer-events-none z-0 opacity-5 dark:opacity-10">
        <Image
          src={mainSprite}
          alt=""
          width={800}
          height={800}
          className="object-contain mix-blend-multiply dark:mix-blend-screen"
          unoptimized
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4"/>
          Back to All Pokémon
        </Link>

            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-5xl font-black">{formatPokemonName(pokemon.name)}</h1>
                <span className="text-3xl text-muted-foreground font-mono font-bold">
                  #{pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {pokemon.types.map(({type}) => (
                  <span
                    key={type.name}
                    className="px-4 py-2 rounded-full bg-primary/90 text-primary-foreground font-semibold text-sm uppercase tracking-wide shadow-md"
                  >
                    {type.name}
                  </span>
                ))}
                <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  Generation {generation}
                </span>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Image and Basic Info */}
              <div className="space-y-6">
                {/* Giant Pokemon Image Card */}
                <div className={`relative bg-linear-to-br ${gradientClass} rounded-3xl overflow-hidden shadow-2xl group`}>
                  {/* Decorative Background Patterns */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_50%)]"/>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.1),transparent_50%)]"/>

                  {/* Pokemon Number Watermark */}
                  <span className="absolute top-8 right-8 text-9xl font-black text-white/10 pointer-events-none" aria-hidden="true">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </span>

                  {/* Main Pokemon Image - HUGE */}
                  <div className="relative flex items-center justify-center p-12 min-h-150">
                    {/* Glow effect behind pokemon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-96 h-96 bg-white/25 rounded-full blur-3xl"/>
                    </div>

                    <Image
                      src={officialArtwork}
                      alt={formatPokemonName(pokemon.name)}
                      width={500}
                      height={500}
                      className="relative z-10 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 w-full max-w-125"
                      unoptimized
                      priority
                    />
                  </div>

                  {/* Action Buttons at bottom */}
                  <div className="absolute bottom-6 right-6 flex gap-3 z-20">
                    <button className="p-3 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md shadow-lg transition-all hover:scale-110">
                      <Heart className="h-6 w-6 text-white"/>
                    </button>
                    <button className="p-3 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md shadow-lg transition-all hover:scale-110">
                      <Share2 className="h-6 w-6 text-white"/>
                    </button>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card/80 backdrop-blur-md border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="h-5 w-5 text-primary"/>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-bold">Height</span>
                    </div>
                    <div className="text-2xl font-black text-foreground">{(pokemon.height / 10).toFixed(1)}m</div>
                    <div className="text-xs text-muted-foreground mt-1">{formatHeight(pokemon.height).split('(')[0]}</div>
                  </div>
                  <div className="bg-card/80 backdrop-blur-md border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Weight className="h-5 w-5 text-primary"/>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-bold">Weight</span>
                    </div>
                    <div className="text-2xl font-black text-foreground">{(pokemon.weight / 10).toFixed(1)}kg</div>
                    <div className="text-xs text-muted-foreground mt-1">{formatWeight(pokemon.weight).split('(')[0]}</div>
                  </div>
                  <div className="bg-card/80 backdrop-blur-md border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-primary"/>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-bold">Power</span>
                    </div>
                    <div className="text-2xl font-black text-foreground">{totalStats}</div>
                    <div className="text-xs text-muted-foreground mt-1">Base Total</div>
                  </div>
                </div>

                {/* Abilities */}
                <div className="bg-card/80 backdrop-blur-md border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-7 bg-primary rounded-full"/>
                    Abilities
                  </h2>
                  <div className="space-y-3">
                    {pokemon.abilities.map(({ability, is_hidden}) => (
                      <div
                        key={ability.name}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all hover:translate-x-1"
                      >
                        <span className="text-base font-semibold capitalize">
                          {ability.name.replace('-', ' ')}
                        </span>
                        {is_hidden && (
                          <span className="text-[11px] px-3 py-1.5 rounded-lg bg-purple-500 text-white font-bold uppercase tracking-wider shadow-sm">
                            Hidden
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats and Moves */}
              <div className="space-y-6">
                {/* Base Stats */}
                <div className="bg-card/80 backdrop-blur-md border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black flex items-center gap-2">
                      <div className="w-1.5 h-7 bg-primary rounded-full"/>
                      Base Stats
                    </h2>
                    <div className="text-sm font-semibold text-muted-foreground">
                      Total: <span className="text-3xl font-black text-foreground ml-2">{totalStats}</span>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {pokemon.stats.map(({stat, base_stat}) => (
                      <div key={stat.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold min-w-28 uppercase tracking-wide">{formatStatName(stat.name)}</span>
                          <div className="flex-1 mx-4">
                            <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                              <div
                                className={`h-full ${getStatColor(base_stat)} transition-all duration-700 shadow-sm`}
                                style={{width: `${Math.min((base_stat / 255) * 100, 100)}%`}}
                              />
                            </div>
                          </div>
                          <span className="text-xl font-black min-w-14 text-right">{base_stat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moves */}
                <div className="bg-card/80 backdrop-blur-md border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-7 bg-primary rounded-full"/>
                    Moves
                    <span className="text-sm font-medium text-muted-foreground">({pokemon.moves.length} total)</span>
                  </h2>
                  <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-2">
                      {pokemon.moves.slice(0, 40).map(({move}) => (
                        <div
                          key={move.name}
                          className="text-sm px-4 py-2.5 bg-muted/70 hover:bg-muted rounded-xl capitalize font-medium transition-all hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
                        >
                          {move.name.replace('-', ' ')}
                        </div>
                      ))}
                    </div>
                    {pokemon.moves.length > 40 && (
                      <div className="text-sm text-muted-foreground mt-4 text-center py-3 bg-muted/30 rounded-xl font-semibold">
                        + {pokemon.moves.length - 40} more moves available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

