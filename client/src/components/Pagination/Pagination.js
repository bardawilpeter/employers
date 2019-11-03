import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.css';

const propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.element]),
    lastPage: PropTypes.oneOfType([PropTypes.number, PropTypes.element]),
    onPrevious: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    onNext: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
const defaultProps = {
    children: '',
    currentPage: 0,
    lastPage: 0,
    onPrevious: () => {},
    onNext: () => {}
};

const pagination = ({ children, currentPage, lastPage, onPrevious, onNext }) => (
    <div className="pagination-holder">
        {children}
        <div className="pagination-actions">
            {currentPage > 1 && (
                <button
                    type="button"
                    className="pagination-action-item"
                    onClick={onPrevious}
                >
                    Previous
                </button>
            )}
            {currentPage < lastPage && (
                <button type="button" className="pagination-action-item" onClick={onNext}>
                    Next
                </button>
            )}
        </div>
    </div>
);

pagination.propTypes = propTypes;
pagination.defaultProps = defaultProps;

export default pagination;
