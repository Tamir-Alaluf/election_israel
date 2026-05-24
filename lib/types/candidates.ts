import type {
  BaseParameters,
  EducationItem,
  ProfessionalItem,
  ActionItem,
  LegislationItem,
  FuturePromiseItem,
  PartyMemberItem,
} from "./shared";
import type { Prisma } from "@prisma/client";
import {
  candidateComparisonInclude,
  LEADER_DETAIL_CATEGORIES,
  LEADER_DETAIL_SECTION_DEFS,
} from "@/lib/constants/candidates";

export type LeaderDetailCategoryId =
  (typeof LEADER_DETAIL_CATEGORIES)[number]["id"];

export type LeaderDetailSectionId =
  (typeof LEADER_DETAIL_SECTION_DEFS)[number]["id"];

export type LeaderDetailSectionDef = {
  id: LeaderDetailSectionId;
  title: string;
  categoryId: LeaderDetailCategoryId;
};

export type CandidateComparisonRow = {
  id: string;
  name: string;
  partyName: string;
  image: string | null;
  vision: string | null;
  positiveSentiment: string | null;
  negativeSentiment: string | null;
  education: EducationItem[];
  professionalBackground: ProfessionalItem[];
  careerAchievements: ActionItem[];
  recentActions: ActionItem[];
  values: BaseParameters;
  legislations: LegislationItem[];
  futurePromises: FuturePromiseItem[];
  members: PartyMemberItem[];
};

export type CandidateRawPayload = Prisma.CandidateGetPayload<{
  include: typeof candidateComparisonInclude;
}>;
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
