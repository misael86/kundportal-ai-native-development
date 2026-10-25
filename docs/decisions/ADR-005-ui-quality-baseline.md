# ADR-005: UI quality baseline — WCAG 2.2 AA and mobile-first

- Status: Proposed
- Date: 2026-10-25
- Owner: B
- Accepted by: _TODO at kickoff_
- Related: AC-28–AC-31,
  [specification.md §10](../specification.md#10-non-functional-requirements),
  [project-plan.md §5–7](../project-plan.md#5-ownership-matrix)

## Context

The app is used by a handler on a laptop, but the assignment asks for a credible
web solution and the team wants it usable, not only testable. Two quality questions
must be settled before the UI kit exists, because retrofitting is expensive:

1. **How accessible must the interface be?** Without a stated level, "add labels"
   is an opinion and every reviewer applies a different bar.
2. **Which screen size comes first?** Desktop-first tends to build around wide
   tables and then squeeze; mobile-first constrains earlier and degrades less.

Both affect every slice, the primitives and the manual test plan, so they belong in
one decision.

## Options considered

### Accessibility

| Option | Why not |
|---|---|
| No formal target, "good enough" | Not verifiable; the assignment asks for an accessible solution. Rejected. |
| WCAG 2.2 Level A | Covers semantics and keyboard, not contrast, reflow or target size. Would not honestly be "WCAG 2.2 compliant". Rejected. |
| **WCAG 2.2 Level AA** | Professional and legal baseline; every criterion is testable here; fits the timeline. **Chosen.** |
| WCAG 2.2 Level AAA | Stricter contrast (7:1) and media requirements that mostly do not apply, at a review-time cost. Rejected as target; individual criteria may still be met. |

### Layout

| Option | Why not |
|---|---|
| Desktop-first, shrink later | The list and form are built around width; the phone pass becomes a rewrite. Rejected. |
| Separate mobile client | Out of scope; doubles the surface. Rejected. |
| **Mobile-first responsive web** | Base styles target the smallest viewport; `min-width` queries add space and columns. One codebase, testable at 320 px. **Chosen.** |

## Decision

1. **Conformance target is WCAG 2.2 Level AA** for every page. The criteria that
   matter here are AC-28–AC-31, so they can be reviewed and tested, not treated as
   a slogan.
2. **The UI is mobile-first.** Base CSS targets 320 CSS px. Enhancements use
   `min-width` only. No fixed pixel widths on containers, no horizontal scrolling
   at 320 px.
3. **The shared primitives carry the baseline.** Button, TextField, TextArea,
   SelectField, FormField, Badge, Alert, EmptyState and PageHeader are built with
   labels, focus styles, contrast and 24 × 24 px targets from the start
   (`BASE-02`). A slice inherits accessibility; it does not re-implement it.
4. **Verification is explicit.** Component assertions cover names, roles, labels
   and `aria-describedby`. Manual checks cover keyboard-only use, focus visibility,
   contrast, 320 px reflow, 400 % zoom and target size. Results go in
   [verification-plan.md](../verification-plan.md).
5. **No accessibility overlay or third-party widget.** They do not create
   conformance and add a dependency. Fix markup and styles instead.

## Consequences

**Good**

- One bar for all four tracks; reviewers reject a UI change with a specific
  criterion instead of a preference.
- Mobile-first forces simpler layout and fewer breakpoints.
- The shared primitives make the baseline cheap: implemented once by B, reused.
- The accessibility pass becomes evidence for individual reports, not a last-week
  scramble.

**Bad / accepted costs**

- `BASE-02` is slower: every primitive needs a component test and a focus style.
- Some visual ideas are dropped because they cannot meet contrast or reflow.
- Manual checks cannot be fully automated; someone must spend time at 320 px and
  with the keyboard.
- WCAG 2.2 AA is a target, not a certificate. Claim "built against WCAG 2.2 AA and
  verified with the checks in the verification plan", not formal certification.

## Enforcement

- `BASE-02` cannot merge without component tests and `/dev/ui`.
- `UI-01` is a **must** issue, not a should: it closes only when AC-28–AC-31 are
  checked on the real pages.
- The PR template asks for accessibility and mobile checks; a missing check is a
  blocking comment.
- `prompts/review-diff.md` includes the WCAG 2.2 AA and mobile-first checklist.
