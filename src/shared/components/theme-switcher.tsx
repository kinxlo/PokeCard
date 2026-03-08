"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { CustomButton } from "@/shared/components/button";


export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <CustomButton
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={ () => setTheme( resolvedTheme === "dark" ? "light" : "dark" ) }
      title={ `Switch to ${ resolvedTheme === "dark" ? "light" : "dark" } mode` }
      className="relative"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    </CustomButton>
  );
}
