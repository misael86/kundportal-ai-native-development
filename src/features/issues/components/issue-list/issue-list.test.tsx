import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IssueList } from "./issue-list";

const issues = [
  {
    id: 1,
    title: "Leverans försenad",
    description: "Paketet har inte kommit.",
    category: "Leverans",
    priority: "Normal",
    status: "Nytt",
    createdAt: "2026-10-27T09:00:00.000Z",
  },
  {
    id: 2,
    title: "ÅTERBETALNING saknas",
    description: "Kunden väntar på pengar.",
    category: "Retur/reklamation",
    priority: "Hög",
    status: "Pågående",
    createdAt: "2026-10-28T09:00:00.000Z",
  },
  {
    id: 3,
    title: "Konto låst",
    description: "Inloggning fungerar inte.",
    category: "Konto",
    priority: "Akut",
    status: "Väntar på kund",
    createdAt: "2026-10-28T09:00:00.000Z",
  },
] as const;

describe("IssueList", () => {
  it("K1 K2 displays issues sorted by creation time and descending ID for ties", () => {
    render(<IssueList issues={issues} />);
    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/issues/3",
      "/issues/2",
      "/issues/1",
    ]);
  });

  it("K3 T11 shows explanatory text when the database has no issues", () => {
    render(<IssueList issues={[]} />);

    expect(screen.getByText("Inga ärenden ännu")).toBeInTheDocument();
    expect(
      screen.getByText(/skapa det första ärendet/i),
    ).toBeInTheDocument();
  });

  it("K4 K5 K6 K7 K11 K12 searches trimmed title, description, and category case-insensitively", async () => {
    const user = userEvent.setup();
    render(<IssueList issues={issues} />);
    const search = screen.getByRole("searchbox", { name: "Sök ärenden" });

    await user.type(search, "  återbetalning  ");
    expect(screen.getByRole("link", { name: /ÅTERBETALNING saknas/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Leverans försenad/ })).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "väntar på pengar");
    expect(screen.getByRole("link", { name: /ÅTERBETALNING saknas/ })).toBeInTheDocument();

    await user.clear(search);
    await user.type(
      search,
      issues[1].category.toLocaleUpperCase("sv-SE"),
    );
    expect(screen.getByRole("link", { name: /ÅTERBETALNING saknas/ })).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "   ");
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("K8 combines the status filter with an active search", async () => {
    const user = userEvent.setup();
    render(<IssueList issues={issues} />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök ärenden" }),
      "leverans",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Filtrera efter status" }),
      "Nytt",
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link", { name: /Leverans försenad/ })).toBeInTheDocument();
  });

  it("K4 T11 shows a distinct message when a search has no matches", async () => {
    const user = userEvent.setup();
    render(<IssueList issues={issues} />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök ärenden" }),
      "saknas inte",
    );

    expect(screen.getByText("Inga ärenden matchar sökningen")).toBeInTheDocument();
    expect(screen.getByText(/ändra söktext eller statusfilter/i)).toBeInTheDocument();
    expect(screen.queryByText("Inga ärenden ännu")).not.toBeInTheDocument();
  });

  it("K9 K10 T8 T9 exposes loading status and hides decorative skeletons", () => {
    render(<IssueList issues={[]} loading />);
    const list = screen.getByRole("region", { name: "Ärenden" });
    const listStylesheet = readFileSync(
      "src/features/issues/components/issue-list/issue-list.module.css",
      "utf8",
    );

    expect(screen.getByRole("status")).toHaveTextContent("Hämtar ärenden…");
    expect(list).toHaveAttribute("aria-busy", "true");
    expect(list.querySelector("[aria-hidden='true']")).toBeInTheDocument();
    expect(listStylesheet).toMatch(
      /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*animation:\s*none/,
    );
  });

  it("T1 T2 T3 T4 T5 T6 T7 labels controls and keeps all list actions keyboard-accessible", async () => {
    const user = userEvent.setup();
    render(<IssueList issues={issues} />);
    const search = screen.getByRole("searchbox", { name: "Sök ärenden" });
    const filter = screen.getByRole("combobox", {
      name: "Filtrera efter status",
    });
    const textInputStylesheet = readFileSync(
      "src/shared/ui/text-input/text-input.module.css",
      "utf8",
    );
    const selectStylesheet = readFileSync(
      "src/shared/ui/select/select.module.css",
      "utf8",
    );
    const cardStylesheet = readFileSync(
      "src/features/issues/components/issue-card/issue-card.module.css",
      "utf8",
    );
    await user.tab();
    expect(search).toHaveFocus();
    await user.tab();
    expect(filter).toHaveFocus();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    const firstLink = screen.getAllByRole("link")[0];
    const onActivate = vi.fn();
    firstLink.addEventListener("click", (event) => {
      event.preventDefault();
      onActivate();
    });
    await user.tab();
    expect(firstLink).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onActivate).toHaveBeenCalledOnce();
    expect(textInputStylesheet).toMatch(/min-height:\s*2\.75rem/);
    expect(selectStylesheet).toMatch(/min-height:\s*2\.75rem/);
    expect(cardStylesheet).toMatch(/min-height:\s*44px/);
  });

  it("F1 F2 F3 F4 F5 shows errors separately and retains search and filter values", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const { rerender } = render(<IssueList issues={issues} />);
    const search = screen.getByRole("searchbox", { name: "Sök ärenden" });
    const filter = screen.getByRole("combobox", {
      name: "Filtrera efter status",
    });

    await user.type(search, "leverans");
    await user.selectOptions(filter, "Nytt");
    rerender(
      <IssueList
        issues={[]}
        error="Det gick inte att hämta ärendena. Försök igen."
        onRetry={onRetry}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Det gick inte att hämta ärendena. Försök igen.",
    );
    expect(screen.getByRole("searchbox", { name: "Sök ärenden" })).toHaveValue(
      "leverans",
    );
    expect(
      screen.getByRole("combobox", { name: "Filtrera efter status" }),
    ).toHaveValue("Nytt");
    expect(screen.queryByText("Inga ärenden ännu")).not.toBeInTheDocument();
    expect(screen.queryByText("Inga ärenden matchar sökningen")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Försök igen" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("F1 does not render stale issue results together with a load error", () => {
    render(
      <IssueList
        issues={issues}
        error="Det gick inte att hämta ärendena. Försök igen."
      />,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("does not show a retry action when no retry callback is supplied", () => {
    render(<IssueList issues={[]} error="Kunde inte läsa ärenden." />);

    expect(screen.getByRole("alert")).toHaveTextContent("Kunde inte läsa ärenden.");
    expect(screen.queryByRole("button", { name: "Försök igen" })).not.toBeInTheDocument();
  });

  it("does not show a retry action when no retry callback is supplied", () => {
    render(<IssueList issues={[]} error="Kunde inte läsa ärenden." />);

    expect(screen.getByRole("alert")).toHaveTextContent("Kunde inte läsa ärenden.");
    expect(screen.queryByRole("button", { name: "Försök igen" })).not.toBeInTheDocument();
  });
});
