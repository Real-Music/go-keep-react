import { SET_USER } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;

    default:
      return state;
  }
};
