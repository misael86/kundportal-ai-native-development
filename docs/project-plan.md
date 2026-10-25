# Project plan — Kundserviceportalen

Status: **Proposed** — accepted at the week 5 kickoff.
Owner: A (keep this file current; everyone may propose PRs).

The plan makes the first two days unambiguous, gives each person a **separate area
to own**, and makes every decision traceable.

---

## 1. Team

Fill this in on day 1. These codes are used everywhere else.

| Code | Name | GitHub | Owns (short) | Reviews |
|---|---|---|---|---|
| A | _TODO_ | _TODO_ | Create + validation, specification, AI instructions | B |
| B | _TODO_ | _TODO_ | List + detail + search, UI kit, accessibility | A |
| C | _TODO_ | _TODO_ | Status workflow + history, data model, seed | D |
| D | _TODO_ | _TODO_ | Internal notes, error UX, test harness, CI, verification | C |

Known GitHub accounts at the start of week 5: **@misael86** (owner) and
**@carterleeintel**. Two teammates are not added yet; fill in names, handles and
tracks at the kickoff. The letters A–D are used throughout; only the mapping
changes.

Review pairing: **A↔B**, **C↔D**. Everyone reviews at least one classmate, a course
requirement. Swap pairs once mid-project.

---

## 2. Scope in three tiers

**MVP — green before anything else**

1. Create a case with validation (`AC-01`–`AC-07`).
2. Persist in SQLite and survive restart (`AC-26`).
3. List + detail (`AC-08`–`AC-11`).
4. Status change with workflow rules (`AC-14`–`AC-17`).
5. Internal notes as the complementary function (`AC-20`–`AC-23`).
6. Human-readable error handling in the UI (`AC-25`).
7. Automated tests for happy, error and boundary paths + a runbook (`AC-27`).
8. Mobile-first layout and WCAG 2.2 Level AA (`AC-28`–`AC-31`,
   [ADR-005](decisions/ADR-005-ui-quality-baseline.md)).

**Should — if the MVP is green and reviewed**

- Status history (`AC-18`, `AC-19`).
- Search and filter (`AC-12`, `AC-13`).

**Stretch — only after the should set, never at the cost of tests**

- Assignment to a handler.
- Note search, pagination, sorting UI, keyboard shortcuts.

**Never in this project**

Authentication, e-mail integration, cloud deployment, real customer data.

Rule of thumb: an idea without an AC goes to the backlog as `type:idea` and is
discussed at the weekly checkpoint. It is not implemented "quickly" in passing.

### Individual fullstack tracks

Each person owns one track; every core issue touches the database, the API and the
UI. Nobody is "the backend person" or "the frontend person".

| Person | Track | Frontend | Backend | Tests |
|---|---|---|---|---|
| **A** | **Create** | Create form, field errors, preserved input | `POST /api/cases`, create service, validation, persistence | unit (rules), handler (contract), component (form), integration (row exists) |
| **B** | **Browse** | List, empty state, detail, 404, search/filter | Case model + seed, `GET /api/cases`, `GET /api/cases/:id` | integration (persistence), handler (200/404/400), component |
| **C** | **Workflow** | Status control, history list | Transition rules, `PATCH /api/cases/:id/status`, transaction + history | unit (matrix), handler (200/400/409), integration (unchanged on failure), component |
| **D** | **Notes & errors** | Note form, notes panel, error banners | Note model, `POST`/`GET /api/cases/:id/notes`, error mapping | unit (note rules), handler (201/400/404), integration (scoping), component |

Shared optional work (`QUERY-03` search/filter, `UI-01` accessibility) is picked up
by whoever has capacity after their core track is green. It is not a fifth track.

---

## 3. Milestones

