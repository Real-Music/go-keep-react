import { LAYOUT } from "./actions";

const initialState = { layout: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case LAYOUT:
      return {
        ...state,
        layout: action.boolean
      };

    default:
      return state;
  }
};
