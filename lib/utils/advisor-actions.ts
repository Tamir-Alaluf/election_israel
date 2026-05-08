"use server";

import { generateObject } from "ai";
import { z } from "zod";
import {
  ADVISOR_ECONOMY_OPTIONS,
  ADVISOR_GOV_INTEGRATION_OPTIONS,
  ADVISOR_SECURITY_OPTIONS,
  advisorModel,
  advisorProviderOptions,
} from "@/lib/constants/advisor";
import { prisma } from "@/lib/utils/prisma";
import { buildAdvisorElectionContext } from "@/lib/utils/advisor-context";
import { FILTER_BASE_TOPIC_TITLES } from "@/lib/constants/parties";
import type {
  AdvisorAiQuestion,
  AdvisorAxisSnapshot,
  AdvisorCandidateMatch,
  AdvisorFinalProfile,
  AdvisorMatchingResult,
  AdvisorPoliticalQA,
  AdvisorProfileBase,
} from "@/lib/types/advisor";
const batchSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().min(1),
        options: z.array(z.string().min(1)).min(3).max(4),
      }),
    )
    .length(5),
});

const axisSnapshotSchema = z.object({
  security: z.enum(ADVISOR_SECURITY_OPTIONS),
  economy: z.enum(ADVISOR_ECONOMY_OPTIONS),
  harediGov: z.enum(ADVISOR_GOV_INTEGRATION_OPTIONS),
  arabGov: z.enum(ADVISOR_GOV_INTEGRATION_OPTIONS),
});

const matchingSchema = z.object({
  axisSnapshot: axisSnapshotSchema,
  rankedCandidates: z
    .array(
      z.object({
        candidateName: z.string().min(1),
        reasoning: z.string().min(1),
      }),
    )
    .min(3)
    .max(5),
  profileSummary: z.string().min(1),
});

const AXIS_LABELS = {
  security: "גישה ביטחונית",
  economy: "גישה כלכלית",
  harediGov: "שילוב חרדים בממשלה",
  arabGov: "שילוב ערבים בממשלה",
} as const;

