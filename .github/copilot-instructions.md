# GitHub Copilot instructions — Kundserviceportalen

This repository is a small fullstack app: Next.js App Router, TypeScript, Prisma
and SQLite, tested with Vitest and React Testing Library.

**Read [`AGENTS.md`](../AGENTS.md) and [`docs/specification.md`](../docs/specification.md)
before suggesting code.** `AGENTS.md` is the source of truth; this file is a
condensed reminder for Copilot, which does not follow links reliably.

## Non-negotiables

- Work from the feature brief in `docs/features/<issue-id>.md`.
- Work only inside the owned feature folder (`src/features/cases/create`,
  `query`, `workflow`, `src/features/notes`); stop and ask at a boundary.
- Write the failing test first, show the red run, then the minimum implementation.
- Do not add dependencies, change `prisma/schema.prisma` or change the API
  contract without the owner and an ADR.
- Use the shared UI primitives in `src/components/ui`; never fork them.
- UI is mobile-first (320 px base, `min-width` breakpoints) and meets WCAG 2.2 AA:
  labels, visible focus, 4.5:1 text contrast, 24 × 24 px targets, no colour-only
  status (AC-28–AC-31).
- All responses use `{ data }` on success and
  `{ error: { code, message, fieldErrors? } }` on failure. Never leak Prisma or
  SQL messages to the client.
- Server owns `id`, `status` and `createdAt`; never trust them from the client.
- No secrets and no real customer data. All seed data is fictional.
- Run `npm run check` (lint + typecheck + tests); paste the real output; never
  claim a result you did not see.
- Every change goes through a PR with at least one approving review and a squash
  merge.
- Write short: no filler, no repetition, lists over paragraphs (`AGENTS.md` §5).

## Commands

```bash
npm install
npm run db:reset
npm run dev
npm run check
npm test
```

## Where things live

| Path | Purpose |
|---|---|
| `src/features/cases/create/**` | Create and validation (owner A) |
| `src/features/cases/query/**` | List, detail, search (owner B) |
| `src/features/cases/workflow/**` | Status rules, change, history (owner C) |
| `src/features/notes/**` | Internal notes (owner D) |
| `src/components/ui/**` | Shared primitives (owner B) |
| `src/lib/**` | Shared server helpers (owner C/D) |
| `src/app/api/**/route.ts` | Re-exports only — no logic |
| `prisma/**` | Schema, migrations, seed (owner C) |
| `docs/**`, `prompts/**` | Documentation and reusable prompts |

More: [`docs/ai-tooling.md`](../docs/ai-tooling.md).
