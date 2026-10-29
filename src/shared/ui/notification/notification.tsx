import { AlertCircle, CheckCircle2, X } from "lucide-react";
import styles from "./notification.module.css";

type NotificationProps = {
  message: string;
  variant: "success" | "error";
  onDismiss: () => void;
};

export function Notification({
  message,
  onDismiss,
  variant,
}: NotificationProps) {
  const isError = variant === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div
      className={`${styles.notification} ${isError ? styles.error : styles.success}`}
      role={isError ? "alert" : "status"}
    >
      <Icon aria-hidden="true" className={styles.icon} size={20} />
      <p className={styles.message}>{message}</p>
      <button
        aria-label="Stäng meddelande"
        className={styles.dismiss}
        onClick={onDismiss}
        type="button"
      >
        <X aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
