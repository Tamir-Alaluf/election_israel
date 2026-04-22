"use client";

import { leaders } from "@/lib/election-data";
import {
  ComparisonCollapsibleSection,
  ComparisonDialogShell,
} from "@/components/shared/data-display";
import { ValueBadge } from "@/features/parties/components/value-badge";

export function LeaderDialog({
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
          <p className="text-sm text-foreground leading-relaxed">{leader.vision}</p>
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
            <span className="text-sm text-muted-foreground">שילוב חרדים בממשלה</span>
            <ValueBadge value={leader.values.harediGov} />
          </div>
          <div className="flex items-center justify-between py-2 px-1 border-b border-border/30">
            <span className="text-sm text-muted-foreground">שילוב ערבים בממשלה</span>
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
