"use client";

import { Button } from "@/components/ui/button";
import { AdvisorMatchCard } from "@/features/advisor/components/match-card";
import { formatAdvisorProfileForChat } from "@/features/advisor/format-profile";
import type { AdvisorPartyMatch, AdvisorProfile } from "@/features/advisor/types";

type AdvisorMatchResultsProps = {
  matches: AdvisorPartyMatch[];
  profile: AdvisorProfile;
  onStartChat: (text: string) => void;
  /** When true, show a compact heading (e.g. above an ongoing thread). */
  compact?: boolean;
};

export function AdvisorMatchResults({
  matches,
  profile,
  onStartChat,
  compact = false,
}: AdvisorMatchResultsProps) {
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
          ההתאמות המובילות שלכם
        </h2>
        {!compact ? (
          <p className="mt-1 text-xs text-muted-foreground px-2">
            לפי הצירים שבחרתם. אפשר להמשיך בשיחה חופשית למטה.
          </p>
        ) : null}
      </div>

      <ul className="space-y-3">
        {matches.map((match, index) => (
          <li key={match.id}>
            <AdvisorMatchCard
              match={match}
              rank={index + 1}
              onAskMore={() =>
                onStartChat(formatAdvisorProfileForChat(profile, match.name))
              }
            />
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant="secondary"
        className="w-full rounded-2xl h-11 text-sm font-semibold"
        onClick={() => onStartChat(formatAdvisorProfileForChat(profile))}
      >
        התחל שיחה חופשית
      </Button>
    </section>
  );
}
