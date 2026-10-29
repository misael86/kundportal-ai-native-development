import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn, userEvent, within } from "storybook/test";
import { demoIssue } from "../../stories/fixtures";
import { IssueDetail } from "./issue-detail";

const meta = {
  title: "Issues/IssueDetail",
  component: IssueDetail,
  args: {
    issue: demoIssue,
    onSaveStatus: fn(),
  },
} satisfies Meta<typeof IssueDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StatusSaved: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Ny status" }),
      "Avslutat",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Spara status" }));
  },
};

export const StatusSaveError: Story = {
  args: {
    onSaveStatus: fn(async () => {
      throw new Error("Save failed");
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Ny status" }),
      "Avslutat",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Spara status" }));
  },
};

export const InvalidId: Story = {
  args: {
    issue: null,
    loadError: "invalid-id",
  },
};

export const NotFound: Story = {
  args: {
    issue: null,
    loadError: "not-found",
  },
};
