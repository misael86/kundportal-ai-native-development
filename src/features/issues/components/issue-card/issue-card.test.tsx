import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { IssueCard } from "./issue-card";

const issue = {
  id: 12,
  title: "Återbetalning saknas",
  description: "Kunden saknar återbetalning efter retur.",
  category: "Retur/reklamation",
  priority: "Hög",
  status: "Pågående",
  createdAt: "2026-10-28T09:30:00.000Z",
} as const;

describe("IssueCard", () => {
  it("K1 K2 K3 K4 K5 T5 displays issue details with textual status", () => {
    render(<IssueCard issue={issue} />);

    expect(
      screen.getByRole("link", { name: /Återbetalning saknas/ }),
    ).toHaveAttribute("href", "/issues/12");
    expect(
      screen.getByRole("heading", { name: "Återbetalning saknas" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Retur/reklamation")).toBeInTheDocument();
    expect(screen.getByText("Prioritet: Hög")).toBeInTheDocument();
    expect(screen.getByText("Pågående")).toBeInTheDocument();
    expect(screen.getByRole("time")).toHaveAttribute(
      "dateTime",
      issue.createdAt,
    );
  });

  it("T1 T2 T3 links to the issue using an identifiable keyboard-accessible name", async () => {
    const user = userEvent.setup();
    render(<IssueCard issue={issue} />);
    const link = screen.getByRole("link", {
      name: /Återbetalning saknas/,
    });

    await user.tab();

    expect(link).toHaveFocus();
    expect(link).toHaveAccessibleName(/Återbetalning saknas/);
  });

  it("T4 provides a touch target of at least 44 by 44 CSS pixels", () => {
    const stylesheet = readFileSync(
      "src/features/issues/components/issue-card/issue-card.module.css",
      "utf8",
    );

    expect(stylesheet).toMatch(/min-height:\s*44px/);
    expect(stylesheet).toMatch(/min-width:\s*44px/);
  });
});
