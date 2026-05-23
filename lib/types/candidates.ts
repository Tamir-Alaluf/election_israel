import type {
  BaseParameters,
  EducationItem,
  ProfessionalItem,
  ActionItem,
  LegislationItem,
  FuturePromiseItem,
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
  education: EducationItem[];
  professionalBackground: ProfessionalItem[];
  careerAchievements: ActionItem[];
  recentActions: ActionItem[];
  values: BaseParameters;
  legislations: LegislationItem[];
  futurePromises: FuturePromiseItem[];
  members: string[];
};

export type CandidateRawPayload = Prisma.CandidateGetPayload<{
  include: typeof candidateComparisonInclude;
}>;
