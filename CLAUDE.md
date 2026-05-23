# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Israeli election information platform (בחירות ישראל 2026) — helps Israeli voters compare parties, leaders, and get AI-powered voting guidance. Hebrew content throughout, RTL layout (`dir="rtl"`), Heebo font.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # lint + typecheck + next build (runs prebuild: prisma generate)
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run db:seed      # Prisma seed
npm run db:import    # Import election data from JSON via scripts/import-election-data.ts
```

`build` runs lint and typecheck as prerequisites — fix both before shipping.

## Architecture

### Directory Structure

- **`app/`** — Routes, layouts, metadata, thin page composition only. Each route imports from `features/` and `components/`.
- **`features/`** — Feature-scoped components and logic. One folder per route: `home/`, `parties/`, `candidates/`, `advisor/`, `glossary/`, `political-card/`.
- **`components/shared/`** — Cross-feature reusable components. `data-display/` contains the `ComparisonScaffold` system; `navigation/` contains `PageHeader`.
- **`components/ui/`** — shadcn/ui primitives (Radix-based). Use these before building custom elements.
- **`lib/constants/`** — Shared constants: `parties.ts`, `candidates.ts`, `advisor.ts`, `blocs.ts`, `style.tsx`.
- **`lib/types/`** — TypeScript types: `parties.ts`, `candidates.ts`, `advisor.ts`, `shared.ts`.
- **`lib/utils/`** — Server-side data fetching and utilities. DB queries live here (`parties.ts`, `candidates.ts`, `glossary.ts`, `advisor-context.ts`). Prisma singleton in `prisma.ts`.
- **`lib/hooks/`** — Client hooks: `use-party-comparison-filters.ts`, `use-leader-comparison-filters.ts`, `use-comparison-state.ts`.
- **`prisma/`** — Schema + migration files. PostgreSQL via Supabase (`DATABASE_URL` + `DIRECT_URL`).
- **`scripts/`** — `import-election-data.ts` bulk-imports election JSON into Postgres in dependency order.
- **`public/parties/`, `public/leaders/`** — Static party and leader images.

### Data Flow Pattern

Pages in `app/` are Server Components that call `lib/utils/` functions (which use Prisma) and pass data down to feature components. Client interactivity (`"use client"`) stays in feature and shared components. Dynamic imports with `{ ssr: false }` are used for heavy dialogs (e.g., `PartyDialog`, `CandidateDialog`).

### Comparison System

The `ComparisonScaffold` in `components/shared/data-display/` is the shared grid/filter/search shell used by both the parties and candidates pages. Feature-specific grids (`PartyComparisonGrid`, `LeaderComparisonGrid`) wire data and open dialogs through it. Filter logic lives in `lib/hooks/`.

### AI Advisor

`app/api/advisor/route.ts` — authenticated POST endpoint using Vercel AI SDK (`streamText`) with Google Gemini. The advisor flow in `features/advisor/` has three stages: profile questions → AI-generated political Q&A batches → party matching result. Context for the AI is assembled in `lib/utils/advisor-context.ts` by querying all party/candidate data from Postgres.

### Authentication

Clerk (`@clerk/nextjs`) handles auth with Hebrew localization (`heIL`). `lib/utils/auth.ts` exports `ensureCurrentUser()` which syncs Clerk users to the `users` Postgres table.

### Database Schema Key Relationships

- `Party` → has many `Candidate`s, one `leader` (a `Candidate`), `PartyBaseTopic`s (positions on issues), `PartyLegislation`s (votes on bills), `RecentAction`s, `FuturePromise`s, `PartyMember`s.
- `BaseTopic` + `BaseTopicOption` — structured position options (security stance, economic stance, etc.). DB titles must match constants in `lib/constants/parties.ts` (`BASE_TOPIC`).
- `Legislation` + `LegislationOption` — bill voting positions.
- `ActionGroup` — groups actions/promises by category (security, economy, judiciary, religion).

## Code Conventions

- **Imports**: use `@/` alias for all project imports.
- **Server vs Client**: default to Server Components; add `"use client"` only for hooks/browser APIs.
- **Typing**: explicit types for public props and exported APIs; avoid `any`. Use types from `lib/types/` and constants from `lib/constants/` — never define these inside component files.
- **shadcn/ui first**: prefer existing shadcn components over raw HTML. Add missing shadcn components before building custom ones.
- **RTL**: preserve RTL layout with logical spacing; avoid inline styles that fight global RTL.
- **No invented data**: never fabricate mandates, poll numbers, or party positions — all factual content must come from the database or explicitly sourced constants.
