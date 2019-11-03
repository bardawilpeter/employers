import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import './MemberItem.css';

const propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    department: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onStartEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
const defaultProps = {
    name: '',
    email: '',
    department: '',
    location: '',
    imageUrl: '',
    date: '',
    onStartEdit: () => {},
    onDelete: () => {}
};

const memberItem = ({
    name,
    email,
    department,
    location,
    imageUrl,
    date,
    onStartEdit,
    onDelete
}) => (
    <div className="member-item">
        <div className="member-item-head">
            <h2>{name}</h2>
            <figure>
                <img alt={name} src={imageUrl} width="60px" />
            </figure>
        </div>
        <div className="member-item-info-holder">
            <div className="member-item-info">
                <span>Email:</span>
                {email}
            </div>
            <div className="member-item-info">
                <span>Department:</span>
                {department}
            </div>
            <div className="member-item-info">
                <span>Location:</span>
                {location}
            </div>
            <div className="member-item-info">
                <span>Created Date:</span>
                {date}
            </div>
        </div>
        <div className="member-item-actions">
            <Button onClick={onStartEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
        </div>
    </div>
);

memberItem.propTypes = propTypes;
memberItem.defaultProps = defaultProps;

export default memberItem;
