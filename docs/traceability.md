# Traceability matrix

The examiner's fastest route from a requirement to the work that proves it. Update a
row **when you merge**, not at the end. Owner of the table: D; each person fills
their own rows.

Each issue has a feature brief in `docs/features/<issue-id>.md`; link it from the
PR and set its status to `Verified` at merge.

Columns:

- **AC** — from [specification.md](specification.md#9-acceptance-criteria)
- **Issue** — the GitHub issue carrying the work
- **PR / commit** — the change that implements it
- **Test** — the test file and test name
- **Review** — the classmate review (link in [reviews.md](reviews.md))
- **Evidence** — what shows it works (CI run, manual check, negative control)
- **Status** — Planned / In progress / Passing / Reviewed

Issue numbers are filled in. Remaining columns are filled at merge.

---

## Create — A (fullstack)

| AC | Issue | PR / commit | Test | Review | Evidence | Status |
|---|---|---|---|---|---|---|
| AC-01 | #4 | | | | | Planned |
| AC-02 | #7 | | | | | Planned |
| AC-03 | #7 | | | | | Planned |
| AC-04 | #7 | | | | | Planned |
| AC-05 | #7 | | | | | Planned |
| AC-06 | #4 | | | | | Planned |
| AC-07 | #7 | | | | | Planned |

## Query — B (fullstack)

| AC | Issue | PR / commit | Test | Review | Evidence | Status |
|---|---|---|---|---|---|---|
| AC-08 | #3 | | | | | Planned |
| AC-09 | #3 | | | | | Planned |
| AC-10 | #6 | | | | | Planned |
| AC-11 | #6 | | | | | Planned |
| AC-12 | #11 | | | | | Planned |
| AC-13 | #11 | | | | | Planned |

## Workflow — C (fullstack)

| AC | Issue | PR / commit | Test | Review | Evidence | Status |
|---|---|---|---|---|---|---|
| AC-14 | #5 | | | | | Planned |
| AC-15 | #5 | | | | | Planned |
| AC-16 | #5 | | | | | Planned |
| AC-17 | #5 | | | | | Planned |
| AC-18 | #9 | | | | | Planned |
| AC-19 | #9 | | | | | Planned |

## Notes — D (fullstack)

| AC | Issue | PR / commit | Test | Review | Evidence | Status |
|---|---|---|---|---|---|---|
| AC-20 | #10 | | | | | Planned |
| AC-21 | #10 | | | | | Planned |
| AC-22 | #10 | | | | | Planned |
| AC-23 | #13 | | | | | Planned |
| AC-24 | #10 | | | | | Planned |

## Cross-cutting — D, supported by all

| AC | Issue | PR / commit | Test | Review | Evidence | Status |
|---|---|---|---|---|---|---|
| AC-25 | #7, #14, #2 | | | | | Planned |
| AC-26 | #3 | | | | | Planned |
| AC-27 | #1 | | | | | Planned |

## Accessibility and mobile — B, supported by all

| AC | Issue | PR / commit | Test | Review | Evidence | Status |
|---|---|---|---|---|---|---|
| AC-28 | #15, #2 | | | | | Planned |
| AC-29 | #15, #2 | | | | | Planned |
| AC-30 | #15, #2 | | | | | Planned |
| AC-31 | #15, #2 | | | | | Planned |

---

## Decisions

| ADR | Accepted by | PR / date | Evidence that it held |
|---|---|---|---|
| ADR-001 | | | |
| ADR-002 | | | |
| ADR-003 | | | |
| ADR-004 | | | |
| ADR-005 | | | |
