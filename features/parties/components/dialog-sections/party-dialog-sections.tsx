"use client";

import type {
  PartyComparisonRow,
  PartyPageFilterMeta,
} from "@/lib/types/parties";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";
import { VisionSection } from "@/features/parties/components/dialog-sections/vision-section";
import { RecentActionsSection } from "@/features/parties/components/dialog-sections/recent-actions-section";
import { FuturePromisesSection } from "@/features/parties/components/dialog-sections/future-promises-section";
import { MembersSection } from "@/features/parties/components/dialog-sections/members-section";
import { AttributesSection } from "@/features/parties/components/dialog-sections/attributes-section";
import { IssuesSection } from "@/features/parties/components/dialog-sections/issues-section";

export function PartyDialogSections({
  party,
  filterMeta,
}: {
  party: PartyComparisonRow;
  filterMeta: PartyPageFilterMeta;
}) {
  return (
    <>
      <VisionSection vision={party.vision} />

      <RecentActionsSection
        itemId={party.id}
        recentItems={party.recentActionsItems}
      />

      <FuturePromisesSection
        partyId={party.id}
        promiseItems={party.futurePromisesItems}
      />

      <MembersSection members={party.members} />

      <SectionShell
        title={filterMeta.attributesSectionTitle}
        withSurface={false}
      >
        <AttributesSection
          attributes={filterMeta.attributeTopics}
          valuesById={party.baseTopicByTitle}
        />
      </SectionShell>

      <IssuesSection
        title={filterMeta.issuesSectionTitle}
        partyId={party.id}
        issues={filterMeta.lawIssues}
        valuesById={party.legislationById}
      />
    </>
  );
}
