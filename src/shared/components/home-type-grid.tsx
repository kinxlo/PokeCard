"use client";

import Link from "next/link";

import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/shared/components/ui/card";
import {Skeleton} from "@/shared/components/ui/skeleton";
import {useGetTypes} from "@/shared/services/app/app.query";
import type {TypeDetailResponse} from "@/shared/services/app/app.types";
import {TYPE_ARTWORK_ID, TYPE_DESCRIPTION, TYPE_GRADIENT} from "@/lib/constants";
import {getTypeArtworkUrl} from "@/lib/pokemon-utils";

const GRID_COLUMNS = 3;
const EXCLUDED_TYPES = ["unknown", "stellar"];


function formatGenerationLabel(generationName?: string) {
  if (!generationName) return "Unknown Gen";
  const suffix = generationName.replace("generation-", "").toUpperCase();
  return `Gen ${suffix}`;
}

function formatMoveClass(moveClass?: string) {
  if (!moveClass) return "Unknown class";
  return moveClass.charAt(0).toUpperCase() + moveClass.slice(1);
}

function isTypeDetail(type: { name: string }): type is TypeDetailResponse {
  return "pokemon" in type;
}

export function HomeTypeGrid() {
  const {data, isLoading} = useGetTypes();
  const availableTypes = data?.results.filter((type) => !EXCLUDED_TYPES.includes(type.name)) ?? [];
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({length: GRID_COLUMNS * 5}).map((_, index) => (
          <Skeleton key={index} className="h-150 w-full rounded-xl"/>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {availableTypes.map((type) => {
        const gradientClass = TYPE_GRADIENT[type.name] ?? TYPE_GRADIENT.normal;
        const description = TYPE_DESCRIPTION[type.name] ?? "Explore this type";
        const detail = isTypeDetail(type) ? type : null;
        const pokemonCount = detail?.pokemon.length ?? 0;
        const moveCount = detail?.moves?.length ?? 0;
        const generationLabel = formatGenerationLabel(detail?.generation?.name);
        const moveClass = formatMoveClass(detail?.move_damage_class?.name);
        const strongAgainst = detail?.damage_relations?.double_damage_to.slice(0, 2).map((item) => item.name) ?? [];
        const weakTo = detail?.damage_relations?.double_damage_from.slice(0, 2).map((item) => item.name) ?? [];
        const immuneTo = detail?.damage_relations?.no_damage_from.slice(0, 1).map((item) => item.name) ?? [];
        const image =
          detail?.sprites?.["generation-viii"]?.["legends-arceus"]?.name_icon ??
          getTypeArtworkUrl(type.name);


        return (
          <Link key={type.name} href={`/types/${type.name}`} className="block">
            <Card
              className="group relative flex min-h-150 flex-col overflow-hidden rounded-lg border-none shadow-sm transition-all hover:shadow-xl">
              <div className={`absolute inset-0 bg-linear-to-br ${gradientClass}`}/>
              <img
                src={getTypeArtworkUrl(type.name)}
                alt=""
                className="pointer-events-none absolute -bottom-40 -right-20 size-156 object-contain opacity-10
                 transition-all duration-500 group-hover:scale-110 group-hover:opacity-15 dark:mix-blend-screen dark:opacity-30 dark:group-hover:opacity-40"
                loading="lazy"
                aria-hidden="true"
              />
              <CardHeader className="relative z-10 space-y-3 pb-4">
                <CardDescription
                  className="text-lg font-semibold text-white drop-shadow-md dark:text-muted-foreground dark:drop-shadow-none">
                  {description}
                </CardDescription>
                <div>
                  <img alt={`img`} src={image}/>
                </div>
              </CardHeader>
              {/*<CardContent className="relative z-10 pt-0">*/}
              {/*  <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold">*/}
              {/*    <div*/}
              {/*      className="rounded-lg  px-3 py-2 text-white  backdrop-blur-sm bg-black/40">Pokemon: {pokemonCount}</div>*/}
              {/*    <div*/}
              {/*      className="rounded-lg   px-3 py-2 text-white  backdrop-blur-sm bg-black/40">Moves: {moveCount}</div>*/}
              {/*    <div*/}
              {/*      className="rounded-lg   px-3 py-2 text-white  backdrop-blur-sm bg-black/40">{generationLabel}</div>*/}
              {/*    <div*/}
              {/*      className="rounded-lg   px-3 py-2 text-white  backdrop-blur-sm bg-black/40">{moveClass}</div>*/}
              {/*  </div>*/}
              {/*</CardContent>*/}
              <CardFooter className="relative z-10 mt-auto items-start justify-start p-6">
                <div className="w-full space-y-2 text-xs text-white/90 drop-shadow-md">
                  {/* Strong Against */}
                  {strongAgainst.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="font-bold uppercase tracking-wide">Strong vs:</span>
                      <span className="capitalize">{strongAgainst.join(", ")}</span>
                    </div>
                  )}

                  {/* Weak To */}
                  {weakTo.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="font-bold uppercase tracking-wide">Weak to:</span>
                      <span className="capitalize">{weakTo.join(", ")}</span>
                    </div>
                  )}

                  {/* Immune To */}
                  {immuneTo.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="font-bold uppercase tracking-wide">Immune to:</span>
                      <span className="capitalize">{immuneTo.join(", ")}</span>
                    </div>
                  )}

                  {/* Fallback if no type relationships */}
                  {strongAgainst.length === 0 && weakTo.length === 0 && immuneTo.length === 0 && (
                    <p className="text-white/70">No type advantages available</p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
