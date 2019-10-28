import React from "react";

import "./MessageCaption.css"

const messageCaption = props => (
  <div className="message-data">
    {props.members.length <= 0 && !props.loading ? (
      props.message
    ) : null}
  </div>
);

export default messageCaption;
