import { CatalogPagination } from "../../components/CatalogPagination/CatalogPagination";
import { QuestionsList } from "../../components/QuestionsList/questionsList";
import { Filter } from "../../components/Filter/filter";
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
  const total = questions ? Math.round(questions.total / 10) : 24;
  return (
    <>
      <main>
        <div className="main_list">
          <HeaderList title={`Вопросы ${title}`} />
          <QuestionsList spec={spec} questions={questions} />
          <CatalogPagination
            page={pageNumber}
            total={total}
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
