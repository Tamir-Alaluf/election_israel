import "dotenv/config";
import { createHash } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import {
  allPartyComparisonParameters,
  parties,
  leaders,
  recentActionItemCategories,
  type RecentActionItemCategory,
} from "../lib/election-data";
import {
  glossaryCategories,
  glossaryTerms,
} from "../lib/election-glossary";

/** Use direct Postgres URL so long transactions / bulk deletes work (pooler breaks interactive tx). */
const prisma = new PrismaClient({
  datasourceUrl:
    process.env.DIRECT_URL?.trim() || process.env.DATABASE_URL?.trim(),
});

/** Stable UUIDs from string keys so re-seeding keeps the same ids. */
function deterministicUuid(seed: string): string {
  const hash = createHash("sha256").update(seed).digest();
  const bytes = Uint8Array.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = Buffer.from(bytes).toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

/** Wipe app tables in FK-safe order (TRUNCATE … CASCADE). */
async function clearDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "party_base_topics",
      "party_legislations",
      "recent_actions",
      "future_promises",
      "party_members",
      "candidate_educations",
      "candidate_professionals",
      "candidate_career_actions",
      "candidate_recent_actions",
      "public_opinions",
      "candidates",
      "parties",
      "legislations",
      "legislation_options",
      "legislation_groups",
      "base_topic_options",
      "base_topics",
      "action_groups",
      "glossary_terms",
      "glossary_categories",
      "professional_groups"
    RESTART IDENTITY CASCADE;
  `);
}

async function seedActionGroups() {
  const futureId = deterministicUuid("action-group:future-promises");
  const groups = [
    ...recentActionItemCategories.map((name) => ({
      id: deterministicUuid(`action-group:${name}`),
      name,
    })),
    { id: futureId, name: "הבטחות לעתיד" },
  ];
  await prisma.actionGroup.createMany({ data: groups });
  return { futurePromiseGroupId: futureId };
}

async function seedBaseTopics() {
  const paramList = [...allPartyComparisonParameters] as {
    id: string;
    label: string;
    options: readonly string[];
  }[];

  await prisma.baseTopic.createMany({
    data: paramList.map((param) => ({
      id: deterministicUuid(`topic:${param.id}`),
      title: param.label,
    })),
  });

  const options = paramList.flatMap((param) =>
    param.options.map((opt) => ({
      id: deterministicUuid(`topic-opt:${param.id}:${opt}`),
      baseTopicId: deterministicUuid(`topic:${param.id}`),
      optionDisplayValue: opt,
    })),
  );
  await prisma.baseTopicOption.createMany({ data: options });
}

async function seedPartiesAndCandidates() {
  const paramById = new Map(
    ([...allPartyComparisonParameters] as {
      id: string;
      label: string;
      options: readonly string[];
    }[]).map((p) => [p.id, p]),
  );

  await prisma.party.createMany({
    data: parties.map((p) => ({
      id: deterministicUuid(`party:${p.id}`),
      name: p.name,
      color: p.color,
      mandates: p.mandates,
      vision: p.vision,
      imageUrl: p.image,
    })),
  });

  const memberRows = parties.flatMap((p) =>
    p.members.map((name, orderIndex) => ({
      id: deterministicUuid(`pm:${p.id}:${orderIndex}:${name}`),
      partyId: deterministicUuid(`party:${p.id}`),
      name,
      orderIndex,
    })),
  );
  await prisma.partyMember.createMany({ data: memberRows });

  const pbtRows = parties.flatMap((p) => {
    const rows: {
      id: string;
      partyId: string;
      baseTopicId: string;
      baseTopicOptionId: string;
    }[] = [];
    for (const [paramId, value] of Object.entries(p.values)) {
      const param = paramById.get(paramId);
      if (!param) continue;
      const opts = param.options as readonly string[];
      if (!opts.includes(value)) continue;
      rows.push({
        id: deterministicUuid(`pbt:${p.id}:${paramId}`),
        partyId: deterministicUuid(`party:${p.id}`),
        baseTopicId: deterministicUuid(`topic:${param.id}`),
        baseTopicOptionId: deterministicUuid(`topic-opt:${param.id}:${value}`),
      });
    }
    return rows;
  });
  await prisma.partyBaseTopic.createMany({ data: pbtRows });

  await prisma.candidate.createMany({
    data: leaders
      .map((l) => {
        const partySlug = parties.find((pt) => pt.name === l.party)?.id;
        if (!partySlug) return null;
        return {
          id: deterministicUuid(`candidate:${l.id}`),
          name: l.name,
          partyId: deterministicUuid(`party:${partySlug}`),
          image: l.image,
          professionalBackground: l.professionalBackground,
          vision: l.vision,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null),
  });

  const educationRows = leaders
    .map((l) => {
      if (!l.academicEducation?.trim()) return null;
      const partySlug = parties.find((pt) => pt.name === l.party)?.id;
      if (!partySlug) return null;
      return {
        id: deterministicUuid(`edu:${l.id}`),
        candidateId: deterministicUuid(`candidate:${l.id}`),
        description: l.academicEducation,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);
  if (educationRows.length > 0) {
    await prisma.candidateEducation.createMany({ data: educationRows });
  }

  for (const p of parties) {
    const leader = leaders.find(
      (x) => x.name === p.leader && x.party === p.name,
    );
    if (!leader) continue;
    await prisma.party.update({
      where: { id: deterministicUuid(`party:${p.id}`) },
      data: {
        candidateId: deterministicUuid(`candidate:${leader.id}`),
      },
    });
  }
}

async function seedRecentAndFutureActions(futurePromiseGroupId: string) {
  const categoryToGroupId = new Map(
    recentActionItemCategories.map((c) => [
      c,
      deterministicUuid(`action-group:${c}`),
    ]),
  );

  const recentRows: {
    id: string;
    partyId: string;
    actionGroupId: string;
    title: string;
    description: string | null;
    orderIndex: number;
  }[] = [];
  const futureRows: {
    id: string;
    partyId: string;
    actionGroupId: string;
    title: string;
    description: string | null;
    orderIndex: number;
  }[] = [];

  for (const p of parties) {
    const partyId = deterministicUuid(`party:${p.id}`);
    let orderIndex = 0;
    for (const item of p.recentActionsItems ?? []) {
      const category = item.category as RecentActionItemCategory;
      const groupId =
        categoryToGroupId.get(category) ??
        categoryToGroupId.get(recentActionItemCategories[0]!)!;
      recentRows.push({
        id: deterministicUuid(`ra:${p.id}:${orderIndex}`),
        partyId,
        actionGroupId: groupId,
        title: item.title,
        description: item.description,
        orderIndex,
      });
      orderIndex += 1;
    }

    let fpIndex = 0;
    for (const item of p.futurePromisesItems ?? []) {
      futureRows.push({
        id: deterministicUuid(`fp:${p.id}:${fpIndex}`),
        partyId,
        actionGroupId: futurePromiseGroupId,
        title: item.title,
        description: item.description,
        orderIndex: fpIndex,
      });
      fpIndex += 1;
    }
  }

  if (recentRows.length > 0) {
    await prisma.recentAction.createMany({ data: recentRows });
  }
  if (futureRows.length > 0) {
    await prisma.futurePromise.createMany({ data: futureRows });
  }
}

async function seedGlossary() {
  await prisma.glossaryCategory.createMany({
    data: glossaryCategories.map((c) => ({
      id: deterministicUuid(`gcat:${c.id}`),
      name: c.label,
    })),
  });
  await prisma.glossaryTerm.createMany({
    data: glossaryTerms.map((t) => ({
      id: deterministicUuid(`gterm:${t.id}`),
      title: t.term,
      definition: t.definition,
      glossaryCategoryId: deterministicUuid(`gcat:${t.categoryId}`),
    })),
  });
}

async function main() {
  console.log("Clearing existing data…");
  await clearDatabase();

  console.log("Seeding action groups…");
  const { futurePromiseGroupId } = await seedActionGroups();

  console.log("Seeding base topics & options…");
  await seedBaseTopics();

  console.log("Seeding parties, candidates, members, topic picks…");
  await seedPartiesAndCandidates();

  console.log("Seeding recent actions & future promises…");
  await seedRecentAndFutureActions(futurePromiseGroupId);

  console.log("Seeding glossary…");
  await seedGlossary();

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
