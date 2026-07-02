import type { Collection } from "@/types/collections.js";

import "./KeyWords.scss";

type KeyWordsprops = {
  collection: Collection;
};

export function KeyWordsList({ collection }: KeyWordsprops) {
  return (
    <div className="keywords_container">
      {collection.keywords.map((k: string) => (
        <span key={k}>{k}</span>
      ))}
    </div>
  );
}
