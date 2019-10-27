import React from "react";

import Button from "../../components/Button/Button";
import "./MemberItem.css";

const memberItem = props => (
  <div className="member-item">
    <div className="member-item-head">
      <h2>{props.name}</h2>
    <figure>
        <img alt={props.name} src={props.imageUrl} width="60px" />
    </figure>
    </div>
    <div className="member-item-info-holder">
      <div className="member-item-info">
        <label>Email:</label>
        {props.email}
      </div>
      <div className="member-item-info">
        <label>Department:</label>
        {props.department}
      </div>
      <div className="member-item-info">
        <label>Location:</label>
        {props.location}
      </div>
      <div className="member-item-info">
        <label>Created Date:</label>
        {props.date}
      </div>
    </div>
    <div className="member-item-actions">
      <Button onClick={props.onStartEdit}>Edit</Button>
      <Button onClick={props.onDelete}>Delete</Button>
    </div>
  </div>
);

export default memberItem;
