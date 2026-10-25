# Claude Code

@AGENTS.md

`AGENTS.md` is the source of truth for this repository. Read it and
`docs/specification.md` before changing code. The summary below is only a
reminder; if it disagrees with `AGENTS.md`, `AGENTS.md` wins.

## Non-negotiables

- Work from the feature brief in `docs/features/<issue-id>.md`.
- Work only inside your owned feature folder; stop and ask at a boundary.
- Write the failing test first, show the red run, then the minimum implementation.
- Do not add dependencies, change the schema or change the API contract without
  the owner and an ADR.
- Use the shared UI primitives; never fork them.
- UI is mobile-first and meets WCAG 2.2 AA (AC-28–AC-31).
- All responses use the `{ data }` / `{ error }` envelope; never leak Prisma or
  SQL details to the client.
- No secrets and no real customer data.
- Run `npm run check`; paste the real output; never claim a result you did not see.
- Every change goes through a PR with at least one approving review and a squash
  merge.
- Write short: no filler, no repetition, lists over paragraphs (`AGENTS.md` §5).

Commands: `npm run check`, `npm test`, `npm run db:reset`, `npm run dev`.

More: [`docs/ai-tooling.md`](docs/ai-tooling.md).
