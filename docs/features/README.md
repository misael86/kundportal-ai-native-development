# Feature briefs

One brief per issue, named after the issue ID. The brief is the shared reference for
the humans and the coding agent: what the feature must do, how it is tested, and
what is out of scope. The merged PR must match it.

| Brief | Issue | Status |
|---|---|---|
| [CREATE-01](CREATE-01.md) | #4 | Draft |
| [CREATE-02](CREATE-02.md) | #7 | Draft |

## Rules

1. Copy [`_template.md`](_template.md) before writing code; fill every section.
2. Agree it with your pair. The reviewer checks the diff against it.
3. If the AC or contract changes, update the brief in the same PR.
4. At merge, set `Brief status` to `Verified` and link the PR.
5. Do not delete a brief; it records what was agreed.

Status values: `Draft` → `Agreed` → `Built` → `Verified`.
