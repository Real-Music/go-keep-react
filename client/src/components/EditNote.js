import React, { Component } from "react";
import NoteOptions from "./NoteOptions";
import { updateNote } from "../reducers/notes/actions";

// css
import "../css/_editNote.sass";
import { connect } from "react-redux";

class EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: null,
        body: null,
        pin: null
      }
    };
  }

  componentDidUpdate() {
    let body = document.querySelectorAll(".google-edit-note.show textarea");
    body.forEach(ele => {
      ele.style.cssText = "height:auto; padding:0";
      ele.style.cssText = "height:" + ele.scrollHeight + "px";
    });
  }

  handleKeyPress = event => {
    let body = event.target;
    setTimeout(function() {
      body.style.cssText = "height:auto; padding:0";
      body.style.cssText = "height:" + body.scrollHeight + "px";
    }, 0);

    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  handlePin = () => {
    const { isPin } = this.props;
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        pin:
          this.state.data.pin === null && isPin ? !isPin : !this.state.data.pin
      }
    });
  };

  clickHandler = event => {
    const { handleUpdateNote } = this.props;
    if (event.target.className === "google-edit-note show") {
      this.setState({
        ...this.state,
        data: {
          title: null,
          body: null,
          pin: null
        }
      });

      handleUpdateNote("google-edit-note show");
      return;
    }
  };

  updateNoteHandler = async notes => {
    const note = notes[0];
    const { id, token, noteUpdate, handleUpdateNote } = this.props;
    const { title, body, pin } = this.state.data;
    let noteTitle, noteBody, notePin, data;

    noteTitle = title ? title : note.title;
    noteBody = body ? body : note.body;
    switch (pin) {
      case null:
        notePin = note.pin;
        break;
      case false:
        notePin = pin;
        break;
      case true:
        notePin = pin;
        break;
      default:
        notePin = pin || note.pin;
        break;
    }

    data = JSON.stringify({ title: noteTitle, body: noteBody, pin: notePin });
    await noteUpdate(id, data, token);
    this.setState({
      ...this.state,
      data: {
        title: null,
        body: null,
        pin: null
      }
    });
    handleUpdateNote("google-edit-note show");
  };

  render() {
    const { id, isPin, pin, unpin, show } = this.props;

    const pinNote =
      isPin && Object.keys(pin).length !== 0
        ? [...pin.notes].filter(note => note.id === id)
        : [];

    const unpinNote =
      !isPin && Object.keys(unpin).length !== 0
        ? [...unpin.notes].filter(note => note.id === id)
        : [];

    return (
      <div
        className={`google-edit-note ${show ? "show" : ""}`}
        onClick={this.clickHandler}
      >
        <div className="edit-note-wrapper">
          <div className="new_note">
            <div className="new_note_wrapper">
              <div className="title">
                <textarea
                  id="title"
                  name="title"
                  placeholder="Title"
                  onChange={this.handleKeyPress}
                  value={
                    this.state.data.title ||
                    (pinNote[0] || unpinNote[0]
                      ? isPin
                        ? pinNote[0].title || ""
                        : unpinNote[0].title || ""
                      : "")
                  }
                ></textarea>

                <div className="icons">
                  <div
                    onClick={this.handlePin}
                    className={`icon_items ${
                      this.state.data.pin === null && isPin
                        ? "pin"
                        : this.state.data.pin
                        ? "pin"
                        : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                    <p className="tag">Pin note</p>
                  </div>
                </div>
              </div>
              <main className="body">
                <textarea
                  onChange={this.handleKeyPress}
                  name="body"
                  id="body"
                  placeholder="Take a note..."
                  value={
                    this.state.data.body ||
                    (pinNote[0] || unpinNote[0]
                      ? isPin
                        ? pinNote[0].body || ""
                        : unpinNote[0].body || ""
                      : "")
                  }
                ></textarea>
              </main>
              <NoteOptions
                button={true}
                newNote={() =>
                  this.updateNoteHandler(isPin ? pinNote : unpinNote)
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ spinner, user, token, notes, id }) => ({
  spinner,
  token,
  userId: user["id"],
  pin: notes["pin"],
  unpin: notes["unpin"],
  id: id["id"],
  isPin: id["pin"]
});

// dispatch to store
const mapDispatchToProps = dispatch => ({
  noteUpdate(userId, data, token) {
    dispatch(updateNote(userId, data, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
