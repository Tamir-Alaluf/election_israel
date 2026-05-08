export type GlossaryCategoryItem = {
  id: string;
  label: string;
};

export type GlossaryTermItem = {
  id: string;
  term: string;
  definition: string;
  categoryId: string;
};

export type ElectionGlossaryViewProps = {
  categories: GlossaryCategoryItem[];
  terms: GlossaryTermItem[];
};
