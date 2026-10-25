# AGENTS.md — instructions for AI agents

Applies to every AI assistant used here: OpenCode, Copilot, Cursor, Claude,
Gemini, ChatGPT with repo context, and others. Reviewed like code.

**This file is the single source of truth.** Tool adapters (`CLAUDE.md`,
`GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/`,
`.windsurf/rules/`) are short pointers. If an adapter disagrees, this file wins.
Tool matrix and how to add an assistant: [docs/ai-tooling.md](docs/ai-tooling.md).

Read [docs/specification.md](docs/specification.md) before implementing. The spec
is the source of truth; this file explains how to work inside it.

---

## 1. Project

**Kundserviceportalen** — a local fullstack app for customer service cases. A
handler registers a case, lists and opens cases, changes status, and adds
internal notes. All data is fictional.

Stack: **Next.js (App Router) + TypeScript + Prisma + SQLite**, tested with
**Vitest** (+ React Testing Library for components). Package manager: npm.

Status: scaffolded during week 5. If a command does not exist yet, say so instead
of inventing a replacement.

---

## 2. Commands (once M1 is complete)

```bash
npm install
npm run db:reset      # migrate + seed a fresh local database
npm run dev           # http://localhost:3000
npm run check         # lint + typecheck + test (use before every commit)
npm test              # tests only
npm run test:watch
```

Never destroy data outside the local `data/` directory. Never point tests at
`data/portal.db`.

---

## 3. Repository map and ownership

| Path | Owner | Edit only if the task is in this area |
|---|---|---|
| `src/features/cases/create/**`, `src/app/cases/new/**` | A | Create + validation |
| `src/features/cases/query/**`, `src/app/cases/page.tsx`, `src/app/cases/[id]/page.tsx` | B | List, detail, search |
| `src/features/cases/workflow/**`, `src/components/cases/StatusControl.tsx` | C | Status workflow, history |
| `src/features/notes/**`, `src/components/notes/**` | D | Internal notes |
| `src/components/ui/**`, `src/app/layout.tsx`, `src/app/globals.css` | B | UI kit, shell |
| `prisma/**`, `src/lib/db.ts`, `src/lib/types.ts` | C | Data layer |
| `src/lib/errors.ts`, `src/lib/http.ts`, `src/test/**`, `package.json`, config, CI | D | Platform |
| `src/app/api/**/route.ts` | D (base) | **Re-exports only — never add logic** |
| `docs/**`, `prompts/**` | doc owner | Documentation |

If a task needs another owner's file, **stop and say so**. Propose the change and
let the owner make it, or ask for their review first. Cross-boundary edits cause
merge conflicts and are rejected in review.

---

## 4. Non-negotiable rules

1. **Spec first.** Every change maps to an acceptance criterion (`AC-xx`). If the
   AC does not exist, propose a spec change instead of implementing an idea.
2. **Feature brief first.** Before code, write `docs/features/<issue-id>.md` from
   [`docs/features/_template.md`](docs/features/_template.md): scope, ACs, API,
   UI, tests, out of scope, open questions. The brief and the PR must match. If
   the AC changes, update the brief in the same PR.
3. **Test first (TDD).** Write the smallest failing test that expresses the AC,
   run it, confirm it fails for the right reason, then write the minimum to pass,
   then refactor with the suite green. A test written after the code is allowed,
   but do not call it TDD.
4. **Small diffs.** One AC or one refactor per change. No drive-by reformatting,
   renaming or "while I was here" edits.
5. **Do not invent requirements.** No authentication, pagination, assignment,
   e-mail, analytics or new libraries unless the issue asks.
6. **Do not weaken tests to make them pass.** Never delete, skip or loosen an
   assertion to get green. If a test is wrong, explain why and change it in a
   separate, reviewed commit.
7. **Do not change the public contract** (routes, response envelope, error codes,
   enum values, status matrix) without an ADR and the owner's approval.
8. **Schema changes require C's review.** Do not edit `prisma/schema.prisma` or
   write a migration unless the slice is yours; C reviews every schema and
   migration PR.
9. **Dependencies require D.** Do not add a package. If one is needed, propose it
   with the reason and the size cost.
10. **No secrets, no real data.** Never commit `.env`, tokens, real names,
    e-mails or customer details. Use fictional data.
11. **Do not delete or rewrite someone else's work** to make your change fit.
12. **Stop at the task boundary.** If you find an unrelated bug, report it; do not
    fix it in the same diff.
13. **Write short.** Every sentence must add information. No filler, no
    repetition, lists over paragraphs. See §5.

---

## 5. Conventions

- TypeScript strict. No `any`; use `unknown` + narrowing at boundaries.
- **One feature, one folder.** A slice lives in `src/features/<area>/` and must
  not import from another feature folder. Shared server helpers go in `src/lib`;
  shared UI goes in `src/components/ui`.
- **Use the shared UI primitives** (`src/components/ui/**`). Do not copy, fork or
  restyle one inside a feature folder. If a variant is missing, ask B to add it
  with a test. The primitives carry the mobile-first layout and the WCAG 2.2 AA
  baseline (ADR-005).
