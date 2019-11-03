import React from 'react';
import PropTypes from 'prop-types';

import './MessageCaption.css';

const propTypes = {
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
const defaultProps = {
    message: ''
};

const messageCaption = props => <div className="message-data">{props.message}</div>;

messageCaption.propTypes = propTypes;
messageCaption.defaultProps = defaultProps;

export default messageCaption;
