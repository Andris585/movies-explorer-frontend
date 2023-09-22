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
import { Route, Routes, useLocation, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { VALIDATION_ERROR_MESSAGE, FEATURETTE_DURATION } from "../../utils/constants";
import Loader from "../Loader/Loader";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); //состояние залогинен пользователь или нет
  const [isLoading, setIsLoading] = useState(false); //состояние загрузки
  const [registrationError, setRegistrationError] = useState(""); //ошибки регистрации
  const [loginError, setLoginError] = useState(""); //ошибки логина
  const [errorUpdateUserInfo, setErrorUpdateUserInfo] = useState(""); //ошибки профиля пользователя
  const [currentUser, setCurrentUser] = useState({}); //данные пользователя
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false); //открытие попапа
  const [isSuccessful, setIsSuccessful] = useState(false); //состояние попапа

  
  const [renderMovies, setRenderMovies] = useState([]); //массив всех фильмов
  const [savedMovies, setSavedMovies] = useState([]); //массив сохраненных фильмов

  const [checkbox, setCheckbox] = useState(JSON.parse(localStorage.getItem("checkbox"))); //чекбокс
  const [savedCheckbox, setSavedCheckbox] = useState(false)// чекбокс сохраненных фильмов

  const [filteredMovies, setFilteredMovies] = useState([]); //фильтрация массива всех фильмов
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]); //фильтрация массива сохраненных фильмов

  const [searchStr, setSearchStr] = useState(""); //поиск в фильмах
  const [searchSavedStr, setSearchSavedStr] = useState(""); //поиск в сохраненных фильмах




  const [notFound, setNotFound] = useState(true); //состояние ошибки "ничего не найдено" на странице фильмов
  const [notFoundSaved, setNotFoundSaved] = useState(true) //состояние ошибки "ничего не найдено" на странице сохраненных фильмов

  const [message, setMessage] = useState(""); //ошибка "ничего не найдено" в фильмах
  const [messageSaved, setMessageSaved] = useState(""); //ошибка "ничего не найдено" в сохраненных фильмах

  const [errorMessage, setErrorMessage] = useState(""); //ошибка сервера при получении карточек со стороннего апи

  useEffect(() => {
    checkToken();
  }, []);

  //Получение данных о пользователе и фильмах
  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      mainApi
        .getAllInfo()
        .then(([data, movies]) => {
          setCurrentUser(data);
          setSavedMovies(movies);
          console.log(movies);
          console.log(savedMovies);
          setRenderMovies(JSON.parse(localStorage.getItem("allMovies")) || []);
          setSearchStr((localStorage.getItem("searchString")) || "");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
  }, [isLoggedIn, currentUser._id]);

  //АВТОРИЗАЦИЯ

  //регистрация
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
      })
  };

  //логин
  function handleLogin(email, password) {
    setLoginError("");
    mainApi
      .login(email, password)
      .then((data) => {
        if (!data) {
          return;
        }
        userDataRequest();
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setIsSuccessful(false);
        setLoginError(err);
        console.log(err);
        setIsInfoPopupOpen(true);
      })
  };

  //выход из аккаунта
  function handleLogout() {
    mainApi
      .logout();
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  };

  function userDataRequest() {
    mainApi
        .getUserInfo()
        .then((data) => {
          if (!data) {
            return;
          }
          setIsLoggedIn(true);
          navigate(pathname, { replace: true });
        })
        .catch((err) => {
            console.log(err);
          // }
        });
  }

  //проверка токена
  function checkToken() {
      userDataRequest();
    };

  //Обновление профиля
  function handleUpdateUserInfo(newUserInfo) {
    setErrorUpdateUserInfo("");
    setIsLoading(true);
    mainApi
      .editUserProfile(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        setIsInfoPopupOpen(true);
        setIsSuccessful(true);
      })
      .catch((err) => {
        setErrorUpdateUserInfo(err);
        setIsSuccessful(false);
        setIsInfoPopupOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  function closeAllPopups() {
    setIsInfoPopupOpen(false)
  };

  //ФИЛЬМЫ

  //Получаем список всех фильмов
  const getAllMovies = async () => {
    try {
      setIsLoading(true);
      const allMovies = await moviesApi.getAllMovies();
      localStorage.setItem("allMovies", JSON.stringify(allMovies));
      setRenderMovies(allMovies);
      setErrorMessage("");
      setIsLoading(false);
    } catch (err) {
      setNotFound(false);
      setErrorMessage(VALIDATION_ERROR_MESSAGE.SERVER_ERROR_ON_SEARCH);
      console.log(err);
      setIsLoading(false);
    }
  };

  //поиск на странице фильмов
  function keepSearchedMovies() {
    if (!renderMovies.length) {
      return []
    }

    const searchedMovies = filterMovies(searchStr, renderMovies);
    const searchedFeaturettes = searchedMovies.filter((movie => movie.duration <= FEATURETTE_DURATION));
      
      if (checkbox) {
        localStorage.setItem("checkbox", checkbox);
        setFilteredMovies(searchedFeaturettes);
        if (searchedFeaturettes.length === 0) {
          setNotFound(false);
          setMessage(VALIDATION_ERROR_MESSAGE.NOTHING_FOUND);
        } else {
          setMessage("");
          setNotFound(true);
        }
      } else {
        localStorage.setItem("checkbox", checkbox);
        setFilteredMovies(searchedMovies);
        if (searchedMovies.length === 0) {
          setNotFound(false);
          setMessage(VALIDATION_ERROR_MESSAGE.NOTHING_FOUND);
        } else {
          setMessage("");
          setNotFound(true);
        }
      }
  }

  const submitSearch = (searchStr) => {
    if (!renderMovies.length) {
      getAllMovies();
    }
    setSearchStr(searchStr);
    localStorage.setItem("searchString", searchStr);
  }

  useEffect(() => {
    keepSearchedMovies();
}, [renderMovies, searchStr, checkbox]);

  useEffect(() => {
      keepSearchedSavedMovies();
  }, [savedMovies, searchSavedStr, savedCheckbox]);


  //Фильтр поиска в сохраненных фильмах
  function keepSearchedSavedMovies() {
    if (!savedMovies.length) {
      setFilteredSavedMovies([]);
      return
    }
    const searchedMovies = filterMovies(searchSavedStr, savedMovies);
    const searchedFeaturettes = searchedMovies.filter((movie) => movie.duration <= FEATURETTE_DURATION);

      
      if (savedCheckbox) {
        localStorage.setItem("savedCheckbox", savedCheckbox);
        setFilteredSavedMovies(searchedFeaturettes);
        if (searchedFeaturettes.length === 0) {
          setNotFoundSaved(false);
          setMessageSaved(VALIDATION_ERROR_MESSAGE.NOTHING_FOUND);
        } else {
          setMessageSaved("");
          setNotFoundSaved(true);
        }
      } else {
        setFilteredSavedMovies(searchedMovies);
        if (searchedMovies.length === 0) {
          setNotFoundSaved(false);
          setMessageSaved(VALIDATION_ERROR_MESSAGE.NOTHING_FOUND);
        } else {
          setMessageSaved("");
          setNotFoundSaved(true);
        }
      }
  };

  const submitHandler = (searchStr) => {
    setSearchSavedStr(searchStr);
  };

    //Чекбокс

    function handleCheckboxClick() {
      setCheckbox(!checkbox);
    };

    function handleSavedCheckboxClick() {
      setSavedCheckbox(!checkbox);
    };

  //Сохранение фильма
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

  //Удаление фильма
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
  };  

  React.useEffect(() => {}, []);

  if (isLoggedIn === null) {
    <Loader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`app ${pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile" ? "app__wrapper" : "" }`} >
        { (pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile") && <Header isLoggedIn={isLoggedIn} /> }
        <main className="main">
          <Routes>
            <Route path="/signup"
                element={
                  isLoggedIn ? (
                    <Navigate to="/movies" replace />
                  ) : ( <Register onRegister={handleRegister} />
                )}
              />
            <Route path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : ( <Login onLogin={handleLogin} isLoading={isLoading} />
              )} 
            />
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  element={Movies}
                  submitSearch={submitSearch}
                  renderMovies={filteredMovies}
                  handleCheckboxClick={handleCheckboxClick}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleMovieDelition}
                  savedMovies={savedMovies}
                  checkbox={checkbox}
                  setCheckbox={setCheckbox}
                  message={message}
                  errorMessage={errorMessage}
                  notFound={notFound}
                />
              } 
            />
            <Route path="/saved-movies" element={
                <ProtectedRoute
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  element={SavedMovies}
                  movies={filteredSavedMovies}
                  filteredSavedMovies={filteredSavedMovies}
                  savedMovies={savedMovies}
                  handleCheckboxClick={handleSavedCheckboxClick}
                  submitHandler={submitHandler}
                  handleDeleteMovie={handleMovieDelition}
                  checkbox={savedCheckbox}
                  setCheckbox={setSavedCheckbox}
                  setSearchStr={setSearchSavedStr}
                  messageSaved={messageSaved}
                  notFoundSaved={notFoundSaved}
                />
              } 
            />
            <Route path="/profile" element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Profile}
                  onLogout={handleLogout}
                  onUpdateUserProfile={handleUpdateUserInfo}
                  buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                  // errorUpdateInfoUser={errorUpdateUserInfo}
                />
              } 
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        { (pathname === "/" || pathname === "/movies" || pathname === "/saved-movies") &&  <Footer /> }
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
};

export default App;