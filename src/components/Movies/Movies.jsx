import "./Movies.css"
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies(
  {
    isLoading,
    submitSearch,
    renderMovies,
    handleCheckboxClick,
    handleSaveMovie,
    handleDeleteMovie,
    savedMovies,
    checkbox,
    setCheckbox,
    resultMessage,
    resultErrorMessage,
    notFound
  }
) {
  return (
    <section className="movies">
      <SearchForm
        onSubmit={submitSearch}
        handleCheckboxClick={handleCheckboxClick}
        setCheckbox={setCheckbox}
        checkbox={checkbox}
      />
      {isLoading ? (
          <Preloader />
        ) : notFound ? (
          <MoviesCardList
            movies={renderMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
          />
      ) : (<span className="movies__search-error movies__search-error_margin">{resultErrorMessage || resultMessage}</span>)
    }
    </section>
  );
};

export default Movies;