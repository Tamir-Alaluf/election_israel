import type { AdvisorFinalProfile } from "@/lib/types/advisor";

/** Summary injected as the first user message when starting chat from matching results. */
export function formatAdvisorProfileForChat(
  profile: AdvisorFinalProfile,
  options?: { profileSummary?: string; partyFocus?: string },
): string {
  const lines = [
    "סיכום מהשאלון:",
    `- גיל: ${profile.ageRange}`,
    `- זהות דתית־חברתית: ${profile.religiosity}`,
    `- אזור מגורים: ${profile.region}`,
    `- שלב בחיים: ${profile.lifeStage}`,
    "",
    "תשובות לשאלות המדיניות:",
    ...profile.rounds.map(
      (r, i) => `${i + 1}. ${r.question}\n   נבחר: ${r.answer}`,
    ),
  ];
  if (options?.profileSummary) {
    lines.push("", "סיכום קצר:", options.profileSummary);
  }
  if (options?.partyFocus) {
    lines.push(
      "",
      `אשמח להמשיך לדבר על ההתאמה שלי למפלגת ${options.partyFocus} ולמועמד/ת המוביל/ה.`,
    );
  }
  return lines.join("\n");
}
