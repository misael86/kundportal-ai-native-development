import type { Meta, StoryObj } from "@storybook/nextjs";
import { IssueCard } from "./issue-card";
import { demoIssue } from "../../stories/fixtures";

const meta = {
  title: "Issues/IssueCard",
  component: IssueCard,
  args: {
    issue: demoIssue,
  },
} satisfies Meta<typeof IssueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const NewlyCreated: Story = {
  args: {
    issue: { ...demoIssue, status: "Nytt", priority: "Normal" },
  },
};

export const Completed: Story = {
  args: {
    issue: { ...demoIssue, status: "Avslutat" },
  },
};
