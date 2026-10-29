import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IssueForm } from "./issue-form";

const validFields = {
  title: "Problem med leverans",
  description: "Paketet har inte kommit fram.",
  category: "Leverans",
  priority: "Normal",
} as const;

describe("IssueForm", () => {
  it("K1 K2 D5 D6 D7 creates an issue with the allowed values and initial status", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<IssueForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByRole("textbox", { name: "Rubrik" }),
      validFields.title,
    );
    await user.type(
      screen.getByRole("textbox", { name: "Beskrivning" }),
      validFields.description,
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Kategori" }),
      validFields.category,
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Prioritet" }),
      validFields.priority,
    );
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(onSubmit).toHaveBeenCalledWith({
      ...validFields,
      status: "Nytt",
    });

    expect(
      screen.getByRole("combobox", { name: "Kategori" }).querySelectorAll("option"),
    ).toHaveLength(6);
    expect(
      screen.getByRole("combobox", { name: "Prioritet" }).querySelectorAll("option"),
    ).toHaveLength(4);
  });

  it("D5 D6 ignores category and priority values outside the supplied options", () => {
    const onSubmit = vi.fn();
    render(<IssueForm onSubmit={onSubmit} />);
    const category = screen.getByRole("combobox", { name: "Kategori" });
    const priority = screen.getByRole("combobox", { name: "Prioritet" });

    fireEvent.change(category, { target: { value: "Okänd kategori" } });
    fireEvent.change(priority, { target: { value: "Brådskande" } });

    expect(category).toHaveValue("");
    expect(priority).toHaveValue("Normal");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("K3 K4 D5 D6 initializes edit values and preserves status separately", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <IssueForm
        initialValues={validFields}
        initialStatus="Väntar på kund"
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByRole("textbox", { name: "Rubrik" })).toHaveValue(
      validFields.title,
    );
    expect(screen.getByRole("textbox", { name: "Beskrivning" })).toHaveValue(
      validFields.description,
    );
    expect(screen.getByRole("combobox", { name: "Kategori" })).toHaveValue(
      validFields.category,
    );
    expect(screen.getByRole("combobox", { name: "Prioritet" })).toHaveValue(
      validFields.priority,
    );
    await user.clear(screen.getByRole("textbox", { name: "Rubrik" }));
    await user.type(
      screen.getByRole("textbox", { name: "Rubrik" }),
      "Uppdaterad rubrik",
    );
    await user.clear(screen.getByRole("textbox", { name: "Beskrivning" }));
    await user.type(
      screen.getByRole("textbox", { name: "Beskrivning" }),
      "Uppdaterad beskrivning",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Kategori" }),
      "Betalning",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Prioritet" }),
      "Hög",
    );
    await user.click(screen.getByRole("button", { name: "Spara ändringar" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Uppdaterad rubrik",
      description: "Uppdaterad beskrivning",
      category: "Betalning",
      priority: "Hög",
      status: "Väntar på kund",
    });
  });

  it("D1 D2 D3 D4 T1 T2 reports required trimmed fields and length limits accessibly", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<IssueForm onSubmit={onSubmit} />);

    await user.type(screen.getByRole("textbox", { name: "Rubrik" }), "   ");
    await user.type(
      screen.getByRole("textbox", { name: "Beskrivning" }),
      "   ",
    );
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(screen.getByText("Ange en rubrik.")).toBeInTheDocument();
    expect(screen.getByText("Ange en beskrivning.")).toBeInTheDocument();
    expect(screen.getByText("Välj en kategori.")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Rubrik" }),
    ).toHaveAccessibleDescription("Ange en rubrik.");
    expect(
      screen.getByRole("textbox", { name: "Beskrivning" }),
    ).toHaveAccessibleDescription("Ange en beskrivning.");
    expect(
      screen.getByRole("combobox", { name: "Kategori" }),
    ).toHaveAccessibleDescription("Välj en kategori.");
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(screen.getByRole("textbox", { name: "Rubrik" }), {
      target: { value: "x".repeat(121) },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Beskrivning" }), {
      target: { value: "x".repeat(5001) },
    });
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(screen.getByText("Rubriken får vara högst 120 tecken.")).toBeInTheDocument();
    expect(
      screen.getByText("Beskrivningen får vara högst 5 000 tecken."),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("D2 D4 accepts trimmed title and description at their exact maximum lengths", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<IssueForm onSubmit={onSubmit} />);
    const title = "x".repeat(120);
    const description = "y".repeat(5000);

    fireEvent.change(screen.getByRole("textbox", { name: "Rubrik" }), {
      target: { value: ` ${title} ` },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Beskrivning" }), {
      target: { value: ` ${description} ` },
    });
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Kategori" }),
      "Konto",
    );
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title,
      description,
      category: "Konto",
      priority: "Normal",
      status: "Nytt",
    });
  });

  it("T3 exposes keyboard-operable labelled fields and submit action", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<IssueForm onSubmit={onSubmit} initialValues={validFields} />);
    const title = screen.getByRole("textbox", { name: "Rubrik" });
    const description = screen.getByRole("textbox", { name: "Beskrivning" });
    const category = screen.getByRole("combobox", { name: "Kategori" });
    const priority = screen.getByRole("combobox", { name: "Prioritet" });
    const submit = screen.getByRole("button", { name: "Spara ändringar" });

    await user.tab();
    expect(title).toHaveFocus();
    await user.tab();
    expect(description).toHaveFocus();
    await user.tab();
    expect(category).toHaveFocus();
    await user.tab();
    expect(priority).toHaveFocus();
    await user.tab();
    expect(submit).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("F1 F2 F3 F4 preserves entered values, reports failed saves, and permits retry", async () => {
    const user = userEvent.setup();
    const onSubmit = vi
      .fn()
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce(undefined);
    render(<IssueForm onSubmit={onSubmit} />);
    const title = screen.getByRole("textbox", { name: "Rubrik" });
    const description = screen.getByRole("textbox", { name: "Beskrivning" });

    await user.type(title, validFields.title);
    await user.type(description, validFields.description);
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Kategori" }),
      validFields.category,
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Prioritet" }),
      validFields.priority,
    );
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Det gick inte att spara ärendet. Försök igen.",
    );
    expect(title).toHaveValue(validFields.title);
    expect(description).toHaveValue(validFields.description);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Försök igen" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Försök igen" }));

    expect(onSubmit).toHaveBeenCalledTimes(2);
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Ärendet har sparats.",
    );
    await user.click(screen.getByRole("button", { name: "Stäng meddelande" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a disabled saving state while the submit callback is pending", async () => {
    const user = userEvent.setup();
    let finishSaving = () => {};
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishSaving = resolve;
        }),
    );
    render(<IssueForm onSubmit={onSubmit} initialValues={validFields} />);

    await user.click(screen.getByRole("button", { name: "Spara ändringar" }));
    expect(screen.getByRole("button", { name: "Sparar…" })).toBeDisabled();

    finishSaving();
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Ärendet har sparats.",
    );
  });
});
