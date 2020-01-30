import { combineReducers } from "redux";
import user from "./user";
import loginError from "./user/error";
import isLogin from "./user/isLogin";
import isSignup from "./user/isSignup";
import spinner from "./spinner";
import error from "./spinner/error";

export default combineReducers({
  user,
  isLogin,
  isSignup,
  loginError,
  error,
  spinner
});
