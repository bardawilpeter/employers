import React, { Fragment } from 'react';

import './Layout.css';

const layout = props => (
  <Fragment>
    <header className="main-header">{props.header}</header>
  </Fragment>
);

export default layout;
