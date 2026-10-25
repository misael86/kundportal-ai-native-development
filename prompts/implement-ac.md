# Reusable prompt: implement one AC

The default implementation brief. Keep the boundaries in — they are the point.

---

```
You are working in the Kundserviceportalen repo (Next.js App Router + TypeScript
+ Prisma + SQLite). Read AGENTS.md and docs/specification.md first.

Task: implement <AC-ID> exactly as specified.

Context you must use:
- The feature brief: docs/features/<issue-id>.md
- Data model: docs/specification.md §3
- Validation rules: §6
- API contract: §7
- Error envelope: §8
- My slice: <folder(s)>

Boundaries:
- Only edit files in <folder(s)>. Do not touch other feature folders,
  src/app/api/**/route.ts, src/lib/errors.ts, package.json or prisma/**.
- No new dependencies.
- Do not change routes, response shapes, error codes or enum values.
- Do not refactor unrelated code or reformat files.

Process:
1. Restate the AC and list any ambiguity. Ask before guessing.
2. Propose a plan: files, tests, and what you will NOT do.
3. Wait for my approval if the change touches more than three files.
4. Implement in small steps. Add the tests named in my test plan.
5. Run `npm run check` and paste the actual output.
6. Summarise: what changed, what you verified, what you did not verify.
7. Answer in the shortest form: no filler, no repetition, lists over paragraphs.

Stop and tell me if:
- the AC is ambiguous,
- a shared file must change,
- a test would need to be weakened to pass,
- the task turns out to need another owner's folder.
```

---

Reviewer note: a good answer starts with the AC restated and a plan, not with a
wall of code.
