import React from "react";
// css
import "../css/_input.sass";

export default function GoInput(props) {
  return (
    <div className={`go-keep-group ${props.className}`}>
      <p className="error">{props.error}</p>
      <input
        className="go-keep-input"
        type={props.type}
        name={props.name}
        placeholder=""
        value={props.value || ""}
        onChange={props.handler}
        required
      />
      <label>{props.label}</label>
      <span className="focus-border">
        <i></i>
      </span>
    </div>
  );
}
