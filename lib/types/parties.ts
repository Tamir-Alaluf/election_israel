import { FuturePromiseItem, ActionItem, LegislationItem } from "./shared";

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
export type PartyWithAdvisorRelations = {
  baseTopics: { baseTopicTitle: string; baseTopicOptionDisplayValue: string }[];
  legislations: LegislationItem[];
  members: string[];
  recentActions: ActionItem[];
  futurePromises: FuturePromiseItem[];
  leader: string | null;
};
