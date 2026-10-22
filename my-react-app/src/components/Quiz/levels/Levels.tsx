import { ListButtons } from "@/components/Quiz/ListButtons/listButtons.js";
import { levelsConfig } from "@/data/filterData.js";

export function Levels() {
  return (
    <ListButtons
      name="Сложность"
      title="title"
      buttons={levelsConfig}
    ></ListButtons>
  );
}
