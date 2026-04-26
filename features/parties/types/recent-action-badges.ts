import { cn } from "@/lib/utils";
import { comparisonBadgeClassName } from "@/features/parties/types/value-badge";

export const PROFESSIONAL_BACKGROUND_GROUPS = [
  "כלכלי",
  "מגזר הפרטי",
  "ביטחוני",
  "בינלאומי",
  "פנים מדיני",
] as const;

const knownRecentActionCategoryBadgeClass: Record<string, string> = {
  "ביטחון ומדיניות":
    "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
  "חברה וכלכלה":
    "border-emerald-500/35 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
  "משפט וממשל":
    "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
  "דת ומדינה":
    "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100",
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

export function classForRecentActionCategory(
  category: string | undefined,
): string | undefined {
  if (!category) return undefined;
  const c = knownRecentActionCategoryBadgeClass[category];
  if (!c) {
    return cn(
      comparisonBadgeClassName,
      "border-border/50 bg-muted/30 text-foreground",
    );
  }
  return c;
}
