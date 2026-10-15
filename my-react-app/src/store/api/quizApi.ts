import { baseApi } from "./baseApi.js";
import type { QuizParams, QuizResponse } from "../../types/quiz.js";
import type { Question } from "../../types/question.js";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuizQuestions: builder.query<Question[], QuizParams>({
      query: ({ specialization, skills, complexity, limit }) => ({
        url: "interview-preparation/quizzes/mock/new",
        params: {
          ...(specialization && { specialization: specialization }),
          ...(skills.length > 0 && {
            skills: skills.join(","),
          }),
          ...(complexity.length > 0 && {
            complexity: complexity.join(","),
          }),
          ...(limit && { limit: limit }),
        },
      }),
      transformResponse: (response: QuizResponse) => response.questions,
    }),
  }),
});
export const { useGetQuizQuestionsQuery } = quizApi;
