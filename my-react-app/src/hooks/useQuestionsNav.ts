import type { Question } from "@/types/question.js";

export const useQuestionNav = (questions: Question[], questionId: number) => {
  const currentQuestionId = Number(questionId);

  const questionIds = questions.map((question) => question.id);

  const currentIndex = questionIds.findIndex((id) => id === currentQuestionId);

  const isPrevDisabled = currentIndex <= 0;

  const isNextDisabled =
    currentIndex === -1 || currentIndex >= questionIds.length - 1;

  const prevQuestionId =
    currentIndex > 0 ? (questionIds[currentIndex - 1] ?? null) : null;

  const nextQuestionId =
    currentIndex >= 0 && currentIndex < questionIds.length - 1
      ? (questionIds[currentIndex + 1] ?? null)
      : null;

  return {
    isPrevDisabled,
    isNextDisabled,

    prevQuestionId,
    nextQuestionId,
    currentIndex,
  };
};
