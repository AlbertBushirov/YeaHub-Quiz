export type Specialization = {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string | null;
};

export type Skill = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
};

export interface Filters {
  keywords?: string;
  selectedSpec: string | null;
  pageNumber: number;
  selectedSkill: string | null;
  selectedLevels: string | number | null;
  selectedRating: string | number | null;
  limit?: number;
  spec?: string;
}
