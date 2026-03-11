# PokéCARDS Explorer — Architecture & Design Documentation

> A developer reference covering application structure, design patterns, data flow, and key conventions.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Application Architecture](#application-architecture)
   - [Routing & Layouts](#routing--layouts)
   - [Data Layer](#data-layer)
   - [Component Architecture](#component-architecture)
   - [Design System](#design-system)
5. [Data Flow](#data-flow)
6. [Key Design Patterns](#key-design-patterns)
7. [Configuration & Environment](#configuration--environment)
8. [Conventions & Rules](#conventions--rules)

---

## Overview

**PokéCARDS Explorer** is a Next.js 16 application that lets users explore Pokémon by type, search by name, and view detailed Pokémon stats. It consumes the public [PokéAPI](https://pokeapi.co/) and uses a layered architecture to separate data fetching, business logic, and UI concerns.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Data Fetching | TanStack Query v5 (React Query) |
| HTTP Client | Axios |
| UI Primitives | shadcn/ui (Radix UI) |
| Icons | Lucide React |
| Theme | next-themes |
| Package Manager | pnpm |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages & layouts
│   ├── layout.tsx              # Root layout (providers, global styles)
│   ├── page.tsx                # Homepage — type grid
│   └── (with-sidebar)/         # Route group: pages with sidebar
│       ├── layout.tsx          # Sidebar layout (desktop + mobile drawer)
│       ├── pokemon/
│       │   └── [name]/
│       │       └── page.tsx    # Pokémon detail page
│       └── types/
│           └── [type]/
│               ├── page.tsx    # Type listing page
│               └── _components/
│                   ├── index.ts
│                   ├── type-page-header.tsx
│                   ├── type-page-search.tsx
│                   ├── type-pagination.tsx
│                   └── type-pokemon-grid.tsx
├── lib/                        # Pure utilities, config, and infrastructure
│   ├── config.ts               # Centralised env/app config
│   ├── constants.ts            # App-wide constants (gradients, descriptions)
│   ├── design-system.ts        # Design tokens (typography, spacing, colours)
│   ├── pokemon-utils.ts        # Pure Pokémon data helpers
│   ├── utils.ts                # Generic helpers (cn)
│   ├── http/
│   │   ├── api.service.ts      # Generic get/post wrappers over Axios
│   │   └── httpConfig.ts       # Axios instance with base URL + headers
│   ├── react-query/
│   │   ├── query-client.ts     # QueryClient with retry/stale config
│   │   ├── query-keys.ts       # Typed query key constants
│   │   └── query-provider.tsx  # QueryClientProvider wrapper
│   └── theme/
│       └── theme-provider.tsx  # next-themes provider wrapper
├── shared/
│   ├── components/             # Reusable UI components
│   │   ├── app-header.tsx
│   │   ├── home-type-grid.tsx
│   │   ├── pokemon-card.tsx
│   │   ├── theme-switcher.tsx
│   │   ├── type-badge.tsx
│   │   ├── type-sidebar.tsx
│   │   ├── index.ts            # Barrel export
│   │   ├── button/
│   │   └── ui/                 # shadcn/ui primitives
│   └── services/
│       └── app/
│           ├── app.service.ts  # AppService singleton
│           ├── app.query.ts    # React Query hooks
│           └── app.types.ts    # TypeScript types for API responses
└── type.d.ts                   # Global type declarations
```

---

## Application Architecture

### Routing & Layouts

The app uses **Next.js App Router** with two layout levels:

```
RootLayout (app/layout.tsx)
│  Providers: ThemeProvider, QueryProvider
│  Shell: AppHeader + <main>
│
├── / (app/page.tsx)
│     HomeTypeGrid — full-width type explorer
│
└── (with-sidebar)/ (app/(with-sidebar)/layout.tsx)
      SidebarLayout — TypeSidebar + content area
      │
      ├── /types/[type]      — Pokémon listing for a type
      └── /pokemon/[name]    — Pokémon detail
```

**Route group `(with-sidebar)`** is a Next.js convention that groups routes under a shared layout without adding a URL segment. All routes inside share the sidebar layout (desktop sidebar + mobile drawer).

**Mobile navigation**: The sidebar layout manages a `isMobileSidebarOpen` state. On small screens, a "Browse Types" button triggers a full-screen drawer with a backdrop, keyboard-dismissible via `Escape`.

---

### Data Layer

The data layer is split into three clear responsibilities:

#### 1. HTTP Infrastructure (`lib/http/`)

```
httpConfig.ts   ──▶   Axios instance
                       baseURL: NEXT_PUBLIC_POKEAPI_URL
                       timeout: 10s
                       headers: JSON/Accept

api.service.ts  ──▶   get<T>(url, config?)
                       post<T>(url, data?, config?)
```

All requests go through typed `get<T>` / `post<T>` functions that unwrap `response.data`. This keeps service methods clean and keeps Axios specifics isolated.

#### 2. Service Layer (`shared/services/app/`)

`AppService` is a **Singleton** that owns all Pokémon API calls:

| Method | Endpoint | Notes |
|---|---|---|
| `getPokemon(limit, offset)` | `GET /pokemon` | Default: 1,000 Pokémon |
| `getTypes()` | `GET /type` → parallel `/type/:url` | Enriches type list with full details |
| `getTypeDetail(nameOrId)` | `GET /type/:id` | Includes damage relations & Pokémon |
| `getPokemonDetail(nameOrId)` | `GET /pokemon/:id` | Full stats, sprites, abilities |

`getTypes()` fetches the type list then fires **parallel** requests (`Promise.all`) to each type URL to get full detail data in one call cycle.

#### 3. React Query Hooks (`shared/services/app/app.query.ts`)

Each service method has a corresponding hook. Hooks are the **only** way components interact with remote data.

| Hook | Cache Key | `staleTime` |
|---|---|---|
| `useGetPokemon()` | `['pokemon', limit, offset]` | 24 hours |
| `useGetTypes()` | `['types']` | 24 hours |
| `useGetTypeDetail(type)` | `['type-detail', type]` | 24 hours |
| `useGetPokemonDetail(name)` | `['pokemon-detail', name]` | 7 days |

**QueryClient configuration** (`lib/react-query/query-client.ts`):
- Default `staleTime`: 5 minutes (overridden per-hook above)
- `refetchOnWindowFocus`: disabled
- Retry: up to 2 times; **4xx errors are never retried** (smart Axios error check)

---

### Component Architecture

Components are organised into two tiers:

#### Shared Components (`shared/components/`)

Reusable across the entire application. Exported via a barrel `index.ts`.

| Component | Role |
|---|---|
| `AppHeader` | Sticky top bar — logo, theme switcher |
| `TypeSidebar` | Left-nav with all type links, active state |
| `HomeTypeGrid` | Homepage grid of type cards with artwork |
| `PokemonCard` | Card for a single Pokémon. Two variants: `compact` (list) and `grid` |
| `TypeBadge` | Colour-coded type pill. Three variants: `default`, `dot`, `outline` |
| `ThemeSwitcher` | Light/dark/system toggle |
| `ui/*` | shadcn/ui primitives (Button, Card, Badge, Input, Skeleton) |

#### Route-Scoped Components (`app/.../​_components/`)

Components used by a single route are co-located in a `_components/` folder next to their page. They are **not** exported to `shared/`.

Example — `/types/[type]/_components/`:
- `TypePageHeader` — hero area with type name and Pokémon count
- `TypePageSearch` — debounced search input
- `TypePokemonGrid` — responsive grid of `PokemonCard`s
- `TypePagination` — page controls

---

### Design System

All visual tokens live in `lib/design-system.ts`. Components import from here instead of hardcoding classes.

**Key exports:**

| Export | Description |
|---|---|
| `typography` | Font size scale (xs → xl), 11-18px |
| `spacing` | Gap scale (none → lg), 0-24px |
| `radius` | Border radius tokens |
| `typeColors` | Per-type colour map: `bg`, `text`, `dot`, `border`, `hover` |
| `layout.header` | Header height token |
| `layout.sidebar` | Sidebar width token |

**Type gradients** (`lib/constants.ts → TYPE_GRADIENT`): Each Pokémon type maps to a Tailwind gradient string used on cards and the detail page hero. Both light and dark mode variants are defined inline.

**Theme**: Uses `next-themes` wrapping Tailwind's `dark:` variant strategy. `ThemeProvider` is placed in the root layout with `attribute="class"` and `enableSystem`.

---

## Data Flow

Below is the end-to-end flow for a typical page interaction:

```
User navigates to /types/fire
        │
        ▼
TypePage (page.tsx)
  └── useGetTypeDetail("fire")          ← React Query hook
        │
        ├─ Cache HIT? ──▶ return cached data immediately
        │
        └─ Cache MISS?
             │
             ▼
         appService.getTypeDetail("fire")   ← AppService singleton
             │
             ▼
         get<TypeDetailResponse>("/type/fire")  ← api.service.ts
             │
             ▼
         http.get("/type/fire")              ← Axios (httpConfig.ts)
             │
             ▼
         https://pokeapi.co/api/v2/type/fire
             │
             ▼
         TypeDetailResponse (typed)
             │
        ──────────────────────────────────────
        Back in the page:
             │
             ▼
         allPokemon = useMemo(...)      ← extract + enrich IDs/sprites
         filteredPokemon = useMemo(...) ← apply search filter
         paginatedPokemon = useMemo(...)← slice for current page
             │
             ▼
         <TypePokemonGrid pokemon={paginatedPokemon} />
             │
             ▼
         <PokemonCard variant="grid" /> (per Pokémon)
```

---

## Key Design Patterns

### Singleton Service
`AppService` uses a static `getInstance()` factory. Only one instance exists for the lifetime of the app, ensuring the service is initialised once and reused everywhere.

```ts
// Usage anywhere in the app
import { appService } from "@/shared/services/app/app.service";
appService.getTypes();
```

### Custom Hook Abstraction
All data fetching is hidden behind custom hooks. Pages never call `appService` directly — they only call hooks. This decouples pages from the data layer and makes testing easier.

```ts
// ✅ Correct — page uses the hook
const { data, isLoading } = useGetTypeDetail(typeName);

// ❌ Avoid — page calling service directly
const data = await appService.getTypeDetail(typeName);
```

### Derived State with `useMemo`
The type page derives all computed data (filtered list, paginated slice, total page count) using `useMemo`. This avoids re-computation on every render and keeps logic out of the JSX.

### Controlled Pagination Reset
When the search term changes, `currentPage` resets to `1` via the `handleSearch` handler. This pattern prevents the user from being stranded on page 5 with 0 results.

### Route Group Layouts
The `(with-sidebar)` route group gives `/types` and `/pokemon` a shared layout without polluting the URL. The homepage (`/`) does **not** use this group, so it renders without a sidebar.

### Co-located Route Components
Complex pages decompose their UI into sub-components stored in a `_components/` directory alongside the page file. The leading underscore signals these are private and not shared.

### Skeleton Loading Pattern
Every data-dependent component renders `<Skeleton>` placeholders during `isLoading`. The skeleton mirrors the real layout so the UI doesn't shift when data arrives.

---

## Configuration & Environment

Environment variables are accessed only via `lib/config.ts`. No component or service reads `process.env` directly.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_POKEAPI_URL` | Yes | PokéAPI base URL, e.g. `https://pokeapi.co/api/v2` |

**Cache settings** are also centralised in `config.ts`:

```ts
config.cache.types    // 86400s  (1 day)
config.cache.pokemon  // 604800s (7 days)
config.cache.details  // 604800s (7 days)
```

---

## Conventions & Rules

### Path Aliases
`@/` maps to `src/`. Use absolute imports throughout.

```ts
// ✅
import { appService } from "@/shared/services/app/app.service";

// ❌
import { appService } from "../../shared/services/app/app.service";
```

### Barrel Exports
`shared/components/index.ts` re-exports all shared components. Import from the barrel when consuming multiple components:

```ts
import { AppHeader, TypeBadge, PokemonCard } from "@/shared/components";
```

### Type-Only Imports
Use `import type` for TypeScript types to avoid bundling type definitions at runtime:

```ts
import type { PokemonDetailResponse } from "@/shared/services/app/app.types";
```

### Client Components
Mark components as `"use client"` only when they use browser APIs, hooks, or event handlers. Server components (no directive) are preferred for layouts and static UI. Current client components include all pages (data fetching via hooks) and the sidebar layout (state for mobile drawer).

### No Direct `process.env` Access
All environment variables are read through `lib/config.ts`. This makes it easy to see all configuration in one place and avoids scattered `process.env` reads.

### Constants Over Magic Strings
Type names, pagination limits, and UI tokens are constants (`lib/constants.ts`, `lib/design-system.ts`). Never inline magic values.

