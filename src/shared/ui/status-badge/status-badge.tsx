import styles from "./status-badge.module.css";

export const issueStatuses = [
  "Nytt",
  "Pågående",
  "Väntar på kund",
  "Avslutat",
] as const;

export type IssueStatus = (typeof issueStatuses)[number];

const statusClassNames: Record<IssueStatus, string> = {
  Nytt: styles.new,
  Pågående: styles.progress,
  "Väntar på kund": styles.waiting,
  Avslutat: styles.done,
};

type StatusBadgeProps = {
  status: IssueStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${statusClassNames[status]}`}>
      {status}
    </span>
  );
}
