import React from 'react';

import './Input.css';

const input = props => (
  <div className="input-holder">
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    {props.control === 'input' && (
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
      />
    )}
  </div>
);

export default input;
