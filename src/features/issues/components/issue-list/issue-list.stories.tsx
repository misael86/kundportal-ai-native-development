import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn, userEvent, within } from "storybook/test";
import { demoIssues } from "../../stories/fixtures";
import { IssueList } from "./issue-list";

const meta = {
  title: "Issues/IssueList",
  component: IssueList,
  args: {
    issues: demoIssues,
  },
} satisfies Meta<typeof IssueList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {};

export const Loading: Story = {
  args: {
    issues: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    issues: [],
  },
};

export const NoSearchResults: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.type(
      within(canvasElement).getByRole("searchbox", { name: "Sök ärenden" }),
      "ingen träff",
    );
  },
};

export const LoadError: Story = {
  args: {
    issues: [],
    error: "Det gick inte att hämta ärendena. Försök igen.",
    onRetry: fn(),
  },
};
