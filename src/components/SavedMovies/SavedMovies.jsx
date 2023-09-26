import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";

function SavedMovies({
  isLoading,
  savedMovies,
  movies,
  handleCheckboxClick,
  submitSearchSaved,
  handleDeleteMovie,
  checkbox,
  messageSaved,
  searchSuccessSaved,
  setSearchSavedStr
}) {

  useEffect(() => {
    setSearchSavedStr("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm
        handleCheckboxClick={handleCheckboxClick}
        onSubmit={submitSearchSaved}
        checkbox={checkbox}
      />
      {isLoading ? (
        <Preloader />
      ) : searchSuccessSaved ? (
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
        />
      ) : (
        <span className="saved-movies__search-error">
          {messageSaved}
        </span>
      )}
    </section>
  );
}

export default SavedMovies;
