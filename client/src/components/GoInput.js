import React from "react";
// css
import "../css/_input.sass";

export default function GoInput(props) {
  const input = props.isPassword ? (
    <input
      className="go-keep-input"
      type={props.type}
      name={props.name}
      placeholder=""
      value={props.value || ""}
      onChange={props.handler}
      required
    />
  ) : (
    <input
      className="go-keep-input"
      type={props.type}
      name={props.name}
      placeholder=""
      value={props.value || ""}
      onChange={props.handler}
      required
    />
  );

  return (
    <div className={`go-keep-group ${props.className}`}>
      {input}
      <label>{props.label}</label>
      <span className="focus-border">
        <i></i>
      </span>
    </div>
  );
}
