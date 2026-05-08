import { prisma } from "@/lib/utils/prisma";
import type {
  ElectionGlossaryViewProps,
  GlossaryTermItem,
} from "@/lib/types/glossary";

export async function getGlossaryPageData(): Promise<ElectionGlossaryViewProps> {
  const rows = await prisma.glossaryCategory.findMany({
    include: {
      terms: { orderBy: { title: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  const categories = rows.map((c) => ({
    id: c.id,
    label: c.name,
  }));

  const terms = rows.flatMap((c) =>
    c.terms.map((t) => ({
      id: t.id,
      term: t.title,
      definition: t.definition,
      categoryId: c.id,
    })),
  );

  return { categories, terms };
}

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
