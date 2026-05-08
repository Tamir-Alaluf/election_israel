import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/utils/prisma";
import {
  ATTRIBUTE_BASE_TOPIC_ORDER,
  FILTER_BASE_TOPIC_TITLES,
} from "@/lib/constants/parties";
import type {
  PartyComparisonRow,
  PartyFilterBaseTopicBlock,
  PartyPageFilterMeta,
} from "@/lib/types/parties";

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

export async function getPartiesForComparison(): Promise<PartyComparisonRow[]> {
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

export const getPartyPageData = cache(async () => loadPartyPageData());
