import type { Meta, StoryObj } from "@storybook/nextjs";
import { ThemeSwitcher } from "./theme-switcher";

const meta = {
  title: "Shared/ThemeSwitcher",
  component: ThemeSwitcher,
  args: {
    initialTheme: "system",
  },
  argTypes: {
    initialTheme: {
      control: "inline-radio",
      options: ["system", "light", "dark"],
    },
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SystemPreference: Story = {};

export const Light: Story = {
  args: { initialTheme: "light" },
};

export const Dark: Story = {
  args: { initialTheme: "dark" },
};
