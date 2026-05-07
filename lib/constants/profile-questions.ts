import type { AdvisorProfileBase } from "@/lib/types/advisor";

export type AdvisorProfileQuestionKey = keyof AdvisorProfileBase;

export type AdvisorProfileQuestion = {
  key: AdvisorProfileQuestionKey;
  prompt: string;
  options: string[];
};

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
