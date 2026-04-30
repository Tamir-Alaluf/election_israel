import { prisma } from "@/lib/prisma";
import type { ElectionGlossaryViewProps } from "@/features/glossary/types/items";

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
