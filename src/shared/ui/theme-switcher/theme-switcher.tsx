"use client";

import { useId, useState } from "react";
import styles from "./theme-switcher.module.css";
import { type ThemePreference } from "./theme";

type ThemeSwitcherProps = {
  initialTheme: ThemePreference;
};

function readThemeCookie(): string | undefined {
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("theme="));

  if (!cookie) {
    return undefined;
  }

  return cookie.slice("theme=".length);
}

function isThemePreference(value: string): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function saveThemePreference(theme: ThemePreference): void {
  if (theme === "system") {
    document.cookie = "theme=; Max-Age=0; Path=/; SameSite=Lax";
  } else {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `theme=${theme}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  }

  const savedTheme = readThemeCookie();
  const expectedTheme = theme === "system" ? undefined : theme;
  if (savedTheme !== expectedTheme) {
    throw new Error("Temavalet kunde inte sparas i webbläsaren.");
  }
}

export function ThemeSwitcher({ initialTheme }: ThemeSwitcherProps) {
  const generatedId = useId();
  const selectId = `theme-preference-${generatedId}`;
  const [theme, setTheme] = useState(initialTheme);
  const [error, setError] = useState("");

  function handleChange(nextTheme: ThemePreference) {
    try {
      saveThemePreference(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      setTheme(nextTheme);
      setError("");
    } catch {
      setError(
        "Temavalet kunde inte sparas i webbläsaren. Kontrollera webbläsarens cookieinställningar.",
      );
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={selectId}>
        Färgtema
      </label>
      <select
        className={styles.select}
        id={selectId}
        value={theme}
        onChange={(event) => {
          const nextTheme = event.target.value;
          if (!isThemePreference(nextTheme)) {
            setError("Ogiltigt temaval.");
            return;
          }
          handleChange(nextTheme);
        }}
      >
        <option value="system">Systemets inställning</option>
        <option value="light">Ljust</option>
        <option value="dark">Mörkt</option>
      </select>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