| Milestone | Target | Exit criteria |
|---|---|---|
| **M1 Base** | End of week 5, day 2 | Gates 1–3 merged (`BASE-01`, `BASE-02`, `QUERY-01`); the list slice is demoable end to end; every track has its first red test; all four run the app and tests; spec + ADRs accepted |
| **M2 MVP** | End of week 6 | All **M** ACs implemented and covered by automated tests; notes working; error UX verified manually; runbook works for an outsider |
| **M3 Hardening** | End of week 7 | Boundary + error paths complete; negative controls performed; verification plan has real results; accessibility pass; VG evidence collected; one external walkthrough |
| **M4 Delivery** | Week 8, before the deadline | Feature freeze; final commit marked in the PR; demo rehearsed; individual reports submitted in Disco (not in the repo) |

Deadline: **Friday 13 November 2026, 23:59** (confirm in Disco). Week 8 also has
the team demo on Thursday. Treat M4 as two days earlier than the deadline.

---

## 4. Week 5, day by day

The base is built **once, together**, before any feature code. This is the most
important anti-conflict measure.

### Day 1, morning — kickoff (all four, ~2 h)

| Time | Activity | Output |
|---|---|---|
| 20 min | Read the assignment aloud; list what is explicitly out of scope | Shared understanding |
| 25 min | Walk through [specification.md](specification.md); challenge the ACs | Accepted or amended ACs |
| 20 min | Decide ADR-001/002/003/004 | ADRs flipped to `Accepted` |
| 15 min | Fill the team table and ownership matrix | This file updated |
| 20 min | Create milestones, labels and the M1 issues from [backlog.md](backlog.md) | GitHub board ready |
| 10 min | Agree the weekly meeting slot and review pairs | Calendar |

### Day 1, morning — Gate 1 (blocks everything)

The kickoff table runs first. Then **D alone builds `BASE-01`**: nobody can write a
failing test before the test runner exists. A, B and C do not start parallel
scaffolds; they write their **AC → test-name → expected result** tables (the red
plan) and review the scaffold as it lands.

**Gate 1 exit (timebox: half a day):**

- `BASE-01` merged: app runs, `/api/health` returns `200`, `npm test` and
  `npm run check` work, CI is wired, API route shells exist.
- Everyone pulls `main`, runs the app and tests, and confirms a deliberately broken
  test turns CI red.
- If Gate 1 slips, cut `BASE-02` scope (style guide, extra primitives) — never the
  test harness, CI or route shells.

### Day 1, afternoon — Gate 2 and red tests for every track

| Who | Issue | What it proves by the end of the day |
|---|---|---|
| B | `BASE-02` | Shared primitives with component tests, `/dev/ui`, error banner that renders the envelope |
| A | `CREATE-01` / `CREATE-02` (red) | Failing handler + component tests for the create form and validation |
| C | `FLOW-01` (red) | Failing unit tests for the matrix and failing handler/component tests for the status control |
| D | `NOTE-01` (red) | Failing handler/component tests for the note form, plus the Note model proposal for C's review |

No database yet, but UI components can be built against the shared primitives once
`BASE-02` lands, and handler tests can be written against the agreed contract. This
is the TDD red phase for each track.

### Day 1, end — integration checkpoint (30 min)

- Pull `main` on all four machines.
- Everyone runs `npm install`, `npm run db:reset`, `npm run dev`, `npm test`.
- If it does not run on someone's machine, that is the only work until it does.

### Day 2 — Gate 3 and the first fullstack pass

1. B finishes `QUERY-01` (schema + seed + list endpoint + list page) — **Gate 3**.
   C reviews the schema and migration before merge.
2. A starts `CREATE-01` (needs Gate 3): form → POST → case in list.
3. C starts `FLOW-01` (needs Gate 3): transition rules + `PATCH` + status control.
   B composes the control into the detail page after `QUERY-02`.
4. D starts `NOTE-01` (needs Gate 3): Note model + `POST` + note form.
5. B starts `QUERY-02` after `QUERY-01`: detail page and not-found handling.

Day 2 exit: `QUERY-01` is demoable end to end, every track has a red test and the
first green step, and the list page uses the shared primitives. From here on,
people rarely touch the same file.

---

## 5. Ownership matrix

This contract prevents conflicts. **One folder, one owner.**

