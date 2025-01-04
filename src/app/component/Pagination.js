import React from 'react';
import { DATA } from '../constant/data.js';

export const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: DATA.NEWS.page }, (_, index) => (
        <button
          key={index + 1}
          className={`paginationButton ${currentPage === index + 1 ? 'active' : ''}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
