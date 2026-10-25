# Decision log

Every significant choice gets a short Architecture Decision Record (ADR). The point
is that in week 8 someone can answer "why is it like this?" without guessing.

## When to write an ADR

Write one when the choice:

- is hard to reverse (stack, data model, API shape, folder structure),
- affects more than one person's area,
- had a real alternative a reasonable teammate might have picked,
- or you said "we'll just do X" without discussing it.

Do **not** write one for naming a variable or choosing a button colour.

## Format

Copy [template.md](template.md). Keep it under one page. Always include:

1. context and forces,
2. at least two real alternatives,
3. the decision,
4. consequences, including the bad ones,
5. status and date.

## Status values

`Proposed` → `Accepted` → `Superseded by ADR-XXX`. Never delete an ADR; supersede
it, so the reasoning trail survives.

## Index

| ADR | Title | Status | Owner |
|---|---|---|---|
| [001](ADR-001-tech-stack.md) | Tech stack: Next.js fullstack, Prisma, SQLite | Proposed | D |
| [002](ADR-002-complementary-feature.md) | Complementary function and status workflow | Proposed | A |
| [003](ADR-003-api-and-error-contract.md) | API, error envelope and read/write split | Proposed | D |
| [004](ADR-004-work-split.md) | Vertical slices with one owner per folder | Proposed | B |
| [005](ADR-005-ui-quality-baseline.md) | UI quality baseline: WCAG 2.2 AA and mobile-first | Proposed | B |

The kickoff flips them to `Accepted` (or amends them). Add the date and who accepted
when you do.
