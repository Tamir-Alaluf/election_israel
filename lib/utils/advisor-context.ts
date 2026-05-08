import { prisma } from "@/lib/utils/prisma";
import type { Prisma } from "@prisma/client";
import { leaderParameterLabels } from "@/lib/constants/candidates";
import { partyComparisonParameterLabels } from "@/lib/constants/parties";

type PartyWithAdvisorRelations = Prisma.PartyGetPayload<{
  include: {
    baseTopics: true;
    legislations: { include: { legislation: true } };
    members: { orderBy: { orderIndex: "asc" } };
    recentActions: {
      include: { actionGroup: true };
      orderBy: { orderIndex: "asc" };
    };
    futurePromises: { orderBy: { orderIndex: "asc" } };
    leader: true;
  };
}>;

type CandidateWithParty = Prisma.CandidateGetPayload<{
  include: { party: true };
}>;

const MISSING_PARAM_FALLBACK = "לא צוין";

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
      include: { party: true },
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
      const vals = [
        l.securityApproach && `גישה ביטחונית: ${l.securityApproach}`,
        l.economicApproach && `גישה כלכלית: ${l.economicApproach}`,
        l.leadershipStyle && `סגנון מנהיגות: ${l.leadershipStyle}`,
        l.harediGov && `שילוב חרדים: ${l.harediGov}`,
        l.arabGov && `שילוב ערבים: ${l.arabGov}`,
        l.party?.mandates != null && `מנדטים (אומדן): ${l.party.mandates}`,
      ]
        .filter(Boolean)
        .join(", ");
      return `${l.name} (${l.partyName}): ${vals}`;
    })
    .join("\n");

  const partyParams = partyComparisonParameterLabels.join(", ");
  const leaderParams = leaderParameterLabels.join(", ");

  return `
אתה יועץ פוליטי אובייקטיבי ומקצועי לבחירות בישראל 2026.
תפקידך לעזור לאזרחים להבין את המפה הפוליטית ולמצוא את המפלגה שמתאימה לערכים שלהם.

כללים חשובים:
- היה אובייקטיבי ונטול משוא פנים
- הצג עובדות ונתונים
- עזור למשתמש לגבש דעה משלו, אל תכפה עליו בחירה
- דבר בעברית תקנית וידידותית
- התמקד בנושאים פוליטיים ענייניים
- אם אינך יודע משהו, אמור זאת

פרמטרים להשוואת מפלגות: ${partyParams}
פרמטרים להשוואת מועמדים: ${leaderParams}

מידע על מפלגות:
${partyInfo}

מידע על מועמדים (ראשי מפלגות):
${leaderInfo}
`.trim();
}
