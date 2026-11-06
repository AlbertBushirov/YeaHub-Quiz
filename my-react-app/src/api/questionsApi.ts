import BASE_URL from "@/api/url.js";

import type { QuestionResponse } from "@/types/question.js";

interface PropsCollections {
  pageNumber: number;
  keywords?: string;
  selectedSpec?: string | null;
  selectedSkill?: string | null;
  selectedLevels?: string | number | null;
  selectedRating?: string | number | null;
  collection?: string | number | null | undefined;
}

export const getPublicQuestionById = async (
  id: string | number,
  signal?: AbortSignal,
) => {
  const url = `${BASE_URL}questions/public-questions/${id}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: не удалось загрузить вопрос`);
  }
  return response.json();
};

export const getPublicQuestions = async (
  params: PropsCollections & {
    limit?: number;
    collection?: string | number | null | undefined;
  },
  signal?: AbortSignal,
): Promise<QuestionResponse> => {
  const {
    pageNumber,
    limit,
    keywords,
    selectedSpec,
    selectedSkill,
    selectedLevels,
    selectedRating,
    collection,
  } = params;

  const currentLimit = limit ?? 10;

  const queryParams = new URLSearchParams({
    page: String(pageNumber),
    limit: String(currentLimit),
  });

  if (keywords?.trim()) {
    queryParams.append("titleOrDescription", keywords.trim());
  }

  if (collection) {
    queryParams.append("collection", String(collection));
  }

  if (selectedSpec) {
    queryParams.append("specializations", String(selectedSpec));
  }

  if (selectedSkill) {
    queryParams.append("skills", String(selectedSkill));
  }

  if (selectedLevels === "1-3") {
    queryParams.append("difficulty", "1");
    queryParams.append("difficulty", "2");
    queryParams.append("difficulty", "3");
  } else if (selectedLevels === "4-5") {
    queryParams.append("difficulty", "4");
    queryParams.append("difficulty", "5");
  } else if (Array.isArray(selectedLevels)) {
    selectedLevels.forEach((level) =>
      queryParams.append("difficulty", String(level)),
    );
  } else if (selectedLevels) {
    queryParams.append("difficulty", String(selectedLevels));
  }

  if (Array.isArray(selectedRating)) {
    selectedRating.forEach((rate) => queryParams.append("rate", String(rate)));
  } else if (selectedRating) {
    queryParams.append("rate", String(selectedRating));
  }

  const url = `${BASE_URL}questions/public-questions?${queryParams.toString()}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: не удалось загрузить вопросы`);
  }

  return response.json();
};
