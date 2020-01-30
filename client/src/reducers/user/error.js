import { SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR } from "./actions";

const initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_ERROR:
      return action.error;

    case CLEAR_LOGIN_ERROR:
      return action.error;

    default:
      return state;
  }
};
