"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {TypeBadge} from "./type-badge";
import {layout} from "@/lib/design-system";
import {useGetTypes} from "@/shared/services/app/app.query";
import {Skeleton} from "./ui/skeleton";

const EXCLUDED_TYPES = ["unknown", "stellar"];

interface TypeSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

/**
 * Type Sidebar Component
 *
 * Clean sidebar with type filters matching homepage design
 */
export function TypeSidebar({className, onNavigate}: TypeSidebarProps) {
  const pathname = usePathname();
  const {data: typesData, isLoading} = useGetTypes();

  if (isLoading) {
    return (
      <aside className={cn(
        " bg-card h-full overflow-y-auto rounded-lg",
        layout.sidebar.width,
        className
      )}>
        <div className="p-5">
          <div className="mb-6">
            <Skeleton className="h-5 w-24 mb-2"/>
          </div>
          {Array.from({length: 18}).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full mb-2 rounded-lg"/>
          ))}
        </div>
      </aside>
    );
  }

  // Filter out special types
  const mainTypes = typesData?.results.filter(type =>
    !EXCLUDED_TYPES.includes(type.name)
  ) || [];

  return (
    <aside className={cn(
      " bg-card h-full overflow-y-auto hide-scrollbar rounded-lg",
      layout.sidebar.width,
      className
    )}>
      <div className="p-5">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
            Pokémon Types
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Filter by type
          </p>
        </div>

        {/* Type List */}
        <nav className="space-y-1.5">
          {mainTypes.map((type) => {
            const isActive = pathname === `/types/${type.name}`;

            return (
              <Link
                key={type.name}
                href={`/types/${type.name}`}
                onClick={onNavigate}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <TypeBadge type={type.name} variant="dot" size="md"/>
              </Link>
            );
          })}
        </nav>

        {/* All Pokémon Link */}
        <div className="mt-6 pt-6 border-t">
          <Link
            href="/"
            onClick={onNavigate}
            className={cn(
              "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              pathname === "/"
                ? "bg-primary/10 text-primary shadow-sm"
                : "hover:bg-muted text-foreground"
            )}
          >
            <span className="text-sm font-semibold">← All Types</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
