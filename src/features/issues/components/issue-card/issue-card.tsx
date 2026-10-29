import { StatusBadge } from "../../../../shared/ui/status-badge/status-badge";
import { formatIssueDate } from "../../format-issue-date";
import { type IssueRecord } from "../../issue-types";
import styles from "./issue-card.module.css";

type IssueCardProps = {
  issue: IssueRecord;
};

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <article className={styles.card}>
      <a
        className={styles.link}
        href={`/issues/${issue.id}`}
      >
        <div className={styles.heading}>
          <h3 className={styles.title}>{issue.title}</h3>
          <StatusBadge status={issue.status} />
        </div>
        <div className={styles.metadata}>
          <span>{issue.category}</span>
          <span>Prioritet: {issue.priority}</span>
          <time dateTime={issue.createdAt}>
            Skapat {formatIssueDate(issue.createdAt)}
          </time>
        </div>
      </a>
    </article>
  );
}
