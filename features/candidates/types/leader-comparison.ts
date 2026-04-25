export type LeaderComparisonRow = {
  id: string;
  name: string;
  party: string;
  image: string | null;
  color: string | null;
  vision: string | null;
  academicEducation: string;
  professionalBackground: string;
  careerAchievementsItems: {
    category: string;
    title: string;
    description: string | null;
  }[];
  recentActionsItems: {
    category: string;
    title: string;
    description: string | null;
  }[];
  values: {
    securityApproach: string;
    economicApproach: string;
    leadershipStyle: string;
    harediGov: string;
    arabGov: string;
  };
};
