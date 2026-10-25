# ADR-001: Tech stack — Next.js fullstack, Prisma, SQLite

- Status: Proposed
- Date: 2026-10-25
- Owner: D
- Accepted by: _TODO at kickoff_
- Related: AC-27, AC-26

## Context

Four students, roughly four weeks part-time, one small CRUD app. The assignment
requires UI, backend logic, durable storage and automated tests, runnable locally
by an examiner without paid accounts.

The team knows JavaScript/TypeScript and React. The real constraints: **time to a
running base**, **parallel work for four people**, **easy testing of the required
behaviours**.

## Options considered

### Option 1 — Next.js (App Router) + Prisma + SQLite

- One repo, one process, one deploy target (localhost).
- Server Components handle reads; route handlers and client components handle
  writes.
- Prisma gives a schema, migrations and a typed client.
- SQLite is a file: no service to install, trivial to reset.
- **Pros:** fastest path from zero to a working UI; one language; strong docs;
  server rendering keeps list/detail simple.
- **Cons:** the framework hides a lot; shared files (`layout.tsx`, `package.json`,
  `schema.prisma`) invite conflicts; the server/client boundary confuses beginners;
  route handlers need care to test.

### Option 2 — React + Vite frontend, Express + SQLite backend

- Clean separation, two processes, explicit HTTP layer.
- **Pros:** obvious boundary; each layer easy to explain; backend tests
  straightforward.
- **Cons:** two scaffolds, CORS, two dev servers, duplicated types without a shared
  package; more setup before the first feature; more places to disagree.

### Option 3 — SvelteKit fullstack + SQLite

- Comparable to option 1 with less boilerplate.
- **Pros:** small and pleasant.
- **Cons:** least shared knowledge in the team; thinner examples and AI assistance;
  risks one person becoming the only debugger.

### Database driver alternatives

| Option | Pros | Cons |
|---|---|---|
| **Prisma** | Schema as documentation, migrations, typed client, familiar to reviewers | Generated client, extra build step, one more concept |
| Drizzle | Lighter, SQL-like, fast tests | Less familiar; migration workflow easier to get wrong |
| `better-sqlite3` raw | Fewest moving parts, direct SQL | Manual migrations, manual typing, more boilerplate per feature |

## Decision

**Option 1: Next.js App Router + Prisma + SQLite**, TypeScript everywhere.

Reasons, by weight:

1. Shortest path to a runnable fullstack app for a React team; the base is the main
   schedule risk.
2. Prisma's schema doubles as the data-model documentation the assignment asks for;
   migrations change the model without ad-hoc SQL.
3. SQLite removes infrastructure risk: clone, install, migrate, run.
4. The downsides (shared files, server/client boundary) are known and handled by
   ADR-004. They are process problems, not blockers.

Rejected option 2: extra scaffold and duplicated types cost more than the clarity
gains at this size. Rejected option 3: the team could not all debug it
independently.

## Consequences

Positive:

- One command to run everything; one language to review.
- Server components keep list/detail simple and fast to build.
- Prisma migration history is evidence of data-model decisions.

Negative / accepted costs:

- `package.json`, `prisma/schema.prisma` and `app/layout.tsx` are single files
  everyone wants to touch. Mitigation: named owners + PR requirement (ADR-004).
- The client/server boundary must be taught once and enforced in review.
- Next.js version-specific API changes (e.g. async route params) can surprise us.
  Mitigation: pin the version, record it here at scaffold time, keep handlers thin.

Harder later:

- A separate mobile client needs real API discipline; route handlers provide part
  of it.
- Moving to Postgres is a datasource change plus migration work, not free.

## How we will know it was a bad decision

- Two people cannot work a week without merge conflicts in shared files → the split
  is wrong; change ADR-004.
- The suite cannot exercise persistence without fighting the framework → reconsider
  the read/write split in ADR-003.
- More than one member cannot run or debug the app alone by the end of week 5 → the
  stack is too opaque.

## Evidence

- Scaffold PR: _TODO_
- CI run on the first green `main`: _TODO_
- Exact versions at scaffold time (Next.js, Prisma, Node): _TODO_
