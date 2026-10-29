import { cookies } from "next/headers";
import { ThemeSwitcher } from "@/shared/ui/theme-switcher/theme-switcher";
import { getThemePreference } from "@/shared/ui/theme-switcher/theme";
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
        <ThemeSwitcher initialTheme={theme} />
      </section>
    </main>
  );
}
