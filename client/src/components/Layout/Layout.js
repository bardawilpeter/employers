import React from 'react';
import PropTypes from 'prop-types';

import './Layout.css';

const propTypes = {
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
const defaultProps = {
    header: ''
};

const layout = ({ header }) => (
    <>
        <header className="main-header">{header}</header>
    </>
);

layout.propTypes = propTypes;
layout.defaultProps = defaultProps;

export default layout;
