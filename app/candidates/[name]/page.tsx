import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LeaderDetailView } from "@/features/candidates/components/leader-detail-view";
import {
  getLeaderByName,
  getLeadersForComparison,
} from "@/lib/utils/candidates";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const leaders = await getLeadersForComparison();
  return leaders.map((leader) => ({ name: leader.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const leader = await getLeaderByName(name);

  if (!leader) {
    return { title: "מועמד לא נמצא | בחירות 2026" };
  }

  return {
    title: `${leader.name} | השוואת מועמדים`,
    description: `פרטים על ${leader.name}, ${leader.partyName} — בחירות 2026`,
  };
}

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const leader = await getLeaderByName(name);

  if (!leader) {
    notFound();
  }

  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <LeaderDetailView leader={leader} />
      </main>
    </div>
  );
}
