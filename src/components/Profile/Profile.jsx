import "./Profile.css";
import { useFormValidation } from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

function Profile({
  onLogout,
  onUpdateUserProfile,
  buttonText,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, setValues } = useFormValidation();
  const [disabledInput, setDisabledInput] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser, setValues]);

  function profileError() {
    setError("");
  }

  useEffect(() => {
    setError("");
  }, []);

  function handleProfileSubmit(evt) {
    evt.preventDefault();
    onUpdateUserProfile(values);
    setDisabledInput(true);
  }

  function handleChangeEdit(evt) {
    evt.preventDefault();
    setDisabledInput(false);
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleProfileSubmit}>
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="profile__inputs">
          <div className="profile__input-container profile__input-container_type_name">
            <p className="profile__text">Имя</p>
            <input
              id="input-name"
              className="profile__input"
              name="name"
              type="name"
              placeholder="Введите имя"
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
              onChange={handleChange}
              value={values.name || ""}
              disabled={disabledInput ? true : false}
              onFocus={profileError}
            />
          </div>
          <div className="profile__input-container profile__input-container_type_email">
            <p className="profile__text">E-mail</p>
            <input
              id="input-email"
              className="profile__input"
              name="email"
              type="email"
              placeholder="Введите E-mail"
              minLength="8"
              required
              autoComplete="off"
              onChange={handleChange}
              value={values.email || ""}
              disabled={disabledInput ? true : false}
              onFocus={profileError}
            />
          </div>
        </div>
        <div className="profile__buttons">
          <span className="profile__error" type="text">
            {error}
          </span>
          {disabledInput ? (
            <button
              type="button"
              className="profile__btn-edit"
              onClick={handleChangeEdit}
            >
              Редактировать
            </button>
          ) : (
            <button
              type="submit"
              className={`profile__btn-save ${
                !isValid ||
                (values.name === currentUser.name &&
                  values.email === currentUser.email)
                  ? "profile__btn-save_disabled"
                  : ""
              }`}
              disabled={
                !isValid ||
                (values.name === currentUser.name &&
                  values.email === currentUser.email)
              }
            >
              {buttonText}
            </button>
          )}
          <button
            type="button"
            className="profile__btn-signout"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
