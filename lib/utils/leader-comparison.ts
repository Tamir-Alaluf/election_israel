import { prisma } from "@/lib/utils/prisma";
import type {
  LeaderActionItem,
  LeaderComparisonRow,
  LeaderEducationItem,
  LeaderProfessionalItem,
} from "@/lib/types/leader-comparison";

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

export async function getLeadersForComparison(): Promise<
  LeaderComparisonRow[]
> {
  const candidates = await prisma.candidate.findMany({
    where: { partyLeaderOf: { some: {} } },
    include: {
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

  return candidates.map((c) => ({
    id: c.id,
    name: c.name,
    party: c.partyName,
    image: c.image,
    color: null,
    vision: c.vision,
    education: mapEducation(c.education),
    professionalBackground: mapProfessionals(c.professionals),
    careerAchievements: mapCareerItems(c.careerActions),
    recentActions: mapRecentItems(c.recentActions),
    values: {
      securityApproach: c.securityApproach ?? "—",
      economicApproach: c.economicApproach ?? "—",
      leadershipStyle: c.leadershipStyle ?? "—",
      harediGov: c.harediGov ?? "—",
      arabGov: c.arabGov ?? "—",
      bloc: "—",
    },
  }));
}

export function getLeaderPartyOptions(
  leaders: LeaderComparisonRow[],
): { value: string; label: string }[] {
  const seen = new Set<string>();
  const out: { value: string; label: string }[] = [];
  for (const l of leaders) {
    if (!seen.has(l.party)) {
      seen.add(l.party);
      out.push({ value: l.party, label: l.party });
    }
  }
  return out.sort((a, b) => a.label.localeCompare(b.label, "he"));
}
