export const LAYOUT = "LAYOUT";

export function changeLayout(boolean) {
  return dispatch => {
    dispatch(toggleLayout(boolean));
  };
}

export function toggleLayout(boolean) {
  return {
    type: LAYOUT,
    boolean
  };
}
