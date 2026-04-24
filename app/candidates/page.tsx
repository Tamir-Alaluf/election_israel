import { LeaderComparisonGrid } from "@/features/candidates/components/leader-comparison-grid";
import {
  getLeaderPartyOptions,
  getLeadersForComparison,
} from "@/lib/data/leader-comparison";

export const metadata = {
  title: "השוואת מועמדים | בחירות 2026",
  description: "השוואה בין ראשי המפלגות המתמודדות בבחירות 2026",
};

export const dynamic = "force-dynamic";

export default async function LeadersPage() {
  const leaders = await getLeadersForComparison();
  const partyOptions = getLeaderPartyOptions(leaders);

  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <LeaderComparisonGrid
          leaders={leaders}
          partyOptions={partyOptions}
        />
      </main>
    </div>
  );
}
