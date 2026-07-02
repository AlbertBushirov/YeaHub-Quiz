import { useState, useEffect } from "react";

import { getPublicCollections } from "@/api/collectionsApi.js";

import type { CollectionsResponse } from "@/types/collections.js";
import type { Filters } from "@/types/CollectionsPage.js";

import { useDeBounce } from "@/hooks/useDebounce.js";

export const useCollectionPage = (filters: Filters) => {
  const [collectionsData, setCollectionsData] =
    useState<CollectionsResponse | null>(null);

  const {
    keywords,
    pageNumber,
    selectedSpec,
    selectedSkill,
    selectedLevels,
    selectedRating,
  } = filters;

  const debouncedKeywords = useDeBounce(keywords ?? "", 1500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPublicCollections({
          pageNumber,
          keywords: debouncedKeywords,
          selectedSpec,
          selectedSkill,
          selectedLevels,
          selectedRating,
        });

        setCollectionsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [
    pageNumber,
    debouncedKeywords,
    selectedSpec,
    selectedSkill,
    selectedLevels,
    selectedRating,
  ]);

  return { collectionsData, setCollectionsData };
};
