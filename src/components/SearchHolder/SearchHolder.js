import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Form/Input/Input';
import './SearchHolder.css';

const propTypes = {
    onFinishSearch: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
const defaultProps = {
    onFinishSearch: () => {}
};

const searchHolder = ({ onFinishSearch }) => (
    <div className="search-holder">
        <Input
            id="search"
            label="Search"
            placeholder="Search by member name, department and location"
            control="input"
            onChange={onFinishSearch}
        />
    </div>
);

searchHolder.propTypes = propTypes;
searchHolder.defaultProps = defaultProps;

export default searchHolder;
