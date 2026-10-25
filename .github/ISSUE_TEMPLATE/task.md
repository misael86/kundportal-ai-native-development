---
name: Task
about: One AC group or one infrastructure outcome. Keep it small enough to finish in ~2 days.
title: "[AREA] "
labels: ""
assignees: ""
---

## Owner

<!-- A / B / C / D — the person who owns this area. See docs/project-plan.md §5. -->

## Class and gate

<!-- Base (Gate 1/2) / Foundation (Gate 3) / Feature / Verify / Release.
     See docs/backlog.md#base-gate--what-blocks-individual-work.
     If this is a feature, it must be demoable on its own. -->

## Acceptance criteria

<!-- AC ids from docs/specification.md, e.g. AC-03, AC-04. If there is no AC,
say why this is infrastructure and what "done" means. -->

- AC-

## Testable outcome

<!-- Finish this sentence: "When this is done, a user can ..."
     If this issue cannot be demonstrated, it is too small or the wrong shape. -->

## Proof it works

<!-- The named test(s) and the manual demo step. A feature issue without a test
     that fails when the behaviour is removed is not done. -->

- Automated:
- Manual:

## Context

<!-- Why this exists, what depends on it, links to spec/ADR/design. -->

## Scope

<!-- Files/folders this may touch. -->

## Out of scope

<!-- What must NOT be done in this issue. This is the anti-scope-creep section. -->

## Definition of Done

- [ ] Feature brief agreed (`docs/features/<issue-id>.md`) and matches the implementation
- [ ] Failing test written first and seen to fail for the right reason (red output pasted)
- [ ] Implementation is the minimum to pass; refactor with the suite green
- [ ] Behaviour matches the AC, including the error path
- [ ] Tests: happy path + at least one error/boundary case
- [ ] No shared primitive duplicated into the feature folder
- [ ] `npm run check` passes locally (paste result)
- [ ] CI green
- [ ] Pair review approved
- [ ] Docs/traceability updated
- [ ] Text is short: no filler, no repetition, lists over paragraphs
- [ ] AI session logged in `docs/ai-log.md`

## Evidence

<!-- PR, commit, test output, manual check, negative control. -->
