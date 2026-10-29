import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { Notification } from "./notification";

describe("Notification", () => {
  it("K1 displays the caller-provided message", () => {
    render(
      <Notification
        message="Ärendet är uppdaterat."
        onDismiss={vi.fn()}
        variant="success"
      />,
    );

    expect(screen.getByText("Ärendet är uppdaterat.")).toBeInTheDocument();
  });

  it("K2 T1 announces success through a polite status region", () => {
    render(
      <Notification
        message="Ärendet är sparat."
        onDismiss={vi.fn()}
        variant="success"
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Ärendet är sparat.");
  });

  it("K2 T2 F1 announces errors as alerts, not success", () => {
    render(
      <Notification
        message="Ärendet kunde inte sparas."
        onDismiss={vi.fn()}
        variant="error"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Ärendet kunde inte sparas.",
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("K3 T3 dismisses with a named keyboard-operable control", async () => {
    const user = userEvent.setup();
    function Example() {
      const [visible, setVisible] = useState(true);
      return visible ? (
        <Notification
          message="Ärendet är sparat."
          onDismiss={() => setVisible(false)}
          variant="success"
        />
      ) : (
        <p>Ärende sparat</p>
      );
    }

    render(<Example />);
    const closeButton = screen.getByRole("button", {
      name: "Stäng meddelande",
    });

    closeButton.focus();
    await user.keyboard("{Enter}");

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByText("Ärende sparat")).toBeInTheDocument();
    const stylesheet = readFileSync(
      "src/shared/ui/notification/notification.module.css",
      "utf8",
    );
    expect(stylesheet).toMatch(
      /\.dismiss:focus-visible\s*\{\s*outline:\s*3px solid var\(--focus-ring\)/,
    );
  });

  it("T4 keeps the icon decorative and the message understandable", () => {
    render(
      <Notification
        message="Ärendet är sparat."
        onDismiss={vi.fn()}
        variant="success"
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Ärendet är sparat.");
    expect(screen.getByRole("status").querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
