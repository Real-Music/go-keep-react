// TODO Remove all setTimeOut for Production

import BASE_URL from "../../utils/Api";
import { onSpinner, offSpinner } from "../spinner/actions";

export const SET_USER = "SET_USER";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";
export const IS_LOGIN = "IS_LOGIN";

// TODO Delete this for production
let setTime;

export function getUser(user) {
  return async dispatch => {
    dispatch(onSpinner());
    dispatch(clearLoginError());
    console.log(setTime);
    if (user) clearTimeout(setTime);

    await BASE_URL.post("/login", user)
      .then(async response => {
        console.log("Login Action", response.data);

        let user = response.data.user;
        delete user["password"];
        delete user["createdAt"];
        delete user["updatedAt"];
        user["token"] = response.data.token;

        await dispatch(setUser(response.data.user));
        await dispatch(isLogIn(true));
      })
      .catch(async error => {
        console.log("Login Action", error.response.data);

        setTime = setTimeout(() => {
          dispatch(setLoginError(error.response.data.error.message));
          dispatch(offSpinner());
          dispatch(isLogIn(false));

          setTimeout(() => {
            dispatch(clearLoginError());
          }, 5000);
        }, 3000);
      });
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

export function setLoginError(error) {
  return {
    type: SET_LOGIN_ERROR,
    error
  };
}

export function clearLoginError() {
  return {
    type: CLEAR_LOGIN_ERROR,
    error: ""
  };
}

export function isLogIn(boolean) {
  return {
    type: IS_LOGIN,
    boolean
  };
}
