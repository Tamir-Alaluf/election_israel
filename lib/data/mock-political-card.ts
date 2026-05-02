import type { LucideIcon } from "lucide-react";
import { Bus, GraduationCap, Store } from "lucide-react";

export type PoliticalPriority = {
  id: string;
  label: string;
  icon: LucideIcon;
};

/** מוקאפ לעמוד הכרטיס הפוליטי — ללא משתמש מחובר */
export const mockPoliticalCardPriorities: PoliticalPriority[] = [
  { id: "education", label: "חינוך שוויוני", icon: GraduationCap },
  { id: "small-business", label: "קידום עסקים קטנים", icon: Store },
  { id: "transport", label: "תחבורה ציבורית יעילה", icon: Bus },
];
