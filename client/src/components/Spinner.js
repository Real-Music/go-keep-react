import React from "react";

export default function Spinner(props) {
  const spinner = props.border;

  if (spinner) {
    return (
      <div className="spinner_border">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }
}
