import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TextInput } from "./text-input";

describe("TextInput", () => {
  it("K1 allows the user to enter and change text", async () => {
    const user = userEvent.setup();
    render(<TextInput label="Ämne" hint="Ange en kort rubrik." />);
    const input = screen.getByRole("textbox", { name: "Ämne" });

    await user.type(input, "Leverans");
    expect(input).toHaveValue("Leverans");
    expect(input).toHaveAccessibleDescription("Ange en kort rubrik.");
  });

  it("D1 D2 D3 applies feature-provided client constraints", () => {
    render(<TextInput label="Ämne" required maxLength={120} />);
    const input = screen.getByRole("textbox", { name: "Ämne" });

    expect(input).toBeRequired();
    expect(input).toHaveAttribute("maxLength", "120");
  });

  it("T1 T2 T3 T4 associates its label, error, and invalid state", () => {
    render(<TextInput label="Ämne" error="Ange ett ämne." />);
    const input = screen.getByRole("textbox", { name: "Ämne" });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Ange ett ämne.");
  });

  it("F1 F2 allows correction without changing another field", async () => {
    const user = userEvent.setup();
    render(
      <>
        <TextInput label="Ämne" defaultValue="Fel" error="Ange ett ämne." />
        <TextInput label="Kategori" defaultValue="Leverans" />
      </>,
    );
    const title = screen.getByRole("textbox", { name: "Ämne" });
    const category = screen.getByRole("textbox", { name: "Kategori" });

    await user.clear(title);
    await user.type(title, "Rätt");

    expect(title).toHaveValue("Rätt");
    expect(category).toHaveValue("Leverans");
  });
});
