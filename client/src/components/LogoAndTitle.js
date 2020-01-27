import React from "react";

// css
import "../css/_logoTitle.sass";

export default function LogoAndTitle(props) {
  return (
    <div className="logo_and_title">
      <h2 className="logo">
        <span className="go">Go</span>_<span className="keep">Keep</span>_
        <span className="react">React</span>
      </h2>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  );
}