- **UI is mobile-first and WCAG 2.2 AA.** Base styles target 320 CSS px; enhance
  with `min-width` only. A UI change must keep AC-28–AC-31 true: no horizontal
  scroll, keyboard reachable, visible focus, labels and `aria-describedby`, 4.5:1
  text contrast, 24 × 24 px targets, no colour-only status. Check the spec before
  inventing a layout.
- Server components by default. Add `"use client"` only for state, effects or
  event handlers, and mention it in the summary.
- Named exports. One component per file, file name = component name.
- Validation at the HTTP boundary with Zod; the inferred type flows into the
  service. Services enforce domain rules validation cannot (transitions,
  existence).
- All responses: `{ data }` on success,
  `{ error: { code, message, fieldErrors? } }` on failure (ADR-003).
- Route handler signature:
  `(request: Request, context: { params: Promise<{ id: string }> })`. Await
  `context.params`.
- Errors: throw/return the shared `AppError`; never leak Prisma or SQL messages to
  the client.
- Dates: ISO strings in JSON, `DateTime` in Prisma, server-generated only.
- Strings: trim before validation; whitespace-only counts as empty.
- Tests: named after the AC, e.g. `it("AC-03 rejects a whitespace-only title", ...)`.
  Test behaviour through the public seam (handler or service), not private helpers.
- Commits: Conventional Commits with the AC, e.g.
  `feat(create): reject whitespace-only title (AC-03)`.

### Writing style

Applies to docs, issues, PRs, commit messages, comments, prompts and chat
replies.

- Write the shortest version that keeps the meaning.
- Cut filler: "it is important to note", "in order to", "basically", "simply",
  "please note", "as mentioned", "it should be noted".
- State each rule, link and reason once. Do not repeat it in another section.
- Prefer a list or table over a paragraph.
- Every sentence must add information. If deleting it loses nothing, delete it.
- Keep what carries risk: AC ids, error codes, boundaries, security, ownership.
- Never shorten by dropping a caveat, a limitation or an unverified claim.
- Test: remove one sentence. If nothing is lost, remove it.

---

## 6. Definition of Done — check before you report success

- [ ] A failing test was written first and seen to fail for the right reason
      (paste the red output).
- [ ] The feature brief exists and matches the implementation.
- [ ] The implementation is the minimum to pass; refactoring happened with the
      suite green.
- [ ] The AC is implemented exactly as written, including its error path.
- [ ] Tests cover the happy path and at least one relevant error/boundary case.
- [ ] `npm run check` passes; paste the actual result, do not claim it.
- [ ] No files outside the task's area were modified (check `git diff --stat`).
- [ ] No new dependency, schema change or contract change without approval.
- [ ] No shared primitive was duplicated into a feature folder.
- [ ] Text follows the writing style: no filler, no repetition, lists over
      paragraphs.
- [ ] Docs updated if behaviour or decisions changed.
- [ ] The AI session is logged by the human in `docs/ai-log.md` — remind them.

---

## 7. How to respond to a task

1. **Restate the task and the AC** in one or two sentences.
2. **List assumptions and open questions.** If the spec is ambiguous, ask; do not
   guess silently.
3. **Propose a short plan** (files, tests, risks) before large edits.
4. **Write the failing test first**, run it, and show that it fails for the
   expected reason. Do not implement before this step.
5. **Implement the minimum to pass**, keeping the diff inside the owned folder.
6. **Run the checks** and report the real output.
7. **Summarise in the shortest form**: what changed, what you verified, what you
   did not verify, what the human must review. Use a list.

For any change touching more than three files or two owner areas, produce the plan
first and wait for approval.

---

## 8. Things that are always wrong here

- Writing a route handler with logic directly in `src/app/api/**/route.ts`.
- Calling Prisma from a client component.
- Returning `200` for a rejected operation, or `500` for a validation error.
- Sending `createdAt`, `id` or `status` from the client and trusting them.
- Catching an error and returning an empty list, hiding a failure.
- Using the dev database in a test.
- Adding `"use client"` to a page just to make an import work.
- Producing a test that passes because it asserts the mock, not the behaviour.
- Writing the implementation first and adding tests afterwards while calling it TDD.
- Copying a shared primitive into a feature folder instead of extending the shared one.
- Building desktop-first and planning to "fix mobile later".
- Merging without an approving review, or with a merge commit instead of a squash.
- Generating several features at once and calling it "done".

---

## 9. Where the reasoning lives

- Decisions and alternatives: [docs/decisions/](docs/decisions/README.md)
- AI workflow and prompt patterns: [docs/ai-workflow.md](docs/ai-workflow.md)
- Per-session log: [docs/ai-log.md](docs/ai-log.md)
- Reusable prompts: [prompts/](prompts/)
- Test plan and results: [docs/verification-plan.md](docs/verification-plan.md)
- Requirement-to-evidence mapping: [docs/traceability.md](docs/traceability.md)
- Feature briefs: [docs/features/](docs/features/README.md)

If you make a decision that is not already recorded, say that an ADR is needed.
