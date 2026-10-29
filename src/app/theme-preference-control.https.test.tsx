// @vitest-environment jsdom
// @vitest-environment-options {"url":"https://localhost:3000"}

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemePreferenceControl } from "./theme-preference-control";

afterEach(() => {
  document.cookie = "theme=; Max-Age=0; Path=/; SameSite=Lax";
});

describe("ThemePreferenceControl over HTTPS", () => {
  it("K3 saves a manual theme preference in the secure context", async () => {
    const user = userEvent.setup();
    render(<ThemePreferenceControl initialTheme="system" />);

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
