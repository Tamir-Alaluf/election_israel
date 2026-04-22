type FilterOption = {
  value: string;
  label: string;
};

type SingleFilterConfig = {
  key: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
  multiSelect?: false;
};

type MultiSelectFilterConfig = {
  key: string;
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder: string;
  options: FilterOption[];
  multiSelect: true;
  allLabel?: string;
};

type LawStanceFilterConfig = {
  key: string;
  placeholder: string;
  lawStances: Record<string, string>;
  lawOptions: Array<{ id: string; label: string }>;
  onLawStanceChange: (lawId: string, stance: string) => void;
  onClearAll: () => void;
  lawFilter: true;
};

export type FilterConfig =
  | SingleFilterConfig
  | MultiSelectFilterConfig
  | LawStanceFilterConfig;

export type ComparisonListItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};
