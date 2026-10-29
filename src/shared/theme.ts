export type ThemePreference = "system" | "light" | "dark";

export function getThemePreference(value: string | undefined): ThemePreference {
  if (value === "light" || value === "dark") {
    return value;
  }

  return "system";
}
