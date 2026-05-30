import type {
  VOTER_PROFILE_AGE_GROUP,
  VOTER_PROFILE_EMPLOYMENT_STATUS,
  VOTER_PROFILE_GENDER,
  VOTER_PROFILE_LIFE_STAGE,
  VOTER_PROFILE_REGION,
  VOTER_PROFILE_RELIGIOSITY,
} from "@/lib/constants/voter-profile";

export type VoterProfileAgeGroup = (typeof VOTER_PROFILE_AGE_GROUP)[number];
export type VoterProfileGender = (typeof VOTER_PROFILE_GENDER)[number];
export type VoterProfileReligiosity = (typeof VOTER_PROFILE_RELIGIOSITY)[number];
export type VoterProfileRegion = (typeof VOTER_PROFILE_REGION)[number];
export type VoterProfileLifeStage = (typeof VOTER_PROFILE_LIFE_STAGE)[number];
export type VoterProfileEmploymentStatus =
  (typeof VOTER_PROFILE_EMPLOYMENT_STATUS)[number];

export type VoterProfileField =
  | "ageGroup"
  | "gender"
  | "religiosity"
  | "region"
  | "lifeStage"
  | "employmentStatus";

export interface VoterProfileFormData {
  ageGroup?: VoterProfileAgeGroup;
  gender?: VoterProfileGender;
  religiosity?: VoterProfileReligiosity;
  region?: VoterProfileRegion;
  lifeStage?: VoterProfileLifeStage;
  employmentStatus?: VoterProfileEmploymentStatus;
}
