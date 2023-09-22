import { Link } from "react-router-dom";
import "./Form.css";
import headerLogo from "../../images/logo.svg";

function Form({ children, name, title, onSubmit }) {

  return (
    <>
      <Link to="/" className="auth__link-logo">
        <img className="auth__img" src={headerLogo} alt="Логотип" />
      </Link>
      <form className="auth__form" name={name} id={name} onSubmit={onSubmit} noValidate>
        <h2 className="auth__title">{title}</h2>
        {children}
      </form>
    </>
  );
};

export default Form;