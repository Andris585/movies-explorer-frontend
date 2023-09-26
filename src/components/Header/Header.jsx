import headerLogo from "../../images/logo.svg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import NavAuth from "../NavAuth/NavAuth";
import Navigation from "../Navigation/Navigation";


function Header({ isLoggedIn }) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== "/" ? "" : "header_type_login"}`}>
      <Link to="/" className="header__link">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
      </Link>
      {isLoggedIn ? <Navigation /> : <NavAuth />}
    </header>
  );
};

export default Header;
