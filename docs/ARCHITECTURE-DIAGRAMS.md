# PokeAPI Challenge - Architecture Diagrams & Flowcharts

---

## C4 Model - System Context (Level 1)

```mermaid
graph LR
    User["👤 End User<br/>(Web Browser)"]
    App["🌐 Pokemon Web App<br/>(React + Next.js)"]
    PokeAPI["🔗 PokeAPI<br/>(Public REST API)"]
    
    User -->|Browse Types<br/>Search Pokemon<br/>View Details| App
    App -->|HTTP Requests<br/>Cached| PokeAPI
    PokeAPI -->|JSON Responses| App
    App -->|HTML + JS<br/>Static Assets| User
    
    style User fill:#e1f5ff
    style App fill:#c8e6c9
    style PokeAPI fill:#fff9c4
```

**Key Elements:**
- **User:** Web browser (desktop/mobile)
- **App:** Next.js server-rendered application
- **PokeAPI:** External read-only REST API

---

## C4 Model - Container Diagram (Level 2)

```mermaid
graph TB
    Browser["🌐 Browser<br/>(Client)"]
    CDN["⚡ CDN/Edge<br/>(Vercel)"]
    Server["🚀 Next.js Server<br/>(Vercel)"]
    Cache["💾 Cache Layer<br/>(ISR + HTTP)"]
    PokeAPI["📡 PokeAPI<br/>(External)"]
    
    Browser -->|HTTP/HTTPS| CDN
    CDN -->|Static Assets<br/>Cached| Browser
    CDN -->|Dynamic Pages| Server
    Server -->|Fetch Data<br/>Cache Check| Cache
    Cache -->|Miss| PokeAPI
    PokeAPI -->|JSON| Cache
    Cache -->|Cached Response| Server
    Server -->|Rendered HTML| CDN
    
    style Browser fill:#bbdefb
    style CDN fill:#c8e6c9
    style Server fill:#a5d6a7
    style Cache fill:#ffe082
    style PokeAPI fill:#ffccbc
```

**Containers:**
1. **CDN (Vercel Edge)** - Static asset serving + edge caching
2. **Next.js Server** - Dynamic page rendering + API orchestration
3. **Cache Layer** - Request deduplication + ISR management
4. **PokeAPI** - External read-only data source

---

## Component Architecture (Level 3)

```mermaid
graph TB
    Page["📄 Page<br/>(app/)"]
    Container["📦 Container<br/>(features/)"]
    Component["🎨 Components<br/>(feature-specific)"]
    Shared["🔄 Shared<br/>(shared/)"]
    Service["⚙️ Service<br/>(feature service)"]
    API["🌐 HTTP Client<br/>(lib/api.service)"]
    External["📡 PokeAPI<br/>(external)"]
    
    Page -->|Data Fetching<br/>Layout Composition| Container
    Container -->|Feature Logic<br/>State Mgmt| Service
    Container -->|Render Props| Component
    Component -->|UI Events<br/>User Interaction| Component
    Component -->|Fallback UI| Shared
    Service -->|Axios Calls| API
    API -->|HTTP| External
    External -->|JSON| API
    
    style Page fill:#f8bbd0
    style Container fill:#e1bee7
    style Component fill:#d1c4e9
    style Shared fill:#bbdefb
    style Service fill:#c8e6c9
    style API fill:#fff9c4
    style External fill:#ffccbc
```

---

## Data Flow - Types Browser Page

