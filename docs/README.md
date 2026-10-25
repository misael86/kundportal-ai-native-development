# Project documentation

The team's shared memory: **what we decided, why, and how we checked it** —
readable without the git history.

## Read in this order

| # | Document | What it answers | Owner |
|---|---|---|---|
| 1 | [project-plan.md](project-plan.md) | Scope, milestones, ownership, conflict rules | A |
| 2 | [specification.md](specification.md) | Product behaviour, ACs, data model, API contract | A |
| 3 | [decisions/](decisions/README.md) | Decisions and rejected alternatives | rotating |
| 4 | [features/](features/README.md) | One brief per feature: scope, contract, tests, verification | each feature owner |
| 5 | [ai-workflow.md](ai-workflow.md) | How we steer AI, what agents may and may not do | A |
| 6 | [verification-plan.md](verification-plan.md) | Test strategy, cases, results, limitations | D |
| 7 | [traceability.md](traceability.md) | AC → issue → PR → test → evidence | D |
| 8 | [backlog.md](backlog.md) | Issue breakdown, milestones, labels | A |
| 9 | [weekly/](weekly/) | One status file per week (week 5–8) | rotating |
| 10 | [ai-log.md](ai-log.md) | Per-person log of agent sessions, one file each | everyone |
| 11 | [sessions/](sessions/README.md) | Decision trails for individual sessions | session author |
| 12 | [reviews.md](reviews.md) | Who reviewed whom, what was checked, what changed | everyone |
| 13 | [runbook.md](runbook.md) | How someone else runs, tests and demos | D |
| 14 | [../prompts/](../prompts/) | Versioned prompts for TDD, implementation and review | everyone |
| 15 | [ai-tooling.md](ai-tooling.md) | How the rules reach Copilot, Claude, Gemini, Cursor, OpenCode and others | A |

## Rules for this folder

1. **Write while you work, not after.** A decision recorded a week later is a
   reconstruction, not evidence.
2. **Link, don't duplicate.** Point at commits, PRs, test files and ADRs.
3. **Status is explicit:** `Proposed`, `Accepted`, `Superseded` — never ambiguous.
4. **No individual self-reflections here.** The individual report goes to Disco and
   must **not** be added to this repository. Team docs describe team work;
   `ai-log.md` holds the factual log each person needs.
5. **Fake data only.** No real customer details, names, e-mails or tokens in docs,
   issues or prompts.
6. **One writer per file.** Need a change in someone else's document? Open a PR and
   ask them to review — also review evidence.
7. **Write short.** No filler, no repetition, lists over paragraphs. Full rule:
   [AGENTS.md §5](../AGENTS.md#writing-style).

## Ownership shorthand

`A`, `B`, `C`, `D` are placeholders for the four team members. Fill in names and
GitHub handles in [project-plan.md](project-plan.md#team) on day 1; keep that table
as the single source of truth.
