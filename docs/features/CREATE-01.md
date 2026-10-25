# Feature brief — CREATE-01 Create a case

| Field | Value |
|---|---|
| Issue | #4 |
| Owner | A |
| AC | AC-01, AC-06 |
| Milestone | M2 |
| Depends on | BASE-01, BASE-02, QUERY-01 |
| Brief status | Draft |
| Agreed by | A + B, _date_ |

## 1. Problem and outcome

- Who: the handler.
- Cannot today: register a new customer case in the portal.
- When done: fill in the form, submit, and see the new case in the list.

## 2. Scope

**In scope**

- Create form at `/cases/new` with title, description, category, priority.
- `POST /api/cases` handler and create service.
- Server owns `id`, `status = NEW`, `createdAt`; client values are ignored.
- Redirect or link to the list after success.

**Out of scope**

- Validation rules and field errors (CREATE-02).
- Edit and delete.
- Assignment, attachments, notifications.

## 3. Contract

| Item | Value |
|---|---|
| Route | `POST /api/cases` |
| Request | `title`, `description`, `category`, `priority` |
| Success | `201` + `Location: /api/cases/<id>`; `{ data: case }` |
| Errors | `400 VALIDATION_ERROR`; `500 INTERNAL_ERROR` for unexpected failure |
| Data written | one `Case` row; `status = NEW`, `createdAt` server-set |
| Ordering | new case appears newest first in the list |

## 4. UI

- Screen: `/cases/new`; states: idle, submitting, success, unexpected error.
- Primitives: `PageHeader`, `FormField`, `TextField`, `TextArea`, `SelectField`,
  `Button`, `Alert`.
- Mobile: one column at 320 px, no horizontal scroll; wider via `min-width`.
- Accessibility: label per input, visible focus, error summary reachable by
  keyboard.

## 5. Tests (write first)

| # | Level | Test name (AC id) | Given / When / Then | Expected |
|---|---|---|---|---|
| 1 | H | `AC-01 creates a case and returns 201` | valid payload | `201`, `Location`, `{ data }` with `status = NEW` |
| 2 | I | `AC-01 persists the case and reads it back` | create, reopen DB | row exists with server `createdAt` |
| 3 | H | `AC-06 ignores client id, status and createdAt` | hostile payload | server values stored |
| 4 | C | `AC-01 form submits and shows success` | fill and submit | request sent, success shown |

- Red evidence: `npm test -- create`, output pasted in PR #4.
- Manual: create a case and see it in the list.

## 6. Edge cases and failure paths

| Case | Expected |
|---|---|
| Duplicate submit | one case per intentional submit; disable while pending |
| DB unavailable | `500 INTERNAL_ERROR`, no partial row |
| Missing field | handled by CREATE-02, not this slice |

## 7. Open questions

| Question | Answer / owner | Date |
|---|---|---|
| Redirect to list or detail after create? | List (AC-01 demo) | _date_ |

## 8. Verification (fill at the end)

- [ ] Every AC in the table has a test or a recorded manual check.
- [ ] `npm run check` output pasted in the PR.
- [ ] CI green on the PR.
- [ ] Demo step works from a clean `npm run db:reset`.
- [ ] Out-of-scope list unchanged; anything new has an issue.
- [ ] Traceability row updated.
- [ ] Brief status set to `Verified` with the PR link.
