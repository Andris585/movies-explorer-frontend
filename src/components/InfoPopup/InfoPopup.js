/* eslint-disable react-hooks/exhaustive-deps */
import success from "../../images/success.svg";
import noSuccess from "../../images/no_success.svg";
import usePopupClose from "../../hooks/usePopupClose";
import "./InfoPopup.css";
import { ERROR_MESSAGE, INFO_MESSAGE } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function InfoPopup({
  isOpen,
  onClose,
  isSuccessful,
  registrationError,
  loginError,
  userUpdateError,
}) {
  const { pathname } = useLocation();
  const [error, setError] = useState(
    ERROR_MESSAGE.REGISTRATION_ERROR
  );
  usePopupClose(isOpen, onClose);

  function registerError() {
    if (pathname === "/signup" && registrationError === "Ошибка: 409") {
      setError(ERROR_MESSAGE.USER_EMAIL_EXISTS);
    }
    if (pathname === "/signin" && loginError === "Ошибка: 401") {
      setError(ERROR_MESSAGE.INCORRECT_ERROR);
    }
    if (pathname === "/profile" && userUpdateError) {
      setError(ERROR_MESSAGE.UPDATE_PROFILE_ERROR);
    }
  }
  useEffect(() => {
    registerError();
  }, [isOpen]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon"
          src={isSuccessful ? success : noSuccess}
          alt="Иконка статуса"
        />
        <h1 className="popup__title">
          {isSuccessful
            ? `${
                pathname === "/profile"
                  ? INFO_MESSAGE.PROFILE_EDIT_SUCCESS
                  : INFO_MESSAGE.REGISTRATION_SUCCESS
              }`
            : error}
        </h1>
      </div>
    </div>
  );
}

export default InfoPopup;
