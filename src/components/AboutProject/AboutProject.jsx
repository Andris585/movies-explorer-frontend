import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__container">
        <div className="project__info">
          <h3 className="project__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__info">
          <h3 className="project__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__container project__container_type_timeline">
        <div className="project__time project__time_type_green">
          <h4 className="project__time-title project__time-title_green-bar">
            1 неделя
          </h4>
          <p className="project__time-text">Back-end</p>
        </div>
        <div className="project__time project__time_type_grey">
          <h4 className="project__time-title project__time-title_grey-bar">
            4 недели
          </h4>
          <p className="project__time-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
