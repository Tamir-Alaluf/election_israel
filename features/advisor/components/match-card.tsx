"use client";

import Link from "next/link";
import { ComparisonImage } from "@/components/shared/data-display/comparison-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import type { AdvisorCandidateMatch } from "@/lib/types/advisor";

type AdvisorMatchCardProps = {
  match: AdvisorCandidateMatch;
  rank: number;
  onAskMore: () => void;
};

function getInitials(name: string) {
  const cleaned = name.trim();
  if (!cleaned) return "";
  return cleaned.slice(0, 2);
}

export function AdvisorMatchCard({
  match,
  rank,
  onAskMore,
}: AdvisorMatchCardProps) {
  const axesLine =
    match.matchedAxes.length > 0
      ? `התאמה בצירים: ${match.matchedAxes.join(", ")}`
      : "אין התאמות מלאות לצירים בנתוני המפלגה — עדיין שווה לבדוק בפירוט";

  return (
    <article
      className={cn(
        "rounded-2xl border border-border/60 bg-background/50 p-4 text-start shadow-sm",
      )}
      dir="rtl"
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <span className="absolute -top-1 -right-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/15 px-1.5 text-[11px] font-bold text-primary">
            {rank}
          </span>
          {match.candidateImage ? (
            <ComparisonImage
              src={match.candidateImage}
              alt=""
              sizeClassName="h-14 w-14"
              sizes="56px"
            />
          ) : (
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted text-sm font-semibold text-foreground/80"
              aria-hidden
            >
              {getInitials(match.candidateName)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              {match.candidateName}
            </h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
              {match.matchPercent}%
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {match.partyImage ? (
              <ComparisonImage
                src={match.partyImage}
                alt=""
                sizeClassName="h-6 w-6 rounded-full"
                sizes="24px"
              />
            ) : null}
            <span className="font-medium text-foreground/90">
              {match.partyName}
            </span>
            {match.partyMandates != null ? (
              <span className="tabular-nums">
                ~{match.partyMandates} מנדטים
              </span>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            {match.reasoning}
          </p>
          <p className="text-[11px] text-muted-foreground/90 leading-snug">
            {axesLine}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button variant="outline" size="sm" className="rounded-xl" asChild>
          <Link href="/parties">פרטי מפלגה</Link>
        </Button>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="rounded-xl"
          onClick={onAskMore}
        >
          שאלו עוד
        </Button>
      </div>
    </article>
  );
}
