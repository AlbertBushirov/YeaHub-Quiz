import { CatalogPagination } from "../../components/CatalogPagination/CatalogPagination";
import { QuestionsList } from "../../components/QuestionsList/questionsList";
import { Filter } from "../../components/filter/filter";
import { HeaderList } from "../../components/HeaderList/HeaderList";

import { useOutletContext, useParams } from "react-router-dom";

export function QuestionsPage({
  pageNumber,
  setPageNumber,
  values,
  actions,
  title,
  setTitle,
}) {
  const { spec } = useParams();

  const { questions, specializations, skills, basePath } = useOutletContext();

  return (
    <>
      <main>
        <div className="main_list">
          <HeaderList title={`Вопросы ${title}`} />
          <QuestionsList spec={spec} questions={questions} />
          <CatalogPagination
            page={pageNumber}
            total={24}
            onChange={setPageNumber}
          />
        </div>
        <Filter
          basePath={basePath}
          values={values}
          actions={actions}
          data={{ specializations, skills }}
          setTitle={setTitle}
          exclude={["rating", "acces"]}
        ></Filter>
      </main>
    </>
  );
}
