"use client";

import { cn } from "@/lib/utils";

/** ארבעה צבעים קבועים לכל התגיות: חיובי, שלילי, ביניים, ציר/קטגוריה */
const badgeTone = {
  positive: "bg-emerald-100 text-emerald-800",
  negative: "bg-rose-100 text-rose-800",
  partial: "bg-amber-100 text-amber-800",
  categorical: "bg-blue-100 text-blue-800",
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

  // ביניים / חלקי / מקומי / דקרימינליזציה / עדיפות נמוכה / איזון / מעורב
  חלקי: "partial",
  מקומי: "partial",
  דקרימינליזציה: "partial",
  "עדיפות נמוכה": "partial",
  איזון: "partial",
  מעורב: "partial",

  // צירים וקטגוריות זהות (לא "טוב/רע")
  ימין: "categorical",
  מרכז: "categorical",
  שמאל: "categorical",
  קפיטליסט: "categorical",
  סוציאליסט: "categorical",
  משילות: "categorical",
  דמוקרטיה: "categorical",
  חרדים: "categorical",
  ערבים: "categorical",
  חילוניים: "categorical",
};

export function ValueBadge({ value }: { value: string }) {
  const tone = valueToTone[value] ?? "categorical";

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
