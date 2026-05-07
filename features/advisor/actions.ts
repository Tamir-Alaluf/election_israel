"use server";

import { generateObject } from "ai";
import { z } from "zod";
import {
  advisorModel,
  advisorProviderOptions,
} from "@/lib/ai/advisor-model";
import { prisma } from "@/lib/prisma";
import { buildAdvisorElectionContext } from "@/lib/data/advisor-context";
import { FILTER_BASE_TOPIC_TITLES } from "@/lib/data/party-filter-keys";
import type {
  AdvisorAiQuestion,
  AdvisorAxisAnswers,
  AdvisorPartyMatch,
  AdvisorProfile,
} from "@/features/advisor/types";

const aiQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(5),
});

const AXIS_LABELS = {
  security: "גישה ביטחונית",
  economy: "גישה כלכלית",
  harediGov: "שילוב חרדים בממשלה",
  arabGov: "שילוב ערבים בממשלה",
} as const;

export async function generateAdvisorNextQuestion(
  partialProfile: AdvisorAxisAnswers,
): Promise<AdvisorAiQuestion> {
  try {
    const system = await buildAdvisorElectionContext();
    const { object } = await generateObject({
      model: advisorModel,
      schema: aiQuestionSchema,
      system,
      providerOptions: advisorProviderOptions,
      prompt: `המשתמש ענה על שאלון התאמה (JSON): ${JSON.stringify(partialProfile)}

שאל שאלה אחת קצרה בעברית כדי לחדד התאמה למפלגות. החזר בדיוק 3 או 4 אופציות קצרות לבחירה (מחרוזות בלבד, ללא הסברים נוספים).`,
    });
    return object;
  } catch {
    return {
      question: "איזה נושא הכי דחוף עבורכם בקדנציה הבאה?",
      options: [
        "ביטחון וסדר ציבורי",
        "כלכלה ויוקר המחיה",
        "משפט וממשל",
        "חברה וזכויות",
      ],
    };
  }
}

export async function computeAdvisorPartyMatches(
  profile: AdvisorProfile,
): Promise<AdvisorPartyMatch[]> {
  const parties = await prisma.party.findMany({
    include: {
      baseTopics: true,
      leader: true,
    },
    orderBy: { name: "asc" },
  });

  type Scored = AdvisorPartyMatch & { mandatesSort: number };

  const scored: Scored[] = parties.map((party) => {
    const securityVal =
      party.baseTopics.find(
        (t) => t.baseTopicTitle === FILTER_BASE_TOPIC_TITLES.security,
      )?.baseTopicOptionDisplayValue ?? null;
    const economyVal =
      party.baseTopics.find(
        (t) => t.baseTopicTitle === FILTER_BASE_TOPIC_TITLES.economy,
      )?.baseTopicOptionDisplayValue ?? null;

    const harediVal = party.leader?.harediGov ?? null;
    const arabVal = party.leader?.arabGov ?? null;

    const matchedAxes: string[] = [];
    let score = 0;

    if (securityVal && profile.security === securityVal) {
      score++;
      matchedAxes.push(AXIS_LABELS.security);
    }
    if (economyVal && profile.economy === economyVal) {
      score++;
      matchedAxes.push(AXIS_LABELS.economy);
    }
    if (harediVal && profile.harediGov === harediVal) {
      score++;
      matchedAxes.push(AXIS_LABELS.harediGov);
    }
    if (arabVal && profile.arabGov === arabVal) {
      score++;
      matchedAxes.push(AXIS_LABELS.arabGov);
    }

    const mandatesSort = party.mandates ?? -1;

    return {
      id: party.id,
      name: party.name,
      leader: party.leader?.name ?? party.candidateName ?? "",
      image: party.imageUrl,
      score,
      matchPercent: Math.round((score / 4) * 100),
      matchedAxes,
      mandatesSort,
    };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.mandatesSort - a.mandatesSort;
  });

  return scored.slice(0, 3).map(({ mandatesSort: _m, ...rest }) => rest);
}
