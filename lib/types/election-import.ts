import { z } from "zod";

/** Reference: LegislationGroup */
export type ElectionImportLegislationGroup = {
  name: string;
};

/** Reference: Legislation */
export type ElectionImportLegislation = {
  title: string;
  legislationGroupName: string;
};

/** Reference: LegislationOption */
export type ElectionImportLegislationOption = {
  displayValue: string;
};

/** Reference: BaseTopic */
export type ElectionImportBaseTopic = {
  title: string;
};

/** Reference: BaseTopicOption */
export type ElectionImportBaseTopicOption = {
  baseTopicTitle: string;
  optionDisplayValue: string;
};

/** Nested form: topic title → option display strings */
export type ElectionImportBaseTopicWithOptions = {
  title: string;
  options: string[];
};

/** Reference: ActionGroup */
export type ElectionImportActionGroup = {
  name: string;
};

/** Reference: ProfessionalGroup */
export type ElectionImportProfessionalGroup = {
  name: string;
};

export type ElectionImportParty = {
  name: string;
  mandates?: number | null;
  vision?: string | null;
  imageUrl?: string | null;
  /** Leader candidate name; may be applied after candidates are inserted */
  candidateName?: string | null;
};

export type ElectionImportCandidate = {
  name: string;
  image?: string | null;
  vision?: string | null;
  partyName: string;
};

export type ElectionImportPartyMember = {
  name: string;
  description?: string | null;
  orderIndex: number;
  image?: string | null;
  partyName: string;
};

export type ElectionImportPartyBaseTopic = {
  description?: string | null;
  baseTopicOptionDisplayValue: string;
  baseTopicTitle: string;
  partyName: string;
};

export type ElectionImportPartyLegislation = {
  legislationTitle: string;
  optionDisplayValue: string;
  partyName: string;
};

export type ElectionImportRecentAction = {
  partyName: string;
  title: string;
  actionGroupName: string;
  description?: string | null;
  orderIndex?: number | null;
};

export type ElectionImportFuturePromise = ElectionImportRecentAction;

export type ElectionImportCandidateProfessional = {
  title: string;
  startYear?: number | null;
  endYear?: number | null;
  description?: string | null;
  candidateName: string;
  groupName: string;
};

export type ElectionImportCandidateCareerAction = {
  title: string;
  description?: string | null;
  orderIndex?: number | null;
  actionGroupName: string;
  candidateName: string;
};

export type ElectionImportCandidateRecentAction = ElectionImportCandidateCareerAction;

export type ElectionImportPayload = {
  legislationGroups?: ElectionImportLegislationGroup[];
  legislations?: ElectionImportLegislation[];
  legislationOptions?: ElectionImportLegislationOption[];
  baseTopics?: ElectionImportBaseTopic[];
  /** Flat option rows (alternative to baseTopicsWithOptions) */
  baseTopicOptions?: ElectionImportBaseTopicOption[];
  /** Nested: each topic includes its option strings */
  baseTopicsWithOptions?: ElectionImportBaseTopicWithOptions[];
  actionGroups?: ElectionImportActionGroup[];
  professionalGroups?: ElectionImportProfessionalGroup[];
  parties?: ElectionImportParty[];
  candidates?: ElectionImportCandidate[];
  partyMembers?: ElectionImportPartyMember[];
  partyBaseTopics?: ElectionImportPartyBaseTopic[];
  partyLegislations?: ElectionImportPartyLegislation[];
  recentActions?: ElectionImportRecentAction[];
  futurePromises?: ElectionImportFuturePromise[];
  candidateProfessionals?: ElectionImportCandidateProfessional[];
  candidateCareerActions?: ElectionImportCandidateCareerAction[];
  candidateRecentActions?: ElectionImportCandidateRecentAction[];
};

const nullableString = z.union([z.string(), z.null()]).optional();
const nullableInt = z.union([z.number().int(), z.null()]).optional();

export const electionImportLegislationGroupSchema = z.object({
  name: z.string().min(1),
});

export const electionImportLegislationSchema = z.object({
  title: z.string().min(1),
  legislationGroupName: z.string().min(1),
});

