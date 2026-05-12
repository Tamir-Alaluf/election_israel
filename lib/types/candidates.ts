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
  type: string;
  securityApproach: string;
  economicApproach: string;
  arabs: string;
  jews: string;
  bloc: string;
};

export type LeaderLegislationItem = {
  legislation: {
    title: string;
    group: string;
  };
  option: string;
};

export type LeaderFuturePromiseItem = {
  title: string;
  description: string | null;
  category: string;
  orderIndex: number | null;
};

export type LeaderComparisonRow = {
  id: string;
  name: string;
  partyName: string;
  image: string | null;
  color: string | null;
  vision: string | null;
  education: LeaderEducationItem[];
  professionalBackground: LeaderProfessionalItem[];
  careerAchievements: LeaderActionItem[];
  recentActions: LeaderActionItem[];
  values: LeaderValues;
  legislations: LeaderLegislationItem[];
  futurePromises: LeaderFuturePromiseItem[];
};
