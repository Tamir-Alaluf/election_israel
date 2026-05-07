import type { GlossaryTermItem } from "@/lib/types/items";

export function normalize(s: string): string {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

export function sortGlossaryTermsForDisplay(
  list: GlossaryTermItem[],
  categoryOrder: string[],
): GlossaryTermItem[] {
  const order = new Map(categoryOrder.map((id, i) => [id, i]));
  return [...list].sort((a, b) => {
    const ca = order.get(a.categoryId) ?? 999;
    const cb = order.get(b.categoryId) ?? 999;
    if (ca !== cb) return ca - cb;
    return a.term.localeCompare(b.term, "he");
  });
}
