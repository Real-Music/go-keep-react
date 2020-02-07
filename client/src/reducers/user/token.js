import { SET_TOKEN } from "./actions";

const initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.token;

    default:
      return state;
  }
};
