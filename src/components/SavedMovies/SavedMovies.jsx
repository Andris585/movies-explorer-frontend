import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";

function SavedMovies({
  isLoading,
  savedMovies,
  filteredSavedMovies,
  movies,
  handleCheckboxClick,
  submitHandler,
  handleDeleteMovie,
  checkbox,
  setCheckbox,
  setSearchStr,
  resultSaveMessage,
  notFoundSaved
}) {

  useEffect(() => {
    setSearchStr("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm
        handleCheckboxClick={handleCheckboxClick}
        onSubmit={submitHandler}
        setCheckbox={setCheckbox}
        checkbox={checkbox}
      />
      {isLoading ? (
          <Preloader />
        ) : notFoundSaved ? (
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            filteredSavedMovies={filteredSavedMovies}
            handleDeleteMovie={handleDeleteMovie}
          />
        ) : (<span className="saved-movies__search-error saved-movies__search-error_margin">{resultSaveMessage}</span>)
      }
    </section>
  );
};

export default SavedMovies;