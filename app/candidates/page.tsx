import { LeaderComparisonGrid } from "@/features/candidates/components/comparison-grid";

export const metadata = {
  title: "השוואת מועמדים | בחירות 2026",
  description: "השוואה בין ראשי המפלגות המתמודדות בבחירות 2026",
};

export default function LeadersPage() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <LeaderComparisonGrid />
      </main>
    </div>
  );
}
