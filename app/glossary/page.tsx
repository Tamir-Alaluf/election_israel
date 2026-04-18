import { ElectionGlossaryView } from "@/components/glossary/election-glossary-view";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "מילון בחירות | בחירות 2026",
  description:
    "מונחי יסוד בפשטות: מנדט, אחוז חסימה, קואליציה, קלפי ועוד — עם חיפוש וקטגוריות.",
};

export default async function GlossaryPage() {
  const categories = await prisma.glossaryCategory.findMany({
    include: {
      terms: { orderBy: { title: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  const categoryItems = categories.map((c) => ({
    id: c.id,
    label: c.name,
  }));

  const termItems = categories.flatMap((c) =>
    c.terms.map((t) => ({
      id: t.id,
      term: t.title,
      definition: t.definition,
      categoryId: c.id,
    })),
  );

  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <header className="text-center mb-8 space-y-2">
          <h1 className="text-lg font-bold text-foreground">מילון בחירות</h1>
        </header>
        <ElectionGlossaryView
          categories={categoryItems}
          terms={termItems}
        />
      </main>
    </div>
  );
}
