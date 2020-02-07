import { SET_PIN_NOTES, SET_UNPIN_NOTES } from "./actions";

const initialState = { pin: {}, unpin: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PIN_NOTES:
      return {
        ...state,
        pin: action.notes
      };

    case SET_UNPIN_NOTES:
      return {
        ...state,
        unpin: action.notes
      };
    default:
      return state;
  }
};
