import { BackButton } from "@/components/BackButton/BackButton.js";
import { AsideDetail } from "@/components/AsideDetail/AsideDetail.js";
import { HeaderList } from "@/components/HeaderList/HeaderList.js";
import { CollectionQuestionsContent } from "@/components/CollectionsContent/CollectionsContent.js";
import { CollectionHeader } from "@/components/CollectionHeader/CollectionHeader.js";

import { useDetailCollection } from "@/hooks/useDetailCollection.js";

import "./DetailCollectionPage.scss";

type DetailCollectionPageprops = {
  title: string;
  setTitle: (title: string) => void;
};

export function DetailCollectionPage({
  title,
  setTitle,
}: DetailCollectionPageprops) {
  const { collection, questions, specializationSlug, handleClose } =
    useDetailCollection(setTitle);

  if (!collection) {
    return (
      <main>
        <BackButton onClick={handleClose} />
        <div>Коллекция не найдена или загружается...</div>
      </main>
    );
  }
  return (
    <main>
      <BackButton onClick={handleClose} />

      <div className="detail_collection">
        <CollectionHeader
          imageSrc={collection.imageSrc}
          title={collection.title}
          description={collection.description}
        />

        <div className="main_list">
          <HeaderList title={`Вопросы ${title}`} />
          <CollectionQuestionsContent
            isFree={collection.isFree}
            questionsCount={collection.questionsCount}
            questions={questions}
            specializationSlug={specializationSlug}
          />
        </div>
      </div>

      <AsideDetail data={collection} exclude={["skills", "levels"]} />
    </main>
  );
}
