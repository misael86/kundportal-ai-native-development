# Reusable prompt: write the failing test first

Use this **before** any implementation. It is the TDD red step. If the agent wants
to write the implementation too, stop it.

---

```
You are working in the Kundserviceportalen repo (Next.js App Router + TypeScript
+ Prisma + SQLite, Vitest + React Testing Library). Read AGENTS.md and
docs/specification.md first.

Task: write the failing tests for <AC-ID> only. Do not write implementation code.

Context you must use:
- The AC: docs/specification.md §9
- The feature brief: docs/features/<issue-id>.md
- Data model: §3; validation: §6; API contract: §7; error envelope: §8
- My slice: <folder>
- Shared UI primitives: src/components/ui (do not duplicate them)

Choose the lowest level that can prove the AC:
- unit for a pure rule,
- integration for persistence or a transaction,
- handler for the HTTP contract (status code, envelope, validation),
- component for what the user sees.

Output:
1. The test file(s), with names that include the AC id.
2. For each test: what it proves, the expected result, and why this level.
3. The exact command to run only these tests.
4. The expected failure message and why it is the RIGHT failure (not a typo,
   missing import or broken fixture).
5. What the tests do NOT prove.

Do not implement. Do not modify files outside the test file(s) and fixtures.
Do not weaken or skip an existing test.
Answer in the shortest form: no filler, no repetition, lists over paragraphs.
```

---

After the agent answers:

1. Run the command. Read the failure. If it fails for the wrong reason, fix the
   test before continuing.
2. Paste the red output into the PR (or commit the test separately).
3. Only then ask for the implementation, using `prompts/implement-ac.md`.
