# Feature brief — `<ID>` `<title>`

Copy this file to `docs/features/<ID>.md` before writing code. Fill every section;
write "none" where a section does not apply. The brief and the merged PR must
match.

| Field | Value |
|---|---|
| Issue | `#<number>` |
| Owner | A / B / C / D |
| AC | AC-xx, AC-yy |
| Milestone | M1 / M2 / M3 / M4 |
| Depends on | issue ids or "none" |
| Brief status | Draft / Agreed / Built / Verified |
| Agreed by | names + date (pair review) |

## 1. Problem and outcome

- Who has the problem:
- What they cannot do today:
- What they can do when this is done (one sentence, demoable):

## 2. Scope

**In scope**

- ...

**Out of scope**

- ...

## 3. Contract

| Item | Value |
|---|---|
| Route / page | `METHOD /api/...`, `/cases/...` |
| Request | fields, types, limits |
| Success | status code, `{ data }` shape |
| Errors | code + HTTP status per failure |
| Data written | table, fields, transaction |
| Ordering | e.g. `createdAt DESC` |

## 4. UI

- Screen(s) and states: loading, empty, error, success.
- Shared primitives used: `Button`, `FormField`, ...
- Mobile: behaviour at 320 px; `min-width` enhancements.
- Accessibility: names, labels, `aria-describedby`, focus order, status text.

## 5. Tests (write first)

| # | Level | Test name (AC id) | Given / When / Then | Expected |
|---|---|---|---|---|
| 1 | U / I / H / C / M | `AC-xx ...` | ... | ... |

- Red evidence to paste in the PR:
- Manual check (if any):

## 6. Edge cases and failure paths

| Case | Expected |
|---|---|
| ... | ... |

## 7. Open questions

| Question | Answer / owner | Date |
|---|---|---|
| ... | ... | ... |

## 8. Verification (fill at the end)

- [ ] Every AC in the table has a test or a recorded manual check.
- [ ] `npm run check` output pasted in the PR.
- [ ] CI green on the PR.
- [ ] Demo step works from a clean `npm run db:reset`.
- [ ] Out-of-scope list unchanged; anything new has an issue.
- [ ] Traceability row updated.
- [ ] Brief status set to `Verified` with the PR link.