| Area | Owner | Files you may change freely |
|---|---|---|
| App shell, layout, global CSS, UI kit | B | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/ui/**` |
| Create slice | A | `src/features/cases/create/**`, `src/app/cases/new/**` |
| Query slice (list/detail/search) | B | `src/features/cases/query/**`, `src/app/cases/page.tsx`, `src/app/cases/[id]/page.tsx` |
| Workflow slice | C | `src/features/cases/workflow/**`, `src/components/cases/StatusControl.tsx` |
| Notes slice | D | `src/features/notes/**`, `src/components/notes/**` |
| Data layer | C | `prisma/**`, `src/lib/db.ts`, `src/lib/types.ts` — a feature owner may add **their own model** in their slice, but C reviews every schema/migration PR |
| Platform, deps, CI, test utils | D | `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `src/lib/errors.ts`, `src/lib/http.ts`, `src/test/**`, `.github/workflows/**`, `scripts/**` |
| Docs | each doc's owner (see [README](README.md)) | `docs/**`, `prompts/**`, root `*.md` |

**Shared files — change only through a PR reviewed by the owner:**

`prisma/schema.prisma` (C) · `package.json` (D) · `src/lib/errors.ts` (D) ·
`src/app/layout.tsx` (B) · `src/lib/types.ts` (C) · `AGENTS.md` (A).

Need something there? Ask in the issue and let the owner change it, or open a
two-line PR and request their review. The review is evidence, not bureaucracy.

**Composition rule:** `src/app/cases/[id]/page.tsx` belongs to B and composes C's
`StatusControl` and D's `NotesPanel`. C and D never edit that page; they change
their own component and ask B if the composition must change.

**Base gate:** `BASE-01` blocks all work, `BASE-02` blocks UI work, `QUERY-01`
blocks data work. Full table:
[backlog.md](backlog.md#base-gate--what-blocks-individual-work).

### 5.1 Feature folder contract

Each slice is a self-contained folder. This keeps common files near zero.

```
src/features/cases/create/       A
src/features/cases/query/        B   (list, detail, search)
src/features/cases/workflow/     C   (rules, status, history)
src/features/notes/              D

  schema.ts        input rules (Zod)              A, D
  rules.ts         pure domain rules              C
  service.ts       DB access + domain enforcement
  handler.ts       HTTP mapping, status, envelope
  components/      UI used only by this slice
  *.test.ts        colocated tests, named after ACs
```

Rules:

- **No imports between `features/**` folders.** Shared code moves to `src/lib`
  (server) or `src/components/ui` (UI), through the owner.
- `src/app/**` stays thin: pages compose feature components; `api/**/route.ts`
  re-export handlers. No business logic there.
- A slice may create its own Prisma model, but **C reviews every schema and
  migration PR**. C owns seed and migration discipline, not a veto on others' data.
- A test file lives next to the code it tests. No central `tests/` except optional
  E2E.

### 5.2 Shared UI — build once, use everywhere

B owns `src/components/ui/**`. The primitives stop four people building four
buttons and four error messages.

| Primitive | File | Used by |
|---|---|---|
| Button | `Button.tsx` | all slices |
| Text field | `TextField.tsx` | create, search |
| Textarea | `TextArea.tsx` | create, notes |
| Select | `SelectField.tsx` | create, filters, status |
| Form field wrapper (label, hint, error, `aria-describedby`) | `FormField.tsx` | create, notes, filters |
| Badge (status, priority) | `Badge.tsx` | list, detail |
| Alert / error banner (consumes `{ error }`) | `Alert.tsx` | all slices |
| Empty state | `EmptyState.tsx` | list, notes |
| Page header | `PageHeader.tsx` | all pages |

Rules:

- Every primitive has a component test written first and is shown on `/dev/ui`.
- **Do not fork a primitive into a feature folder.** Missing variant? Ask B to add
  it with a test. A duplicated button is a review rejection.
- B owns the component API. Others propose changes via a PR; they do not edit
  `src/components/ui/**` directly.
- Primitives are presentational only. Data fetching and validation stay in the
  slice.

---

## 6. Next.js-specific conflict traps (read this)

Next.js puts shared files where you least want them. Four rules:

1. **All `app/api/**/route.ts` files are base-owned re-exports.** No logic. Feature
   handlers live in the feature folder and are re-exported:

   ```ts
   // src/app/api/cases/route.ts  (created once by D, never edited)
   export { GET } from "@/features/cases/query/handler";
   export { POST } from "@/features/cases/create/handler";
   ```

   ```ts
   // src/app/api/cases/[id]/status/route.ts
   export { PATCH } from "@/features/cases/workflow/handler";
   ```

   Feature handlers are named `handler.ts`, **not** `route.ts`, so they cannot be
   mistaken for Next.js routes.

2. **Server components by default.** Add `"use client"` only to components that
   need state or event handlers (forms, status control, notes panel). Decide once;
   do not convert files back and forth.

3. **Reads and writes have one direction each.** Pages (server components) call
   query services directly. Writes go through API handlers called from client
   components. This avoids duplicate paths and keeps one test seam (ADR-003).

4. **Never edit `package.json` casually.** New dependencies are added by D in a
   dedicated PR. A dependency in a feature PR conflicts on the lockfile and is
   rejected.

---

## 7. Branch, PR and review flow

- **Course PR:** the long-running PR from the fork's `main` to
  `Technigo/kundportal-ai-native-development:main`. Stays open, never merged. The
  examiner's entry point.
- **Internal PRs:** every change goes through a branch in the fork → internal PR →
  `main` in the fork. No direct pushes to `main`; branch protection is on.
- Branch names: `feat/<area>-<short>`, `fix/<area>-<short>`, `docs/<topic>`,
  `test/<area>-<short>`. Example: `feat/create-validation-boundaries`.
- Keep PRs small (target: under ~300 changed lines, one AC or one refactor). Large
  PRs get a slower, worse review and conflict more.
- Open the PR as **draft** early so others see the direction.
- One approval from the pair is required; branch protection enforces it, and you
  cannot approve your own PR. The author merges.
- **Squash merge only.** The PR title becomes the commit on `main`, so it must be a
  Conventional Commit with the AC. Merge and rebase merges are disabled.
- `main` is protected: no direct pushes (admins included), stale approvals
  dismissed on new commits, all conversations resolved, CI becomes a required
  status check once `BASE-01` creates the workflow.
- Rebase on `main` before requesting review; do not merge `main` into a feature
  branch repeatedly.
- Commit style: Conventional Commits with the AC id, e.g.
  `feat(create): reject whitespace-only title (AC-03)`.
- Link the issue in the PR body (`Closes #<issue-number>`).

