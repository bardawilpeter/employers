import React from 'react';
import PropTypes from 'prop-types';

import './Auth.css';

const propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
};
const defaultProps = {
    children: ''
};

const auth = ({ children }) => <section className="auth-form-holder">{children}</section>;

auth.propTypes = propTypes;
auth.defaultProps = defaultProps;

export default auth;
