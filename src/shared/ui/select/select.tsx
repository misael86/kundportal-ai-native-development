import { ChevronDown } from "lucide-react";
import { useId, type SelectHTMLAttributes } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  id?: string;
  label: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
  placeholder?: string;
};

export function Select({
  error,
  hint,
  id,
  label,
  options,
  placeholder,
  ...selectProps
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>
      {hint ? (
        <span className={styles.hint} id={hintId}>
          {hint}
        </span>
      ) : null}
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          id={selectId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          {...selectProps}
        >
          {placeholder ? (
            <option value="" disabled={selectProps.required}>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className={styles.chevron}
          size={24}
          strokeWidth={2}
        />
      </div>
      {error ? (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
