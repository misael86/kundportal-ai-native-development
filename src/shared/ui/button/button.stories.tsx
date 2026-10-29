import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta = {
  title: "Shared/Button",
  component: Button,
  args: {
    children: "Spara ändringar",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Avbryt" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Sparar…" },
};
