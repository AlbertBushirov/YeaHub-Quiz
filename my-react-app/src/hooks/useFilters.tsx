import { useState, useEffect } from "react";

import BASE_URL from "../api/url.js";
import { getSpecializations } from "@/api/specializationsApi.js";
import { getSkills } from "@/api/skillsApi.js";
import { getPublicQuestions } from "@/api/questionsApi.js";

import type { Specialization, Skill, Filters } from "@/types/filters.js";

import { useDeBounce } from "@/hooks/useDebounce.js";

export function useFilters(filters: Filters) {
  const [questions, setQuestions] = useState<any>(null);
  const [specializations, setSpecializations] = useState<
    Specialization[] | null
  >(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);

  const {
    pageNumber,
    selectedSpec,
    selectedSkill,
    selectedLevels,
    selectedRating,
    spec,
  } = filters;

  const limit = filters.limit ?? 10;
  const debouncedKeywords = useDeBounce(filters.keywords ?? "", 1500);

  useEffect(() => {
    const fetchDataSpecializations = async () => {
      try {
        const data = await getSpecializations();
        setSpecializations(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataSkills();
    fetchDataSpecializations();
  }, []);

  useEffect(() => {
    if (limit === 0) {
      setQuestions({ data: [], total: 0 });
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getPublicQuestions({
          pageNumber,
          limit,
          keywords: debouncedKeywords,

          selectedSpec: spec || selectedSpec,
          selectedSkill,
          selectedLevels,
          selectedRating,
        });

        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [
    pageNumber,
    debouncedKeywords,
    selectedSpec,
    spec,
    selectedSkill,
    selectedLevels,
    selectedRating,
    limit,
  ]);

  return { questions, specializations, skills };
}
