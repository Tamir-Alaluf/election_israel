import { cn } from "@/lib/utils/utils";
import { comparisonBadgeClassName } from "@/lib/constants/style";

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
export const FILTER_BASE_TOPIC_TITLES = {
  type: "סוג מפלגה",
  security: "גישה ביטחונית",
  economy: "גישה כלכלית",
} as const;

/** Order for the "מאפייני מפלגה" table (extended attributes follow). */
export const ATTRIBUTE_BASE_TOPIC_ORDER: string[] = [
  FILTER_BASE_TOPIC_TITLES.type,
  FILTER_BASE_TOPIC_TITLES.security,
  FILTER_BASE_TOPIC_TITLES.economy,
  "שילוב חרדים בממשלה",
  "שילוב ערבים בממשלה",
];

const partyRecentActionCategoryBadgeClass: Record<string, string> = {
  "ביטחון ומדיניות":
    "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
  "חברה וכלכלה":
    "border-emerald-500/35 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
  "משפט וממשל":
    "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
  "דת ומדינה":
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
