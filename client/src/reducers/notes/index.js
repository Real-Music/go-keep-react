import {
  SET_PIN_NOTES,
  SET_UNPIN_NOTES,
  UPDATE_NEW_PIN_NOTES,
  UPDATE_NEW_UNPIN_NOTES,
  UPDATE_PIN_NOTES,
  UPDATE_UNPIN_NOTES,
  DELETE_NOTE
} from "./actions";

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

    case UPDATE_NEW_PIN_NOTES:
      let pin = state.pin.notes;
      let num = state.pin.count;
      pin = {
        count: num + 1,
        notes: [action.note, ...pin]
      };

      return {
        ...state,
        pin: pin
      };

    case UPDATE_NEW_UNPIN_NOTES:
      let unpin = state.unpin.notes;
      let count = state.unpin.count;
      unpin = {
        count: count + 1,
        notes: [action.note, ...unpin]
      };

      return {
        ...state,
        unpin: unpin
      };

    case UPDATE_PIN_NOTES:
      console.log("UPDATE_PIN_NOTES");
      let res = action.note;
      let pinNotes = [...state.pin.notes];
      const noteIndex = pinNotes.findIndex(note => note.id === res.id);

      if (noteIndex !== -1) {
        pinNotes[noteIndex] = action.note;
        return {
          ...state,
          pin: {
            ...state.pin,
            notes: pinNotes
          }
        };
      }

      return {
        pin: {
          count: state.pin.count + 1,
          notes: [action.note, ...pinNotes]
        },
        unpin: {
          count: state.unpin.count - 1,
          notes: [...state.unpin.notes].filter(
            note => note.id !== action.note.id
          )
        }
      };
    case UPDATE_UNPIN_NOTES:
      console.log("UPDATE_UNPIN_NOTES");

      let response = action.note;
      let unpinNotes = [...state.unpin.notes];
      const index = unpinNotes.findIndex(note => note.id === response.id);

      if (index !== -1) {
        unpinNotes[index] = action.note;
        return {
          ...state,
          unpin: {
            ...state.unpin,
            notes: unpinNotes
          }
        };
      }

      let NotePin = [...state.pin.notes];
      NotePin = NotePin.filter(note => note.id !== response.id);

      return {
        pin: {
          count: state.pin.count - 1,
          notes: NotePin
        },
        unpin: {
          count: state.unpin.count + 1,
          notes: [action.note, ...unpinNotes]
        }
      };

    case DELETE_NOTE:
      if (action.pin) {
        return {
          ...state,
          pin: {
            count: state.pin.count - 1,
            notes: [...state.pin.notes].filter(note => note.id !== action.id)
          }
        };
      } else {
        return {
          ...state,
          unpin: {
            count: state.unpin.count - 1,
            notes: [...state.unpin.notes].filter(note => note.id !== action.id)
          }
        };
      }
    default:
      return state;
  }
};