Review checklist: [CONTRIBUTING.md](../CONTRIBUTING.md). Log the review in
[reviews.md](reviews.md) the same day.

---

## 8. Definition of Done (per issue)

An issue is done only when all are true. This is also the reviewer's checklist.

- [ ] The feature brief in `docs/features/<issue-id>.md` is agreed and matches the
      implementation.
- [ ] The AC is referenced in the issue, branch and PR.
- [ ] Code is in the owner's folder and follows `AGENTS.md`.
- [ ] **A failing test was written first and seen to fail for the right reason**
      (red output pasted in the PR, or a `test:` commit before the `feat:` commit).
- [ ] The implementation is the minimum to pass; refactoring happened with the
      suite green.
- [ ] Happy path and at least one relevant error path are tested.
- [ ] UI changes satisfy AC-28–AC-31: usable at 320 px, keyboard reachable,
      labelled, contrast-checked ([ADR-005](decisions/ADR-005-ui-quality-baseline.md)).
- [ ] `npm run check` (lint + typecheck + test) passes locally.
- [ ] CI is green on the PR, and every test ran (no skips, no filtered runs).
- [ ] The change is reviewed by the pair, and review comments are resolved.
- [ ] Text is short: no filler, no repetition, lists over paragraphs.
- [ ] Merged by squash, with a Conventional Commit PR title containing the AC.
- [ ] Docs updated if behaviour, contract or decisions changed.
- [ ] The agent session (if AI was used) is logged in [ai-log.md](ai-log.md).
- [ ] Evidence link added to [traceability.md](traceability.md).

