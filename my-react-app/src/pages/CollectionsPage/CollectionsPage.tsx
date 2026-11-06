import { useState, useMemo } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { filterAccess } from "@/utilities/filterAccess.js";

import { CollectionsList } from "@/components/CollectionsList/CollectionsList.js";
import { CatalogPagination } from "@/components/CatalogPagination/CatalogPagination.js";
import { Filter } from "@/components/Filter/filter.js";

import type { CollectionsOutletContext } from "@/components/CollectionsLayout/CollectionsLayout.js";
import type { PropsCollectionsPage } from "@/types/CollectionsPage.js";

export function CollectionsPage({
  setPageNumber,
  pageNumber,
  values,
  actions,
}: PropsCollectionsPage) {
  const { spec = "" } = useParams();

  const [selectedAccess, setSelectedAccess] = useState<string | null>(
    "Для всех",
  );

  const { filterData, baseUrl, collectionsData } =
    useOutletContext<CollectionsOutletContext>();

  const filteredCollectionsData = useMemo(() => {
    if (!collectionsData?.data) return [];

    return filterAccess(collectionsData.data, selectedAccess);
  }, [collectionsData, selectedAccess]);

  const total = collectionsData ? Math.round(collectionsData.total / 10) : 9;

  return (
    <main>
      <div className="main_list">
        <CollectionsList collections={filteredCollectionsData} spec={spec} />
        <CatalogPagination
          page={pageNumber}
          total={total}
          onChange={setPageNumber}
        />
      </div>
      <Filter
        basePath={baseUrl}
        values={values}
        actions={actions}
        data={filterData}
        exclude={["rating", "status", "skills", "levels"]}
        selectedAccess={selectedAccess}
        setSelectedAccess={setSelectedAccess}
      />
    </main>
  );
}
