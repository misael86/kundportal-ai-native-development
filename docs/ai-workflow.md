# AI workflow

Status: **Proposed**, owner A. The team's shared way of working with AI, small
enough to follow.

Short version: **we use AI to go faster inside a boundary we define, and never let
it decide what correct means.** The spec and the tests decide that.

---

## 1. Principles

1. **Spec before prompt.** No session starts without an AC and a file boundary.
   "Build the case page" is not a task; "implement AC-01 in
   `src/features/cases/create/**`" is.
2. **Brief before code.** Write the feature brief
   (`docs/features/<issue-id>.md`) with the AC, contract, tests and out-of-scope
   list. The agent works from the same brief the humans verify against.
3. **Context beats cleverness.** Give the AC, data model, error envelope, folder
   and prohibitions. A short precise brief beats a long vague one.
4. **Plan, then diff.** Ask for a plan first. Reviewing a plan takes a minute;
   reviewing 400 lines of wrong code takes an hour.
5. **Small steps, real checks.** One AC per step; run tests after each.
6. **The human owns the decision.** Accepting a suggestion is a decision; justify
   it by reading the diff and running the checks.
7. **Tests are the arbiter, not the agent's confidence.** "This works" is only
   acceptable with command output.
8. **Short output.** No filler, no repetition; lists over paragraphs. Keep caveats
   and unverified claims — shorten the wording, not the truth.

---

## 2. The standard loop

```
pick AC → write the brief (docs/features/<issue-id>.md)
  → write the failing test first (prompts/tdd.md)
  → run it, confirm the right failure, save the red output
  → brief the agent for implementation (context + boundary + output format)
  → review the plan
  → implement the minimum, in small steps
  → run npm run check
  → read the diff line by line
  → refactor with the suite green
  → fix or reject what does not match the spec
  → merge through a PR with a classmate review
  → update the brief status and log the session
```

The step people skip is **reading the diff**. A green suite does not prove the code
is in the right place, does not leak errors, or does not touch another owner's
files.

---

## 3. Prompt anatomy

```
Role:        You are working in a Next.js + Prisma codebase.
Context:     AC-03 in docs/specification.md. Data model §3. Error envelope §8.
             Conventions in AGENTS.md. Feature brief in docs/features/CREATE-02.md.
Task:        Implement title/description trimming and whitespace-only rejection
             in src/features/cases/create/{schema.ts,service.ts}.
Boundaries:  Do not touch other folders, package.json, prisma/schema.prisma or the
             API contract. No new dependencies.
Acceptance:  AC-03 (happy + error), plus the boundary cases in AC-04.
Output:      Plan first. Then the diff. Then the exact test command and output.
Stop if:     the spec is ambiguous, a shared file must change, or a test would need
             to be weakened.
```

Why each part matters:

- **Context** stops the agent inventing a different data model or error format.
- **Boundaries** are the anti-conflict mechanism; without them the agent
  "helpfully" refactors the layout and creates a merge conflict.
- **Acceptance** makes the task checkable.
- **Output format** forces evidence instead of a summary.
- **Stop if** lets the agent ask instead of guess.

---

## 4. What agents may and may not do

**May**

- Read any repo file.
- Propose a plan, tests, or a refactor inside the owned folder.
- Implement and run tests, lint and typecheck.
- Explain an error and suggest a fix.
- Draft documentation a human then verifies.

**May not (without explicit approval in the same session)**

- Edit another owner's folder.
- Add or upgrade dependencies.
- Change `prisma/schema.prisma`, migrations, the API contract or error codes.
- Delete tests or loosen assertions.
- Rewrite unrelated code or reformat whole files.
- Run destructive commands or touch the dev database.
- Commit, push or open PRs on its own.

**Never**

- Receive secrets, tokens or real customer data.
- Be the only reviewer of its own output.

---

## 5. Human checkpoints

| Checkpoint | Question |
|---|---|
| Before the session | Is there an AC and an agreed brief? Is the boundary clear? Is the task small enough? |
| After the plan | Does it match the spec? Is anything out of scope? |
| During implementation | Is it touching files it should not? |
| After the diff | Does every change trace to the AC? Any silent behaviour change? |
| After the tests | Do the tests fail if the behaviour is removed? (Try once.) |
| Before merge | Has a classmate reviewed it? Is the AI log entry written? |

