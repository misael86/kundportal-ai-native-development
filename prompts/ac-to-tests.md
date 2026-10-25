# Reusable prompt: AC → test cases

Use this **before** implementing an AC. It produces a test list you can challenge,
which is cheaper than reviewing code that tests the wrong thing.

---

```
You are helping a team write tests for a small customer service app
(Next.js + TypeScript + Prisma + SQLite, Vitest).

Read:
- docs/features/<issue-id>.md (the agreed brief)
- docs/specification.md (the AC, the data model in §3, validation in §6,
  error envelope in §8)
- AGENTS.md (conventions and boundaries)

Task: produce a test plan for <AC-ID> only. Do not write implementation code.

Requirements for the plan:
1. List each test as: name, level (unit/integration/handler/component/manual),
   given/when/then, and the expected HTTP status or observable result.
2. Cover the happy path, at least one relevant error path, and any boundary
   values named in the AC. If the AC has no error path, say so explicitly.
3. Name the public seam under test (Zod schema, service, route handler or
   component). Do not propose tests of private helpers.
4. For persistence ACs, the test must use a real database file, not a mock.
5. State what the test does NOT prove.
6. Flag any ambiguity in the AC instead of guessing.

Output: a markdown table, then a short "risks this does not cover" section.
Answer in the shortest form: no filler, no repetition, lists over paragraphs.
Do not write files yet.
```

---

After the plan:

1. Delete or merge tests you cannot justify from the AC.
2. Add the boundary cases you know your slice is weak on.
3. Implement the tests first (they should fail), then the change.
4. Paste the real test output into the PR.
