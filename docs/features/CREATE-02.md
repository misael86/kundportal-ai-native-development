# Feature brief — CREATE-02 Validation and error paths

Worked example of a filled brief. Copy `_template.md`, not this file.

| Field | Value |
|---|---|
| Issue | #7 |
| Owner | A |
| AC | AC-02, AC-03, AC-04, AC-05, AC-07, AC-25 |
| Milestone | M2 |
| Depends on | CREATE-01 (#4), BASE-02 (#2) |
| Brief status | Draft |
| Agreed by | A + B, _date_ |

## 1. Problem and outcome

- Who: the handler registering a case.
- Cannot today: submit an incomplete or malformed case and understand what to fix.
- When done: every invalid input returns `400` with a message next to the field,
  the form keeps what was typed, and nothing is stored.

## 2. Scope

**In scope**

- Validation on `POST /api/cases` for title, description, category, priority.
- Whitespace trimming, length boundaries, unknown enums, malformed JSON.
- Field errors rendered by the create form; input preserved after failure.

**Out of scope**

- Edit and delete of a case.
- Validation in the browser as the only guard (the server is authoritative).
- Changes to shared `Alert`, `FormField` or the error envelope (B/D own them).

## 3. Contract

| Item | Value |
|---|---|
| Route | `POST /api/cases` |
| Request | `title`, `description`, `category`, `priority`; optional hostile `id`, `status`, `createdAt` ignored |
| Success | `201` + `Location`; `{ data: case }` with `status = NEW` |
| Errors | `400 VALIDATION_ERROR` with `fieldErrors`; `400` for malformed/empty JSON |
| Data written | none on failure; one `Case` row on success |
| Ordering | not applicable |

Rules: trim first; whitespace-only is empty; `title` 3–120, `description` 10–2000
(`String.length` after trim); `category` and `priority` must be known enum values.

## 4. UI

- Screen: `/cases/new`; states: idle, submitting, field errors, unexpected error.
- Primitives: `FormField`, `TextField`, `TextArea`, `SelectField`, `Button`,
  `Alert`.
- Mobile: one column at 320 px, no horizontal scroll; wider layout via
  `min-width`.
- Accessibility: label per input, error text linked with `aria-describedby`,
  visible focus, error summary reachable by keyboard.

## 5. Tests (write first)

| # | Level | Test name (AC id) | Given / When / Then | Expected |
|---|---|---|---|---|
| 1 | H | `AC-02 rejects each missing required field` | one field omitted | `400`, `fieldErrors.<field>`, row count 0 |
| 2 | U | `AC-03 rejects whitespace-only title` | title `"   "` | validation error, nothing stored |
| 3 | U | `AC-03 rejects whitespace-only description` | description `"  \n "` | validation error, nothing stored |
| 4 | U | `AC-04 accepts 3 and 120 char titles` | boundary values | accepted |
| 5 | U | `AC-04 rejects 2 and 121 char titles` | boundary values | rejected |
| 6 | U | `AC-04 accepts 10 and 2000 char descriptions` | boundary values | accepted |
| 7 | U | `AC-04 rejects 9 and 2001 char descriptions` | boundary values | rejected |
| 8 | H | `AC-05 rejects unknown category` | `category: "FOO"` | `400`, field error, row count 0 |
| 9 | H | `AC-05 rejects unknown priority` | `priority: "URGENT"` | `400`, field error, row count 0 |
| 10 | H | `AC-07 rejects malformed JSON` | body `"{"` | `400`, not `500` |
| 11 | H | `AC-07 rejects an empty body` | no body | `400`, not `500` |
| 12 | C | `AC-25 keeps input and shows the message` | submit invalid form | values kept, message rendered |

- Red evidence: run `npm test -- create`, paste the failure output in PR #7.
- Manual: M-01 (empty form), M-02 (spaces-only title).

## 6. Edge cases and failure paths

| Case | Expected |
|---|---|
| `title` 120 chars after trim | accepted |
| `title` 121 chars | `400`, field error |
| Emoji in `title` | counted as 2 UTF-16 units (documented limit) |
| Internal whitespace | preserved; only ends trimmed |
| Unknown field in body | ignored |
| DB error during insert | `500 INTERNAL_ERROR`, no partial row |

## 7. Open questions

| Question | Answer / owner | Date |
|---|---|---|
| Swedish copy for each message? | A drafts, B reviews | _date_ |
| Show one summary or only field errors? | Field errors + summary (AC-30) | _date_ |

## 8. Verification (fill at the end)

- [ ] Every AC in the table has a test or a recorded manual check.
- [ ] `npm run check` output pasted in the PR.
- [ ] CI green on the PR.
- [ ] Demo step works from a clean `npm run db:reset`.
- [ ] Out-of-scope list unchanged; anything new has an issue.
- [ ] Traceability row updated.
- [ ] Brief status set to `Verified` with the PR link.
