import React, { Component } from "react";

// css
import "../css/_notes.sass";
import NoteOptions from "./NoteOptions";
import { connect } from "react-redux";

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editTitle: false
    };
  }

  componentDidMount() {
    this.handleKeyPress();
  }

  handleKeyPress = () => {
    let body = document.querySelectorAll("#body_dis");
    if (body) {
      body.forEach(textarea => {
        setTimeout(function() {
          if (textarea.scrollHeight > 300) {
            textarea.style.cssText = "height:auto; padding:0";
            textarea.style.cssText = "height:" + 300 + "px";
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
    const { notes } = this.props;
    const noteList = notes.map(note => {
      return (
        <div className="pin_note_container" key={note.id}>
          <div className="pin_note_title">
            <h3>{note.title}</h3>
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
            <NoteOptions button={false} />
          </div>
        </div>
      );
    });

    return <>{noteList}</>;
  }
}

export default connect()(Notes);
