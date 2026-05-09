import type { UIMessage } from "ai";
import type { FormEvent, RefObject } from "react";
import type { Prisma } from "@prisma/client";

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
  /** 0–2 from DB axes vs inferred snapshot */
  ruleScore: number;
  /** Hebrew labels for axes that matched */
  matchedAxes: string[];
  reasoning: string;
};

export type AdvisorMatchingResult = {
  matches: AdvisorCandidateMatch[];
  profileSummary: string;
};

export type AdvisorFlowStage =
  | { kind: "profile" }
  | { kind: "loadingBatch"; roundIndex: number }
  | {
      kind: "political";
      roundIndex: number;
      questions: AdvisorAiQuestion[];
      step: number;
    }
  | { kind: "betweenRounds"; completedRoundIndex: number }
  | { kind: "loadingResult" }
  | { kind: "result"; data: AdvisorMatchingResult };

export type AdvisorFlowProps = {
  onMatchingComplete?: (
    result: AdvisorMatchingResult,
    finalProfile: AdvisorFinalProfile,
  ) => void;
  onHandOffToChat?: (text: string) => void;
};

export type AdvisorMatchingSnapshot = {
  result: AdvisorMatchingResult;
  finalProfile: AdvisorFinalProfile;
};

export type AdvisorChatInputBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled: boolean;
  canSubmit: boolean;
};

export type AdvisorChatMessageProps = {
  message: UIMessage;
};

export type AdvisorChatThreadProps = {
  messages: UIMessage[];
  isLoading: boolean;
  endRef: RefObject<HTMLDivElement | null>;
};

export type AdvisorMatchCardProps = {
  match: AdvisorCandidateMatch;
  rank: number;
  onAskMore: () => void;
};

export type AdvisorModeSelectorProps = {
  onSelectAiMatching: () => void;
  onSelectFreeChat: () => void;
};

export type AdvisorPoliticalStageProps = {
  roundIndex: number;
  maxRounds: number;
  step: number;
  question: AdvisorAiQuestion;
  onSelectOption: (option: string) => void;
};

export type AdvisorProfileStageProps = {
  onComplete: (profile: AdvisorProfileBase) => void;
};

export type AdvisorResultScreenProps = {
  result: AdvisorMatchingResult;
  finalProfile: AdvisorFinalProfile;
  onStartChat: (text: string) => void;
  compact?: boolean;
};

export type AdvisorRoundsRef = AdvisorPoliticalQA[];

export type PartyWithAdvisorRelations = Prisma.PartyGetPayload<{
  include: {
    baseTopics: true;
    legislations: { include: { legislation: true } };
    members: { orderBy: { orderIndex: "asc" } };
    recentActions: {
      include: { actionGroup: true };
      orderBy: { orderIndex: "asc" };
    };
    futurePromises: { orderBy: { orderIndex: "asc" } };
    leader: true;
  };
}>;

/** Leader rows loaded for advisor election context (candidate + party topics + CV slices). */
export type CandidateWithParty = Prisma.CandidateGetPayload<{
  include: {
    party: { include: { baseTopics: true } };
    education: { orderBy: { id: "asc" } };
    professionals: {
      include: { group: true };
      orderBy: { startYear: "asc" };
    };
    careerActions: {
      include: { actionGroup: true };
      orderBy: { orderIndex: "asc" };
    };
    recentActions: {
      include: { actionGroup: true };
      orderBy: { orderIndex: "asc" };
    };
  };
}>;
