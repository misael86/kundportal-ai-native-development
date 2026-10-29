"use client";

import { useState } from "react";
import { type ThemePreference } from "../shared/theme";
import { Select } from "../shared/ui/select/select";
import styles from "./theme-preference-control.module.css";

const themeOptions = [
  { value: "system", label: "Systemets inställning" },
  { value: "light", label: "Ljust" },
  { value: "dark", label: "Mörkt" },
];

type ThemePreferenceControlProps = {
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

  const expectedTheme = theme === "system" ? undefined : theme;
  if (readThemeCookie() !== expectedTheme) {
    throw new Error("Temavalet kunde inte sparas i webbläsaren.");
  }
}

export function ThemePreferenceControl({
  initialTheme,
}: ThemePreferenceControlProps) {
  const [theme, setTheme] = useState(initialTheme);
  const [error, setError] = useState("");

  function handleChange(value: string) {
    if (!isThemePreference(value)) {
      setError("Ogiltigt temaval.");
      return;
    }

    try {
      saveThemePreference(value);
      document.documentElement.dataset.theme = value;
      setTheme(value);
      setError("");
    } catch {
      setError(
        "Temavalet kunde inte sparas i webbläsaren. Kontrollera webbläsarens cookieinställningar.",
      );
    }
  }

  return (
    <div className={styles.container}>
      <Select
        label="Färgtema"
        options={themeOptions}
        value={theme}
        onChange={(event) => handleChange(event.target.value)}
        error={error || undefined}
      />
    </div>
  );
}
