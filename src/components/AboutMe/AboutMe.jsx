import "./AboutMe.css";
import avatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Андрис</h3>
          <p className="about-me__job">Фронтенд-разработчик, 34 года</p>
          <p className="about-me__description">
            Я родился и живу в Москве, закончил экологический факультет РУДН. У меня есть жена 
            и сын. Я люблю слушать музыку, а еще увлекаюсь баскетболом. Недавно начал кодить. С
            2017 года работал руководителем проектов по производственной безопасности. 
            После того, как пошел на курс по веб-разработке, начал руководить IT-проектами.
          </p>
          <a href="https://github.com/Andris585" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Аватар" />
      </div>
    </section>
  );
};

export default AboutMe;