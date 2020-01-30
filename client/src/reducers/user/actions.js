// TODO Remove all setTimeOut for Production

import BASE_URL from "../../utils/Api";
import {
  onSpinner,
  offSpinner,
  setError,
  clearError
} from "../spinner/actions";

export const SET_USER = "SET_USER";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const SET_SIGNUP_ERROR = "SET_SIGNUP_ERROR";
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";
export const CLEAR_SIGNUP_ERROR = "CLEAR_SIGNUP_ERROR";
export const IS_LOGIN = "IS_LOGIN";
export const IS_SIGNUP = "IS_SIGNUP";

// TODO Delete this for production
let setTime;

export function createUser(user) {
  return async dispatch => {
    dispatch(onSpinner());
    dispatch(clearSignupError());
    dispatch(clearError());

    if (user) clearTimeout(setTime);

    await BASE_URL.post("/signup", user)
      .then(response => {
        console.log("Signup Action", response.data);
        setTimeout(() => {
          dispatch(isSignup(true));
          dispatch(offSpinner());
          dispatch(isSignup(false));
        }, 2000);
      })
      .catch(error => {
        console.log("Signup Aciton", error.response.data);
        let err = error.response.data.error;

        setTime = setTimeout(() => {
          if (err.type) {
            dispatch(setSignupError(err));
            dispatch(setError(err.message));
            dispatch(offSpinner());
          } else {
            dispatch(offSpinner());
            dispatch(
              setSignupError({
                type: "email",
                message: err.message
              })
            );
            dispatch(setError(err.message));
          }

          setTimeout(() => {
            dispatch(clearSignupError());
          }, 5000);
        }, 3000);
      });
  };
}

export function getUser(user) {
  return async dispatch => {
    dispatch(onSpinner());
    dispatch(clearLoginError());

    if (user) clearTimeout(setTime);

    await BASE_URL.post("/login", user)
      .then(response => {
        console.log("Login Action", response.data);

        let user = response.data.user;
        delete user["password"];
        delete user["createdAt"];
        delete user["updatedAt"];
        user["token"] = response.data.token;

        setTimeout(() => {
          dispatch(setUser(response.data.user));
          dispatch(isLogIn(true));
          dispatch(offSpinner());
        }, 2000);
      })
      .catch(async error => {
        console.log("Login Action", error.response.data || error);

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

export function setSignupError(error) {
  return {
    type: SET_SIGNUP_ERROR,
    error: error
  };
}

export function clearLoginError() {
  return {
    type: CLEAR_LOGIN_ERROR,
    error: ""
  };
}

export function clearSignupError() {
  return {
    type: CLEAR_SIGNUP_ERROR,
    error: { fname: "", lname: "", email: "", password: "" }
  };
}
export function isLogIn(boolean) {
  return {
    type: IS_LOGIN,
    boolean
  };
}

export function isSignup(boolean) {
  return {
    type: IS_SIGNUP,
    boolean
  };
}
