import type { Preview } from "@storybook/nextjs";
import { useEffect, type ReactNode } from "react";
import "../src/app/globals.css";

function ThemeDecorator({
  children,
  theme,
}: {
  children: ReactNode;
  theme: string;
}) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <main className="storybook-canvas">{children}</main>;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Växla mellan ljust och mörkt tema",
      toolbar: {
        title: "Tema",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Ljust" },
          { value: "dark", title: "Mörkt" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => (
      <ThemeDecorator theme={context.globals.theme}>
        <Story />
      </ThemeDecorator>
    ),
  ],
  parameters: {
    a11y: {
      test: "error",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
