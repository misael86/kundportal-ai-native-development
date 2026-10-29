import { type IssueStatus } from "../../shared/ui/status-badge/status-badge";

export const issueCategories = [
  "Konto",
  "Betalning",
  "Leverans",
  "Retur/reklamation",
  "Övrigt",
] as const;

export type IssueCategory = (typeof issueCategories)[number];

export const issuePriorities = ["Låg", "Normal", "Hög", "Akut"] as const;

export type IssuePriority = (typeof issuePriorities)[number];

export function isIssueCategory(value: string): value is IssueCategory {
  return issueCategories.some((category) => category === value);
}

export function isIssuePriority(value: string): value is IssuePriority {
  return issuePriorities.some((priority) => priority === value);
}

export type IssueFields = {
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
};

export type IssueRecord = IssueFields & {
  id: number;
  status: IssueStatus;
  createdAt: string;
};
