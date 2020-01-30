import { IS_SIGNUP, SET_SIGNUP_ERROR, CLEAR_SIGNUP_ERROR } from "./actions";

const initialState = {
  state: false,
  error: { fname: "", lname: "", email: "", password: "" }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_SIGNUP:
      return {
        ...state,
        state: action.boolean
      };

    case SET_SIGNUP_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.error.type]: action.error.message
        }
      };

    case CLEAR_SIGNUP_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
