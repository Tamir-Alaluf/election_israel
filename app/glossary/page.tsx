import { ElectionGlossaryView } from "@/components/glossary/election-glossary-view";

export const metadata = {
  title: "מילון בחירות | בחירות 2026",
  description:
    "מונחי יסוד בפשטות: מנדט, אחוז חסימה, קואליציה, קלפי ועוד — עם חיפוש וקטגוריות.",
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <header className="text-center mb-8 space-y-2">
          <h1 className="text-lg font-bold text-foreground">מילון בחירות</h1>
        </header>
        <ElectionGlossaryView />
      </main>
    </div>
  );
}
