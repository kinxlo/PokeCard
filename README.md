# Pokémon Web Application

A modern React/Next.js application for browsing Pokémon types, searching by name, and viewing detailed stats using the [PokeAPI](https://pokeapi.co/).

**Status:** 🏗️ Architecture Complete | 📋 Ready for Implementation

---

## 🎯 Features

- ✅ **Browse all Pokémon types** - Explore all 18 official types
- ✅ **View Pokémon by type** - Paginated list (25 items per page)
- ✅ **Search by name** - Instant client-side filtering
- ✅ **Pokémon details** - Full stats, abilities, and sprite images
- ✅ **Performance optimized** - Core Web Vitals (LCP ≤ 2.5s, FCP ≤ 1.8s)
- ✅ **Responsive design** - Mobile-friendly UI
- ✅ **Type-safe** - Full TypeScript implementation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd pokemon

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## 📚 Documentation

### Architecture & Design
- 📖 **[ANALYSIS.md](./docs/ANALYSIS.md)** - Complete architectural analysis
- 📊 **[ARCHITECTURE-DIAGRAMS.md](./docs/ARCHITECTURE-DIAGRAMS.md)** - C4 model + flowcharts
- ⚡ **[QUICK-REFERENCE.md](./docs/QUICK-REFERENCE.md)** - Quick lookup guide
- 🧠 **[BRAINSTORM.md](./docs/BRAINSTORM.md)** - Detailed design thinking

### Development & Deployment
- 👨‍💻 **[DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Setup, architecture, workflow (to be created)
- 🚀 **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Vercel deployment guide (to be created)
- 🌐 **[API.md](./docs/API.md)** - PokeAPI integration details (to be created)

---

## 🏗️ Architecture Overview

### Stack
- **Frontend:** React 19, Next.js 16
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios
- **Language:** TypeScript 5
- **Deployment:** Vercel (automatic from git)

### Key Technologies & Patterns

```
Server Components (by default) → Server-side data fetching
    ↓
Multi-tier Caching (ISR + HTTP + React cache)
    ↓
Feature-First Organization (types/, pokemon/)
    ↓
Client Components (search, pagination interactivity)
```

### Project Structure

```
src/
├── app/                    (Next.js routes)
├── features/
│   ├── types/            (Type browsing feature)
│   ├── pokemon/          (Pokémon list + detail)
│   └── navigation/       (Header, footer)
├── shared/               (Reusable UI components)
├── lib/                  (Infrastructure, config)
└── styles/              (Global styles)
```

**See detailed structure in [ANALYSIS.md](./docs/ANALYSIS.md#-project-structure-complete)**

---

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 🎯 Designed |
| **FCP** (First Contentful Paint) | ≤ 1.8s | 🎯 Designed |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 🎯 Designed |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 🎯 Designed |
| **Bundle Size** | < 150 KB (gzipped) | 🎯 Designed |

---

## 🔄 Data Flow

```
User Navigation
    ↓
Next.js Server Component (data fetching)
    ↓
Multi-tier Cache (ISR → HTTP → React → PokeAPI)
    ↓
Server-rendered HTML + minimal JS
    ↓
Client Component (search/pagination interactivity)
    ↓
Instant results (client-side filtering, no API calls)
```

---

## 🔗 PokeAPI Integration

**Base URL:** https://pokeapi.co/api/v2

**Endpoints Used:**
- `GET /type/` - All Pokémon types
- `GET /type/{id}/` - Pokémon in a specific type
- `GET /pokemon/{id}/` - Individual Pokémon details

**Rate Limit:** 100 requests/minute (sufficient for this app)  
**Caching:** ISR + HTTP cache (1-7 days) reduces API load

---

## 🎨 Design Principles

This project follows the organizational constraints defined in `docs/agent-rules/`:

✅ **Architecture-First** - Design before code  
✅ **Feature-First Organization** - Autonomous feature modules  
✅ **Server Components by Default** - Better performance & security  
✅ **Type Safety** - Strict TypeScript throughout  
✅ **Error Boundaries** - Graceful error handling  
✅ **Performance Optimized** - Core Web Vitals focused  

---

## 📝 Constraint Framework

This project adheres to comprehensive development rules:

- **01-AGENT-RULES.md** - Operating contract for code generation
- **03-ARCHITECTURE-FIRST.md** - Pre-implementation protocol
- **04b-FRONTEND-ARCHITECTURE.md** - Frontend-specific patterns
- **07-REACT-NEXTJS.md** - React 19 + Next.js 16 best practices
- **05-PERFORMANCE.md** - Performance optimization standards

See [docs/agent-rules/](./docs/agent-rules/) for complete guidelines.

---

## 🛠️ Development Workflow

### Adding a New Feature

1. **Create feature folder** in `src/features/{feature-name}/`
2. **Define types** in `src/features/{feature-name}/types/`
3. **Create service** in `src/features/{feature-name}/services/`
4. **Build components** in `src/features/{feature-name}/components/`
5. **Export public API** in `src/features/{feature-name}/index.ts`
6. **Add route** in `src/app/`

### Code Style

- Follow ESLint rules (run `npm run lint`)
- Use TypeScript (strict mode enabled)
- Add JSDoc comments for complex logic
- One component per file (small helpers colocated)
- Server Components by default

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Login to Vercel
vercel login

# Link project
vercel link

# Deploy
vercel --prod
```

**Automatic:** Each git push triggers deployment  
**Monitoring:** Vercel Web Analytics (free)

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_POKEAPI_URL=https://pokeapi.co/api/v2
```

---

## 📈 Implementation Roadmap

- **Phase 1:** Foundation (folder structure, types, Axios wrapper)
- **Phase 2:** Types feature (browse types)
- **Phase 3:** Pokémon feature (list, search, pagination)
- **Phase 4:** Detail view (stats, abilities)
- **Phase 5:** Polish (errors, accessibility, performance)
- **Phase 6:** Docs & deploy (documentation, Vercel)

**Estimated Timeline:** 3-4 weeks

---

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev/blog/2024/12/19/react-19)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Performance
- [Web Vitals](https://web.dev/vitals/)
- [Core Web Vitals Guide](https://support.google.com/webmasters/answer/9205520)
- [Chrome DevTools Lighthouse](https://developer.chrome.com/docs/lighthouse/)

### API
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

To contribute:
1. Create a feature branch
2. Make changes following the architecture guidelines
3. Submit a pull request

See [docs/agent-rules/](./docs/agent-rules/) for detailed standards.

---

**Last Updated:** March 7, 2026  
**Status:** 🏗️ Architecture Complete, Ready for Implementation
