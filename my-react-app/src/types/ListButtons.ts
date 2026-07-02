import type { Dispatch, SetStateAction } from "react";
import type { CollectionsPropType } from "@/types/Filter.js";

interface ButtonItem {
  id?: string | number;
  title: string | number;
  slug?: string;
  [key: string]: any;
}

interface ButtonsConfig {
  data: ButtonItem[];
}

export type PropsListButtons = {
  basePath?: string;
  name: string;
  title?: string;
  buttons: ButtonItem[] | ButtonsConfig | null | undefined;
  selected?: string | number | null | undefined;
  setSelected?: Dispatch<SetStateAction<any>> | undefined;
  setTitle?:
    | Dispatch<SetStateAction<string>>
    | ((title: any) => void)
    | undefined;
};
