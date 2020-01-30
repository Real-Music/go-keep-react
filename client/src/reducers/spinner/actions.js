export const ON_SPINNER = "ON_SPINNER";
export const OFF_SPINNER = "OFF_SPINNER";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export function onSpinner() {
  return {
    type: ON_SPINNER,
    boolean: true
  };
}

export function offSpinner() {
  return {
    type: OFF_SPINNER,
    boolean: false
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
    error: ""
  };
}
