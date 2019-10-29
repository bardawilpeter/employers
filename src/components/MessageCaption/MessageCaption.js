import React from "react";

import "./MessageCaption.css"

const messageCaption = props => (
  <div className="message-data">
    {props.message}
  </div>
);

export default messageCaption;
