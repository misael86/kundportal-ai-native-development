# ADR-002: Complementary function and status workflow

- Status: Proposed
- Date: 2026-10-25
- Owner: A
- Accepted by: _TODO at kickoff_
- Related: AC-12–13, AC-18–24

## Context

The assignment requires **at least one** complementary function, specified before
implementation. It also lets us shape the status model if we document and justify
it. Both choices affect four people's work, so they must be settled before UI work.

Candidates from the brief: internal notes, assignment to a handler, search/filter,
case history.

## Options considered

### A. Internal notes (chosen as required)

- A note has `author`, `body`, `createdAt`, and belongs to exactly one case.
- **Pros:** realistic for customer service; small UI; excellent error paths (empty
  note, unknown case, wrong case); fits the data model without touching the
  workflow.
- **Cons:** needs an authorship decision without authentication; adds a second
  entity and a detail-page panel.

### B. Assignment to a handler

- **Pros:** visible on the list; business-relevant.
- **Cons:** without login, "handler" is free text or a fake list; the interesting
  behaviour (filter by me, reassignment) needs identity we lack. Weak tests.

### C. Search and filter

- **Pros:** improves the list; cheap once the list exists; easy to test.
- **Cons:** thin as the *only* complementary function — a query, not a workflow.
  Better as a should-have on top of the list.

### D. Case history / audit trail

- **Pros:** supports traceability, the course theme.
- **Cons:** derived from status changes; standalone it needs its own write path.
  Best as a by-product of the workflow.

## Decision

1. **Internal notes is the required complementary function** (AC-20–24).
2. **Status history is a should-have by-product** of every successful transition,
   written in the same transaction (AC-18–19). It gives the detail page depth
   without a second feature owner.
3. **Search and filter is a should-have** on the query slice (AC-12–13), only after
   all must-have ACs are green.
4. **Assignment is out of scope**, recorded as `type:idea` in the backlog.

**Status workflow:** four statuses (`NEW`, `IN_PROGRESS`, `WAITING_ON_CUSTOMER`,
`CLOSED`) governed by [specification.md §5](../specification.md#5-status-workflow).
`CLOSED` is terminal. Same-status transitions are rejected with `409`.

## Consequences

Positive:

- The required complementary function is genuinely testable, not a checkbox.
- History appears almost for free and gives the detail page content.
- The matrix creates a real, defensible error path (`409`), not only enum
  validation.

Negative / accepted costs:

- Notes need an author field. Without authentication it is free text — a known
  limitation to state in the verification plan.
- The UI must compute valid next statuses; no simple "any status" dropdown.
- History adds a transaction and a second table. If we fall behind, cut history
  first: it is a should-have.

## How we will know it was a bad decision

- Notes cannot be finished by the end of week 6 → cut history and search, not notes.
- The matrix blocks a demo flow the examiner expects → add a documented edge (e.g.
  reopen from `CLOSED`) via a superseding ADR, with tests.

## Evidence

- Spec: [§5](../specification.md#5-status-workflow),
  [§9.3–9.4](../specification.md#93-status-workflow--owner-c)
- Implementation PRs: _TODO_
- Tests: _TODO_
