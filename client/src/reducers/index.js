import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Store
import user from "./user";
import token from "./user/token";
import loginError from "./user/error";
import isLogin from "./user/isLogin";
import isSignup from "./user/isSignup";
import spinner from "./spinner";
import error from "./spinner/error";

import notes from "./notes";
import id from "./notes/id";

import layout from "./layout";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "isLogin", "token", "layout"]
};

const rootReducer = combineReducers({
  user,
  token,
  isLogin,
  isSignup,
  loginError,
  error,
  spinner,
  notes,
  layout,
  id
});

export default persistReducer(persistConfig, rootReducer);
