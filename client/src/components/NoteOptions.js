import React from "react";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";

// css
import "../css/_noteOptions.sass";

function NoteOptions(props) {
  // const button =
  const { layout } = props;

  return (
    <div className={`icons ${layout ? "show" : ""}`}>
      <div className={`icon_wrapper ${!props.button ? "span" : ""}`}>
        <div className="icon_items">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
          <p className="tag">Reminder</p>
        </div>

        <div className="icon_items">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M10 8c1.66 0 2.99-1.34 2.99-3S11.66 2 10 2 7 3.34 7 5s1.34 3 3 3zm-6 2V8h2V6H4V4H2v2H0v2h2v2h2zm6 0c-2.33 0-7 1.17-7 3.5V16h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <p className="tag">Collaborator</p>
        </div>

        <div className="icon_items">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
          <p className="tag">Add image</p>
        </div>

        <div className="icon_items">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" />
          </svg>
          <p className="tag">Archive</p>
        </div>

        <div className="icon_items">
          <span className="more"></span>
          <p className="tag">More</p>
        </div>
      </div>
      {props.button ? (
        <section>
          {props.spinner ? (
            <button>
              <Spinner border={true} />
            </button>
          ) : (
            <button onClick={props.newNote}>Save</button>
          )}
          {/* <button>Close</button> */}
        </section>
      ) : (
        false
      )}
    </div>
  );
}
const mapStateToProps = ({ spinner, layout }) => ({
  spinner,
  layout: layout["layout"]
});

export default connect(mapStateToProps)(NoteOptions);
