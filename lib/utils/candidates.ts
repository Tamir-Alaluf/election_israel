import { inspect } from "node:util";

import { BASE_TOPIC } from "@/lib/constants/parties";
import { prisma } from "@/lib/utils/prisma";
import type {
  LeaderActionItem,
  LeaderFuturePromiseItem,
  LeaderComparisonRow,
  LeaderEducationItem,
  LeaderLegislationItem,
  LeaderProfessionalItem,
} from "@/lib/types/candidates";
import { CandidateWithParty } from "../types/advisor";

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
): LeaderEducationItem[] {
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
): LeaderProfessionalItem[] {
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
): LeaderActionItem[] {
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
): LeaderActionItem[] {
  return rows.map((r) => ({
    category: r.actionGroup.name,
    title: r.title,
    description: r.description,
    orderIndex: r.orderIndex,
  }));
}

function mapLegislations(
  rows: {
    legislation: { id: string; title: string; group: string };
    option: string;
  }[],
): LeaderLegislationItem[] {
  return rows.map((l) => ({
    legislation: {
      title: l.legislation.title,
      group: l.legislation.group,
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
): LeaderFuturePromiseItem[] {
  return rows.map((f) => ({
    title: f.title,
    description: f.description,
    category: f.actionGroup.name,
    orderIndex: f.orderIndex,
  }));
}
export async function getLeadersForComparison(): Promise<
  LeaderComparisonRow[]
> {
  const candidates = await prisma.candidate.findMany({
    where: { partyLeaderOf: { some: {} } },
    include: {
      party: {
        include: {
          baseTopics: true,
          legislations: {
            include: {
              legislation: { include: { group: true } },
              option: true,
            },
          },
          futurePromises: {
            include: { actionGroup: true },
            orderBy: { orderIndex: "asc" },
          },
          members: true,
        },
      },
      education: { orderBy: { id: "asc" } },
      professionals: {
        include: { group: true },
        orderBy: { startYear: "asc" },
      },
      careerActions: {
        include: { actionGroup: true },
        orderBy: { orderIndex: "asc" },
      },
      recentActions: {
        include: { actionGroup: true },
        orderBy: { orderIndex: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });

  return candidates.map((c) => mapCandidate(c));
}
function printCandidate(c: CandidateWithParty): void {
  console.log(
    inspect(c, {
      depth: null,
      colors: true,
      compact: false,
      maxArrayLength: null,
      maxStringLength: null,
    }),
  );
}

function mapCandidate(c: CandidateWithParty): LeaderComparisonRow {
  return {
    id: c.id,
    name: c.name,
    partyName: c.partyName,
    image: c.image,
    color: null,
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
    legislations: mapLegislations(c.party.legislations),
    futurePromises: mapFuturePromises(c.party.futurePromises),
  };
}

export function getLeaderPartyOptions(
  leaders: LeaderComparisonRow[],
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
