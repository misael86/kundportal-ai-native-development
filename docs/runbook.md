# Runbook

Status: **v1 — skeleton.** Complete when the scaffold exists (BASE-01). The final
version must let someone who has never seen the project run and demo it.

Owner: D. Validated by B during the external walkthrough (HARD-02).

---

## 1. Prerequisites

- Node.js LTS (record the exact major version when pinned)
- npm
- Git
- A terminal
- No account, cloud service or API key

---

## 2. Run it

```bash
git clone https://github.com/misael86/kundportal-ai-native-development.git
cd kundportal-ai-native-development
npm install
npm run db:reset      # create the SQLite database and seed demo data
npm run dev
```

Open <http://localhost:3000>. Expected: the case list loads with seeded fictional
cases.

If something fails, see §6. Do not "fix" it by deleting the database unless this
runbook says so.

---

## 3. Run the tests

```bash
npm run check         # lint + typecheck + all automated tests
npm test              # tests only
npm test -- create    # one area
```

Expected: _TODO — number of tests and a short description of the output._

Tests use a separate temporary SQLite database. They never touch demo data.

---

## 4. Demo script (5–7 minutes)

Rehearse before week 8. Each step names the AC it demonstrates.

1. **Empty state** — show the list before seeding, or explain it (AC-09).
2. **Create** — register a case with title, description, category and priority.
   Show it in the list (AC-01).
3. **Validation** — submit an empty form, then a spaces-only title. Show the
   messages and that nothing was saved (AC-02, AC-03, AC-25).
4. **Detail** — open the case; show all fields and the creation time (AC-10).
5. **Status** — New → In progress → Waiting on customer → Closed. Show that only
   valid targets are offered (AC-14, AC-16).
6. **Invalid transition** — try to move the closed case via the API; show `409` and
   the unchanged status (AC-16).
7. **Notes** — add a note, show it lands on the right case; try an empty note
   (AC-20, AC-21).
8. **Persistence** — stop the server, start it, reload: the case is still there
   (AC-26).
9. **Not found** — open `/cases/999999`; show the friendly message (AC-11).
10. **Tests** — run `npm run check`, show the result (AC-27).

---

## 5. Reset

```bash
npm run db:reset
```

Deletes the local database file and recreates it with seed data. Affects only your
local `data/` directory.

---

## 6. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `DATABASE_URL` error | `.env` missing | Copy `.env.example` to `.env`; do not commit it |
| Port 3000 in use | Another dev server | Stop it, or `npm run dev -- -p 3001` |
| Prisma client not found | Install/migrate skipped | `npm install && npm run db:reset` |
| Tests fail on a fresh clone | Test DB not migrated | Re-run `npm test`; if it persists, open a bug issue |
| Empty list after seeding | Seeded the wrong database | Check `DATABASE_URL`; run `npm run db:reset` |

---

## 7. Known limitations

- Local, single-user, no authentication.
- SQLite only.
- No deployment instructions; none required.
- _TODO: add anything discovered during the external walkthrough._

---

## 8. For the examiner

- Fork: <https://github.com/misael86/kundportal-ai-native-development>
- Course PR: _TODO (link)_
- Final version: _TODO (commit link, also in the PR description)_
- Specification: [specification.md](specification.md)
- Verification plan: [verification-plan.md](verification-plan.md)
- Decisions: [decisions/](decisions/README.md)
- AI workflow: [ai-workflow.md](ai-workflow.md)
