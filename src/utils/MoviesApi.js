class MoviesApi {
  constructor(config) {
    this._moviesUrl = config.moviesUrl;
    this._headers = config.headers;
  };

  _checkingResponse(res) {
    if (res.ok) {
      return res.json();
    };

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getAllMovies() {
    return fetch(`${this._moviesUrl}beatfilm-movies`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._checkingResponse);
  };
}

const moviesApi = new MoviesApi ({
  moviesUrl: 'https://api.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;