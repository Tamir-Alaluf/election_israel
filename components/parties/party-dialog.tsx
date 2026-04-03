"use client";

import { parties, partyCategories } from "@/lib/election-data";
import {
  ComparisonCollapsibleSection,
  ComparisonDialogShell,
} from "@/components/general/comparison-shared";
import { ValueBadge } from "@/components/parties/value-badge";

export function PartyDialog({
  party,
  open,
  onClose,
}: {
  party: (typeof parties)[0] | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!party) return null;

  const attributeParams = partyCategories.attributes.parameters;
  const issueParams = partyCategories.issues.parameters;

  return (
    <ComparisonDialogShell
      open={open}
      onClose={onClose}
      image={party.image}
      title={party.name}
      subtitle={party.leader}
    >
      <ComparisonCollapsibleSection title="חזון המפלגה">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {party.vision}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="מה עשו מאז הבחירות האחרונות">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {party.recentActions}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="הבטחות לשנים הקרובות">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {party.futurePromises}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      {party.id === "likud" && party.promisesVsResultsLikud && (
        <ComparisonCollapsibleSection title="הבטחות מול תוצאות - הליכוד">
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {party.promisesVsResultsLikud}
            </p>
          </div>
        </ComparisonCollapsibleSection>
      )}

      <ComparisonCollapsibleSection title="חברי מפלגה">
        <div className="p-3 rounded-lg bg-muted/30">
          <div className="flex flex-wrap gap-2">
            {party.members?.map((member, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1.5 text-sm bg-background rounded-full border border-border/50"
              >
                {member}
              </span>
            ))}
          </div>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title={partyCategories.attributes.title}>
        <div className="space-y-2">
          {attributeParams.map((param) => (
            <div
              key={param.id}
              className="flex items-center justify-between py-2 px-1 border-b border-border/30 last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {param.label}
              </span>
              <ValueBadge
                value={
                  party.values[param.id as keyof typeof party.values] || "-"
                }
              />
            </div>
          ))}
        </div>
      </ComparisonCollapsibleSection>
      <ComparisonCollapsibleSection title={partyCategories.issues.title}>
        <div className="space-y-2">
          {issueParams.map((param, index) => {
            const prevGroup = index > 0 ? issueParams[index - 1].group : null;
            const shouldRenderGroupTitle = param.group && param.group !== prevGroup;

            return (
              <div key={param.id}>
                {shouldRenderGroupTitle && (
                  <p className="text-xs font-semibold text-primary mt-2 mb-1">
                    {param.group}
                  </p>
                )}
                <div className="flex items-center justify-between py-2 px-1 border-b border-border/30 last:border-0">
                  <span className="text-sm text-muted-foreground">
                    {param.label}
                  </span>
                  <ValueBadge
                    value={
                      party.values[param.id as keyof typeof party.values] || "-"
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ComparisonCollapsibleSection>
    </ComparisonDialogShell>
  );
}
