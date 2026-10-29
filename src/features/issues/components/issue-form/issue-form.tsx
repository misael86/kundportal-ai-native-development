"use client";

import { useState, type FormEvent } from "react";
import { Button } from "../../../../shared/ui/button/button";
import { Notification } from "../../../../shared/ui/notification/notification";
import { Select } from "../../../../shared/ui/select/select";
import { Textarea } from "../../../../shared/ui/textarea/textarea";
import { TextInput } from "../../../../shared/ui/text-input/text-input";
import {
  isIssueCategory,
  isIssuePriority,
  issueCategories,
  issuePriorities,
  type IssueFields,
} from "../../issue-types";
import { type IssueStatus } from "../../../../shared/ui/status-badge/status-badge";
import styles from "./issue-form.module.css";

export type IssueFormSubmission = IssueFields & {
  status: IssueStatus;
};

type IssueFormProps = {
  initialValues?: IssueFields;
  initialStatus?: IssueStatus;
  onSubmit: (issue: IssueFormSubmission) => void | Promise<void>;
};

type FormErrors = Partial<Record<keyof IssueFields, string>>;
type IssueDraft = Omit<IssueFields, "category"> & {
  category: IssueFields["category"] | "";
};

const categoryOptions = issueCategories.map((value) => ({ value, label: value }));
const priorityOptions = issuePriorities.map((value) => ({ value, label: value }));

function validate(values: IssueDraft): FormErrors {
  const errors: FormErrors = {};
  const titleLength = values.title.trim().length;
  const descriptionLength = values.description.trim().length;

  if (titleLength === 0) {
    errors.title = "Ange en rubrik.";
  } else if (titleLength > 120) {
    errors.title = "Rubriken får vara högst 120 tecken.";
  }

  if (descriptionLength === 0) {
    errors.description = "Ange en beskrivning.";
  } else if (descriptionLength > 5000) {
    errors.description = "Beskrivningen får vara högst 5 000 tecken.";
  }

  if (!isIssueCategory(values.category)) {
    errors.category = "Välj en kategori.";
  }

  return errors;
}

export function IssueForm({
  initialValues,
  initialStatus = "Nytt",
  onSubmit,
}: IssueFormProps) {
  const [values, setValues] = useState<IssueDraft>(
    initialValues ?? {
      title: "",
      description: "",
      category: "",
      priority: "Normal",
    },
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<
    { message: string; variant: "success" | "error" } | undefined
  >();

  function updateField<Key extends keyof IssueDraft>(
    field: Key,
    value: IssueDraft[Key],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setNotification(undefined);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setNotification(undefined);

    if (
      Object.keys(nextErrors).length > 0 ||
      !isIssueCategory(values.category) ||
      !isIssuePriority(values.priority)
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        priority: values.priority,
        status: initialStatus,
      });
      setNotification({ message: "Ärendet har sparats.", variant: "success" });
    } catch {
      setNotification({
        message: "Det gick inte att spara ärendet. Försök igen.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isEditing = initialValues !== undefined;

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      {notification ? (
        <Notification
          message={notification.message}
          onDismiss={() => setNotification(undefined)}
          variant={notification.variant}
        />
      ) : null}
      <TextInput
        autoComplete="off"
        error={errors.title}
        label="Rubrik"
        maxLength={120}
        name="title"
        required
        value={values.title}
        onChange={(event) => updateField("title", event.target.value)}
      />
      <Textarea
        error={errors.description}
        label="Beskrivning"
        maxLength={5000}
        name="description"
        required
        value={values.description}
        onChange={(event) => updateField("description", event.target.value)}
      />
      <Select
        error={errors.category}
        label="Kategori"
        name="category"
        options={categoryOptions}
        placeholder="Välj kategori"
        required
        value={values.category}
        onChange={(event) => {
          if (isIssueCategory(event.target.value)) {
            updateField("category", event.target.value);
          }
        }}
      />
      <Select
        label="Prioritet"
        name="priority"
        options={priorityOptions}
        required
        value={values.priority}
        onChange={(event) => {
          if (isIssuePriority(event.target.value)) {
            updateField("priority", event.target.value);
          }
        }}
      />
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting
          ? "Sparar…"
          : notification?.variant === "error"
            ? "Försök igen"
            : isEditing
              ? "Spara ändringar"
              : "Skapa ärende"}
      </Button>
    </form>
  );
}
