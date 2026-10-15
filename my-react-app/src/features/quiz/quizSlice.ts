import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "@/types/question.js";
import type { QuizParams } from "@/types/quiz.js";
import type { QuizFormValues } from "@/pages/QuizPage/quizPage.js";

type QuizAnswerStatus = "KNOWN" | "UNKNOWN";

export interface QuizAnswer {
  questionId: number;
  questionTitle: string;
  answer: QuizAnswerStatus;
}

export interface QuizState {
  params: QuizParams;
  questions: Question[];
  currentQuestionId: number | null;
  answers: QuizAnswer[];
  isReadyToFetch: boolean;
}

const initialState: QuizState = {
  params: {
    specialization: 204,
    skills: [],
    complexity: [],
    limit: 1,
  },
  questions: [],
  currentQuestionId: null,
  answers: [],
  isReadyToFetch: false,
};

const quizStateSlice = createSlice({
  name: "quizState",
  initialState,
  reducers: {
    setSpecialization(state, action: PayloadAction<number>) {
      state.params.specialization = action.payload;
    },

    toggleSkillInParams(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.params.skills.includes(id)) {
        state.params.skills = state.params.skills.filter(
          (skillId) => skillId !== id,
        );
      } else {
        state.params.skills.push(id);
      }
    },
    // Установка сложности
    setComplexity(state, action: PayloadAction<number[]>) {
      state.params.complexity = action.payload;
    },
    // Экшен для кнопки "Начать"
    setQuizParams(state, action: PayloadAction<QuizFormValues>) {
      state.params = action.payload;

      state.questions = [];
      state.currentQuestionId = null;
      state.answers = [];
    },
    // Запись вопросов от сервера
    setQuestions(state, action: PayloadAction<any[]>) {
      state.questions = action.payload;
    },
    setCurrentQuestionId(state, action: PayloadAction<number>) {
      state.currentQuestionId = action.payload;
      setQuizAnswer;
    },
    setQuizAnswer(state, action: PayloadAction<any>) {
      const existing = state.answers.find(
        (a) => a.questionId === action.payload.questionId,
      );
      if (existing) {
        existing.answer = action.payload.answer;
      } else {
        state.answers.push(action.payload);
      }
    },
  },
});

export const {
  setSpecialization,
  toggleSkillInParams,
  setComplexity,
  setQuizParams,
  setQuestions,
  setCurrentQuestionId,
  setQuizAnswer,
} = quizStateSlice.actions;

export default quizStateSlice.reducer;
