import { baseApi } from "./baseApi.js";
import type { QuizParams, QuizResponse } from "../../types/quiz.js";
import type { Question } from "../../types/question.js";

const enhancedBaseApi = baseApi.enhanceEndpoints({
  addTagTypes: ["QuizQuestions"],
});

export const quizApi = enhancedBaseApi.injectEndpoints({
  overrideExisting: true,
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

      providesTags: ["QuizQuestions"],
    }),

    resetQuizCache: builder.mutation<void, void>({
      queryFn: () => ({ data: undefined }),

      invalidatesTags: ["QuizQuestions"],
    }),
  }),
});

export const { useGetQuizQuestionsQuery, useResetQuizCacheMutation } = quizApi;
