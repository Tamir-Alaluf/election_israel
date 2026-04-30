import { PartyComparisonGrid } from "@/features/parties/components/party-comparison-grid";
import { getPartyPageData } from "@/lib/data/party-comparison";

export const metadata = {
  title: "השוואת מפלגות | בחירות 2026",
  description: "השוואה מקיפה בין המפלגות המתמודדות בבחירות 2026",
};

export const dynamic = "force-static";

export default async function PartiesPage() {
  const { parties, filterMeta } = await getPartyPageData();

  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <PartyComparisonGrid parties={parties} filterMeta={filterMeta} />
      </main>
    </div>
  );
}
