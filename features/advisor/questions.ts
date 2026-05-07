import type { AdvisorFixedQuestion } from "@/features/advisor/types";

/**
 * Option lists aligned with comparison UIs:
 * - Security / economy: same values as leader comparison filters
 *   ([features/candidates/types/filter-config.ts](features/candidates/types/filter-config.ts)).
 * - Haredi / Arab: values used by `getGovernmentIntegrationExclusions` (כן / חלקי / לא).
 */
export const ADVISOR_SECURITY_OPTIONS = [
  "ימין",
  "מרכז ימין",
  "מרכז שמאל",
  "שמאל",
] as const;

export const ADVISOR_ECONOMY_OPTIONS = [
  "ימין כלכלי",
  "שמאל כלכלי",
  "מרכז",
] as const;

export const ADVISOR_GOV_INTEGRATION_OPTIONS = ["כן", "חלקי", "לא"] as const;

export const ADVISOR_FIXED_QUESTIONS: AdvisorFixedQuestion[] = [
  {
    key: "security",
    prompt: "איך אתם מגדירים את עמדתכם הביטחונית?",
    options: [...ADVISOR_SECURITY_OPTIONS],
  },
  {
    key: "economy",
    prompt: "איך אתם מגדירים את עמדתכם הכלכלית?",
    options: [...ADVISOR_ECONOMY_OPTIONS],
  },
  {
    key: "harediGov",
    prompt: "מה חשוב לכם לגבי שילוב חרדים בממשלה?",
    options: [...ADVISOR_GOV_INTEGRATION_OPTIONS],
  },
  {
    key: "arabGov",
    prompt: "מה חשוב לכם לגבי שילוב ערבים בממשלה?",
    options: [...ADVISOR_GOV_INTEGRATION_OPTIONS],
  },
];
