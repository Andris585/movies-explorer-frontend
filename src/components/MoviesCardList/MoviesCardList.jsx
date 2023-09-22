import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  L_WIDTH,
  M_WIDTH,
  S_WIDTH,
  XL_CARDS_AMMOUNT,
  L_CARDS_AMMOUNT,
  M_CARDS_AMMOUNT,
  S_CARDS_AMMOUNT,
  XL_ON_MORE_CARDS_AMMOUNT,
  L_ON_MORE_CARDS_AMMOUNT,
  M_ON_MORE_CARDS_AMMOUNT,
  S_ON_MORE_CARDS_AMMOUNT
} from "../../utils/constants";

  function MoviesCardList({
    movies = [],
    handleSaveMovie,
    handleDeleteMovie,
    savedMovies,
  }) {
    const { pathname } = useLocation();
    const [initialQuantity, setInitialQuantity] = useState(XL_CARDS_AMMOUNT);
    const [addCard, setAddCard] = useState(XL_ON_MORE_CARDS_AMMOUNT)
    const [width, setWidth] = useState(window.innerWidth);
  
    window.addEventListener("resize", function (e) {
      setTimeout((e) => {
        setWidth(window.innerWidth);
      }, 100);
    });
  
    function handleClickBtnMore() {
      setInitialQuantity(initialQuantity + addCard);
    }
  
    useEffect(() => {
      if (width < S_WIDTH) {
        setInitialQuantity(S_CARDS_AMMOUNT);
        setAddCard(S_ON_MORE_CARDS_AMMOUNT);
      } else if (width < M_WIDTH) {
        setInitialQuantity(M_CARDS_AMMOUNT);
        setAddCard(M_ON_MORE_CARDS_AMMOUNT);
      } else if (width < L_WIDTH) {
        setInitialQuantity(L_CARDS_AMMOUNT);
        setAddCard(L_ON_MORE_CARDS_AMMOUNT);
      }
      else {
        setInitialQuantity(XL_CARDS_AMMOUNT);
        setAddCard(XL_ON_MORE_CARDS_AMMOUNT)
      }
    }, [width]);
  
    return (
      <section className="cards">
        <div className="cards__list">
          {movies.slice(0, initialQuantity).map((movie) =>(
            <MoviesCard 
              movie={movie}
              key={movie._id || movie.id}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              movies={movies}
              savedMovies={savedMovies}
            />
            )
          )}
        </div>
        {pathname === "/movies" && initialQuantity < movies.length && (
          <button 
            className="cards__more-btn"
            type="button"
            onClick={handleClickBtnMore}
          >Еще</button>
        )}
      </section>
    );
  };
  
  export default MoviesCardList;