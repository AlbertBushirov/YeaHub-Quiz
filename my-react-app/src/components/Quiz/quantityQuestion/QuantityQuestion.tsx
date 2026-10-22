import { useFormContext } from "react-hook-form";
import type { QuizFormValues } from "@/pages/QuizPage/quizPage.js";
import "./QuantityQuestion.scss";

export function QuantityQuestion() {
  const { watch, setValue } = useFormContext<QuizFormValues>();
  const quizQuestionsLimit = watch("limit");

  function countDecrement() {
    if (quizQuestionsLimit <= 1) return;
    setValue("limit", quizQuestionsLimit - 1);
  }
  function countIncrement() {
    setValue("limit", quizQuestionsLimit + 1);
  }

  return (
    <div className="QuantityQuestion">
      <span>Количество вопросов</span>
      <div className="Counter_wrapper">
        <button type="button" onClick={countDecrement}>
          -
        </button>
        <span>{quizQuestionsLimit}</span>
        <button type="button" onClick={countIncrement}>
          +
        </button>
      </div>
    </div>
  );
}
