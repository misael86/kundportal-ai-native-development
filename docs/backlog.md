# Backlog

Owner: A. Issues live in GitHub with labels and milestones; GitHub holds status.
This file explains the shape, the gate and the order.

## Rules for this backlog

1. **Every feature issue is fullstack.** UI, endpoint/service and tests together.
   No "backend only" or "frontend only" slices.
2. **Every feature issue leaves a behaviour you can demonstrate and a test that
   fails if that behaviour is removed.**
3. **A slice includes what it needs:** model, endpoint, UI, tests. Not four issues.
4. **Shared infrastructure folds into the first slice that proves it** — except the
   base gate, isolated because nothing can be verified without it.
5. **Brief before code.** Each issue starts with `docs/features/<issue-id>.md`
   from [`docs/features/_template.md`](features/_template.md), agreed with the
   pair. The brief and the PR must match.
6. **TDD is the default.** Test written first and seen failing for the right
   reason. The PR shows the red run; the implementation follows.
7. **One feature, one folder.** A slice lives in `src/features/<area>/` and does
   not import from another. Reuse goes through `src/components/ui` (B) or
   `src/lib` (C/D).
8. **No duplication of shared UI.** Use the primitive from `src/components/ui`. If
   it is missing, B adds it with a test; the slice does not fork it.
9. **Documentation is not an issue per feature.** It is part of the Definition of
   Done and the weekly status.

**"Worth by itself" test:** if we stopped after this issue, could someone use or
demo something, and would a test catch it breaking? If not, it is not an issue.

---

## The four individual tracks (all fullstack)

Each person owns one track. Every core issue touches the database, the API and the
UI.

| Person | Track | Frontend | Backend | Tests |
|---|---|---|---|---|
| **A** | **Create** | Create form, field errors, preserved input | `POST /api/cases`, create service, validation rules, persistence | unit (rules), handler (contract), component (form), integration (row exists) |
| **B** | **Browse** | List, empty state, detail, 404, search/filter | Case model + seed, `GET /api/cases`, `GET /api/cases/:id` | integration (persistence/ordering), handler (200/404/400), component (empty/not-found) |
| **C** | **Workflow** | Status control, history list | Transition rules, `PATCH /api/cases/:id/status`, transaction + history | unit (matrix), handler (200/400/409), integration (persisted/unchanged), component |
| **D** | **Notes & errors** | Note form, notes panel, error banners | Note model, `POST`/`GET /api/cases/:id/notes`, consistent error mapping | unit (note rules), handler (201/400/404), integration (scoping), component |

Shared optional work (`QUERY-03` search/filter, `UI-01` accessibility) goes to
whoever has capacity after the core track is green. It is not a fifth track.

---

## Base gate — what blocks individual work

| Gate | Issue | Blocks | Why first |
|---|---|---|---|
| **Gate 1** | `BASE-01` | **All work** | No test framework, CI, app or API shell means no one can prove anything. |
| **Gate 2** | `BASE-02` | **All UI work** | Shared primitives and the shell must exist, or every slice invents its own button and error banner. |
| **Gate 3** | `QUERY-01` | **All data-dependent work** | It lands the first schema, migration, seed and query. Every other feature reads or writes those tables. |

There is **no pure-backend exception**: every feature slice is fullstack. A, C and D
start UI components and failing tests after Gate 2, and wire the database after Gate
3. The base is timeboxed to day 1–2 of week 5.

---

## Milestone M1 — Base and first fullstack slice (week 5, day 1–2)

| ID | Class / gate | What you can do when it is done | Proof (TDD target) | AC | Owner | Depends on |
|---|---|---|---|---|---|---|
| **BASE-01** #1 | Base — **Gate 1** | Run the app, get `200` from `/api/health`, run every test locally and in CI, and watch CI go red when one test is broken. | Failing health test first; a throwaway branch with a broken test turns CI red; CI runs install, lint, typecheck, **all** tests and build on every PR; `npm run check` documented. | AC-27 | D | — |
| **BASE-02** #2 | Base — **Gate 2** | Open `/dev/ui` and see every shared primitive in its states, usable at 320 px and with the keyboard. | Component test per primitive written first (name, role, label, focus, `aria-describedby`); Alert renders the `{ error }` envelope; mobile-first styles; manual style guide. | AC-25, AC-28–AC-31 (shared part) | B | BASE-01 |
| **QUERY-01** #3 | Foundation — **Gate 3** | See seeded cases newest-first, an empty state, and they survive a restart. | Integration test (create → reopen DB → list) first; handler ordering; component empty state; manual restart. | AC-08, AC-09, AC-26 | B | BASE-01, BASE-02 |

**M1 exit:** all four run the app and tests; the list page is demoable end to end;
the shared primitives are used by it; each person has written their first failing
tests for their track.

