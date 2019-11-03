import React from 'react';
import PropTypes from 'prop-types';

import './ErrorHandler.css';

const propTypes = {
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.element])
};
const defaultProps = {
    error: {}
};

const errorHandler = ({ error }) => (
    <>{error && <p className="error">{error.message}</p>}</>
);

errorHandler.propTypes = propTypes;
errorHandler.defaultProps = defaultProps;

export default errorHandler;
