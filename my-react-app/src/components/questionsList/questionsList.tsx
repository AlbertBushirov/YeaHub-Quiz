import { Link } from "react-router-dom";

import type { QuestionResponse } from "@/types/question.js";

import "./questionList.scss";

type QuestionsListprops = {
  questions: QuestionResponse;
  spec: string;
};

export function QuestionsList({ questions, spec }: QuestionsListprops) {
  return (
    <ul className="main_list__container">
      {questions?.data.map((q) => {
        return (
          <li key={q.title}>
            <details className="details">
              <summary>{q.title}</summary>
              <div className="details__params">
                <span>{`Рейтинг: ${q.rate}`}</span>
                <span>{`Сложность: ${q.complexity}`}</span>
              </div>
              <div>
                <img src={q.imageSrc} alt="" />
                <div
                  className="server-html-content"
                  dangerouslySetInnerHTML={{ __html: q.shortAnswer || "" }}
                />
              </div>
              <Link to={`/questions/${spec}/${encodeURIComponent(q.slug)}`}>
                Подробнее
              </Link>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
