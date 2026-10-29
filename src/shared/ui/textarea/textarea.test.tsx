import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("K1 allows the user to enter and change multiline text", async () => {
    const user = userEvent.setup();
    render(
      <Textarea label="Beskrivning" hint="Beskriv vad som har hänt." />,
    );
    const textarea = screen.getByRole("textbox", { name: "Beskrivning" });

    await user.type(textarea, "Första raden{Enter}Andra raden");
    expect(textarea).toHaveValue("Första raden\nAndra raden");
    expect(textarea).toHaveAccessibleDescription(
      "Beskriv vad som har hänt.",
    );
  });

  it("D1 D2 D3 applies feature-provided client constraints", () => {
    render(<Textarea label="Beskrivning" required maxLength={5000} />);
    const textarea = screen.getByRole("textbox", { name: "Beskrivning" });

    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute("maxLength", "5000");
  });

  it("T1 T2 T3 T4 associates its label, error, and invalid state", () => {
    render(<Textarea label="Beskrivning" error="Ange en beskrivning." />);
    const textarea = screen.getByRole("textbox", { name: "Beskrivning" });

    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Ange en beskrivning.");
  });

  it("F1 F2 allows correction without changing another field", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Textarea
          label="Beskrivning"
          defaultValue="Fel"
          error="Ange en beskrivning."
        />
        <Textarea label="Kommentar" defaultValue="Behåll mig" />
      </>,
    );
    const description = screen.getByRole("textbox", { name: "Beskrivning" });
    const comment = screen.getByRole("textbox", { name: "Kommentar" });

    await user.clear(description);
    await user.type(description, "Rätt");

    expect(description).toHaveValue("Rätt");
    expect(comment).toHaveValue("Behåll mig");
  });
});
