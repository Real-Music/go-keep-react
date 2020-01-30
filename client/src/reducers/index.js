import { combineReducers } from "redux";
import user from "./user";
import loginError from "./user/error";
import isLogin from "./user/isLogin";
import spinner from "./spinner";

export default combineReducers({
  user,
  isLogin,
  loginError,
  spinner
});
