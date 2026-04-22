import { PartyComparisonGrid } from "@/features/parties/components/comparison-grid";

export const metadata = {
  title: "השוואת מפלגות | בחירות 2026",
  description: "השוואה מקיפה בין המפלגות המתמודדות בבחירות 2026",
};

export default function PartiesPage() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <PartyComparisonGrid />
      </main>
    </div>
  );
}
