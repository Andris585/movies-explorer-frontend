import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "../Form/Form.css";
import { useFormValidation } from "../../hooks/useFormValidation";

function Login() {
  const {isValid} = useFormValidation();

  return (
    <section className="auth">
      <Form title="Рады видеть!" />
      <div className="auth__container auth__container_type_login">
        <span className="auth__error auth__error_type_server" type="text"></span>
        <button type="submit" className="auth__btn" disabled={isValid ? false : true}>Войти</button>
          <p className="auth__already-registered-text">
            Еще не зарегистрированы?&nbsp;
            <Link to="/signup" className="auth__already-registered-link">
              Регистрация
            </Link>
          </p>
      </div>
    </section>
  );
};

export default Login;