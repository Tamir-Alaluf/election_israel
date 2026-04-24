type FilterOption = {
  value: string;
  label: string;
};

type SingleFilter = {
  key: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
  multiSelect?: false;
};

type MultiSelectFilter = {
  key: string;
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder: string;
  options: FilterOption[];
  multiSelect: true;
  allLabel?: string;
};

type LawStanceFilter = {
  key: string;
  placeholder: string;
  lawStances: Record<string, string>;
  lawOptions: Array<{ id: string; label: string }>;
  onLawStanceChange: (lawId: string, stance: string) => void;
  onClearAll: () => void;
  lawFilter: true;
};

export type Filter = SingleFilter | MultiSelectFilter | LawStanceFilter;

export type ComparisonListItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type ComparisonGridRow = ComparisonListItem & {
  onClick: () => void;
};
