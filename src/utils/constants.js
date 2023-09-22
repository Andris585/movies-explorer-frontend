const VALIDATION_ERROR_MESSAGE = 
  {
    SERVER_ERROR: "Ошибка на сервере.",
    NOT_FOUND_ERROR: "Страница по указанному адресу не найдена.",
    INCORRECT_ERROR: "Неверный логин и(или) пароль.",
    INVALID_TOKEN: "Ошибка авторизации: токен не передан или передан не в том формате.",
    INCORR_TOKEN: "Ошибка авторизации: переданный токен некорректен.",
    UNAUTHORIZED_ERROR: "В досупе отказано",
    USER_EMAIL_EXISTS: "Пользователь с таким email уже зарегистрирован.",
    REGISTRATION_ERROR: "Ошибка при регистрации.",
    UPDATE_PROFILE_ERROR: "Ошибка при обновлении профиля.",
    SEARCH_FORM_ERROR: 'Введите ключевое слово для поиска',
    SERVER_ERROR_ON_SEARCH: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    NOTHING_FOUND: "Ничего не найдено",
    CONFLICT_ERROR: "Конфликтующий запрос"
  }

const  INFO_MESSAGE =
  {
    PROFILE_EDIT_SUCCESS: "Данные профиля успешно обновлены!",
    REGISTRATION_SUCCESS: "Вы зарегистрированы!"
  }

const REGEXP_EMAIL = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$";
// eslint-disable-next-line no-useless-escape
const REGEXP_NAME = '^[A-Za-zА-Яа-яЁё\\-\\s]+$';

const FEATURETTE_DURATION = 40;
const L_WIDTH = 1221;
const M_WIDTH = 951;
const S_WIDTH = 768;
const XL_CARDS_AMMOUNT = 16;
const L_CARDS_AMMOUNT = 12;
const M_CARDS_AMMOUNT = 8;
const S_CARDS_AMMOUNT = 5;
const XL_ON_MORE_CARDS_AMMOUNT = 4;
const L_ON_MORE_CARDS_AMMOUNT = 3;
const M_ON_MORE_CARDS_AMMOUNT = 2;
const S_ON_MORE_CARDS_AMMOUNT= 2;

export  { 
  VALIDATION_ERROR_MESSAGE, 
  INFO_MESSAGE, 
  REGEXP_EMAIL, 
  REGEXP_NAME,
  FEATURETTE_DURATION,
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
};