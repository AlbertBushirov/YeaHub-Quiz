import { QuestionsList } from "@/components/QuestionsList/questionsList.js";

interface CollectionQuestionsContentProps {
  isFree: boolean;
  questionsCount: number;
  questions: any;
  specializationSlug: string;
}

export function CollectionQuestionsContent({
  isFree,
  questionsCount,
  questions,
  specializationSlug,
}: CollectionQuestionsContentProps) {
  if (!isFree) {
    return <span>Доступ к вопросам только для участников Yeahub</span>;
  }

  if (questionsCount === 0) {
    return (
      <div className="no-questions-message">
        В этой коллекции пока нет вопросов.
      </div>
    );
  }

  if (questions && questions.data) {
    return <QuestionsList spec={specializationSlug} questions={questions} />;
  }

  return <div className="loading-message">Загрузка вопросов...</div>;
}
