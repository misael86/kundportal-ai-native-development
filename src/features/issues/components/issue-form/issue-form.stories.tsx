import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn, userEvent, within } from "storybook/test";
import { IssueForm } from "./issue-form";

const meta = {
  title: "Issues/IssueForm",
  component: IssueForm,
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof IssueForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {};

export const Edit: Story = {
  args: {
    initialValues: {
      title: "Paketet har inte kommit fram",
      description: "Spårningen har inte uppdaterats sedan i måndags.",
      category: "Leverans",
      priority: "Normal",
    },
    initialStatus: "Pågående",
  },
};

export const Saving: Story = {
  args: {
    onSubmit: fn(() => new Promise<void>(() => {})),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Rubrik" }),
      "Problem med faktura",
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Beskrivning" }),
      "Fakturan har debiterats två gånger.",
    );
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Kategori" }),
      "Konto",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Skapa ärende" }));
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Skapa ärende" }),
    );
  },
};

export const SaveError: Story = {
  args: {
    onSubmit: fn(async () => {
      throw new Error("Save failed");
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Rubrik" }),
      "Problem med faktura",
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Beskrivning" }),
      "Fakturan har debiterats två gånger.",
    );
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Kategori" }),
      "Konto",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Skapa ärende" }));
  },
};
