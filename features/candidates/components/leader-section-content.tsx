import type { ReactNode } from "react";
import {
  type CompareApproachParamId,
  type CompareParamId,
  isCompareApproachParamId,
} from "@/lib/constants/compare";
import { BASE_TOPIC } from "@/lib/constants/parties";
import { ValueBadge } from "@/lib/constants/style";
import type {
  CandidateComparisonRow,
  LeaderDetailSectionId,
} from "@/lib/types/candidates";
import type { BaseParameters } from "@/lib/types/shared";
import { RecentActionsContent } from "@/components/shared/data-display/recent-actions-section";
import { LeaderEducationContent } from "@/features/candidates/components/dialog-sections/candidate-education-section";
import { LeaderLegislationsContent } from "@/features/candidates/components/dialog-sections/candidate-legislations-section";
import { LeaderPositionsContent } from "@/features/candidates/components/dialog-sections/candidate-positions-section";
import { LeaderProfessionalContent } from "@/features/candidates/components/dialog-sections/candidate-professional-section";
import { LeaderSentimentContent } from "@/features/candidates/components/dialog-sections/candidate-sentiment-section";
import { LeaderVisionContent } from "@/features/candidates/components/dialog-sections/candidate-vision-section";
import { MembersContent } from "@/features/parties/components/dialog-sections/members-section";

const APPROACH_PARAM_TO_FIELD: Record<
  CompareApproachParamId,
  keyof BaseParameters
> = {
  bloc: "bloc",
  type: "type",
  security: "securityApproach",
  economic: "economicApproach",
  jews: "jews",
  arabs: "arabs",
};

const APPROACH_PARAM_LABELS: Record<CompareApproachParamId, string> = {
  bloc: BASE_TOPIC.bloc,
  type: BASE_TOPIC.type,
  security: BASE_TOPIC.security,
  economic: BASE_TOPIC.economy,
  jews: BASE_TOPIC.jews,
  arabs: BASE_TOPIC.arabs,
};

export function CompareSingleApproachContent({
  paramId,
  values,
}: {
  paramId: CompareApproachParamId;
  values: BaseParameters;
}) {
  const field = APPROACH_PARAM_TO_FIELD[paramId];
  const { value, description } = values[field];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-foreground">
          {APPROACH_PARAM_LABELS[paramId]}
        </span>
        <ValueBadge value={value} />
      </div>
      {description ? (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function renderLeaderSectionContent(
  sectionId: LeaderDetailSectionId,
  leader: CandidateComparisonRow,
): ReactNode {
  switch (sectionId) {
    case "vision":
      return <LeaderVisionContent vision={leader.vision} />;
    case "sentiment":
      return (
        <LeaderSentimentContent
          positiveSentiment={leader.positiveSentiment}
          negativeSentiment={leader.negativeSentiment}
        />
      );
    case "positions":
      return <LeaderPositionsContent values={leader.values} />;
    case "legislations":
      return <LeaderLegislationsContent legislations={leader.legislations} />;
    case "education":
      return (
        <LeaderEducationContent
          leaderId={leader.id}
          education={leader.education}
        />
      );
    case "professional":
      return (
        <LeaderProfessionalContent
          leaderId={leader.id}
          professionalBackground={leader.professionalBackground}
        />
      );
    case "career":
      return (
        <RecentActionsContent
          itemId={`${leader.id}-career`}
          recentItems={leader.careerAchievements}
        />
      );
    case "recent":
      return (
        <RecentActionsContent
          itemId={`${leader.id}-recent`}
          recentItems={leader.recentActions}
        />
      );
    case "promises":
      return (
        <RecentActionsContent
          itemId={`${leader.id}-promises`}
          recentItems={leader.futurePromises}
        />
      );
    case "members":
      return <MembersContent members={leader.members} />;
    default: {
      const _exhaustive: never = sectionId;
      return _exhaustive;
    }
  }
}

export function renderLeaderCompareContent(
  paramId: CompareParamId,
  leader: CandidateComparisonRow,
): ReactNode {
  if (isCompareApproachParamId(paramId)) {
    return (
      <CompareSingleApproachContent paramId={paramId} values={leader.values} />
    );
  }

  return renderLeaderSectionContent(paramId, leader);
}
