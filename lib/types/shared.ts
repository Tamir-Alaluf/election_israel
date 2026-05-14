export type EducationItem = {
  major: string | null;
  university: string | null;
  degreeLevel: string | null;
  startYear: number | null;
  endYear: number | null;
  description: string | null;
};

export type ProfessionalItem = {
  title: string;
  groupName: string | null;
  startYear: number | null;
  endYear: number | null;
  description: string | null;
};

export type ActionItem = {
  category: string;
  title: string;
  description: string | null;
  orderIndex: number | null;
};

export type BaseParameters = {
  type: string;
  securityApproach: string;
  economicApproach: string;
  arabs: string;
  jews: string;
  bloc: string;
};
export type BaseParameterItem = {
  title: string;
  description: string | null;
};

export type LegislationItem = {
  legislation: {
    title: string;
    group: string;
  };
  option: string;
};

export type FuturePromiseItem = {
  title: string;
  description: string | null;
  category: string;
  orderIndex: number | null;
};
