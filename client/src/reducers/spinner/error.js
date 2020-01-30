import { SET_ERROR, CLEAR_ERROR } from "./actions";

const initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error;

    case CLEAR_ERROR:
      return action.error;

    default:
      return state;
  }
};
