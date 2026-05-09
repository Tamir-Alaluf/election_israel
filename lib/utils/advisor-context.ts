import { prisma } from "@/lib/utils/prisma";
import type {
  PartyWithAdvisorRelations,
  CandidateWithParty,
} from "@/lib/types/advisor";
import { leaderParameterLabels } from "@/lib/constants/candidates";
import { partyComparisonParameterLabels } from "@/lib/constants/parties";
import { MISSING_PARAM_FALLBACK } from "@/lib/constants/advisor";
import { ADVISOR_SYSTEM_CORE_RULES } from "@/lib/constants/advisor";

/** מערכת קצרה לסבבי שאלות המשך — ללא נתוני מפלגות, כדי להתמקד בפרופיל ובתשובות קודמות. */
export function buildAdvisorFollowUpSystemContext(): string {
  return `
אתה יועץ פוליטי אובייקטיבי ומקצועי לבחירות בישראל 2026.
תפקידך לנסח שאלות מדיניות־ערכיות קצרות המותאמות לפרופיל המשתמש ולתשובותיו הקודמות.

${ADVISOR_SYSTEM_CORE_RULES}

בסבב זה אין לך גישה לרשימת מפלגות או מועמדים מהמערכת. אל תמציא עובדות על מפלגות או אישים ספציפיים; התמקד בשאלות ובחירות תשובה כלליות וענייניות בעברית.
`.trim();
}

function firstTopicValue(
  topics: { baseTopicTitle: string; baseTopicOptionDisplayValue: string }[],
  aliases: string[],
): string | null {
  for (const alias of aliases) {
    const match = topics.find((topic) => topic.baseTopicTitle === alias);
    if (match?.baseTopicOptionDisplayValue) {
      return match.baseTopicOptionDisplayValue;
    }
  }
  return null;
}

function listOrFallback(values: string[]): string {
  if (values.length === 0) return MISSING_PARAM_FALLBACK;
  return values.join(", ");
}

function resolvePartyParamValue(
  party: PartyWithAdvisorRelations,
  label: string,
): string {
  const normalized = label.trim();
  if (normalized === "חזון") {
    return party.vision?.trim() || MISSING_PARAM_FALLBACK;
  }
  if (normalized.includes("חברי מפלגה")) {
    return listOrFallback(party.members.map((member) => member.name));
  }
  if (normalized.includes("מאז הבחירות")) {
    return listOrFallback(
      party.recentActions.map(
        (action) => `${action.actionGroup.name}: ${action.title}`,
      ),
    );
  }
  if (normalized.includes("הבטחות")) {
    return listOrFallback(party.futurePromises.map((promise) => promise.title));
  }
  if (normalized.includes("חוקים")) {
    return listOrFallback(
      party.legislations.map(
        (legislation) =>
          `${legislation.legislationTitle}: ${legislation.optionDisplayValue}`,
      ),
    );
  }
  if (normalized.includes("ביטחונית")) {
    return (
      firstTopicValue(party.baseTopics, ["עמדה ביטחונית", "גישה ביטחונית"]) ??
      MISSING_PARAM_FALLBACK
    );
  }
  if (normalized.includes("כלכלית")) {
    return (
      firstTopicValue(party.baseTopics, ["עמדה כלכלית", "גישה כלכלית"]) ??
      MISSING_PARAM_FALLBACK
    );
  }
  if (normalized.includes("חרדים")) {
    return (
      firstTopicValue(party.baseTopics, [
        "שילוב חרדים",
        "שילוב חרדים בממשלה",
      ]) ?? MISSING_PARAM_FALLBACK
    );
  }
  if (normalized.includes("ערבים")) {
    return (
      firstTopicValue(party.baseTopics, [
        "שילוב ערבים",
        "שילוב ערבים בממשלה",
      ]) ?? MISSING_PARAM_FALLBACK
    );
  }
  if (normalized === "סוג מפלגה") {
    return (
      firstTopicValue(party.baseTopics, ["סוג מפלגה"]) ?? MISSING_PARAM_FALLBACK
    );
  }
  if (normalized === "גוש") {
    return firstTopicValue(party.baseTopics, ["גוש"]) ?? MISSING_PARAM_FALLBACK;
  }
  return MISSING_PARAM_FALLBACK;
}

