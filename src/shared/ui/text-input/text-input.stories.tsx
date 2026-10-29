import type { Meta, StoryObj } from "@storybook/nextjs";
import { TextInput } from "./text-input";

const meta = {
  title: "Shared/TextInput",
  component: TextInput,
  args: {
    label: "Ämne",
    placeholder: "Beskriv ärendet kort",
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
    hint: "Obligatoriskt fält",
  },
};

export const WithError: Story = {
  args: {
    value: "Betalning",
    error: "Ämnet får vara högst 120 tecken.",
  },
};

export const Disabled: Story = {
  args: {
    value: "Kan inte redigeras",
    disabled: true,
  },
};
