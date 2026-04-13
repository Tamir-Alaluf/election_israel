"use client";

import { useState, useMemo } from "react";
import { leaders } from "@/lib/election-data";
import {
  ComparisonCollapsibleSection,
  ComparisonDialogShell,
  ComparisonEmptyState,
  ComparisonFilters,
  ComparisonGrid,
  ComparisonProfileCard,
} from "@/components/general/comparison-shared";
import { ValueBadge } from "@/components/parties/value-badge";
import {
  getGovernmentIntegrationsLabel,
  getLeaderComparisonFilters,
} from "@/components/candidates/candidate-comparison-filters";

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

      <ComparisonCollapsibleSection title="השכלה אקדמאית">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed">
            {leader.academicEducation}
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

      <ComparisonCollapsibleSection title="הישגים במהלך הקריירה">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed">
            {leader.careerAchievements}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="מה עשה מאז הבחירות האחרונות">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed">
            {leader.recentActions}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="דפוס קול">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed">
            {leader.voicePattern}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="עמדות">
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 px-1 border-b border-border/30">
            <span className="text-sm text-muted-foreground">גישה ביטחונית</span>
            <ValueBadge value={leader.values.securityApproach} />
          </div>
          <div className="flex items-center justify-between py-2 px-1 border-b border-border/30">
            <span className="text-sm text-muted-foreground">גישה כלכלית</span>
            <ValueBadge value={leader.values.economicApproach} />
          </div>
          <div className="flex items-center justify-between py-2 px-1 border-b border-border/30">
            <span className="text-sm text-muted-foreground">סגנון מנהיגות</span>
            <ValueBadge value={leader.values.leadershipStyle} />
          </div>
          <div className="flex items-center justify-between py-2 px-1 border-b border-border/30">
            <span className="text-sm text-muted-foreground">
              שילוב חרדים בממשלה
            </span>
            <ValueBadge value={leader.values.harediGov} />
          </div>
          <div className="flex items-center justify-between py-2 px-1 border-b border-border/30">
            <span className="text-sm text-muted-foreground">
              שילוב ערבים בממשלה
            </span>
            <ValueBadge value={leader.values.arabGov} />
          </div>
          <div className="flex items-center justify-between py-2 px-1">
            <span className="text-sm text-muted-foreground">
              מספר מנדטים בבחירות האחרונות
            </span>
            <span className="text-sm font-semibold text-foreground">
              {leader.values.lastElectionMandates}
            </span>
          </div>
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
  const [partyFilter, setPartyFilter] = useState<string[]>([]);
  const [securityFilter, setSecurityFilter] = useState<string[]>([]);
  const [economicFilter, setEconomicFilter] = useState<string[]>([]);
  const [leadershipStyleFilter, setLeadershipStyleFilter] = useState<string[]>(
    [],
  );
  const [governmentIntegrationsFilter, setGovernmentIntegrationsFilter] =
    useState<string[]>([]);

  const leaderFilters = useMemo(
    () =>
      getLeaderComparisonFilters({
        partyFilter,
        setPartyFilter,
        securityFilter,
        setSecurityFilter,
        economyFilter: economicFilter,
        setEconomyFilter: setEconomicFilter,
        leadershipStyleFilter,
        setLeadershipStyleFilter,
        governmentIntegrationsFilter,
        setGovernmentIntegrationsFilter,
      }),
    [
      partyFilter,
      securityFilter,
      economicFilter,
      leadershipStyleFilter,
      governmentIntegrationsFilter,
    ],
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
      if (partyFilter.length > 0 && !partyFilter.includes(leader.party)) {
        return false;
      }
      if (
        securityFilter.length > 0 &&
        !securityFilter.includes(leader.values.securityApproach)
      ) {
        return false;
      }
      if (
        economicFilter.length > 0 &&
        !economicFilter.includes(leader.values.economicApproach)
      ) {
        return false;
      }
      if (
        leadershipStyleFilter.length > 0 &&
        !leadershipStyleFilter.includes(leader.values.leadershipStyle)
      ) {
        return false;
      }
      const governmentIntegrations = getGovernmentIntegrationsLabel({
        harediGov: leader.values.harediGov,
        arabGov: leader.values.arabGov,
      });
      if (
        governmentIntegrationsFilter.length > 0 &&
        !governmentIntegrationsFilter.includes(governmentIntegrations)
      ) {
        return false;
      }
      return true;
    });
  }, [
    searchQuery,
    partyFilter,
    securityFilter,
    economicFilter,
    leadershipStyleFilter,
    governmentIntegrationsFilter,
  ]);

  return (
    <>
      <ComparisonFilters
        searchPlaceholder="חיפוש לפי שם מועמד או מפלגה..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={leaderFilters}
        resultsText={`${filteredLeaders.length} מועמדים`}
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
        <ComparisonEmptyState message="לא נמצאו מועמדים התואמים את הסינון" />
      )}

      <LeaderDialog
        leader={selectedLeader}
        open={!!selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />
    </>
  );
}
