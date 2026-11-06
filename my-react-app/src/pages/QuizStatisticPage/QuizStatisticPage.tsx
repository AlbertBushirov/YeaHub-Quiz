import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks.js";

import question_image from "../../images/Question_image.png";

import "./QuizStaticPage.scss";

export function QuizStatisticPage() {
  const navigate = useNavigate();

  const questions = useAppSelector((state) => state.quizState.questions);
  const answers = useAppSelector((state) => state.quizState.answers);

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/quiz", { replace: true });
    }
  }, [questions, navigate]);

  if (questions.length === 0) {
    return null;
  }
  return (
    <main>
      <div className="DetailQuizPage">
        <button onClick={() => navigate("/quiz")}>Назад</button>
        <div>
          <h1>Список пройденных вопросов собеседования</h1>
          <ul className="DetailQuizPage__list">
            {questions.map((question) => {
              const currentAnswer = answers.find(
                (answer) => answer.questionId === question?.id,
              );
              return (
                <li key={question.id} className="DetailQuizPage__item">
                  {question.imageSrc !== null ? (
                    <img src={question.imageSrc} alt="" />
                  ) : (
                    <img src={question_image} alt="" />
                  )}
                  <div className="DetailQuizPage__item__info">
                    <h3>{question.title}</h3>
                    <div>
                      {currentAnswer?.answer === "KNOWN" ? (
                        <span>Знаю</span>
                      ) : (
                        <span>Не знаю</span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
