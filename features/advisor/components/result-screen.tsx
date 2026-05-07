"use client";

import { Button } from "@/components/ui/button";
import { AdvisorMatchCard } from "@/features/advisor/components/match-card";
import { formatAdvisorProfileForChat } from "@/lib/utils/format-profile";
import type {
  AdvisorCandidateMatch,
  AdvisorFinalProfile,
  AdvisorMatchingResult,
} from "@/lib/types/advisor";

type AdvisorResultScreenProps = {
  result: AdvisorMatchingResult;
  finalProfile: AdvisorFinalProfile;
  onStartChat: (text: string) => void;
  compact?: boolean;
};

export function AdvisorResultScreen({
  result,
  finalProfile,
  onStartChat,
  compact = false,
}: AdvisorResultScreenProps) {
  return (
    <section
      className="w-full space-y-4 pb-4"
      dir="rtl"
      aria-label="תוצאות התאמה"
    >
      <div className="text-center">
        <h2
          className={
            compact
              ? "text-sm font-semibold text-foreground"
              : "text-lg font-semibold text-foreground"
          }
        >
          סיכום והתאמות
        </h2>
        {!compact ? (
          <p className="mt-1 text-xs text-muted-foreground px-2">
            לפי התשובות שלכם. אפשר להמשיך לשיחה חופשית למטה.
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border/60 bg-background/50 p-4 text-start shadow-sm">
        <h3 className="text-xs font-semibold text-muted-foreground mb-2">
          פרופיל
        </h3>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          {result.profileSummary}
        </p>
      </div>

      <ul className="space-y-3">
        {result.matches.map((match: AdvisorCandidateMatch, index: number) => (
          <li key={match.candidateId}>
            <AdvisorMatchCard
              match={match}
              rank={index + 1}
              onAskMore={() =>
                onStartChat(
                  formatAdvisorProfileForChat(finalProfile, {
                    profileSummary: result.profileSummary,
                    partyFocus: match.partyName,
                  }),
                )
              }
            />
          </li>
        ))}
      </ul>

      {!compact ? (
        <Button
          type="button"
          variant="secondary"
          className="w-full rounded-2xl h-11 text-sm font-semibold"
          onClick={() =>
            onStartChat(
              formatAdvisorProfileForChat(finalProfile, {
                profileSummary: result.profileSummary,
              }),
            )
          }
        >
          המשיכו לשיחה חופשית
        </Button>
      ) : null}
    </section>
  );
}
