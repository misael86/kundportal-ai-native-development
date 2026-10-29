import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("K1 K2 performs one action for one activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Spara</Button>);

    await user.click(screen.getByRole("button", { name: "Spara" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("K3 keeps primary and secondary variants as buttons", () => {
    render(
      <>
        <Button variant="primary">Primär</Button>
        <Button variant="secondary">Sekundär</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: "Primär" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sekundär" })).toBeInTheDocument();
  });

  it("T1 T2 exposes an accessible button name", () => {
    render(<Button aria-label="Stäng">×</Button>);

    expect(screen.getByRole("button", { name: "Stäng" })).toBeInTheDocument();
  });

  it("T3 activates with Enter and Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Aktivera</Button>);
    const button = screen.getByRole("button", { name: "Aktivera" });

    button.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("T5 provides a minimum 44 by 44 CSS-pixel target", () => {
    render(<Button>Fortsätt</Button>);
    const button = screen.getByRole("button", { name: "Fortsätt" });
    const style = window.getComputedStyle(button);

    expect(Number.parseFloat(style.minWidth)).toBeGreaterThanOrEqual(44);
    expect(Number.parseFloat(style.minHeight)).toBeGreaterThanOrEqual(44);
  });

  it("T4 shows a focus ring when reached by keyboard", async () => {
    const user = userEvent.setup();
    render(<Button>Fortsätt</Button>);
    const button = screen.getByRole("button", { name: "Fortsätt" });

    await user.tab();

    expect(button).toHaveFocus();
    const stylesheet = readFileSync(
      "src/shared/ui/button/button.module.css",
      "utf8",
    );
    expect(stylesheet).toMatch(
      /\.button:focus-visible\s*\{\s*outline:\s*3px solid var\(--focus-ring\)/,
    );
  });

  it("T6 T7 keeps a disabled button inactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Spara
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Spara" });

    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
