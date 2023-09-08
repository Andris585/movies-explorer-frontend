import React from "react";
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
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  return (
    <div className={`app ${pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile" ? "app__wrapper" : "" }`} >
      { (pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile") && <Header /> }
      <main className="main">
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      { (pathname === "/" || pathname === "/movies" || pathname === "/saved-movies") &&  <Footer /> }
    </div>
  );
};

export default App;