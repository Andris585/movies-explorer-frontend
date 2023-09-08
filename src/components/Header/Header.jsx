import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/logo.svg";
import NavAuth from "../NavAuth/NavAuth";
import Navigation from "../Navigation/Navigation";


function Header() {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== "/" ? "" : "header_type_login"}`}>
      <Link to="/" className="header__link">
        <img className="header__logo" src={headerLogo} alt="Лого" />
      </Link>
      {pathname !== "/" ? <Navigation /> : <NavAuth />}
    </header>
  );
};

export default Header;