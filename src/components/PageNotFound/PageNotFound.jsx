import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();
  const getBack = () => navigate(-1);

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__text">Страница не найдена</p>
      <button className="page-not-found__btn" type="button" onClick={getBack}>Назад</button>
    </section>
  );
};

export default PageNotFound;