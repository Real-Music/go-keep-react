import { SET_CURRENT_NOTE } from "./actions";

const initialState = { id: 0, pin: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_NOTE:
      return action.id;

    default:
      return state;
  }
};
