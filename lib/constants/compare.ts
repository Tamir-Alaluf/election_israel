export const COMPARE_PARAMETER_DEFS = [
  { id: "vision", label: "חזון" },
  { id: "sentiment", label: "תדמית" },
  { id: "professional", label: "תפקידים קודמים" },
  { id: "education", label: "השכלה" },
  { id: "recent", label: "מה עשה בשנים האחרונות" },
  { id: "promises", label: "הבטחות לשנים הקרובות" },
  { id: "career", label: "הישגים בקריירה" },
  { id: "bloc", label: "גוש" },
  { id: "type", label: "סוג מפלגה" },
  { id: "security", label: "עמדה ביטחונית" },
  { id: "economic", label: "עמדה כלכלית" },
  { id: "jews", label: "שילוב חרדים" },
  { id: "arabs", label: "שילוב ערבים" },
  { id: "legislations", label: "סוגיות" },
  { id: "members", label: "חברי מפלגה" },
] as const;

export type CompareParamId = (typeof COMPARE_PARAMETER_DEFS)[number]["id"];

export const COMPARE_APPROACH_PARAM_IDS = [
  "bloc",
  "type",
  "security",
  "economic",
  "jews",
  "arabs",
] as const;

export type CompareApproachParamId =
  (typeof COMPARE_APPROACH_PARAM_IDS)[number];

export function isCompareApproachParamId(
  id: CompareParamId,
): id is CompareApproachParamId {
  return (COMPARE_APPROACH_PARAM_IDS as readonly string[]).includes(id);
}
