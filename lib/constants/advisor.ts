import {
  google,
  type GoogleLanguageModelOptions,
} from "@ai-sdk/google";

import type { AdvisorProfileBase } from "@/lib/types/advisor";

export type AdvisorProfileQuestionKey = keyof AdvisorProfileBase;

export type AdvisorProfileQuestion = {
  key: AdvisorProfileQuestionKey;
  prompt: string;
  options: string[];
};

/**
 * Option lists aligned with comparison UIs / DB display values:
 * - Security / economy: same values as leader comparison filters
 * - Haredi / Arab: כן / חלקי / לא
 */
export const ADVISOR_SECURITY_OPTIONS = [
  "ימין",
  "מרכז ימין",
  "מרכז שמאל",
  "שמאל",
] as const;

export const ADVISOR_ECONOMY_OPTIONS = [
  "ימין כלכלי",
  "שמאל כלכלי",
  "מרכז",
] as const;

export const ADVISOR_GOV_INTEGRATION_OPTIONS = ["כן", "חלקי", "לא"] as const;

/**
 * Four fixed non-political profile questions (demographics / life context only).
 */
export const ADVISOR_PROFILE_QUESTIONS: AdvisorProfileQuestion[] = [
  {
    key: "ageRange",
    prompt: "לאיזו קבוצת גיל אתם שייכים?",
    options: ["18–24", "25–34", "35–49", "50–64", "65+"],
  },
  {
    key: "religiosity",
    prompt: "איך הייתם מגדירים את עצמכם מבחינה דתית־חברתית?",
    options: ["חילוני/ת", "מסורתי/ת", "דתי/ה", "חרדי/ת"],
  },
  {
    key: "region",
    prompt: "איפה אתם גרים? (אזור מגורים)",
    options: [
      "תל אביב והמרכז",
      "ירושלים והסביבה",
      "צפון",
      "דרום",
      "יהודה ושומרון",
    ],
  },
  {
    key: "lifeStage",
    prompt: "איזה שלב בחיים מתאר אתכם הכי טוב כרגע?",
    options: ["סטודנט/ית", "משפחה צעירה", "הורה/ה עם ילדים בבית", "גמלאי/ת"],
  },
];

export const advisorModel = google("gemini-2.5-flash");

/** Hebrew political content can trip Gemini defaults; loosen to BLOCK_ONLY_HIGH. */
export const advisorProviderOptions = {
  google: {
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH",
      },
    ],
  } satisfies GoogleLanguageModelOptions,
};

export const ADVISOR_MAX_ROUNDS = 3;
