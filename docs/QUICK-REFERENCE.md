# PokeAPI Challenge - Quick Reference

**Status:** Architecture Design Complete ✓

---

## 🎯 Challenge Overview

Build a React/Next.js app consuming PokeAPI to:
- List Pokémon types
- Show Pokémon by type (paginated, searchable)
- Display detailed stats per Pokémon

**Stack:** React 19 + Next.js 16 + Axios + Tailwind CSS  
**Deployment:** Vercel (free tier)  
**Documentation:** Dev + Deployment guides required

---

## 🏗️ Architecture Summary

### C4 Layers

```
┌─ System Context (Level 1)
│  └─ User → Web App ↔ PokeAPI
│
├─ Containers (Level 2)
│  └─ Vercel (CDN + Next.js) ↔ PokeAPI
│
├─ Components (Level 3)
│  ├─ features/types/          (Type browsing)
│  ├─ features/pokemon/        (List, search, detail)
│  ├─ shared/components/       (Reusable UI)
│  └─ lib/                     (Infrastructure)
│
└─ Code Structure
   └─ Feature-First + Server Components (by default)
```

### Key Decisions

| Decision | Rationale | Tradeoff |
|----------|-----------|---------|
| **Server Components** | Better perf, simpler code, no API key exposure | Less interactivity without 'use client' |
| **ISR Caching** | Reduce API calls, fast load times | Data latency (regenerates every 1-7 days) |
| **Offset Pagination** | Simple, SEO-friendly, bookmarkable URLs | Not cursor-based |
| **Client-side Search** | Instant results, fewer API calls, simpler | Limited to fetched data |
| **Axios only** | Minimal deps, specified in challenge | No automatic caching (implement manually) |

---

## 📁 Project Structure

```
src/
├── features/
│   ├── types/
│   │   ├── components/        (TypeBrowser, TypeCard, TypeGrid)
│   │   ├── services/          (types.service.ts)
│   │   ├── hooks/             (useTypes)
│   │   ├── types/             (TypeScript interfaces)
│   │   └── index.ts           (Public API)
│   │
│   ├── pokemon/
│   │   ├── components/        (PokemonList, Card, Search, Detail)
│   │   ├── services/          (pokemon.service.ts)
│   │   ├── hooks/             (usePokemon, usePokemonDetail)
│   │   ├── types/             (TypeScript interfaces)
│   │   └── index.ts
│   │
│   └── navigation/
│       └── components/        (Header, Breadcrumb, Footer)
│
├── shared/
│   ├── components/            (Button, Input, Card, Badge, etc.)
│   ├── layouts/               (AppLayout)
│   ├── hooks/                 (useDebounce, useAsync, useLocalStorage)
│   ├── services/              (api.service - Axios wrapper)
│   └── types/                 (Global types, API schemas)
│
├── lib/
│   ├── config.ts              (Environment variables)
│   ├── constants.ts           (App constants)
│   ├── utils.ts               (Utility functions)
│   ├── formatters.ts          (Data formatting)
│   └── cache.ts               (Client-side caching)
│
├── styles/
│   ├── variables.css          (CSS variables)
│   └── global.css             (Global styles)
│
└── app/                       (Next.js App Router)
    ├── layout.tsx             (Root layout)
    ├── page.tsx               (Types browser)
    ├── types/[typeId]/page.tsx (Pokémon list)
    ├── pokemon/[id]/page.tsx   (Detail page)
    └── error.tsx              (Error page)
```

---

## 🔄 Data Flow

### Pages Overview

#### **1. Home / Types Page** (`/`)
```
Server Component: Home
  └─ typesService.fetchAllTypes()
     └─ Axios: GET /type/
        └─ Cache: 1 day (ISR)
           ├─ TypeBrowser (render types)
           └─ TypeCard × N
```

#### **2. Type Results Page** (`/types/[typeId]`)
```
Server Component: TypePage
  └─ Params: typeId, page (URL), search (query)
     └─ pokemonService.fetchPokemonByType(typeId, page)
        └─ Axios: GET /type/{typeId}/
           └─ Filter by search term (client-side)
              └─ Paginate (25 items)
                 ├─ PokemonList (render list)
                 ├─ PokemonCard × 25
                 └─ PokemonPagination
```

#### **3. Pokémon Detail Page** (`/pokemon/[id]`)
```
Server Component: PokemonDetailPage
  └─ Params: id
     └─ pokemonService.fetchPokemonDetail(id)
        └─ Axios: GET /pokemon/{id}/
           └─ Cache: 7 days (ISR)
              ├─ Hero image
              ├─ Stats visualization
              ├─ Abilities list
              ├─ Type badges
              └─ Related Pokémon links
```

### Search Flow

```
User types in search box
  ↓
SearchInput (client component, 'use client')
  ↓
useDebounce(query, 300ms) → Filter items
  ↓
Re-render filtered PokemonList (instant)
```

**Key:** Search filters already-fetched items on client (no API call per keystroke)

---

## 🎨 Component Architecture

### Layer Hierarchy

```
┌─────────────────────────────────────────────┐
│ Page Layer (app/types/[typeId]/page.tsx)    │
│ - Data fetching                             │
│ - Parameter extraction                      │
│ - Layout composition                        │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│ Container Components (features/pokemon/)   │
│ - Feature state management                  │
│ - API orchestration                         │
│ - Business logic                            │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│ Presentational Components                  │
│ - UI rendering                              │
│ - User interaction (form, clicks)          │
│ - Styling & layout                         │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│ Shared Components (shared/components/)      │
│ - Button, Input, Card, Badge               │
│ - Error boundaries                         │
│ - Loading states                           │
└─────────────────────────────────────────────┘
```

