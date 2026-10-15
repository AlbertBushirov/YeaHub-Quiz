import { useSkills } from "@/hooks/useSkills.js";
import { ListButtons } from "@/components/Quiz/ListButtons/listButtons.js";

export function Skills() {
  const { skills: skills, isSkillsLoading, isSkillsError } = useSkills();

  if (isSkillsLoading) return <div>Загрузка навыков...</div>;
  if (isSkillsError) return <div>Ошибка при загрузке данных с сервера</div>;

  if (!Array.isArray(skills) || skills.length === 0) {
    return <div>Навыки не найдены</div>;
  }
  return (
    <ListButtons name="Навыки" title="title" buttons={skills}></ListButtons>
  );
}
