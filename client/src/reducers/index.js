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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "isLogin", "token"]
};

const rootReducer = combineReducers({
  user,
  token,
  isLogin,
  isSignup,
  loginError,
  error,
  spinner,
  notes
});

export default persistReducer(persistConfig, rootReducer);
