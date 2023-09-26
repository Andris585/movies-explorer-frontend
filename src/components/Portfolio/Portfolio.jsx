import "./Portfolio.css";
import arrowImage from "../../images/portfolio.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Andris585/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <img className="portfolio__img" src={arrowImage} alt="cтрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Andris585/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <img className="portfolio__img" src={arrowImage} alt="cтрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Andris585/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <img className="portfolio__img" src={arrowImage} alt="cтрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
