import { LeaderComparisonGrid } from "@/components/leaders/leader-comparison-grid";

export const metadata = {
  title: "השוואת מנהיגים | בחירות 2026",
  description: "השוואה בין ראשי המפלגות המתמודדות בבחירות 2026",
};

export default function LeadersPage() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-foreground mb-1">
            השוואת מנהיגים
          </h1>
        </div>
        <LeaderComparisonGrid />
      </main>
    </div>
  );
}
