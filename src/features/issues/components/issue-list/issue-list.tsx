"use client";

import { useMemo, useState } from "react";
import { Button } from "../../../../shared/ui/button/button";
import { issueStatuses } from "../../../../shared/ui/status-badge/status-badge";
import { Select } from "../../../../shared/ui/select/select";
import { TextInput } from "../../../../shared/ui/text-input/text-input";
import { IssueCard } from "../issue-card/issue-card";
import { type IssueRecord } from "../../issue-types";
import styles from "./issue-list.module.css";

type IssueListProps = {
  issues: readonly IssueRecord[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
};

const statusOptions = [
  { value: "all", label: "Alla statusar" },
  ...issueStatuses.map((value) => ({ value, label: value })),
];

function normalizeSearch(value: string): string {
  return value.trim().toLocaleLowerCase("sv-SE");
}

export function IssueList({
  error,
  issues,
  loading = false,
  onRetry,
}: IssueListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredIssues = useMemo(() => {
    const normalizedSearch = normalizeSearch(search);

    return issues
      .filter((issue) => {
        const matchesStatus =
          statusFilter === "all" || issue.status === statusFilter;
        const searchableText = normalizeSearch(
          `${issue.title} ${issue.description} ${issue.category}`,
        );
        return (
          matchesStatus &&
          (normalizedSearch.length === 0 ||
            searchableText.includes(normalizedSearch))
        );
      })
      .sort((left, right) => {
        const dateDifference =
          Date.parse(right.createdAt) - Date.parse(left.createdAt);
        return dateDifference || right.id - left.id;
      });
  }, [issues, search, statusFilter]);
  const hasActiveFilter =
    normalizeSearch(search).length > 0 || statusFilter !== "all";

  return (
    <section
      aria-busy={loading}
      aria-label="Ärenden"
      className={styles.section}
      role="region"
    >
      <div className={styles.controls}>
        <TextInput
          label="Sök ärenden"
          name="issue-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          label="Filtrera efter status"
          name="issue-status-filter"
          options={statusOptions}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        />
      </div>

      {loading ? (
        <>
          <p className={styles.loadingMessage} role="status">
            Hämtar ärenden…
          </p>
          <ul aria-hidden="true" className={styles.skeletonList}>
            {[0, 1, 2].map((item) => (
              <li className={styles.skeleton} key={item} />
            ))}
          </ul>
        </>
      ) : error ? (
        <div className={styles.message}>
          <p className={styles.error} role="alert">
            {error}
          </p>
          {onRetry ? (
            <Button onClick={onRetry} variant="secondary">
              Försök igen
            </Button>
          ) : null}
        </div>
      ) : filteredIssues.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>
            {issues.length === 0 && !hasActiveFilter
              ? "Inga ärenden ännu"
              : "Inga ärenden matchar sökningen"}
          </h2>
          <p>
            {issues.length === 0 && !hasActiveFilter
              ? "Skapa det första ärendet för att komma igång."
              : "Ändra söktext eller statusfilter och försök igen."}
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredIssues.map((issue) => (
            <li key={issue.id}>
              <IssueCard issue={issue} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
