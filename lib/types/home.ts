export type MandatesChartParty = {
  key: string;
  name: string;
  leader: string;
  leaderImage: string | null;
  mandates: number;
  color: string;
};

export type MandatesBlocKey = "netanyahu" | "opposition" | "arabParties";

export type MandatesBlocSummary = {
  key: MandatesBlocKey;
  label: string;
  mandates: number;
  color: string;
  percent: number;
};

export type MandatesChartData = {
  parties: MandatesChartParty[];
  blocs: MandatesBlocSummary[];
};
