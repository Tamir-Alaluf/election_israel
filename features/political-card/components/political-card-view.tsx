import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PoliticalPriority } from "@/lib/constants/political-card";
import { PoliticalCardShareable } from "./political-card-shareable";

export type PoliticalCardViewProps = {
  priorities: PoliticalPriority[];
};

export function PoliticalCardView({ priorities }: PoliticalCardViewProps) {
  const sharePriorities = priorities.map(({ id, label }) => ({ id, label }));

  return (
    <div className="space-y-10 pt-16 pb-14">
      <PoliticalCardShareable priorities={sharePriorities} />

      <div className="space-y-5">
        <Button
          className="w-full h-11 rounded-2xl text-base font-semibold"
          asChild
        >
          <Link href="/advisor" className="gap-2">
            <Sparkles className="size-4" />
            בוא נמצא את ההתאמה שלך
            <ArrowLeft className="size-4 opacity-80" />
          </Link>
        </Button>

        <p className="text-center text-sm text-muted-foreground leading-relaxed px-2">
          אלו הטופ 3 שלי. מה חשוב לכם? בואו לגלות את הפרופיל שלכם
        </p>
      </div>
    </div>
  );
}
