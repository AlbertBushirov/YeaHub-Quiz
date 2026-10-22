import "./App.scss";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { QuestionsContainer } from "../components/QuestionsContainer/QuestionsContainer";
import { CollectionsLayout } from "../components/CollectionsLayout/CollectionsLayout";
import { Layout } from "../components/Layout/Layout";
import { useFilterState } from "../hooks/useFilterState";

// Страницы
import { QuestionsPage } from "../pages/QuestionsPage/questionsPage";
import { DetailQuestionPage } from "../pages/DetailQuestionPage/detailQuestionPage";
import { CollectionsPage } from "../pages/CollectionsPage/CollectionsPage";
import { DetailCollectionPage } from "../pages/DetailCollectionsPage/DetailCollectionPage";
import { QuizPage } from "../pages/QuizPage/quizPage";
import { DetailQuizPage } from "../pages/DetailQuizPage/DetailQuizPage";
import { QuizStatisticPage } from "../pages/QuizStatisticPage/QuizStatisticPage";

function App() {
  const [filterValues, filterActions] = useFilterState();
  const [title, setTitle] = useState("React, JavaScript");

  const sharedProps = { filterValues, filterActions, title, setTitle };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="questions"
          element={<Navigate to="react-frontend-developer" replace />}
        />

        <Route
          path="questions/:spec"
          element={<QuestionsContainer {...sharedProps} />}
        >
          <Route
            index
            element={
              <QuestionsPage
                pageNumber={filterValues.pageNumber}
                setPageNumber={filterActions.setPageNumber}
                values={filterValues}
                actions={filterActions}
                title={title}
                setTitle={setTitle}
              />
            }
          />

          <Route
            path=":title"
            element={
              <DetailQuestionPage actions={filterActions} setTitle={setTitle} />
            }
          />
        </Route>

        <Route
          path="collections"
          element={<Navigate to="react-frontend-developer" replace />}
        />

        <Route
          path="collections/:spec"
          element={<CollectionsLayout {...sharedProps} />}
        >
          <Route
            index
            element={
              <CollectionsPage
                pageNumber={filterValues.pageNumber}
                setPageNumber={filterActions.setPageNumber}
                values={filterValues}
                actions={filterActions}
              />
            }
          />
          <Route
            path=":spec"
            element={<DetailCollectionPage title={title} setTitle={setTitle} />}
          />
        </Route>
        <Route path="quiz" element={<QuizPage />}></Route>
        <Route path="quiz/questions" element={<DetailQuizPage />} />
        <Route path="quiz/statistic" element={<QuizStatisticPage />} />
      </Route>
    </Routes>
  );
}

export default App;
