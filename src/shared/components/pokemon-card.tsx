"use client";

import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {formatPokemonName} from "@/lib/pokemon-utils";
import {TYPE_GRADIENT} from "@/lib/constants";

interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  variant?: "compact" | "grid";
  className?: string;
}

export function PokemonCard({
  id,
  name,
  sprite,
  types,
  variant = "compact",
  className
}: PokemonCardProps) {
  const formattedName = formatPokemonName(name);

  if (variant === "grid") {
    const gradientClass = TYPE_GRADIENT[types[0]?.toLowerCase() ?? "normal"] ?? TYPE_GRADIENT.normal;

    return (
      <Link
        href={`/pokemon/${name}`}
        className={cn(
          "group relative block min-h-66 overflow-hidden rounded-lg p-4 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
          className
        )}
      >
        <div className={cn("absolute inset-0 bg-linear-to-br", gradientClass)} aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.16),transparent_45%)]" aria-hidden="true" />
        <span className="pointer-events-none absolute right-4 top-3 text-3xl font-bold text-white/35" aria-hidden="true">
          #{id.toString().padStart(3, "0")}
        </span>

        <div className="relative z-10 flex h-full items-end justify-between gap-2">
          <h3 className="max-w-[55%] text-2xl font-extrabold leading-tight drop-shadow-sm">
            {formattedName}
          </h3>
          <Image
            src={sprite}
            alt={formattedName}
            width={112}
            height={112}
            className="h-28 w-28 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/pokemon/${name}`}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50",
        className
      )}
    >
      <Image
        src={sprite}
        alt={formattedName}
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 object-contain transition-transform group-hover:scale-105"
        unoptimized
      />

      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {formattedName}
        </h3>
        <span className="text-xs font-mono text-muted-foreground">
          #{id.toString().padStart(3, "0")}
        </span>
      </div>
    </Link>
  );
}
