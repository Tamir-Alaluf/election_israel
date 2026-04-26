export type LeaderEducationItem = {
  major: string | null;
  university: string | null;
  degreeLevel: string | null;
  startYear: number | null;
  endYear: number | null;
  description: string | null;
};

export type LeaderProfessionalItem = {
  title: string;
  groupName: string | null;
  startYear: number | null;
  endYear: number | null;
  description: string | null;
};

export type LeaderActionItem = {
  category: string;
  title: string;
  description: string | null;
  orderIndex: number | null;
};

export type LeaderValues = {
  securityApproach: string;
  economicApproach: string;
  leadershipStyle: string;
  harediGov: string;
  arabGov: string;
  bloc: string;
};

export type LeaderComparisonRow = {
  id: string;
  name: string;
  party: string;
  image: string | null;
  color: string | null;
  vision: string | null;
  education: LeaderEducationItem[];
  professionalBackground: LeaderProfessionalItem[];
  careerAchievements: LeaderActionItem[];
  recentActions: LeaderActionItem[];
  values: LeaderValues;
};
