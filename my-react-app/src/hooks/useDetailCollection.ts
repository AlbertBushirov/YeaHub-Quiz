import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import type { CollectionsOutletContext } from "@/components/CollectionsLayout/CollectionsLayout.js";

import { useFilters } from "@/hooks/useFilters.js";

export function useDetailCollection(setTitle: (title: string) => void) {
  const { spec: collectionSlug } = useParams();
  const navigate = useNavigate();
  const { collectionsData } = useOutletContext<CollectionsOutletContext>();

  const decodedUrlTitle = decodeURIComponent(collectionSlug || "").trim();
  const collection = collectionsData?.data?.find(
    (c) => String(c.slug) === decodedUrlTitle,
  );

  const specializationSlug = collection?.specializations?.[0]?.slug || "";
  const specializationTitle = collection?.specializations?.[0]?.title || "";
  const totalQuestions = collection?.questionsCount ?? 10;

  const { questions } = useFilters({
    pageNumber: 1,
    spec: specializationSlug,
    limit: totalQuestions,
    selectedSpec: specializationSlug,
    selectedSkill: null,
    selectedLevels: null,
    selectedRating: null,
  });

  useEffect(() => {
    if (specializationTitle) {
      setTitle(specializationTitle);
    }
  }, [specializationTitle, setTitle]);

  const handleClose = () => navigate(-1);

  return {
    collection,
    questions,
    specializationSlug,
    handleClose,
  };
}
