/**
 * Imports election JSON into Postgres (e.g. Supabase) via Prisma.
 *
 * Order: reference tables → parties (without leader) → candidates → party leader links →
 * party-scoped children → candidate-scoped children.
 *
 * Replace semantics: when an optional array key is present, existing rows for the
 * party/candidate names appearing in that array are deleted before inserts (empty array = no-op).
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PrismaClient } from "@prisma/client";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_IMPORT_JSON = path.join(
  SCRIPT_DIR,
  "example-election-import.json",
);

/** Legislation rows inferred only from `partyLegislations` need a group (FK on Legislation). */
const FALLBACK_LEGISLATION_GROUP_NAME = "ייבוא כללי";

import {
  parseElectionImportPayload,
  type ElectionImportBaseTopicOption,
  type ElectionImportPayload,
} from "@/lib/types/election-import";

function readJsonInput(): string {
  const argv = process.argv.slice(2);
  const fileFlag = argv.indexOf("--file");
  if (fileFlag !== -1 && argv[fileFlag + 1]) {
    return readFileSync(argv[fileFlag + 1], "utf8");
  }
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`Usage:
  npx tsx scripts/import-election-data.ts [--file <path/to/data.json>]
  cat data.json | npx tsx scripts/import-election-data.ts

Without --file and without piped stdin, reads:
  ${DEFAULT_IMPORT_JSON}

Requires DATABASE_URL (and DIRECT_URL if configured) with privileges to write tables.`);
    process.exit(0);
  }
  if (!process.stdin.isTTY) {
    try {
      return readFileSync(0, "utf8");
    } catch (e: unknown) {
      const err = e as NodeJS.ErrnoException;
      // CI / sandbox: stdin is not a TTY but also not a real pipe — fd 0 can return EAGAIN.
      if (err.code !== "EAGAIN" && err.code !== "EWOULDBLOCK") {
        throw e;
      }
    }
  }
  return readFileSync(DEFAULT_IMPORT_JSON, "utf8");
}

function mergedBaseTopicRows(payload: ElectionImportPayload): {
  topicTitles: Set<string>;
  flatOptions: ElectionImportBaseTopicOption[];
} {
  const topicTitles = new Set<string>();
  for (const t of payload.baseTopics ?? []) {
    topicTitles.add(t.title);
  }
  for (const t of payload.baseTopicsWithOptions ?? []) {
    topicTitles.add(t.title);
  }
  for (const row of payload.partyBaseTopics ?? []) {
    topicTitles.add(row.baseTopicTitle);
  }
  const flatOptions: ElectionImportBaseTopicOption[] = [
    ...(payload.baseTopicOptions ?? []),
    ...(payload.baseTopicsWithOptions ?? []).flatMap((t) =>
      t.options.map((optionDisplayValue) => ({
        baseTopicTitle: t.title,
        optionDisplayValue,
      })),
    ),
    ...(payload.partyBaseTopics ?? []).map((row) => ({
      baseTopicTitle: row.baseTopicTitle,
      optionDisplayValue: row.baseTopicOptionDisplayValue,
    })),
  ];
  return { topicTitles, flatOptions };
}

function collectActionGroupNames(payload: ElectionImportPayload): Set<string> {
  const names = new Set<string>();
  for (const row of payload.actionGroups ?? []) {
    names.add(row.name);
  }
  for (const row of payload.recentActions ?? []) {
    names.add(row.actionGroupName);
  }
  for (const row of payload.futurePromises ?? []) {
    names.add(row.actionGroupName);
  }
  for (const row of payload.candidateCareerActions ?? []) {
    names.add(row.actionGroupName);
  }
  for (const row of payload.candidateRecentActions ?? []) {
    names.add(row.actionGroupName);
  }
  return names;
}

function collectProfessionalGroupNames(
  payload: ElectionImportPayload,
): Set<string> {
  const names = new Set<string>();
  for (const row of payload.professionalGroups ?? []) {
    names.add(row.name);
  }
  for (const row of payload.candidateProfessionals ?? []) {
    names.add(row.groupName);
  }
  return names;
}

