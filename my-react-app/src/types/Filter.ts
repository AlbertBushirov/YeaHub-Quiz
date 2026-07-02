import type { Dispatch, SetStateAction } from "react";
import type { CollectionsResponse } from "@/types/collections.js";

export type FilterBlock =
  | "search"
  | "specialization"
  | "skills"
  | "levels"
  | "rating"
  | "status"
  | "acces";

interface Specialization {
  slug: string;
  title: string;
  [key: string]: any;
}

interface Skill {
  title: string;
  [key: string]: any;
}

interface FilterValues {
  keywords: string;
  selectedSpec: string | null;
  selectedSkill: string | null;
  selectedLevels: string | number | null;
  selectedRating: string | number | null;
}
export interface CollectionsPropType {
  originalCollections: CollectionsResponse | null;
  setCollectionsData: (arg: CollectionsResponse | null) => void;
}

interface FilterActions {
  setKeywords: Dispatch<SetStateAction<string>>;
  setSelectedSpec: Dispatch<SetStateAction<string | null>>;
  setSelectedSkill: Dispatch<SetStateAction<string | null>>;
  setSelectedLevels: Dispatch<SetStateAction<any>>;
  setSelectedRating: Dispatch<SetStateAction<any>>;
}

interface FilterData {
  specializations: Specialization[] | null;
  skills?: Skill[] | null;
}

export interface FilterProps {
  basePath: string;
  values: FilterValues;
  actions: FilterActions;
  data: FilterData;
  setTitle?: Dispatch<SetStateAction<string>> | ((title: string) => void);
  exclude?: FilterBlock[];
  collections?: CollectionsPropType;
  selectedAccess: string | null;
  setSelectedAccess:
    | Dispatch<SetStateAction<string | null>>
    | ((value: string | null) => void);
}
