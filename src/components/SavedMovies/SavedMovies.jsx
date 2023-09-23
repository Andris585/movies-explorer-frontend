import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

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
}) {

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
