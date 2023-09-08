import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__nav">
          <ul className="footer__list">
            <li className="footer__list-item">
                <a className="footer__link" href="https://practicum.yandex.ru/frontend-developer/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__list-item">
              <a className="footer__link" href="https://github.com/Andris585" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;