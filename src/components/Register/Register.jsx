import Form from "../Form/Form";
import "../Form/Form.css";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidation";
import { REGEXP_EMAIL, REGEXP_NAME } from "../../utils/constants";

function Register({ onRegister }) {
  const { values, errors, isValid, handleChange } = useFormValidation();

  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = values;
    onRegister(name, email, password);
  }

  return (
    <section className="auth">
      <Form
        name="register"
        title="Добро пожаловать!"
        onSubmit={handleRegisterSubmit}
        isValid={isValid}
      >
        <div className="auth__inputs">
          <label className="auth__item auth__text">
            Имя
            <input
              className="auth__input"
              name="name"
              type="name"
              id="input-name"
              placeholder="Введите имя"
              minLength="2"
              maxLength="30"
              required
              pattern={REGEXP_NAME}
              onChange={handleChange}
              value={values.name || ""}
              autoComplete="off"
            />
            <span className="input-name-error auth__error">{errors.name}</span>
          </label>
          <label className="auth__item auth__text">
            Email
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
              type="password"
              id="input-password"
              name="password"
              placeholder="Введите Пароль"
              minLength="8"
              maxLength="16"
              required
              onChange={handleChange}
              value={values.password || ""}
              autoComplete="off"
            />
            <span className="input-password-error auth__error" type="text">
              {errors.password}
            </span>
          </label>
        </div>
        <div className="auth__container">
          <span className="auth__error auth__error_type_api" type="text"></span>
          <button
            type="submit"
            className="auth__btn"
            disabled={isValid ? false : true}
          >
            Зарегистрироваться
          </button>
          <p className="auth__redirect-text">
            Уже зарегистрированы?&nbsp;
            <Link to="/signin" className="auth__redirect-link">
              Войти
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
}

export default Register;
