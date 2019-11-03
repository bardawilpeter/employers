import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './MainNavigation.css';

const propTypes = {
    isAuth: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    onLogout: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    onHandle: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
const defaultProps = {
    isAuth: false,
    onLogout: () => {},
    onHandle: () => {}
};

const mainNavigation = ({ isAuth, onLogout, onHandle }) => (
    <section className="wrapper">
        <nav className="main-nav">
            <div className="main-nav-logo">
                <NavLink to="/">
                    <Logo />
                </NavLink>
            </div>
            <div className="main-nav-items">
                <ul className="main-nav-items-list">
                    <NavigationItems
                        isAuth={isAuth}
                        onLogout={onLogout}
                        onHandle={onHandle}
                    />
                </ul>
            </div>
        </nav>
    </section>
);

mainNavigation.propTypes = propTypes;
mainNavigation.defaultProps = defaultProps;

export default mainNavigation;
