"use client";

import { useState } from "react";
import { Button } from "../../../../shared/ui/button/button";
import { Notification } from "../../../../shared/ui/notification/notification";
import { Select } from "../../../../shared/ui/select/select";
import {
  issueStatuses,
  StatusBadge,
  type IssueStatus,
} from "../../../../shared/ui/status-badge/status-badge";
import { formatIssueDate } from "../../format-issue-date";
import { type IssueRecord } from "../../issue-types";
import styles from "./issue-detail.module.css";

type IssueDetailProps = {
  issue: IssueRecord | null;
  loadError?: "invalid-id" | "not-found";
  onSaveStatus: (status: IssueStatus) => void | Promise<void>;
};

const statusOptions = issueStatuses.map((value) => ({
  value,
  label: value,
}));

export function IssueDetail({
  issue,
  loadError,
  onSaveStatus,
}: IssueDetailProps) {
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus>(
    issue?.status ?? "Nytt",
  );
  const [savedStatus, setSavedStatus] = useState<IssueStatus>(
    issue?.status ?? "Nytt",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<
    { message: string; variant: "success" | "error" } | undefined
  >();

  async function saveStatus() {
    setNotification(undefined);
    setIsSaving(true);
    try {
      await onSaveStatus(selectedStatus);
      setSavedStatus(selectedStatus);
      setNotification({
        message: "Statusen har uppdaterats.",
        variant: "success",
      });
    } catch {
      setNotification({
        message: "Det gick inte att uppdatera statusen. Försök igen.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (!issue) {
    const message =
      loadError === "invalid-id"
        ? "Ärendets ID är ogiltigt."
        : "Ärendet kunde inte hittas.";
    return (
      <div className={styles.message}>
        <p className={styles.error} role="alert">
          {message}
        </p>
      </div>
    );
  }

  return (
    <article className={styles.detail}>
      {notification ? (
        <Notification
          message={notification.message}
          onDismiss={() => setNotification(undefined)}
          variant={notification.variant}
        />
      ) : null}
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Ärende #{issue.id}</p>
          <h2 className={styles.title}>{issue.title}</h2>
        </div>
        <StatusBadge status={savedStatus} />
      </header>
      <dl className={styles.metadata}>
        <div>
          <dt>Kategori</dt>
          <dd>{issue.category}</dd>
        </div>
        <div>
          <dt>Prioritet</dt>
          <dd>{issue.priority}</dd>
        </div>
        <div>
          <dt>Skapad</dt>
          <dd>
            <time dateTime={issue.createdAt}>
              {formatIssueDate(issue.createdAt)}
            </time>
          </dd>
        </div>
      </dl>
      <section className={styles.description}>
        <h3>Beskrivning</h3>
        <p>{issue.description}</p>
      </section>
      <div className={styles.statusForm}>
        <Select
          label="Ny status"
          options={statusOptions}
          value={selectedStatus}
          onChange={(event) => {
            const status = issueStatuses.find(
              (candidate) => candidate === event.target.value,
            );
            if (status) {
              setSelectedStatus(status);
              setNotification(undefined);
            }
          }}
        />
        <Button disabled={isSaving} onClick={saveStatus}>
          {isSaving ? "Sparar…" : "Spara status"}
        </Button>
      </div>
    </article>
  );
}