```mermaid
graph TD
    User["User Navigates to /"]
    
    subgraph Server["Server (Next.js)"]
        Page["page.tsx<br/>(Server Component)"]
        Service["typesService.fetchAllTypes()"]
        Cache["React cache()<br/>(Request Dedup)"]
        Axios["Axios HTTP Client"]
    end
    
    subgraph Cache_Layers["Cache Layers"]
        ISR["Next.js ISR<br/>(1 day revalidate)"]
        HTTP["HTTP Cache<br/>(CDN)"]
    end
    
    subgraph External["External"]
        API["PokeAPI<br/>GET /type/"]
    end
    
    subgraph Client["Browser (Client)"]
        TypeBrowser["TypeBrowser<br/>(Server Component)"]
        TypeCard["TypeCard × N<br/>(Server Component)"]
    end
    
    User -->|Request| Page
    Page -->|Fetch Data| Service
    Service -->|Cached Request?| Cache
    Cache -->|Check ISR| ISR
    ISR -->|Cache Miss| Axios
    Axios -->|Check HTTP Cache| HTTP
    HTTP -->|Cache Miss| API
    API -->|Response| HTTP
    HTTP -->|Store| Axios
    Axios -->|Return| Cache
    Cache -->|Store| ISR
    ISR -->|Pass Data| Service
    Service -->|Pass Props| TypeBrowser
    TypeBrowser -->|Render| TypeCard
    TypeCard -->|HTML| Client
    
    style Page fill:#e1f5ff
    style Service fill:#c8e6c9
    style API fill:#fff9c4
    style TypeBrowser fill:#f8bbd0
```

---

## Data Flow - Pokémon List with Search & Pagination

```mermaid
graph TD
    User["User Clicks Type"]
    
    subgraph Server["Server (Next.js)"]
        Page["page.tsx<br/>[typeId]"]
        Params["URL Params<br/>typeId, page, search"]
        Service["pokemonService.fetchByType()"]
    end
    
    subgraph External["External API"]
        PokeAPI["PokeAPI<br/>GET /type/{id}"]
    end
    
    subgraph Client["Browser (Client)"]
        List["PokemonList<br/>(Server Component)"]
        Search["PokemonSearch<br/>(Client Component)"]
        Pagination["PokemonPagination<br/>(Client Component)"]
    end
    
    User -->|Navigate to<br/>/types/1?page=1| Page
    Page -->|Extract| Params
    Params -->|Fetch Data| Service
    Service -->|Request| PokeAPI
    PokeAPI -->|Response| Service
    Service -->|Data + Metadata| List
    List -->|Display| List
    List -->|Pass Items| Search
    Search -->|Filter by Name<br/>useDebounce| Search
    List -->|Paginate<br/>25 items| Pagination
    Pagination -->|Link to Page 2,3...| Pagination
    
    style Page fill:#e1f5ff
    style Search fill:#f8bbd0
    style Pagination fill:#ffe082
    style PokeAPI fill:#fff9c4
```

---

## Data Flow - Pokémon Detail Page

```mermaid
graph TD
    User["User Clicks Pokemon Card"]
    
    subgraph Server["Server (Next.js)"]
        Page["page.tsx<br/>[id]"]
        Service["pokemonService.fetchDetail()"]
        Transform["Transform PokeAPI<br/>→ AppPokemon"]
    end
    
    subgraph External["External API"]
        PokeAPI["PokeAPI<br/>GET /pokemon/{id}"]
    end
    
    subgraph Client["Browser (Client)"]
        Hero["Hero Image"]
        Stats["Stats Chart"]
        Abilities["Abilities List"]
        Types["Type Badges"]
        Related["Related Pokemon"]
    end
    
    User -->|Click| Page
    Page -->|Fetch Detail| Service
    Service -->|Request| PokeAPI
    PokeAPI -->|Response| Service
    Service -->|Map Data| Transform
    Transform -->|Return AppPokemon| Page
    Page -->|Render| Hero
    Page -->|Render| Stats
    Page -->|Render| Abilities
    Page -->|Render| Types
    Page -->|Links| Related
    
    style Page fill:#e1f5ff
    style Stats fill:#d1c4e9
    style PokeAPI fill:#fff9c4
```

---

## Feature Module Structure

