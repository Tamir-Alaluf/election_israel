"use client";

import { useState, useMemo } from "react";
import { leaders } from "@/lib/election-data";
import { cn } from "@/lib/utils";
import {
  ComparisonCollapsibleSection,
  ComparisonDialogShell,
  ComparisonEmptyState,
  ComparisonFilters,
  ComparisonGrid,
  ComparisonProfileCard,
} from "@/components/general/comparison-shared";

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-3 h-2 rounded-full",
            i < value ? "bg-primary" : "bg-muted",
          )}
        />
      ))}
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    ללא: "bg-emerald-100 text-emerald-700",
    "כתבי אישום פעילים": "bg-rose-100 text-rose-700",
    "הרשעות קודמות": "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-xs font-medium rounded-full",
        colorMap[value] || "bg-muted text-muted-foreground",
      )}
    >
      {value}
    </span>
  );
}

function LeaderCard({
  leader,
  onClick,
}: {
  leader: (typeof leaders)[0];
  onClick: () => void;
}) {
  return (
    <ComparisonProfileCard
      image={leader.image}
      name={leader.name}
      subtitle={leader.party}
      onClick={onClick}
    />
  );
}

function LeaderDialog({
  leader,
  open,
  onClose,
}: {
  leader: (typeof leaders)[0] | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!leader) return null;

  return (
    <ComparisonDialogShell
      open={open}
      onClose={onClose}
      image={leader.image}
      title={leader.name}
      subtitle={leader.party}
    >
      <ComparisonCollapsibleSection title="חזון" defaultOpen>
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed">
            {leader.vision}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="רקע מקצועי">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed">
            {leader.professionalBackground}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="מה עשה בשנים האחרונות">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed">
            {leader.recentActions}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      {leader.id === "netanyahu" && leader.likudPromisesComparison && (
        <ComparisonCollapsibleSection title="הבטחות מול תוצאות - הליכוד">
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-sm text-foreground leading-relaxed">
              {leader.likudPromisesComparison}
            </p>
          </div>
        </ComparisonCollapsibleSection>
      )}
    </ComparisonDialogShell>
  );
}

export function LeaderComparisonGrid() {
  const [selectedLeader, setSelectedLeader] = useState<
    (typeof leaders)[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [partyFilter, setPartyFilter] = useState<string>("all");
  const [criminalFilter, setCriminalFilter] = useState<string>("all");
  const [lifestyleFilter, setLifestyleFilter] = useState<string>("all");
  const [securityBgFilter, setSecurityBgFilter] = useState<string>("all");

  // Get unique values for filters
  const uniqueParties = useMemo(
    () => [...new Set(leaders.map((l) => l.party))],
    [],
  );
  const uniqueLifestyles = useMemo(
    () => [...new Set(leaders.map((l) => l.values.lifestyle))],
    [],
  );
  const uniqueCriminal = useMemo(
    () => [...new Set(leaders.map((l) => l.values.criminal))],
    [],
  );

  const filteredLeaders = useMemo(() => {
    return leaders.filter((leader) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !leader.name.toLowerCase().includes(query) &&
          !leader.party.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      // Party filter
      if (partyFilter !== "all" && leader.party !== partyFilter) {
        return false;
      }
      // Criminal filter
      if (
        criminalFilter !== "all" &&
        leader.values.criminal !== criminalFilter
      ) {
        return false;
      }
      // Lifestyle filter
      if (
        lifestyleFilter !== "all" &&
        leader.values.lifestyle !== lifestyleFilter
      ) {
        return false;
      }
      // Security background filter (high = 4-5, medium = 2-3, low = 1)
      if (securityBgFilter !== "all") {
        const bg = leader.values.securityBg;
        if (securityBgFilter === "high" && bg < 4) return false;
        if (securityBgFilter === "medium" && (bg < 2 || bg > 3)) return false;
        if (securityBgFilter === "low" && bg > 1) return false;
      }
      return true;
    });
  }, [
    searchQuery,
    partyFilter,
    criminalFilter,
    lifestyleFilter,
    securityBgFilter,
  ]);

  return (
    <>
      <ComparisonFilters
        searchPlaceholder="חיפוש לפי שם מנהיג או מפלגה..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={[
          {
            key: "party",
            value: partyFilter,
            onValueChange: setPartyFilter,
            placeholder: "מפלגה",
            options: [
              { value: "all", label: "כל המפלגות" },
              ...uniqueParties.map((party) => ({ value: party, label: party })),
            ],
          },
          {
            key: "securityBg",
            value: securityBgFilter,
            onValueChange: setSecurityBgFilter,
            placeholder: "רקע ביטחוני",
            options: [
              { value: "all", label: "כל הרמות" },
              { value: "high", label: "גבוה (4-5)" },
              { value: "medium", label: "בינוני (2-3)" },
              { value: "low", label: "נמוך (1)" },
            ],
          },
          {
            key: "criminal",
            value: criminalFilter,
            onValueChange: setCriminalFilter,
            placeholder: "מצב פלילי",
            options: [
              { value: "all", label: "הכל" },
              ...uniqueCriminal.map((status) => ({
                value: status,
                label: status,
              })),
            ],
          },
          {
            key: "lifestyle",
            value: lifestyleFilter,
            onValueChange: setLifestyleFilter,
            placeholder: "סגנון חיים",
            options: [
              { value: "all", label: "הכל" },
              ...uniqueLifestyles.map((lifestyle) => ({
                value: lifestyle,
                label: lifestyle,
              })),
            ],
          },
        ]}
        resultsText={`${filteredLeaders.length} מנהיגים`}
      />

      <ComparisonGrid>
        {filteredLeaders.map((leader) => (
          <LeaderCard
            key={leader.id}
            leader={leader}
            onClick={() => setSelectedLeader(leader)}
          />
        ))}
      </ComparisonGrid>

      {filteredLeaders.length === 0 && (
        <ComparisonEmptyState message="לא נמצאו מנהיגים התואמים את הסינון" />
      )}

      <LeaderDialog
        leader={selectedLeader}
        open={!!selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />
    </>
  );
}
