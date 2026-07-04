import type { Collection } from "@/types/collections.js";

import "./Summary.scss";

type Summaryprops = {
  collection: Collection;
};

export function Summary({ collection }: Summaryprops) {
  const pluralize = (n: number) => {
    if (n === 1) return "вопрос";
    if (n > 1 && n < 5) return "вопроса";
    return "вопросов";
  };

  return (
    <div className="summary_container">
      {collection.isFree ? <span>Для всех</span> : <span>Для участников</span>}
      <span>{`${collection.questionsCount} ${pluralize(collection.questionsCount)}`}</span>
    </div>
  );
}
