# AI tooling — one rule file

The rules live in one file: [AGENTS.md](../AGENTS.md). A tool either reads it
directly or gets a small adapter that points at it.

## How a tool gets the rules

| Tool | How it gets the rules |
|---|---|
| Tools that follow the `AGENTS.md` convention (OpenCode, Codex, …) | Read it automatically. Nothing to do. |
| Tools that look for their own file (Claude Code, Gemini CLI, GitHub Copilot, Cursor, Windsurf, …) | Need an adapter. The tool's documentation names the file. |
| Chat-only tools | Paste `AGENTS.md` into the chat. |

**No adapter ships in this repository.** An adapter is a second copy of the rules,
and copies drift. Add one when a teammate actually uses that tool, in a PR that
changes nothing else.

## Adding an adapter

1. Find the file the tool reads automatically.
2. Create it with:
   - a first line telling the assistant to read `AGENTS.md`;
   - the command list;
   - the ownership boundary and the "stop at the boundary" rule;
   - the path to `docs/specification.md`.
3. Add a row to the table above.
4. Do not copy the specification, the ACs, the ADRs or the full rule set. Link.
5. When a rule changes, change `AGENTS.md` first, then the adapter, in the same PR.

Template:

```markdown
# <tool name>

Read `AGENTS.md` and `docs/specification.md` before changing code. `AGENTS.md` is
the source of truth; this file only tells <tool> where to look.

- Work from the feature brief in `docs/features/<issue-id>.md`.
- Work only inside your owned feature folder; stop and ask at a boundary.
- Write the failing test first, show the red run, then the minimum implementation.
- No dependency, schema or contract change without the owner and an ADR.
- Use the shared UI primitives; never fork them.
- Run `npm run check`; paste the real output; never claim a result you did not see.

Commands: `npm run check`, `npm test`, `npm run db:reset`, `npm run dev`.
```

## Prompts

Everything in [`prompts/`](../prompts/) is tool-agnostic Markdown: copy a block into
any chat. No tool-specific syntax.
