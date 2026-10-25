# Specification — Kundserviceportalen

Status: **Proposed** — accepted or amended at the week 5 kickoff.
Owner: A. Everyone may propose changes through a PR.

This document is the contract. Implementation and tests derive from the acceptance
criteria (AC). If code and spec disagree, fix the code or change the spec in a
reviewed PR — never silently. Each feature starts with a brief in
[docs/features/](features/) before code.

---

## 1. Purpose and scope

A customer service agent (handläggare) needs one place to register, find and follow
customer cases that arrive through several channels and end up in different places.

The solution is a local, runnable fullstack web app: register, store, list, open
and move a case through a small status workflow. Internal notes are the
complementary function.

**In scope**

- Register a case with validation and a clear error message.
- Persist cases in SQLite so they survive a restart.
- List cases and open a detail view.
- Change a case's status through a documented workflow.
- Internal notes attached to a case.
- Automated tests for happy paths, error paths and boundary values.
- A runbook that lets someone else run and demo the solution.

**Out of scope**

- Authentication, roles, accounts, authorisation.
- Email, chat, phone or other channel integrations.
- Cloud infrastructure, containers, production deployment.
- Real customer data. All data is fictional.
- File attachments, SLA calculations, reporting/analytics, notifications.
- Assignment to a handler, pagination, sorting UI, dark mode (see §11).

**Glossary**

| Term | Meaning |
|---|---|
| Case (ärende) | One customer enquiry with title, description, category, priority and status |
| Handler (handläggare) | The person using the portal. No login; single-user locally |
| Status transition | A move from one status to another, governed by §5 |
| Complementary function | The extra feature required by the assignment: internal notes |
| AC | Acceptance criterion, a testable statement with a stable ID |

---

## 2. Actors

One actor: **the handler**, a local user of the web UI. No authentication, so a
note's "author" is free text entered by the handler. Deliberate scope decision
(ADR-002).

---

## 3. Data model

Prisma-style sketch. The real schema lives in `prisma/schema.prisma`, owned by C.
Changes require C's review.

```prisma
enum Category {
  TECHNICAL   // Tekniskt fel
  BILLING     // Faktura
  DELIVERY    // Leverans
  OTHER       // Övrigt
}

enum Priority {
  LOW
  NORMAL
  HIGH
}

enum Status {
  NEW                 // Nytt
  IN_PROGRESS         // Pågående
  WAITING_ON_CUSTOMER // Väntar på kund
  CLOSED              // Avslutat
}

model Case {
  id          Int        @id @default(autoincrement())
  title       String
  description String
  category    Category
  priority    Priority
  status      Status     @default(NEW)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  notes       Note[]
  history     StatusEvent[]
}

model Note {
  id        Int      @id @default(autoincrement())
  caseId    Int
  case      Case     @relation(fields: [caseId], references: [id], onDelete: Cascade)
  author    String
  body      String
  createdAt DateTime @default(now())

  @@index([caseId, createdAt])
}

model StatusEvent {          // Should-have, see AC-18
  id         Int      @id @default(autoincrement())
  caseId     Int
  case       Case     @relation(fields: [caseId], references: [id], onDelete: Cascade)
  fromStatus Status
  toStatus   Status
  createdAt  DateTime @default(now())

  @@index([caseId, createdAt])
}
```

**Decisions baked into the model**

- `id` is an autoincrement integer: readable in URLs and demos, simple seeds and
  assertions. Trade-off: enumerable IDs; irrelevant locally without auth
  (ADR-001).
- `status` defaults to `NEW` and is **never** accepted from the client on create
  (AC-06). The server owns workflow state.
- `createdAt` is server-set and immutable (AC-06). `updatedAt` changes on every
  write.
- Notes and history cascade-delete with the case. Cases are not deleted in the
  MVP, so this is a safety net, not a feature.
- No `assignedTo` column. Assignment is out of scope; adding it later is a schema
  change owned by C.

---

## 4. Categories and priorities

| Field | Values | Default on create |
|---|---|---|
| `category` | `TECHNICAL`, `BILLING`, `DELIVERY`, `OTHER` | none — required |
| `priority` | `LOW`, `NORMAL`, `HIGH` | none — required |
| `status` | see §5 | always `NEW` |

Three priority levels are deliberate. A fourth (`URGENT`) was rejected: it adds UI
and test surface without changing required behaviour.

---

## 5. Status workflow

