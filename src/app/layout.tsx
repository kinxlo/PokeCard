import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";

import { QueryProvider } from "@/lib/react-query/query-provider";
import { ThemeProvider } from "@/lib/theme/theme-provider";

import "./globals.css";

const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: ["latin"],
} );

const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: ["latin"],
} );

export const metadata: Metadata = {
  title: "Pokémon Explorer | Browse Pokémon by Type",
  description:
    "Explore Pokémon by type, search by name, and view detailed stats. Built with Next.js 16 and PokeAPI.",
  keywords: ["pokemon", "poke-dex", "types", "stats", "abilities"],
};

export default function RootLayout( { children, }: Readonly<{ children: ReactNode }> ) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={ `${ geistSans.variable } ${ geistMono.variable } antialiased` }>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>{ children }</QueryProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
