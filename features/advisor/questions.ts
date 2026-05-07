/**
 * Option lists aligned with comparison UIs / DB display values:
 * - Security / economy: same values as leader comparison filters
 * - Haredi / Arab: כן / חלקי / לא
 *
 * Used by advisor matching (LLM axis snapshot + rule-based scoring).
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
