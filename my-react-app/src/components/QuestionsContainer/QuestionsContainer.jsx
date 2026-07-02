import { useEffect, useState } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";

import { useFilters } from "../../hooks/useFilters";

import { QuestionsPage } from "../../pages/QuestionsPage/questionsPage";

export function QuestionsContainer({ filterValues, filterActions }) {
  const params = useParams();
  const urlSpec = params.spec || "";

  const baseUrl = "/questions";

  useEffect(() => {
    if (urlSpec !== filterValues.selectedSpec) {
      filterActions.setSelectedSpec(urlSpec);
    }
  }, [urlSpec, filterValues.selectedSpec, filterActions]);

  const currentFilters = {
    ...filterValues,
    spec: urlSpec || filterValues.selectedSpec,
  };

  const { questions, specializations, skills } = useFilters(currentFilters);

  return (
    <Outlet
      context={{ questions, specializations, skills, basePath: baseUrl }}
    />
  );
}
