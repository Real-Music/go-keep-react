import BASE_URL from "../../utils/Api";
import { onSpinner, offSpinner } from "../spinner/actions";

export const CREATE_NOTE = "CREATE_NOTE";
export const SET_PIN_NOTES = "SET_PIN_NOTES";
export const SET_UNPIN_NOTES = "SET_UNPIN_NOTES";
const headers = {
  "Content-Type": "application/json",
  Authorization: "JWT fefege..."
};

export function createNote(note, token) {
  return async dispatch => {
    dispatch(onSpinner());

    await BASE_URL.post("/notes", note, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response.data);
        // TODO add created note to existing note
      })
      .catch(error => {
        // TODO update error if any
        console.log(error.response.data);
      });
  };
}

export function fetchPinNotes(userId, token) {
  return async dispatch => {
    // dispatch(onSpinner());

    await BASE_URL.get(`/notes/${userId}/pin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        dispatch(setPinNotes(response.data));
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}

export function fetchUnpinNotes(userId, token) {
  return async dispatch => {
    // dispatch(onSpinner());

    await BASE_URL.get(`/notes/${userId}/unpin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        dispatch(setUnpinNotes(response.data));
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}

export function setPinNotes(notes) {
  return {
    type: SET_PIN_NOTES,
    notes
  };
}

export function setUnpinNotes(notes) {
  return {
    type: SET_UNPIN_NOTES,
    notes
  };
}
