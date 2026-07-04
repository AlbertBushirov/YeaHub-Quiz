import { useState } from "react";

import { NavLink } from "react-router-dom";

import type { PropsListButtons, ButtonItem } from "@/types/ListButtons.js";

export function ListButtons({
  name,
  title,
  buttons,
  selected,
  setSelected,
  setTitle,
  basePath,
}: PropsListButtons) {
  const [isExpanded, setIsExpanded] = useState(false);
  const allData = Array.isArray(buttons) ? buttons : buttons?.data || [];
  const displayedData = isExpanded ? allData : allData.slice(0, 5);

  return (
    <div>
      <span>{name}</span>
      <ul>
        {title !== "none" &&
          (displayedData as ButtonItem[]).map((s) => {
            if (name === "Специализация") {
              const isSpecActive = s.slug === selected;
              return (
                <li key={s.id || s.slug}>
                  <NavLink
                    to={`${basePath}/${encodeURIComponent(s.slug ?? "")}`}
                    className={isSpecActive ? "btn-active" : "btn-default"}
                    onClick={() => {
                      if (setTitle) setTitle(String(s.title));
                    }}
                  >
                    {s.title}
                  </NavLink>
                </li>
              );
            }

            const isActive = title ? s[title] === selected : false;
            return (
              <li key={s.id || s.title}>
                <button
                  className={isActive ? "btn-active" : "btn-default"}
                  onClick={() => {
                    if (setSelected && title) setSelected(s[title]);
                  }}
                >
                  {s.title}
                </button>
              </li>
            );
          })}

        {title === "none" &&
          displayedData.map((s, index) => (
            <li key={index}>
              <button className="btn-default">{`#${s}`}</button>
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
