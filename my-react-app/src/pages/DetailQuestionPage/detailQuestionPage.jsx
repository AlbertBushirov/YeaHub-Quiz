import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { QuestionNavigation } from "../../components/QuestionNavigation/QuestionNavigation";
import { BackButton } from "../../components/BackButton/BackButton";
import { AsideDetail } from "../../components/AsideDetail/AsideDetail";
import {
  getPublicQuestions,
  getPublicQuestionById,
} from "../../api/questionsApi";

import { useQuestionNavigation } from "../../hooks/useQuestionNavigation";

import "./detailQuestionPage.scss";

export function DetailQuestionPage() {
  // Возвращаем чтение title (куда попадает slug из URL)
  const { title: slug } = useParams();
  const navigate = useNavigate();

  const context = useOutletContext() || {};
  const contextQuestions = context.questions?.data || [];
  const decodedSlug = decodeURIComponent(slug || "").trim();

  const [localQuestion, setLocalQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const contextIndex = contextQuestions.findIndex(
    (q) => String(q.slug).trim() === decodedSlug,
  );
  const isFoundInContext = contextIndex !== -1;
  const question = isFoundInContext
    ? contextQuestions[contextIndex]
    : localQuestion;

  const { handlePrev, handleNext, hasPrev, hasNext } =
    typeof useQuestionNavigation === "function"
      ? useQuestionNavigation(contextQuestions, contextIndex)
      : {
          handlePrev: () => {},
          handleNext: () => {},
          hasPrev: false,
          hasNext: false,
        };

  useEffect(() => {
    if (isFoundInContext) return;

    const controller = new AbortController();

    const fetchIsolatedQuestion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getPublicQuestions(
          {
            pageNumber: 1,
            limit: 200,
            keywords: decodedSlug,
          },
          controller.signal,
        );

        const found = response.data?.find(
          (q) => String(q.slug).trim() === decodedSlug,
        );

        if (found) {
          setLocalQuestion(found);
        } else {
          setError("Вопрос не найден в базе данных");
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Не удалось загрузить данные вопроса");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (decodedSlug) {
      fetchIsolatedQuestion();
    }

    return () => controller.abort();
  }, [decodedSlug, isFoundInContext]);

  const close = () => {
    const specSlug = question?.questionSpecializations?.[0]?.slug || "";
    navigate(specSlug ? `/questions/${specSlug}` : "/questions");
  };

  if (isLoading && !question) {
    return (
      <main>
        <div className="loading-screen">Загрузка информации о вопросе...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="error-screen">{error}</div>
      </main>
    );
  }

  if (!question) {
    return (
      <main>
        <div className="not-found-screen">Вопрос не найден</div>
      </main>
    );
  }

  return (
    <main>
      <BackButton onClick={close} />
      <div className="detail_question">
        <div className="detail_question__title_conteiner">
          <h1>{question.title}</h1>
          <p>{question.description}</p>
        </div>

        {isFoundInContext && (
          <QuestionNavigation
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        )}

        <article>
          <h2>Краткий ответ</h2>
          <div
            className="server-html-content"
            dangerouslySetInnerHTML={{ __html: question.shortAnswer || "" }}
          />
        </article>
        <article>
          <h2>Развёрнутый ответ</h2>
          <div
            className="server-html-content"
            dangerouslySetInnerHTML={{ __html: question.longAnswer || "" }}
          />
        </article>
      </div>
      <AsideDetail
        data={question}
        exclude={["isFree", "specialization", "company", "questions"]}
      />
    </main>
  );
}
