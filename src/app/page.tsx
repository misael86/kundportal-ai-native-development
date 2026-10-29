import { cookies } from "next/headers";
import { ThemePreferenceControl } from "./theme-preference-control";
import { getThemePreference } from "@/shared/theme";
import styles from "./page.module.css";

export default async function HomePage() {
  const theme = getThemePreference((await cookies()).get("theme")?.value);

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>Kundserviceportal · designsystem</p>
        <h1>En tydlig grund för varje ärende.</h1>
        <p className={styles.description}>
          Utforska de delade gränssnittskomponenterna i Storybook och växla
          mellan ljust och mörkt tema.
        </p>
        <a className={styles.storybookLink} href="http://localhost:6006">
          Öppna Storybook
        </a>
        <ThemePreferenceControl initialTheme={theme} />
      </section>
    </main>
  );
}
