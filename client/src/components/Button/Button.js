/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
};
const defaultProps = {
    type: 'submit',
    disabled: false,
    loading: false,
    onClick: () => {},
    children: ''
};

const button = ({ type, disabled, loading, onClick, children }) => (
    <button
        className="button"
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
    >
        {loading ? 'Loading...' : children}
    </button>
);

button.propTypes = propTypes;
button.defaultProps = defaultProps;

export default button;
