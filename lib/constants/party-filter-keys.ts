/**
 * Base topic titles in the DB that power the three primary comparison filters.
 * They must match `BaseTopic.title` values in Postgres.
 */
export const FILTER_BASE_TOPIC_TITLES = {
  type: "סוג מפלגה",
  security: "גישה ביטחונית",
  economy: "גישה כלכלית",
} as const;

/** Order for the "מאפייני מפלגה" table (extended attributes follow). */
export const ATTRIBUTE_BASE_TOPIC_ORDER: string[] = [
  FILTER_BASE_TOPIC_TITLES.type,
  FILTER_BASE_TOPIC_TITLES.security,
  FILTER_BASE_TOPIC_TITLES.economy,
  "שילוב חרדים בממשלה",
  "שילוב ערבים בממשלה",
];
