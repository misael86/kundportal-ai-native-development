# Reusable prompt: review a diff

Run this on your own diff before opening a PR, and on your pair's PR before
approving. It is deliberately a checklist, not "does this look good?".

---

```
Review this diff as a strict senior reviewer for a student fullstack project.

Context:
- Feature brief: docs/features/<issue-id>.md
- Spec and ACs: docs/specification.md
- Conventions and boundaries: AGENTS.md
- The diff should implement <AC-ID> only.

Check, and report each as PASS / FAIL / UNCLEAR with a file:line reference:

1. Scope: does every change trace to the AC? Any unrelated edits, renames or
   reformatting?
2. Ownership: any file outside <owner area> or any shared file edited without
   the owner?
3. Contract: routes, response envelope, error codes, enum values unchanged
   unless the AC/ADR says otherwise.
4. Validation: missing fields, whitespace-only, length boundaries, unknown
   enums, malformed JSON. Is anything written before validation?
5. Errors: correct status + code for each failure; no 500 for a client error; no
   Prisma/SQL detail leaked.
6. Data: server owns id/status/createdAt; writes are transactional where needed;
   tests use a temp DB, not the dev DB.
7. Server/client: "use client" justified; no Prisma import in a client component.
8. Tests: named after the AC; assert behaviour through the public seam; would
   they fail if the feature were removed? Any test that only mirrors the
   implementation?
9. Accessibility and mobile (UI diffs): WCAG 2.2 AA — accessible names and
   labels, errors linked with `aria-describedby`, status not conveyed by colour
   alone, keyboard reachable with visible focus and no trap, text contrast
   4.5:1 (3:1 for large text and UI), targets at least 24 × 24 px, and no
   horizontal scrolling at 320 px with base styles written mobile-first.
10. Leftovers: debug logs, dead code, TODOs without an issue, unused imports.
11. Text: no filler, no repetition, lists over paragraphs; every sentence adds
    information.

Then list: blocking issues, non-blocking suggestions, and what you could not
judge from the diff alone. Do not rewrite the code; describe the fix.
```

---

Use the output to write the review comment. Log the review in
`docs/reviews.md` with the PR link and whether the changes were made.
