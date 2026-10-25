# AI session log

One entry per session that produced code, tests, a decision or a review. Written by
the human who ran it, **the same day**. Factual and short: raw material for the
individual report, not the report.

Rules:

- One entry per person per session; use your code (A/B/C/D) in the heading.
- Link the commit/PR. An entry without a link is a claim, not evidence.
- Record what you **rejected or changed**, not only what worked. That is the
  learning and the grading evidence.
- Never paste secrets or real customer data.
- Reused a prompt from `prompts/`? Link it instead of pasting it.
- The full chat need not be saved. The brief, outcome and verification must.

---

## Entry template

```markdown
### YYYY-MM-DD — A — AC-03 whitespace-only title

- **Task / AC:** AC-03 (reject whitespace-only title/description)
- **Brief:** docs/features/CREATE-02.md (agreed with B on YYYY-MM-DD)
- **Agent / model:** OpenCode + `<model>`
- **Prompt:** prompts/implement-ac.md, filled with AC-03 + boundary AC-04
- **Boundaries given:** only `src/features/cases/create/**`; no schema, no deps,
  no contract change
- **What the agent proposed:** plan with a Zod `.trim().min(3)` schema and a test
  file; also suggested changing the shared error helper
- **What I accepted:** the schema + trimming approach, the field-level test
- **What I changed:** rejected the change to `src/lib/errors.ts` (D's area); moved
  the message text into the field error map so the UI can render it
- **What I rejected:** a helper that swallowed the parse error and returned `null`
  — it would have hidden the error path
- **Verification:** `npm test -- create` → 6 passed; manually removed `.trim()` →
  AC-03 test failed as expected, then restored
- **Links:** commit `<sha>`, PR `#<number>`
- **What I would do differently:** give the agent the test list before the
  implementation; it skipped the 120-char boundary on the first pass
```

---

## Example entry (replace with a real one)

### 2026-11-02 — A — AC-01 create happy path

- **Task / AC:** AC-01, create a valid case and read it back
- **Brief:** docs/features/CREATE-01.md
- **Agent / model:** OpenCode + DeepSeek
- **Prompt:** `prompts/implement-ac.md` with AC-01, the data model (§3) and the
  error envelope (§8)
- **Boundaries given:** `src/features/cases/create/**` only; no `app/api` edits
  (base-owned re-export); no new dependencies
- **What the agent proposed:** Zod schema, service with `prisma.case.create`, a
  handler returning `201`, and a test that mocked Prisma
- **What I accepted:** schema + service + handler shape, the `Location` header
- **What I changed:** replaced the mocked test with an integration test against a
  temporary SQLite file, because AC-01 requires read-back from storage
- **What I rejected:** returning the raw Prisma object (leaks `updatedAt` shape
  drift); mapped it to an explicit response type instead
- **Verification:** `npm run check` green; stopped the app, restarted, case still
  present (AC-26 manual check)
- **Links:** commit `abc1234`, PR #14
- **What I would do differently:** ask for the test list first — the mocked test
  would have passed even if the write never reached the database

---

## Log

<!-- Add newest entries at the top, or per person below. -->

### A

_No entries yet._

### B

_No entries yet._

### C

_No entries yet._

### D

_No entries yet._
