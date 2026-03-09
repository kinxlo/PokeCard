"use client";

import {ReactNode, useState, useEffect} from "react";
import {TypeSidebar} from "@/shared/components/type-sidebar";
import {Button} from "@/shared/components/ui/button";
import {Menu, X} from "lucide-react";

export default function SidebarLayout({children}: {children: ReactNode}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
      <div className="flex h-full space-x-2">
        {/* Sidebar (desktop only) */}
        <div className="hidden md:block">
          <TypeSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden rounded-lg">
          {/* Mobile drawer trigger */}
          <div className="md:hidden bg-card px-4 py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="gap-2"
            >
              <Menu className="h-4 w-4" />
              Browse Types
            </Button>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Type sidebar drawer"
        >
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
                <X className="h-4 w-4" />
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