function normalizeName(s: string): string {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

function matchLeaderByLlmName(
  llmName: string,
  leaders: { name: string }[],
): { name: string } | null {
  const n = normalizeName(llmName);
  if (!n) return null;
  const exact = leaders.find((l) => normalizeName(l.name) === n);
  if (exact) return exact;
  const partial = leaders.find(
    (l) =>
      normalizeName(l.name).includes(n) || n.includes(normalizeName(l.name)),
  );
  return partial ?? null;
}

function ruleScoreForLeader(
  axis: AdvisorAxisSnapshot,
  securityVal: string | null,
  economyVal: string | null,
  harediVal: string | null,
  arabVal: string | null,
): { score: number; matchedAxes: string[] } {
  const matchedAxes: string[] = [];
  let score = 0;
  if (securityVal && axis.security === securityVal) {
    score++;
    matchedAxes.push(AXIS_LABELS.security);
  }
  if (economyVal && axis.economy === economyVal) {
    score++;
    matchedAxes.push(AXIS_LABELS.economy);
  }
  if (harediVal && axis.harediGov === harediVal) {
    score++;
    matchedAxes.push(AXIS_LABELS.harediGov);
  }
  if (arabVal && axis.arabGov === arabVal) {
    score++;
    matchedAxes.push(AXIS_LABELS.arabGov);
  }
  return { score, matchedAxes };
}

const LLM_WEIGHT = 0.7;
const RULE_WEIGHT = 0.3;

function blendedPercent(
  llmRankIndex: number,
  listLen: number,
  ruleScore: number,
) {
  const llmFraction = listLen <= 1 ? 1 : (listLen - llmRankIndex) / listLen;
  return Math.round(
    100 * (LLM_WEIGHT * llmFraction + RULE_WEIGHT * (ruleScore / 4)),
  );
}

const FALLBACK_POLITICAL_BATCH: AdvisorAiQuestion[] = [
  {
    question: "איזה נושא ביטחוני־מדיני דחוף עבורכם ביותר?",
    options: [
      "התמודדות עם איראן",
      "עזה והרצועה",
      "הגנה על גבולות",
      "ביטחון פנים",
    ],
  },
  {
    question: "מה עמדתכם לגבי סוגיית המשפט והרפורמה?",
    options: [
      "רפורמה מהירה",
      "רפורמה מתונה",
      "שימור מעמד בתי המשפט",
      "לא בטוח/ת",
    ],
  },
  {
    question: "מה חשוב לכם בכלכלה?",
    options: [
      "הורדת יוקר המחיה",
      "צמיחה ושוק חופשי",
      "רווחה ומענקים",
      "שוויון והגדלת מסים לעשירים",
    ],
  },
  {
    question: "איך אתם רואים את תפקיד המדינה בחברה?",
    options: ["מינימלי", "מאוזן", "מעורב מאוד", "תלוי נושא"],
  },
  {
    question: "מהי עדיפותכם בקשר לסוגיות חברתיות?",
    options: ["חינוך", "בריאות", "דיור", "תחבורה"],
  },
];

export async function generateAdvisorPoliticalBatch(
  profileBase: AdvisorProfileBase,
  priorRounds: AdvisorPoliticalQA[],
  batchIndex: number,
): Promise<AdvisorAiQuestion[]> {
  try {
    const system = await buildAdvisorElectionContext();
    const priorJson = JSON.stringify(
      priorRounds.map((r) => ({
        שאלה: r.question,
        תשובה: r.answer,
      })),
    );
    console.log("system", system);
    console.log("priorJson", priorJson);
    console.log("profileBase", profileBase);
    console.log("batchIndex", batchIndex);
    const { object } = await generateObject({
      model: advisorModel,
      schema: batchSchema,
      system,
      providerOptions: advisorProviderOptions,
      prompt: `פרופיל משתמש (JSON): ${JSON.stringify(profileBase)}
סבב שאלות מדיניות: ${batchIndex + 1} מתוך עד 3.

שאלות קודמות ותשובות (אם ריק — אין): ${priorJson}

החזר בדיוק 5 שאלות קצרות בעברית על פוליטיקה, ערכים ועמדות — מותאמות לפרופיל ולתשובות הקודמות. אל תחזור על ניסוחים זהים לשאלות שכבר נשאלו.
לכל שאלה בדיוק 3 או 4 אופציות קצרות לבחירה (מחרוזות בלבד).`,
    });
    console.log("object", object);
    return object.questions;
  } catch {
    return FALLBACK_POLITICAL_BATCH;
  }
}

export async function computeAdvisorMatching(
  finalProfile: AdvisorFinalProfile,
): Promise<AdvisorMatchingResult> {
  const leaders = await prisma.candidate.findMany({
    where: { partyLeaderOf: { some: {} } },
    include: {
      party: {
        include: { baseTopics: true },
      },
    },
    orderBy: { name: "asc" },
  });

  const leaderRows = leaders.map((leader) => {
    const party = leader.party;
    const securityVal =
      party.baseTopics.find(
        (t) => t.baseTopicTitle === FILTER_BASE_TOPIC_TITLES.security,
      )?.baseTopicOptionDisplayValue ?? null;
    const economyVal =
      party.baseTopics.find(
        (t) => t.baseTopicTitle === FILTER_BASE_TOPIC_TITLES.economy,
      )?.baseTopicOptionDisplayValue ?? null;
    return {
      leader,
      party,
      securityVal,
      economyVal,
      harediVal: leader.harediGov,
      arabVal: leader.arabGov,
    };
  });

  const qaLines = finalProfile.rounds.map(
    (r) => `שאלה: ${r.question}\nתשובה שנבחרה: ${r.answer}`,
  );

  const leaderNamesList = leaders.map((l) => l.name).join(", ");

  let axisSnapshot: AdvisorAxisSnapshot;
  let rankedFromLlm: { candidateName: string; reasoning: string }[];
  let profileSummary: string;

  try {
    const system = await buildAdvisorElectionContext();
    const { object } = await generateObject({
      model: advisorModel,
      schema: matchingSchema,
      system,
      providerOptions: advisorProviderOptions,
      prompt: `פרופיל דמוגרפי (JSON): ${JSON.stringify({
        ageRange: finalProfile.ageRange,
        religiosity: finalProfile.religiosity,
        region: finalProfile.region,
        lifeStage: finalProfile.lifeStage,
      })}

תשובות המשתמש לשאלות המדיניות:
${qaLines.join("\n\n")}

שמות ראשי המפלגות בבסיס הנתונים (בחר רק מתוך הרשימה הזו, בדיוק כפי שמופיע):
${leaderNamesList}

1) הסק מכל התשובות צירים עקביים לארבעת הערכים הבאים — השתמש רק באחת מהאופציות המותרות לכל ציר:
   - security: ${ADVISOR_SECURITY_OPTIONS.join(" | ")}
   - economy: ${ADVISOR_ECONOMY_OPTIONS.join(" | ")}
   - harediGov: ${ADVISOR_GOV_INTEGRATION_OPTIONS.join(" | ")}
   - arabGov: ${ADVISOR_GOV_INTEGRATION_OPTIONS.join(" | ")}

2) דרג בין 3 ל-5 מועמדים מהרשימה לפי התאמה לפרופיל ולתשובות (הראשון הכי מתאים).

3) כתוב profileSummary: 2–3 משפטים בעברית — סיכום ענייני של הפרופיל והעדפות המשתמש (ללא המלצות הצבעה).

4) לכל מועמד בדירוג: reasoning — משפט או שניים בעברית למה הוא מתאים (ענייני, מבוסס על הנתונים).`,
    });
    axisSnapshot = object.axisSnapshot;
    rankedFromLlm = object.rankedCandidates;
    profileSummary = object.profileSummary;
  } catch {
    axisSnapshot = {
      security: "מרכז ימין",
      economy: "מרכז",
      harediGov: "חלקי",
      arabGov: "חלקי",
    };
    rankedFromLlm = leaders.slice(0, 5).map((l) => ({
      candidateName: l.name,
      reasoning: "התאמה כללית לפי נתוני המפלגה במערכת.",
    }));
    profileSummary =
      "סיכום זמני: לפי התשובות שלכם ניסינו להתאים מועמדים מובילים; מומלץ לעבור על העמדות בפירוט בדפי המפלגות.";
  }

  const listLen = rankedFromLlm.length;
  const scored: (AdvisorCandidateMatch & {
    mandatesSort: number;
    llmIndex: number;
  })[] = [];

  for (let i = 0; i < rankedFromLlm.length; i++) {
    const row = rankedFromLlm[i];
    const matched = matchLeaderByLlmName(row.candidateName, leaders);
    if (!matched) continue;
    const lr = leaderRows.find((x) => x.leader.name === matched.name);
    if (!lr) continue;
    const { score, matchedAxes } = ruleScoreForLeader(
      axisSnapshot,
      lr.securityVal,
      lr.economyVal,
      lr.harediVal,
      lr.arabVal,
    );
    const L = lr.leader;
    const P = lr.party;
    scored.push({
      candidateId: L.id,
      candidateName: L.name,
      candidateImage: L.image,
      partyId: P.id,
      partyName: P.name,
      partyImage: P.imageUrl,
      partyMandates: P.mandates,
      matchPercent: blendedPercent(i, listLen, score),
      ruleScore: score,
      matchedAxes,
      reasoning: row.reasoning,
      mandatesSort: P.mandates ?? -1,
      llmIndex: i,
    });
  }

  scored.sort((a, b) => {
    if (b.matchPercent !== a.matchPercent)
      return b.matchPercent - a.matchPercent;
    if (b.ruleScore !== a.ruleScore) return b.ruleScore - a.ruleScore;
    if (a.llmIndex !== b.llmIndex) return a.llmIndex - b.llmIndex;
    return b.mandatesSort - a.mandatesSort;
  });

  const seen = new Set<string>();
  const top: AdvisorCandidateMatch[] = [];
  for (const s of scored) {
    if (seen.has(s.candidateId)) continue;
    seen.add(s.candidateId);
    const { mandatesSort: _m, llmIndex: _i, ...rest } = s;
    top.push(rest);
    if (top.length >= 3) break;
  }

  if (top.length < 3) {
    const fillers = leaderRows
      .map((lr) => {
        const { score, matchedAxes } = ruleScoreForLeader(
          axisSnapshot,
          lr.securityVal,
          lr.economyVal,
          lr.harediVal,
          lr.arabVal,
        );
        const L = lr.leader;
        const P = lr.party;
        return {
          candidateId: L.id,
          candidateName: L.name,
          candidateImage: L.image,
          partyId: P.id,
          partyName: P.name,
          partyImage: P.imageUrl,
          partyMandates: P.mandates,
          matchPercent: Math.round(100 * RULE_WEIGHT * (score / 4)),
          ruleScore: score,
          matchedAxes,
          reasoning: "התאמה לפי צירים בנתוני המפלגה במערכת.",
          mandatesSort: P.mandates ?? -1,
        };
      })
      .sort((a, b) => {
        if (b.matchPercent !== a.matchPercent)
          return b.matchPercent - a.matchPercent;
        if (b.ruleScore !== a.ruleScore) return b.ruleScore - a.ruleScore;
        return b.mandatesSort - a.mandatesSort;
      });

    for (const f of fillers) {
      if (seen.has(f.candidateId)) continue;
      seen.add(f.candidateId);
      const { mandatesSort: _ms, ...rest } = f;
      top.push(rest);
      if (top.length >= 3) break;
    }
  }

  return {
    matches: top.slice(0, 3),
    profileSummary,
  };
}
