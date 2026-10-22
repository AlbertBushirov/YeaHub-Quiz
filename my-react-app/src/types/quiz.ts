import type { Question } from "./question.js";

export interface QuizParams {
  specialization: number | null;
  skills: number[];
  complexity: number[];
  limit: number;
}
export interface QuizResponse {
  questions: Question[];
  page: number;
  limit: number;
  total: number;
}
