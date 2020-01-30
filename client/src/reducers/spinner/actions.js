export const ON_SPINNER = "ON_SPINNER";
export const OFF_SPINNER = "OFF_SPINNER";

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
