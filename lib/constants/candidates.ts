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
