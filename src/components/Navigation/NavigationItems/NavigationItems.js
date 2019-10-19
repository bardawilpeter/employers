import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
  { id: 'members', text: 'members', link: '/'},
  { id: 'login', text: 'Login', link: '/'},
  { id: 'signup', text: 'Signup', link: '/signup'}
];

const navigationItems = props => [
  ...navItems.map(item => (
    <li
      key={item.id}
      className='navigation-item'
    >
      <NavLink to={item.link} exact>
        {item.text}
      </NavLink>
    </li>
  ))
];

export default navigationItems;
