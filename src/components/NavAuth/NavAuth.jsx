import { Link } from "react-router-dom";
import "./NavAuth.css";

function NavAuth() {
  return (
    <nav className="nav-auth">
      <ul className="nav-auth__list">
        <li className="nav-auth__list-item">
          <Link to="/signup" className="nav-auth__list-link">
            Регистрация
          </Link>
        </li>
        <li className="nav-auth__list-item">
          <Link
            to="/signin"
            className="nav-auth__list-link nav-auth__list-link_green"
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavAuth;
