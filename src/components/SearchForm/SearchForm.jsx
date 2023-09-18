import searchIcon from "../../images/search.svg"
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__container">
          <img className="search__img" src={searchIcon} alt="лупа"></img>
          <div className="search__input-container">
            <input
              id="input-search"
              className="search__input"
              name="search"
              type="text"
              required
              placeholder="Фильм"
              autoComplete="off"
            />
            <span className="input-search-error search__input-error"></span>
          </div>
          <button type="submit" className="search__btn">Найти</button>
        </div>
        <div className="search__devider"></div>
        <div className="search__checkbox">
          <FilterCheckbox />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;