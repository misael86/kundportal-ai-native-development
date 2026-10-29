import { useId, type TextareaHTMLAttributes } from "react";
import styles from "./textarea.module.css";

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
};

export function Textarea({
  error,
  hint,
  id,
  label,
  ...textareaProps
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = hint ? `${textareaId}-hint` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={textareaId}>
        {label}
      </label>
      {hint ? (
        <span className={styles.hint} id={hintId}>
          {hint}
        </span>
      ) : null}
      <textarea
        className={styles.textarea}
        id={textareaId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        {...textareaProps}
      />
      {error ? (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
