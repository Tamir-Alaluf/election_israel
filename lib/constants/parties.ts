import {
  BLOC_BASE_TOPIC_TITLE,
  BLOC_DB_VALUES_ORDERED,
} from "@/lib/constants/blocs";
import { comparisonBadgeClassName } from "@/lib/constants/style";
import { cn } from "@/lib/utils/utils";

export const partyComparisonParameterLabels: string[] = [
  "סוג מפלגה",
  "חזון",
  "עמדה ביטחונית",
  "עמדה כלכלית",
  "שילוב חרדים",
  "שילוב ערבים",
  "מה עשו מאז הבחירות הקודמות",
  "הבטחות לשנים הקרובות",
  "חברי מפלגה",
  "גוש",
  "עמדות בחוקים ספציפים",
];

/**
 * Base topic titles in the DB that power the three primary comparison filters.
 * They must match `BaseTopic.title` values in Postgres.
 */
export const BASE_TOPIC = {
  type: "סוג מפלגה",
  security: "גישה ביטחונית",
  economy: "גישה כלכלית",
  arabs: "שילוב ערבים בממשלה",
  jews: "שילוב חרדים בממשלה",
  bloc: BLOC_BASE_TOPIC_TITLE,
} as const;

export const BASE_TOPICS_OPTIONS_BY_TITLE = {
  [BASE_TOPIC.type]: ["חילונית", "חרדית", "ערבית"],
  [BASE_TOPIC.security]: ["ימין", "מרכז ימין", "מרכז שמאל", "שמאל"],
  [BASE_TOPIC.economy]: ["ימין כלכלי", "מרכז", "שמאל כלכלי"],
  [BASE_TOPIC.arabs]: ["כן", "לא", "חלקי"],
  [BASE_TOPIC.jews]: ["כן", "לא", "חלקי"],
  [BASE_TOPIC.bloc]: BLOC_DB_VALUES_ORDERED,
} as const;

/** Order for the "מאפייני מפלגה" table (extended attributes follow). */
export const ATTRIBUTE_BASE_TOPIC_ORDER: string[] = [
  BASE_TOPIC.type,
  BASE_TOPIC.security,
  BASE_TOPIC.economy,
  BASE_TOPIC.jews,
  BASE_TOPIC.arabs,
  BASE_TOPIC.bloc,
];

export const ACTION_GROUP_NAMES = {
  security: "ביטחון ומדיניות",
  economy: "חברה וכלכלה",
  judiciary: "משפט וממשל",
  religion: "דת ומדינה",
} as const;

export const PARTY_LAW_ISSUE_GROUPS = [
  ACTION_GROUP_NAMES.judiciary,
  ACTION_GROUP_NAMES.security,
  ACTION_GROUP_NAMES.economy,
  ACTION_GROUP_NAMES.religion,
] as const;

export const PARTY_LEGISLATION = [
  "חוק סבסוד השכלה גבוהה / תואר ראשון חינם",
  "חוק החמץ בבתי חולים",
  'העלאת שכר המינימום ל-7,000 ש"ח',
  "חוק חינוך חינם מגיל 0-3",
  "תחבורה ציבורית בשבת",
  "חוק העמותות",
  "פסקת ההתגברות",
  'חוק פיצול תפקיד היועמ"ש',
  "חוק עונש מוות למחבלים",
  'החלת ריבונות ביו"ש (סיפוח)',
  "ביטול עילת הסבירות",
  "חוק הגיוס",
  "חוק גירוש משפחות מחבלים",
  "חוק פיקוח על שכר הדירה",
  "חוק נישואין אזרחיים / ברית הזוגיות",
  "חוק השידורים",
];
export const PARTY_LEGISLATION_OPTIONS = ["בעד", "נגד"] as const;

const partyRecentActionCategoryBadgeClass: Record<string, string> = {
  [ACTION_GROUP_NAMES.security]:
    "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
  [ACTION_GROUP_NAMES.economy]:
    "border-emerald-500/35 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
  [ACTION_GROUP_NAMES.judiciary]:
    "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
  [ACTION_GROUP_NAMES.religion]:
    "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100",
};

export function classForPartyRecentActionCategory(
  category: string | undefined,
): string | undefined {
  if (!category) return undefined;
  const className = partyRecentActionCategoryBadgeClass[category];
  if (!className) {
    return cn(
      comparisonBadgeClassName,
      "border-border/50 bg-muted/30 text-foreground",
    );
  }
  return className;
}
