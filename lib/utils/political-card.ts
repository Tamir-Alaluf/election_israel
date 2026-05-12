/** נתיב העמוד לשיתוף — עקבי עם app router */
export const POLITICAL_CARD_PATH = "/political-card";

/** שורת כותרת שמוצגת בכרטיס ובטקסט השיתוף */
export const POLITICAL_CARD_INTRO_LINE = "בבחירות האלה, הקול שלי הולך ל...";

const SHARE_LEAD_IN = "הנה המועמד שאני בוחר";

export function buildPoliticalCardShareTitle(): string {
  return "הכרטיס הפוליטי שלי | בחירות 2026";
}

/**
 * טקסט מלא לווטסאפ, שיתוף מערכת והעתקה (אינסטגרם).
 * @param candidateLabel — אופציונלי; אם מועבר, יוצג בשמירת גבולות מרכאות עבריות
 */
export function buildPoliticalCardShareBody(
  pageUrl: string,
  prioritiesJoined: string,
  candidateLabel?: string,
): string {
  const trimmed = candidateLabel?.trim();
  const lead =
    trimmed && trimmed.length > 0
      ? `${SHARE_LEAD_IN} — ״${trimmed}״`
      : `${SHARE_LEAD_IN} —`;

  return `${lead}\n\n${POLITICAL_CARD_INTRO_LINE}\n\n${prioritiesJoined}\n\n${pageUrl}`;
}

export function buildPoliticalCardPageUrl(origin: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}${POLITICAL_CARD_PATH}`;
}
