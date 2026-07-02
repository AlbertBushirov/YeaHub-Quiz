import { ListButtons } from "@/components/ListButtons/listButtons.js";

import type { FilterBlock } from "@/types/Filter.js";

type Detailprops = {
  id: number;
  title: string;
  slug: string;
  rate: number;
  complexity: number;
  questionSkills: [];
  keywords: string[];
};

type AsideDetailprops = {
  data: Detailprops;
  exclude?: FilterBlock[];
};

export function AsideDetail({ data, exclude = [] }: AsideDetailprops) {
  const shouldRender = (blockName: FilterBlock) => !exclude.includes(blockName);

  return (
    <aside className="filter">
      <span>Уровень</span>
      <ul className="description__params">
        <span>Рейтинг: {data.rate}</span>
        <span>Сложность: {data.complexity}</span>
      </ul>
      {shouldRender("skills") && (
        <ListButtons
          name="Навыки:"
          title="title"
          buttons={data.questionSkills}
        />
      )}
      <ListButtons
        name="Ключевые слова:"
        title="none"
        buttons={data.keywords}
      />
    </aside>
  );
}
