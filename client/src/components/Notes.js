import React, { Component } from "react";
// import Spinner from "../components/Spinner";
import NoteOptions from "../components/NoteOptions";

// css
import "../css/_notes.sass";

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editTitle: false
    };
  }

  componentDidMount() {
    this.handleKeyPress();
    this.handleTitle();
  }

  componentDidUpdate() {
    this.handleKeyPress();
    this.handleTitle();
  }
  handleTitle = () => {
    let body = document.querySelectorAll("#title");
    if (body) {
      body.forEach(textarea => {
        setTimeout(function() {
          textarea.style.cssText = "height:auto; padding:0";
          textarea.style.cssText = "height:" + textarea.scrollHeight + "px";
        }, 0);
      });
      return;
    }
  };

  handleKeyPress = () => {
    let body = document.querySelectorAll("#body_dis");
    // const sizes = [330, 320, 340, 330, 310, 350];
    if (body) {
      body.forEach(textarea => {
        setTimeout(function() {
          if (textarea.scrollHeight > 330) {
            textarea.style.cssText = "height:auto; padding:0";
            textarea.style.cssText = "height:" + 330 + "px";
          } else {
            textarea.style.cssText = "height:auto; padding:0";
            textarea.style.cssText = "height:" + textarea.scrollHeight + "px";
          }
        }, 0);
      });
      return;
    }
  };

  render() {
    const { notes, handleEditNote } = this.props;
    const noteList = notes.map(note => {
      return (
        <div
          className="pin_note_container"
          tabIndex="1"
          onFocus={() => handleEditNote(note.id, note.pin)}
          key={note.id}
        >
          <div className="pin_note_title">
            <textarea
              name="title"
              id="title"
              onChange={this.handleKeyPress}
              value={note.title}
            ></textarea>
            <div className="icons">
              <div className="icons_items">
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

          <div className="pin_note_body">
            <textarea
              id="body_dis"
              onChange={this.handleKeyPress}
              value={note.body}
            ></textarea>
          </div>
          <div className="options">
            <NoteOptions />
          </div>
        </div>
      );
    });

    return <>{noteList}</>;
  }
}

export default Notes;
