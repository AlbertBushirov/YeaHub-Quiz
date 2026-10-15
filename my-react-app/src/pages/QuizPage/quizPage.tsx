import { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Specialization } from "@/components/Quiz/specialization/Specializations.js";
import { useNavigate, useSearchParams } from "react-router-dom";

//Компоненты
import { Skills } from "@/components/Quiz/categoryQuestion/Skills.js";
import { Levels } from "@/components/Quiz/levels/Levels.js";
import { QuantityQuestion } from "@/components/Quiz/quantityQuestion/QuantityQuestion.js";

import { setQuizParams } from "@/features/quiz/quizSlice.js";

import "./quizPage.scss";

export interface QuizFormValues {
  specialization: number;
  skills: number[];
  complexity: number[];
  limit: number;
}

export function QuizPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const methods = useForm<QuizFormValues>({
    defaultValues: {
      specialization: Number(searchParams.get("specialization") ?? 11),
      skills: searchParams.get("skills")?.split(",").map(Number) ?? [],
      complexity: searchParams.get("complexity")?.split(",").map(Number) ?? [],
      limit: Number(searchParams.get("limit") ?? 1),
    },
  });

  const [specialization, skills = [], complexity = [], limit] = useWatch({
    control: methods.control,
    name: ["specialization", "skills", "complexity", "limit"],
  });

  const skillsString = skills?.join(",") || "";
  const complexityString = complexity?.join(",") || "";

  useEffect(() => {
    const params = new URLSearchParams();

    if (specialization !== null && !isNaN(specialization)) {
      params.set("specialization", String(specialization));
    }

    if (skillsString) {
      params.set("skills", skillsString);
    }

    if (complexityString) {
      params.set("complexity", complexityString);
    }

    if (limit && limit >= 1) {
      params.set("limit", String(limit));
    }

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [
    specialization,
    skillsString,
    complexityString,
    limit,
    setSearchParams,
    searchParams,
  ]);

  const onSubmit = (data: QuizFormValues) => {
    dispatch(setQuizParams(data));
    navigate("/quiz/questions", {
      state: data,
    });
  };

  return (
    <main>
      <div className="QuizPage">
        <h1>Собеседование</h1>

        <FormProvider {...methods}>
          <form
            className="QuizPage__category"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="QuizPage__category__leftColon">
              <Specialization />
              <Skills />
            </div>
            <div>
              <Levels />
              <QuantityQuestion />
              <button type="submit">Начать</button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
