import React from "react";

import "./Button.css";

const button = props => (
  <button
    className="button"
    type={props.type}
    disabled={props.disabled || props.loading}
    onClick={props.onClick}
  >
    {props.loading ? "Loading..." : props.children}
  </button>
);

export default button;
