import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../Logo/Logo';

const mainNavigation = props => (
  <nav className="main-nav">
    <div className="main-nav-logo">
        <Logo />
    </div>
  </nav>
);

export default mainNavigation;
