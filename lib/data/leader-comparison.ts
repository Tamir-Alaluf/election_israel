import { prisma } from "@/lib/prisma";

export type LeaderComparisonRow = {
  id: string;
  name: string;
  party: string;
  image: string | null;
  color: string | null;
  vision: string | null;
  academicEducation: string;
  professionalBackground: string;
  careerAchievements: string;
  recentActions: string;
  voicePattern: string;
  likudNotes: string | null;
  values: {
    securityApproach: string;
    economicApproach: string;
    leadershipStyle: string;
    harediGov: string;
    arabGov: string;
    lastElectionMandates: number;
  };
};

function joinEducation(
  rows: { description: string | null; major: string | null; university: string | null }[],
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
  rows: { title: string; description: string | null; group: { name: string } }[],
): string {
  if (rows.length === 0) return "—";
  return rows
    .map(
      (p) =>
        `${p.title}${p.group?.name ? ` · ${p.group.name}` : ""}${p.description ? ` — ${p.description}` : ""}`,
    )
    .join("\n");
}

function joinCareer(
  rows: { title: string; description: string | null; actionGroup: { name: string } }[],
): string {
  if (rows.length === 0) return "—";
  return rows
    .map(
      (c) =>
        `${c.title} (${c.actionGroup.name})${c.description ? ` — ${c.description}` : ""}`,
    )
    .join("\n");
}

function joinRecent(
  rows: { title: string; description: string | null; actionGroup: { name: string } }[],
): string {
  if (rows.length === 0) return "—";
  return rows
    .map(
      (r) =>
        `${r.title} (${r.actionGroup.name})${r.description ? ` — ${r.description}` : ""}`,
    )
    .join("\n");
}

export async function getLeadersForComparison(): Promise<LeaderComparisonRow[]> {
  const candidates = await prisma.candidate.findMany({
    where: { partyLeaderOf: { some: {} } },
    include: {
      party: true,
      education: { orderBy: { id: "asc" } },
      professionals: { include: { group: true } },
      careerActions: { include: { actionGroup: true }, orderBy: { orderIndex: "asc" } },
      recentActions: { include: { actionGroup: true }, orderBy: { orderIndex: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  return candidates.map((c) => ({
    id: c.id,
    name: c.name,
    party: c.partyName,
    image: c.image,
    color: c.party?.chartColor ?? null,
    vision: c.vision,
    academicEducation: joinEducation(c.education),
    professionalBackground: joinProfessionals(c.professionals),
    careerAchievements: joinCareer(c.careerActions),
    recentActions: joinRecent(c.recentActions),
    voicePattern: c.voicePattern ?? "—",
    likudNotes: c.likudNotes,
    values: {
      securityApproach: c.securityApproach ?? "—",
      economicApproach: c.economicApproach ?? "—",
      leadershipStyle: c.leadershipStyle ?? "—",
      harediGov: c.harediGov ?? "—",
      arabGov: c.arabGov ?? "—",
      lastElectionMandates: c.party?.mandates ?? 0,
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
