# AI tooling — one rule set, many assistants

The team does not have to use the same AI tool. The rules must not depend on
which one a person opens, so the repository uses **one canonical file and thin
adapters**.

## The rule

1. **[AGENTS.md](../AGENTS.md) is the source of truth.** Every rule, boundary and
   definition of done lives there. If an adapter disagrees with it, `AGENTS.md`
   wins.
2. **Adapters are pointers, not copies.** Each tool-specific file contains a
   short "read AGENTS.md" instruction plus a compact summary of the
   non-negotiables. It never restates the full spec.
3. **Change `AGENTS.md` first.** When a rule changes, update `AGENTS.md` in the
   same PR, then check that the adapters still point at it and that the summary
   has not become false.
4. **Prompts are plain Markdown.** Everything in [`prompts/`](../prompts/) is
   tool-agnostic: copy the block into Copilot Chat, Claude, Gemini, Cursor or
   OpenCode. No tool-specific syntax.

## Which file each tool reads

| Tool | File it picks up automatically | How it gets the rules |
|---|---|---|
| OpenCode | `AGENTS.md` | Reads it directly; canonical |
| OpenAI Codex / other AGENTS.md tools | `AGENTS.md` | Reads it directly; canonical |
| Claude Code | `CLAUDE.md` | Imports `AGENTS.md` and adds a short pointer |
| Gemini CLI | `GEMINI.md` | Points to `AGENTS.md`; carries the summary |
| GitHub Copilot (VS Code, github.com) | `.github/copilot-instructions.md` | Self-contained summary, because Copilot does not follow a link reliably |
| Cursor | `.cursor/rules/project.mdc` | Always-on rule with a pointer and the summary |
| Windsurf | `.windsurf/rules/project.md` | Always-on rule with a pointer and the summary |
| JetBrains AI / others | none | Paste `AGENTS.md` into the chat, or add an adapter using the steps below |

The adapters exist so a teammate is not forced to install a particular tool.
They are deliberately short; the detail stays in one place.

## Adding a new tool

1. Find the file the tool reads automatically (its documentation names it).
2. Create the adapter with:
   - a first line telling the assistant to read `AGENTS.md`;
   - the **same** short summary used by the other adapters;
   - the command list (`npm run check`, `npm test`, `npm run db:reset`);
   - the ownership boundaries and the "stop at the boundary" rule.
3. Add a row to the table above.
4. Do not copy the specification, the ACs or the ADRs into the adapter. Link to
   them.

## The summary every adapter carries

These are the rules that matter even if the assistant never opens another file:

- Read `AGENTS.md` and `docs/specification.md` before changing code.
- Work from the feature brief in `docs/features/<issue-id>.md`.
- Work only inside the owned feature folder; stop and ask at a boundary.
- Write the failing test first, show the red run, then the minimum implementation.
- Do not add dependencies, change the schema or change the API contract without
  the owner and an ADR.
- Use the shared UI primitives; never fork them.
- UI is mobile-first and meets WCAG 2.2 AA (AC-28–AC-31).
- All responses use the `{ data }` / `{ error }` envelope; no Prisma or SQL
  details leak to the client.
- No secrets and no real customer data.
- Run `npm run check`; paste the real output; never claim a result you did not see.
- Every change goes through a PR with at least one approving review and a squash
  merge.
- Write short: no filler, no repetition, lists over paragraphs.

## Why not one file for every tool?

Some tools support imports and some do not. A single file with five names would
be ignored by four of them, and symlinks break on some Windows checkouts. Thin
adapters are the smallest thing that works everywhere and stays honest.
