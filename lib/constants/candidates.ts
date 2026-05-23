import type { Prisma } from "@prisma/client";
export const leaderParameterLabels: string[] = [
  "חזון",
  "השכלה אקדמאית",
  "רקע מקצועי",
  "הישגים במהלך הקריירה",
  "מה עשה מאז הבחירות האחרונות",
  "גישה ביטחונית",
  "גישה כלכלית",
  "גוש",
  "מספר מנדטים בבחירות האחרונות",
];

export const LEADER_DETAIL_CATEGORIES = [
  { id: "background", label: "רקע" },
  { id: "activity", label: "פעילות והבטחות" },
  { id: "issues", label: "עמדות בסוגיות" },
  { id: "party", label: "מפלגה" },
] as const;

export const LEADER_DETAIL_SECTION_DEFS = [
  { id: "vision", title: "חזון", categoryId: "background" },
  { id: "positions", title: "עמדות", categoryId: "background" },
  {
    id: "legislations",
    title: "עמדות בסוגיות",
    categoryId: "issues",
  },
  {
    id: "education",
    title: "השכלה אקדמאית",
    categoryId: "background",
  },
  {
    id: "professional",
    title: "רקע מקצועי",
    categoryId: "background",
  },
  {
    id: "career",
    title: "הישגים",
    categoryId: "activity",
  },
  {
    id: "recent",
    title: "הישגים מאז הבחירות הקודמות",
    categoryId: "activity",
  },
  {
    id: "promises",
    title: "הבטחות לשנים הקרובות",
    categoryId: "activity",
  },
  { id: "members", title: "חברי מפלגה", categoryId: "party" },
] as const;

export const PROFESSIONAL_BACKGROUND_GROUPS = [
  "כלכלי",
  "מגזר הפרטי",
  "ביטחוני",
  "בינלאומי",
  "פנים מדיני",
] as const;

export const candidateComparisonInclude = {
  party: {
    include: {
      baseTopics: true,
      legislations: {
        include: {
          legislation: { include: { group: true } },
          option: true,
        },
      },
      futurePromises: {
        include: { actionGroup: true },
      },
      members: true,
    },
  },
  education: { orderBy: { id: "asc" } },
  professionals: {
    include: { group: true },
  },
  careerActions: {
    include: { actionGroup: true },
  },
  recentActions: {
    include: { actionGroup: true },
  },
} satisfies Prisma.CandidateInclude;
