import type {
  BaseParameters,
  EducationItem,
  ProfessionalItem,
  ActionItem,
  LegislationItem,
  FuturePromiseItem,
} from "./shared";
import type { Prisma } from "@prisma/client";
import { candidateComparisonInclude } from "@/lib/constants/candidates";

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
