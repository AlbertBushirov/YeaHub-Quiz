import { useFormContext } from "react-hook-form";
import type { QuizFormValues } from "@/pages/QuizPage/quizPage.js";
import { useGetSkillsQuery } from "@/store/api/skillApi.js";

export const useSkills = () => {
  const { watch } = useFormContext<QuizFormValues>();
  const spec = watch("specialization");

  const {
    data: skills = [],
    isLoading: isSkillsLoading,
    isError: isSkillsError,
  } = useGetSkillsQuery({ spec });

  return {
    skills,
    isSkillsLoading,
    isSkillsError,
  };
};
