import Link from "next/link";
import {ThemeSwitcher} from "@/shared/components";
import {cn} from "@/lib/utils";
import {layout} from "@/lib/design-system";

/**
 * App Header Component
 *
 * OpenWatch-inspired compact header with logo, stats, and controls
 */
export function AppHeader() {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-card shadow-sm rounded-lg",
      layout.header.height
    )}>
      <div className="flex h-full items-center justify-between px-4">
        {/* Logo and Title */}
        <Link href="/" className="flex items-end gap-3 hover:opacity-80 transition-opacity">
          <div className="text-2xl font-bold">
            <span className="text-red-500">POKÉ</span>
            <span className="text-foreground text-lg">CARD</span>
          </div>
          <div className="hidden sm:block mb-1 text-[11px] text-muted-foreground uppercase tracking-wider">
            Explorer
          </div>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher/>
        </div>
      </div>
    </header>
  );
}

