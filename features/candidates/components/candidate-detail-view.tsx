import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CandidateComparisonRow } from "@/lib/types/candidates";
import { ComparisonImage } from "@/components/shared/data-display/comparison-image";
import { Button } from "@/components/ui/button";
import { LeaderDetailSections } from "@/features/candidates/components/candidate-detail-sections";

export function LeaderDetailView({
  leader,
}: {
  leader: CandidateComparisonRow;
}) {
  return (
    <>
      <Button variant="ghost" size="sm" className="mb-6 -me-2 gap-1" asChild>
        <Link href="/candidates">
          <ArrowRight className="h-4 w-4" aria-hidden />
          חזרה
        </Link>
      </Button>

      <header className="flex flex-col items-center gap-3 text-center">
        <ComparisonImage
          src={leader.image ?? ""}
          alt={`${leader.name} icon`}
          sizeClassName="w-16 h-16"
        />
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {leader.name}
          </h1>
          <p className="text-sm text-muted-foreground">{leader.partyName}</p>
        </div>
      </header>

      <div className="mt-6 min-w-0">
        <LeaderDetailSections leader={leader} />
      </div>
    </>
  );
}
