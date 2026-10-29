import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./select";

const options = [
  { value: "account", label: "Konto" },
  { value: "payment", label: "Betalning" },
];

describe("Select", () => {
  it("K1 D1 lets the user choose only a supplied option", async () => {
    const user = userEvent.setup();
    render(
      <Select
        label="Kategori"
        options={options}
        hint="Välj den kategori som passar bäst."
        placeholder="Välj kategori"
      />,
    );
    const select = screen.getByRole("combobox", { name: "Kategori" });

    await user.selectOptions(select, "payment");

    expect(select).toHaveValue("payment");
    expect(screen.getByRole("option", { name: "Konto" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Välj kategori" }),
    ).toBeInTheDocument();
    expect(select).toHaveAccessibleDescription(
      "Välj den kategori som passar bäst.",
    );
  });

  it("D2 leaves authoritative validation to the feature and server", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const request = vi.fn();
    vi.stubGlobal("fetch", request);
    render(
      <Select
        label="Kategori"
        options={options}
        required
        placeholder="Välj kategori"
        onChange={onChange}
      />,
    );
    const select = screen.getByRole("combobox", { name: "Kategori" });

    expect(select).toBeRequired();
    expect(
      screen.getByRole("option", { name: "Välj kategori" }),
    ).toBeDisabled();
    await user.selectOptions(select, "payment");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(request).not.toHaveBeenCalled();
  });

  it("T1 T2 T3 T4 associates the label, error, and invalid state", () => {
    render(
      <Select label="Kategori" options={options} error="Välj en kategori." />,
    );
    const select = screen.getByRole("combobox", { name: "Kategori" });

    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("Välj en kategori.");
    expect(screen.getByRole("alert")).toHaveTextContent("Välj en kategori.");
  });

  it("keeps the original chevron shape at a larger size and further from the edge", () => {
    const { container } = render(<Select label="Kategori" options={options} />);
    const stylesheet = readFileSync(
      "src/shared/ui/select/select.module.css",
      "utf8",
    );
    const chevron = container.querySelector("svg");
    const chevronStyles = stylesheet.match(/\.chevron\s*\{([^}]+)\}/)?.[1];

    expect(chevron).toHaveAttribute("viewBox", "0 0 24 24");
    expect(chevron).toHaveAttribute("width", "24");
    expect(chevron).toHaveAttribute("height", "24");
    expect(chevron).toHaveAttribute("aria-hidden", "true");
    expect(chevron?.querySelector("path")).toHaveAttribute(
      "d",
      "m6 9 6 6 6-6",
    );
    expect(chevronStyles).toMatch(/right:\s*0\.75rem/);
    expect(chevronStyles).toMatch(/pointer-events:\s*none/);
  });

  it("F1 F2 allows correction and preserves another form value", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Select
          label="Kategori"
          options={options}
          defaultValue="account"
          error="Välj en kategori."
        />
        <input aria-label="Referens" defaultValue="ABC-12" />
      </>,
    );
    const select = screen.getByRole("combobox", { name: "Kategori" });
    const reference = screen.getByRole("textbox", { name: "Referens" });

    await user.selectOptions(select, "payment");

    expect(select).toHaveValue("payment");
    expect(reference).toHaveValue("ABC-12");
  });
});
