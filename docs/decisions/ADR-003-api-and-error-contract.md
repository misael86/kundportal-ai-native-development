# ADR-003: API, error envelope and read/write split

- Status: Proposed
- Date: 2026-10-25
- Owner: D
- Accepted by: _TODO at kickoff_
- Related: AC-01–AC-27

## Context

Four people implement separate slices. They need one predictable backend interface,
one error shape the UI can render, and a test seam that needs no browser. Next.js
offers three ways to mutate data: route handlers, server actions, direct service
calls from server components. Mixing them produces several paths for one behaviour
and ambiguous tests.

## Options considered

### Option 1 — Route handlers for writes, services for reads (chosen)

- `GET` pages are server components that call query services directly.
- `POST`/`PATCH` go through `app/api/**` route handlers, called from small client
  components with `fetch`.
- Handlers are thin: parse → validate → call service → map result to HTTP.

**Pros:** handlers are importable and callable in Vitest with a `Request`, so the
HTTP contract is testable without a server or browser. Reads stay simple. One
obvious write path.

**Cons:** two ways to reach the service layer (direct for reads, handler for
writes). The UI can drift if a page bypasses the contract. Two concepts to learn.

### Option 2 — Server actions for all writes

**Pros:** less client JavaScript; forms work without `fetch`; idiomatic Next.js.
**Cons:** harder to test in isolation (framework-coupled); error serialisation less
explicit; poor fit for a team learning HTTP contracts.

### Option 3 — Route handlers for everything, client components everywhere

**Pros:** one path, very explicit.
**Cons:** more client code; loading/error states on every page; loses the main App
Router benefit; more to review.

### Error shape alternatives

| Shape | Verdict |
|---|---|
| Bare string body | Rejected — cannot carry field errors or codes |
| `{ error: "message" }` | Rejected — no machine-readable code |
| `{ error: { code, message, fieldErrors?, details? } }` | **Chosen** — stable, renderable, testable |
| `{ data }` on success | **Chosen** — consistent with the error envelope |

## Decision

**Option 1**, with the envelope in
[specification.md §8](../specification.md#8-error-contract).

- Every success is `{ "data": ... }`; list responses add
  `{ "meta": { "total": n } }`.
- Every error is `{ "error": { code, message, fieldErrors?, details? } }`.
- Codes: `VALIDATION_ERROR` (400), `NOT_FOUND` (404), `INVALID_TRANSITION` (409),
  `INTERNAL_ERROR` (500).
- Validation happens once per slice, at the handler boundary, with Zod. Services
  assume validated input but still enforce domain rules (transitions, foreign
  keys).
- Handlers never leak stack traces, SQL or Prisma errors. Unknown errors map to
  `INTERNAL_ERROR`; detail is logged server-side.

## Consequences

Positive:

- Tests call `POST(request)` and assert status, body and database state — exactly
  the level the ACs describe.
- The UI has one error parser and one place to show messages.
- New endpoints follow a template, so AI-generated handlers are easier to review.

Negative / accepted costs:

- Reads do not exercise the HTTP contract. Covered by service integration tests and
  one manual walkthrough; state this in the verification plan.
- A route handler re-exported from `app/api` must keep its signature; the re-export
  file is base-owned (ADR-004).
- Next.js route params are async in recent versions. Tests pass
  `{ params: Promise.resolve({ id }) }`. Documented once in `AGENTS.md`.

## How we will know it was a bad decision

- Handler tests need a running server or browser → the seam is wrong.
- The same behaviour is implemented in both a page and a handler → delete one.
- Error rendering differs between slices → the shared parser is not used.

## Evidence

- Shared helpers: `src/lib/errors.ts`, `src/lib/http.ts` — _TODO_
- Example handler test: _TODO_
- First PR using the envelope: _TODO_
