import { LeaderComparisonGrid } from "@/features/candidates/components/candidates-comparison-grid";
import { getLeadersForComparison } from "@/lib/utils/candidates";

export const metadata = {
  title: "השוואת מועמדים | בחירות 2026",
  description: "השוואה בין ראשי המפלגות המתמודדות בבחירות 2026",
};

export const dynamic = "force-static";

export default async function LeadersPage() {
  const leaders = await getLeadersForComparison();

  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <LeaderComparisonGrid leaders={leaders} />
      </main>
    </div>
  );
}
