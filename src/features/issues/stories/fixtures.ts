import { type IssueRecord } from "../issue-types";

export const demoIssue: IssueRecord = {
  id: 1042,
  title: "Återbetalning saknas efter retur",
  description:
    "Kunden har skickat tillbaka varan men återbetalningen syns ännu inte.",
  category: "Retur/reklamation",
  priority: "Hög",
  status: "Pågående",
  createdAt: "2026-10-28T09:30:00.000Z",
};

export const demoIssues: IssueRecord[] = [
  demoIssue,
  {
    id: 1041,
    title: "Paketet har inte kommit fram",
    description: "Spårningen har inte uppdaterats sedan i måndags.",
    category: "Leverans",
    priority: "Normal",
    status: "Nytt",
    createdAt: "2026-10-27T14:15:00.000Z",
  },
  {
    id: 1040,
    title: "Kan inte logga in på kontot",
    description: "Lösenordsåterställningen skickar ingen e-post.",
    category: "Konto",
    priority: "Akut",
    status: "Väntar på kund",
    createdAt: "2026-10-26T08:00:00.000Z",
  },
];
