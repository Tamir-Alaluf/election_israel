import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/utils";

export const MANDATES_CHART_PALETTE = [
  "#0066cc",
  "#00a0dc",
  "#1e3a5f",
  "#006400",
  "#e30613",
  "#000080",
  "#64748b",
] as const;

/**
 * צבעי תג ערך: לשעבר אדום → כחול, לשעבר ירוק → סגול, צהוב נשאר צהוב.
 * סגנון תואם לתגיות קטגוריה בדיאלוג המפלגה (מסגרת + רקע שקוף חלקית).
 */
export const valueBadgeToneClasses = {
  positive:
    "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
  negative: "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
  neutral:
    "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100",
} as const;

export const professionalBackgroundBadgeToneClasses: Record<string, string> = {
  כלכלי:
    "border-emerald-500/35 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
  "מגזר הפרטי":
    "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100",
  ביטחוני: "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
  בינלאומי:
    "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
  "פנים מדיני":
    "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-950 dark:text-fuchsia-100",
};

const badgeTone = valueBadgeToneClasses;

const valueToTone: Record<string, keyof typeof badgeTone> = {
  // חיובי / תמיכה / עדיפות גבוהה
  בעד: "positive",
  כן: "neutral",
  "עדיפות גבוהה": "positive",

  // שלילי / התנגדות / מחוץ לסדר יום
  נגד: "negative",
  לא: "neutral",
  "לא בסדר יום": "negative",

  // ביניים / קטגורי
  חלקי: "neutral",
  מקומי: "neutral",
  דקרימינליזציה: "neutral",
  "עדיפות נמוכה": "neutral",
  איזון: "neutral",
  מעורב: "neutral",

  // צירים אידיאולוגיים לפי כלל צבעים: ימין=כחול, שמאל=סגול, מרכז=צהוב
  ימין: "neutral",
  "מרכז ימין": "neutral",
  מרכז: "neutral",
  "מרכז שמאל": "neutral",
  שמאל: "neutral",
  "ימין כלכלי": "neutral",
  "שמאל כלכלי": "neutral",
  משילות: "neutral",
  דמוקרטיה: "neutral",
  חרדית: "neutral",
  ערבית: "neutral",
  חילונית: "neutral",
};

/** מחלקות בסיס משותפות לתגיות השוואה (מפלגה / עמדות) */
export const comparisonBadgeClassName =
  "text-xs font-semibold leading-tight px-2 py-0.5 h-auto min-h-0 max-w-[min(100%,14rem)] whitespace-normal text-center";

export function classForProfessionalBackgroundGroup(
  groupName: string | undefined,
): string | undefined {
  if (!groupName) return undefined;
  const className = professionalBackgroundBadgeToneClasses[groupName];
  if (!className) {
    return cn(
      comparisonBadgeClassName,
      "border-border/50 bg-muted/30 text-foreground",
    );
  }
  return className;
}

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
