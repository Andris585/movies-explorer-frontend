/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import filterMovies from "../../utils/utils";
import moviesApi from "../../utils/MoviesApi";
import Info from "../InfoPopup/InfoPopup";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ERROR_MESSAGE, FEATURETTE_DURATION } from "../../utils/constants";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [errorUpdateUserInfo, setErrorUpdateUserInfo] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(
    JSON.parse(localStorage.getItem("checkbox"))
  );
  const [checkboxSaved, setCheckboxSaved] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [searchSavedStr, setSearchSavedStr] = useState("");
  const [searchSuccess, setSearchSuccess] = useState(true);
  const [searchSuccessSaved, setSearchSuccessSaved] = useState(true);
  const [message, setMessage] = useState("");
  const [messageSaved, setMessageSaved] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    userDataRequest();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      mainApi
        .getAllInfo()
        .then(([data, movies]) => {
          setCurrentUser(data);
          setSavedMovies(movies);
          setRenderedMovies(
            JSON.parse(localStorage.getItem("allMovies")) || []
          );
          setSearchStr(localStorage.getItem("searchString") || "");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [isLoggedIn, currentUser._id]);

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .then(() => {
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setRegistrationError(err);
        setIsSuccessful(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    setLoginError("");
    mainApi
      .login(email, password)
      .then((data) => {
        if (!data) {
          setIsLoggedIn(false);
          return;
        } else {
          setIsLoggedIn(true);
          userDataRequest();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setIsSuccessful(false);
        setIsLoggedIn(false);
        setLoginError(err);
        console.log(err);
        setIsInfoPopupOpen(true);
      });
  }

  function handleLogout() {
    mainApi.logout();
    setIsLoggedIn(false);
    localStorage.clear();
    setSearchStr("");
    setRenderedMovies([]);
    setFilteredMovies([]);
    setSavedMovies([]);
    setFilteredSavedMovies([]);
    navigate("/", { replace: true });
  }

  function userDataRequest() {
    mainApi
      .getUserInfo()
      .then((data) => {
        if (!data) {
          setIsLoggedIn(false);
          return;
        }
        setIsLoggedIn(true);
        navigate(pathname, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUserInfo(newUserInfo) {
    setErrorUpdateUserInfo("");
    setIsLoading(true);
    mainApi
      .editUserProfile(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccessful(true);
        setIsInfoPopupOpen(true);
      })
      .catch((err) => {
        setErrorUpdateUserInfo(err);
        setIsSuccessful(false);
        setIsInfoPopupOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsInfoPopupOpen(false);
  }

  const getAllMovies = async () => {
    try {
      setIsLoading(true);
      const allMovies = await moviesApi.getAllMovies();
      localStorage.setItem("allMovies", JSON.stringify(allMovies));
      setRenderedMovies(allMovies);
      setErrorMessage("");
      setIsLoading(false);
    } catch (err) {
      setSearchSuccess(false);
      setErrorMessage(ERROR_MESSAGE.SERVER_ERROR_ON_SEARCH);
      console.log(err);
      setIsLoading(false);
    }
  };

  const submitSearch = (s) => {
    if (!renderedMovies.length) {
      getAllMovies();
    }
    setSearchStr(s);
    localStorage.setItem("searchString", s);
  };

  const submitSearchSaved = (s) => {
    setSearchSavedStr(s);
  };

  function handleCheckboxClick() {
    setCheckbox(!checkbox);
  }

  function handleCheckboxClickSaved() {
    setCheckboxSaved(!checkboxSaved);
  }

  function searchMovies() {
    if (!renderedMovies.length) {
      return [];
    }
    const searchedMovies = filterMovies(searchStr, renderedMovies);
    const searchedFeaturettes = searchedMovies.filter(
      (movie) => movie.duration <= FEATURETTE_DURATION
    );
    if (checkbox) {
      localStorage.setItem("checkbox", checkbox);
      setFilteredMovies(searchedFeaturettes);
      if (searchedFeaturettes.length === 0) {
        setSearchSuccess(false);
        setMessage(ERROR_MESSAGE.NOTHING_FOUND);
      } else {
        setMessage("");
        setSearchSuccess(true);
      }
    } else {
      localStorage.setItem("checkbox", checkbox);
      setFilteredMovies(searchedMovies);
      if (searchedMovies.length === 0) {
        setSearchSuccess(false);
        setMessage(ERROR_MESSAGE.NOTHING_FOUND);
      } else {
        setMessage("");
        setSearchSuccess(true);
      }
    }
  }

  function searchSavedMovies() {
    if (!savedMovies.length) {
      return [];
    }
    const searchedMovies = filterMovies(searchSavedStr, savedMovies);
    const searchedFeaturettes = searchedMovies.filter(
      (movie) => movie.duration <= FEATURETTE_DURATION
    );
    if (checkboxSaved) {
      setFilteredSavedMovies(searchedFeaturettes);
      if (searchedFeaturettes.length === 0) {
        setSearchSuccessSaved(false);
        setMessageSaved(ERROR_MESSAGE.NOTHING_FOUND);
      } else {
        setMessageSaved("");
        setSearchSuccessSaved(true);
      }
    } else {
      setFilteredSavedMovies(searchedMovies);
      if (searchedMovies.length === 0) {
        setSearchSuccessSaved(false);
        setMessageSaved(ERROR_MESSAGE.NOTHING_FOUND);
      } else {
        setMessageSaved("");
        setSearchSuccessSaved(true);
      }
    }
  }

  useEffect(() => {
    searchMovies();
  }, [renderedMovies, searchStr, checkbox]);

  useEffect(() => {
    searchSavedMovies();
  }, [savedMovies, searchSavedStr, checkboxSaved]);

  const handleSaveMovie = (data) => {
    mainApi
      .createMovie(data)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleMovieDelition(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const saveMovies = savedMovies.filter((m) => m._id !== movie._id);
        console.log(saveMovies);
        setSavedMovies(saveMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div
        className={`app ${
          pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/profile"
            ? "app__wrapper"
            : ""
        }`}
      >
        {(pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/profile") && <Header isLoggedIn={isLoggedIn} />}
        <main className="main">
          <Routes>
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register onRegister={handleRegister} />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login onLogin={handleLogin} isLoading={isLoading} />
                )
              }
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  element={Movies}
                  movies={filteredMovies}
                  savedMovies={savedMovies}
                  submitSearch={submitSearch}
                  handleCheckboxClick={handleCheckboxClick}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleMovieDelition}
                  checkbox={checkbox}
                  message={message}
                  errorMessage={errorMessage}
                  searchSuccess={searchSuccess}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  element={SavedMovies}
                  movies={filteredSavedMovies}
                  savedMovies={savedMovies}
                  submitSearchSaved={submitSearchSaved}
                  handleCheckboxClick={handleCheckboxClickSaved}
                  handleDeleteMovie={handleMovieDelition}
                  checkbox={checkboxSaved}
                  messageSaved={messageSaved}
                  searchSuccessSaved={searchSuccessSaved}
                  setSearchSavedStr={setSearchSavedStr}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Profile}
                  onLogout={handleLogout}
                  onUpdateUserProfile={handleUpdateUserInfo}
                  buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        {(pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies") && <Footer />}
        <Info
          isOpen={isInfoPopupOpen}
          isSuccessful={isSuccessful}
          registrationError={registrationError}
          loginError={loginError}
          userUpdateError={errorUpdateUserInfo}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
