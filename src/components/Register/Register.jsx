import Form from "../Form/Form";
import "../Form/Form.css";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidation";

function Register() {
  const {values, errors, isValid, handleChange} = useFormValidation();

  return (
    <section className="auth">
      <Form title="Добро пожаловать!">
        <label className="auth__item">
          <p className="auth__text">Имя</p>
          <input
            className="auth__input"
            name="name"
            type="name"
            id="input-name"
            placeholder="Введите имя"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChange}
            value={values.name || ""}
          />
          <span className="input-name-error auth__error" type="text">{errors.name}</span>
        </label>
      </Form>
      <div className="auth__container">
        <span className="auth__error auth__error_type_api" type="text"></span>
        <button type="submit" className="auth__btn" disabled={isValid ? false : true}>Зарегистрироваться</button>
          <p className="auth__already-registered-text">
            Уже зарегистрированы?&nbsp;
            <Link to="/signin" className="auth__already-registered-link">
              Войти
            </Link>
          </p>
      </div>
    </section>
  );
};

export default Register;