---

## Milestone M2 — Four fullstack tracks (week 6)

### A — Create

| ID | What you can do when it is done | Proof (TDD target) | AC | Depends on |
|---|---|---|---|---|
| **CREATE-01** #4 | Fill in the form, submit, and see the new case in the list. The server owns `id`, `status = NEW` and `createdAt`, even if the client sends them. | Handler test for `201` + read-back and a hostile payload first; component test for form submit; manual. | AC-01, AC-06 | Gate 1–3 |
| **CREATE-02** #7 | Submit a missing field, a title of only spaces, a bad category, an out-of-range length or malformed JSON and get `400` with a message next to the field. The form keeps what you typed and nothing is saved. | Unit tests for every rule and boundary first; handler test per failure; integration asserts row count unchanged; component test. | AC-02, AC-03, AC-04, AC-05, AC-07, AC-25 | CREATE-01 |

### B — Browse

| ID | What you can do when it is done | Proof (TDD target) | AC | Depends on |
|---|---|---|---|---|
| **QUERY-02** #6 | Open a case and see every field; open a missing case and get a friendly message with a way back. | Handler `200`/`404` first; component test for not-found; manual `/cases/999999`. | AC-10, AC-11 | QUERY-01 |
| **QUERY-03** #11 | Filter by status/category and search title/description; an invalid filter returns `400`. *(Should)* | Integration/handler tests per filter first; manual. | AC-12, AC-13 | QUERY-01 |
| **UI-01** #15 | Use the list, form and detail at 320 px and with the keyboard; the UI meets WCAG 2.2 AA: labels, visible focus, contrast, 24 × 24 px targets and no colour-only status. *(Must, shared)* | Component assertions for roles, names, labels, `aria-describedby` and focus first; manual checks M-08–M-13. | AC-28, AC-29, AC-30, AC-31 | QUERY-02, CREATE-02, FLOW-01, NOTE-02 |

### C — Workflow

| ID | What you can do when it is done | Proof (TDD target) | AC | Depends on |
|---|---|---|---|---|
| **FLOW-01** #5 | Move a case New → In progress → Waiting on customer → Closed from the detail page. The UI offers only valid targets; an illegal move is rejected and the case is unchanged. | Unit tests for the matrix first; handler/integration for valid, unknown and illegal moves; component test; manual. | AC-14, AC-15, AC-16, AC-17 | Gate 1–3, QUERY-02 for page composition |
| **FLOW-02** #9 | See the case's status changes in order; a failed change leaves no history row. *(Should)* | Integration transaction test first (one row on success, zero on failure); component test; manual. | AC-18, AC-19 | FLOW-01 |

### D — Notes & errors

| ID | What you can do when it is done | Proof (TDD target) | AC | Depends on |
|---|---|---|---|---|
| **NOTE-01** #10 | Add an internal note from the case detail page. An empty note or a note on a missing case is rejected and nothing is saved. | Unit tests for note rules first; handler/integration for `201`, `400`, `404`; component test; manual. | AC-20, AC-21, AC-22, AC-24 | Gate 1–3, QUERY-02 for page composition |
| **NOTE-02** #13 | Read the case's notes on its detail page, oldest first, and never see another case's notes. | GET handler + integration scoping test first; component test; manual. | AC-23 | NOTE-01, QUERY-02 |
| **UX-01** #14 | When a create, status change or note fails, every path shows a readable message, keeps the input and uses the same error shape. | Component tests per failure path first; handler tests for consistent mapping; manual. | AC-25 | CREATE-02, FLOW-01, NOTE-01 |

**M2 exit:** every **M** AC is implemented, demoable, covered by a test seen failing
first, and reviewed.

---

## Milestone M3 — Prove the tests are real (week 7)

| ID | Class | What you can do when it is done | Proof (artifact) | AC | Owner | Depends on |
|---|---|---|---|---|---|---|
| **HARD-01** #16 | Show, for each slice, that removing the behaviour makes its test fail. Record the failing output and the suite's limits. | One broken run per slice (create, list, status, notes, persistence); filled results log. | supports all M | all (D drives) | M2 |
| **HARD-02** #17 | Hand the runbook to someone outside the team and watch them run the app, tests and demo without help. | Session notes, issues found, runbook diff, success confirmation. | runbook requirement | B | CREATE-02, FLOW-01, NOTE-02 |
| **HARD-03** #18 | Create a case through a real browser as a smoke test. *(Stretch)* | Playwright spec written first, then passing. | supports AC-01/08/25 | D | CREATE-01 |

---

## Milestone M4 — Delivery (week 8)

