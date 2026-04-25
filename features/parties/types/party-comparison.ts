/** Minimal row for the grid, filters, and client payload (no per-party heavy sections). */
export type PartyListRow = {
  id: string;
  name: string;
  leader: string;
  image: string | null;
  baseTopicByTitle: Record<string, string>;
  legislationById: Record<string, string>;
};

export type PartyComparisonRow = {
  id: string;
  name: string;
  leader: string;
  image: string | null;
  vision: string | null;
  /** baseTopicTitle → selected option display */
  baseTopicByTitle: Record<string, string>;
  /** legislation id → option display */
  legislationById: Record<string, string>;
  members: string[];
  recentActionsItems: {
    category: string;
    title: string;
    description: string | null;
  }[];
  futurePromisesItems: { title: string; description: string | null }[];
};

export type PartyFilterBaseTopicBlock = {
  title: string;
  options: { value: string; label: string }[];
};

export type PartyPageFilterMeta = {
  typeBaseTopic: PartyFilterBaseTopicBlock;
  securityBaseTopic: PartyFilterBaseTopicBlock;
  economyBaseTopic: PartyFilterBaseTopicBlock;
  /** Row id = BaseTopic.title (stable in DB) */
  attributeTopics: { id: string; label: string }[];
  /** Law filter + issues carousel; id = legislation UUID */
  lawIssues: { id: string; label: string; group: string }[];
  attributesSectionTitle: string;
  issuesSectionTitle: string;
};

/**
 * Display order for the issues carousel group pages.
 * Unknown groups (if ever added in DB) are shown after these.
 */
export const PARTY_LAW_ISSUE_GROUPS = [
  "משפט וממשל",
  "ביטחון ומדיניות",
  "חברה וכלכלה",
  "דת ומדינה",
] as const;

export type MandatesChartParty = {
  key: string;
  name: string;
  mandates: number;
  color: string;
};
