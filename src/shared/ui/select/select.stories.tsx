import type { Meta, StoryObj } from "@storybook/nextjs";
import { Select } from "./select";

const options = [
  { value: "account", label: "Konto" },
  { value: "payment", label: "Betalning" },
  { value: "delivery", label: "Leverans" },
];

const meta = {
  title: "Shared/Select",
  component: Select,
  args: {
    label: "Kategori",
    options,
    placeholder: "Välj kategori",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithError: Story = {
  args: {
    value: "payment",
    error: "Välj en kategori.",
  },
};

export const Disabled: Story = {
  args: {
    value: "delivery",
    disabled: true,
  },
};
