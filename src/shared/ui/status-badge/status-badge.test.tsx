import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge, issueStatuses } from "./status-badge";

describe("StatusBadge", () => {
  it("K1 T1 identifies every status by its visible text", () => {
    for (const status of issueStatuses) {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    }
  });

  it("T2 keeps every status text at WCAG AA contrast in both themes", () => {
    const stylesheet = readFileSync(
      "src/app/globals.css",
      "utf8",
    );
    const getTokenBlock = (selector: string) => {
      const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const block = stylesheet.match(
        new RegExp(`${escapedSelector}\\s*\\{([^}]+)\\}`),
      )?.[1];
      if (!block) {
        throw new Error(`Missing CSS token block: ${selector}`);
      }

      return block;
    };
    const getToken = (block: string, name: string) => {
      const value = block.match(new RegExp(`${name}:\\s*(#[\\da-fA-F]{6})`))
        ?.[1];
      if (!value) {
        throw new Error(`Missing CSS color token: ${name}`);
      }

      return value;
    };
    const lightTokens = getTokenBlock(":root");
    const darkTokens = getTokenBlock(':root[data-theme="dark"]');

    const relativeLuminance = (color: string) => {
      const channels = color
        .slice(1)
        .match(/.{2}/g)
        ?.map((channel) => Number.parseInt(channel, 16));

      if (!channels || channels.length !== 3) {
        throw new Error(`Unexpected CSS hex color: ${color}`);
      }

      const [red, green, blue] = channels.map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      });

      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    };

    const contrastRatio = (foreground: string, background: string) => {
      const values = [
        relativeLuminance(foreground),
        relativeLuminance(background),
      ].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };

    for (const tokens of [lightTokens, darkTokens]) {
      for (const status of issueStatuses) {
        const statusToken = status
          .toLowerCase()
          .replace("väntar på kund", "waiting")
          .replace("pågående", "progress")
          .replace("avslutat", "done")
          .replace("nytt", "new");
        const foreground = getToken(tokens, `--status-${statusToken}-text`);
        const background = getToken(tokens, `--status-${statusToken}-bg`);

        expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(
          4.5,
        );
      }
    }
  });
});
