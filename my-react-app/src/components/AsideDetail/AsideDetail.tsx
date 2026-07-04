import { ListButtons } from "@/components/ListButtons/listButtons.js";

import type { CollectionSpecialization } from "@/types/collections.js";

type AsideBlock =
  | "search"
  | "specialization"
  | "skills"
  | "levels"
  | "rating"
  | "status"
  | "acces"
  | "isFree"
  | "company"
  | "questions";

type Detailprops = {
  id: number;
  title: string;
  slug: string;
  rate?: number;
  complexity?: number;
  questionSkills?: [];
  keywords?: string[];
  specializations?: CollectionSpecialization[];
  isFree?: boolean;
  questionsCount?: number;
};

type AsideDetailprops = {
  data: Detailprops;
  exclude?: AsideBlock[];
};

export function AsideDetail({ data, exclude = [] }: AsideDetailprops) {
  const shouldRender = (blockName: AsideBlock) => !exclude.includes(blockName);

  return (
    <aside className="filter">
      {shouldRender("levels") && (
        <>
          <span>Уровень</span>
          <ul className="description__params">
            <span>Рейтинг: {data.rate}</span>
            <span>Сложность: {data.complexity}</span>
          </ul>
        </>
      )}
      {shouldRender("specialization") && (
        <ListButtons
          name="Специализация:"
          title="title"
          buttons={data.specializations}
        />
      )}

      {shouldRender("isFree") && (
        <div>
          <span>Доступ</span>
          {data.isFree ? (
            <li>
              <button className="btn-default">Для всех</button>
            </li>
          ) : (
            <li>
              <button className="btn-default">Для участников</button>
            </li>
          )}
        </div>
      )}
      {shouldRender("company") && (
        <div>
          <span>Компания</span>
          <li>
            <button className="btn-default">{data.title}</button>
          </li>
        </div>
      )}
      {shouldRender("questions") && (
        <div>
          <span>Количество вопросов</span>
          <li>
            <button className="btn-default">{data.questionsCount}</button>
          </li>
        </div>
      )}

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
