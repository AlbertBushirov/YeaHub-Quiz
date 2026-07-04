import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

import { useCollectionPage } from "@/hooks/useCollectionsPage.js";
import { useFilters } from "@/hooks/useFilters.js";

import type { Filters } from "@/types/filters.js";
import type { CollectionsResponse } from "@/types/collections.js";

interface FilterActions {
  setKeywords: (value: string) => void;
  setSelectedSpec: (value: string) => void;
  setSelectedSkill: (value: string) => void;
  setSelectedLevels: (value: string | number) => void;
  setSelectedRating: (value: number) => void;
  setPageNumber: (value: number) => void;
}

interface CollectionsLayoutProps {
  filterValues: Filters;
  filterActions: FilterActions;
}

export interface CollectionsOutletContext {
  filterData: ReturnType<typeof useFilters>;
  baseUrl: string;
  collectionsData: CollectionsResponse;
}

export function CollectionsLayout({
  filterValues,
  filterActions,
}: CollectionsLayoutProps) {
  const params = useParams();

  const urlSpec = params.spec || "";

  const baseUrl = "/collections";

  useEffect(() => {
    if (urlSpec !== filterValues.selectedSpec) {
      filterActions.setSelectedSpec(urlSpec);
    }
  }, [urlSpec, filterValues.selectedSpec, filterActions, filterValues.limit]);

  const currentFilters = {
    pageNumber: filterValues.pageNumber,

    spec: urlSpec || filterValues.selectedSpec || "",

    selectedSpec: filterValues.selectedSpec || "",

    keywords: filterValues.keywords ?? undefined,
    selectedSkill: filterValues.selectedSkill ?? undefined,

    selectedLevels:
      filterValues.selectedLevels !== null
        ? String(filterValues.selectedLevels)
        : undefined,
    selectedRating:
      filterValues.selectedRating !== null
        ? String(filterValues.selectedRating)
        : undefined,
    limit: filterValues.limit ?? undefined,
  } as Filters;

  const filterData = useFilters(currentFilters);

  const { collectionsData } = useCollectionPage(currentFilters as any);

  return (
    <Outlet
      context={{
        filterData,
        baseUrl,
        collectionsData,
      }}
    />
  );
}
