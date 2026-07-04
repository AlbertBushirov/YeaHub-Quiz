import { Link } from "react-router-dom";

import type { Collection } from "@/types/collections.js";

import { HeaderList } from "@/components/HeaderList/HeaderList.js";
import { SpecializationsList } from "@/components/SpecializationsList/SpecializationsList.js";
import { Summary } from "@/components/Summary/Summary.js";
import { KeyWordsList } from "@/components/KeyWordsList/KeyWordsList.js";

import "./CollectionsList.scss";

type CollectionListProps = {
  collections: Collection[];
  spec: string;
};

export function CollectionsList({ collections, spec }: CollectionListProps) {
  if (!collections) {
    return <div>Загрузка коллекций...</div>;
  }
  return (
    <div>
      <HeaderList title="Коллекции" />
      <div className="main_list__container">
        {collections.map((c) => (
          <Link
            to={`/collections/${spec}/${encodeURIComponent(c.slug)}`}
            className="collection_container"
            key={c.id}
          >
            <div className="collection_container__image">
              <img className="" src={c.imageSrc} alt={c.title} />
            </div>
            <div className="collection_container__info">
              <KeyWordsList collection={c} />
              <span>{c.description}</span>
              <Summary collection={c} />
              <SpecializationsList specializations={c.specializations} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
