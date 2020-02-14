import BASE_URL from "../../utils/Api";
import { onSpinner, offSpinner } from "../spinner/actions";

export const CREATE_NOTE = "CREATE_NOTE";
export const SET_PIN_NOTES = "SET_PIN_NOTES";
export const SET_UNPIN_NOTES = "SET_UNPIN_NOTES";
export const UPDATE_NEW_PIN_NOTES = "UPDATE_NEW_PIN_NOTES";
export const UPDATE_NEW_UNPIN_NOTES = "UPDATE_NEW_UNPIN_NOTES";
export const SET_CURRENT_NOTE = "SET_CURRENT_NOTE";
export const UPDATE_PIN_NOTES = "UPDATE_PIN_NOTES";
export const UPDATE_UNPIN_NOTES = "UPDATE_UNPIN_NOTES";
export const DELETE_NOTE = "DELETE_NOTE";

export function setNoteId(id) {
  return dispatch => {
    dispatch(setId(id));
  };
}

export function deleteNote(noteId, pin, token) {
  const note = { id: noteId, pin: pin };
  return async dispatch => {
    await BASE_URL.delete(`/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        dispatch(deletedNote(note));
      })
      .catch(error => console.log(error.response.data));
  };
}

export function updateNote(noteId, data, token) {
  return async dispatch => {
    await BASE_URL.patch(`/notes/${noteId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        let note = response.data.note;
        switch (note.pin) {
          case true:
            dispatch(updatePinNote(note));
            break;
          case false:
            dispatch(updateUnpinNote(note));
            break;
          default:
            break;
        }
      })
      .catch(error => console.log(error));
  };
}

export function createNote(note, token) {
  return async dispatch => {
    dispatch(onSpinner());

    await BASE_URL.post("/notes", note, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        let data = response.data.createdNote;
        setTimeout(() => {
          if (data.pin) {
            dispatch(updateNewPinNotes(data));
            dispatch(offSpinner());
            return;
          }
          dispatch(updateNewUnpinNotes(data));
          dispatch(offSpinner());
        }, 2000);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}

export function fetchPinNotes(userId, token) {
  return async dispatch => {
    dispatch(onSpinner());

    await BASE_URL.get(`/notes/${userId}/pin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTimeout(() => {
          dispatch(setPinNotes(response.data));
          dispatch(offSpinner());
        }, 2000);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}

export function fetchUnpinNotes(userId, token) {
  return async dispatch => {
    dispatch(onSpinner());

    await BASE_URL.get(`/notes/${userId}/unpin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTimeout(() => {
          dispatch(setUnpinNotes(response.data));
          dispatch(offSpinner());
        }, 2000);
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

export function updateNewPinNotes(note) {
  return {
    type: UPDATE_NEW_PIN_NOTES,
    note
  };
}

export function updateNewUnpinNotes(note) {
  return {
    type: UPDATE_NEW_UNPIN_NOTES,
    note
  };
}

export function setId(id) {
  return {
    type: SET_CURRENT_NOTE,
    id
  };
}

export function updatePinNote(note) {
  return {
    type: UPDATE_PIN_NOTES,
    note
  };
}

export function updateUnpinNote(note) {
  return {
    type: UPDATE_UNPIN_NOTES,
    note
  };
}

export function deletedNote(note) {
  return {
    type: DELETE_NOTE,
    id: note.id,
    pin: note.pin
  };
}
