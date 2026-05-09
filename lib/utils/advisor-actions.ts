"use server";

import { generateObject } from "ai";
import {
  ADVISOR_ECONOMY_OPTIONS,
  ADVISOR_PROFILE_QUESTIONS,
  ADVISOR_SECURITY_OPTIONS,
  advisorModel,
  advisorProviderOptions,
  AXIS_LABELS,
  LLM_WEIGHT,
  RULE_WEIGHT,
  matchingSchema,
  batchSchema,
} from "@/lib/constants/advisor";
import { prisma } from "@/lib/utils/prisma";
import {
  buildAdvisorElectionContext,
  buildAdvisorFollowUpSystemContext,
} from "@/lib/utils/advisor-context";
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
import { FALLBACK_POLITICAL_BATCH } from "@/lib/constants/advisor";

function formatAdvisorProfileForPrompt(profile: AdvisorProfileBase): string {
  return ADVISOR_PROFILE_QUESTIONS.map(
    (q) => `${q.prompt} ${profile[q.key]}`,
  ).join("\n");
}

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

const RULE_AXIS_MAX = 2;

function ruleScoreForLeader(
  axis: AdvisorAxisSnapshot,
  securityVal: string | null,
  economyVal: string | null,
): { score: number; matchedAxes: string[] } {
  const matchedAxes: string[] = [];
  let score = 0;
  if (securityVal && axis.security === securityVal) {
    score += 1;
    matchedAxes.push(AXIS_LABELS.security);
  }
  if (economyVal && axis.economy === economyVal) {
    score += 1;
    matchedAxes.push(AXIS_LABELS.economy);
  }
  return { score, matchedAxes };
}

export async function generateAdvisorPoliticalBatch(
  profileBase: AdvisorProfileBase,
  priorRounds: AdvisorPoliticalQA[],
  batchIndex: number,
): Promise<AdvisorAiQuestion[]> {
  try {
    const isFollowUpRound = batchIndex >= 1;
    const system = isFollowUpRound
      ? buildAdvisorFollowUpSystemContext()
      : await buildAdvisorElectionContext();
    const profileText = formatAdvisorProfileForPrompt(profileBase);
    const priorJson = JSON.stringify(
      priorRounds.map((r) => ({
        שאלה: r.question,
        תשובה: r.answer,
      })),
    );

    const baseTail = `סבב שאלות מדיניות: ${batchIndex + 1} מתוך עד 3.

שאלות קודמות ותשובות (אם הרשימה ריקה — אין): ${priorJson}

החזר בדיוק 5 שאלות קצרות בעברית על פוליטיקה, ערכים ועמדות.
לכל שאלה בדיוק 3 או 4 אופציות קצרות לבחירה (מחרוזות בלבד).
אל תחזור על ניסוחים זהים לשאלות שכבר נשאלו.`;

    const prompt = isFollowUpRound
      ? `פרופיל משתמש:
${profileText}

${baseTail}

הנחיות לסבב המשך (חובה):
- רוב משקל הניסוח של כל 5 השאלות מגיע מארבעת שדות הפרופיל למעלה ומכל התשובות שכבר נתן המשתמש ברשימת השאלות הקודמות.
- יש לחבר בין הקשר חיים (גיל, זהות דתית־חברתית, אזור מגורים, שלב חיים) לבין הדפוס שעולה מהתשובות הקודמות — למשל דיור, חינוך, ביטחון אישי או זהות חברתית רק כשזה מתאים לפרופיל ולמה שכבר נענה.
- יש להעמיק או להבהיר פערים: נושאים שלא נכסו, ניגודים אפשריים בין תחומים, או הבחנות עדינות — לא לשכפל אותו נושא או ניסוח בלי קשר חדש לפרופיל או לשרשרת התשובות.
- אל תציג שאלות גנריות שאינן נסמכות במפורש על שילוב של פרופיל ותשובות קודמות.`
      : `פרופיל משתמש:
${profileText}

השתמש בפרופיל ובמידע על המפלגות והמועמדים שבמערכת כדי לנסח שאלות מותאמות אישית.

${baseTail}`;

    const { object } = await generateObject({
      model: advisorModel,
      schema: batchSchema,
      system,
      providerOptions: advisorProviderOptions,
      prompt,
    });
    return object.questions;
  } catch {
    return FALLBACK_POLITICAL_BATCH;
  }
}

function blendedPercent(
  llmRankIndex: number,
  listLen: number,
  ruleScore: number,
) {
  const llmFraction = listLen <= 1 ? 1 : (listLen - llmRankIndex) / listLen;
  return Math.round(
    100 *
      (LLM_WEIGHT * llmFraction + RULE_WEIGHT * (ruleScore / RULE_AXIS_MAX)),
  );
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

1) הסק מכל התשובות צירים עקביים לשני הערכים הבאים — השתמש רק באחת מהאופציות המותרות לכל ציר:
   - security: ${ADVISOR_SECURITY_OPTIONS.join(" | ")}
   - economy: ${ADVISOR_ECONOMY_OPTIONS.join(" | ")}

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
          matchPercent: Math.round(100 * RULE_WEIGHT * (score / RULE_AXIS_MAX)),
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