```
            ┌──────────────┐
            │     NEW      │
            └──────┬───────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
 ┌─────────────┐        ┌──────────┐
 │ IN_PROGRESS │◄──────►│ WAITING_ │
 └──────┬──────┘        │ ON_CUST. │
        │               └────┬─────┘
        │                    │
        └────────┬───────────┘
                 ▼
            ┌──────────┐
            │  CLOSED  │  (terminal)
            └──────────┘
```

Allowed transitions:

| From | Allowed to |
|---|---|
| `NEW` | `IN_PROGRESS`, `CLOSED` |
| `IN_PROGRESS` | `WAITING_ON_CUSTOMER`, `CLOSED` |
| `WAITING_ON_CUSTOMER` | `IN_PROGRESS`, `CLOSED` |
| `CLOSED` | none (terminal) |

Rules:

- A transition to the **same** status is rejected as an invalid transition (409).
  The UI disables the current status, so this only happens through the API.
- An **unknown** status value is a validation error (400), not a transition error.
- A rejected request leaves the stored status and history unchanged (AC-15,
  AC-16).
- Each successful change writes the case update **and** its `StatusEvent` row in
  one transaction (AC-18).

Why a matrix: "closed" becomes meaningful, it produces a real error path to test,
and it answers "what may a handler do?". Cost: a rule engine and a UI that shows
only valid targets (ADR-002).

---

## 6. Validation rules

Validation happens at the HTTP boundary before anything is written. Strings are
trimmed first; **a whitespace-only value counts as empty**.

| Field | Rule | Error code |
|---|---|---|
| `title` | required; 3–120 chars after trim | `VALIDATION_ERROR` |
| `description` | required; 10–2000 chars after trim | `VALIDATION_ERROR` |
| `category` | required; one of the four enum values | `VALIDATION_ERROR` |
| `priority` | required; one of the three enum values | `VALIDATION_ERROR` |
| `status` (on create) | ignored; server forces `NEW` | — |
| `createdAt` (on create) | ignored; server sets it | — |
| `id` (on create) | ignored; server assigns it | — |
| `author` (note) | required; 2–80 chars after trim | `VALIDATION_ERROR` |
| `body` (note) | required; 1–2000 chars after trim | `VALIDATION_ERROR` |
| `status` (on change) | required; one of the four enum values | `VALIDATION_ERROR` |
| `q`, `status`, `category` (filters) | if present, must be valid; unknown enum → 400 | `VALIDATION_ERROR` |

Length uses JavaScript `String.length` (UTF-16 code units) after trimming, so an
emoji counts as 2. Documented, not fixed; it does not affect required behaviour.

Internal whitespace is preserved; only leading/trailing whitespace is removed. The
stored value is the trimmed value.

Field-level messages are returned per field so the form can render them next to
the input. Message text is illustrative; final UI copy follows §10.

---

## 7. API contract

Base path: `/api`. All responses are JSON. Success uses `{ "data": ... }`; errors
use §8.

| Method | Path | Purpose | Success | Errors |
|---|---|---|---|---|
| `POST` | `/api/cases` | Create a case | `201` + `Location` | `400` |
| `GET` | `/api/cases` | List cases; supports `q`, `status`, `category`, `priority` | `200` | `400` |
| `GET` | `/api/cases/:id` | Read one case | `200` | `400`, `404` |
| `PATCH` | `/api/cases/:id/status` | Change status | `200` | `400`, `404`, `409` |
| `GET` | `/api/cases/:id/notes` | List notes, oldest first | `200` | `404` |
| `POST` | `/api/cases/:id/notes` | Add a note | `201` | `400`, `404` |
| `GET` | `/api/cases/:id/history` | List status events (Should) | `200` | `404` |

**Create request**

```json
{
  "title": "Faktura är dubbeldebiterad",
  "description": "Kunden har fått två fakturor för samma order.",
  "category": "BILLING",
  "priority": "HIGH"
}
```

**Create response — 201**

```json
{
  "data": {
    "id": 1,
    "title": "Faktura är dubbeldebiterad",
    "description": "Kunden har fått två fakturor för samma order.",
    "category": "BILLING",
    "priority": "HIGH",
    "status": "NEW",
    "createdAt": "2026-11-02T09:15:00.000Z",
    "updatedAt": "2026-11-02T09:15:00.000Z"
  }
}
```

**Status change request** — `PATCH /api/cases/1/status`

```json
{ "status": "IN_PROGRESS" }
```

