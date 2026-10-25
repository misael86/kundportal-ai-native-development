## What and why

<!-- One paragraph. Link the AC(s) and the issue. -->

Closes #

## Area and owner

<!-- Create / Query / Workflow / Notes / Data / UI / Platform / Docs -->

## How to verify

<!-- Exact commands a reviewer can run, plus what to look at in the UI. -->

```bash
npm run check
```

## Checklist

- [ ] Feature brief updated (`docs/features/<issue-id>.md`) and matches this diff
- [ ] Stays inside my owned folder(s)
- [ ] No new dependency / schema change / contract change without approval
- [ ] Failing test written first and seen to fail for the right reason (output below)
- [ ] Happy path tested
- [ ] Relevant error path and boundary tested
- [ ] All tests ran — no skips, no `--changed`, no filtered subset
- [ ] `npm run check` output pasted below
- [ ] CI green
- [ ] No changes outside the area (`git diff --stat`)
- [ ] Docs updated if behaviour or decisions changed
- [ ] Text is short: no filler, no repetition, lists over paragraphs
- [ ] If a rule changed, `AGENTS.md` was updated and the tool adapters still
      point at it (`docs/ai-tooling.md`)
- [ ] `docs/ai-log.md` entry added
- [ ] `docs/traceability.md` row updated
- [ ] UI only: WCAG 2.2 AA checked — labels, visible focus, contrast, 24 × 24 px
      targets, errors linked with `aria-describedby`, status not colour-only
- [ ] UI only: usable at 320 px with no horizontal scrolling (mobile-first)

## Test output

<!-- Paste the real output. Do not summarise. Include the red run first. -->

```text

```

## For the reviewer

- What I am least sure about:
- What I did not verify:
- Suggested focus for the review:

## Merge

- [ ] One approving review (branch protection enforces it)
- [ ] All conversations resolved
- [ ] **Squash and merge** — the PR title is the commit message and must be a
      Conventional Commit with the AC, e.g. `feat(create): reject whitespace (AC-03)`
- [ ] Branch deleted
