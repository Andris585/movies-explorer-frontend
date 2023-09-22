export default function filterMovies(searchStr, moviesArr) {
  return moviesArr.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchStr.toLowerCase()) ||
    movie.nameEN.toLowerCase().includes(searchStr.toLowerCase())
  );
};
