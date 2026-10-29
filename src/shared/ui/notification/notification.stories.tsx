import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { Notification } from "./notification";

const meta = {
  title: "Shared/Notification",
  component: Notification,
  args: {
    message: "Ärendet har sparats.",
    variant: "success",
    onDismiss: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["success", "error"],
    },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    message: "Det gick inte att spara ärendet. Försök igen.",
    variant: "error",
  },
};
