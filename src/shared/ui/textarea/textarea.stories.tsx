import type { Meta, StoryObj } from "@storybook/nextjs";
import { Textarea } from "./textarea";

const meta = {
  title: "Shared/Textarea",
  component: Textarea,
  args: {
    label: "Beskrivning",
    placeholder: "Beskriv hur vi kan hjälpa dig",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
    maxLength: 5000,
    hint: "Beskrivning krävs.",
  },
};

export const WithError: Story = {
  args: {
    value: "En beskrivning",
    error: "Beskrivningen är för kort.",
  },
};

export const Disabled: Story = {
  args: {
    value: "Kan inte redigeras",
    disabled: true,
  },
};
