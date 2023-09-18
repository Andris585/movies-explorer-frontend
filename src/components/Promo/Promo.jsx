import promoLogo from "../../images/promo-logo.svg";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__logo" src={promoLogo} alt="Спираль" />
      </div>
    </section>
  );
};

export default Promo;