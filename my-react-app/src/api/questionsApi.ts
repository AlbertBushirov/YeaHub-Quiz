import BASE_URL from "@/api/url.js";

import type { QuestionResponse } from "@/types/question.js";

interface PropsCollections {
  pageNumber: number;
  keywords?: string;
  selectedSpec?: string | null;
  selectedSkill?: string | null;
  selectedLevels?: string | number | null;
  selectedRating?: string | number | null;
}

export const getPublicQuestions = async (
  params: PropsCollections & { limit?: number },
): Promise<QuestionResponse> => {
  const {
    pageNumber,
    limit,
    keywords,
    selectedSpec,
    selectedSkill,
    selectedLevels,
    selectedRating,
  } = params;

  const currentLimit = limit ?? 10;

  let url = `${BASE_URL}questions/public-questions?page=${pageNumber}&limit=${currentLimit}`;

  if (keywords?.trim()) {
    url += `&keywords=${encodeURIComponent(keywords)}`;
  }

  if (selectedSpec) {
    url += `&specializationSlug=${selectedSpec}`;
  }

  if (selectedSkill) {
    url += `&skillFilterMode[]=${selectedSkill}`;
  }

  if (selectedLevels) {
    url += `&complexity[]=${selectedLevels}`;
  }

  if (selectedRating) {
    url += `&rate[]=${selectedRating}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: не удалось загрузить вопросы`);
  }

  return response.json();
};
