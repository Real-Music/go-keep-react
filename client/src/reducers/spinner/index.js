import { ON_SPINNER, OFF_SPINNER } from "./actions";

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_SPINNER:
      return action.boolean;

    case OFF_SPINNER:
      return action.boolean;

    default:
      return state;
  }
};
