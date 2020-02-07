import React from "react";
import NoteOptions from "./NoteOptions";

// css
import "../css/_newNote.sass";

export default function NewNote(props) {
  //   console.log(props, "new note");
  const togglePin = props.showBody ? (
    <div
      className={`icon_items ${props.pin ? "pin" : ""}`}
      onClick={props.handlePin}
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
  ) : (
    <>
      <div className="icon_items">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <p className="tag">New list</p>
      </div>
      <div className="icon_items">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
        <p className="tag">New note with image</p>
      </div>
    </>
  );

  const body = props.showBody ? (
    <>
      <main className="body">
        <textarea
          onChange={props.handleKeyPress}
          name="body"
          id="body"
          placeholder="Take a note..."
        ></textarea>
      </main>
      <NoteOptions button={true} newNote={props.newNote} />
    </>
  ) : (
    false
  );

  return (
    <div className="new_note">
      <div
        className="new_note_wrapper"
        tabIndex="-1"
        onFocus={props.handleFocus}
      >
        <div className="title">
          <input
            type="text"
            name="title"
            placeholder={props.placeHolder}
            autoComplete="off"
            onChange={props.handleTitle}
            value={props.title}
          />

          <div className="icons">{togglePin}</div>
        </div>
        {body}
      </div>
    </div>
  );
}