| ID | Class | What you can do when it is done | Proof (artifact) | AC | Owner | Depends on |
|---|---|---|---|---|---|---|
| **REL-01** #19 | An examiner opens the course PR, finds the final commit, runs the app and tests from the runbook, and follows a rehearsed demo. | Final commit linked; CI green on it; timed demo; links checked. | AC-27 + delivery | D | HARD-01, HARD-02 |

---

## Issue map

| ID | Issue | ID | Issue |
|---|---|---|---|
| BASE-01 | [#1](https://github.com/misael86/kundportal-ai-native-development/issues/1) | NOTE-01 | [#10](https://github.com/misael86/kundportal-ai-native-development/issues/10) |
| BASE-02 | [#2](https://github.com/misael86/kundportal-ai-native-development/issues/2) | QUERY-03 | [#11](https://github.com/misael86/kundportal-ai-native-development/issues/11) |
| QUERY-01 | [#3](https://github.com/misael86/kundportal-ai-native-development/issues/3) | NOTE-02 | [#13](https://github.com/misael86/kundportal-ai-native-development/issues/13) |
| CREATE-01 | [#4](https://github.com/misael86/kundportal-ai-native-development/issues/4) | UX-01 | [#14](https://github.com/misael86/kundportal-ai-native-development/issues/14) |
| FLOW-01 | [#5](https://github.com/misael86/kundportal-ai-native-development/issues/5) | UI-01 | [#15](https://github.com/misael86/kundportal-ai-native-development/issues/15) |
| QUERY-02 | [#6](https://github.com/misael86/kundportal-ai-native-development/issues/6) | HARD-01 | [#16](https://github.com/misael86/kundportal-ai-native-development/issues/16) |
| CREATE-02 | [#7](https://github.com/misael86/kundportal-ai-native-development/issues/7) | HARD-02 | [#17](https://github.com/misael86/kundportal-ai-native-development/issues/17) |
| FLOW-02 | [#9](https://github.com/misael86/kundportal-ai-native-development/issues/9) | HARD-03 | [#18](https://github.com/misael86/kundportal-ai-native-development/issues/18) |
| | | REL-01 | [#19](https://github.com/misael86/kundportal-ai-native-development/issues/19) |

Closed as merged: #8 (create errors → CREATE-02) and #12 (history → FLOW-02).

---

## Dependency picture

```
BASE-01 (Gate 1, all work)
  └─ BASE-02 (Gate 2, UI)
       └─ QUERY-01 (Gate 3, schema + list)
            ├─ CREATE-01 ── CREATE-02 ──┐
            ├─ QUERY-02 ──┬─ QUERY-03   │
            │             ├─ FLOW-01 ── FLOW-02
            │             └─ NOTE-01 ── NOTE-02
            └───────────────────────────┴─ UX-01
```

B is the early critical path (`QUERY-01`, then `QUERY-02`). C and D can build
components and failing handler tests before the detail page exists; B composes
them. A starts as soon as `QUERY-01` lands.

---

## Why these are not separate issues

| Tempting issue | Why it is folded in |
|---|---|
| Backend-only validation rules | Leaves A with no UI. First half of CREATE-02. |
| Backend-only transition matrix | Leaves C with no UI. First half of FLOW-01. |
| Shared types and Prisma client | Only worth anything when a real query uses them → QUERY-01 |
| Error envelope helper | Proven by a real failure → BASE-02 and CREATE-02 |
| API route shells | Re-export files with no behaviour; created once in BASE-01 |
| Test harness and CI | Part of BASE-01, proven by the health test and a red CI run |
| Stub feature folders | A stub proves nothing; each slice creates its folder when it has behaviour |
| "Write documentation for X" | Part of each issue's DoD and the weekly status |

---

## Parked ideas (`type:idea`, not scheduled)

| Idea | Why parked |
|---|---|
| Assignment to a handler | Needs identity we do not have; weaker tests than notes |
| Authentication | Out of scope per the assignment |
| Pagination / sorting UI | Tiny dataset; adds test surface |
| Notes search | Nice, not needed to prove the complementary function |
| E-mail or channel integration | Explicitly out of scope |
| Dark mode | No requirement, no verification value |

---

## Start order

1. `BASE-01` #1 (D) — Gate 1, blocks everything.
2. `BASE-02` #2 (B) — Gate 2, blocks UI.
3. `QUERY-01` #3 (B) — Gate 3, the first fullstack slice.
4. `CREATE-01` #4 (A), `QUERY-02` #6 (B), `FLOW-01` #5 (C), `NOTE-01` #10 (D).
5. `CREATE-02` #7, `FLOW-02` #9, `NOTE-02` #13, `QUERY-03` #11, `UX-01` #14,
   `UI-01` #15.
6. `HARD-01`–`HARD-03`, then `REL-01`.
