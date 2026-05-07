/** Answers collected before the AI-generated follow-up question. */
export type AdvisorAxisAnswers = {
  security: string;
  economy: string;
  harediGov: string;
  arabGov: string;
};

/** Full profile after the questionnaire (including optional AI Q&A). */
export type AdvisorProfile = AdvisorAxisAnswers & {
  aiFollowUpQuestion?: string;
  aiFollowUpAnswer?: string;
};

export type AdvisorQuestionStep =
  | "security"
  | "economy"
  | "harediGov"
  | "arabGov"
  | "aiFollowUp";

export type AdvisorFixedQuestion = {
  key: AdvisorQuestionStep;
  prompt: string;
  options: string[];
};

/** AI-generated single question with chip options. */
export type AdvisorAiQuestion = {
  question: string;
  options: string[];
};

export type AdvisorPartyMatch = {
  id: string;
  name: string;
  leader: string;
  image: string | null;
  /** Number of matching axes out of 4 (security, economy, haredi, arab). */
  score: number;
  /** 0–100 */
  matchPercent: number;
  /** Hebrew labels for axes that matched. */
  matchedAxes: string[];
};
