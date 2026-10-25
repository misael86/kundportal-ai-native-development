# Week 5 status

Owner this week: **A**. Updated at the weekly checkpoint.
Keep this file when the week ends; do not rewrite history.

---

## Planerat (Planned)

- Accept the specification and ADRs at the kickoff.
- Pass the base gate in order: `BASE-01` (all work), `BASE-02` (UI work),
  `QUERY-01` (data work).
- While the gate is built, A/C/D write their AC → test → expected-result tables
  (the red plan). No parallel scaffolds.
- After `BASE-02`, each track writes red tests and UI components. After
  `QUERY-01`, wire the database and turn them green.
- Four fullstack tracks: A create, B browse, C workflow, D notes & errors.
- TDD on every issue: failing test → red output in the PR → minimum implementation
  → green suite.
- Everyone can run the app and tests on their own machine by the end of the week.

## Genomfört (Done)

_TODO — fill in at the checkpoint. Link PRs and commits, not just descriptions._

| What | Link | Owner |
|---|---|---|
| | | |

## Verifierat (Verified)

_TODO — commands, results, manual checks. Separate what was run from what was only
planned._

| Check | Command / method | Result |
|---|---|---|
| Gate 1: health endpoint + CI red on a broken test | `npm test`, throwaway failing branch | |
| Gate 2: shared primitives | `npm test -- components`, `/dev/ui` | |
| Gate 3: seeded list survives restart | integration test + manual restart | |
| TDD red runs | red output linked per PR | |

## Osäkert eller ofärdigt (Uncertain or unfinished)

_TODO — be honest. An unfinished item with a plan beats a vague "done"._

- ...

## Nästa steg (Next steps)

_TODO — what, who, by when._

- ...

---

## Notes from the checkpoint

- Did the 1.5-day base timebox hold? If not, what slipped and what did we cut?
- Did anyone work outside their area? If yes, why, and what did we change?
- Is the course PR open with the correct base repository?