function resolveLeaderParamValue(
  leader: CandidateWithParty,
  label: string,
): string {
  const normalized = label.trim();
  if (normalized === "חזון") {
    return leader.vision?.trim() || MISSING_PARAM_FALLBACK;
  }
  if (normalized.includes("השכלה")) {
    const lines = leader.education
      .map((e) =>
        [
          e.degreeLevel,
          e.major,
          e.university,
          e.startYear != null || e.endYear != null
            ? `${e.startYear ?? "?"}–${e.endYear ?? "?"}`
            : null,
        ]
          .filter(Boolean)
          .join(", "),
      )
      .filter((line) => line.length > 0);
    return listOrFallback(lines);
  }
  if (normalized.includes("רקע מקצועי")) {
    return listOrFallback(
      leader.professionals.map((p) =>
        p.group?.name ? `${p.title} (${p.group.name})` : p.title,
      ),
    );
  }
  if (normalized.includes("הישגים במהלך הקריירה")) {
    return listOrFallback(
      leader.careerActions.map(
        (c) => `${c.actionGroup.name}: ${c.title}`,
      ),
    );
  }
  if (normalized.includes("מה עשה מאז הבחירות")) {
    return listOrFallback(
      leader.recentActions.map(
        (r) => `${r.actionGroup.name}: ${r.title}`,
      ),
    );
  }
  if (normalized.includes("ביטחונית")) {
    return (
      firstTopicValue(leader.party.baseTopics, [
        "עמדה ביטחונית",
        "גישה ביטחונית",
      ]) ?? MISSING_PARAM_FALLBACK
    );
  }
  if (normalized.includes("כלכלית")) {
    return (
      firstTopicValue(leader.party.baseTopics, [
        "עמדה כלכלית",
        "גישה כלכלית",
      ]) ?? MISSING_PARAM_FALLBACK
    );
  }
  if (normalized === "גוש") {
    return firstTopicValue(leader.party.baseTopics, ["גוש"]) ?? MISSING_PARAM_FALLBACK;
  }
  if (normalized.includes("מנדטים")) {
    return leader.party.mandates != null
      ? String(leader.party.mandates)
      : MISSING_PARAM_FALLBACK;
  }
  return MISSING_PARAM_FALLBACK;
}

export async function buildAdvisorElectionContext(): Promise<string> {
  //get parties and leaders
  const [parties, leaders]: [
    PartyWithAdvisorRelations[],
    CandidateWithParty[],
  ] = await Promise.all([
    prisma.party.findMany({
      include: {
        baseTopics: true,
        legislations: { include: { legislation: true } },
        members: { orderBy: { orderIndex: "asc" } },
        recentActions: {
          include: { actionGroup: true },
          orderBy: { orderIndex: "asc" },
        },
        futurePromises: { orderBy: { orderIndex: "asc" } },
        leader: true,
      },
      orderBy: { name: "asc" },
    }),
    prisma.candidate.findMany({
      where: { partyLeaderOf: { some: {} } },
      include: {
        party: { include: { baseTopics: true } },
        education: { orderBy: { id: "asc" } },
        professionals: {
          include: { group: true },
          orderBy: { startYear: "asc" },
        },
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
    }),
  ]);

  //party Information
  const partyInfo = parties
    .map((p) => {
      const leaderName =
        p.leader?.name ?? p.candidateName ?? MISSING_PARAM_FALLBACK;
      const paramsText = partyComparisonParameterLabels
        .map((label) => `${label}: ${resolvePartyParamValue(p, label)}`)
        .join(" | ");
      return `${p.name} (${leaderName}): ${paramsText}`;
    })
    .join("\n");

  //leader Information
  const leaderInfo = leaders
    .map((l) => {
      const paramsText = leaderParameterLabels
        .map((label) => `${label}: ${resolveLeaderParamValue(l, label)}`)
        .join(" | ");
      return `${l.name} (${l.partyName}): ${paramsText}`;
    })
    .join("\n");

  const partyParams = partyComparisonParameterLabels.join(", ");
  const leaderParams = leaderParameterLabels.join(", ");

  return `
אתה יועץ פוליטי אובייקטיבי ומקצועי לבחירות בישראל 2026.
תפקידך לעזור לאזרחים להבין את המפה הפוליטית ולמצוא את המפלגה שמתאימה לערכים שלהם.

${ADVISOR_SYSTEM_CORE_RULES}

פרמטרים להשוואת מפלגות: ${partyParams}
פרמטרים להשוואת מועמדים: ${leaderParams}

מידע על מפלגות:
${partyInfo}

מידע על מועמדים (ראשי מפלגות):
${leaderInfo}
`.trim();
}
