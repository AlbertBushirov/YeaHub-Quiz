import BASE_URL from "@/api/url.js";

import type { Skill } from "@/types/filters.js";

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${BASE_URL}skills`);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: не удалось загрузить навыки`);
  }

  return response.json();
};
