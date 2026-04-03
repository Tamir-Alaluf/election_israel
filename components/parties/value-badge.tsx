"use client";

import { cn } from "@/lib/utils";

/** שלושה צבעים קבועים לכל התגיות: חיובי (ירוק), שלילי (אדום), ניטרלי/קטגוריה (צהוב) */
const badgeTone = {
  positive: "bg-emerald-100 text-emerald-800",
  negative: "bg-rose-100 text-rose-800",
  neutral: "bg-amber-100 text-amber-800",
} as const;

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

  // צירים אידיאולוגיים לפי כלל צבעים: ימין=אדום, שמאל=ירוק, מרכז=צהוב
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

export function ValueBadge({ value }: { value: string }) {
  const tone = valueToTone[value] ?? "neutral";

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-xs font-medium rounded-full",
        badgeTone[tone],
      )}
    >
      {value}
    </span>
  );
}
