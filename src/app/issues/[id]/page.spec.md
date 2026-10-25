# Issue detail

**Route:** `/issues/[id]`
**Page:** Shows the selected issue and provides access to editing and status changes.

## Functional requirements (K)

- **K1 — Open selected issue:** A valid ID displays the corresponding issue details, as defined in the [IssueDetail component specification](../../../features/issues/components/issue-detail/issue-detail.spec.md).
- **K2 — Save status change:** The page lets the user save a status change for the selected issue.
- **K3 — Return to list:** The page provides a navigable way back to the issue overview.

## Accessibility requirements (T)

- **T1 — Page heading:** The page has a clear main heading identifying the detail or edit view.
- **T2 — Responsive layout:** Content and controls work at 320 CSS pixels without horizontal page scrolling.

## Error-handling requirements (F)

- **F1 — Invalid ID:** An invalid issue ID displays an understandable error.
- **F2 — Missing issue:** An ID without a matching issue displays an understandable not-found message.
- **F3 — Status update error:** A failed status update is not presented as successful.
