# Pokémon Web Application

A modern React/Next.js application for browsing Pokémon types, searching by name, and viewing detailed stats using the [PokeAPI](https://pokeapi.co/).

---

## Documentation

- **[Architecture & Design](./docs/developers/architecture.md)** — Application structure, design patterns, data flow, and conventions

---

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
# Clone repository
git clone <the-repo-url>
cd pokemon

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build & Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

---

## Deployment

### Vercel

```bash
# Login to Vercel
vercel login

# Link project
vercel link

# Deploy
vercel --prod
```
