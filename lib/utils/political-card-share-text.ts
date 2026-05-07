/** נתיב העמוד לשיתוף — עקבי עם app router */
export const POLITICAL_CARD_PATH = "/political-card";

const INTRO_LINE = "בבחירות האלה, הקול שלי הולך ל...";

export function buildPoliticalCardShareTitle(): string {
  return "הכרטיס הפוליטי שלי | בחירות 2026";
}

/** טקסט מלא לווטסאפ / שיתוף מערכת */
export function buildPoliticalCardShareBody(pageUrl: string, prioritiesJoined: string): string {
  return `${INTRO_LINE}\n\n${prioritiesJoined}\n\n${pageUrl}`;
}

export function buildPoliticalCardPageUrl(origin: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}${POLITICAL_CARD_PATH}`;
}
