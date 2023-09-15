import { Link } from "react-router-dom";
import "./Form.css";
import headerLogo from "../../images/logo.svg";
import { useFormValidation } from "../../hooks/useFormValidation";

function Form(props) {
  const {values, handleChange, errors} = useFormValidation();

  return (
    <>
      <Link to="/" className="auth__link-logo">
        <img className="auth__img" src={headerLogo} alt="Логотип" />
      </Link>
      <form className="auth__form">
        <h1 className="auth__title">{props.title}</h1>
        <div className="auth__inputs">
          {props.children}
          <label className="auth__item">
            <p className="auth__text">E-mail</p>
            <input
              id="input-email"
              className="auth__input"
              name="email"
              type="email"
              placeholder="Введите E-mail"
              minLength="8"
              required
              onChange={handleChange}
              value={values.email || ""}
            />
            <span className="input-email-error auth__error" type="text">{errors.email}</span>
          </label>
          <label className="auth__item">
            <p className="auth__text">Пароль</p>
            <input
              className={`auth__input ${errors.password ? 'auth__input_type_red' : ''}`}
              id="input-password"
              name="password"
              type="password"
              placeholder="Введите Пароль"
              minLength="8"
              maxLength="16"
              required
              onChange={handleChange}
              value={values.password || ""}
            />
            <span className="input-password-error auth__error" type="text">{errors.password}</span>
          </label>
        </div>
      </form></>
  );
};

export default Form;