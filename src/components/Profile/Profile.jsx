import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <form className="profile__form">
        <h1 className="profile__title">Привет, Андрис!</h1>
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
              value="Андрис"
              disabled />
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
              value="pochta@yandex.ru"
              disabled />
          </div>
        </div>
        <div className="profile__buttons">
          <span className="profile__error" type="text"></span>
          <button type="submit" className="profile__btn-save">Сохранить</button>
          <button type="button" className="profile__btn-edit">Редактировать</button>
          <Link 
            to="/" 
            replace 
            className="profile__btn-signout"
            >
              Выйти из аккаунта
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Profile;