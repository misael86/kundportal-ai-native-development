// @vitest-environment jsdom
// @vitest-environment-options {"url":"https://localhost:3000"}

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeSwitcher } from "./theme-switcher";

afterEach(() => {
  document.cookie = "theme=; Max-Age=0; Path=/; SameSite=Lax";
});

describe("ThemeSwitcher over HTTPS", () => {
  it("K3 saves a manual theme preference in the secure context", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher initialTheme="system" />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Färgtema" }),
      "dark",
    );

    expect(document.cookie).toContain("theme=dark");
    expect(screen.getByRole("combobox", { name: "Färgtema" })).toHaveValue(
      "dark",
    );
  });
});
