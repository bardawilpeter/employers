import React from 'react';

import './MemberItem.css';

const memberItem = props => (
  <div className="member-item">
    <div className="member-head">
        {props.name}<br/>
        {props.email}<br/>
        {props.date}<br/>
        {props.department}<br/>
        {props.location}<br/>
    </div>
  </div>
);

export default memberItem;
