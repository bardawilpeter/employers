import React from 'react';

import './Button.css'

const button = props =>(
    <button
      className="button"
      type={props.type}
    >
      {props.children}
    </button>
  );

export default button;
