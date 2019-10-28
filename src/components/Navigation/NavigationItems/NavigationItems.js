import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [
  { id: "members", text: "members", link: "/", auth: true },
  { id: "login", text: "Login", link: "/", auth: false },
  { id: "signup", text: "Sign up", link: "/signup", auth: false }
];

const navigationItems = props => [
  ...navItems
    .filter(item => item.auth === props.isAuth)
    .map(item => (
      <li key={item.id} onClick={props.onHandle} className="navigation-item">
        <NavLink to={item.link} exact>
          {item.text}
        </NavLink>
      </li>
    )),
  props.isAuth && (
    <li className="navigation-item" key="logout" onClick={props.onLogout}>
      Logout
    </li>
  )
];

export default navigationItems;
