import { useParams, useOutletContext, useNavigate } from "react-router-dom";

import { QuestionNavigation } from "../../components/QuestionNavigation/QuestionNavigation";
import { BackButton } from "../../components/BackButton/BackButton";
import { AsideDetail } from "../../components/AsideDetail/AsideDetail";
import { ListButtons } from "../../components/ListButtons/listButtons";

import { useQuestionNavigation } from "../../hooks/useQuestionNavigation";

import "./detailQuestionPage.scss";

export function DetailQuestionPage() {
  const { title } = useParams();
  const navigate = useNavigate();
  const { questions } = useOutletContext();

  const decodedUrlTitle = decodeURIComponent(title || "").trim();

  const currentIndex = questions?.data
    ? questions.data.findIndex((q) => String(q.slug).trim() === decodedUrlTitle)
    : -1;

  const { handlePrev, handleNext, hasPrev, hasNext } = useQuestionNavigation(
    questions?.data || [],
    currentIndex,
  );

  if (!questions || !questions.data) {
    return <div>Загрузка данных...</div>;
  }

  if (currentIndex === -1) {
    return <div>Вопрос не найден</div>;
  }

  const question = questions.data[currentIndex];

  const close = () => {
    const specSlug = question.questionSpecializations?.[0]?.slug || "";
    navigate(`/questions/${specSlug}`);
  };
  return (
    <main>
      <BackButton onClick={close} />
      <div className="detail_question">
        <div className="detail_question__title_conteiner">
          <h1>{question.title}</h1>
          <p>{question.description}</p>
        </div>

        <QuestionNavigation
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />

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
