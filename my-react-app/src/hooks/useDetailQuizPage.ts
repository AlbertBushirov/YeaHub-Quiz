import { useGetQuizQuestionsQuery } from "@/store/api/quizApi.js";
import { useAppDispatch, useAppSelector } from "./hooks.js";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useRef, useState } from "react";
import {
  setCurrentQuestionId,
  setQuestions,
  setQuizAnswer,
} from "../features/quiz/quizSlice.js";
import { useQuestionNav } from "./useQuestionsNav.js";

export const useDetailQuizPage = () => {
  const quizParams = useAppSelector((state) => state.quizState.params);

  const queryArgs = quizParams
    ? {
        specialization: quizParams.specialization,
        skills: quizParams.skills,
        complexity: quizParams.complexity,
        limit: quizParams.limit,
      }
    : skipToken;

  const {
    data: quizQuestions = [],
    isLoading: isQuizQuestionsLoading,
    isError: isQuizQuestionsError,
  } = useGetQuizQuestionsQuery(queryArgs);

  const dispatch = useAppDispatch();

  const questions = useAppSelector((state) => state.quizState.questions);

  const currentQuestionId = useAppSelector(
    (state) => state.quizState.currentQuestionId,
  );

  const [openAnswer, setOpenAnswer] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const [heightAnswer, setHeightAnswer] = useState(0);

  useEffect(() => {
    const firstQuestion = quizQuestions[0];
    if (quizQuestions.length > 0 && questions.length === 0 && firstQuestion) {
      dispatch(setQuestions(quizQuestions));

      dispatch(setCurrentQuestionId(firstQuestion.id));
    }
  }, [quizQuestions, questions, dispatch]);

  const currentQuestion = questions.find(
    (question) => question.id === currentQuestionId,
  );

  const answers = useAppSelector((state) => state.quizState.answers);

  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion?.id,
  );

  const {
    isPrevDisabled,
    isNextDisabled,
    prevQuestionId,
    nextQuestionId,
    currentIndex,
  } = useQuestionNav(questions, Number(currentQuestionId));
  const currentQuestionCount = currentIndex + 1;

  function handlePrevQuestion() {
    if (prevQuestionId === null) return;
    dispatch(setCurrentQuestionId(Number(prevQuestionId)));
    setOpenAnswer(false);
  }
  function handleNextQuestion() {
    if (nextQuestionId === null || currentAnswer === undefined) return;
    dispatch(setCurrentQuestionId(Number(nextQuestionId)));
    setOpenAnswer(false);
  }

  useEffect(() => {
    if (!answerRef.current) return;
    setHeightAnswer(openAnswer ? answerRef.current.scrollHeight : 0);
  }, [openAnswer]);

  function handleAnswerKnown() {
    if (!currentQuestion) return;
    dispatch(
      setQuizAnswer({
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        answer: "KNOWN",
      }),
    );
  }
  function handleAnswerUnknown() {
    if (!currentQuestion) return;
    dispatch(
      setQuizAnswer({
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        answer: "UNKNOWN",
      }),
    );
  }

  return {
    questions,
    currentQuestion,
    currentQuestionId,
    isQuizQuestionsLoading,
    isQuizQuestionsError,

    handlePrevQuestion,
    handleNextQuestion,

    isPrevDisabled,
    isNextDisabled,

    currentQuestionCount,

    openAnswer,
    answerRef,
    heightAnswer,
    setOpenAnswer,

    handleAnswerKnown,
    handleAnswerUnknown,

    answers,
    currentAnswer,

    nextQuestionId,
  };
};
