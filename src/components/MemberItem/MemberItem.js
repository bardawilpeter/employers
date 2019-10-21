import React from 'react';

import Button from '../../components/Button/Button';
import './MemberItem.css';

const memberItem = props => (
    <div className="member-item">
        <div className="member-head">
            {props.name}<br />
            {props.email}<br />
            {props.date}<br />
            {props.department}<br />
            {props.location}<br />
        </div>
        <Button onClick={props.onDelete}>
            Delete
      </Button>
    </div>
);

export default memberItem;
