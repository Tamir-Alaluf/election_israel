export function formatYearRange(
  startYear: number | null,
  endYear: number | null,
) {
  if (startYear && endYear) return `${startYear}-${endYear}`;
  if (startYear) return `החל מ-${startYear}`;
  if (endYear) return `עד ${endYear}`;
  return null;
}
