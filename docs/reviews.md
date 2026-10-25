# Reviews

Every internal PR gets a review from the author's pair. It is a course requirement
and the main way we catch AI-generated code that "looks done".

Pairing: **A↔B**, **C↔D**. Swap once mid-project so everyone reviews more than one
person.

## What a review must contain

"LGTM" is not a review. State:

1. **What was checked** — AC, files, commands run.
2. **What was found** — blocking issues, non-blocking suggestions, or "no issues in
   these areas".
3. **What the diff cannot show** — visual behaviour, timing, environment.
4. **Outcome** — approved, approved with follow-up issue, or changes requested.

Start from `prompts/review-diff.md`, then write your own conclusion. Do not paste AI
output as the review; you are the reviewer.

## Rules

- Review the diff, not the author. Ask "what would make this fail in use?".
- Spot-check one test: would it fail if the behaviour were removed?
- Check that no file outside the owner's area changed (`git diff --stat`).
- If you approve, say what you verified. An approval is also a decision.
- If you request changes, the author resolves them and you re-check — or explicitly
  hand over the re-check in the PR.
- Log the review here the same day.

## Log

| Date | PR | Author | Reviewer | AC / area | Checked | Outcome |
|---|---|---|---|---|---|---|
| _TODO_ | | | | | | |

### Review template

```markdown
**Reviewed:** PR #__ (AC-__)
**Checked:** diff, `npm run check` output, test named after the AC, no changes
outside `<area>`
**Blocking:** ...
**Non-blocking:** ...
**Not judgeable from the diff:** ...
**Outcome:** Approved / Changes requested

**Did the test fail when the behaviour was removed?** yes/no/not checked (why)
```
