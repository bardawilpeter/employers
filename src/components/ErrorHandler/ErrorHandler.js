import React, { Fragment } from 'react';

import './ErrorHandler.css';

const errorHandler = props => (
  <Fragment>
    {props.error && (
        <p className="error">{props.error.message}</p>
    )}
  </Fragment>
);

export default errorHandler;