---

## 🔐 Constraint Adherence

### Per `01-AGENT-RULES.md`

✅ **Understand before editing** → Architecture first (this doc)  
✅ **Follow existing conventions** → Feature-first per 04b  
✅ **Smallest safe change** → Modular, isolated features  
✅ **Preserve architecture boundaries** → Layer separation enforced  
✅ **Explicit assumptions** → All documented in BRAINSTORM.md

### Per `07-REACT-NEXTJS.md`

✅ **Server Components by default** → Only 'use client' for forms/hooks  
✅ **Prop validation** → TypeScript interfaces required  
✅ **One component per file** → Colocate only small UI helpers  
✅ **Dependency arrays** → useEffect always includes deps  
✅ **Error boundaries** → ErrorBoundary wrapper on each route

### Per `04b-FRONTEND-ARCHITECTURE.md`

✅ **Feature-first organization** → types/, pokemon/, navigation/  
✅ **Clear module boundaries** → index.ts exports public API  
✅ **Type safety** → Strict TypeScript, no `any`  
✅ **Component composition** → No inheritance, prop-based  
✅ **Progressive enhancement** → Works without JS (static HTML from server)

### Per `05-PERFORMANCE.md`

✅ **Core Web Vitals targets**
- LCP ≤ 2.5s via ISR + CDN
- FCP ≤ 1.8s via Server Rendering
- CLS ≤ 0.1 via fixed layouts
- INP ≤ 200ms via debounced search
- TTFB ≤ 600ms via Vercel edge

✅ **Bundle size targets**
- Initial JS < 150 KB (gzipped)
- Total JS < 300 KB (gzipped)
- CSS < 50 KB (Tailwind)

---

## ⚡ Caching Strategy

### HTTP Layer (Vercel CDN)

```
GET /          → cache-control: max-age=3600 (1 hour)
GET /types/    → cache-control: max-age=86400 (1 day)
GET /pokemon/1 → cache-control: max-age=604800 (7 days)
```

### Next.js ISR (Incremental Static Regeneration)

```typescript
export const revalidate = 86400; // Types page: regenerate every 1 day
export const revalidate = 604800; // Detail page: regenerate every 7 days
```

### Request Deduplication (React cache())

```typescript
// Server: Multiple calls in same render = 1 request
const cachedFetchTypes = cache(() => axios.get('/type/'));

// Prevents duplicate requests during SSR
```

### Client-side Cache (localStorage)

```typescript
// Store recent searches
localStorage.setItem('recentSearches', JSON.stringify([...]));

// Optional: Cache pagination state
sessionStorage.setItem('pokemonListState', JSON.stringify({...}));
```

---

## 🚀 Deployment Checklist

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Environment variables set (NEXT_PUBLIC_POKEAPI_URL)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Lighthouse score checked (≥90)
- [ ] All pages tested in browser
- [ ] Errors monitored (Vercel Analytics)
- [ ] Performance dashboard reviewed (Core Web Vitals)

---

## 📚 Documentation Deliverables

1. **README.md** (in repo root)
   - Project overview
   - Setup instructions
   - How to run locally
   - Live demo link

2. **docs/DEVELOPMENT.md**
   - Architecture explanation (C4 diagrams)
   - Feature structure walkthrough
   - Development workflow
   - Common tasks

3. **docs/DEPLOYMENT.md**
   - Step-by-step Vercel setup
   - Environment configuration
   - Monitoring & debugging
   - Performance optimization

4. **docs/API.md**
   - PokeAPI endpoints used
   - Rate limits & caching
   - Data transformations
   - Error handling

5. **docs/COMPONENTS.md**
   - Component tree
   - Key props for each component
   - Usage examples
   - Accessibility features

---

## 🎯 Testing Strategy (Recommended)

### Unit Tests (components, services)
```bash
vitest --ui
```

### Integration Tests (routes, data flow)
```bash
vitest --include "**/integration/**"
```

### E2E Tests (optional, user journeys)
```bash
npx playwright test
```

### Performance Tests (optional)
```bash
npm run build && npm run start
# Then: Google PageSpeed Insights
```

---

## ❓ Frequently Asked Questions

**Q: Why not use SWR or React Query?**  
A: Challenge specifies Axios. Can add SWR later if caching becomes complex.

**Q: Why server components?**  
A: Better performance, simpler code, all per Next.js 16 best practices.

**Q: What about real-time updates?**  
A: PokeAPI data changes infrequently. ISR (1-7 day revalidation) sufficient.

**Q: How to handle API errors?**  
A: Error boundaries + fallback UI + retry logic with exponential backoff.

**Q: Can users create accounts / save favorites?**  
A: Out of scope. This is a read-only demo. Add auth later if needed.

---

## 📝 Implementation Order

1. **Foundation**
   - Project setup
   - Folder structure
   - Axios wrapper
   - Global types

2. **Types Feature**
   - TypesService
   - Types page
   - Components

3. **Pokémon Feature**
   - PokemonService
   - List page + pagination
   - Search component

4. **Detail Page**
   - Detail service
   - Stats visualization
   - Related Pokémon

5. **Polish & Deploy**
   - Error handling
   - Loading states
   - Accessibility
   - Documentation
   - Vercel deployment

---

**See `docs/BRAINSTORM.md` for detailed analysis.**


