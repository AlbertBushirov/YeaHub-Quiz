import logo from "../../images/logo.png";
import logo_Yeahub from "../../images/logo_Yeahub.png";
import { NavLink } from "react-router-dom";
import "./header.scss";

export function Header() {
  const setActive = ({ isActive }) => (isActive ? "active-link" : "");

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" end className="header__logo">
          <img src={logo} alt="logo_tree" />
          <img src={logo_Yeahub} alt="logo_Yeahub" />
        </NavLink>
        <nav className="header__nav">
          <ul>
            <li>
              <NavLink to="/questions" className={setActive}>
                База вопросов
              </NavLink>
            </li>
            <li>
              <a href="/#">Тренажёр</a>
            </li>
            <li>
              <NavLink to="/collections" className={setActive}>
                Коллекции
              </NavLink>
            </li>
            <li>
              <a href="/#">Навыки(hh)</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__buttons">
        <button>Вход</button>
        <button>Регистрация</button>
      </div>
    </header>
  );
}
