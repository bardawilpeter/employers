import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./MainNavigation.css";

const mainNavigation = props => (
  <section className="wrapper">
    <nav className="main-nav">
      <div className="main-nav-logo">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="main-nav-items">
        <ul className="main-nav-items-list">
          <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
        </ul>
      </div>
    </nav>
  </section>
);

export default mainNavigation;
