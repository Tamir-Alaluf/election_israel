import { ComparePage } from "@/features/compare/components/compare-page";
import { getLeadersForComparison } from "@/lib/utils/candidates";

export const metadata = {
  title: "השוואת מועמדים | בחירות 2026",
  description: "השוואה צד-בצד בין ראשי המפלגות לפי פרמטרים מדיניים",
};

export const dynamic = "force-static";

export default async function CompareRoutePage() {
  const leaders = await getLeadersForComparison();

  return (
    <div className="relative min-h-screen">
      <main className="px-5 py-8">
        <ComparePage leaders={leaders} />
      </main>
    </div>
  );
}
