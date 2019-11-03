import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './NavigationItems.css';

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

const navItems = [
    { id: 'members', text: 'members', link: '/', auth: true },
    { id: 'login', text: 'Login', link: '/', auth: false },
    { id: 'signup', text: 'Sign up', link: '/signup', auth: false }
];

const navigationItems = ({ isAuth, onHandle, onLogout }) => [
    ...navItems
        .filter(item => item.auth === isAuth)
        .map(item => (
            <li key={item.id} className="navigation-item">
                <NavLink to={item.link} onClick={onHandle} exact>
                    {item.text}
                </NavLink>
            </li>
        )),
    isAuth && (
        <li className="navigation-item" key="logout">
            <Link to="/" onClick={onLogout}>
                Logout
            </Link>
        </li>
    )
];

navigationItems.propTypes = propTypes;
navigationItems.defaultProps = defaultProps;

export default navigationItems;
