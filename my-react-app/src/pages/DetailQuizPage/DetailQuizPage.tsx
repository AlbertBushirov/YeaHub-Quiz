import { useNavigate } from "react-router-dom";

import { useDetailQuizPage } from "@/hooks/useDetailQuizPage.js";

import "./DetailQuizPage.scss";

export function DetailQuizPage() {
  const {
    currentQuestion,
    isQuizQuestionsLoading, // В хуке мы объединили isLoading и isFetching
    isQuizQuestionsError,
    handlePrevQuestion,
    handleNextQuestion,
    isPrevDisabled,
    isNextDisabled,
    currentQuestionCount,
    questions,
    openAnswer,
    setOpenAnswer,
    answerRef,
    heightAnswer,
    handleAnswerKnown,
    handleAnswerUnknown,
    currentAnswer,
  } = useDetailQuizPage();

  const navigate = useNavigate();

  if (isQuizQuestionsLoading) {
    return (
      <main>
        <div className="quiz-loader">
          <p>Загрузка вопросов квиза...</p>
        </div>
      </main>
    );
  }

  if (isQuizQuestionsError) {
    return (
      <main>
        <div className="quiz-error-container">
          <h2>Упс! Что-то пошло не так</h2>
          <p>
            Не удалось загрузить вопросы. Возможно, выбрана несовместимая
            комбинация фильтров или произошел сбой сети.
          </p>
          <button onClick={() => window.history.back()}>
            Вернуться к настройкам
          </button>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main>
        <div className="quiz-empty-container">
          <p>Вопросы по данным критериям не найдены.</p>
          <button onClick={() => window.history.back()}>
            Изменить настройки
          </button>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main>
        <div className="quiz-empty-container">
          <p>Ошибка отображения текущего вопроса.</p>
        </div>
      </main>
    );
  }

  const isFinishDisabled =
    !isNextDisabled || currentAnswer?.answer === undefined;

  return (
    <main>
      <div className="DetailQuizPage">
        <div>
          <p>
            Вопросы собеседования {currentQuestionCount} / {questions.length}
          </p>
        </div>
        <div className="DetailQuizPage__navigation">
          <button onClick={handlePrevQuestion} disabled={isPrevDisabled}>
            Назад
          </button>
          <button onClick={handleNextQuestion} disabled={isNextDisabled}>
            Далее
          </button>
        </div>
        <div className="DetailQuizPage__question">
          <h2>{currentQuestion.title}</h2>
          <button onClick={() => setOpenAnswer(!openAnswer)}>
            {openAnswer ? "Скрыть ответ" : "Посмотреть ответ"}
          </button>

          <div
            ref={answerRef}
            style={{
              height: `${heightAnswer}px`,
              overflow: "hidden",
              transition: "height 0.3s ease-in-out",
            }}
          >
            <div
              className="short-answer-text"
              dangerouslySetInnerHTML={{
                __html: currentQuestion.shortAnswer ?? "",
              }}
            />
          </div>
        </div>
        <div className="DetailQuizPage__button_KNOWN">
          <button
            onClick={handleAnswerKnown}
            className={currentAnswer?.answer === "KNOWN" ? "active" : ""}
          >
            Знаю
          </button>
          <button
            onClick={handleAnswerUnknown}
            className={currentAnswer?.answer === "UNKNOWN" ? "active" : ""}
          >
            Не знаю
          </button>
        </div>
        {currentQuestion?.imageSrc && (
          <img src={currentQuestion.imageSrc} alt="" />
        )}
        <hr />
        <div className="DetailQuizPage__end">
          <button
            disabled={isFinishDisabled}
            onClick={() => navigate("/quiz/statistic")}
          >
            Завершить
          </button>
        </div>
      </div>
    </main>
  );
}