```mermaid
graph TB
    Feature["📦 features/pokemon/"]
    
    subgraph Public["Public API (index.ts)"]
        Export["export { usePokemon }"]
        Export2["export { PokemonList }"]
    end
    
    subgraph Components["components/"]
        PList["PokemonList.tsx"]
        PCard["PokemonCard.tsx"]
        PSearch["PokemonSearch.tsx"]
        PPagination["PokemonPagination.tsx"]
        PDetail["PokemonDetail.tsx"]
    end
    
    subgraph Services["services/"]
        PSvc["pokemon.service.ts"]
    end
    
    subgraph Hooks["hooks/"]
        useP["usePokemon.ts"]
        usePD["usePokemonDetail.ts"]
        usePS["usePokemonSearch.ts"]
    end
    
    subgraph Types["types/"]
        PT["pokemon.types.ts"]
    end
    
    Feature -->|Exports| Public
    
    Public -->|Consumer imports|Import["app/types/[typeId]/page.tsx"]
    
    Components -->|Uses| Hooks
    Hooks -->|Calls| Services
    Services -->|Uses Types| Types
    
    style Feature fill:#e8f5e9
    style Public fill:#c8e6c9
    style Components fill:#a5d6a7
    style Services fill:#81c784
    style Hooks fill:#66bb6a
    style Types fill:#4caf50
```

---

## Client-Side Search Architecture

```mermaid
graph LR
    Input["SearchInput<br/>(controlled input)"]
    Debounce["useDebounce<br/>(300ms)"]
    Filter["Filter Items<br/>(client-side)"]
    Display["PokemonList<br/>(re-render)"]
    
    Input -->|onChange: setQuery| Debounce
    Debounce -->|Debounced value| Filter
    Filter -->|items.filter(name)| Filter
    Filter -->|filtered items| Display
    Display -->|User sees results| Display
    
    Note["⚡ Instant results<br/>No API calls<br/>No loading state"]
    
    style Input fill:#f8bbd0
    style Debounce fill:#e1bee7
    style Filter fill:#d1c4e9
    style Display fill:#bbdefb
    style Note fill:#ffe082
```

---

## Caching Layers (Multi-tiered)

```mermaid
graph TB
    Request["HTTP Request"]
    
    subgraph Layer1["Layer 1: Browser Cache"]
        LocalStorage["localStorage<br/>(recent searches)"]
        SessionStorage["sessionStorage<br/>(pagination state)"]
    end
    
    subgraph Layer2["Layer 2: HTTP Cache"]
        CDN["CDN Cache<br/>(Vercel Edge)<br/>max-age: 1-7 days"]
    end
    
    subgraph Layer3["Layer 3: Next.js ISR"]
        ISR["Incremental Static<br/>Regeneration<br/>revalidate: 1-7 days"]
    end
    
    subgraph Layer4["Layer 4: React Cache"]
        ReactCache["React cache()<br/>(request dedup)<br/>per SSR render"]
    end
    
    subgraph Layer5["Layer 5: PokeAPI"]
        PokeAPI["PokeAPI<br/>(External Source)"]
    end
    
    Request -->|Check| Layer1
    Layer1 -->|Miss| Layer2
    Layer2 -->|Miss| Layer3
    Layer3 -->|Miss| Layer4
    Layer4 -->|Miss| Layer5
    Layer5 -->|Response| Layer4
    Layer4 -->|Response| Layer3
    Layer3 -->|Store| Layer2
    Layer2 -->|Store| Layer1
    Layer1 -->|Cached Response| Request
    
    style Layer1 fill:#bbdefb
    style Layer2 fill:#c8e6c9
    style Layer3 fill:#a5d6a7
    style Layer4 fill:#fff9c4
    style Layer5 fill:#ffccbc
```

---

## Error Handling Strategy

```mermaid
graph TD
    Request["API Request"]
    
    subgraph Errors["Error Scenarios"]
        NotFound["404 Not Found"]
        RateLimit["429 Rate Limit"]
        ServerError["5xx Server Error"]
        NetworkError["Network Error"]
    end
    
    Request -->|Success| Display["Display Data"]
    Request -->|Fail| Errors
    
    NotFound -->|Type not found| ErrorBoundary["ErrorBoundary"]
    RateLimit -->|Retry w/ backoff| Request
    ServerError -->|Show fallback| ErrorBoundary
    NetworkError -->|Show offline UI| ErrorBoundary
    
    ErrorBoundary -->|Render| FallbackUI["Fallback UI<br/>(error message)"]
    
    Display -->|User Sees Data| User["User"]
    FallbackUI -->|User Sees Error| User
    
    style ErrorBoundary fill:#ffcdd2
    style FallbackUI fill:#ef9a9a
    style User fill:#90caf9
```

