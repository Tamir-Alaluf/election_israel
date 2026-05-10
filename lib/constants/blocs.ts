/** Postgres `BaseTopic.title` for the bloc axis — must match DB. */
export const BLOC_BASE_TOPIC_TITLE = "גוש";

export const BLOC_DEFINITIONS = {
  netanyahu: {
    value: "גוש נתניהו",
    label: "גוש נתניהו",
    color: "#004B8D",
  },
  opposition: {
    /** Matches common `baseTopicOptionDisplayValue` in Postgres (e.g. ישראל ביתנו, ביחד). */
    value: "אופוזיציה",
    label: "גוש אופוזיציה",
    color: "#F59E0B",
  },
  arabParties: {
    value: "חד״ש-תע״ל ורע״מ",
    label: "חד״ש-תע״ל ורע״מ",
    color: "#BFD8FF",
  },
} as const;

export type MandatesBlocKey = keyof typeof BLOC_DEFINITIONS;

/** Alternate display strings that still map to the same bloc (imports / legacy rows). */
const BLOC_DISPLAY_ALIASES: Partial<
  Record<MandatesBlocKey, readonly string[]>
> = {
  opposition: ["גוש אופוזיציה"],
  arabParties: [
    "מפלגות ערביות",
    "חד״ש-תע״ל ורע״ם",
    'חד"ש-תע"ל ורע"ם',
    'חד"ש-תע"ל ורע"מ',
  ],
};

export const BLOC_ORDER = [
  "netanyahu",
  "opposition",
  "arabParties",
] as const satisfies readonly MandatesBlocKey[];

/** Canonical bloc option strings in UI/import order (matches Postgres display values). */
export const BLOC_DB_VALUES_ORDERED = [
  BLOC_DEFINITIONS.netanyahu.value,
  BLOC_DEFINITIONS.opposition.value,
  BLOC_DEFINITIONS.arabParties.value,
] as const;

export const BLOC_META: Record<MandatesBlocKey, { label: string; color: string }> =
  {
    netanyahu: {
      label: BLOC_DEFINITIONS.netanyahu.label,
      color: BLOC_DEFINITIONS.netanyahu.color,
    },
    opposition: {
      label: BLOC_DEFINITIONS.opposition.label,
      color: BLOC_DEFINITIONS.opposition.color,
    },
    arabParties: {
      label: BLOC_DEFINITIONS.arabParties.label,
      color: BLOC_DEFINITIONS.arabParties.color,
    },
  };

export function blocKeyFromDisplayValue(
  value: string,
): MandatesBlocKey | null {
  const normalized = value.trim();
  if (!normalized) return null;
  for (const key of BLOC_ORDER) {
    const def = BLOC_DEFINITIONS[key];
    if (normalized === def.value) return key;
    const aliases = BLOC_DISPLAY_ALIASES[key];
    if (aliases?.some((a: string) => a === normalized)) return key;
  }
  return null;
}
