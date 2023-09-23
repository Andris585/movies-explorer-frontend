import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function MoviesCard({
  movie,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const imageUrl =
    pathname === "/movies"
      ? `https://api.nomoreparties.co${movie.image.url}`
      : `${movie.image}`;
  const [isSavedMovie, setIsSavedMovie] = useState(false);

  useEffect(() => {
    setIsSavedMovie(savedMovies.some((i) => i.movieId === movie.id));
  }, [savedMovies, movie.id]);

  function handleSaveMovies() {
    if (isSavedMovie) {
      handleDeleteMovie(savedMovies.filter((i) => i.movieId === movie.id)[0]);
      setIsSavedMovie(false);
    } else {
      handleSaveMovie(movie);
      setIsSavedMovie(true);
    }
  }

  function handleMovieDelition() {
    handleDeleteMovie(movie);
  }

  function countDuration() {
    const hours = Math.trunc(movie.duration / 60);
    const minutes = movie.duration % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <article className="card">
      <div className="card__element">
        <a
          className="card__trailerlink"
          href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img className="card__img" src={imageUrl} alt={movie.nameRU} />
        </a>
        <div className="card__info">
          <h2 className="card__title">{movie.nameRU}</h2>
          {pathname === "/movies" ? (
            <button
              className={`card__btn-like ${
                isSavedMovie ? "card__btn-like_type_active" : ""
              }`}
              onClick={handleSaveMovies}
              type="button"
            ></button>
          ) : (
            <button
              className="card__btn-delete"
              onClick={handleMovieDelition}
              type="button"
            ></button>
          )}
        </div>
        <p className="card__duration">{countDuration()}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
