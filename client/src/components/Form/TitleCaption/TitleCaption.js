import React from 'react';
import PropTypes from 'prop-types';

import './TitleCaption.css';

const propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
const defaultProps = {
    title: ''
};

const titleCaption = ({ title }) => <h2 className="form-title">{title}</h2>;

titleCaption.propTypes = propTypes;
titleCaption.defaultProps = defaultProps;

export default titleCaption;
