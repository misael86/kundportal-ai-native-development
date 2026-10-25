# Contributing

How we work here. [AGENTS.md](AGENTS.md) has the same rules written for AI agents.

---

## 1. Before you start

- You are a collaborator on the fork and can push.
- Node.js LTS and npm are installed.
- You have read [docs/specification.md](docs/specification.md) and know your area
  in [docs/project-plan.md](docs/project-plan.md#5-ownership-matrix).
- Any AI assistant is allowed. [AGENTS.md](AGENTS.md) is canonical;
  [docs/ai-tooling.md](docs/ai-tooling.md) explains how to point a tool that does
  not read it.

Setup (available after BASE-01):

```bash
git clone https://github.com/misael86/kundportal-ai-native-development.git
cd kundportal-ai-native-development
npm install
npm run db:reset
npm run dev
npm run check
```

If setup fails, that is a P1 issue. Do not work around it silently.

---

## 2. The course pull request

- **One long-running PR** from the fork's `main` to
  `Technigo/kundportal-ai-native-development:main`.
- **Never merged** during the project. New commits on `main` appear in it.
- The description is the examiner's entry point. Keep it current: team, doc
  links, run instructions, and at the end the **final commit link** under
  "Slutversion för examination".
- Do not open other PRs to the course repository.

Internal work goes through PRs **inside the fork**: branch → `main` in the fork.

---

## 3. Branch names

| Prefix | Use | Example |
|---|---|---|
| `feat/` | New behaviour | `feat/create-validation-boundaries` |
| `fix/` | Bug fix | `fix/query-empty-state-crash` |
| `test/` | Tests only | `test/notes-empty-body` |
| `docs/` | Documentation | `docs/adr-004-work-split` |
| `chore/` | Tooling, deps | `chore/ci-node-version` |

Include the area and, when relevant, the AC: `feat/create-ac03-whitespace`.

---

## 4. Commits and the test-driven loop

Conventional Commits, present tense, with the AC when there is one:

```
test(create): add failing test for whitespace-only title (AC-03)
feat(create): reject whitespace-only title (AC-03)
fix(query): return 404 for non-numeric id (AC-11)
docs(adr): accept ADR-003
chore(ci): run build on pull requests
```

One logical change per commit. Do not mix a refactor with a behaviour change. Do
not commit generated files, `.env`, `data/*.db` or `node_modules`.

### The loop

1. **Write the feature brief** in `docs/features/<issue-id>.md` from
   [`docs/features/_template.md`](docs/features/_template.md). Agree it with your
   pair before coding.
2. Read the AC and pick the **lowest test level that can prove it**: unit for a
   rule, integration for persistence, handler for the HTTP contract, component for
   UI.
3. Write the smallest test that expresses the AC. Put the AC id in the name.
4. Run it. **Confirm it fails for the right reason** — not a typo, missing import
   or broken fixture. Paste the red output in the PR.
5. Implement the minimum to pass. No "while I'm here" behaviour.
6. Run the whole suite (`npm run check`), not only the new test.
7. Refactor with the suite green.
8. Commit test and implementation separately while you work. Squash collapses
   them, so the permanent red evidence is the output in the PR description.

A test written after the implementation is welcome, but do not present it as TDD.
The red run is the evidence, not the existence of a test file.

**When the test is hard to write first:** the AC is ambiguous or the seam is
wrong. Fix one of those; do not skip the test.

Reusable prompt: [prompts/tdd.md](prompts/tdd.md).

---

## 5. Pull requests

1. Branch from an up-to-date `main`.
2. Open a **draft** PR early.
3. Keep it small: one AC or one infrastructure outcome. Past ~300 changed lines,
   split it.
4. Fill in the internal template. Link the issue (`Closes #<issue-number>`).
5. Run `npm run check`; paste the real result and the **red run** of the new test.
6. Request review from your pair (A↔B, C↔D). **One approval is required**; you
   cannot approve your own PR.
7. Resolve every conversation. New commits dismiss stale approvals, so request a
   re-review.
8. **Squash and merge.** The PR title becomes the commit message, so it must be a
   Conventional Commit with the AC, e.g.
   `feat(create): reject whitespace-only title (AC-03)`. No merge commit, no rebase
   merge.
9. Delete the branch.

`main` is protected: no direct pushes (admins included), one approval, resolved
conversations, CI as a required status once `BASE-01` creates the workflow. Force
pushes and branch deletion are blocked. Squash is the only merge method.

Why squash: one readable line per behaviour on `main`, while the branch keeps the
red/green/refactor steps during review. The cost is that intermediate commits
disappear, so the red output lives in the PR body.

Review checklist and log: [docs/reviews.md](docs/reviews.md).

---

## 6. Shared files

One owner each. Change them only in a PR that owner reviews:

| File | Owner |
|---|---|
| `prisma/schema.prisma`, migrations, seed | C |
| `package.json`, lockfile, config, CI | D |
| `src/lib/errors.ts`, `src/lib/http.ts`, `src/test/**` | D |
| `src/lib/db.ts`, `src/lib/types.ts` | C |
| `src/app/layout.tsx`, `src/app/globals.css`, `src/components/ui/**` | B |
| `AGENTS.md` | A |
| `src/app/api/**/route.ts` | D (re-exports only, no logic) |

These are the files everyone is tempted to touch, and therefore the ones that cause
merge conflicts and inconsistent patterns. See
[ADR-004](docs/decisions/ADR-004-work-split.md).

Need a change there? Open an issue or a two-line PR and request the owner's
review. That review is also course evidence.

### Feature folders and shared components

- Slices: `src/features/cases/create/`, `.../query/`, `.../workflow/`,
  `src/features/notes/`.
- **No imports between feature folders.** Shared code goes to `src/lib` (server)
  or `src/components/ui` (UI), added by that owner.
- **Use the shared primitives.** `src/components/ui/**` has Button, TextField,
  TextArea, SelectField, FormField, Badge, Alert, EmptyState and PageHeader. Do not
  copy one to change a margin. Ask B for a variant, with a test.
- A slice may add its own Prisma model, but C reviews every schema/migration PR.
- Tests live next to the code they test, except optional E2E specs.

---

## 7. Definition of Done

See [project-plan.md §8](docs/project-plan.md#8-definition-of-done-per-issue). In
short: brief agreed, AC referenced, **failing test written first and seen to
fail**, happy + error tests, `npm run check` green, CI green, pair review
approved, no duplicated primitive, docs updated, AI log written, traceability row
updated.

---

## 8. Weekly ritual

- Update `docs/weekly/week-0X.md` under the five headings: **Planerat,
  Genomfört, Verifierat, Osäkert eller ofärdigt, Nästa steg**. Keep earlier weeks.
- Link the weekly file from the course PR description.
- Close finished issues; move unfinished ones with a reason.
- Rotate the weekly owner: week 5 A, 6 B, 7 C, 8 D.

---

## 9. Reporting a problem

- Bug: task template with `type:bug`; steps and expected vs actual.
- Blocked: say what you tried, what you expected, what you need. Do not sit on a
  blocker for a day.
- Scope idea: add `type:idea` to the backlog; do not implement it.

---

## 10. Rejected in review

- Changes outside your area without agreement.
- New dependencies without a dedicated PR.
- Tests that mock the database when the AC is about persistence.
- Weakened or deleted tests.
- A 500 for a client error, or a 200 for a rejected operation.
- `"use client"` on a page "to make it work".
- Reformatting unrelated files.
- A PR without a linked AC or issue.

---

## 11. Writing

Applies to docs, issues, PRs, commits and comments.

- Write the shortest version that keeps the meaning.
- No filler and no repetition; state each rule once.
- Lists and tables over paragraphs.
- Keep ACs, error codes, boundaries, security and caveats.

Full rule: [AGENTS.md §5](AGENTS.md#writing-style).
