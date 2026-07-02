import type { Collection } from "@/types/collections.js";

import "./Summary.scss";

type Summaryprops = {
  collection: Collection;
};

export function Summary({ collection }: Summaryprops) {
  return (
    <div className="summary_container">
      {collection.isFree ? <span>Для всех</span> : <span>Для участников</span>}
      <span>{`${collection.questionsCount} вопросов`}</span>
    </div>
  );
}
