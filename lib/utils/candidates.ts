import { inspect } from "node:util";

import { BASE_TOPIC } from "@/lib/constants/parties";
import { prisma } from "@/lib/utils/prisma";
import type {
  CandidateComparisonRow,
  CandidateRawPayload,
} from "@/lib/types/candidates";
import type {
  ActionItem,
  FuturePromiseItem,
  EducationItem,
  LegislationItem,
  ProfessionalItem,
} from "@/lib/types/shared";
import { candidateComparisonInclude } from "@/lib/constants/candidates";

function partyTopicDisplay(
  topics: { baseTopicTitle: string; baseTopicOptionDisplayValue: string }[],
  topicTitle: string,
): string {
  return (
    topics.find((t) => t.baseTopicTitle === topicTitle)
      ?.baseTopicOptionDisplayValue ?? "—"
  );
}

function mapEducation(
  rows: {
    description: string | null;
    major: string | null;
    university: string | null;
    degreeLevel: string | null;
    startYear: number | null;
    endYear: number | null;
  }[],
): EducationItem[] {
  return rows.map((e) => ({
    major: e.major,
    university: e.university,
    degreeLevel: e.degreeLevel,
    startYear: e.startYear,
    endYear: e.endYear,
    description: e.description,
  }));
}

function mapProfessionals(
  rows: {
    title: string;
    startYear: number | null;
    endYear: number | null;
    description: string | null;
    group: { name: string };
  }[],
): ProfessionalItem[] {
  return rows.map((p) => ({
    title: p.title,
    groupName: p.group?.name ?? null,
    startYear: p.startYear,
    endYear: p.endYear,
    description: p.description,
  }));
}

function mapCareerItems(
  rows: {
    title: string;
    description: string | null;
    orderIndex: number | null;
    actionGroup: { name: string };
  }[],
): ActionItem[] {
  return rows.map((c) => ({
    category: c.actionGroup.name,
    title: c.title,
    description: c.description,
    orderIndex: c.orderIndex,
  }));
}

function mapRecentItems(
  rows: {
    title: string;
    description: string | null;
    orderIndex: number | null;
    actionGroup: { name: string };
  }[],
): ActionItem[] {
  return rows.map((r) => ({
    category: r.actionGroup.name,
    title: r.title,
    description: r.description,
    orderIndex: r.orderIndex,
  }));
}

function mapLegislations(
  rows: {
    legislation: { id: string; title: string; group: { name: string } };
    option: string;
  }[],
): LegislationItem[] {
  return rows.map((l) => ({
    legislation: {
      title: l.legislation.title,
      group: l.legislation.group.name,
    },
    option: l.option,
  }));
}

function mapFuturePromises(
  rows: {
    title: string;
    description: string | null;
    orderIndex: number | null;
    actionGroup: { name: string };
  }[],
): FuturePromiseItem[] {
  return rows.map((f) => ({
    title: f.title,
    description: f.description,
    category: f.actionGroup.name,
    orderIndex: f.orderIndex,
  }));
}
export async function getLeadersForComparison(): Promise<
  CandidateComparisonRow[]
> {
  const candidates = await prisma.candidate.findMany({
    where: { partyLeaderOf: { some: {} } },
    include: candidateComparisonInclude,
    orderBy: { name: "asc" },
  });

  return candidates.map((c) => mapCandidate(c));
}

export async function getLeaderByName(
  name: string,
): Promise<CandidateComparisonRow | null> {
  const decodedName = decodeURIComponent(name);
  const candidate = await prisma.candidate.findFirst({
    where: {
      name: decodedName,
      partyLeaderOf: { some: {} },
    },
    include: candidateComparisonInclude,
  });

  return candidate ? mapCandidate(candidate) : null;
}

function mapCandidate(c: CandidateRawPayload): CandidateComparisonRow {
  return {
    id: c.id,
    name: c.name,
    partyName: c.partyName,
    image: c.image,
    vision: c.vision,
    education: mapEducation(c.education),
    professionalBackground: mapProfessionals(c.professionals),
    careerAchievements: mapCareerItems(c.careerActions),
    recentActions: mapRecentItems(c.recentActions),
    values: {
      type: partyTopicDisplay(c.party.baseTopics, BASE_TOPIC.type),
      securityApproach: partyTopicDisplay(
        c.party.baseTopics,
        BASE_TOPIC.security,
      ),
      economicApproach: partyTopicDisplay(
        c.party.baseTopics,
        BASE_TOPIC.economy,
      ),
      arabs: partyTopicDisplay(c.party.baseTopics, BASE_TOPIC.arabs),
      jews: partyTopicDisplay(c.party.baseTopics, BASE_TOPIC.jews),
      bloc: partyTopicDisplay(c.party.baseTopics, BASE_TOPIC.bloc),
    },
    legislations: mapLegislations(
      c.party.legislations.map((l) => ({
        legislation: {
          id: l.legislation.id,
          title: l.legislation.title,
          group: { name: l.legislation.group.name },
        },
        option: l.optionDisplayValue,
      })),
    ),
    futurePromises: mapFuturePromises(c.party.futurePromises),
    members: c.party.members.map((m) => m.name),
  };
}

export function getLeaderPartyOptions(
  leaders: CandidateComparisonRow[],
): { value: string; label: string }[] {
  const seen = new Set<string>();
  const out: { value: string; label: string }[] = [];
  for (const l of leaders) {
    if (!seen.has(l.partyName)) {
      seen.add(l.partyName);
      out.push({ value: l.partyName, label: l.partyName });
    }
  }
  return out.sort((a, b) => a.label.localeCompare(b.label, "he"));
}
