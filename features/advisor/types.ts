/** UI mode on /advisor — `selecting` shows the entry cards. */
export type AdvisorMode = "selecting" | "ai_matching" | "free_chat";

/** Demographic profile — premade questions only, no political stance. */
export type AdvisorProfileBase = {
  ageRange: string;
  religiosity: string;
  region: string;
  lifeStage: string;
};

export type AdvisorPoliticalQA = {
  question: string;
  options: string[];
  answer: string;
};

export type AdvisorFinalProfile = AdvisorProfileBase & {
  rounds: AdvisorPoliticalQA[];
};

/** AI-generated question with chip options (one item in a batch of 5). */
export type AdvisorAiQuestion = {
  question: string;
  options: string[];
};

/** Inferred axes for rule-based scoring (must align with DB display values). */
export type AdvisorAxisSnapshot = {
  security: string;
  economy: string;
  harediGov: string;
  arabGov: string;
};

export type AdvisorCandidateMatch = {
  candidateId: string;
  candidateName: string;
  candidateImage: string | null;
  partyId: string;
  partyName: string;
  partyImage: string | null;
  partyMandates: number | null;
  /** Blended 0–100 */
  matchPercent: number;
  /** 0–4 from DB axes vs inferred snapshot */
  ruleScore: number;
  /** Hebrew labels for axes that matched */
  matchedAxes: string[];
  reasoning: string;
};

export type AdvisorMatchingResult = {
  matches: AdvisorCandidateMatch[];
  profileSummary: string;
};
