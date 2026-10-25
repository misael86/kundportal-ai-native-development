# Verification plan

Status: **Living document.** Owner: D. Everyone contributes results for their own
slice; D keeps the structure and the final summary.

This plan answers four questions:

1. **What** do we test? (test inventory, linked to ACs)
2. **How and why** at this level?
3. **What did the runs actually show?** (real output, not intentions)
4. **What do the checks not show?** (limits, manual checks, planned vs done)

The ACs are in [specification.md §9](specification.md#9-acceptance-criteria).

---

## 1. Strategy

Test at the **lowest level that can still prove the behaviour**, plus one manual
walkthrough for what automation cannot judge (wording, usability).

```
        manual walkthrough        (few, human judgement)
      ┌───────────────────────┐
      │  E2E smoke (optional) │       1 test, browser
      ├───────────────────────┤
      │  component tests      │       form errors, empty states
      ├───────────────────────┤
      │  HTTP handler tests   │       status codes, envelope, validation
      ├───────────────────────┤
      │  service + real DB    │       persistence, transactions, queries
      ├───────────────────────┤
      │  unit tests           │       transitions, pure validation helpers
      └───────────────────────┘
```

| Level | Tool | What it proves | What it misses |
|---|---|---|---|
| Unit | Vitest | Pure rules: transition matrix, trimming, length boundaries | Storage, HTTP, UI |
| Integration | Vitest + Prisma + temp SQLite | Data persists, queries filter correctly, transactions roll back | HTTP mapping, UI rendering |
| Handler | Vitest, calling `POST`/`GET`/`PATCH` with a `Request` | Status codes, error envelope, validation, field errors | Browser, client state, navigation |
| Component | Vitest + React Testing Library | Error message rendering, empty state, disabled controls | Real network, real DB, visual quality |
| E2E smoke | Playwright (optional) | One path through the real browser | Everything off that path; slow and flaky |
| Manual | Human | Wording, layout, "is this understandable?" | Repeatability, regression safety |

**Why this mix:** the required behaviours are mostly rules and persistence, which
integration and handler tests prove cheaply. Browser automation is not required and
would cost more than it adds. Component tests cover what handler tests cannot:
whether an error reaches the user readably.

**Why not only unit tests:** a validator unit test passes even if the handler never
calls it, and a mocked Prisma test passes even if nothing is written. Both give
false confidence about AC-01 and AC-26.

**Why not only E2E:** slow, flaky in CI, and a failure says little about which rule
broke.

### 1.1 TDD evidence

Every issue follows red-green-refactor
([CONTRIBUTING.md §4](../CONTRIBUTING.md#4-commits-and-the-test-driven-loop)):

1. Agree the feature brief (`docs/features/<issue-id>.md`).
2. Write the failing test at the level named in §3.
3. Run it and confirm it fails **for the right reason**.
4. Paste the red output in the PR (or keep a separate `test:` commit).
5. Implement the minimum, then refactor with the suite green.

The red run is part of the evidence. A test file written after the code still counts
as a test, not as TDD; do not claim otherwise. The results log in §5 records the red
and green run per slice.

---

## 2. Test data and isolation

- Tests use a **separate SQLite file** per run (e.g. `file:./.tmp/test-<pid>.db`),
  never `data/portal.db`.
- The test database is migrated from the same Prisma schema as development, so
  schema drift is caught.
- Each test starts from a known state (truncate or a fresh file), so order does not
  matter.
- Fixtures are fictional: Swedish-sounding names and case text, no real people,
  e-mails or organisations.
- `npm run db:reset` recreates the development database and seeds demo data. Tests
  never use it.

Open item: confirm the exact Prisma test-database helper once the scaffold exists
(issue BASE-01).

---

## 3. Test inventory

Status: `Planned` → `Written` → `Passing` / `Failing` → `Reviewed`. Fill the file
column with the real path when written.

### 3.1 Create — A

| AC | Behaviour | Level | Test file / test name | Expected | Status |
|---|---|---|---|---|---|
| AC-01 | Valid case is stored and readable | H + I | `create/handler.test.ts`, `create/service.test.ts` | `201`; row exists with `NEW`, server `createdAt` | Planned |
| AC-02 | Each missing required field is rejected | H + I | parametrised over title/description/category/priority | `400`; `fieldErrors.<field>`; row count unchanged | Planned |
| AC-03 | Whitespace-only title/description rejected | U + H | schema unit + handler | `400`; nothing stored | Planned |
| AC-04 | Length boundaries 3/120 and 10/2000 | U + H | boundary table | min/max accepted; min−1/max+1 rejected | Planned |
| AC-05 | Unknown category/priority rejected | U + H | enum table | `400`; nothing stored | Planned |
| AC-06 | Client cannot set id/status/createdAt | H + I | handler with hostile payload | server values win | Planned |
| AC-07 | Malformed/empty JSON | H | handler with bad body | `400`, not `500` | Planned |

### 3.2 Query — B

| AC | Behaviour | Level | Test file / test name | Expected | Status |
|---|---|---|---|---|---|
| AC-08 | List returns all, newest first | I + H | `query/service.test.ts`, `handler.test.ts` | ordered by `createdAt DESC`, `id DESC` | Planned |
| AC-09 | Empty state | C + M | list component | message shown, no error | Planned |
| AC-10 | Detail of existing case | I + H + C | detail service/handler/component | full case rendered | Planned |
| AC-11 | Unknown / non-numeric id | H + C + M | detail | `404`; friendly UI + link back | Planned |
| AC-12 | Filter by status/category; invalid filter | I + H | query service | only matches; invalid → `400` | Planned |
| AC-13 | Text search, case-insensitive | I + H | query service | matches title or description | Planned |

### 3.3 Workflow — C

| AC | Behaviour | Level | Test file / test name | Expected | Status |
|---|---|---|---|---|---|
| AC-14 | Valid transition persists | I + H | `workflow/service.test.ts`, `handler.test.ts` | `200`; re-read shows new status | Planned |
| AC-15 | Unknown status value | H + I | handler | `400`; stored status unchanged | Planned |
| AC-16 | Disallowed transition | U + H + I | transition unit + handler | `409 INVALID_TRANSITION`; status and history unchanged | Planned |
| AC-17 | Unknown case id | H | handler | `404` | Planned |
| AC-18 | History row per success, transaction | I | service | exactly one row; rollback leaves none | Planned |
| AC-19 | History rendering | C + M | status/history component | chronological | Planned |

### 3.4 Notes — D

| AC | Behaviour | Level | Test file / test name | Expected | Status |
|---|---|---|---|---|---|
| AC-20 | Note attached to the right case | I + H | `notes/service.test.ts`, `handler.test.ts` | `201`; linked by `caseId`; no other case sees it | Planned |
| AC-21 | Empty/whitespace note rejected | U + H + I | schema + handler | `400`; no row | Planned |
| AC-22 | Note on unknown case | H + I | handler | `404`; no row | Planned |
| AC-23 | Notes listed oldest first, scoped to case | I + C + M | notes panel | correct order, no leakage | Planned |
| AC-24 | Missing author rejected | H | handler | `400` | Planned |

### 3.5 Cross-cutting — D

| AC | Behaviour | Level | Test file / test name | Expected | Status |
|---|---|---|---|---|---|
| AC-25 | Readable error in the UI, input preserved | C + M | form/status/notes components | message shown; values kept | Planned |
| AC-26 | Persistence across restart | I + M | integration: new client on same file | case still present | Planned |
| AC-27 | CI: install, lint, typecheck, all tests, build | CI | `.github/workflows/ci.yml` | green on the final commit | Planned |

### 3.6 Accessibility and mobile — B, supported by all

| AC | Behaviour | Level | Test file / test name | Expected | Status |
|---|---|---|---|---|---|
| AC-28 | Mobile-first reflow at 320 px | C + M | component layout assertions + manual | no horizontal scroll; one column; action reachable | Planned |
| AC-29 | Keyboard and visible focus | C + M | component focus assertions + manual | all controls reachable, focus visible, no trap | Planned |
| AC-30 | Names, labels, errors and status text | C + M | component role/name assertions + manual | labels and `aria-describedby` correct; no colour-only status | Planned |
| AC-31 | Contrast and target size | M | manual with a contrast checker and DOM measurement | 4.5:1 text, 3:1 UI, 24 × 24 px targets | Planned |

---

## 4. How to run

To be completed with the scaffold (issue BASE-01). Target:

```bash
npm install
npm run check      # lint + typecheck + all tests
npm test           # tests only
npm run db:reset   # reset the local demo database
npm run dev        # run the app
```

A single test or file:

```bash
npm test -- create
npm test -- src/features/notes/service.test.ts
```

### 4.1 What CI must do

CI runs on every pull request **and** every push to `main`:

1. `npm ci` — install exactly the lockfile.
2. `npm run lint`.
3. `npm run typecheck`.
4. `npm run test` — **all** tests, no path filter, no `--changed`, no skipped suite.
   A skipped test is a failed test unless the issue documents why.
5. `npm run build`.

The job fails if any step fails. The PR branch must be up to date with `main`; a
green run on an old base is not evidence.

Branch protection on `main` (enabled before feature work):

- pull request required, with **at least one approving review**;
- stale approvals dismissed when new commits arrive;
- all review conversations resolved;
- the CI check becomes a required status check as soon as `BASE-01` creates the
  workflow — until then, "CI green" is a review obligation;
- direct pushes, force pushes and branch deletion blocked, for admins too;
- squash merge is the only enabled merge method.

Exact settings: [CONTRIBUTING.md §5](../CONTRIBUTING.md#5-pull-requests).

---

## 5. Results log

Add a row for every recorded run. Do not summarise a run you did not do. Attach the
command and the count, and link the CI run or paste the output tail.

| Date | Commit | Red run (test first) | Green run (`npm run check`) | Notes |
|---|---|---|---|---|
| _TODO_ | | | | |

**Final result (fill in at M4):**

- Tests: _TODO_ passed / _TODO_ total
- CI on final commit: _TODO_ (link)
- Manual walkthrough: _TODO_ (who, when, what they managed)

---

## 6. Manual checks

Automation cannot judge whether a message is understandable. These checks are
planned, then marked done with the observer's name.

| ID | Check | Why manual | Status |
|---|---|---|---|
| M-01 | Submit an empty form; is the message understandable and next to the field? | Wording and layout | Planned |
| M-02 | Submit a case with only spaces in the title; what does the user see? | Boundary + wording | Planned |
| M-03 | Try an invalid status change through the API; is the UI still consistent after reload? | Reconciliation | Planned |
| M-04 | Open a nonexistent case URL; is there a way back? | Navigation | Planned |
| M-05 | Add two notes to two different cases; are they shown in the right place? | Visual scoping | Planned |
| M-06 | Restart the app; is the data still there? | Real process restart | Planned |
| M-07 | Follow the runbook on a clean clone as an outsider | The runbook itself | Planned |
| M-08 | Open list, form and detail at 320 px and 375 px width | Mobile-first reflow (AC-28) | Planned |
| M-09 | Complete a create, a status change and a note using only the keyboard | Keyboard order, visible focus, no trap (AC-29) | Planned |
| M-10 | Inspect the accessibility tree: input names, headings, landmarks, error announcements | Semantics and error association (AC-30) | Planned |
| M-11 | Measure text, badge and alert contrast | Contrast (AC-31) | Planned |
| M-12 | Zoom to 400 % and use the list and form | Reflow under zoom (AC-28) | Planned |
| M-13 | Measure interactive target sizes and use them one-handed | Target size (AC-31) | Planned |

Record the observer and outcome in the results section. A manual check is not
evidence of automation, and vice versa.

---

## 7. Negative controls (VG evidence)

A passing test means something only if it can fail for the right reason. Each owner
performs at least one deliberate break and records it:

| Owner | Break | Expected | Recorded result |
|---|---|---|---|
| A | Remove `.trim()` from the title schema | AC-03 test fails | _TODO_ |
| B | Return `[]` instead of querying | AC-08 test fails | _TODO_ |
| C | Write the status update without the history insert | AC-18 test fails | _TODO_ |
| D | Skip the DB write in the notes service | AC-20 test fails | _TODO_ |
| D | Disconnect persistence in the create path | AC-26/AC-01 test fails, proving the test is not a mock | _TODO_ |

If a break does **not** make the test fail, the test is wrong. Fix it before
continuing. Paste the failing output in the PR or here — strong evidence for
"critical review and adapted control".

---

## 8. Limitations — what these checks do not show

State these honestly in the final version.

1. **Handler tests are not the browser.** They prove the contract, not that a
   component calls it correctly or renders the result. Component tests and the
   manual walkthrough cover part of the gap, not all.
2. **No authentication**, so authorisation and abuse cases are untested by design.
3. **SQLite only.** Concurrency under load and Postgres-specific constraints are
   untested. The app is local and single-user.
4. **Free-text author** on notes is not verified against a user directory.
5. **`String.length` boundaries** count UTF-16 units; emoji edge cases are not
   tested beyond the documented rule.
6. **Accessibility** is checked manually and with component semantics, not with a
   full assistive-technology audit.
7. **Visual quality** is not automated.
8. **Test count and coverage percentage are not quality measures.** Many shallow
   tests prove less than a few that fail when the behaviour is removed.

---

## 9. Coverage of the assignment's example categories

| Category | Our cases |
|---|---|
| Happy path | AC-01, AC-08, AC-10, AC-14, AC-20, AC-26 |
| Error path | AC-02, AC-05, AC-07, AC-11, AC-15, AC-16, AC-17, AC-21, AC-22, AC-25 |
| Boundary | AC-03 (whitespace), AC-04 (min/max lengths), AC-12 (invalid filter), AC-16 (terminal status) |
| Complementary function | AC-20–AC-24 (notes: correct case, empty note, unknown case, ordering) |

Every **M** AC has at least one automated test. The error paths are those a real
handler can trigger through the UI, not artificial invalid input.
