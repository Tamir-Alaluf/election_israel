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
  leader: string;
  leaderImage: string | null;
  mandates: number;
  color: string;
};

export type MandatesBlocKey = "netanyahu" | "opposition" | "arabParties";

export type MandatesBlocSummary = {
  key: MandatesBlocKey;
  label: string;
  mandates: number;
  color: string;
  percent: number;
};

export type MandatesChartData = {
  parties: MandatesChartParty[];
  blocs: MandatesBlocSummary[];
};
