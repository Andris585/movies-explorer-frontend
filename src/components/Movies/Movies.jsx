import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
  isLoading,
  submitSearch,
  movies,
  handleCheckboxClick,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
  checkbox,
  message,
  errorMessage,
  searchSuccess,
}) {

  return (
    <section className="movies">
      <SearchForm
        onSubmit={submitSearch}
        handleCheckboxClick={handleCheckboxClick}
        checkbox={checkbox}
      />
      {isLoading ? (
        <Preloader />
      ) : searchSuccess ? (
        <MoviesCardList
          movies={movies}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
        />
      ) : (
        <span className="movies__search-error">
          {errorMessage || message}
        </span>
      )}
    </section>
  );
}

export default Movies;