The response returns the updated case. A `409` includes the current status in
`error.details.currentStatus` so the UI can resynchronise.

**List response — 200**

```json
{ "data": [ { "...": "case summary" } ], "meta": { "total": 3 } }
```

A list item contains at least `id`, `title`, `category`, `priority`, `status`,
`createdAt`. The detail response contains the full case and, when implemented, its
notes and history.

**Ordering:** lists newest first (`createdAt DESC`, tie-break `id DESC`) so the
demo is predictable. Notes oldest first.

---

## 8. Error contract

One shape everywhere:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The case could not be saved.",
    "fieldErrors": {
      "title": "Title must be between 3 and 120 characters."
    }
  }
}
```

| Code | HTTP | When |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Missing/invalid field, malformed JSON, invalid filter, unknown status value |
| `NOT_FOUND` | 404 | Case (or parent case for a note) does not exist; non-numeric id |
| `INVALID_TRANSITION` | 409 | Well-formed status not reachable from the current status, or same status |
| `INTERNAL_ERROR` | 500 | Unexpected failure. Never leaks a stack trace or SQL to the client |

`fieldErrors` appears only for `VALIDATION_ERROR` about specific fields. `message`
is safe to show to a user. Server-side logs keep the technical detail.

---

## 9. Acceptance criteria

Priority: **M** = must for MVP, **S** = should, **X** = stretch, only if the must
set is green.

Test levels: **U** unit, **I** integration (service + real SQLite), **H** HTTP
handler, **C** component, **M** manual, **E** E2E smoke.

### 9.1 Create a case — owner A

| ID | Prio | Given / When / Then | Levels |
|---|---|---|---|
| AC-01 | M | Given valid title, description, category and priority, when the case is created, then `201` is returned, the case is stored with `status = NEW`, `createdAt` set by the server, and it can be read back. | H, I |
| AC-02 | M | Given one required field is missing (title, description, category or priority), when the request is sent, then `400 VALIDATION_ERROR` is returned with a `fieldErrors` entry for that field and **no case is stored**. | H, I |
| AC-03 | M | Given title or description contains only whitespace, when the request is sent, then it is treated as missing and rejected with `400`; nothing is stored. | U, H, I |
| AC-04 | M | Given a title of 3 or 120 chars, or a description of 10 or 2000 chars, when created, then it succeeds. Given 2/121 and 9/2001 chars, then it is rejected with `400`. Limits are evaluated after trimming. | U, H |
| AC-05 | M | Given an unknown category or priority, when created, then `400` is returned with a field error and nothing is stored. | U, H |
| AC-06 | M | Given a request that also sends `status`, `createdAt` or `id`, when created, then those values are ignored and the server-assigned values are stored. | H, I |
| AC-07 | M | Given malformed JSON or an empty body, when created, then `400` is returned (not `500`) and nothing is stored. | H |

### 9.2 List and detail — owner B

| ID | Prio | Given / When / Then | Levels |
|---|---|---|---|
| AC-08 | M | Given stored cases, when the list is requested, then all cases are returned with the summary fields, newest first. | I, H |
| AC-09 | M | Given no cases exist, when the list is opened, then an empty-state message is shown and no error is displayed. | C, M |
| AC-10 | M | Given an existing case, when its detail is requested, then the full case is returned and rendered. | I, H, C |
| AC-11 | M | Given an unknown or non-numeric id, when detail is requested, then `404 NOT_FOUND` is returned and the UI shows a friendly message with a way back. | H, C, M |
| AC-12 | S | Given cases with different statuses/categories, when filtering by `status` or `category`, then only matching cases are returned. An invalid filter value returns `400`. | I, H |
| AC-13 | S | Given the query `q`, when searching, then title and description are matched case-insensitively. | I, H |

### 9.3 Status workflow — owner C

| ID | Prio | Given / When / Then | Levels |
|---|---|---|---|
| AC-14 | M | Given a case in `NEW`, when moved to `IN_PROGRESS`, then `200` is returned, the new status is stored and survives a re-read. | I, H |
| AC-15 | M | Given an unknown status value, when changing status, then `400` is returned and the stored status is unchanged. | H, I |
| AC-16 | M | Given a case in `CLOSED`, when moved to `NEW`, then `409 INVALID_TRANSITION` is returned, the stored status is unchanged and no history row is written. | U, H, I |
| AC-17 | M | Given an unknown case id, when changing status, then `404` is returned. | H |
| AC-18 | S | Given a successful transition, when it completes, then exactly one history row with `fromStatus`, `toStatus` and `createdAt` is appended, in the same transaction. | I |
| AC-19 | S | Given the detail page, when the case has history, then the transitions are shown in chronological order. | C, M |

### 9.4 Internal notes — owner D (complementary function)

| ID | Prio | Given / When / Then | Levels |
|---|---|---|---|
| AC-20 | M | Given an existing case, when a non-empty note with an author is added, then `201` is returned and the note is linked to **that** case only. | I, H |
| AC-21 | M | Given an empty or whitespace-only note body, when added, then `400` is returned and nothing is stored. | U, H, I |
| AC-22 | M | Given an unknown case id, when adding a note, then `404` is returned and no note is stored. | H, I |
| AC-23 | M | Given a case with notes, when its detail page is opened, then its notes are shown oldest first; notes belonging to another case are not shown. | I, C, M |
| AC-24 | S | Given a note missing an author, when added, then `400` is returned. | H |

### 9.5 Cross-cutting — owner D, supported by all

| ID | Prio | Given / When / Then | Levels |
|---|---|---|---|
| AC-25 | M | Given a failed create, status change or note operation, when the UI handles it, then a human-readable message is shown (not only a status code or stack trace), and the form keeps the user's input. | C, M |
| AC-26 | M | Given a case was created and the app is restarted, when the list is opened, then the case is still there. | I, M |
| AC-27 | M | Given the final commit, when CI runs, then install, lint, typecheck, test and build all pass on the same commit. | CI |

### 9.6 Accessibility and mobile — owner B, supported by all

| ID | Prio | Given / When / Then | Levels |
|---|---|---|---|
| AC-28 | M | Given a viewport 320 CSS px wide, when the list, form and detail are opened, then there is no horizontal scrolling, content reflows into one column and the primary action stays reachable. Base styles target the smallest viewport; wider layouts are added with `min-width` breakpoints. | C, M |
| AC-29 | M | Given keyboard-only navigation, when the list, form and detail are used, then every control is reachable in a logical order, focus is always visible, no keyboard trap exists and focused content is not hidden behind sticky UI. | C, M |
| AC-30 | M | Given a control or a validation error, when it is inspected, then inputs have accessible names and labels, headings and landmarks are meaningful, errors are stated in text and linked with `aria-describedby`, and status is never conveyed by colour alone. | C, M |
| AC-31 | M | Given the rendered pages, when contrast and target size are measured, then text contrast is at least 4.5:1 (large text 3:1), UI components and graphics are at least 3:1 against adjacent colours, and every interactive target is at least 24 × 24 CSS px. | M |

---

## 10. Non-functional requirements

- **Language:** UI copy in Swedish (domain language); code identifiers and docs in
  English.
- **Accessibility:** built against **WCAG 2.2 Level AA**. Concrete obligations are
  AC-28–AC-31; [ADR-005](decisions/ADR-005-ui-quality-baseline.md) records the
  choice and rejected alternatives. A target verified by
  [verification-plan.md](verification-plan.md), not formal certification.
- **Layout:** **mobile-first**. Base styles target 320 CSS px; enhancements use
  `min-width` media queries. No horizontal scrolling at 320 px.
- **Data:** SQLite file in `data/` (git-ignored). Seeds are fictional only.
- **Performance:** irrelevant at this scale. No pagination in MVP.
- **Privacy:** no real customer data, no secrets in the repo.

---

## 11. Deliberately out of scope

| Idea | Why not now |
|---|---|
| Login and roles | Not required; would consume the whole project |
| Assignment to handler | Competing complementary feature; notes chosen instead |
| File attachments | Storage and upload handling not required |
| Notifications/e-mail | Explicitly outside the assignment |
| Pagination, sorting UI | Tiny dataset; adds UI and test surface |
| Free-text search across notes | Nice, not needed to prove the complementary feature |

Revisit only after every **M** criterion is green and reviewed.

---

## 12. Decisions to confirm at kickoff

Proposed, not settled. Record the outcome in an ADR or amend this file.

1. **Stack:** Next.js fullstack + Prisma + SQLite (ADR-001).
2. **Complementary function:** internal notes; search/filter and history as
   should-haves (ADR-002).
3. **API style:** route handlers for writes and contract tests; server components
   read through services (ADR-003).
4. **Work split:** vertical slices with one owner per folder (ADR-004).
5. **UI language:** Swedish.
6. **Status matrix:** §5, including "same status is an error".
