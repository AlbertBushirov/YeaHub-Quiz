export type CollectionAccess = "all" | "free" | "paid";

export type CollectionFilters = {
  search: string;
  specializationIds: number[];
  access: CollectionAccess;
};

export type CollectionCompany = {
  id: string;
  title: string;
  legalName: string;
  description: string;
  imageSrc: string | null;
};

export type CollectionSpecialization = {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  slug: string;
};

export type CollectionAuthor = {
  id: string;
  username: string;
};

export type Collection = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CollectionAuthor;
  isFree: boolean;
  keywords: string[];
  company: CollectionCompany;
  questionsCount: number;
  slug: string;
  tasksCount: number;
  specializations: CollectionSpecialization[];
};

export type CollectionsResponse = {
  total: number;
  page: number;
  limit: number;
  data: Collection[];
};
