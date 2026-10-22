import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useFormContext, useWatch } from "react-hook-form";

import { useCheckUrlParam } from "@/hooks/useCheckUrlParam.js";

import type { PropsListButtons, ButtonItem } from "@/types/ListButtons.js";

const toggleParamArray = (currentArray: number[], id: number): number[] => {
  const numericId = Number(id);
  return currentArray.includes(numericId)
    ? currentArray.filter((item) => item !== numericId)
    : [...currentArray, numericId];
};

export function ListButtons({
  name,
  title: buttonTitleProp = "title",
  buttons,
  setSelected,
  setTitle,
  selected,
  basePath,
}: PropsListButtons) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const { setValue, control } = useFormContext();

  const formValues = useWatch({ control });

  const allData = Array.isArray(buttons) ? buttons : buttons?.data || [];
  const displayedData = isExpanded ? allData : allData.slice(0, 9);

  const isQuizPage = location.pathname.includes("/quiz");

  const handleButtonClick = (item: any) => {
    if (!isQuizPage) return;

    const itemId = Number(item.id);

    if (name === "Специализация") {
      setValue("specialization", itemId);
    }

    if (name === "Навыки") {
      const currentSkills = (formValues.skills as number[]) || [];
      setValue("skills", toggleParamArray(currentSkills, itemId));
    }

    if (name === "Сложность") {
      const currentComplexity = (formValues.complexity as number[]) || [];
      setValue("complexity", toggleParamArray(currentComplexity, itemId));
    }
  };

  return (
    <div>
      <span>{name}</span>
      <ul>
        {buttonTitleProp === "title" &&
          (displayedData as ButtonItem[]).map((s) => {
            let isSpecActive = false;

            if (isQuizPage && formValues) {
              if (name === "Специализация") {
                isSpecActive =
                  Number(formValues.specialization) === Number(s.id);
              } else if (name === "Навыки") {
                isSpecActive = ((formValues.skills as number[]) || []).includes(
                  Number(s.id),
                );
              } else if (name === "Сложность") {
                isSpecActive = (
                  (formValues.complexity as number[]) || []
                ).includes(Number(s.id));
              }
            }
            if (name === "Специализация") {
              isSpecActive = useCheckUrlParam("specialization", s.id);
              if (isQuizPage) {
                return (
                  <li key={s.id || s.slug}>
                    <button
                      type="button"
                      className={isSpecActive ? "btn-active" : "btn-default"}
                      onClick={() => {
                        handleButtonClick(s);
                      }}
                    >
                      {s.title}
                    </button>
                  </li>
                );
              }

              return (
                <li key={s.id || s.slug}>
                  <NavLink
                    to={`${basePath}/${encodeURIComponent(s.slug ?? "")}`}
                    className={isSpecActive ? "btn-active" : "btn-default"}
                    onClick={() => {
                      if (setTitle) setTitle(s.buttonTitleProp);
                    }}
                  >
                    {s.title}
                  </NavLink>
                </li>
              );
            }
            if (name === "Навыки") {
              isSpecActive = useCheckUrlParam("skills", s.id);
            }

            if (name === "Сложность") {
              isSpecActive = useCheckUrlParam("complexity", s.id);
            }

            return (
              <li key={s.id || s.title}>
                <button
                  type="button"
                  className={isSpecActive ? "btn-active" : "btn-default"}
                  onClick={(e) => {
                    if (isQuizPage) {
                      e.preventDefault();
                      handleButtonClick(s);
                    } else if (setSelected && buttonTitleProp) {
                      setSelected(s[buttonTitleProp]);
                    }
                  }}
                >
                  {s.title}
                </button>
              </li>
            );
          })}

        {buttonTitleProp === "none" &&
          (displayedData as string[]).map((s, index) => (
            <li key={index}>
              <button
                type="button"
                className="btn-default"
                onClick={() =>
                  isQuizPage && handleButtonClick({ title: String(s), id: s })
                }
              >
                {`#${s}`}
              </button>
            </li>
          ))}
      </ul>

      {allData.length > 5 && (
        <a
          className="navigation_link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Скрыть" : "Посмотреть все"}
        </a>
      )}
    </div>
  );
}
