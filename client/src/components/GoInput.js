import React from "react";
// css
import "../css/_main.sass";

export default function GoInput(props) {
  const input = props.isPassword ? (
    <input className="go-keep-input" type="password" placeholder="" required />
  ) : (
    <input className="go-keep-input" type="text" placeholder="" required />
  );

  return (
    <div className="go-keep-group">
      {input}
      <label>{props.label}</label>
      <span className="focus-border">
        <i></i>
      </span>
    </div>
  );
}
