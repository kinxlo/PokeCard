import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {ReactNode} from "react";

import {QueryProvider} from "@/lib/react-query/query-provider";
import {ThemeProvider} from "@/lib/theme/theme-provider";
import {AppHeader} from "@/shared/components";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokéCARDS Explorer | Browse Pokémon by Type",
  description:
    "Explore Pokémon by type, search by name, and view detailed stats." +
    " Discover strengths, weaknesses, and more with our interactive PokéCARDS Explorer.",

};

export default function RootLayout({children,}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <div className="flex flex-col h-screen p-2 space-y-2">
          <AppHeader/>
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </QueryProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}


