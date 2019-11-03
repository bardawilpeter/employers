/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    control: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    valid: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    onBlur: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
const defaultProps = {
    id: '',
    label: '',
    control: 'input',
    valid: true,
    touched: false,
    type: 'text',
    required: false,
    placeholder: '',
    onChange: () => {},
    onBlur: () => {}
};

const input = ({
    id,
    label,
    control,
    valid,
    touched,
    type,
    value,
    required,
    placeholder,
    onChange,
    onBlur
}) => (
    <div className="input-holder">
        {label && <label htmlFor={id}>{label}</label>}
        {control === 'input' && (
            <input
                className={[
                    !valid ? 'invalid' : 'valid',
                    touched ? 'touched' : 'untouched'
                ].join(' ')}
                type={type}
                id={id}
                required={required}
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(id, e.target.value)}
                onBlur={onBlur}
            />
        )}
    </div>
);

input.propTypes = propTypes;
input.defaultProps = defaultProps;

export default input;
