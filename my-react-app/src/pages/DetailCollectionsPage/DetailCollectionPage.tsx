import { useParams, useOutletContext, useNavigate } from "react-router-dom";

import { BackButton } from "@/components/BackButton/BackButton.js";
import { AsideDetail } from "@/components/AsideDetail/AsideDetail.js";

import { useCollectionPage } from "@/hooks/useCollectionsPage.js";

import type { CollectionsOutletContext } from "@/components/CollectionsLayout/CollectionsLayout.js";

export function DetailCollectionPage() {
  const { title } = useParams();
  const navigate = useNavigate();

  const { collectionsData } = useOutletContext<CollectionsOutletContext>();

  const decodedUrlTitle = decodeURIComponent(title || "").trim();

  const collection = collectionsData.data.find(
    (c) => String(c.slug) === decodedUrlTitle,
  );

  const close = () => {
    navigate(-1);
  };

  if (!collection) {
    return (
      <main>
        <BackButton onClick={close} />
        <div>Коллекция не найдена</div>
      </main>
    );
  }

  return (
    <main>
      <BackButton onClick={close} />
      <div>
        <div>
          <img className="" src={collection.imageSrc} alt={collection.title} />
          <div>
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
