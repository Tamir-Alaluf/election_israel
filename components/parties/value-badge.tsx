"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * צבעי תג ערך: לשעבר אדום → כחול, לשעבר ירוק → סגול, צהוב נשאר צהוב.
 * סגנון תואם לתגיות קטגוריה בדיאלוג המפלגה (מסגרת + רקע שקוף חלקית).
 */
export const valueBadgeToneClasses = {
  positive:
    "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
  negative:
    "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
  neutral:
    "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100",
} as const;

const badgeTone = valueBadgeToneClasses;

const valueToTone: Record<string, keyof typeof badgeTone> = {
  // חיובי / תמיכה / עדיפות גבוהה
  בעד: "positive",
  כן: "positive",
  "עדיפות גבוהה": "positive",

  // שלילי / התנגדות / מחוץ לסדר יום
  נגד: "negative",
  לא: "negative",
  "לא בסדר יום": "negative",

  // ביניים / קטגורי
  חלקי: "neutral",
  מקומי: "neutral",
  דקרימינליזציה: "neutral",
  "עדיפות נמוכה": "neutral",
  איזון: "neutral",
  מעורב: "neutral",

  // צירים אידיאולוגיים לפי כלל צבעים: ימין=כחול, שמאל=סגול, מרכז=צהוב
  ימין: "negative",
  "מרכז ימין": "neutral",
  מרכז: "neutral",
  "מרכז שמאל": "neutral",
  שמאל: "positive",
  "ימין כלכלי": "negative",
  "שמאל כלכלי": "positive",
  משילות: "neutral",
  דמוקרטיה: "neutral",
  חרדית: "neutral",
  ערבית: "neutral",
  חילונית: "neutral",
};

/** מחלקות בסיס משותפות לתגיות השוואה (מפלגה / עמדות) */
export const comparisonBadgeClassName =
  "text-xs font-semibold leading-tight px-2 py-0.5 h-auto min-h-0 w-fit max-w-[min(100%,14rem)] whitespace-normal text-center";

export function ValueBadge({ value }: { value: string }) {
  const tone = valueToTone[value] ?? "neutral";

  return (
    <Badge
      variant="outline"
      className={cn(comparisonBadgeClassName, badgeTone[tone])}
    >
      {value}
    </Badge>
  );
}
