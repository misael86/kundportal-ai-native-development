import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IssueDetail } from "./issue-detail";

const issue = {
  id: 27,
  title: "Faktura debiterad två gånger",
  description: "Kunden ser två debiteringar för samma beställning.",
  category: "Betalning",
  priority: "Akut",
  status: "Nytt",
  createdAt: "2026-10-28T09:30:00.000Z",
} as const;

describe("IssueDetail", () => {
  it("K1 K2 K3 K4 K5 K6 displays the selected issue and its saved values", () => {
    render(<IssueDetail issue={issue} onSaveStatus={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Faktura debiterad två gånger" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Kunden ser två debiteringar för samma beställning."),
    ).toBeInTheDocument();
    expect(screen.getByText("Betalning")).toBeInTheDocument();
    expect(screen.getByText("Akut")).toBeInTheDocument();
    expect(screen.getByText("Nytt", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByRole("time")).toHaveAttribute("dateTime", issue.createdAt);
  });

  it("K7 K8 D1 T1 T2 T3 saves a chosen status without changing creation time", async () => {
    const user = userEvent.setup();
    const onSaveStatus = vi.fn();
    render(<IssueDetail issue={issue} onSaveStatus={onSaveStatus} />);

    const statusSelect = screen.getByRole("combobox", { name: "Ny status" });
    fireEvent.change(statusSelect, { target: { value: "Ogiltig" } });
    expect(statusSelect).toHaveValue("Nytt");
    await user.selectOptions(
      statusSelect,
      "Pågående",
    );
    await user.click(screen.getByRole("button", { name: "Spara status" }));

    expect(onSaveStatus).toHaveBeenCalledWith("Pågående");
    expect(screen.getByRole("status")).toHaveTextContent("Statusen har uppdaterats.");
    expect(screen.getByText("Pågående", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByRole("time")).toHaveAttribute("dateTime", issue.createdAt);
    expect(screen.getByRole("combobox", { name: "Ny status" })).toHaveValue(
      "Pågående",
    );
    await user.click(screen.getByRole("button", { name: "Stäng meddelande" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("F1 shows a clear message for an invalid issue ID", () => {
    render(
      <IssueDetail
        issue={null}
        loadError="invalid-id"
        onSaveStatus={vi.fn()}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Ärendets ID är ogiltigt.",
    );
  });

  it("F2 shows a clear message when the issue does not exist", () => {
    render(
      <IssueDetail issue={null} loadError="not-found" onSaveStatus={vi.fn()} />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Ärendet kunde inte hittas.",
    );
  });

  it("F3 F4 preserves the selected status and does not report success when saving fails", async () => {
    const user = userEvent.setup();
    const onSaveStatus = vi.fn().mockRejectedValue(new Error("network"));
    render(<IssueDetail issue={issue} onSaveStatus={onSaveStatus} />);
    const statusSelect = screen.getByRole("combobox", { name: "Ny status" });

    await user.selectOptions(statusSelect, "Avslutat");
    await user.click(screen.getByRole("button", { name: "Spara status" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Det gick inte att uppdatera statusen. Försök igen.",
    );
    expect(statusSelect).toHaveValue("Avslutat");
    expect(screen.getByText("Nytt", { selector: "span" })).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a disabled saving state while the status callback is pending", async () => {
    const user = userEvent.setup();
    let finishSaving = () => {};
    const onSaveStatus = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishSaving = resolve;
        }),
    );
    render(<IssueDetail issue={issue} onSaveStatus={onSaveStatus} />);

    await user.click(screen.getByRole("button", { name: "Spara status" }));
    expect(screen.getByRole("button", { name: "Sparar…" })).toBeDisabled();

    finishSaving();
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Statusen har uppdaterats.",
    );
  });
});
