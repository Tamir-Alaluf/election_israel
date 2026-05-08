import { google, type GoogleLanguageModelOptions } from "@ai-sdk/google";

import type {
  AdvisorAiQuestion,
  AdvisorProfileBase,
} from "@/lib/types/advisor";
import { z } from "zod";

export type AdvisorProfileQuestionKey = keyof AdvisorProfileBase;

export type AdvisorProfileQuestion = {
  key: AdvisorProfileQuestionKey;
  prompt: string;
  options: string[];
};

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

export const FALLBACK_POLITICAL_BATCH: AdvisorAiQuestion[] = [
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

export const LLM_WEIGHT = 0.7;
export const RULE_WEIGHT = 0.3;

export const batchSchema = z.object({
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

export const matchingSchema = z.object({
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

export const AXIS_LABELS = {
  security: "גישה ביטחונית",
  economy: "גישה כלכלית",
  harediGov: "שילוב חרדים בממשלה",
  arabGov: "שילוב ערבים בממשלה",
} as const;

export const MISSING_PARAM_FALLBACK = "לא צוין";

export const ADVISOR_SYSTEM_CORE_RULES = `
כללים חשובים:
- היה אובייקטיבי ונטול משוא פנים
- הצג עובדות ונתונים
- עזור למשתמש לגבש דעה משלו, אל תכפה עליו בחירה
- דבר בעברית תקנית וידידותית
- התמקד בנושאים פוליטיים ענייניים
- אם אינך יודע משהו, אמור זאת
`.trim();
