# ADR-004: Work split — vertical slices with one owner per folder

- Status: Proposed
- Date: 2026-10-25
- Owner: B
- Accepted by: _TODO at kickoff_
- Related: AC-01–AC-31, [project-plan.md §5–6](../project-plan.md#5-ownership-matrix)

## Context

Four people, one small fullstack app, four weeks. Everyone needs a traceable
technical contribution spanning enough of the stack to explain, and nobody may be
blocked waiting. The assignment also requires each person to review a classmate.

Two classic splits fail differently.

## Options considered

### Option 1 — Split by layer (frontend, backend, database, tests)

- **Pros:** clear specialisation; depth in one area.
- **Cons:** the backend person blocks everyone; the test person has nothing to test
  until features exist; the frontend invents a contract the backend did not agree
  to; individual contributions become hard to separate ("I built the UI" is not a
  verifiable behaviour). Rejected.

### Option 2 — Split by feature, each person builds the whole slice

- A slice = spec/AC → validation → service → handler → UI → tests → docs.
- **Pros:** each person owns a behaviour end to end, matching the examination
  ("show and explain the verification of your own contribution"); parallel work; no
  layer bottleneck; failures are local.
- **Cons:** high conflict risk in shared files (`layout`, `package.json`,
  `schema.prisma`, API routes); inconsistent patterns without conventions;
  integration still needs an owner.

### Option 3 — Pair everything, no individual ownership

- **Pros:** knowledge sharing.
- **Cons:** the assignment assesses individual, traceable work. Pairing is used for
  the base and reviews, not ownership.

## Decision

**Option 2: vertical slices**, with guardrails:

1. **One owner per folder** (project-plan §5). Code ownership is stable; only
   process roles rotate weekly.
2. **Shared files have named owners** and change only through a reviewed PR.
3. **All `app/api/**/route.ts` files are base-owned re-exports** with no logic, so
   two owners can add methods to the same URL without editing the same file.
   Handlers live in the feature folder as `handler.ts`.
4. **Contracts freeze before feature work**: data model (C), error envelope (D),
   ACs (A), UI primitives (B). Day 2 of week 5 is the freeze.
5. **Stubs first**: every slice gets an owned handler and page stub on day 2.
6. **The detail page is composed, not shared**: B owns the page; C and D own the
   components it imports.
7. **Pairs review each other** (A↔B, C↔D), swapped once mid-project.
8. **Each slice is self-contained** under `src/features/`. No imports between
   feature folders; shared server code goes to `src/lib`, shared UI to
   `src/components/ui`.
9. **Shared UI is built once.** B owns `src/components/ui/**`; every primitive has
   a component test and appears on `/dev/ui`. A slice requests a variant from B
   instead of copying.
10. **Base gate before individual work:** `BASE-01` (all), `BASE-02` (UI),
    `QUERY-01` (data), timeboxed to day 1–2. Every slice is fullstack, so A/C/D
    write red tests and UI after `BASE-02` and wire the DB after `QUERY-01`.

The four slices:

| Owner | Slice | Why this slice |
|---|---|---|
| A | Create + validation | Exercises the full path and produces the richest boundary/error tests |
| B | List + detail (+ search) | Exercises read paths, UI states and accessibility |
| C | Status workflow + history | Exercises domain rules, transactions and persistence |
| D | Notes + error UX + test harness/CI | The complementary function plus the cross-cutting quality net |

## Consequences

Positive:

- Each person has a defensible end-to-end contribution with their own ACs, tests
  and PRs.
- No single person can block all progress after day 2.
- Reviews are meaningful because the reviewer knows the shared contract.

Negative / accepted costs:

- The base must be built first, together. If it slips, everything slips.
  Countermeasure: a day-1 gate; tracks write red tests and UI as soon as `BASE-02`
  is green.
- Shared-file discipline is a social rule, not compiler-enforced. Countermeasure:
  `CODEOWNERS` (once handles are filled in) and the review checklist.
- Cross-cutting concerns (error envelope, UI primitives) must be agreed early.
  Countermeasure: ADR-003 and B's UI kit land on day 1.
- Integration is nobody's slice and everybody's job. Countermeasure: twice-weekly
  integration checkpoints and D as release owner.

## How we will know it was a bad decision

- The same file appears in two people's PRs in one week → the boundary is wrong;
  fix the folder split, do not just resolve conflicts faster.
- Someone cannot explain how their slice uses the shared layers → slices are too
  isolated.
- Integration takes more than one session per week → too much was implicit.

## Evidence

- Ownership matrix: [project-plan.md §5](../project-plan.md#5-ownership-matrix)
- First four merged slices: _TODO_
- Review log: [reviews.md](../reviews.md)
