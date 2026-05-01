import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ATTRIBUTE_BASE_TOPIC_ORDER,
  FILTER_BASE_TOPIC_TITLES,
} from "@/lib/data/party-filter-keys";
import type {
  MandatesChartData,
  MandatesChartParty,
  MandatesBlocSummary,
  PartyComparisonRow,
  PartyFilterBaseTopicBlock,
  PartyPageFilterMeta,
} from "@/features/parties/types/party-comparison";

const partyDetailInclude = {
  leader: true,
  baseTopics: {
    include: { topic: true, option: true },
  },
  legislations: {
    include: {
      legislation: { include: { group: true } },
      option: true,
    },
  },
  members: { orderBy: { orderIndex: "asc" as const } },
  recentActions: {
    include: { actionGroup: true },
    orderBy: { orderIndex: "asc" as const },
  },
  futurePromises: { orderBy: { orderIndex: "asc" as const } },
} as const;

function mapParty(p: {
  id: string;
  name: string;
  candidateName: string | null;
  vision: string | null;
  imageUrl: string | null;
  leader: { name: string } | null;
  baseTopics: {
    baseTopicTitle: string;
    baseTopicOptionDisplayValue: string;
  }[];
  legislations: {
    legislation: { id: string };
    optionDisplayValue: string;
  }[];
  members: { name: string }[];
  recentActions: {
    title: string;
    description: string | null;
    actionGroup: { name: string };
  }[];
  futurePromises: { title: string; description: string | null }[];
}): PartyComparisonRow {
  const baseTopicByTitle: Record<string, string> = {};
  for (const bt of p.baseTopics) {
    baseTopicByTitle[bt.baseTopicTitle] = bt.baseTopicOptionDisplayValue;
  }
  const legislationById: Record<string, string> = {};
  for (const pl of p.legislations) {
    legislationById[pl.legislation.id] = pl.optionDisplayValue;
  }
  return {
    id: p.id,
    name: p.name,
    leader: p.leader?.name ?? p.candidateName ?? "",
    image: p.imageUrl,
    vision: p.vision,
    baseTopicByTitle,
    legislationById,
    members: p.members.map((m) => m.name),
    recentActionsItems: p.recentActions.map((r) => ({
      category: r.actionGroup.name,
      title: r.title,
      description: r.description,
    })),
    futurePromisesItems: p.futurePromises.map((f) => ({
      title: f.title,
      description: f.description,
    })),
  };
}

function blockForTitle(
  title: string,
  topics: { title: string; options: { optionDisplayValue: string }[] }[],
): PartyFilterBaseTopicBlock {
  const topic = topics.find((t) => t.title === title);
  const opts = topic?.options ?? [];
  return {
    title,
    options: opts.map((o) => ({
      value: o.optionDisplayValue,
      label: o.optionDisplayValue,
    })),
  };
}

function sortAttributeTopics(
  titles: string[],
): { id: string; label: string }[] {
  const set = new Set(titles);
  const ordered: string[] = [];
  for (const t of ATTRIBUTE_BASE_TOPIC_ORDER) {
    if (set.has(t)) {
      ordered.push(t);
      set.delete(t);
    }
  }
  const rest = [...set].sort((a, b) => a.localeCompare(b, "he"));
  return [...ordered, ...rest].map((t) => ({ id: t, label: t }));
}

async function getPartyFilterMetadata(): Promise<PartyPageFilterMeta> {
  const [baseTopicRows, legislationRows] = await Promise.all([
    prisma.baseTopic.findMany({
      include: {
        options: { orderBy: { optionDisplayValue: "asc" } },
      },
      orderBy: { title: "asc" },
    }),
    prisma.legislation.findMany({
      include: { group: true },
      orderBy: { title: "asc" },
    }),
  ]);

  const typeBaseTopic = blockForTitle(
    FILTER_BASE_TOPIC_TITLES.type,
    baseTopicRows,
  );
  const securityBaseTopic = blockForTitle(
    FILTER_BASE_TOPIC_TITLES.security,
    baseTopicRows,
  );
  const economyBaseTopic = blockForTitle(
    FILTER_BASE_TOPIC_TITLES.economy,
    baseTopicRows,
  );

  const attributeTopics = sortAttributeTopics(
    baseTopicRows.map((t) => t.title),
  );

  const lawIssues = legislationRows.map((leg) => ({
    id: leg.id,
    label: leg.title,
    group: leg.group.name,
  }));

  return {
    typeBaseTopic,
    securityBaseTopic,
    economyBaseTopic,
    attributeTopics,
    lawIssues,
    attributesSectionTitle: "מאפייני המפלגה",
    issuesSectionTitle: "עמדות בחוקים ספציפיים",
  };
}

export async function getPartiesForComparison(): Promise<
  PartyComparisonRow[]
> {
  const rows = await prisma.party.findMany({
    include: partyDetailInclude,
    orderBy: { name: "asc" },
  });
  return rows.map((p) => mapParty(p));
}

const loadPartyPageData = unstable_cache(
  async () => {
    const [parties, filterMeta] = await Promise.all([
      getPartiesForComparison(),
      getPartyFilterMetadata(),
    ]);
    return { parties, filterMeta };
  },
  ["parties-page-data"],
  { revalidate: 60 },
);

/**
 * Full party rows + filter metadata, cached 60s at the data layer; React `cache` dedupes within a request.
 */
export const getPartyPageData = cache(async () => loadPartyPageData());

/** Bar colors when `parties.chart_color` is not stored in the database. */
const MANDATES_CHART_PALETTE = [
  "#0066cc",
  "#00a0dc",
  "#1e3a5f",
  "#006400",
  "#e30613",
  "#000080",
  "#64748b",
] as const;

const BLOC_BASE_TOPIC_TITLE = "גוש";

const BLOC_META: Record<MandatesBlocSummary["key"], { label: string; color: string }> = {
  netanyahu: { label: "גוש נתניהו", color: "#004B8D" },
  opposition: { label: "אופוזיציה", color: "#F59E0B" },
  arabParties: { label: "חד״ש-תע״ל ורע״ם", color: "#BFD8FF" },
};

function mapBlocKey(value: string): MandatesBlocSummary["key"] | null {
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized === "גוש נתניהו") return "netanyahu";
  if (normalized === "גוש אופוזיציה" || normalized === "אופוזיציה") return "opposition";
  if (
    normalized === "מפלגות ערביות" ||
    normalized === "חד״ש-תע״ל ורע״ם" ||
    normalized === "חד\"ש-תע\"ל ורע\"ם"
  ) {
    return "arabParties";
  }
  return null;
}

function pickBlocValue(
  topics: { baseTopicTitle: string; baseTopicOptionDisplayValue: string }[],
): string | null {
  const blocTopic = topics.find((topic) => topic.baseTopicTitle === BLOC_BASE_TOPIC_TITLE);
  if (blocTopic) return blocTopic.baseTopicOptionDisplayValue;
  const fallback = topics.find((topic) => mapBlocKey(topic.baseTopicOptionDisplayValue));
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

  const blocs: MandatesBlocSummary[] = (Object.keys(BLOC_META) as MandatesBlocSummary["key"][]).map(
    (key) => {
      const mandates = blocTotals[key];
      return {
        key,
        label: BLOC_META[key].label,
        mandates,
        color: BLOC_META[key].color,
        percent: Math.max(0, Math.min(100, (mandates / 120) * 100)),
      };
    },
  );

  return { parties, blocs };
}
