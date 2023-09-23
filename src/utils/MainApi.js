class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getMovies()]);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  editUserProfile(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}movies`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  createMovie(movie) {
    return fetch(`${this._baseUrl}movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: "https://api.nomoreparties.co/" + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail:
          "https://api.nomoreparties.co/" + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(_id) {
    return fetch(`${this._baseUrl}movies/${_id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    }).then(this._checkResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}signout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.movie585.nomoredomainsicu.ru/",
});

export default mainApi;
