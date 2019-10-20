import React from 'react';

import './Title.css'

const title = props =>(
    <h2
      className="form-title"
    >
      {props.title}
    </h2>
  );

export default title;
