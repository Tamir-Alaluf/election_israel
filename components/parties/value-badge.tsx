"use client";

import { cn } from "@/lib/utils";

export function ValueBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    בעד: "bg-emerald-100 text-emerald-700",
    כן: "bg-emerald-100 text-emerald-700",
    "עדיפות גבוהה": "bg-emerald-100 text-emerald-700",
    נגד: "bg-rose-100 text-rose-700",
    לא: "bg-rose-100 text-rose-700",
    "לא בסדר יום": "bg-rose-100 text-rose-700",
    חלקי: "bg-amber-100 text-amber-700",
    מקומי: "bg-amber-100 text-amber-700",
    דקרימינליזציה: "bg-amber-100 text-amber-700",
    "עדיפות נמוכה": "bg-amber-100 text-amber-700",
    איזון: "bg-amber-100 text-amber-700",
    מעורב: "bg-amber-100 text-amber-700",
    ימין: "bg-blue-100 text-blue-700",
    שמאל: "bg-pink-100 text-pink-700",
    מרכז: "bg-purple-100 text-purple-700",
    חרדים: "bg-slate-200 text-slate-700",
    חילוניים: "bg-cyan-100 text-cyan-700",
    ערבים: "bg-teal-100 text-teal-700",
    קפיטליסט: "bg-orange-100 text-orange-700",
    סוציאליסט: "bg-red-100 text-red-700",
    משילות: "bg-indigo-100 text-indigo-700",
    דמוקרטיה: "bg-sky-100 text-sky-700",
  };

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-xs font-medium rounded-full",
        colorMap[value] || "bg-muted text-muted-foreground",
      )}
    >
      {value}
    </span>
  );
}
