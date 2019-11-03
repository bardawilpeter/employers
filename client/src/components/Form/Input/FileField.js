import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    valid: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    onBlur: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
const defaultProps = {
    id: '',
    label: '',
    valid: true,
    touched: false,
    onChange: () => {},
    onBlur: () => {}
};

const fileField = ({ id, label, valid, touched, onChange, onBlur }) => (
    <div className="input-holder">
        <label htmlFor={id}>{label}</label>
        <input
            className={[
                !valid ? 'invalid' : 'valid',
                touched ? 'touched' : 'untouched'
            ].join(' ')}
            type="file"
            id={id}
            onChange={e => onChange(id, e.target.value, e.target.files)}
            onBlur={onBlur}
        />
    </div>
);

fileField.propTypes = propTypes;
fileField.defaultProps = defaultProps;

export default fileField;
