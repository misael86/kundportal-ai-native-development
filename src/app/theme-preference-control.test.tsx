import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getThemePreference } from "../shared/theme";
import { ThemePreferenceControl } from "./theme-preference-control";

afterEach(() => {
  document.cookie = "theme=; Max-Age=0; Path=/; SameSite=Lax";
  document.documentElement.dataset.theme = "system";
});

describe("ThemePreferenceControl", () => {
  it("K1 D1 uses system preference when no valid manual choice is stored", () => {
    expect(getThemePreference(undefined)).toBe("system");
    expect(getThemePreference("other")).toBe("system");
    const stylesheet = readFileSync("src/app/globals.css", "utf8");
    expect(stylesheet).toMatch(
      /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\[data-theme="system"\]/,
    );
  });

  it("K2 D1 lets the user choose only system, light, or dark", async () => {
    const user = userEvent.setup();
    render(<ThemePreferenceControl initialTheme="system" />);
    const select = screen.getByRole("combobox", { name: "Färgtema" });

    await user.selectOptions(select, "dark");

    expect(select).toHaveValue("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.cookie).toContain("theme=dark");
  });

  it("K2 clears the saved manual preference when system theme is selected", async () => {
    const user = userEvent.setup();
    render(<ThemePreferenceControl initialTheme="dark" />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Färgtema" }),
      "system",
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "system");
    expect(document.cookie).not.toContain("theme=");
  });

  it("D1 rejects a value outside the supported theme preferences", () => {
    render(<ThemePreferenceControl initialTheme="light" />);
    const select = screen.getByRole("combobox", { name: "Färgtema" });

    fireEvent.change(select, { target: { value: "sepia" } });

    expect(select).toHaveValue("light");
    expect(screen.getByRole("alert")).toHaveTextContent("Ogiltigt temaval.");
  });

  it("K3 restores the saved manual preference from the cookie", async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <ThemePreferenceControl initialTheme="system" />,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Färgtema" }),
      "light",
    );
    const savedTheme = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith("theme="))
      ?.slice("theme=".length);
    unmount();
    render(
      <ThemePreferenceControl initialTheme={getThemePreference(savedTheme)} />,
    );

    expect(screen.getByRole("combobox", { name: "Färgtema" })).toHaveValue(
      "light",
    );
  });

  it("T1 T2 exposes a labelled control that receives keyboard focus", async () => {
    const user = userEvent.setup();
    render(<ThemePreferenceControl initialTheme="system" />);
    const select = screen.getByRole("combobox", { name: "Färgtema" });

    await user.tab();

    expect(select).toHaveFocus();
  });

  it("T4 F1 preserves the active choice and announces cookie write failures", async () => {
    const user = userEvent.setup();
    vi.spyOn(document, "cookie", "get").mockReturnValue("");
    vi.spyOn(document, "cookie", "set").mockImplementation(() => {});
    render(<ThemePreferenceControl initialTheme="system" />);
    const select = screen.getByRole("combobox", { name: "Färgtema" });

    await user.selectOptions(select, "dark");

    expect(select).toHaveValue("system");
    expect(document.documentElement).toHaveAttribute("data-theme", "system");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Temavalet kunde inte sparas i webbläsaren.",
    );
  });
});
