"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TypeBadge } from "./type-badge";
import { layout } from "@/lib/design-system";
import { useGetTypes } from "@/shared/services/app/app.query";
import { Skeleton } from "./ui/skeleton";

/**
 * Type Sidebar Component
 *
 * OpenWatch-inspired compact sidebar with type filters
 * Similar to the TYPES sidebar in OpenWatch
 */
export function TypeSidebar() {
  const pathname = usePathname();
  const { data: typesData, isLoading } = useGetTypes();

  if (isLoading) {
    return (
      <aside className={cn(
        "border-r bg-card h-full overflow-y-auto",
        layout.sidebar.width
      )}>
        <div className="p-4">
          <div className="mb-4">
            <Skeleton className="h-4 w-20 mb-2" />
          </div>
          {Array.from({ length: 18 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full mb-2" />
          ))}
        </div>
      </aside>
    );
  }

  // Filter out special types (unknown, shadow) - only show main 18 types
  const mainTypes = typesData?.results.filter(type => {
    const specialTypes = ['unknown', 'shadow'];
    return !specialTypes.includes(type.name);
  }).slice(0, 18) || [];

  return (
    <aside className={cn(
      "border-r bg-card h-full overflow-y-auto",
      layout.sidebar.width
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Types
          </h2>
        </div>

        {/* Type List */}
        <nav className="space-y-1">
          {mainTypes.map((type) => {
            const isActive = pathname === `/types/${type.name}`;

            return (
              <Link
                key={type.name}
                href={`/types/${type.name}`}
                className={cn(
                  "flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <TypeBadge type={type.name} variant="dot" size="sm" />
              </Link>
            );
          })}
        </nav>

        {/* All Pokémon Link */}
        <div className="mt-4 pt-4 border-t">
          <Link
            href="/"
            className={cn(
              "flex items-center px-2 py-1.5 rounded text-sm transition-colors",
              pathname === "/"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-muted text-foreground"
            )}
          >
            <span className="text-[11px] font-medium">View All Pokémon</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

