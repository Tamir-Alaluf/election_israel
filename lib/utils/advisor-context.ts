import { prisma } from "@/lib/utils/prisma";
import type { Prisma } from "@prisma/client";
import {
  leaderParameterLabels,
  partyComparisonParameterLabels,
} from "@/lib/constants/election-parameter-labels";

type PartyWithAdvisorRelations = Prisma.PartyGetPayload<{
  include: {
    baseTopics: true;
    legislations: { include: { legislation: true } };
    leader: true;
  };
}>;

type CandidateWithParty = Prisma.CandidateGetPayload<{
  include: { party: true };
}>;

export async function buildAdvisorElectionContext(): Promise<string> {
  const [parties, leaders]: [
    PartyWithAdvisorRelations[],
    CandidateWithParty[],
  ] = await Promise.all([
    prisma.party.findMany({
      include: {
        baseTopics: true,
        legislations: { include: { legislation: true } },
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

  const partyInfo = parties
    .map((p) => {
      const base = p.baseTopics
        .map((t) => `${t.baseTopicTitle}: ${t.baseTopicOptionDisplayValue}`)
        .join(", ");
      const laws = p.legislations
        .map((l) => `${l.legislationTitle}: ${l.optionDisplayValue}`)
        .join(", ");
      return `${p.name} (${p.leader?.name ?? p.candidateName ?? ""}): ${base}; חוקים: ${laws}`;
    })
    .join("\n");

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