export const electionImportLegislationOptionSchema = z.object({
  displayValue: z.string().min(1),
});

export const electionImportBaseTopicSchema = z.object({
  title: z.string().min(1),
});

export const electionImportBaseTopicOptionSchema = z.object({
  baseTopicTitle: z.string().min(1),
  optionDisplayValue: z.string().min(1),
});

export const electionImportBaseTopicWithOptionsSchema = z.object({
  title: z.string().min(1),
  options: z.array(z.string().min(1)),
});

export const electionImportActionGroupSchema = z.object({
  name: z.string().min(1),
});

export const electionImportProfessionalGroupSchema = z.object({
  name: z.string().min(1),
});

export const electionImportPartySchema = z.object({
  name: z.string().min(1),
  mandates: z.union([z.number().int(), z.null()]).optional(),
  vision: nullableString,
  imageUrl: nullableString,
  candidateName: nullableString,
});

export const electionImportCandidateSchema = z.object({
  name: z.string().min(1),
  image: nullableString,
  vision: nullableString,
  partyName: z.string().min(1),
});

export const electionImportPartyMemberSchema = z.object({
  name: z.string().min(1),
  description: nullableString,
  orderIndex: z.number().int(),
  image: nullableString,
  partyName: z.string().min(1),
});

export const electionImportPartyBaseTopicSchema = z.object({
  description: nullableString,
  baseTopicOptionDisplayValue: z.string().min(1),
  baseTopicTitle: z.string().min(1),
  partyName: z.string().min(1),
});

export const electionImportPartyLegislationSchema = z.object({
  legislationTitle: z.string().min(1),
  optionDisplayValue: z.string().min(1),
  partyName: z.string().min(1),
});

export const electionImportRecentActionSchema = z.object({
  partyName: z.string().min(1),
  title: z.string().min(1),
  actionGroupName: z.string().min(1),
  description: nullableString,
  orderIndex: nullableInt,
});

export const electionImportCandidateProfessionalSchema = z.object({
  title: z.string().min(1),
  startYear: nullableInt,
  endYear: nullableInt,
  description: nullableString,
  candidateName: z.string().min(1),
  groupName: z.string().min(1),
});

export const electionImportCandidateCareerActionSchema = z.object({
  title: z.string().min(1),
  description: nullableString,
  orderIndex: nullableInt,
  actionGroupName: z.string().min(1),
  candidateName: z.string().min(1),
});

export const electionImportPayloadSchema: z.ZodType<ElectionImportPayload> = z
  .object({
    legislationGroups: z.array(electionImportLegislationGroupSchema).optional(),
    legislations: z.array(electionImportLegislationSchema).optional(),
    legislationOptions: z.array(electionImportLegislationOptionSchema).optional(),
    baseTopics: z.array(electionImportBaseTopicSchema).optional(),
    baseTopicOptions: z.array(electionImportBaseTopicOptionSchema).optional(),
    baseTopicsWithOptions: z
      .array(electionImportBaseTopicWithOptionsSchema)
      .optional(),
    actionGroups: z.array(electionImportActionGroupSchema).optional(),
    professionalGroups: z.array(electionImportProfessionalGroupSchema).optional(),
    parties: z.array(electionImportPartySchema).optional(),
    candidates: z.array(electionImportCandidateSchema).optional(),
    partyMembers: z.array(electionImportPartyMemberSchema).optional(),
    partyBaseTopics: z.array(electionImportPartyBaseTopicSchema).optional(),
    partyLegislations: z.array(electionImportPartyLegislationSchema).optional(),
    recentActions: z.array(electionImportRecentActionSchema).optional(),
    futurePromises: z.array(electionImportRecentActionSchema).optional(),
    candidateProfessionals: z
      .array(electionImportCandidateProfessionalSchema)
      .optional(),
    candidateCareerActions: z
      .array(electionImportCandidateCareerActionSchema)
      .optional(),
    candidateRecentActions: z
      .array(electionImportCandidateCareerActionSchema)
      .optional(),
  })
  .strict();

export function parseElectionImportPayload(
  data: unknown,
): ElectionImportPayload {
  return electionImportPayloadSchema.parse(data);
}
