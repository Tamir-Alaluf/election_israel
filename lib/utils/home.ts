import {
  BLOC_BASE_TOPIC_TITLE,
  BLOC_META,
  MANDATES_CHART_PALETTE,
} from "@/lib/constants/style";
import type {
  MandatesBlocSummary,
  MandatesChartData,
  MandatesChartParty,
} from "@/lib/types/home";
import { prisma } from "@/lib/utils/prisma";

function mapBlocKey(value: string): MandatesBlocSummary["key"] | null {
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized === "גוש נתניהו") return "netanyahu";
  if (normalized === "גוש אופוזיציה" || normalized === "אופוזיציה")
    return "opposition";
  if (
    normalized === "מפלגות ערביות" ||
    normalized === "חד״ש-תע״ל ורע״ם" ||
    normalized === 'חד"ש-תע"ל ורע"ם'
  ) {
    return "arabParties";
  }
  return null;
}

function pickBlocValue(
  topics: { baseTopicTitle: string; baseTopicOptionDisplayValue: string }[],
): string | null {
  const blocTopic = topics.find(
    (topic) => topic.baseTopicTitle === BLOC_BASE_TOPIC_TITLE,
  );
  if (blocTopic) return blocTopic.baseTopicOptionDisplayValue;
  const fallback = topics.find((topic) =>
    mapBlocKey(topic.baseTopicOptionDisplayValue),
  );
  return fallback?.baseTopicOptionDisplayValue ?? null;
}

export async function getMandatesChartData(): Promise<MandatesChartData> {
  const rows = await prisma.party.findMany({
    where: { mandates: { not: null } },
    select: {
      id: true,
      name: true,
      mandates: true,
      candidateName: true,
      imageUrl: true,
      leader: { select: { name: true, image: true } },
      baseTopics: {
        select: {
          baseTopicTitle: true,
          baseTopicOptionDisplayValue: true,
        },
      },
    },
  });
  const sorted = rows
    .filter((r): r is typeof r & { mandates: number } => r.mandates != null)
    .sort((a, b) => b.mandates - a.mandates);

  const parties: MandatesChartParty[] = sorted.map((r, i) => ({
    key: r.id,
    name: r.name,
    leader: r.leader?.name ?? r.candidateName ?? "",
    leaderImage: r.leader?.image ?? r.imageUrl ?? null,
    mandates: r.mandates,
    color: MANDATES_CHART_PALETTE[i % MANDATES_CHART_PALETTE.length],
  }));

  const blocTotals: Record<MandatesBlocSummary["key"], number> = {
    netanyahu: 0,
    opposition: 0,
    arabParties: 0,
  };

  for (const row of sorted) {
    const blocValue = pickBlocValue(row.baseTopics);
    if (!blocValue) continue;
    const blocKey = mapBlocKey(blocValue);
    if (!blocKey) continue;
    blocTotals[blocKey] += row.mandates;
  }

  const blocs: MandatesBlocSummary[] = (
    Object.keys(BLOC_META) as MandatesBlocSummary["key"][]
  ).map((key) => {
    const mandates = blocTotals[key];
    return {
      key,
      label: BLOC_META[key].label,
      mandates,
      color: BLOC_META[key].color,
      percent: Math.max(0, Math.min(100, (mandates / 120) * 100)),
    };
  });

  return { parties, blocs };
}