export async function importElectionData(
  payload: ElectionImportPayload,
  prisma: PrismaClient,
): Promise<void> {
  const { topicTitles, flatOptions } = mergedBaseTopicRows(payload);

  await prisma.$transaction(
    async (tx) => {
      for (const row of payload.legislationGroups ?? []) {
        await tx.legislationGroup.upsert({
          where: { name: row.name },
          create: { name: row.name },
          update: {},
        });
      }

      for (const row of payload.legislations ?? []) {
        await tx.legislation.upsert({
          where: { title: row.title },
          create: {
            title: row.title,
            legislationGroupName: row.legislationGroupName,
          },
          update: { legislationGroupName: row.legislationGroupName },
        });
      }

      for (const row of payload.legislationOptions ?? []) {
        await tx.legislationOption.upsert({
          where: { displayValue: row.displayValue },
          create: { displayValue: row.displayValue },
          update: {},
        });
      }

      const legislationTitlesFromPayload = new Set(
        (payload.legislations ?? []).map((r) => r.title),
      );
      if ((payload.partyLegislations ?? []).length > 0) {
        await tx.legislationGroup.upsert({
          where: { name: FALLBACK_LEGISLATION_GROUP_NAME },
          create: { name: FALLBACK_LEGISLATION_GROUP_NAME },
          update: {},
        });
        const partyLegTitles = [
          ...new Set(
            (payload.partyLegislations ?? []).map((r) => r.legislationTitle),
          ),
        ];
        for (const title of partyLegTitles) {
          if (!legislationTitlesFromPayload.has(title)) {
            await tx.legislation.upsert({
              where: { title },
              create: {
                title,
                legislationGroupName: FALLBACK_LEGISLATION_GROUP_NAME,
              },
              update: {},
            });
          }
        }
        const partyLegOptionValues = [
          ...new Set(
            (payload.partyLegislations ?? []).map((r) => r.optionDisplayValue),
          ),
        ];
        for (const displayValue of partyLegOptionValues) {
          await tx.legislationOption.upsert({
            where: { displayValue },
            create: { displayValue },
            update: {},
          });
        }
      }

      for (const title of topicTitles) {
        await tx.baseTopic.upsert({
          where: { title },
          create: { title },
          update: {},
        });
      }

      for (const row of flatOptions) {
        await tx.baseTopicOption.upsert({
          where: {
            baseTopicTitle_optionDisplayValue: {
              baseTopicTitle: row.baseTopicTitle,
              optionDisplayValue: row.optionDisplayValue,
            },
          },
          create: {
            baseTopicTitle: row.baseTopicTitle,
            optionDisplayValue: row.optionDisplayValue,
          },
          update: {},
        });
      }

      for (const name of collectActionGroupNames(payload)) {
        await tx.actionGroup.upsert({
          where: { name },
          create: { name },
          update: {},
        });
      }

      for (const name of collectProfessionalGroupNames(payload)) {
        await tx.professionalGroup.upsert({
          where: { name },
          create: { name },
          update: {},
        });
      }

      for (const p of payload.parties ?? []) {
        await tx.party.upsert({
          where: { name: p.name },
          create: {
            name: p.name,
            mandates: p.mandates ?? null,
            vision: p.vision ?? null,
            imageUrl: p.imageUrl ?? null,
            candidateName: null,
          },
          update: {
            mandates: p.mandates ?? null,
            vision: p.vision ?? null,
            imageUrl: p.imageUrl ?? null,
          },
        });
      }

      for (const c of payload.candidates ?? []) {
        await tx.candidate.upsert({
          where: { name: c.name },
          create: {
            name: c.name,
            partyName: c.partyName,
            vision: c.vision ?? null,
            image: c.image ?? null,
            positiveSentiment: c.positiveSentiment ?? null,
            negativeSentiment: c.negativeSentiment ?? null,
          },
          update: {
            partyName: c.partyName,
            vision: c.vision ?? null,
            image: c.image ?? null,
            positiveSentiment: c.positiveSentiment ?? null,
            negativeSentiment: c.negativeSentiment ?? null,
          },
        });
      }

      for (const p of payload.parties ?? []) {
        if (p.candidateName) {
          await tx.party.update({
            where: { name: p.name },
            data: { candidateName: p.candidateName },
          });
        }
      }

      if (payload.partyMembers !== undefined) {
        const names = [
          ...new Set(payload.partyMembers.map((m) => m.partyName)),
        ];
        if (names.length > 0) {
          await tx.partyMember.deleteMany({
            where: { partyName: { in: names } },
          });
        }
        if (payload.partyMembers.length > 0) {
          await tx.partyMember.createMany({
            data: payload.partyMembers.map((m) => ({
              name: m.name,
              description: m.description ?? null,
              orderIndex: m.orderIndex,
              image: m.image ?? null,
              partyName: m.partyName,
            })),
          });
        }
      }

      if (payload.partyBaseTopics !== undefined) {
        const names = [
          ...new Set(payload.partyBaseTopics.map((r) => r.partyName)),
        ];
        if (names.length > 0) {
          await tx.partyBaseTopic.deleteMany({
            where: { partyName: { in: names } },
          });
        }
        if (payload.partyBaseTopics.length > 0) {
          await tx.partyBaseTopic.createMany({
            data: payload.partyBaseTopics.map((r) => ({
              description: r.description ?? null,
              baseTopicOptionDisplayValue: r.baseTopicOptionDisplayValue,
              baseTopicTitle: r.baseTopicTitle,
              partyName: r.partyName,
            })),
          });
        }
      }

      if (payload.partyLegislations !== undefined) {
        const names = [
          ...new Set(payload.partyLegislations.map((r) => r.partyName)),
        ];
        if (names.length > 0) {
          await tx.partyLegislation.deleteMany({
            where: { partyName: { in: names } },
          });
        }
        if (payload.partyLegislations.length > 0) {
          await tx.partyLegislation.createMany({
            data: payload.partyLegislations.map((r) => ({
              legislationTitle: r.legislationTitle,
              optionDisplayValue: r.optionDisplayValue,
              partyName: r.partyName,
            })),
          });
        }
      }

      if (payload.recentActions !== undefined) {
        const names = [
          ...new Set(payload.recentActions.map((r) => r.partyName)),
        ];
        if (names.length > 0) {
          await tx.recentAction.deleteMany({
            where: { partyName: { in: names } },
          });
        }
        if (payload.recentActions.length > 0) {
          await tx.recentAction.createMany({
            data: payload.recentActions.map((r) => ({
              partyName: r.partyName,
              title: r.title,
              actionGroupName: r.actionGroupName,
              description: r.description ?? null,
              orderIndex: r.orderIndex ?? null,
            })),
          });
        }
      }

      if (payload.futurePromises !== undefined) {
        const names = [
          ...new Set(payload.futurePromises.map((r) => r.partyName)),
        ];
        if (names.length > 0) {
          await tx.futurePromise.deleteMany({
            where: { partyName: { in: names } },
          });
        }
        if (payload.futurePromises.length > 0) {
          await tx.futurePromise.createMany({
            data: payload.futurePromises.map((r) => ({
              partyName: r.partyName,
              title: r.title,
              actionGroupName: r.actionGroupName,
              description: r.description ?? null,
              orderIndex: r.orderIndex ?? null,
            })),
          });
        }
      }

      if (payload.candidateProfessionals !== undefined) {
        const names = [
          ...new Set(
            payload.candidateProfessionals.map((r) => r.candidateName),
          ),
        ];
        if (names.length > 0) {
          await tx.candidateProfessional.deleteMany({
            where: { candidateName: { in: names } },
          });
        }
        if (payload.candidateProfessionals.length > 0) {
          await tx.candidateProfessional.createMany({
            data: payload.candidateProfessionals.map((r) => ({
              title: r.title,
              startYear: r.startYear ?? null,
              endYear: r.endYear ?? null,
              description: r.description ?? null,
              candidateName: r.candidateName,
              groupName: r.groupName,
            })),
          });
        }
      }

      if (payload.candidateCareerActions !== undefined) {
        const names = [
          ...new Set(
            payload.candidateCareerActions.map((r) => r.candidateName),
          ),
        ];
        if (names.length > 0) {
          await tx.candidateCareerAction.deleteMany({
            where: { candidateName: { in: names } },
          });
        }
        if (payload.candidateCareerActions.length > 0) {
          await tx.candidateCareerAction.createMany({
            data: payload.candidateCareerActions.map((r) => ({
              title: r.title,
              description: r.description ?? null,
              orderIndex: r.orderIndex ?? null,
              actionGroupName: r.actionGroupName,
              candidateName: r.candidateName,
            })),
          });
        }
      }

      if (payload.candidateRecentActions !== undefined) {
        const names = [
          ...new Set(
            payload.candidateRecentActions.map((r) => r.candidateName),
          ),
        ];
        if (names.length > 0) {
          await tx.candidateRecentAction.deleteMany({
            where: { candidateName: { in: names } },
          });
        }
        if (payload.candidateRecentActions.length > 0) {
          await tx.candidateRecentAction.createMany({
            data: payload.candidateRecentActions.map((r) => ({
              title: r.title,
              description: r.description ?? null,
              orderIndex: r.orderIndex ?? null,
              actionGroupName: r.actionGroupName,
              candidateName: r.candidateName,
            })),
          });
        }
      }
    },
    {
      maxWait: 60_000,
      timeout: 180_000,
    },
  );
}

async function main(): Promise<void> {
  const raw = readJsonInput();
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (e) {
    console.error("Invalid JSON:", e);
    process.exit(1);
  }

  const payload = parseElectionImportPayload(parsed);
  const prisma = new PrismaClient({ log: ["error"] });
  try {
    await importElectionData(payload, prisma);
    console.error("Import completed successfully.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