---

## 6. Reviewing AI output — checklist

- **Scope:** does the diff stay inside the owned folder?
- **Contract:** same routes, envelope and enum values?
- **Validation:** whitespace, boundaries, unknown enums and missing fields handled,
  or only the happy path?
- **Errors:** right status and code, or a generic 500?
- **Data:** anything written before validation? Is the write transactional?
- **Server/client:** is `"use client"` justified? Is Prisma imported only on the
  server?
- **Tests:** do they assert behaviour through the public seam, or mirror the
  implementation? Would they fail if the feature were removed?
- **Leftovers:** debug logs, commented-out code, unused imports, TODOs without an
  issue.
- **Plausibility:** does the API/library call exist? Check the docs; agents invent
  plausible APIs.

---

## 7. Recurring and automated moments

Each person owns at least one repeatable AI step, so evidence is not one lucky
prompt. Starting points (adapt to your slice, then log the result):

| Owner | Recurring step | Automation |
|---|---|---|
| A | Turn an AC into a test-case list before implementing | `prompts/ac-to-tests.md` for every create AC |
| B | UI/a11y review before every UI PR | `prompts/review-diff.md` with the a11y checklist |
| C | Generate migration + seed from a model change, verify by resetting | `npm run db:reset` + prompt |
| D | Generate handler tests for an AC, check they fail without the feature | `prompts/ac-to-tests.md` + CI |

Shared automation: **CI on every PR** (lint, typecheck, test, build). It does not
judge quality, but it stops broken code from merging.

For the VG criterion "proven improvement of the workflow", improve one prompt or
instruction and **compare two versions on comparable tasks**. Record both versions,
the output, and what changed (fewer corrections, better error-path coverage,
clearer handover). Do not claim improvement without the comparison.

---

## 8. Logging

Every session that produces code, tests or a decision gets one entry in your own
file under [ai-log.md](ai-log.md) the same day. Log the brief, not the full chat.
The entry needs: task/AC, prompt or prompt file, boundaries, what the agent
produced, what you accepted/changed/rejected and why, how you verified it, and the
commit/PR. Reasoning too long for an entry goes in [`sessions/`](sessions/README.md)
and is linked from the entry.

The log is the raw material for the individual report. An empty log in week 8 makes
an honest report impossible.

---

## 9. Known limitations (state these in the report)

- Agents produce plausible but nonexistent APIs and configuration. Always run the
  code.
- Agents optimise for "looks done": happy path covered, boundaries skipped unless
  named.
- Agents widen scope silently (renames, refactors, extra abstractions). The diff
  review is the control.
- Agents can write tests that assert their own implementation rather than the
  requirement. AC-named tests through the public seam reduce this, not eliminate
  it.
- Long sessions drift from the spec; restart with a fresh brief instead of
  correcting for an hour.
- AI is weakest at judging whether the requirement is sensible. That stays with us.

---

## 10. Why this is "AI-native", not "AI-assisted"

A chatbot writing a function is AI-assisted. Here the workflow assumes an agent in
the loop: the spec is machine-actionable, the repo carries instructions
(`AGENTS.md`), prompts are versioned in `prompts/`, tests and CI are the contract,
and decisions are logged. The human role moves from typing every line to
**defining boundaries, reviewing diffs and verifying behaviour** — exactly what the
examination asks us to explain.

---

## 11. Tool portability

Nobody has to use the same assistant. The rules are tool-agnostic:

- **[AGENTS.md](../AGENTS.md) is canonical.** OpenCode, Codex and any tool that
  follows the `AGENTS.md` convention read it directly.
- **No adapter ships by default.** A tool that looks for its own file gets one when
  a teammate needs it; [ai-tooling.md](ai-tooling.md) has the steps and a template.
- **Prompts are plain Markdown.** Copy a block from [`prompts/`](../prompts/) into
  any chat. No tool-specific syntax.
- **If an adapter and `AGENTS.md` disagree, `AGENTS.md` wins.** Change it first,
  then fix the adapter in the same PR.

Matrix and steps for adding an assistant: [ai-tooling.md](ai-tooling.md).
