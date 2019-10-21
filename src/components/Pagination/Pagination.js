import React from 'react';

import './Pagination.css';

const pagination = props => (
  <div className="pagination-holder">
    {props.children}
    <div className="paginations-actions">
      {props.currentPage > 1 && (
        <button className="pagination-action-item" onClick={props.onPrevious}>
          Previous
        </button>
      )}
      {props.currentPage < props.lastPage && (
        <button className="pagination-action-item" onClick={props.onNext}>
          Next
        </button>
      )}
    </div>
  </div>
);

export default pagination;
