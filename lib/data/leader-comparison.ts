import { prisma } from "@/lib/prisma";
import type { LeaderComparisonRow } from "@/features/candidates/types/leader-comparison";

function joinEducation(
  rows: {
    description: string | null;
    major: string | null;
    university: string | null;
  }[],
): string {
  if (rows.length === 0) return "—";
  return rows
    .map(
      (e) =>
        [e.university, e.major, e.description].filter(Boolean).join(" — ") ||
        "—",
    )
    .join("\n");
}

function joinProfessionals(
  rows: {
    title: string;
    description: string | null;
    group: { name: string };
  }[],
): string {
  if (rows.length === 0) return "—";
  return rows
    .map(
      (p) =>
        `${p.title}${p.group?.name ? ` · ${p.group.name}` : ""}${p.description ? ` — ${p.description}` : ""}`,
    )
    .join("\n");
}

function mapCareerItems(
  rows: {
    title: string;
    description: string | null;
    actionGroup: { name: string };
  }[],
): { category: string; title: string; description: string | null }[] {
  return rows.map((c) => ({
    category: c.actionGroup.name,
    title: c.title,
    description: c.description,
  }));
}

function mapRecentItems(
  rows: {
    title: string;
    description: string | null;
    actionGroup: { name: string };
  }[],
): { category: string; title: string; description: string | null }[] {
  return rows.map((r) => ({
    category: r.actionGroup.name,
    title: r.title,
    description: r.description,
  }));
}

export async function getLeadersForComparison(): Promise<
  LeaderComparisonRow[]
> {
  const candidates = await prisma.candidate.findMany({
    where: { partyLeaderOf: { some: {} } },
    include: {
      education: { orderBy: { id: "asc" } },
      professionals: { include: { group: true } },
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
    academicEducation: joinEducation(c.education),
    professionalBackground: joinProfessionals(c.professionals),
    careerAchievementsItems: mapCareerItems(c.careerActions),
    recentActionsItems: mapRecentItems(c.recentActions),
    values: {
      securityApproach: c.securityApproach ?? "—",
      economicApproach: c.economicApproach ?? "—",
      leadershipStyle: c.leadershipStyle ?? "—",
      harediGov: c.harediGov ?? "—",
      arabGov: c.arabGov ?? "—",
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