The last two make the individual reports possible in week 8. Skipping them creates
a week-8 emergency.

---

## 9. Working rhythm

| When | What | Who |
|---|---|---|
| Daily, async | Post "yesterday / today / blockers" in the team channel | everyone |
| Twice a week, 30 min | Integration checkpoint: pull `main`, run the app and tests together | everyone |
| Weekly, 45 min | Checkpoint: update [weekly/week-0X.md](weekly/), close issues, pick next, rotate the weekly owner | everyone |
| Before each merge | Review by the pair | as assigned |
| Week 8 | Demo rehearsal with a timer | B leads |

**Rotating weekly owner** (updates the weekly status, runs the checkpoint, keeps the
board honest): week 5 = A, 6 = B, 7 = C, 8 = D. This spreads process work and gives
each person process evidence.

---

## 10. Risks and countermeasures

| Risk | Likelihood | Countermeasure |
|---|---|---|
| Base becomes one person's job and blocks everyone | High | Timebox the base gate to day 1–2; A/C/D write red tests and UI components after `BASE-02` and wire the DB after `QUERY-01`; cut style-guide polish before the harness |
| Merge conflicts in shared files | High | Ownership matrix, re-export route files, small PRs, rebase daily |
| Next.js server/client confusion | Medium | One convention (ADR-003), B reviews every `"use client"` addition |
| SQLite tests interfere with the dev database | Medium | Tests use a separate temp file, never `data/portal.db`; `db:reset` script |
| Scope creep (search, assignment, auth) | High | Three scope tiers; anything without an AC goes to the backlog |
| AI output drifts from the spec | High | AC-first prompts, small bounded tasks, review checklist, tests as arbiter |
| Tests assert implementation, not behaviour | Medium | Tests named after ACs, called through the public seam (service or handler) |
| Evidence collected only at the end | Medium | `ai-log` + `traceability` updated at merge time, checked weekly |
| Wrong base repository in the course PR | Low | Checklist in CONTRIBUTING; verify before the first push |
| Uncertainty about dates/deadline | Medium | Confirm in Disco at kickoff; plan to finish 2 days early |

---

## 11. Evidence plan for the individual reports

Each person needs a traceable moment: an AC they own, AI instructions with context
and boundaries, code, tests, a classmate review, a recurring AI step, and a
reflection. The plan produces this per person:

| Person | Own ACs | Technical moment | Recurring/automated AI step | Likely VG comparison |
|---|---|---|---|---|
| A | AC-01–07 | Create form + `POST` + validation + persistence (fullstack) | Prompt "AC → test cases" for every create AC | Zod validation vs DB constraints vs both: which layer stops bad data? |
| B | AC-08–13 | Case model + seed + list/detail API + list/detail UI (fullstack) | UI/a11y review prompt before each UI PR | Server-rendered reads vs client fetch: what does each make testable? |
| C | AC-14–19 | Status control + `PATCH` + transaction + history (fullstack) | Migration/seed generation prompt, then manual verification | Free status choice vs matrix; transaction vs sequential writes |
| D | AC-20–25 | Note form/panel + note API + error UX (fullstack) | CI + "generate tests for this AC"; prompt v1→v2 comparison | Handler-level tests vs one E2E smoke: what is missed without the browser? |

This table is a **starting point, not a checklist to fake**. The report must link to
actual PRs, commits, test runs and review comments. Collect evidence as you merge;
do not write the reflection first.

**Do not** put individual reports in this repository.

---

## 12. What "done" looks like

- Someone who has never seen the repo can clone it, run three commands, and use the
  app by following [runbook.md](runbook.md).
- Every **M** AC maps to at least one automated test, runnable with one command.
- The course PR description contains the final commit link, run instructions and
  links to this documentation.
- The weekly files show progression from week 5 to week 8, including what went
  wrong.
- Each person can point to their own code, tests, review and AI log entry.
