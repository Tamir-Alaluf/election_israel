import {
  BLOC_BASE_TOPIC_TITLE,
  BLOC_META,
  BLOC_ORDER,
  blocKeyFromDisplayValue,
} from "@/lib/constants/blocs";
import { MANDATES_CHART_PALETTE } from "@/lib/constants/style";
import type {
  MandatesBlocSummary,
  MandatesChartData,
  MandatesChartParty,
} from "@/lib/types/home";
import { prisma } from "@/lib/utils/prisma";

function pickBlocValue(
  topics: { baseTopicTitle: string; baseTopicOptionDisplayValue: string }[],
): string | null {
  const blocTopic = topics.find(
    (topic) => topic.baseTopicTitle === BLOC_BASE_TOPIC_TITLE,
  );
  if (blocTopic) return blocTopic.baseTopicOptionDisplayValue;
  const fallback = topics.find((topic) =>
    blocKeyFromDisplayValue(topic.baseTopicOptionDisplayValue),
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

  /** map the sorted rows to MandatesChartParty */
  const parties: MandatesChartParty[] = sorted.map((r, i) => ({
    key: r.id,
    name: r.name,
    leader: r.leader?.name ?? r.candidateName ?? "",
    leaderImage: r.leader?.image ?? r.imageUrl ?? null,
    mandates: r.mandates,
    color: MANDATES_CHART_PALETTE[i % MANDATES_CHART_PALETTE.length],
  }));

  // calculate the total mandates for each bloc
  const blocTotals: Record<MandatesBlocSummary["key"], number> = {
    netanyahu: 0,
    opposition: 0,
    arabParties: 0,
  };

  /** calculate the total mandates for each bloc */
  for (const row of sorted) {
    const blocValue = pickBlocValue(row.baseTopics);
    if (!blocValue) continue;
    const blocKey = blocKeyFromDisplayValue(blocValue);
    if (!blocKey) continue;
    blocTotals[blocKey] += row.mandates;
  }

  /** map the blocs to MandatesBlocSummary */
  const blocs: MandatesBlocSummary[] = BLOC_ORDER.map((key) => {
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

export function formatHebrewDate(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export function getInitials(name: string) {
  const cleaned = name.trim();
  if (!cleaned) return "";
  return cleaned.slice(0, 2);
}
