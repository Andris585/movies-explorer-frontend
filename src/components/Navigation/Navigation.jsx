import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import burgerMenu from "../../images/burgerMenu.svg";
import profileIcon from "../../images/profile.svg";
import { useEffect, useState } from "react";

function Navigation() {
  const { pathname } = useLocation();
  const [isBurger, setIsBurger] = useState(false);
  const [statusBurgerMenu, setStatusBurgerMenu] = useState(false);

  function handleBurgerMenuClick() {
    setIsBurger(!isBurger);
    setStatusBurgerMenu(!statusBurgerMenu);
  };

  useEffect(() => {
    setIsBurger(false);
  }, [pathname]);

  return (
    <div className="navigation">
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <Link
              to="/movies"
              className={`navigation__link ${
                pathname !== "/movies" ? "" : "navigation__link_type_bold"
              }`}
            >
              Фильмы
            </Link>
          </li>
          <li className="navigation__list-item">
            <Link
              to="/saved-movies"
              className={`navigation__link ${
                pathname !== "/saved-movies" ? "" : "navigation__link_type_bold"
              }`}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="navigation__container">
          <Link
            to="/profile"
            className={`navigation__link ${
              pathname !== "/profile" ? "" : "navigation__link_type_bold"
            }`}
          >
            Аккаунт
            <div className="navigation__img-container">
              <img
                className="navigation__img"
                src={profileIcon}
                alt="Аккаунт"
              />
            </div>
          </Link>
        </div>
      </nav>
      <img
        className="navigation__burger-menu-btn"
        src={burgerMenu}
        alt="Меню"
        onClick={handleBurgerMenuClick}
      />

      {isBurger && (
        <>
          <div className="burger__overlay"></div>
          <div className="burger-menu">
            <button
              className="burger-menu__close-btn"
              type="button"
              onClick={handleBurgerMenuClick}
            ></button>
            <nav className="burger-menu__container">
              <ul className="burger-menu__list">
                <li className="burger-menu__list-item">
                  <Link
                    to="/"
                    className={`burger-menu__link ${
                      pathname !== "/" ? "" : "burger-menu__link_type_active"
                    }`}
                  >
                    Главная
                  </Link>
                </li>
                <li className="burger-menu__list-item">
                  <Link
                    to="/movies"
                    className={`burger-menu__link ${
                      pathname !== "/movies" ? "" : "burger-menu__link_type_active"
                    }`}
                  >
                    Фильмы
                  </Link>
                </li>
                <li className="burger-menu__list-item">
                  <Link
                    to="/saved-movies"
                    className={`burger-menu__link ${
                      pathname !== "/saved-movies"
                        ? ""
                        : "burger-menu__link_type_active"
                    }`}
                  >
                    Сохраненные фильмы
                  </Link>
                </li>
              </ul>
              <div className="burger-menu__profile-btn">
                <Link
                  to="/profile"
                  className={`burger-menu__link burger-menu__link_type_btn-profile ${
                    pathname !== "/profile" ? "" : "burger-menu__link_type_active"
                  }`}
                >
                  Аккаунт
                  <div className="burger-menu__img-container">
                    <img
                      className="burger-menu__img"
                      src={profileIcon}
                      alt="Аккаунт"
                    />
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;