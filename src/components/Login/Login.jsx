import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "../Form/Form.css";
import { useFormValidation } from "../../hooks/useFormValidation";
import { REGEXP_EMAIL } from "../../utils/constants";

function Login({ onLogin, isDisabled }) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  function disableSubmit(){
    document.querySelector(".auth__btn").setAttribute("disabled", "true");
  }

  let notEmpty = false;

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    notEmpty = document.querySelector(".auth__form").checkValidity();
    if (notEmpty === true) {
      disableSubmit();
      const { email, password } = values;
      onLogin(email, password);
      notEmpty = false;
    }
    else {
      return;
    }
  }

  return (
    <section className="auth">
      <Form
        name="login"
        title="Рады видеть!"
        onSubmit={handleLoginSubmit}
        isValid={isValid}
      >
        <div className="auth__inputs">
          <label className="auth__item auth__text">
            E-mail
            <input
              className="auth__input"
              name="email"
              type="email"
              id="input-email"
              placeholder="Введите E-mail"
              minLength="8"
              required
              pattern={REGEXP_EMAIL}
              onChange={handleChange}
              value={values.email || ""}
              autoComplete="off"
              disabled={isDisabled}
            />
            <span className="input-email-error auth__error" type="text">
              {errors.email}
            </span>
          </label>
          <label className="auth__item auth__text">
            Пароль
            <input
              className={`auth__input ${
                errors.password ? "auth__input_type_red" : ""
              }`}
              name="password"
              type="password"
              id="input-password"
              placeholder="Введите Пароль"
              minLength="8"
              maxLength="16"
              required
              onChange={handleChange}
              value={values.password || ""}
              autoComplete="off"
              disabled={isDisabled}
            />
            <span className="input-password-error auth__error" type="text">
              {errors.password}
            </span>
          </label>
        </div>
        <div className="auth__container auth__container_type_login">
          <button
            type="submit"
            className={`auth__btn ${isValid ? "" : "auth__btn_disabled"}`}
            disabled={!isValid}
          >
            Войти
          </button>
          <p className="auth__redirect-text">
            Еще не зарегистрированы?&nbsp;&nbsp;
            <Link to="/signup" className="auth__redirect-link">
              Регистрация
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
}

export default Login;
