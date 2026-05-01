import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ATTRIBUTE_BASE_TOPIC_ORDER,
  FILTER_BASE_TOPIC_TITLES,
} from "@/lib/data/party-filter-keys";
import type {
  MandatesChartParty,
  PartyComparisonRow,
  PartyFilterBaseTopicBlock,
  PartyListRow,
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

const partyListSelect = {
  id: true,
  name: true,
  candidateName: true,
  imageUrl: true,
  leader: { select: { name: true } },
  baseTopics: {
    select: {
      baseTopicTitle: true,
      baseTopicOptionDisplayValue: true,
    },
  },
  legislations: {
    select: {
      optionDisplayValue: true,
      legislation: { select: { id: true } },
    },
  },
} as const;

function mapPartyList(p: {
  id: string;
  name: string;
  candidateName: string | null;
  imageUrl: string | null;
  leader: { name: string } | null;
  baseTopics: {
    baseTopicTitle: string;
    baseTopicOptionDisplayValue: string;
  }[];
  legislations: {
    optionDisplayValue: string;
    legislation: { id: string };
  }[];
}): PartyListRow {
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
    baseTopicByTitle,
    legislationById,
  };
}

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

export async function getPartiesList(): Promise<PartyListRow[]> {
  const rows = await prisma.party.findMany({
    select: partyListSelect,
    orderBy: { name: "asc" },
  });
  return rows.map((p) => mapPartyList(p));
}

const loadPartyPageData = unstable_cache(
  async () => {
    const [parties, filterMeta] = await Promise.all([
      getPartiesList(),
      getPartyFilterMetadata(),
    ]);
    return { parties, filterMeta };
  },
  ["parties-page-data"],
  { revalidate: 60 },
);

/**
 * List + filter metadata, cached 60s at the data layer; React `cache` dedupes within a request.
 */
export const getPartyPageData = cache(async () => loadPartyPageData());

export async function getPartyComparisonDetailById(
  id: string,
): Promise<PartyComparisonRow | null> {
  const row = await prisma.party.findUnique({
    where: { id },
    include: partyDetailInclude,
  });
  if (!row) return null;
  return mapParty(row);
}

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

export async function getMandatesChartData(): Promise<MandatesChartParty[]> {
  const rows = await prisma.party.findMany({
    where: { mandates: { not: null } },
    select: {
      id: true,
      name: true,
      mandates: true,
      candidateName: true,
      imageUrl: true,
      leader: { select: { name: true, image: true } },
    },
  });
  const sorted = rows
    .filter((r): r is typeof r & { mandates: number } => r.mandates != null)
    .sort((a, b) => b.mandates - a.mandates);

  return sorted.map((r, i) => ({
    key: r.id,
    name: r.name,
    leader: r.leader?.name ?? r.candidateName ?? "",
    leaderImage: r.leader?.image ?? r.imageUrl ?? null,
    mandates: r.mandates,
    color: MANDATES_CHART_PALETTE[i % MANDATES_CHART_PALETTE.length],
  }));
}