---

## Page Structure & Routing

```
/
├── / (Home / Types Browser)
│   ├── TypeBrowser
│   └── TypeGrid
│       └── TypeCard[] (clickable)
│
├── /types/[typeId] (Pokémon List)
│   ├── URL params: page, search
│   ├── PokemonList
│   │   └── PokemonCard[]
│   ├── PokemonSearch (client)
│   └── PokemonPagination (client)
│
├── /pokemon/[id] (Detail)
│   ├── Hero Image
│   ├── StatsChart
│   ├── AbilitiesList
│   ├── TypeBadges
│   └── RelatedPokemon[]
│
└── /error (Error Page)
    └── Error Message + Retry
```

---

## Performance Optimization Plan

```mermaid
graph LR
    Perf["Performance<br/>Optimization"]
    
    subgraph Bundle["Bundle Size"]
        CodeSplit["Code Splitting<br/>per-route"]
        TreeShake["Tree Shaking<br/>named imports"]
        MinimizeDeps["Minimal Dependencies<br/>Axios only"]
    end
    
    subgraph Rendering["Rendering Strategy"]
        SSR["Server Components<br/>faster FCP"]
        ISR["ISR Caching<br/>reduce API calls"]
        ImageOpt["Image Optimization<br/>next/image"]
    end
    
    subgraph Runtime["Runtime Performance"]
        Debounce["Debounced Search<br/>reduce re-renders"]
        Memo["React.memo()<br/>prevent rerenders"]
        Lazy["Lazy Loading<br/>intersection observer"]
    end
    
    Perf --> Bundle
    Perf --> Rendering
    Perf --> Runtime
    
    Bundle --> Target1["< 150KB JS<br/>(gzipped)"]
    Rendering --> Target2["LCP ≤ 2.5s<br/>FCP ≤ 1.8s"]
    Runtime --> Target3["INP ≤ 200ms<br/>CLS ≤ 0.1"]
    
    style Bundle fill:#c8e6c9
    style Rendering fill:#a5d6a7
    style Runtime fill:#81c784
    style Target1 fill:#66bb6a
    style Target2 fill:#66bb6a
    style Target3 fill:#66bb6a
```

---

## Deployment Architecture

```mermaid
graph LR
    GitHub["GitHub<br/>(Source)"]
    Vercel["Vercel<br/>(CI/CD)"]
    
    subgraph Build["Build Pipeline"]
        Install["npm install"]
        Lint["ESLint"]
        Build_Step["npm run build"]
    end
    
    subgraph Edge["Edge Network"]
        CDN["CDN Cache"]
        ServerNodes["Server Nodes"]
    end
    
    GitHub -->|Push| Vercel
    Vercel -->|Trigger| Install
    Install -->|Pass| Lint
    Lint -->|Pass| Build_Step
    Build_Step -->|Deploy| Edge
    Edge -->|Serve| Browser["User Browser"]
    
    style GitHub fill:#bbdefb
    style Vercel fill:#c8e6c9
    style CDN fill:#a5d6a7
    style ServerNodes fill:#81c784
    style Browser fill:#fff9c4
```

---

## TypeScript Type Hierarchy

```
PokeAPI Schema (External)
├── PokeAPIType
├── PokeAPIPokemon
├── PokeAPIPokemonDetail
└── PokeAPIResponse<T>

App Domain Model (Internal)
├── AppType
├── AppPokemon
├── AppPokemonDetail
└── PaginatedResponse<T>

Data Transformation Layer
└── toApp*() converters
    ├── toAppType()
    ├── toAppPokemon()
    └── toAppPokemonDetail()
```

**Principle:** Separate external API types from app domain types → flexibility for API changes

---

**Use these diagrams as reference during implementation. Update as architecture evolves.**


