import { prisma } from "@/lib/prisma";
import {
  ATTRIBUTE_BASE_TOPIC_ORDER,
  FILTER_BASE_TOPIC_TITLES,
} from "@/lib/data/party-filter-keys";

export type PartyComparisonRow = {
  id: string;
  name: string;
  leader: string;
  image: string | null;
  vision: string | null;
  /** baseTopicTitle → selected option display */
  baseTopicByTitle: Record<string, string>;
  /** legislation id → option display */
  legislationById: Record<string, string>;
  members: string[];
  recentActionsItems: {
    category: string;
    title: string;
    description: string | null;
  }[];
  futurePromisesItems: { title: string; description: string | null }[];
};

export type PartyFilterBaseTopicBlock = {
  title: string;
  options: { value: string; label: string }[];
};

export type PartyPageFilterMeta = {
  typeBaseTopic: PartyFilterBaseTopicBlock;
  securityBaseTopic: PartyFilterBaseTopicBlock;
  economyBaseTopic: PartyFilterBaseTopicBlock;
  /** Row id = BaseTopic.title (stable in DB) */
  attributeTopics: { id: string; label: string }[];
  /** Law filter + issues carousel; id = legislation UUID */
  lawIssues: { id: string; label: string; group: string }[];
  attributesSectionTitle: string;
  issuesSectionTitle: string;
};

const partyInclude = {
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

export async function getPartyFilterMetadata(): Promise<PartyPageFilterMeta> {
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

  const attributeTopics = sortAttributeTopics(baseTopicRows.map((t) => t.title));

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

export async function getPartiesForComparison(): Promise<PartyComparisonRow[]> {
  const rows = await prisma.party.findMany({
    include: partyInclude,
    orderBy: { name: "asc" },
  });
  return rows.map((p) => mapParty(p));
}

export async function getPartyPageData(): Promise<{
  parties: PartyComparisonRow[];
  filterMeta: PartyPageFilterMeta;
}> {
  const [parties, filterMeta] = await Promise.all([
    getPartiesForComparison(),
    getPartyFilterMetadata(),
  ]);
  return { parties, filterMeta };
}

export type MandatesChartParty = {
  key: string;
  name: string;
  mandates: number;
  color: string;
};

export async function getMandatesChartData(): Promise<MandatesChartParty[]> {
  const rows = await prisma.party.findMany({
    where: { mandates: { not: null } },
    select: {
      id: true,
      name: true,
      mandates: true,
      chartColor: true,
    },
  });
  const withMandates = rows
    .filter(
      (r): r is typeof r & { mandates: number } =>
        r.mandates != null && r.chartColor != null && r.chartColor !== "",
    )
    .map((r) => ({
      key: r.id,
      name: r.name,
      mandates: r.mandates,
      color: r.chartColor!,
    }));
  if (withMandates.length > 0) {
    return withMandates.sort((a, b) => b.mandates - a.mandates);
  }
  const fallback = await prisma.party.findMany({
    select: { id: true, name: true, mandates: true, chartColor: true },
  });
  return fallback
    .map((r) => ({
      key: r.id,
      name: r.name,
      mandates: r.mandates ?? 0,
      color: r.chartColor ?? "#64748b",
    }))
    .sort((a, b) => b.mandates - a.mandates);
}
