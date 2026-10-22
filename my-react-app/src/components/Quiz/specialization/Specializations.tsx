import { useSpecializations } from "@/hooks/useSpecializations.js";
import { ListButtons } from "@/components/Quiz/ListButtons/listButtons.js";
import { useState } from "react";

import "./specialization.scss";

export function Specialization() {
  const { specs: specs, isSpecsLoading, isSpecsError } = useSpecializations();

  if (isSpecsLoading) return <div>Загрузка специализаций...</div>;
  if (isSpecsError) return <div>Ошибка при загрузке данных с сервера</div>;

  if (!Array.isArray(specs) || specs.length === 0) {
    return <div>Специализации не найдены</div>;
  }
  return (
    <ListButtons
      name="Специализация"
      title="title"
      buttons={specs}
    ></ListButtons>
  );
}
