import type { FilterProps, FilterBlock } from "@/types/Filter.js";

import { type ChangeEvent } from "react";

import { ListButtons } from "../ListButtons/listButtons.js";

import {
  levelsConfig,
  ratingConfig,
  statusConfig,
  acces,
} from "@/data/filterData.js";

import "./filter.scss";

export function Filter({
  basePath,
  values,
  actions,
  data,
  setTitle,
  exclude = [],
  selectedAccess,
  setSelectedAccess,
}: FilterProps) {
  const {
    keywords,
    selectedSpec,
    selectedSkill,
    selectedLevels,
    selectedRating,
  } = values;
  const {
    setKeywords,
    setSelectedSpec,
    setSelectedSkill,
    setSelectedLevels,
    setSelectedRating,
  } = actions;
  const { specializations, skills } = data;

  // Хелпер для проверки, нужно ли рендерить блок
  const shouldRender = (blockName: FilterBlock) => !exclude.includes(blockName);

  return (
    <aside className="filter">
      {shouldRender("search") && setKeywords && (
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Введите вопрос..."
          value={keywords ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setKeywords(e.target.value)
          }
        />
      )}

      {shouldRender("specialization") && (
        <ListButtons
          basePath={basePath}
          name="Специализация"
          title="slug"
          buttons={specializations}
          selected={selectedSpec}
          setSelected={setSelectedSpec}
          setTitle={setTitle}
        />
      )}

      {shouldRender("skills") && (
        <ListButtons
          name="Навыки"
          title="title"
          buttons={skills}
          selected={selectedSkill}
          setSelected={setSelectedSkill}
        />
      )}

      {shouldRender("levels") && (
        <ListButtons
          name="Уровень сложности"
          title="id"
          buttons={levelsConfig}
          selected={selectedLevels}
          setSelected={setSelectedLevels}
        />
      )}

      {shouldRender("rating") && (
        <ListButtons
          name="Рейтинг"
          title="title"
          buttons={ratingConfig}
          selected={selectedRating}
          setSelected={setSelectedRating}
        />
      )}

      {shouldRender("status") && (
        <ListButtons name="Статус" title="title" buttons={statusConfig} />
      )}

      {shouldRender("acces") && (
        <ListButtons
          name="Доступ"
          buttons={acces}
          title="title"
          selected={selectedAccess}
          setSelected={setSelectedAccess}
        />
      )}
    </aside>
  );
}
