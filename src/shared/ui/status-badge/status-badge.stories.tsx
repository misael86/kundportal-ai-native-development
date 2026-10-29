import type { Meta, StoryObj } from "@storybook/nextjs";
import { StatusBadge, issueStatuses } from "./status-badge";

const meta = {
  title: "Shared/StatusBadge",
  component: StatusBadge,
  args: {
    status: "Nytt",
  },
  argTypes: {
    status: {
      control: "select",
      options: issueStatuses,
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
  args: { status: "Nytt" },
};

export const InProgress: Story = {
  args: { status: "Pågående" },
};

export const WaitingForCustomer: Story = {
  args: { status: "Väntar på kund" },
};

export const Closed: Story = {
  args: { status: "Avslutat" },
};
